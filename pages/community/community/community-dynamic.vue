<template>
	<view class="u-p-l-28 u-p-r-28 u-p-t-30">
		<view class="Dynamic width-694">
			<view class="flex align-center u-m-b-20">
				<assets-image :src="info.avatar" width="80" radius="40"></assets-image>
				<view class="u-p-l-20 font-30">{{info.nickname}}</view>
			</view>
			<view class="font-30 u-m-b-20">{{info.content}}</view>
			<view class="flex u-m-b-32" v-for="(item,index) in info.images">
				<assets-image :src="item" width="211" radius="10" @click="lookImg(item)"></assets-image>
			</view>
		</view>
		<scroll-view scroll-y="true" :style="{ height: height + 'px' }" @scrolltolower="reachbottom">
			<view class="Dynamic width-694">
				<view class="font-30 bold-500 u-m-b-24">评论详情({{info.dynamicNum}}条）</view>
				<view class="flex border-bottom u-m-b-24" v-for="(data,key) in list" :key="key">
					<assets-image :src="data.avatar" width="70" radius="40"></assets-image>
					<view class="">
						<view class="flex justify-between">
							<view class="u-m-l-16" style="width: 440rpx;" @click="replyComment(data)">
								<view class="font-26 u-m-b-6">{{data.nickname}}</view>
								<view class="font-20 text-999 u-m-b-20">{{data.createdAt}}</view>
							</view>
							<view class="flex align-center">
								<view class="text-center flex align-center" @click="dianz(data.id,data.isPraise,2)">
									<uni-icons type="hand-down" size="28" color="#999" @click="open(data.id)"></uni-icons>
									<view class="u-m-l-20">
										<uni-icons :type="data.isPraise?'hand-up-filled':'hand-up'" size="28" :color="data.isPraise?'#FF4B4B':'#999'"></uni-icons>
									</view>
									<view class="font-26 text-999">{{data.praiseNum}}</view>
								</view>
							</view>
						</view>
						<view class="font-28 u-m-b-30" style="width: 460rpx;" @click="replyComment(data)">{{data.content}}</view>
						<!-- 二级评论 -->
						<view class="flex" v-for="(item,index) in data.comments" :key="index">
							<assets-image :src="item.avatar" width="60" radius="30"></assets-image>
							<view class="">
								<view class="flex justify-between">
									<view class="u-m-l-16" style="width: 390rpx;" @click="replyComment(item)">
										<view class="font-26 u-m-b-6">{{item.nickname}}</view>
										<view class="font-20 text-999 u-m-b-20">{{item.createdAt}}</view>
									</view>
									<view class="flex align-center">
										<view class="text-center flex align-center" @click="dianz(item.id,item.isPraise,2)">
											<uni-icons type="hand-down" size="28" color="#999" @click="open(item.id)"></uni-icons>
											<view class="u-m-l-20">
												<uni-icons :type="item.isPraise?'hand-up-filled':'hand-up'" size="28" :color="item.isPraise?'#FF4B4B':'#999'"></uni-icons>
											</view>
											<view class="font-26 text-999">{{item.praiseNum}}</view>
										</view>
									</view>
								</view>
								<view class="font-28 u-m-b-30" style="width: 400rpx;" @click="replyComment(data)">{{item.content}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>
		<view class="release flex align-center justify-between">
			<view class="releaseInput">
				<input type="text" :placeholder="placeholder" @focus="inputFocus" @blur="inputBlur" v-model="content" placeholder-class="font-26" class="font-26">
			</view>
			<view class="flex justify-between align-center" style="width: 200rpx ;">
				<view class="btn" :class="!isFocus?'bg-c7cdcf':'bg-20222E'" @click="CommentSubmit(parentCommentId)">
					发送
				</view>
				<view class="flex align-center" @click="dianz(info.id,info.isPraise,1)">
					<uni-icons :type="info.isPraise?'hand-up-filled':'hand-up'" size="25" :color="info.isPraise?'#FF4B4B':'#999'"></uni-icons>
					<text class="font-26 text-999">{{info.praiseNum}}</text>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="box">
				 <picker-view :indicator-style="indicatorStyle" @change="bindChange" class="picker-view">
						<picker-view-column>
							<view class="item" v-for="(item,index) in ReportList" :key="index">{{item}}</view>
						</picker-view-column>
					</picker-view>
					<submit-btn text="提交" style="margin: 0 auto;" width="670" height="88" size="34" color="#FFFFFF" bgColor="#20222E" @click="report"></submit-btn>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				praise:false,
				list:[],
				id:'',
				info:{},
				height: 0,
				page: 1,
				status: 'noMore',
				parentCommentId:0,
				content:'',
				isFocus:false,
				placeholder:'发一条友善的评论吧',
				ReportList:['色情低俗','政治敏感','违法','广告','欺诈骗钱','侵犯未成年人权益','其他'],
				ReportID:null,
				indicatorStyle: `height: 50px;`,
				describe:'色情低俗'
			};
		},
		onLoad(data) {
			this.id = data.id
		},
		onShow() {
			this.loadData()
			this.loadList(true)
		},
		onNavigationBarButtonTap() {
			if (this.info.isCanDel) {
				uni.showActionSheet({
					itemList: ['删除动态'],
					success: res => {
						this.$u.api.districtDynamicDel({
							id: this.id
						}).then(res=>{
							uni.showToast({
								title:"删除成功",
								icon:"none"
							})
							setTimeout(()=>{
								uni.navigateBack()
							},1200)
						})
					}
				});
			} else{
				uni.showToast({
					title:"没有权限",
					icon:"none"
				})
			}
		},
		onReady() {
			let windowHeight = this.getPhoneInfo('windowHeight')
			this.height = windowHeight - uni.upx2px(110)
		},
		methods:{
			getPhoneInfo(type){
				try {
				    const res = uni.getSystemInfoSync();
				    return res[type]
				} catch (e) {
				    return 30
				}
			},
			bindChange(e) {
				// console.log(e.detail.value);
				this.describe  = this.ReportList[e.detail.value]
			},
			open(id){
				this.ReportID = id
				this.$refs.popup.open()
			},
			report(){
				console.log(this.ReportID,this.describe );
				// return
				this.$u.api.districtReport({
					id:this.ReportID,
					type:'dynamic',
					describe:this.describe 
				}).then(res=>{
					uni.showToast({
						title:"举报成功！",
						icon:'success'
					})
					this.$refs.popup.close()
					setTimeout(()=>{
						this.loadList(true)
					},100)
				})
			},
			loadData(){
				this.$u.api.districtDynamicInfo({
					id:this.id
				}).then(res=>{
					this.info = res.data.info
				})
			},
			// 二级评论
			replyComment(data){
				console.log(data);
				this.isFocus = true
				this.placeholder = '回复'+data.nickname
				this.parentCommentId = data.id
				// console.log(this.parentCommentId);
			},
			// 评论
			CommentSubmit(){
				console.log(this.id,this.parentCommentId,this.content);
				// return
				this.$u.api.districtCommentPublish({
					id:this.id,
					parentCommentId:this.parentCommentId,
					content:this.content,
				}).then(res=>{
					console.log(res)
					this.content = ''
					this.parentCommentId = 0
					this.placeholder = '发一条友善的评论吧'
					this.loadList(true)
				})
			},
			inputBlur(e){ 
				this.isFocus = false
			},
			// 监听输入聚焦
			inputFocus(e) {
				this.isFocus = true
			},
			loadList(flag){
				this.$u.api.districtDynamicCommentList({
					id:this.id,
					page:this.page
				}).then(res=>{
					// console.log(res);
					this.list = flag? res.data.list.data: this.list.concat(res.data.list.data)
					this.status= res.data.list.next_page_url? 'more': 'noMore'
					this.$forceUpdate()
				})
			},
			reachbottom() {
				if (this.status == 'noMore') return
				this.page++
				this.loadList()
			},
			dianz(id,isPraise,level){
				if (isPraise == false) {
					isPraise = true
				} else{
					isPraise = false
				}
				if (level == 1){
					id = 0
				}
				this.$u.api.districtPraise({
					id:this.id,
					isPraise: isPraise,
					commentId: id
				}).then(res=>{
					if (level == 1) {
						this.loadData()
					} else{
						this.loadList(true)
					}
				})
			},
			lookImg(url){
				uni.previewImage({
					urls:[url]
				})
			}
		}
	}
