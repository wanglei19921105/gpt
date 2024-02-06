<template>
	<view class="page" :class="getThemeClass">
		<view>
			<view class="title">
				<image src="../../../static/images/AIcreate/AI1.png" mode="widthFix"></image>
				<view class="">关键字设置</view>
			</view>
			<view class="KeyWord">
				<textarea :maxlength="maxlength" auto-height
					@input="importStart()"
					@blur="handleKeyUp"
					v-model="payload.content" 
				 placeholder="请输入关键词"/>
				<view class="keyNumber">{{keyNum}}/{{maxlength}}</view>
			</view>
		</view>
		<view>
			<view class="title">
				<image src="../../../static/images/AIcreate/AI2.png" mode="widthFix"></image>
				<view class="">类型设置</view>
			</view>
			<view class="typeList flex">
				<view class="size-24 u-m-r-20" v-for="(item,index) in typeList" :key="index" :class="cur == index ? 'textActiveClass' : 'textClass'" @click="tabClick(index)">{{item.name}}</view>
			</view>
		</view>
		<view>
			<view class="title">
				<image src="../../../static/images/AIcreate/AI3.png" mode="widthFix"></image>
				<view class="">画风设置</view>
			</view>
			<scroll-view scroll-x="true" class="scroll-view_H" @touchmove.stop>
				<view class="scroll-view-item">
					<view class="Paint" v-for="(item,index) in paintStyle" :key="item.id" @click="obtainengine(item,index)" :class="StyleSelect == index ? 'Paintactive' : ''">
						<image :src="item.poster" mode=""></image>
						<view class="line-1 title flex justify-center">{{item.text}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-show="cur == 0">
			<view class="title">
				<image src="../../../static/images/AIcreate/AI4.png" mode="widthFix"></image>
				<view class="">画家设置</view>
			</view>
			<scroll-view scroll-x="true" class="scroll-view_H" @touchmove.stop>
				<view class="scroll-view-item">
					<view class="Paint" v-for="(item,index) in painter" :key="item.id" @click="obtainpaint(item,index)" :class="paintSelect == index ? 'Paintactive' : ''">
						<image :src="item.poster" mode=""></image>
						<view class="line-1 title flex justify-center">{{item.text}}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view>
			<view class="title">
				<image src="../../../static/images/AIcreate/AI5.png" mode="widthFix"></image>
				<view class="">图画比例</view>
			</view>
			<view class="proportion flex" >
				<view class="propor_msg" v-for="(item,index) in proporList" :key="index" :class="cur2 == index ? 'textActiveClass' : 'textClass'">
					<view class="" @click="tabClick2(index)">
						<image :src="item.url" mode="widthFix" style="width: 100rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		<view>
			<view class="title">
				<image src="../../../static/images/AIcreate/AI6.png" mode="widthFix"></image>
				<view class="">上传参考图片</view>
			</view>
			<view class="KeyWord" @click="upload">
				<view class="UpLoad_img" v-if="AIparameter.init_image">
					<image :src="AIparameter.init_image" class="cankaoimg" mode="aspectFill"></image>
				</view>
				<view class="UpLoad flex align-center" v-else>
					<image src="../../../static/images/AIcreate/AI7.png" class="UpLoadimg" mode="widthFix"></image>
					<view class="size-28 text-content">上传图片</view>
				</view>
			</view>
		</view>
		<view class="AIBtn size-32" @click="GenerateNow">立即生成
			<text class="size-26" v-if="painting_num != 0">(今日剩余次数：{{painting_num}}次)</text>
			<text class="size-26" v-else>(今日创作次数已上限)</text>
		</view>
		<u-popup mode="bottom" border-radius="32" :closeable = "true" height="450px" v-model="show">
			<view class="AIPopup">
				<view class="size-32 bold-500 text-center u-m-b-48">确认选项</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">关键字设置：</view>
					<view class="text-tips">{{payload.content}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">类型设置：</view>
					<view class="text-tips">{{AIparameter.group_type==1?'通用设计':AIparameter.group_type==2?'动漫设计':'现实设计'}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">画风设置：</view>
					<view class="text-tips">{{AIparameter.painting_style}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">画家设置：</view>
					<view class="text-tips">{{AIparameter.painter}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">图画比例：</view>
					<view class="text-tips">{{AIparameter.ratio==2?'方图1:1':AIparameter.ratio==3?'横图16:9':'竖图9:16'}}</view>
				</view>
				<view class="flex align-center justify-between size-28 u-m-b-36">
					<view class="">是否上传参考图：</view>
					<view class="text-tips">{{AIparameter.init_image?'是':'否'}}</view>
				</view>
				<view class="flex align-center justify-between size-28">
					<view class="">消耗次数：</view>
					<view class="text-tips">1</view>
				</view>
				<view class="AIPopupBtn" @click="AIgenerate">确认提交</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyNum:0,
				maxlength:500,
				payload:{
					content: '',
				},
				cur:0,
				cur2:0,
				StyleSelect:0,
				paintSelect:0,
				typeList:[
					{name:'通用设计'},
					{name:'动漫设计'},
					{name:'现实设计'}
				],
				proporList:[
					{name:'方图1:1',url:'../../../static/images/AIcreate/size1.png'},
					{name:'横图16:9',url:'../../../static/images/AIcreate/size2.png'},
					{name:'竖图9:16',url:'../../../static/images/AIcreate/size3.png'}
				],
				show:false,
				paintStyle:[],//画风
				painter:[],//画家
				painting_num:0,
				AIparameter:{
					prompt:'',  //关键词,如果选择了画家在关键词后拼接[, by {风格接口artist里的value字段}]
					ratio:2, //画图比例 2是正方形, 3是16:9, 4是9:16
					style:'', //风格,风格接口style里的value字段
					engine:'', //使用的引擎,风格接口style里的engine字段
					init_image:'', //参考图,不需要可以不传此字段
					group_type:1, //类型设置   1=>通用设计,2=>动漫设计,3=>现实设计
					painting_style:'', //画风名称,风格接口style里的text字段
					painter:'',  //画家名称,风格接口artist里的text字段
				}
			};
		},
		onHide() {
			// this.initialization()
		},
		onLoad() {
			this.init()
		},
		methods:{
			init(){
				this.$u.api.selector({type:this.cur+1}).then(res=>{
					this.paintStyle = res.data.style
					this.painter = res.data.artist
					this.painting_num = res.data.painting_num
					this.AIparameter.style = this.paintStyle[0].value
					this.AIparameter.engine = this.paintStyle[0].engine
					this.AIparameter.painting_style = this.paintStyle[0].text
					this.AIparameter.painter = this.painter[0].text
					// console.log(res,'res===');
				})
			},
			initialization(){
				this.$u.api.selector({type:this.cur+1}).then(res=>{
					this.paintStyle = res.data.style
					this.painter = res.data.artist
					this.painting_num = res.data.painting_num
					this.AIparameter.style = this.paintStyle[0].value
					this.AIparameter.engine = this.paintStyle[0].engine
					this.AIparameter.painting_style = this.paintStyle[0].text
					this.AIparameter.painter = this.painter[0].text
					this.cur = 0
					this.cur2 = 0
					this.StyleSelect = 0
					this.paintSelect = 0
					this.payload.content = ''
					this.AIparameter.prompt = ''
					this.AIparameter.ratio = 2
					this.AIparameter.init_image = ''
					this.AIparameter.group_type = 1
					this.keyNum = 0
					this.show = false
					// console.log(res,'res===');
				})
			},
			tabClick(index){ // 类型设置
				if(this.cur==index)return
				this.cur = index
				this.StyleSelect = 0
				this.$u.api.selector({type:this.cur+1}).then(res=>{
					this.paintStyle = res.data.style
					// console.log(res,'res===');
				})
				// console.log(this.paintStyle);
				// this.AIparameter.painter = this.paintStyle[0].text
				if(index == 0){
					this.AIparameter.group_type = 1
				}else if(index == 1){
					this.AIparameter.group_type = 2
					this.AIparameter.painter = ''
					this.AIparameter.prompt = this.payload.content
				}else if(index == 2){
					this.AIparameter.group_type = 3
					this.AIparameter.painter = ''
					this.AIparameter.prompt = this.payload.content
				}
			},
			tabClick2(index){ // 图画比例
				if(this.cur2==index)return
				this.cur2 = index
				if(index == 0){
					this.AIparameter.ratio = 2
				}else if(index == 1){
					this.AIparameter.ratio = 3
				}else if(index == 2){
					this.AIparameter.ratio = 4
				}
			},
			importStart() { //输入时
				this.keyNum = this.payload.content.length;
			},
			handleKeyUp(){
				this.payload.content = this.payload.content.replace(/，/g, ',');
				this.AIparameter.prompt = this.payload.content
			},
			obtainengine(item,index){  //画风列表点击
				if(this.StyleSelect==index)return
				this.StyleSelect = index
				this.AIparameter.style = item.value
				this.AIparameter.engine = item.engine
				this.AIparameter.painting_style = item.text
			},
			obtainpaint(item,index){  //画家列表点击
				if(this.paintSelect==index)return
				this.paintSelect = index
				this.AIparameter.painter = item.text
				if(index > 0){
					this.AIparameter.prompt = this.payload.content +', by '+ item.value
				}
			},
			GenerateNow(){
				if (!this.payload.content) {
					uni.showToast({
						icon:"none",
						title:"请输入关键字"
					})
					return
				}
				this.show = true
			},
			AIgenerate(){
				// console.log(this.AIparameter,'this.AIparameter-------');
				this.$u.api.put_task(this.AIparameter).then(res=>{
					uni.navigateTo({
						url:'/pages/AIcreation/myGallery/myGallery'
					})
				}).catch(err=>{
					uni.showToast({
						icon:"none",
						title:"生成失败"
					})
				})
			},
			upload(){
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: 'http://pg.metapuge.com/api/upload_file',
							filePath: tempFilePaths[0],
							name: 'pic',
							header:{
								'token': uni.getStorageSync('token')
							},
							formData:{
								sence: 'district'
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data)
								if(res.code==200){
									this.AIparameter.init_image=res.data.real_path
								}
							}
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page{
		padding: 30rpx;
		padding-top: 0;
	}
	.AIPopup{
		padding: 40rpx 52rpx;
		.AIPopupBtn{
			text-align: center;
			padding: 25rpx 200rpx;
			background-color: #007BFF;
			color: #FFFFFF;
			margin-top: 150rpx;
			border-radius: 44rpx;
		}
	}
	.AIBtn{
		width: 694rpx;
		height: 82rpx;
		line-height: 82rpx;
		background: #007BFF;
		border-radius: 41rpx;
		color:#FFFFFF;
		text-align: center;
		margin-top: 120rpx;
	}
	.proportion{
		.textActiveClass{background: linear-gradient(180deg, #0C7CFE 0%, #E545E8 100%);}
		.textClass{background-color: #CECECE;}
		.propor_msg{
			width: 104rpx;
			height: 132rpx;
			border-radius: 20rpx;
			margin-right: 24rpx;
			padding: 2rpx;
			text-align: center;
			>view{
				width: 100rpx;
				height: 128rpx;
				border-radius: 20rpx;
				background-color: #FFFFFF;
				
			}
		}
	}
	.scroll-view_H{
			white-space: nowrap;
			overflow: hidden;
			box-sizing: border-box;
		.scroll-view-item{
			width: fit-content;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			box-sizing: border-box;
			.Paintactive{
				border:5rpx #007BFF solid;
				width: 190rpx !important;
				height: 190rpx !important;
			}
			.Paint{
				width: 180rpx;
				height: 180rpx;
				position: relative;
				margin-right: 24rpx;
				border-radius: 20rpx;
				.title{
					width: 100%;
					height: 100%;
					position: absolute;
					top: -40rpx;
					z-index: 10;
					font-size: 22rpx;
					border-radius: 20rpx;
					color: #FFFFFF !important;
					background: rgba(0, 0, 0, .4);
				}
				image{
					// position: absolute;
					border-radius: 18rpx;
					width: 100%;
					height: 100%;
					z-index: 1;
				}
			}
		}
	}
	.typeList{
		>view{
			padding: 20rpx 32rpx;
			border-radius: 36rpx;
		}
		.textClass{
			background-color: #EEEEEE;
			color: #808388;
		}
		.textActiveClass{
			background: linear-gradient(90deg, #007BFF 0%, #3999FF 100%);
			color: #FFFFFF;
		}
	}
	.KeyWord{
		background: linear-gradient(180deg, #0E7CFE 0%, #E445E8 100%);
		border-radius: 24rpx;
		padding: 2rpx;
		position: relative;
		.UpLoad_img{
			width: 685rpx;
			height: 200rpx;
			.cankaoimg{
				width: 100%;
				height: 100%;
			}
		}
		.UpLoad{
			border-radius: 24rpx;
			padding: 70rpx 250rpx;
			background-color: #F9F9F9;
			font-size: 26rpx;
			z-index: 10;
			.UpLoadimg{
				width: 30rpx;
				margin: 10rpx;
			}
		}
		.keyNumber{
			position: absolute;
			color: #AFB2B8;
			font-size: 26rpx;
			right: 30rpx;
			bottom: 30rpx;
			z-index: 100;
		}
		textarea{
			min-height: 150rpx;
			width: 638rpx;
			border-radius: 24rpx;
			padding: 34rpx 24rpx;
			background-color: #F9F9F9;
			font-size: 26rpx;
			z-index: 10;
		}
	}
	
.title{
	display: flex;
	align-items: center;
	font-size: 32rpx;
	color: #FFFFFF;
	font-weight: 500;
	margin-bottom: 24rpx;
	margin-top: 40rpx;
	image{
		width: 32rpx;
		margin-right: 10rpx;
	}
}
</style>
