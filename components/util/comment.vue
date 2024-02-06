<template>
	<view class="comment-list">
		<view v-if="comments.length>0">
			<view class="cu-list menu-avatar comment solid-top">
				<view class="cu-item noaf" v-for="(item, index) in comments" :key="index">
					<view @click="naviTo('member/index',{uid:item.uid})" class="cu-avatar radius" :style="'background-image:url('+item.avatar+');'"></view>
					<view class="content text-left">
						<view>
							<text @click="naviTo('member/index',{uid:item.uid})" class="text-grey">{{item.nickname}}</text>
							<text class="text-green margin-left-sm" v-if="authorId==item.uid">作者</text>
							<text class="text-gray margin-left-sm">{{ item.datetime }}</text>
							<text class="text-red margin-left" @tap.stop="removeComment(item.id, index, -1)" v-if="userId==item.uid || authorId==userId">删除</text>
						</view>
						<view @click="$emit('onreply', {index:index, value:''})">{{item.content}}</view>
						<view class="cu-list menu-avatar comment sub-comments" v-if="item.comments.length>0">
							<view class="cu-item" @click="$emit('onreply', {index:index, value:val.nickname})" v-for="(val, eq) in item.comments" :key="eq">
								<view @tap.stop="naviTo('member/index',{uid:val.uid})" class="cu-avatar round xs" :style="'background-image:url('+val.avatar+');'"></view>
								<view class="content">
									<view>
										<text class="text-grey">{{val.nickname}}</text>
										<text class="text-gray margin-left-sm">{{ val.datetime }}</text>
										<text class="text-red margin-left" @tap.stop="removeComment(val.id, index, eq)" v-if="userId==val.uid || authorId==userId">删除</text>
									</view>
									<view>{{ val.content }}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else-if="showempty" class="text-empty">
			<text>空空如也</text>
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import core from "@/core.js"
	
	export default {
		computed: mapState(['hasLogin','userId']),
		name: 'comment',
		props: {
			showempty:{
				type:Boolean,
				default:false
			},
			comments:{
				type:Array,
				default:function(){
					return [];
				}
			},
			authorId:{
				type:Number,
				default:0
			}
		},methods:{
			naviTo(page,data){
				return core.navito(page,data);
			},
			removeComment(cid, pIndex, index){
				var that = this;
				return core.confirm(core.langs.text_delete_confirm,core.langs.text_confirm_title,function(){
					core.get('comment/delete',function(res){
						if(res.type!='success') return core.report(res);
						that.$emit('onremove', {
							dels:res.data.dels,
							pIndex: pIndex,
							index: index
						});
					},{cid:cid});
				});
			},
			reloadComment(){
				this.$emit('reload');
			}
		}
	}
</script>

<style>
	.cu-item.noaf .content{overflow: visible;}
	.cu-item.noaf .content::after{content: " "; position: absolute; left: 0; width: 100%; height: 1upx; bottom: -30upx; border-bottom: 1upx solid rgba(0, 0, 0, 0.1);}
	.sub-comments .cu-item{padding: 20upx 20upx 20upx 90upx !important;}
	.sub-comments .cu-item::after, .sub-comments .content::after{display: none;}
	.sub-comments .cu-item:last-child{padding-bottom: 0 !important;}
	.sub-comments .cu-item>.cu-avatar{left: 20upx;}
</style>