</script>

<style lang="scss">
	.bg-c7cdcf{
		background-color: #c7cdcf;
	}
	.bg-20222E{
		background-color: #20222E;
	}
page{background-color: #F9F9FB;}
.box{
		background-color: #FFFFFF;
		padding-bottom: 30rpx;
		.picker-view {
				width: 750rpx;
				height: 300rpx;
				// margin-top: 20rpx;
				// margin-bottom: 50rpx;
			}
			.item {
				height: 50px;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
	}
.release{
	position: fixed;
	bottom: 0;
	width: 100%;
	background-color: #FFFFFF;
	padding: 20rpx 28rpx;
	.btn {
		width: 115rpx;
		height: 62rpx;
		text-align: center;
		line-height: 62rpx;
		font-size: 26rpx;
		border-radius: 30rpx;
		color: #FFFFFF;
	}
	.bg-c7cdcf{
		background-color: #c7cdcf !important;
	}
	.releaseInput{
		input{
			width: 461rpx;
			height: 61rpx;
			background: #F3F3F3;
			border-radius: 30rpx;
			padding-left: 28rpx;
		}
	}
}
.Dynamic{
	background-color: #FFFFFF;
	padding: 20rpx;
	border-radius: 20rpx;
	margin-top: 24rpx;
}
</style>
