<template>
	<view class="page" :class="getThemeClass">
    <!-- 申请商户 -->
    <view v-if="AppliStatus == 0">
      <view class="u-m-l-28 size-28">商户名称</view>
      <view class="card-bg recharge_card flex align-center">
        <input type="text" placeholder="请输入商户名称" class="size-24" v-model="params.name">
      </view>
			<view class="u-m-l-28 size-28">请输入联系方式</view>
      <view class="card-bg recharge_card flex align-center">
        <input type="number" placeholder="请输入联系方式" class="size-24" v-model="params.phone">
      </view>
      <view class="u-m-l-28 size-28">申请商户级别</view>
      <view class="card-bg recharge_card flex align-center" style="padding:10rpx 36rpx;">
        <u-input v-model="levelList.name" placeholder="请选择申请商户级别" type="select" @click="show = true" :custom-style="{color:'#FFFFFF'}" />
        <u-select v-model="show" value-name="id" label-name="name" @confirm="confirm" :list="actionSheetList"></u-select>
      </view>
      <view class="u-m-l-28 size-28">平台联系方式</view>
      <view class="card-bg recharge_card flex align-center">
        <input type="number" placeholder="平台联系方式" disabled class="size-24" v-model="official_phone">
      </view>
			<view class="u-m-l-28 size-28">平台收币地址</view>
      <view class="card-bg recharge_card flex align-center">
        <input type="text" placeholder="平台收币地址" disabled class="size-24" v-model="usdt_address">
      </view>
      <view class="u-m-l-28 size-28">需支付保证金额</view>
      <view class="paywayBtn">{{levelList.margin?levelList.margin:0}}USDT</view>
      <view class="u-m-l-28 size-28">每日出售总量</view>
      <view class="paywayBtn">{{levelList.total?levelList.total:0}}USDT</view>
      <view class="u-m-l-28 size-28">上传支付凭证</view>
      <view class="u-m-l-28 u-m-t-28 u-m-b-28">
        <view class="flex flex-wrap">
          <image :src="path" mode="aspectFill" class="issue-img u-m-r-20 u-m-b-20" v-if="path != null"></image>
          <image src="/static/images/my/dark/zfpz.png" class="issue-img" @click="upload" v-else></image>
        </view>
      </view>
      <view class="submitBtn" style="margin-top: 100rpx;" @click="submit">确定提交</view>
    </view>
    <!-- 等待审核中 -->
    <view v-if="AppliStatus == 1">
      <view class="examine">
        <image class="examine-img" src="/static/images/my/dark/examine.png" mode=""/>
        <view class="examine-text">已提交，等待审核中</view>
        <view class="examine-btn" @click="backOwner">返回商户</view>
      </view>
    </view>
    <!-- 审核通过 -->
    <view v-if="AppliStatus == 2">
      <view class="examine">
        <image class="examine-img" src="/static/images/my/dark/auditCompleted.png" mode=""/>
        <view class="examine-text">审核通过</view>
        <view class="examine-btn" @click="backOwner">返回商户</view>
      </view>
    </view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				action : `${uni.$myAppConfig.baseUrl}/api/upload_file`,
				header:{
					token: uni.getStorageSync('token'),
					lang: uni.getStorageSync('lang'),
				},
				recharge:'',
				params:{
					name:'',
					phone:'',
					pay_proof:null,
					level:''
				},
				path:null,
        show: false,
        actionSheetList: [
				],
				levelList:[],
        AppliStatus:-1,
				official_phone:'',
				usdt_address:'',
			};
		},
		computed: {
			
		},
		onLoad() {
			this.walletShow()
		},
		methods: {
			walletShow() {
				this.$u.api.Trading_preview().then(res => {
					this.AppliStatus = res.data.list.appli_status
					this.actionSheetList = res.data.list.level
					this.official_phone = res.data.list.official_phone
					this.usdt_address = res.data.list.usdt_address

					
				}).catch(err => {
			
				})
			},
			//等级下拉
			confirm(e){
				this.levelList = this.actionSheetList.find(el=>el.id == e[0].value)
				this.params.level = this.levelList.level
				console.log(this.levelList);
			},
			showErrorMessage(message) {
				this.$refs.uToast.show({
					title: message,
					type: 'error'
				});
			},
			submit() {
				const validationRules = [
					{ field: "name", message: "请输入商户名称" },
					{ field: "phone", message: "请输入联系方式" },
					{ field: "level", message: "请选择申请商户级别" },
					{ field: "pay_proof", message: "请上传支付凭证" }
				];
				for (const rule of validationRules) {
					if (!this.params[rule.field]) {
						this.showErrorMessage(rule.message);
						return;
					}
				}
				// console.log(this.params);
				this.$u.api.Trading_apply_merchant(this.params).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title:'申请成功',
							icon:"none"
						})
						setTimeout(()=>{
							uni.navigateBack()
						},1000)
					}
				}).catch(err => {
							
				})
			},
			upload(){
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: this.action,
							filePath: tempFilePaths[0],
							name: 'pic',
							header:this.header,
							formData:{
								sence: 'district'
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data)
								console.log(res);
								if(res.code==200){
									this.params.pay_proof = res.data.path
									this.path = res.data.real_path
								}
							}
						});
					}
				});
			},
      backOwner(){
        uni.navigateBack();
      }
		}
	}
</script>

<style lang="scss" scoped>
	/deep/.u-list-item[data-v-49deb6f2]{
		background-color: #1E1E1E;
	}
	/deep/.u-add-wrap[data-v-49deb6f2]{color: #D7D9DE;}
	.submitBtn{
		width: 646rpx;
		height: 100rpx;
		border-radius: 50rpx;
		background: #2283EC;
		color: #FFFFFF;
		margin: 0 auto;
		text-align: center;
		line-height: 100rpx;
	}
	.issue-img{
		width: 211rpx;
		height: 211rpx;
		border-radius: 24rpx;
	}
	.recharge_card{
		margin: 28rpx;
		padding: 26rpx 36rpx;
		border-radius: 50rpx;
	}
  .paywayBtn{
    width: 230rpx;
    height: 88rpx;
    line-height: 88rpx;
    color: #2283EC;
    text-align: center;
		margin: 28rpx;
    border-radius: 44rpx;
    border: 1rpx solid #2283EC;
  }
	.copy_card{
		margin: 28rpx;
		border-radius: 50rpx;
		.copy_icon{
			width: 180rpx;
			height: 88rpx;
			border-radius: 44rpx;
			background: #2283EC;
			color: #FFFFFF;
			text-align: center;
			line-height: 88rpx;
		}
	}
  .examine{
    width: 100%;
    text-align: center;
    margin-top: 125rpx;
    .examine-img{
      width: 124rpx;
      height: 124rpx;
    }
    .examine-text{
      font-size: 36rpx;
      margin-top: 30rpx;
    }
    .examine-btn{
      width: 646rpx;
      height: 100rpx;
      line-height: 100rpx;
      font-size: 32rpx;
      border-radius: 50rpx;
      background: #1E1E1E;
      margin: 0 auto;
      margin-top: 86rpx;
    }
  }
</style>
