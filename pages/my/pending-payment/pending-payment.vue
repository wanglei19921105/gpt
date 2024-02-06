<template>
	<view class="page" :class="getThemeClass">
		<!-- 我买到的 -->
		<!-- <unavbar :title="i18n.buy1"></unavbar> -->
		<u-tabs :list="list" :is-scroll="true" :current="current" @change="change" :active-color="getMainColor"
			:inactive-color="getNavInactiveColor" :bg-color="getBgColor"></u-tabs>
		<view v-if="current == 0">
			<empty v-if="!waitPay.length"></empty>
			<view v-for="(item, index) in waitPay" :key="index" class="itemBox card-bg">
				<view class="casting_number">
					<!-- 订单编号 -->
					<view class="casting_left text-call">{{ i18n.buy5 }}</view>
					<view class="casting_right">
						<view class="size-26">{{ item.out_trade_no }}</view>
						<image class="uicon" @click="copy(item.out_trade_no)"
							src="../../../static/images/copy.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<!-- 名字 -->
						<view class="casting_flex">
							<view class="name">{{ item.title }}</view>
							<view class="">
								<my-u-tag text="实物" bg-color="#43d189" color="#d3efda" border-color="#98e7be"
									size="default" class="my-u-tag u-m-b-20" v-if="item.has_goods==1" />
								<view class="color-yellow">{{ i18n.buy2 }}</view>
							</view>
						</view>
						<!-- 作者 -->
						<view class="casting_flex">
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view class="size-26">{{ item.nickname }}</view>
							</view>
						</view>
						<!-- 购买数量 -->
						<view class="casting_flex">
							<view class="casting_left text-call">购买数量</view>
							<view class="casting_right">
								<view>X{{ item.sale_num }}</view>
							</view>
						</view>
						<!-- 卖家 -->
						<view class="casting_flex">
							<view class="casting_right">
								<text style="color: #666666;padding-right:20rpx ;font-size: 24rpx;">{{ i18n.buy4 }}:</text>
								<view class="size-26">{{ item.sale_nickname }}</view>
							</view>
							<view class="price color-red">
								{{ item.price }}
								<text>USDT</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 立即支付 -->
				<!-- <botBtnp :btnText="i18n.buy6" style="margin: 40rpx 0;" @click.native="payCli(item.id,item.sale_num)"></botBtnp> -->
				<view class="casting_bottom">
					<view class="casting_pay">
						<view class="casting_left text-call" style="color: #eeeeee;">支付倒计时：</view>
						<view class="casting_right">
							<!-- <u-count-down separator-color="#764E39" bg-color="#eeeeee" color="#764E39" :timestamp="item.pay_countdown"></u-count-down> -->
							<u-count-down :separator-color="getMainColor" color="#FF0000"
								:bg-color="getCardColor" @end="change(current)" :timestamp="item.pay_countdown + 2"
								font-size="24" separator="colon"></u-count-down>
						</view>
					</view>
					<view class="btns">
						<botBtn padding="10rpx 20rpx" @click="order_cancel(item.id)" type="error" plain>
							<text class="size-26">取消订单</text>
						</botBtn>

						<botBtn padding="10rpx 20rpx" @click="payCli(item.id,item.sale_num, item)">
							<text class="size-26">立即支付</text>
						</botBtn>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 1">
			<empty v-if="!waitPay.length"></empty>
			<view v-for="(item, index) in waitPay" :key="index" class="itemBox card-bg">
				<view class="casting_number">
					<!-- 订单编号 -->
					<view class="casting_left text-call">{{ i18n.buy5 }}</view>
					<view class="casting_right">
						<view class="size-26">{{ item.out_trade_no }}</view>
						<image class="uicon" @click="copy(item.out_trade_no)"
							src="../../../static/images/copy.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>	
					<view class="casting_info">
						<view class="casting_flex">
							<!-- NFT铸品名称 -->
							<view class="name">{{ item.title }}</view>
							<!-- 待付款 -->
							<view class="head_right color-yellow">{{ i18n.buy2 }}</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 作者 -->
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view class="size-26">{{ item.nickname }}</view>
							</view>
						</view>
						<view class="casting_flex border-color">
							<!-- 卖家 -->
							<view class="casting_right">
								<text style="color: #666666;padding-right:20rpx ;font-size: 24rpx;">{{ i18n.buy4 }}:</text>
								<view class="size-26">{{ item.sale_nickname }}</view>
							</view>
							<view class="price color-red">
								{{ item.price }}
								<text>USDT</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 立即支付 -->
				<!-- <botBtnp :btnText="i18n.buy6" style="margin: 40rpx 0;" @click.native="payCli(item.id)"></botBtnp> -->
				<view class="casting_bottom">
					<view class="casting_pay">
						<view class="casting_left text-call" style="color: #eeeeee;">支付倒计时：</view>
						<view class="casting_right">
							<!-- <u-count-down separator-color="#764E39" bg-color="#eeeeee" color="#764E39" :timestamp="item.pay_countdown"></u-count-down> -->
							<u-count-down :separator-color="getMainColor" color="#FF0000"
								:bg-color="getCardColor" @end="change(current)" :timestamp="item.pay_countdown + 2"
								font-size="24" separator="colon"></u-count-down>
						</view>
					</view>
					<view class="btns">
						<botBtn padding="10rpx 20rpx" @click="order_cancel(item.id)" type="error" plain>
							<text class="size-26">取消订单</text>
						</botBtn>

						<botBtn padding="10rpx 20rpx" @click="payCli(item.id,item.sale_num, item)">
							<text class="size-26">立即支付</text>
						</botBtn>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 2">
			<empty v-if="!waitPay.length"></empty>
			<view v-for="(item, index) in waitPay" :key="index" class="itemBox card-bg">
				<view class="casting_number">
					<!-- 订单编号 -->
					<view class="casting_left text-call">{{ i18n.buy5 }}</view>
					<view class="casting_right">
						<view class="size-26">{{ item.out_trade_no }}</view>
						<image class="uicon" @click="copy(item.out_trade_no)"
							src="../../../static/images/copy.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<view class="casting_flex">
							<view class="name">{{ item.title }}</view>
							<!-- 待付款 -->
							<view class="head_right color-yellow">{{ i18n.buy2 }}</view>
						</view>
						<view class="casting_flex">
							<!-- 作者 -->
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view class="size-26">{{ item.nickname }}</view>
							</view>
						</view>
						<view class="casting_flex">
							<!-- 卖家 -->
							<view class="casting_right">
								<text style="color: #666666;padding-right:20rpx ;font-size: 24rpx;">{{ i18n.buy4 }}:</text>
								<view class="size-26">{{ item.sale_nickname }}</view>
							</view>
							<view class="price color-red">
								{{ item.price }}
								<text>USDT</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 立即支付 -->
				<!-- <botBtnp :btnText="i18n.buy6" style="margin: 40rpx 0;" @click.native="payCli(item.id)"></botBtnp> -->
				<view class="casting_bottom">
					<view class="casting_pay">
						<view class="casting_left text-call" style="color: #eeeeee;">支付倒计时：</view>
						<view class="casting_right">
							<!-- <u-count-down separator-color="#764E39" bg-color="#eeeeee" color="#764E39" :timestamp="item.pay_countdown"></u-count-down> -->
							<u-count-down :separator-color="getMainColor" color="#FF0000"
								:bg-color="getCardColor" @end="change(current)" :timestamp="item.pay_countdown + 2"
								font-size="24" separator="colon"></u-count-down>
						</view>
					</view>
					<view class="btns">
						<botBtn padding="10rpx 20rpx" @click="order_cancel(item.id)" type="error" plain>
							<text class="size-26">取消订单</text>
						</botBtn>

						<botBtn padding="10rpx 20rpx" @click="payCli(item.id,item.sale_num, item)">
							<text class="size-26">立即支付</text>
						</botBtn>
					</view>
				</view>
			</view>
		</view>
		<view class="main-padding" v-if="current==3">
			<empty v-if="!waitPay.length"></empty>
			<view v-for="(item, index) in waitPay" :key="index" class="main-card card-bg u-m-t-20">
				<view class="flex justify-between align-center">
					<view class="flex align-center">
						<image :src="item.avatar" mode="aspectFill" class="batchorder-avatar"></image>
						<view class="u-font-28 text-bold">{{item.nickname}}</view>
					</view>
					<view class="flex align-center">
						<view class="u-font-26" style="color: #eeeeee;">倒计时</view>
						<u-count-down :timestamp="item.pay_countdown+10" color="#FE1313"></u-count-down>
					</view>
				</view>
				<view class="line pend-line u-m-t-30"></view>
				<checkbox-group @change="checkboxChange">
					<label v-for="(e, i) in item.info" :key="e.id" class="flex justify-between align-center u-m-t-30">
						<checkbox :value="String(e.id)" :checked="e.checked" color="#00E2E2"
							style="transform:scale(0.7)" class="flex-shink" />
						<view class="flex-1 u-m-l-24">
							<view class="flex">
								<image :src="e.products_cover" mode="aspectFill" class="batchorder-img flex-shink">
								</image>
								<view class="flex-1 u-m-l-30">
									<view class="flex justify-between align-center">
										<view class="line-1 u-font-32 text-bold" style="width: 250rpx;">
											{{e.products_title}}</view>
										<view class="u-font-26 text-content">x1</view>
									</view>
									<view class="u-font-24 text-content u-m-t-30">#{{e.tab_new}}</view>
									<view class="u-font-32 text-bold u-m-t-30">{{e.price}}USDT</view>
								</view>
							</view>
						</view>
					</label>
				</checkbox-group>
				<view class="flex justify-between align-center u-font-32 u-m-t-30">
					<view class="batch-btn card-tag-bg text-content move-btn" @click="cancelBatch(item.id)">取消❎订单
					</view>
					<view class="batch-btn bg-cayn text-default move-btn" @click="payCli(item.id,1, item)">提交订单</view>
				</view>
			</view>
		</view>
		
		<view v-if="current == 4">
			<empty v-if="!waitPay.length"></empty>
			<view v-for="(item, index) in waitPay" :key="index" class="itemBox card-bg">
				<view class="casting_number">
					<!-- 订单编号 -->
					<view class="casting_left text-call">{{ i18n.buy5 }}</view>
					<view class="casting_right">
						<view class="size-26">{{ item.out_trade_no }}</view>
						<image class="uicon" @click="copy(item.out_trade_no)"
							src="../../../static/images/copy.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<!-- 名字 -->
						<view class="casting_flex">
							<view class="name">{{ item.title }}</view>
							<view class="">
								<my-u-tag text="实物" bg-color="#43d189" color="#d3efda" border-color="#98e7be"
									size="default" class="my-u-tag u-m-b-20" v-if="item.has_goods==1" />
								<view class="color-yellow">{{ i18n.buy2 }}</view>
							</view>
						</view>
						<!-- 作者 -->
						<view class="casting_flex">
							<view class="casting_right">
								<view class="avatar">
									<image :src="item.avatar" mode="widthFix"></image>
								</view>
								<view class="size-26">{{ item.nickname }}</view>
							</view>
						</view>
						<!-- 购买数量 -->
						<view class="casting_flex">
							<view class="casting_left text-call">购买数量</view>
							<view class="casting_right">
								<view>X{{ item.sale_num }}</view>
							</view>
						</view>
						<!-- 卖家 -->
						<view class="casting_flex">
							<view class="casting_right">
								<text style="color: #666666;padding-right:20rpx ;font-size: 24rpx;">{{ i18n.buy4 }}:</text>
								<view class="size-26">{{ item.sale_nickname }}</view>
							</view>
							<view class="price color-red">
								{{ item.price }}
								<text>USDT</text>
							</view>
						</view>
					</view>
				</view>
				<!-- 立即支付 -->
				<!-- <botBtnp :btnText="i18n.buy6" style="margin: 40rpx 0;" @click.native="payCli(item.id,item.sale_num)"></botBtnp> -->
				<view class="casting_bottom">
					<view class="casting_pay">
						<view class="casting_left text-call" style="color: #eeeeee;">支付倒计时：</view>
						<view class="casting_right">
							<!-- <u-count-down separator-color="#764E39" bg-color="#eeeeee" color="#764E39" :timestamp="item.pay_countdown"></u-count-down> -->
							<u-count-down :separator-color="getMainColor" color="#FF0000"
								:bg-color="getCardColor" @end="change(current)" :timestamp="item.pay_countdown + 2"
								font-size="24" separator="colon"></u-count-down>
						</view>
					</view>
					<view class="btns">
						<botBtn padding="10rpx 20rpx" @click="order_cancel(item.id)" type="error" plain>
							<text class="size-26">取消订单</text>
						</botBtn>
		
						<botBtn padding="10rpx 20rpx" @click="payCli(item.id,item.sale_num, item)">
							<text class="size-26">立即支付</text>
						</botBtn>
					</view>
				</view>
			</view>
		</view>
		<view v-if="current == 5">
			<empty v-if="!itemData.length"></empty>
			<view v-for="(item, index) in itemData" :key="index" class="itemBox card-bg">
				<view class="head_img">
					<image :src="item.cover" mode="widthFix" class="casting_img"></image>
					<view class="casting_info">
						<view class="casting_flex">
							<view class="name">{{ item.title }}</view>
							<view class="head_right color-green">
								<!-- 已完成 -->
								{{ i18n.sellDet7 }}
							</view>
						</view>
						<view class="casting_flex">
							<!-- 作者 -->
							<view class="casting_left text-call">{{ i18n.buy3 }}</view>
							<view class="casting_right">
								<view>{{ item.author }}</view>
							</view>
						</view>
						<view class="casting_flex">
							<!-- 卖家 -->
							<view class="casting_right">
								<text style="color: #666666;padding-right:20rpx ;font-size: 24rpx;">{{ i18n.buy4 }}:</text>
								<view>{{ item.from }}</view>
							</view>
							<view class="price color-red">
								{{ item.price }}
								<text>USDT</text>
							</view>
						</view>
						<view class="casting_flex">
							<!-- 完成时间 -->
							<view class="casting_left text-call">{{ i18n.sell4 }}</view>
							<view class="casting_right">
								<view class="text-content">{{ item.created_at }}</view>
							</view>
						</view>
					</view>
				</view>
				<!-- 流转 -->
				<!-- <botBtnp btnText="流转" style="margin: 40rpx 0;"></botBtnp> -->
			</view>
		</view>

		<u-toast ref="uToast" />
		<pwdPay :stauts="payStatus" @status="padpay"></pwdPay>
		<u-popup v-model="show" mode="bottom" :closeable="true" border-radius="20" class="my-popup">
			<view class="gap-80"></view>
			<payWay @payway="payType"></payWay>
			<botBtnp class="bot_btn" :btnText="i18n.castingbuy9" @click.native="payBtn"></botBtnp>
			<view class="gap-20"></view>
		</u-popup>

		<u-modal class="my-modal" v-model="isGoPay" title="支付提示" confirm-text="支付成功" :confirm-color="getMainColor"
			cancel-text="暂未支付" content="是否支付成功？" @confirm="paySuccess" @cancel="isGoPay = false" async-close
			show-cancel-button></u-modal>

		<u-modal class="my-modal" v-model="showCancel" content="确认取消吗？" title="提示" :confirm-color="getMainColor"
			@confirm="order_cancel()" show-cancel-button></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						name: ''
					},
					{
						name: ''
					},
					{
						name: ''
					},
					{
						name: ''
					},
					{
						name: ''
					},
					{
						name: ''
					}
				],
				current: 0,
				itemData: [], //已完成订单数据
				waitPay: [], //待支付订单数据
				page: 1,
				limit: 10,
				status: false,
				security: '', //余额支付密码
				orderId: null, //订单id

				paytype: 1,
				pay_type: null,
				payStatus: {
					show: false
				},
				show: false,

				api: {
					one: {
						wechat: 'pre_pay_wechat',
						alipay: 'pre_pay_ali',
						balance: 'one_balance_pay',
						award: 'shop_one_air_pay',
						dlb: 'pre_pay_dlb',
						send: 'pre_pay_sand',
						sandy:'pre_pay_sandYun'
					},
					two: {
						wechat: 'pre_pay_wechat',
						alipay: 'pre_pay_ali',
						balance: 'balance_pay',
						award: 'shop_air_pay',
						dlb: 'pre_pay_dlb',
						send: 'pre_pay_sand',
						sandy:'pre_pay_sandYun'
					},
					blindbox: {
						wechat: 'box_pay_wechat',
						alipay: 'box_pay_ali',
						balance: 'boxbalance_pay',
						award: 'blindbox_air_pay',
						dlb: 'box_pay_dlb',
						send: 'box_pay_sand',
						sandy:'box_pay_sandYun'
					},
					batch: {
						wechat: 'batch_pay_wechat',
						alipay: 'batch_pay_ali',
						balance: 'batch_balance_pay',
						award: 'batch_air_pay',
						dlb: '',
						send: 'batch_pay_sand',
						sandy:''
					},
					zhuanqu: {
						wechat: 'vip_pay_wechat',
						alipay: 'vip_pay_ali',
						balance: 'vip_balance_pay',
						award: 'vip_pay_sale_order',
						dlb: 'vip_pay_dlb',
						send: 'vip_pay_sand',
						sandy:''
					},
				},
				num: 1,

				order: {},
				isGoPay: false,

				thisOrderId: 0,
				showCancel: false,
				chooseIds: [],
				activeTabIndex:0
			};
		},
		onLoad(data) {
			this.current = data.current || 0
		},
		onShow() {
			// this.waitPaycli();
			// this.waitPaycliOne();
			this.change(this.current)
		},
		onPullDownRefresh() {
			this.change(this.current)
		},
		created() {
			this.list[0].name = '版权市场';
			this.list[1].name = '二级市场';
			this.list[2].name = '盲盒';
			this.list[3].name = '批量付';
			this.list[4].name = '专区';
			this.list[5].name = this.i18n.sellDet7;
		},
		computed: {
			setSecurity() {
				return this.$store.state.security;
			}
		},
		watch: {
			setSecurity(val) {
				this.security = val;
			},
			// 密码弹框点击'立即支付'后
			status(val) {
				if (val) {
					if (this.payway == 3) {
						this.auction();
					}
					if (this.payway == 4) {
						this.awardPay();
					}
				}
			}
		},
		onReachBottom() {
			let that = this;
			if (that.current == 0) {
				if (that.waitPay.length >= that.limit) {
					that.limit += 10;
					that.waitPaycliOne();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
			if (that.current == 1) {
				if (that.waitPay.length >= that.limit) {
					that.limit += 10;
					that.waitPaycli();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
			if (that.current == 2) {
				if (that.waitPay.length >= that.limit) {
					that.limit += 10;
					that.waitPayBlindbox();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
			if (that.current == 3) {
				if (that.itemData.length >= that.limit) {
					that.limit += 10;
					that.batchOrder();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
			if (that.current == 4) {
				if (that.itemData.length >= that.limit) {
					that.limit += 10;
					that.zhuanquOrder();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
			if (that.current == 5) {
				if (that.itemData.length >= that.limit) {
					that.limit += 10;
					that.tradeLog();
				} else {
					this.$refs.uToast.show({
						// 翻到底了~
						title: this.i18n.sell5,
						type: 'warning'
					});
				}
			}
		},
		methods: {
			cancelBatch(id) {
				if (!this.chooseIds.length) return this.$refs.uToast.show({
					title: "请先选中订单",
					type: 'error'
				});
				this.$u.api.batch_cancel_order({
					ids: this.chooseIds.join(),
					order_id: id
				}).then(res => {
					this.$refs.uToast.show({
						title: "取消成功",
						type: 'success'
					});
					this.batchOrder()
				})
			},
			initList(list) {
				let arr = []
				list.forEach(e => {
					arr.push({
						...e,
						...{
							checked: false
						}
					})
				})
				return arr
			},
			checkboxChange: function(e) {
				var items = this.waitPay,
					values = e.detail.value;
				this.chooseIds = values
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.includes(item.value)) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
			},
			payBtn() {
				this.show = false
				if (this.current == 0) {
					this.paynext(this.api.one);
				} else if (this.current == 1) {
					this.paynext(this.api.two);
				} else if (this.current == 2) {
					this.paynext(this.api.blindbox);
				} else if (this.current == 3) {
					this.paynext(this.api.batch);
				} else if (this.current == 4) {
					this.paynext(this.api.zhuanqu);
				}
			},
			paynext(api) {
				let clientid = uni.getStorageSync('clientid')
				let params = {
					order_id: this.orderId,
					pay_type: this.pay_type,
					IMEI:clientid
				}
				if (this.current == 0) {
					params = {
						...params,
						...{
							num: this.num
						}
					}
				}
				if (this.payway == 1) {
					let apistr = api.wechat
					this.$u.api[apistr](params).then(res => {
						if (res.code == 200) {
							// #ifdef H5
							this.isGoPay = true
							// #endif
							this.$pay.wechatPay(res.data.result).then(res => {
								this.paySuccess();
							});
						}
					});
				} else if (this.payway == 2) {
					let apistr = api.alipay
					this.$u.api[apistr](params).then(res => {
						if (res.code == 200) {
							// #ifdef H5
							this.isGoPay = true
							// #endif
							this.$pay.alipayPay(res.data.result).then(res => {
								this.paySuccess();
							});
						}
					});
				} else if (this.payway == 3 || this.payway == 4) {
					this.payStatus.show = true;
				} else if (this.payway == 5) {
					let apistr = api.send
					this.$u.api[apistr](params).then(res => {
						if (res.code == 200) {
							this.isGoPay = true
							this.$pay.otherH5Pay(res.data.result)
						}
					});
				} else if (this.payway == 6) {
					let apistr = api.dlb
					this.$u.api[apistr](params).then(res => {
						if (res.code == 200) {
							this.isGoPay = true
							this.$pay.otherH5Pay(res.data.result)
						}
					});
				} else if (this.payway == 7) {
					let apistr = api.sandy
					// console.log(params);
					this.$u.api[apistr](params).then(res => {
						console.log(res);
						if (res.code == 200) {
							this.isGoPay = true
							if(res.data.result){
								let urlshand = encodeURIComponent(res.data.result)
								uni.navigateTo({
									url:'/pages/my/manage/embedded?urlshand=' + urlshand
								})
							}
							// this.$pay.otherH5Pay(res.data.result)
						}
					});
				}
			},
			order_cancel(id) {
				if (id) {
					this.thisOrderId = id
					this.showCancel = true
					return
				}
				id = this.thisOrderId
				if (this.current == 0) {
					this.$u.api
						.new_order_cancel({
							order_id: id
						})
						.then(res => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '取消成功',
									type: 'success',
								})
								this.waitPaycliOne();
							}
						})
						.catch(err => {});
				}
				if (this.current == 1) {
					this.$u.api
						.order_cancel({
							order_id: id,
							type: 1
						})
						.then(res => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '取消成功',
									type: 'success',
								})
								this.waitPaycli();
							}
						})
						.catch(err => {});
				}
				if (this.current == 2) {
					this.$u.api
						.blindbox_order_cancel({
							order_id: id,
							type: 1
						})
						.then(res => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '取消成功',
									type: 'success',
								})
								this.waitPayBlindbox();
							}
						})
						.catch(err => {});
				}
				if (this.current == 4) {
					this.$u.api
						.vip_cancel_order({
							order_id: id,
							type: 1
						})
						.then(res => {
							if (res.code == 200) {
								this.$refs.uToast.show({
									title: '取消成功',
									type: 'success',
								})
								this.zhuanquOrder();
							}
						})
						.catch(err => {});
				}
			},
			paySuccess() {
				this.isGoPay = false
				this.$refs.uToast.show({
					// 支付成功
					title: this.i18n.buy7,
					type: 'success'
				});
				setTimeout(() => {
					this.change(this.current);
				}, 1000);
			},
			payType(data) {
				this.payway = data.type;
				this.pay_type = data.paytype;
			},
			// 监听弹窗打开状态
			closeMain(val) {
				this.payStatus.show = val;
			},
			zhuanquOrder(){
				//获取待付款订单数据
				this.$u.api
					.vip_pay_sale_order({
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						if (res.code == 200) {
							this.waitPay = res.data.list.data;
							uni.stopPullDownRefresh()
						}
					})
					.catch(err => {});
			},
			waitPaycli() {
				//获取待付款订单数据
				this.$u.api
					.pay_sale_order({
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						if (res.code == 200) {
							this.waitPay = res.data.list.data;
							uni.stopPullDownRefresh()
						}
					})
					.catch(err => {});
			},
			waitPaycliOne() {
				//获取待付款订单数据
				this.$u.api
					.one_pay_sale_order({
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						if (res.code == 200) {
							this.waitPay = res.data.list.data;
							uni.stopPullDownRefresh()
						}
					})
					.catch(err => {});
			},
			batchOrder() {
				this.$u.api
					.batch_unpay_order({
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						if (res.code == 200) {
							this.waitPay = res.data.list.data;
							this.chooseIds = []
							uni.stopPullDownRefresh()
						}
					})
					.catch(err => {});
			},
			waitPayBlindbox() {
				//获取盲盒待付款订单数据
				this.$u.api
					.blindbox_pay_sale_order({
						page: this.page,
						limit: this.limit
					})
					.then(res => {
						if (res.code == 200) {
							this.waitPay = res.data.list.data;
							uni.stopPullDownRefresh()
						}
					})
					.catch(err => {});
			},
			tradeLog() {
				this.$u.api
					.trade_log({
						page: this.page,
						limit: this.limit,
						type: 1
					})
					.then(res => {
						if (res.code == 200) {
							this.itemData = res.data.list.data;
							uni.stopPullDownRefresh()
						}
					});
			},
			payCli(id, num, item) {
				this.num = num || 1
				this.show = true;
				this.orderId = id;
				this.order = item
			},
			change(index) {
				this.activeTabIndex = index;
				(this.page = 1), (this.limit = 10), (this.current = index);
				if (index == 0) {
					this.waitPaycliOne();
				}
				if (index == 1) {
					this.waitPaycli();
				}
				if (index == 2) {
					this.waitPayBlindbox();
				}
				if (index == 3) {
					this.batchOrder();
				}
				if (index == 4) {
					this.zhuanquOrder();
				}
				if (index == 5) {
					this.tradeLog();
				}
			},
			// 密码弹窗点击立即支付后
			padpay(i) {
				this.flag = true;
				if (i) {
					this.status = true;
				} else {
					this.status = false;
				}
			},
			// 余额支付
			auction() {
				let api;
				if (this.current == 0) api = this.api.one.balance;
				if (this.current == 1) api = this.api.two.balance;
				if (this.current == 2) api = this.api.blindbox.balance;
				if (this.current == 3) api = this.api.batch.balance;
				if (this.current == 4) api = this.api.zhuanqu.balance;
				let params = {
					order_id: this.orderId,
					security: this.security
				}
				if (this.current == 0) {
					params = {
						...params,
						...{
							num: this.num
						}
					}
				}
				this.$u.api[api](params).then(res => {
					if (res.code == 200) {
						this.paySuccess();
					}
				});
			},
			// 积分支付
			awardPay() {
				let api;
				if (this.current == 0) api = this.api.one.award;
				if (this.current == 1) api = this.api.two.award;
				if (this.current == 2) api = this.api.blindbox.award;
				if (this.current == 3) api = this.api.batch.award;
				if (this.current == 4) api = this.api.zhuanqu.award;
				let params = {
					order_id: this.orderId,
					security: this.security
				}
				if (this.current == 0) {
					params = {
						...params,
						...{
							num: this.num
						}
					}
				}
				this.$u.api[api](params).then(res => {
					if (res.code == 200) {
						this.paySuccess();
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	/deep/uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before{content: "\×" !important;font-size: 80rpx;top: 20%;}
	.pend-line {
		width: 100%;
		height: 1rpx;
	}

	.batchorder-img {
		width: 188rpx;
		height: 188rpx;
		border-radius: 20rpx;
	}

	.batch-btn {
		width: 300rpx;
		height: 100rpx;
		border-radius: 50rpx;
		text-align: center;
		line-height: 100rpx;
	}

	.batchorder-avatar {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.itemBox {
		overflow: hidden;
		margin: 32rpx 30rpx;
		padding-bottom: 40rpx;
		border-radius: 30rpx;
		// background-color: #fff;
	}
	.casting_number{
		height: 70rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #E8E8E8;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.casting_left {
			// color: #999999;
			font-size: 26rpx;
		}
		.casting_right {
			// color: #111111;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			.uicon {
				margin-left: 20rpx;
				width: 22rpx;
				border-radius: 0;
			}
		}
	}
	.head_img {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.casting_img{
			width: 200rpx;
			height: 200rpx;
		}

		.casting_info {
			width: 400rpx;
			.casting_head {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 190rpx;

				.name {
					// color: #111111;
					font-size: 32rpx;
					margin-bottom: 36rpx;
					font-weight: bold;
				}

				.price {
					// color: #a11716;
					font-size: 38rpx;

					text {
						font-size: 26rpx;
					}
				}

				.head_right {
					// color: #eeb32e;
					font-weight: bold;
					font-size: 30rpx;
				}

			}
			.casting_flex {
				height: 70rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name {
					// color: #111111;
					font-size: 32rpx;
					font-weight: bold;
				}
				.casting_left {
					// color: #999999;
					font-size: 26rpx;
				}
				.casting_right {
					// color: #111111;
					font-size: 28rpx;
					display: flex;
					align-items: center;
					.avatar {
						width: 44rpx;
						height: 44rpx;
						border-radius: 50%;
						margin-right: 24rpx;
						overflow: hidden;
						image {
							width: 100%;
						}
					}
					.uicon {
						margin-left: 20rpx;
						width: 22rpx;
						border-radius: 0;
					}
				}
				.price{
					font-size: 38rpx;
					font-weight: bold;
				}
			}

		}
	}

	.casting_bottom{
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.casting_pay{
			display: flex;
			justify-content: center;
			align-items: center;
			padding:0 30rpx;
			.casting_left{
				width: 170rpx;
				color: #000000;
			}
			.casting_right{
				color: #FF0000;
			}
		}
		.btns {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.btn {
				width: 300rpx;
				height: 94rpx;
				line-height: 94rpx;
				text-align: center;
				// background-color:  #764E39;
				// color: #fff;
				font-size: 32rpx;
				border-radius: 40rpx;
			}

			.cancel {
				background-color: #fff;
				border: 3rpx solid red;
				color: red;
			}
		}
	}


	.dfk {
		display: flex;
		// color: #ffffff;
		width: 630rpx;
		margin-top: 20rpx;
	}
</style>
