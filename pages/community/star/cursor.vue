<template>
	<view class="page">

		<view class="top">
			<view class="" style="margin-left: 30rpx;" @click="fanh">
				<u-icon name="arrow-left" color="#ffffff" size="36"></u-icon>
			</view>
			<view class="" style="color: #fff;">
				选择坐标
			</view>
			<view class="">

			</view>
		</view>
		<view class="">
			<image src="../../../static/images/raggs.png" style="width: 270rpx; height: 74rpx;margin-left: 430rpx;"
				mode=""></image>
		</view>

		<view class="name" style="color: #fff;">
			<view class="" v-for="(item,index) in list" :key="index">
				<image :src="`../../../static/images/32${index%7+1}.png`" mode=""></image>
				<!-- <view class="">
					{{item[index+1]}}
				</view> -->
				<view class="xuanzhe">
					
					<view class="ruzhu" v-if="item[index+1]==0" @click="open(index+1)">
						<view class="ID">
							居民(未入驻)
							<br>
							<text style="padding-left: 70rpx; font-size: 16rpx; color: #A4A6AC;">NO:{{index+1}}</text>
							
						</view>
						
					</view>
					<view class="ruzhu" v-if="item[index+1]==1" @click="yiruzhu">
						<view class="ID">
							居民(已入住)
							<br>
							<text style="padding-left: 70rpx; font-size: 16rpx; color: #A4A6AC;">NO:{{index+1}}</text>
						</view>
					</view>
					
				</view>
				<view class="wdzt-y" v-if="add==index+1" @click="my_booth">
					<view class="wdzt">
						进入我的展台
					</view>
					
				</view>
			</view>
			<view class="" style="height: 300rpx;">

			</view>
		</view>


		<uni-popup ref="popup" type="center">
			<view class="kapian">
				<image src="../../../static/images/322.png" mode=""></image>

				<view class="neirong">
					确定选择<text v-if="obj.star_id==1">地球</text><text v-if="obj.star_id==2">海王星</text><text v-if="obj.star_id==3">水星</text><text v-if="obj.star_id==4">火星</text><text v-if="obj.star_id==5">天王星</text><text v-if="obj.star_id==6">木星</text><text v-if="obj.star_id==7">金星  </text>-{{obj.id}}-{{id}}？
				</view>
				<view class="tishi">
					确认坐标位置之后将不能改变，确定要选择该坐标吗？
				</view>
				<view class="button">
					<view class="" style="background-color: #2B2C2D; color:#A4A6AC ;" @click="close">
						重新选择
					</view>
					<view class="affirm" style="" @click="addPlanet">
						确定坐标
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				star_id: '',
				// i:1,
				list: [],
				obj: [],
				id: '',
				xinq:"",
				add:'',
				
			}
		},
		onLoad(option) {
			
			this.obj = JSON.parse(decodeURIComponent(option.data))
			console.log(this.obj);
			this.$u.api.floorDetail({
				star_id: this.obj.star_id, //星球id
				floor: this.obj.id //层数
			}).then(res => {
				this.list = res.data.room_info
				this.add = res.data.self_room_num
				console.log(this.add);
				this.close()
			})
			
		},
		methods: {
			my_booth(){//进入我的展台
				let booth={
					star_id:this.obj.star_id,//星球id
					floor:this.obj.id,//层数
					room:this.add
				}
				console.log(booth);
				uni.navigateTo({
					url:'./my_booth?booth='+ encodeURIComponent(JSON.stringify(booth)),
				})
			},
			yiruzhu(){//已入住
				// uni.navigateTo({
				// 	url:"./booth"
				// })
				uni.showToast({
				  title: '该坐标已有用户居住请选择其他坐标',
				  icon: 'none',
				  duration: 2000
				});
			},
			fanh() {
				uni.navigateBack()
			},
			tioazhuan() {

			},
			// id(index){
			// 	console.log(index);
			// },
			open(index) {//选择坐标
				this.id = index
				this.$refs.popup.open()
				console.log(index);
				
			},
			close() {
				this.$refs.popup.close()
			},
			addPlanet() {//加入星球
				console.log(this.id);
				console.log(this.obj);
				this.$u.api.join({
					star_id: this.obj.star_id, //星球id
					floor: this.obj.id ,//层数
					room:this.id//坐标
				}).then(res => {
					console.log(res);
					uni.showToast({
					  title: '加入星球成功',
					  icon: 'none',
					  duration: 2000
					});
					this.$refs.popup.close()
				})
			},
			// arr() {
			// 	this.$u.api.starIndex().then(res => {
			// 		this.data = res.data.list
			// 		console.log(this.data);
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	.wdzt-y{
		position: absolute;
		top: -80rpx;
		left: 110rpx;
		z-index: 999;
		width: 100%;
		height: 100%;
	}
	.wdzt{
		text-align: center;
		background: rgba(255,255,255,0.2);
		border-radius: 7rpx 7rpx 7rpx 7rpx;
		opacity: 1;
		border: 1rpx solid rgba(255,255,255,0.2);
		width: 170rpx;
		height: 44rpx;
	}
	.button {
		margin-top: 80rpx;
		display: flex;
		justify-content: space-between;
		width: 400rpx;

		.affirm {
			background-color: #00E2E2;
			color: #111926;
			margin-left: 30rpx;
		}


		>view {
			border-radius: 60rpx;
			width: 160rpx;
			height: 74rpx;
			display: flex;
			align-items: center;
			justify-content: center;

		}
	}

	.kapian {
		width: 540rpx;
		height: 480rpx;
		background: #1C1D1E;
		border-radius: 44rpx 44rpx 44rpx 44rpx;
		opacity: 1;
		color: #fff;
		border: 1rpx solid rgba(225, 215, 191, 0.3);

		.tishi {
			margin-top: 30rpx;
			margin-left: 41rpx;
			text-align: center;
			width: 458rpx;
			font-size: 24rpx;
			font-weight: 400;
			color: #c1c1c1;

		}

		>view {
			width: 100%;

			display: flex;
			justify-content: center;
		}

		image {
			margin-left: 200rpx;
			width: 140rpx;
			height: 140rpx;
		}
	}

	.top {
		display: flex;
		width: 750rpx;
		align-items: center;
		height: 100rpx;
		justify-content: space-between;
		font-size: 36rpx;

	}

	.name {
		height: 100%;
		width: 750rpx;
		// overflow: auto;
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;

		.xuanzhe {
			z-index: 3;
			position: absolute;
			left: 120rpx;
			bottom: 0rpx;
			width: 210rpx;
			height: 250rpx;
			display: flex;
		}
		.ruzhu{
			padding-top: 150rpx;
			width: 210rpx;
			height: 250rpx;
		}
		.ID {
			
			padding: 5rpx 10rpx;
			font-size: 20rpx;
			
			width: 170rpx;
			height: 74rpx;
			background: rgba(255, 255, 255, 0.2);
			border-radius: 7rpx 7rpx 7rpx 7rpx;
			opacity: 1;
			border: 1rpx solid rgba(255, 255, 255, 0.2);

			view {}
		}

		:nth-child(2) {
			margin-left: -70rpx !important;
			margin-top: 90rpx;
		}

		:nth-child(3) {
			// margin-left: -50rpx !important;
			margin-top: 190rpx;
		}

		:nth-child(5) {
			margin-left: -30rpx;
			margin-top: -100rpx;
		}

		:nth-child(5),
		:nth-child(8),
		:nth-child(11),
		:nth-child(14),
		:nth-child(17),
		:nth-child(20),
		:nth-child(23),
		:nth-child(26),
		:nth-child(29),
		:nth-child(32),
		:nth-child(35),
		:nth-child(38),
		:nth-child(41),
		:nth-child(44),
		:nth-child(47),
		:nth-child(50),
		:nth-child(53),
		:nth-child(56),
		:nth-child(59),
		:nth-child(62),
		:nth-child(65),
		:nth-child(68),
		:nth-child(71),
		:nth-child(74),
		:nth-child(77),
		:nth-child(80),
		:nth-child(83),
		:nth-child(86),
		:nth-child(89),
		:nth-child(92),
		:nth-child(95),
		:nth-child(98) {
			// display: flex;
			margin-left: -60rpx;
			margin-top: -100rpx;
		}

		:nth-child(4),
		:nth-child(7),
		:nth-child(10),
		:nth-child(13),
		:nth-child(16),
		:nth-child(19),
		:nth-child(22),
		:nth-child(25),
		:nth-child(28),
		:nth-child(31),
		:nth-child(34),
		:nth-child(37),
		:nth-child(40),
		:nth-child(43),
		:nth-child(46),
		:nth-child(49),
		:nth-child(52),
		:nth-child(55),
		:nth-child(58),
		:nth-child(61),
		:nth-child(64),
		:nth-child(67),
		:nth-child(70),
		:nth-child(73),
		:nth-child(76),
		:nth-child(79),
		:nth-child(82),
		:nth-child(85),
		:nth-child(88),
		:nth-child(91),
		:nth-child(94),
		:nth-child(97),
		:nth-child(100) {
			margin-top: -220rpx;
		}

		:nth-child(3),
		:nth-child(6),
		:nth-child(9),
		:nth-child(12),
		:nth-child(15),
		:nth-child(18),
		:nth-child(21),
		:nth-child(24),
		:nth-child(27),
		:nth-child(30),
		:nth-child(33),
		:nth-child(36),
		:nth-child(39),
		:nth-child(42),
		:nth-child(45),
		:nth-child(48),
		:nth-child(51),
		:nth-child(54),
		:nth-child(57),
		:nth-child(60),
		:nth-child(63),
		:nth-child(66),
		:nth-child(69),
		:nth-child(72),
		:nth-child(75),
		:nth-child(78),
		:nth-child(81),
		:nth-child(84),
		:nth-child(87),
		:nth-child(90),
		:nth-child(93),
		:nth-child(96),
		:nth-child(99) {
			margin-left: -60rpx;
		}

		>view {
			position: relative;
			width: 289rpx;
			height: 289rpx;

			// margin-top: 0rpx;
			// margin-left: -80rpx;
			image {
				width: 289rpx;
				height: 289rpx;
			}
		}

	}


	.page {
		width: 750rpx;
		position: relative;
		overflow: hidden;
		height: 100vh;

		background-image: url('../../../static/images/zbbj.png');
		background-size: cover;
	}
</style>