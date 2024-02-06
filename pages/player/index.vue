<template>
	<view :class="[showmodal, 'page-text-'+textSize]">
		<cu-custom :isBack="true" :bgColor="(platform=='h5'?'nobg':'bg-black')+' text-white'">
			<block slot="content">{{ data.title }}</block>
			<block slot="right" v-if="data.microVideo && data.commentable">
				<view class="action" @click="naviTo('player/mine')">
					<text class="cuIcon-myfill"></text>
				</view>
			</block>
		</cu-custom>
		<swaload :hasTopbar="hasTopbar" v-if="!loaded"></swaload>
		<view class="container flex justify-center align-center flex-direction bg-black" :style="{top:player.duration+'px'}" :class="player.style" v-else>
			<view class="player" @longpress="showmodal='shareVideo'" @tap="doPlay()" @touchmove="doSwitch" @touchend="doUnHold">
				<video id="myVideo" :loop="data.microVideo" :autoplay="data.autoplay" show-mute-btn="true" :title="data.title" :src="playurls[playmode]" :poster="data.video.poster" @timeupdate="onTimeUpdate" :controls="false" @play="onVideoPlay" @pause="player.status=0"></video>
				<view class="progress flex align-center" v-if="!player.status || player.curTime<3">
					<view class="margin-lr" v-if="!player.barTouch">
						<text>{{ timeText(player.curTime) }}</text>
					</view>
					<view class="cu-progress" :class="player.barTouch?'':'xxs round'" @touchmove="moveProgree" @touchend="touchProgree" @touchstart="player.barTouch=true">
						<view class="bg-white" :style="{width:player.progress+'%'}"></view>
					</view>
					<view class="margin-lr" v-if="!player.barTouch">
						<text>{{ timeText(player.times) }}</text>
					</view>
				</view>
				<view class="summary flex align-center padding">
					<text class="text-lg text-cut">{{ data.video.summary }}</text>
				</view>
			</view>
			<view class="cu-bar tabbar shop bg-black" :class="data.commentable?'':'no-comment'">
				<view class="author flex" @click="naviTo('member/index', {uid:data.video.uid, fp:'player'})" v-if="data.viewauthor && data.video.uid>0">
					<view class="avatar">
						<image :src="data.video.avatar" mode="aspectFill" class="round"></image>
					</view>
					<view class="margin-left-sm flex align-center flex-wrap text-cut">
						<view class="nickname">{{ data.video.nickname }}</view>
						<view class="bio text-cut text-sm" v-if="data.video.bio"><text class="text-gray">{{ data.video.bio }}</text></view>
					</view>
				</view>
				<view class="author" v-else></view>
				<view class="action" :class="data.video.loved?'text-red':''" @click="doAppre('love')" v-if="data.microVideo">
					<view :class="'cuIcon-appreciate'+(data.video.loved?'fill':'')"></view>
					<text>{{ totalText(data.video.loves) }}</text>
				</view>
				<view class="action" :class="data.video.shared?'text-red':''" @click="showmodal='shareVideo'">
					<view :class="'cuIcon-forward'+(data.video.shared?'fill':'')"></view>
					<text>{{ totalText(data.video.shares) }}</text>
				</view>
				<view class="action" :class="data.video.collected?'text-red':''" @click="doAppre('collect')" v-if="data.microVideo">
					<view :class="'cuIcon-favor'+(data.video.collected?'fill':'')"></view>
					<text>{{ totalText(data.video.collection) }}</text>
				</view>
				<view class="action" @click="showComment()" v-if="data.commentable">
					<view class="cuIcon-comment"></view>
					<text>{{ totalText(data.video.comments) }}</text>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal commentModal" :class="showmodal=='commentPanel'?'show':''">
			<view class="cu-modal-bg" @click="showmodal=''"></view>
			<view class="cu-dialog">
				<view class="cu-bar">
					<view class="content">{{data.video.comments}}条评论</view>
					<view class="action" @tap="showmodal=''">
						<text class="cuIcon-unfold"></text>
					</view>
				</view>
				<scroll-view class="comments bg-white" @scrolltolower="getComment(data.video.id, comments.page+1)" scroll-y>
					<view class="cu-list menu-avatar comment solid-top">
						<view class="cu-item noaf" @click="doReply({index:-1, value:''})">
							<view class="cu-avatar radius" :style="'background-image:url('+data.video.avatar+');'"></view>
							<view class="content text-left">
								<view class="text-grey">
									{{ data.video.nickname }}
									<text class="text-green margin-left-sm">作者</text>
									<text class="text-gray margin-left-sm">{{ data.video.datetime }}</text>
								</view>
								<view>
									<text>{{ data.video.summary }}</text>
								</view>
							</view>
						</view>
					</view>
					<comment :comments="comments.data" @onreply="doReply" @onremove="rmComment" @reload="getComment(data.video.id, 1)" :authorId="data.video.uid"></comment>
				</scroll-view>
				<view class="cu-bar tabbar input foot text-left">
					<input @confirm="doComment()" :focus="commentFocus" :class="commentcontent!=''?'hasval':''" v-model="commentcontent" :placeholder="comments.text" :adjust-position="true" @blur="commentFocus=false" cursor-spacing="10" class="solid-bottom" maxlength="300"></input>
					<button class="cu-btn shadow-blur" :class="'bg-'+theme.actcolor" @click="doComment()">发表</button>
				</view>
			</view>
		</view>
		<view class="cu-modal bottom-modal sharemodal" :class="showmodal=='shareVideo'?'show':''">
			<view class="cu-modal-bg" @click="showmodal=''"></view>
			<view class="cu-dialog">
				<view class="cu-bar">
					<view class="action"></view>
					<view class="action text-blue" @tap="showmodal=''">取消</view>
				</view>
				<view class="padding-sm text-black">
					<view class="grid text-center col-4">
						<view class="share-item" @click="doVideoShare()">
							<view class="text-xxxl bg-blue round">
								<text class="cuIcon-forward text-white"></text>
							</view>
							<view class="padding-xs">分享到会话</view>
						</view>
						<view class="share-item" @click="doCopy()">
							<view class="text-xxxl bg-yellow round">
								<text class="cuIcon-copy text-white"></text>
							</view>
							<view class="padding-xs">复制链接</view>
						</view>
						<view class="share-item" @click="doDownload()" v-if="data.downable">
							<view class="text-xxxl bg-green round">
								<text class="cuIcon-down text-white"></text>
							</view>
							<view class="padding-xs">下载视频</view>
						</view>
						<view class="share-item" @click="hideVideo()" v-if="data.video.mStatus==1 && data.video.uid==userId">
							<view class="text-xxxl bg-grey round">
								<text class="cuIcon-attentionforbid text-white"></text>
							</view>
							<view class="padding-xs">设为私密</view>
						</view>
						<view class="share-item" @click="removeVideo()" v-if="data.video.uid==userId">
							<view class="text-xxxl bg-red round">
								<text class="cuIcon-deletefill text-white"></text>
							</view>
							<view class="padding-xs">删除视频</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<advs :isPopup="true" :advs="advs.player"></advs>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	import comment from "@/components/util/comment.vue"
	import advs from "@/components/util/advs.vue"
	
	export default {
		computed: mapState(['userId', 'textSize', 'userName']),
		components: {comment, advs},
		data() {
			return {
				vid:0,
				logo:core.system.logo,
				hasTopbar:false,
				loaded:false,
				showmodal:'',
				comments:{
					status:0,
					data:[],
					page:1,
					hasMore:true,
					text:"发表评论:"
				},
				theme:core.style,
				videoContext:null,
				playmode:'od',
				player:{
					status:0,
					touchStart:0,
					last:false,
					style:[],
					duration:0,
					item:-1,
					history:[],
					progress:0,
					times:0,
					curTime:0,
					preload:false,
					barTouch:false,
					rankPage:0
				},
				playList:[],
				playurls:{
					'od':'',
					'hd':'',
					'sd':''
				},
				advs:{
					'player':[]
				},
				commentcontent:"",
				commentId:0,
				commentFocus:false,
				platform:core.platform,
				showshare:false,
				shareinfo:{
					url:'',
					providers:4,
					provider:{}
				},
				data:{
					title:"视频播放",
					autoplay:true,
					downable:true,
					microVideo:false,
					publishable:false,
					commentable:false,
					video:{
						"id": 0,
						"uid": 0,
						"name": "",
						"poster": "",
						"videourl": "",
						"videohd": "",
						"videosd": "",
						"size": 0,
						"subtitle": "",
						"summary": "",
						"views": 0,
						"comments": 0,
						"loves": 0,
						"collection": 0,
						"shares": 0,
						"mStatus": 0,
						"status": 1,
						"addtime": 0,
						"dateline": 0,
						"nickname": "",
						"avatar": "",
						"bio": "",
						"loved": 0,
						"collected": 0,
						"shared": 0,
						"datetime": ""
					},
					viewauthor:0,
					shareinfo:{
						title:"",
						cover:"",
						url:"",
						desc:""
					}
				}
			}
		},
		onLoad(options) {
			this.player.history.push(this.vid);
			let self = this;
			core.cacheread("microVideoPlayer", function(res){
				self.player.preload = res.data.preLoad;
				self.playmode = res.data.playMode;
				self.data.microVideo = res.data.microVideo;
				self.data.commentable = res.data.commentable;
				if(res.data.microVideo){
					self.data.autoplay = true;
					self.data.viewauthor = true;
				}
				self.playList.push(res.data.video);
				self.doPlayNext();
				if(typeof(options.vid)!='undefined' && options.vid && options.vid!=res.data.video.id){
					self.initData('player',{vid:options.vid}, function(data){
						data.video.shareinfo =  data.shareinfo;
						self.player.item += 1;
						self.playList.push(data.video);
					});
				}else if(res.data.microVideo){
					uni.setNavigationBarTitle({
						title:"短视频"
					});
				}
			}, function(){
				if(typeof(options.vid)=='undefined' || !options.vid){
					self.getPlayList(2);
				}else{
					self.initData('player',{vid:options.vid});
				}
			});
		},
		onShow() {
			
		},
		methods:{
			initData(route, data={}, callback=false){
				this.vid = data.vid;
				var that = this;
				core.get(route,function(res){
					if(typeof(res.message)!='undefined' && typeof(res.type)!='undefined'){
						return core.report(res, true);
					}
					if(typeof(res.downable)=='undefined'){
						res.downable = true;
					}
					if(res.microVideo){
						res.autoplay = true;
						res.viewauthor = true;
					}
					that.data = res;
					that.playurls = {
						'od':res.video.videourl,
						'hd':res.video.videohd,
						'sd':res.video.videosd
					}
					that.loaded = true;
					that.shareinfo = core.initshare(res.shareinfo.title,res.shareinfo.url,res.shareinfo.cover,res.shareinfo.desc);
					that.player.history.push(res.video.id);
					that.doVideoCache();
					if(that.playList.length==0){
						res.video.shareinfo =  res.shareinfo;
						that.playList.push(res.video);
						that.player.item = 0;
						if(res.microVideo){
							that.getPlayList();
						}
					}
					uni.setNavigationBarTitle({
						title:res.title
					});
					if(callback){
						callback(res);
					}
				},data);
			},
			naviTo(page,data={}){
				return core.navito(page,data);
			},
			showComment(){
				this.showmodal = 'commentPanel';
				if(this.comments.status==0){
					this.getComment(this.data.video.id, 1);
				}
				return true;
			},
			getComment(vid, page=1){
				if(this.comments.status==2) return false;
				this.comments.status = 2;
				if(!this.comments.hasMore && page!=1) return this.comments.status = 1;
				let self = this;
				core.get("comment", function(res){
					self.comments.page = page;
					self.comments.status = 1;
					if(typeof(res.type)!='undefined' && typeof(res.message)!='undefined'){
						self.comments.hasMore = false;
						return core.report(res);
					}
					if(page==1){
						self.comments.data = res.comments;
					}else{
						self.comments.data = self.comments.data.concat(res.comments);
					}
					if(self.comments.data.length >= res.total || res.comments.length<=0){
						self.comments.hasMore = false;
					}else{
						self.comments.hasMore = true;
					}
				}, {page: page, type:"video", aid: vid});
			},
			onVideoPlay(e){
				this.player.status=1;
				if(this.videoContext==null){
					this.videoContext = uni.createVideoContext('myVideo');
				}
			},
			onTimeUpdate(e){
				if(this.player.times==0 && e.detail.duration){
					this.player.times = Math.floor(e.detail.duration);
				}
				let currentTime = Math.floor(e.detail.currentTime);
				if(this.player.curTime!=currentTime){
					this.player.curTime = currentTime;
					this.player.progress = (e.detail.currentTime / e.detail.duration) * 100;
				}
			},
			doBack(){
				core.back();
			},
			doPlay(){
				if(this.player.status==1){
					this.videoContext.pause();
				}else{
					this.videoContext.play();
				}
			},
			doDownload(){
				let downUrl = this.playurls[this.playmode];
				this.showmodal = "";
				return core.navito("player/storage",{url:core.encodeurl(downUrl)});
			},
			timeText(time){
				let hours = 0,minute = 0,second = time % 60;
				if(time>3600){
					hours = Math.floor(time/3600);
					minute = Math.floor((time % 3600)/60);
				}else if(time>60){
					minute = Math.floor(time/60);
				}else{
					second = time;
				}
				let text = (minute<10?'0':'') + minute + ":" + (second<10?'0':'') + second;
				if(hours>0){
					text = hours + ":"+text;
				}
				return text;
			},
			touchProgree(e){
				this.player.barTouch = false;
				let pageX = e.changedTouches[0].pageX;
				let progress = e.changedTouches[0].pageX / core.Client.screenWidth;
				this.player.progress = progress * 100;
				let initialtime = Math.floor(this.player.times*progress);
				this.videoContext.seek(Number(initialtime));
				this.videoContext.play();
			},
			moveProgree(e){
				let pageX = e.changedTouches[0].pageX;
				let progress = e.changedTouches[0].pageX / core.Client.screenWidth;
				this.player.progress = progress * 100;
			},
			totalText(total){
				let text = total + "";
				if(total>100000){
					text = '10万+';
				}else if(total>1000){
					text = (total/1000).toFixed(1) + 'k';
				}
				return text;
			},
			doSwitch(e){
				if(!this.data.microVideo) return false;
				if(this.player.touchStart==0){
					this.player.touchStart = e.touches[0].clientY;
					this.player.duration = 0;
				}else{
					this.player.duration = e.touches[0].clientY - this.player.touchStart;
				}
			},
			doUnHold(){
				if(!this.data.microVideo) return false;
				this.player.touchStart = 0;
				if(this.player.duration<-100){
					this.doPlayNext();
				}else if(this.player.duration>100){
					this.doPlayBack();
				}else{
					this.player.duration = 0;
				}
			},
			doPlayNext(){
				if(!this.data.microVideo) return false;
				this.player.duration = 0;
				let item = this.player.item + 1;
				let self = this;
				if(this.playList.length-1<item && this.player.last){
					return core.confirm("是否从头观看？", "您已经观看完所有视频", function(){
						self.player.history = [];
						if(self.player.rankPage>0){
							self.player.item = -1;
							return self.doPlayNext();
						}
						self.player.rankPage = 0;
						self.player.last = false;
						self.getPlayList(1, true);
					});
				}
				this.player.item = item;
				this.player.times = 0;
				this.player.curTime = 0;
				this.player.progress = 0;
				this.comments = {
					status:0,
					data:[],
					page:1,
					hasMore:true,
					text:"发表评论:"
				};
				let video = this.playList[item];
				if(typeof(video.mStatus)=='undefined'){
					if(this.player.history.indexOf(video.id)>=0){
						return this.doPlayNext();
					}
					//未加载重新加载
					this.initData('player',{vid:video.id}, function(res){
						res.video.shareinfo =  res.shareinfo;
						self.playList.splice(item,1,res.video);
					});
				}else{
					//已加载直接播放
					this.data.video = video;
					this.playurls = {
						'od':video.videourl,
						'hd':video.videohd,
						'sd':video.videosd
					}
					this.shareinfo = core.initshare(video.shareinfo.title,video.shareinfo.url,video.shareinfo.cover,video.shareinfo.desc);
					if(this.player.history.indexOf(video.id)<0){
						this.player.history.push(video.id);
					}
					this.loaded = true;
					this.doVideoCache();
				}
				if(item==this.playList.length-1 && !this.player.last){
					this.getPlayList(0, this.player.rankPage>0);
				}
			},
			doPlayBack(){
				if(!this.data.microVideo) return false;
				if(this.player.item<=0){
					//从新加载最新视频
					return this.getPlayList(1);
				}
				this.player.item -= 2;
				return this.doPlayNext(true);
			},
			doAppre(action){
				let vid = this.data.video.id;
				let self = this;
				let videoItem = this.player.item;
				core.get('mvideo/'+action, function(res){
					if(res.type!='success') return core.report(res);
					if(action=='love'){
						self.data.video.loves += (res.data.action=='cancel' ? -1 : 1);
						self.data.video.loved = res.data.action!='cancel';
					}else if(action=='collect'){
						self.data.video.collection += (res.data.action=='cancel' ? -1 : 1);
						self.data.video.collected = res.data.action!='cancel';
					}
					let video = self.data.video;
					video.shareinfo = self.data.shareinfo;
					self.playList[videoItem] = video;
					self.doVideoCache();
				}, {vid:vid});
			},
			doVideoCache(){
				let data = {
					video:this.data.video,
					playMode:this.playmode,
					microVideo:this.data.microVideo,
					preLoad:this.player.preload,
					commentable:this.data.commentable
				}
				data.video.shareinfo = this.data.shareinfo;
				core.cacheset("microVideoPlayer", data);
			},
			doVideoShare(){
				let self = this;
				core.get('mvideo/share', function(res){
					if(res.type!='success') return core.report(res);
					self.showmodal = "";
					self.data.video.shared = true;
					self.data.video.shares += 1;
					self.doVideoCache();
					core.navito('dialog/share',{mid:res.data.message.id,fp:'player'});
				}, {vid:this.data.video.id});
			},
			removeVideo(){
				let self = this;
				let videoItem = this.player.item, vid = this.data.video.id;
				core.confirm("删除后该视频的所有数据都将清除且不可恢复", "确定要删除？", function(){
					core.get('mvideo/remove', function(res){
						if(res.type!='success'){
							return core.report(res);
						}
						self.playList.splice(videoItem, 1);
						self.player.item -= 1;
						self.showmodal = "";
						self.doVideoCache();
						self.doPlayNext();
					}, {vid:vid})
				})
			},
			hideVideo(){
				let self = this;
				let vid = this.data.video.id;
				core.confirm("设为他人只能通过会话和动态观看该视频", "设为私密", function(){
					core.get('mvideo/disable', function(res){
						if(res.type!='success'){
							return core.report(res);
						}
						self.showmodal = "";
						self.initData('player',{vid:vid});
					}, {vid:vid})
				})
			},
			doCopy(){
				return core.copy(this.shareinfo.url);
			},
			getPlayList(refresh=0, rank=false){
				if(!this.data.microVideo && !refresh) return false;
				let self = this, data = {};
				if(rank){
					data.page = this.player.rankPage + 1;
					data.rank = 1;
				}
				core.get('mvideo/preview', function(res){
					if(res.type!='success'){
						self.player.last = true;
						return core.report(res, refresh>0);
					}
					if(rank){
						self.player.rankPage += 1;
					}
					if(res.data.playList.length>0){
						self.data.microVideo = true;
						if(refresh>0){
							self.playList = res.data.playList;
							self.player.item = -1;
							self.doPlayNext();
						}else{
							self.playList = self.playList.concat(res.data.playList);
						}
					}else{
						self.player.last = true;
						if(refresh>0){
							self.player.duration = 0;
							if(self.player.rankPage>0){
								core.toast('已观看完所有视频');
							}
							if(refresh==2 && !rank){
								self.player.last = false;
								self.getPlayList(1, true);
							}
						}
					}
				}, data, 'json', refresh);
			},
			rmComment(e){
				this.data.video.comments -= e.dels;
				if(e.index==-1){
					this.comments.data.splice(e.pIndex, 1);
				}else{
					let comments = this.comments.data[e.pIndex].comments;
					comments.splice(e.index, 1);
					this.comments.data[e.pIndex].comments = comments;
				}
			},
			doComment(){
				let postdata = {
					content:this.commentcontent,
					aid:this.data.video.id,
					cid:this.commentId,
					type:'video'
				};
				let self = this, vid = this.data.video.id;
				return core.post("comment/post",function(res){
					if(res.type!='success') return core.toast(res.message);
					self.commentcontent = '';
					self.commentId = 0;
					self.comments.text = "发表评论:";
					core.toast(res.message,'','success');
					self.getComment(vid, 1);
					self.data.video.comments += 1;
				},{data:postdata});
			},
			doReply(e){
				if(e.index<0){
					this.commentId = 0;
					return this.comments.text = "发表评论:", this.commentFocus = true;
				}
				let comment = this.comments.data[e.index];
				this.commentId = comment.id;
				this.comments.text = "回复 " + (e.value==""?comment.nickname:e.value) + "：";
				if(e.value!=""){
					this.commentcontent = this.comments.text + this.commentcontent;
				}
				this.commentFocus = true;
			}
		}
	}
