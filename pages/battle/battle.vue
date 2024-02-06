<template>
	<view class="battle">
		<view class="battle-card">
			<view class="flex align-center">
				<image src="../../static/images/battle/battle-coin.png" class="battle-coin"></image>
				<view class="u-m-l-16 battle-text size-30">我的资格藏品</view>
			</view>
			<view class="battle-cont flex justify-between align-center u-m-t-24">
				<view class="flex align-center">
					<image :src="ticket.pic" mode="aspectFill" class="battle-img"></image>
					<view class="battle-text size-26 u-m-l-20">
						<view class="">{{ticket.name}}</view>
						<view class="u-m-t-50">X {{ticket.num}}</view>
					</view>
				</view>
				<view class="size-28">
					<view class="battle-bluebtn move-btn" @click="$u.route('/pages/battle/buylog')">明细</view>
					<view class="battle-yellowbtn move-btn u-m-t-15" @click="$u.route('/pages/battle/createOrder')">购买</view>
				</view>
			</view>
			<view class="flex align-center text-55 size-22 u-m-t-20">
				<view class="cuIcon-title text-bold u-m-r-10"></view>
				<view class="">资格藏品是参与对战游戏的唯一凭证。</view>
			</view>
		</view>

		<view class="battle-card flex justify-between align-center u-m-t-30">
			<view class="flex align-center">
				<image src="../../static/images/battle/battle-coin.png" class="battle-coin"></image>
				<view class="u-m-l-16 battle-text size-30">我的抵扣藏品 X{{mortgage}}</view>
			</view>
			<view class="battle-tagbtn text-bold" @click="$u.route('/pages/battle/goodslist')">查看详情</view>
		</view>

		<view class="battle-card grid col-3 u-m-t-30" style="padding-bottom: 0;">
			<view class="flex-center u-m-b-30" v-for="(item,index) in list" :key="index">
				<view class="battle-btn move-btn" @click="gopath(item.path)">{{item.name}}</view>
			</view>
		</view>

		<view class="battle-bottom flex justify-between align-center">
			<view class="battle-leftbtn move-btn" @click="battle">邀请对战</view>
			<view class="battle-rightbtn move-btn" @click="match">匹配对战</view>
		</view>
		
		<!-- 匹配对战相关弹窗 -->
		<battle-popup ref="battle" title="资格藏品或抵押藏品数量不足" content="当前账号资格藏品或抵押藏品数量不足，无法参与对战；请先前往购买。" confrimTxt="确定">
		</battle-popup>

		<battle-popup ref="battle1" title="退出后无法再次加入" content="确认退出后，如未出招，系统将随机出招 以至对局顺利完成。" confrimTxt="确认退出">
		</battle-popup>

		<battle-popup ref="battle2" title="请确认是否开始匹配" content="开始匹配后，将无法取消，如无后续操作，系统将随机出招，以至对局顺利完成。"
			confrimTxt="开始匹配" @confrim="confrim">
		</battle-popup>

		<battle-popup ref="battle3" title="邀请提醒" :content="`玩家：用户${info.id}（账号：${hidePhoneNo(info.phone)}）邀请您对战，是否迎战？`"
			confrimTxt="确认迎战" cancelTxt="拒绝迎战" @confrim="confrimVs" @cancel="cancelVs">
		</battle-popup>
		
		<battle-popup ref="battle4" title="对战提醒" :content="`您有对战正在进行中，是否前往查看？`"
			confrimTxt="前往对战" cancelTxt="取消" @confrim="goVs">
		</battle-popup>
		
		<!-- 邀请对战相关弹窗 -->
		<battle-invite ref="invite" :type="inviteType" :phone="info.phone" @restart="loadStatus()"></battle-invite>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: '对战排行榜',
						path: '/pages/battle/rank'
					},
					{
						name: '对战明细',
						path: '/pages/battle/log'
					},
					{
						name: '玩法规则',
						path: '/pages/battle/rule'
					},
					{
						name: '联系客服',
						path: '/pages/my/contact/contact'
					},
					// {
					// 	name: '抵押藏品购买',
					// 	path: ''
					// },
					// {
					// 	name: '抵押藏品管理',
					// 	path: ''
					// }
				],

				inviteType: 0,
				to_phone: '',
				
				ticket:{},
				mortgage:0,
				battle_status:0,
				
				// 定时器
				timer:null,
				// 定时器间隔
				interval: 10,
				// 邀请信息
				info:{}
			}
		},
		onShow() {
			this.loadData()
			this.initTimer()
		},
		onUnload() {
			clearInterval(this.timer)
			this.timer = null
		},
		onHide() {
			clearInterval(this.timer)
			this.timer = null
		},
		methods: {
			initTimer(){
				this.loadStatus()
				this.timer = setInterval(()=>{
					this.loadStatus()
				},10000)
			},
			loadStatus(){
				this.$u.api.battle_getStatus().then(res=>{
					// 0未发起 1匹配中 2邀请中 3邀请被拒 4对战中 5被邀请
					const status = res.data.battle_status
					this.battle_status = status
					if(String(res.data.info)==="[]"){
						this.info = {}
					}else{
						this.info = res.data.info
					}
					if(status==1){
						uni.showLoading({
							title: "匹配中..."
						})
					}else if(status==3){
						this.inviteType = 2
						this.$refs.invite.show()
					}else if(status==4){
						uni.hideLoading()
						this.$refs.invite.hide()
						this.$refs.battle4.show()
					}else if(status==5){
						this.$refs.battle3.show()
					}
				})
			},
			loadData(){
				this.$u.api.battle_index().then(res=>{
					this.ticket = res.data.ticket
					this.mortgage = res.data.mortgage
				})
			},
			battle() {
				// 0未发起 1匹配中 2邀请中 3邀请被拒 4对战中 5被邀请

				if(this.battle_status==0){
					this.$u.api.battle_check().then(res=>{
						this.inviteType = 0
						let status = res.data.check_status
						// 1资格藏品不足  2抵押藏品不足 3 ok
						if(status==3){
							this.$refs.invite.show()
						}else{
							this.$refs.battle.show()
						}
					})
				}else if(this.battle_status==2){
					// 邀请中：展示邀请人、取消邀请按钮
					this.inviteType = 1
					this.$refs.invite.show()
				}else if(this.battle_status==3){
					// 邀请被拒绝：展示邀请人、重新邀请、取消邀请按钮
					this.inviteType = 2
					this.$refs.invite.show()
				}
			},
			match() {
				this.$refs.battle2.show()
			},
			confrim(){
				this.$u.api.battle_match().then(res=>{
					if(res.data.battle_status==4){
						uni.hideLoading()
						this.goVs()
					}else{
						uni.showLoading({
							title: "匹配中..."
						})
					}
				})
			},
			confrimVs(){
				this.$u.api.battle_acceptInvite({
					id: this.info.id
				}).then(res=>{
					clearInterval(this.timer)
					this.timer = null
					this.$refs.battle3.hide()
					this.goVs()
				})
			},
			cancelVs(){
				this.$u.api.battle_refuseInvite({
					id: this.info.id
				}).then(res=>{
					uni.showToast({
						title:"已拒绝邀请",
						icon:"none"
					})
					this.$refs.battle3.hide()
				})
			},
			goVs(){
				uni.navigateTo({
					url:"./vs"
				})
			},
			gopath(path){
				setTimeout(()=>{
					uni.navigateTo({
						url:path
					})
				},300)
			},
			hidePhoneNo(param) {
				if(!param)return
				
				return param.substr(0,3) + "****" + param.substr(7)
			},
			closeAllPopup(){
				this.$refs.battle.hide()
				this.$refs.battle1.hide()
				this.$refs.battle2.hide()
				this.$refs.battle3.hide()
				this.$refs.invite.hide()
			}
		}
	}
