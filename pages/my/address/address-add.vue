<template>
	<view class="page" :class="getThemeClass">
		<view class="address">
			<view class="main-card">
				<view class="flex align-center">
					<view class="address-label flex-shink">收货人</view>
					<input type="text" v-model="name" placeholder="请填写收货人姓名" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
				<view class="flex align-center u-m-t-60">
					<view class="address-label flex-shink">手机号码</view>
					<input type="number" :maxlength="11" v-model="mobile" placeholder="请填写手机号码" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
				<view class="flex align-center u-m-t-60">
					<view class="address-label flex-shink">地区</view>
					<view class="flex-1 flex justify-between align-center u-font-30" @click="show=true">
						<view v-if="region">{{region}}</view>
						<view class="text-placeholder" v-else>请选择地区</view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="flex align-center u-m-t-60">
					<view class="address-label flex-shink">详细地址</view>
					<input type="text" v-model="address" placeholder="请填写详细地址" placeholder-class="u-font-30 text-placeholder" class="flex-1 u-font-30" />
				</view>
			</view>
			<view class="main-card u-m-t-30 flex justify-between align-center u-m-b-50">
				<view class="u-font-30 text-bold">设为默认收货地址</view>
				<u-switch v-model="is_default"></u-switch>
			</view>
			
			<u-button type="primary" shape="circle" @click="submit">保存</u-button>
		</view>
		
		<u-picker v-model="show" mode="region" @confirm="confirm"></u-picker>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default{
		data(){
			return{
				show: false,
				is_default: false,
				name:'',
				mobile:'',
				region:'',
				region_code:'',
				address:''
			}
		},
		methods:{
			confirm(e){
				this.region_code = `${e.province.value}-${e.city.value}-${e.area.value}`
				this.region = `${e.province.label}${e.city.label}${e.area.label}`
			},
			submit(){
				if(!this.name)return this.$refs.uToast.show({title: "请填写收货人姓名",type: 'error'})
				if(!this.mobile)return this.$refs.uToast.show({title: "请填写手机号码",type: 'error'})
				if(!this.region)return this.$refs.uToast.show({title: "请选择地区",type: 'error'})
				if(!this.address)return this.$refs.uToast.show({title: "请填写详细地址",type: 'error'})
				this.$u.api.address_add({
					name:this.name,
					mobile:this.mobile,
					region:this.region,
					region_code:this.region_code,
					address:this.address,
					is_default:this.is_default
				}).then(res=>{
					this.$refs.uToast.show({title: "保存成功",type: 'success'})
					setTimeout(()=>{
						uni.redirectTo({
							url:"./address"
						})
					},1200)
				})
			}
		}
	}
</script>

<style lang="scss">
	.address{
		padding: 30rpx;
		.address-label{
			width: 150rpx;
			font-size: 30rpx;
		}
	}
</style>