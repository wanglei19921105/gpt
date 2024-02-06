<template>
	<view class="page" :class="getThemeClass">
		<image :src="paint.image_path" mode="widthFix" class="galleryCover" style=""></image>
		<view style="height: 710rpx;"></view>
		<view class="gallery_item">
			<view class="flex align-center justify-between border-bottom u-p-b-30 u-m-b-30">
				<view class="flex align-center">
					<u-image :src="user.avatar" width="48rpx" height="48rpx" shape="circle"></u-image>
					<view class="u-m-l-16">{{user.nickname}}</view>
				</view>
				<view class="size-22 text-tips">来自@普鸽版权</view>
			</view>
			<view class="">
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">关键字设置：</view>
					<view class="text-tips">{{paint.text_prompt}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">类型设置：</view>
					<view class="text-tips">{{paint.group_type == 1?'通用设计':''||paint.group_type == 3?'现实设计':'动漫设计'}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">画风设置：</view>
					<view class="text-tips">{{paint.painting_style}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">画家设置：</view>
					<view class="text-tips">{{paint.painter}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">图画比例：</view>
					<view class="text-tips">{{paint.ratio_type == 3?'16:9':''||paint.group_type == 4?'9:16':''||paint.group_type == 2?'1:1':''}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">是否上传参考图：</view>
					<view class="text-tips">{{paint.init_image_path == null?'否':'是'}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">消耗次数：</view>
					<view class="text-tips">1</view>
				</view>
				<view class="flex align-center justify-between size-28">
					<view class="">生成时间：</view>
					<view class="text-tips">{{paint.created_at}}</view>
				</view>
				<view class="text-center downloadImg" @click="downloadImg">点击保存图片</view>
			</view>
			<view class="galleryBtn flex align-center justify-around" v-if="type == 1">
				<view style="background-color: #EEEEEE;color: #808388;" @click="Delete()">删除绘画</view>
				<view style="border: 1rpx solid #007BFF;color: #007BFF;" @click="zhutiList">发布展览</view>
				<view style="background-color: #007BFF;color: #FFFFFF;" @click="zhuzao">铸造藏品</view>
			</view>
		</view>
		<u-popup mode="bottom" border-radius="32" :closeable="true" height="450px" v-model="show">
			<view class="AIPopup">
				<view class="size-32 bold-500 text-center u-m-b-48">选择主题</view>
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox 
						@change="checkboxChange(item.id)" 
						v-model="item.checked" 
						v-for="(item, index) in list" :key="index" 
						:name="item.title"
						class="sizx-26 u-m-r-50 u-m-b-20"
					>{{item.title}}</u-checkbox>
				</u-checkbox-group>
				<view class="AIPopupBtn" @click="submit">确定发布</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				subject_id:'',
				type:0,
				show:false,
				user:'',
				paint:'',
				list: [
					{
						name: '造物博物馆',
						checked: false,
						disabled: false
					},
					{
						name: '潮玩 ',
						checked: false,
						disabled: false
					},
					{
						name: '敦煌系列',
						checked: false,
						disabled: false
					},
					{
						name: '四月',
						checked: false,
						disabled: false
					},
					{
						name: '东京梦华录',
						checked: false,
						disabled: false
					},
					{
						name: '清明上河图',
						checked: false,
						disabled: false
					}
				]
			};
		},
		onLoad(data) {
			this.type = data.type
			this.id = data.id
			this.loadData()
		},
		methods:{
			downloadImg(){
				uni.showLoading({
					title: '下载中...',
					mask: true
				})
				uni.downloadFile({
					url: this.paint.image_path, // 这里是你接口地址 若要传参 直接 url拼接参数即可
					// header:{
					// 	'X-Authorization': uni.getStorageSync('session.login')['token']
					// },
					// methods: 'GET',
						success: (res) => {
							console.log(res,'res')
							var tempFilePath = res.tempFilePath; // 这里拿到后端返回的图片路径
							uni.saveImageToPhotosAlbum({  // 然后调用这个方法
								filePath: tempFilePath,
								success : (res) => {
									uni.hideLoading();
									uni.showToast({title : '图片已保存到相册'})
								}
							})
						},
					fail: () => {
						uni.hideLoading();
					}
				});
			},
			zhuzao(){
				uni.navigateTo({
					url:'/pages/tabbar/foundry/foundry?path='+this.paint.image_path
				})
			},
			loadData(){
				this.$u.api.gallery_detail({
					id:this.id
				}).then(res => {
					// console.log(res.data);
					this.user = res.data.user_one
					this.paint = res.data.paint
				}).catch(err => {})
			},
			zhutiList(){
				this.show = true
				this.$u.api.gallery_subject().then(res => {
					// console.log(res.data);
					this.list = res.data.subject
				}).catch(err => {})
			},
			Delete(){
				this.$u.api.gallery_del({
					id:this.id
				}).then(res => {
					this.$refs.uToast.show({
						title: '删除成功!',
						type: 'success',
						duration: 1000,
						callback: () => {
							uni.navigateBack()
						}	
					})
					
				}).catch(err => {})
			},
			submit(){
				this.$u.api.gallery_publish({
					subject_id:this.subject_id,
					id:this.id
				}).then(res => {
					this.$refs.uToast.show({
						title: '发布成功!',
						type: 'success',
						duration: 1000,
						callback: () => {
							uni.navigateBack()
						}	
					})
					
				}).catch(err => {})
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// console.log(e);
				this.subject_id = e
			},
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(e);
			},
			// 全选
			checkedAll() {
				this.list.map(val => {
					val.checked = true;
				})
			}
		}
	}
</script>

<style lang="scss">
.page{position: relative;}
.downloadImg{
	position: absolute;
	top: -130rpx;
	right: 30rpx;
	width: 250rpx;
	padding: 20rpx;
	border-radius: 20rpx;
	margin: 40rpx auto 0;
	color: #FFFFFF;
	z-index: 100;
	background-color: rgba(0, 0, 0, .2);
}
.AIPopup{
	padding: 40rpx 28rpx;
	padding-bottom: 150rpx;
	.AIPopupBtn{
		padding: 25rpx 290rpx;
		background-color: #007BFF;
		color: #FFFFFF;
		margin-top: 150rpx;
		border-radius: 44rpx;
		position: fixed;
		bottom: 30rpx;
	}
}
.galleryBtn{
	margin-top: 120rpx;
	>view{
		width: 188rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 36rpx;
		
	}
}
.galleryCover{
	position: absolute;
	width: 750rpx;
	z-index: 1;
	display: block;
}
.gallery_item{
	background-color: #FFFFFF;
	position: absolute;
	width: 750rpx;
	
	border-radius: 32rpx 32rpx 0rpx 0rpx;
	z-index: 10;
	padding: 46rpx 52rpx;
}
</style>