</script>

<style lang="scss">
	.battle {
		width: 750rpx;
		height: calc(100vh - var(--window-top));
		background-image: url("../../static/images/battle/battle-bg.png");
		background-size: cover;
		padding: 60rpx 40rpx 0 40rpx;

		.battle-card {
			padding: 30rpx;
			background-color: #DFE4FF;
			border-radius: 24rpx;

			.battle-coin {
				width: 50rpx;
				height: 50rpx;
			}

			.battle-text {
				font-weight: bold;
				-webkit-text-stroke: 2rpx #1F185C;
				-webkit-text-fill-color: #FFFFFF;
			}

			.battle-cont {
				padding: 20rpx;
				border-radius: 16rpx;
				background-color: #b8bce8;

				.battle-img {
					width: 138rpx;
					height: 138rpx;
					border-radius: 12rpx;
				}

				.battle-bluebtn {
					width: 120rpx;
					height: 46rpx;
					background-image: url("../../static/images/battle/blue-btn.png");
					background-size: 100% 100%;
					text-align: center;
					line-height: 46rpx;
					font-weight: bold;
					-webkit-text-stroke: 1rpx #5B65A2;
					-webkit-text-fill-color: #FFFFFF;
				}

				.battle-yellowbtn {
					width: 120rpx;
					height: 46rpx;
					background-image: url("../../static/images/battle/yellow-btn.png");
					background-size: 100% 100%;
					text-align: center;
					line-height: 46rpx;
					font-weight: bold;
					-webkit-text-stroke: 1rpx #A15E12;
					-webkit-text-fill-color: #FFFFFF;
				}
			}

			.battle-tagbtn {
				padding: 0 24rpx;
				height: 50rpx;
				line-height: 46rpx;
				border: 2rpx solid #251987;
				color: #707070;
				font-size: 22rpx;
				border-radius: 25rpx;
			}

			.battle-btn {
				width: 190rpx;
				height: 78rpx;
				background-image: url("../../static/images/battle/yellow-btn.png");
				background-size: 100% 100%;
				text-align: center;
				line-height: 78rpx;
				font-weight: bold;
				font-size: 26rpx;
				-webkit-text-stroke: 2rpx #A15E12;
				-webkit-text-fill-color: #FFFFFF;
			}
		}

		.battle-bottom {
			width: 750rpx;
			height: 140rpx;
			padding: 0 30rpx;
			background-color: #DFE4FF;
			position: fixed;
			bottom: 0;
			left: 0;
			z-index: 1;

			.battle-leftbtn {
				width: 332rpx;
				height: 90rpx;
				background-image: url("../../static/images/battle/left-btn.png");
				background-size: 100% 100%;
				text-align: center;
				line-height: 90rpx;
				font-size: 28rpx;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #231C6A;
				-webkit-text-fill-color: #FFFFFF;
			}

			.battle-rightbtn {
				width: 332rpx;
				height: 90rpx;
				background-image: url("../../static/images/battle/right-btn.png");
				background-size: 100% 100%;
				text-align: center;
				line-height: 90rpx;
				font-size: 28rpx;
				font-weight: bold;
				-webkit-text-stroke: 2rpx #9B0C0C;
				-webkit-text-fill-color: #FFFFFF;
			}
		}
	}
</style>