</script>

<style>
	page{background-color: #080808;}
	.container{box-sizing: border-box; height: 100vh; width: 100vw; position: fixed; top: 0; left: 0;}
	.player{flex: 1; width: 100vw; position: relative;}
	.player video{width: 100%; height: 100%;}
	.bg-black{background-color: #080808;}
	.cu-bar.tabbar{min-height: 120upx;}
	.cu-bar .action{width: 100upx !important;}
	.cu-bar [class*="cuIcon-"]{font-size: 44upx !important; width: auto !important;}
	.author{flex: 2.6; width: calc(100vw - 400upx); padding-left: 26upx;}
	.no-comment .author{width: calc(100vw - 300upx);}
	.avatar image{width: 84upx; height: 84upx;}
	.cu-bar .action:last-child{margin-right: 0;}
	.nickname{width: 100%;}
	.summary{position: absolute; z-index: 1000; bottom: 0; left: 0; width: 100%; height: 100upx; line-height: 100upx;}
	.progress{position: absolute; z-index: 1000; bottom: 100upx; left: 0; width: 100%;}
	.cu-progress{background-color: #6d7077;}
	/* #ifdef APP */
	.container{margin-top: calc(var(--status-bar-height) + 120upx); height: calc(100vh - var(--status-bar-height) - 120upx);}
	/* #endif */
	.shareVideo .container{height: calc(100vh - 322upx - var(--status-bar-height));}
	.commentPanel .container{height: 35vh;}
	.commentModal .cu-dialog{height: 65vh;}
	.commentModal .comments{height: calc(65vh - 220upx);}
</style>
