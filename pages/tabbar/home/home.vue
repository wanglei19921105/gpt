<template>
	<view class="page" :class="getThemeClass">
		<unavbar :isback="false" class="my-nav-ber-a-box">
			<view class="my-nav-ber-a">
				<view class="my-nav-ber-a-l text-main">
					<!-- <text class="my-nav-ber-a-l-text">{{i18n.name}}</text> -->
					<image src="../../../static/images/index/light/baidong_icon.png" style="width: 190rpx;"
						mode="widthFix" class="u-m-t-15"></image>
				</view>
<!--				<view class="my-nav-ber-a-r" style="display: flex;">-->
<!--					<u-icon name="search" :color="getTextContentColor" size="40"-->
<!--						@click="$u.route('/pages/tabbar/bazaar/bazaar')"></u-icon>-->
<!--				</view>-->

			</view>
		</unavbar>

		<!-- banner -->
		<!-- <view class="u-p-t-30 u-p-b-20 u-p-l-28 u-p-r-28">
			<uswiper :list="list"></uswiper>
		</view> -->
		<view class="u-p-t-30 u-p-b-20 u-p-l-0 u-p-r-0">
      <view class="SwiperBox PositionR">
        <swiper class="Swiper" circular :indicator-dots="false" :autoplay="false" :interval="2000"
                :duration="500" @change="changeBanner" previous-margin="20rpx" next-margin="20rpx">
          <swiper-item class="Width100 Transition_100ms" :class="index === currBanner ? 'Height100':'Height_30rpx'" v-for="(item,index) in list" :key="index">
            <view class="PositionR Item MarginAuto BorderR_8rpx OverH Transition_100ms"  :class="index === currBanner ? 'Height100':'Height_30rpx'">
              <image :src="item.pic" mode="aspectFill" class="Width100 Height100"></image>
              <!--            -->
              <view class="TextContent TextCenter Width100 PositionA" v-show="item.bannerType === 1">
                <text class="Block Color_FFFFFF FontS_32rpx FontBold">
                  总注册会员
                </text>
                <text class="Block Color_FFFFFF FontS_62rpx FontBold Font1">
                  {{ totalData.total_user }}
                </text>
                <!--                <text class="Block Color_FFFFFF FontS_28rpx">-->
                <!--                  欢迎加入，造福全人类的AGI-->
                <!--                </text>-->
              </view>
              <view class="TextContent TextCenter Width100 PositionA" v-show="item.bannerType === 2">
                <text class="Block Color_FFFFFF FontS_32rpx FontBold">
                  总签到人数
                </text>
                <text class="Block Color_FFFFFF FontS_62rpx FontBold Font1">
                  {{ totalData.total_sign }}
                </text>
<!--                <text class="Block Color_FFFFFF FontS_28rpx">-->
<!--                  欢迎加入，造福全人类的AGI-->
<!--                </text>-->
              </view>
              <view class="TextContent TextCenter Width100 PositionA" v-show="item.bannerType === 3">
                <text class="Block Color_FFFFFF FontS_32rpx FontBold">
                  会员申购总额
                </text>
                <text class="Block Color_FFFFFF FontS_62rpx FontBold Font1">
                  {{ totalData.total_user }}
                </text>
                <!--                <text class="Block Color_FFFFFF FontS_28rpx">-->
                <!--                  欢迎加入，造福全人类的AGI-->
                <!--                </text>-->
              </view>
              <view class="TextContent TextCenter Width100 PositionA" v-show="item.bannerType === 4">
                <text class="Block Color_FFFFFF FontS_32rpx FontBold">
                  累计赠送福利
                </text>
                <text class="Block Color_FFFFFF FontS_62rpx FontBold Font1">
                  {{ totalData.total_send }}
                </text>
                <!--                <text class="Block Color_FFFFFF FontS_28rpx">-->
                <!--                  欢迎加入，造福全人类的AGI-->
                <!--                </text>-->
              </view>
            </view>
          </swiper-item>
        </swiper>
        <view class="DotsBoxSelf PositionA">
          <view class="DotsSelf FloatL" v-for="(item,index) in list" :key="index" :class="currBanner == index ? 'DotsA':''"></view>
          <view class="ClearB"></view>
        </view>
      </view>
<!--			<uswiper :list="list" effect3d></uswiper>-->
		</view>
		<!-- 菜单 -->

		<view class="new-page-padding">
			<view class="home-notice card-bg flex align-center">
				<view class="u-m-r-20 flex-shink">
					<image src="/static/images/index/light/ggao_icon.png"
						style="width: 160rpx;height: 40rpx;margin-top: 15rpx;" mode=""></image>
				</view>

				<swiper :circular="true" :autoplay="true" :interval="3000" :vertical="true" class="home-noticeswi">
					<swiper-item v-for="(item,index) in noticelist" :key="index" class="home-noticeswiitem"
						@click="openWin('../../blog/blog-def/blog-def?id='+item.id)">
						<view class="line-1" style="font-size:24rpx;width: 550rpx;color: #747982;">{{item.title}}</view>
					</swiper-item>
				</swiper>
			</view>


			<view class="home_cardall" @touchmove.stop>
				<!-- 				<view class="home-card flex card-bg  align-center"
					@click="$u.route('/pages/my/airdrop-award/airdrop-activity')">
					<u-image :src="`/static/images/index/light/openbg1.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">活动排行榜</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view> -->
<!--        @click="signIn()"-->
				<view class="home-card flex card-bg  align-center" @click="$u.route('/pages/my/mySignIn/mySignInNew20240206')">
					<u-image :src="`/static/images/index/light/openbg3.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">每日签到</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<view class="home-card flex card-bg  align-center" @click="$u.route('/pages/my/invite/inviteNew')">
					<u-image :src="`/static/images/index/light/openbg2.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">邀请好友</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<!-- @click="$u.route('/pages/my/signIn/index')" -->
				<view class="home-card flex card-bg  align-center" @click="$u.route('/pages/my/lucky-draw/lucky-draw')">
					<u-image :src="`/static/images/index/${defaultThemeName}/drawlots.png`"
						class="kong-top-item-icon-box u-m-l-30" width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">幸运抽奖</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<view class="home-card flex card-bg  align-center"
					@click="goUrl('/pages/my/airdrop-award/airdrop-award-new')">
					<!-- @click="$u.route('/pages/my/airdrop-award/airdrop-award')" -->
					<u-image :src="`/static/images/index/light/openbg4.png`" class="kong-top-item-icon-box u-m-l-30"
						width="56" height="56"></u-image>
					<view class="u-m-l-22">
						<view class="u-font-28 text-w-500" style="margin-top:6px;">积分商城</view>
						<view class="u-font-20 u-m-t-10 color-9a"> </view>
					</view>
				</view>
				<!-- <view class="home-card flex card-bg  align-center" @click="$u.route('/pages/market/nirvana/nirvana')" :style="{ background: `url(${picture5})`, 'background-size': '100% 100%' }">

					<view class="u-m-l-14">
						<view class="u-font-28 text-w-500 text-white">涅槃池</view>
						<view class="u-font-20 u-m-t-10 text-white">超级藏品来创作</view>
					</view>
				</view> -->
			</view>

			<!-- 	<view class="flex justify-between align-center u-m-t-20">
			</view> -->

			<!-- @click="$u.route('/')" -->
			<view class="main-card kong-bottom-box u-flex m-page-content-item justify-around u-m-t-20">
				<view class="u-flex-col align-center">
					<u-image :src="`/static/images/index/${defaultThemeName}/Copyright.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">AI助手</text>
				</view>
				<!-- @click="$u.route('/pages/AIcreation/myGallery/myGallery')" -->
				<view class="u-flex-col align-center">
					<u-image :src="`/static/images/index/${defaultThemeName}/Blindbox.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">AI创作</text>
				</view>
				<!-- @click="$u.route('/pages/my/lucky-draw/lucky-draw')" -->
				<view class="u-flex-col align-center">
					<u-image :src="`/static/images/index/${defaultThemeName}/drawlots.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">抽奖</text>
				</view>
				<!-- @click="$u.route('/')" -->
				<view class="u-flex-col align-center">
					<u-image :src="`/static/images/index/${defaultThemeName}/compose.png`"
						class="kong-top-item-icon-box" width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">会员榜</text>
				</view>

				<!-- @click="$u.route('/pages/my/myTeam/myTeam')" -->
				<view class="u-flex-col align-center" >
					<u-image :src="`/static/images/index/${defaultThemeName}/npc.png`" class="kong-top-item-icon-box"
						width="60" height="60"></u-image>
					<text class="u-font-20 u-m-t-10 text-content">团队榜</text>
				</view>

			</view>

		</view>
		<view :class="getThemeClass">
			<view class="coll-head">
				<u-tabs :list="tabs" :is-scroll="true" :current="current" @change="change" :active-color="getMainColor"
					:inactive-color="getNavInactiveColor" :bg-color="getBgColor"></u-tabs>
			</view>
<!--      <view class="ListBox WidthGlobal1 MarginAuto">-->
<!--        <view class="Unit MarginT_32rpx BorderR_20rpx" v-for="(item,index) in goodsList"  @click="godetail(item.id)" :key="index" :class="(index+1)%2 != 0 ? 'FloatL':'FloatR'">-->
<!--          <view class="ImgBox OverH PositionR">-->
<!--            <view class="BottomText Width100 PositionA">-->
<!--              <view class="MarginAuto WidthGlobal5 MarginAuto">-->
<!--                <text class="Block Color_FFFFFF FloatL FontS_20rpx">-->
<!--                  回报率: {{item.profit_rate }}%-->
<!--                </text>-->
<!--                <text class="Block Color_FFFFFF FloatR FontS_20rpx">-->
<!--                  限购{{item.limit}}份-->
<!--                </text>-->
<!--                <view class="ClearB"></view>-->
<!--              </view>-->
<!--            </view>-->
<!--            <image :src="item.cover_image" mode="aspectFill" class="Width100 Height100"></image>-->
<!--          </view>-->
<!--          <view class="Bottom PaddingT_1rpx Width100">-->
<!--            <view class="WidthGlobal5 MarginAuto ">-->
<!--              <text class="Block Color_FFFFFF FontBold FontS_32rpx MarginT_16rpx Warp_E MarginT_20rpx">{{item.title}}</text>-->
<!--              <text class="Block Color_FFFFFF FontS_24rpx">冻结期: {{item.keep_days + dataShow[item.return_type]}}</text>-->
<!--              <view class="MarginT_16rpx">-->
<!--                &lt;!&ndash;                <text class="Block FontS_28rpx Color_FFC393 FontBold FloatL MarginT_4rpx">{{item.price}}</text>&ndash;&gt;-->
<!--                &lt;!&ndash;                <text class="Block FontS_24rpx Color_FFC393 FloatL MarginL_10rpx MarginT_6rpx">USDT</text>&ndash;&gt;-->
<!--                <image :src="$.imgSrc + '/images/signIn/rank1.jpg'" mode="aspectFit" class="FloatL Icon"></image>-->
<!--                <text class="Block FontS_24rpx Color_FFC393 FloatL MarginL_16rpx Warp_E MarginT_2rpx">金币：{{(item.maxmum_investment)}}</text>-->
<!--                <view class="ClearB"></view>-->
<!--              </view>-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->
<!--        <view class="ClearB"></view>-->
<!--      </view>-->
      <view class="GoodsList WidthGlobal1 MarginAuto">
        <view class="Unit Width100 BG_171717 BorderR_20rpx MarginT_32rpx" v-for="(item,index) in goodsList" :key="index" @click="godetail(item.id)">
          <view class="ImgBox Width100">
            <image :src="item.cover_image" mode="aspectFill" class="Width100 Height100"></image>
          </view>
          <view class="Width100 PaddingT_1rpx BottomBox MarginT_40rpx">
            <view class="WidthGlobal5 MarginAuto">
              <view class="FloatL">
                <text class="Block FontS_40rpx Color_FFFFFF">{{item.name}}</text>
                <view class="ProgressBox MarginT_20rpx">
                  <view class="ProgressMain BG_FFFFFF FloatL BorderR_20rpx OverH MarginT_8rpx">
                    <view class="Progress Height100 BorderR_20rpx" :style="'width:' + returnRate(item) +'%;'"></view>
                  </view>
                  <text class="Block FloatL Color_D1D1D1 MarginL_16rpx FontS_24rpx">
                    {{returnRate(item)}}%
                  </text>
                  <view class="ClearB"></view>
                </view>
              </view>
              <text class="Block FloatR FontS_36rpx Color_FFC393 FontBold">{{(item.maxmum_investment)}} 金币</text>
              <view class="ClearB"></view>
              <view class="TagList MarginT_40rpx">
                <view class="Tag2 FloatL MarginR_32rpx TextCenter" :style="bgUrl1">
                  <text class="Block FontS_20rpx FontBold Color_000000" >{{ (item.level || {}).name }}</text>
                </view>
                <view class="Tag1 FloatL BG_FFFFFF BorderR_6rpx MarginR_32rpx">
                  <text class="Block FontS_20rpx FontBold FloatL Color_000000">限购份数</text>
                  <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000">{{item.limit}}</text>
                  <view class="ClearL"></view>
                </view>
                <view class="Tag1 FloatL BG_FFFFFF BorderR_6rpx MarginR_32rpx">
                  <text class="Block FontS_20rpx FontBold FloatL Color_000000">日化利率</text>
                  <text class="Block FontS_20rpx FontBold FloatL MarginL_16rpx Color_000000">{{ returnDayRate(item) + '%' }}</text>
                  <view class="ClearL"></view>
                </view>
                <view class="ClearL"></view>
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">项目数量</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{ item.stock + item.sales }}-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">日化利率</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{ returnDayRate(item) + '%' }}-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">投资周期</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{ item.keep_days }}天-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">起购份数</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{item.min_buy }}-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">限购份数</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{item.limit}}-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
<!--                <view class="Tag FloatL MarginT_20rpx MarginR_40rpx">-->
<!--                  <view class="TagL TextCenter FloatL">-->
<!--                    <text class="Block FontS_20rpx Color_1C2B2F FontBold">可购等级</text>-->
<!--                  </view>-->
<!--                  <view class="FloatL TagR">-->
<!--                    <text class="Block Color_FFFFFF FontS_20rpx">-->
<!--                      {{ (item.level || {}).name }}-->
<!--                    </text>-->
<!--                  </view>-->
<!--                  <view class="ClearB"></view>-->
<!--                </view>-->
                <view class="ClearB"></view>
              </view>
              <view class="Width100 Flex Flex_C_S-B MarginT_32rpx">
                <view class="DataUnit1 TextCenter">
                  <text class="Color_B4B4B6 Block FontS_24rpx">项目数量</text>
                  <text class="Color_FFFFFF Block FontS_28rpx FontBold MarginT_8rpx"> {{ item.stock + item.sales }}</text>
                </view>
                <view class="DataUnit1 TextCenter">
                  <text class="Color_B4B4B6 Block FontS_24rpx">起购份数</text>
                  <text class="Color_FFFFFF Block FontS_28rpx FontBold MarginT_8rpx">{{item.min_buy }}</text>
                </view>
                <view class="DataUnit1 TextCenter">
                  <text class="Color_B4B4B6 Block FontS_24rpx">投资周期</text>
                  <text class="Color_FFFFFF Block FontS_28rpx FontBold MarginT_8rpx">{{ item.keep_days }}天</text>
                </view>
                <view class="DataUnit1 TextCenter">
                  <text class="Color_FFFFFF Block FontS_24rpx">可购等级</text>
                  <text class="Color_FFFFFF Block FontS_28rpx FontBold MarginT_8rpx">{{ (item.level || {}).name }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
			<empty v-if="!goodsList.length"></empty>
			<uni-load-more :status="loadStatus"></uni-load-more>
			<u-toast ref="uToast" />
		</view>
		<u-modal class="my-modal" v-model="showSignIn" :content="`签到将获得 ${sign.num} 积分`" title="签到" :confirm-color="getMainColor" @confirm="signIn(1)" confirmText="签到" show-cancel-button asyncClose></u-modal>
	</view>
</template>

<script>
	import artist from '../../../components/artist.vue'
	// import blindbox from '../../../components/blindbox.vue'
	// #ifdef APP-PLUS
	// import update from '@/pages/checkUpdate/utils/check-update.js'
	// #endif
	export default {
		components: {
			artist,
			// blindbox,
		},
		data() {
			return {
				show: false,
				showSignIn: false,
				keyword: '', //搜索框搜索关键字
        bgUrl1: '', //
				list: [], //banner图
				seriesList: [{
						name: ''
					},
					{
						name: ''
					}
				],
				featuredList: [], //精选系列
				artistData: [], //人气艺术家
				blindboxList: [],
				clendar: [],
				startAnimationUrl: '',
				isDouble: false,
        currBanner: 0,
				userCheck: 0,
				// token: uni.getStorageSync("token"),
				token: '',
				noticelist: [],
				sign: {
					num: '0',
					status: 1
				},
				user: null,
				page: 1,
        goodsList: [],
        specialList: [],
        specialListL: [],
        specialListR: [],
				loadStatus: 'noMore',
				tabs: [{
					name: 'VIP1区',
					id: 0
				}, {
					name: 'VIP2区',
					id: 1
				}, {
					name: 'VIP3区',
					id: 2
				}, {
					name: 'VIP4区',
					id: 3
				}, {
					name: 'VIP5区',
					id: 4
				}, {
					name: 'VIP6区',
					id: 5
				}, {
					name: 'VIP7区',
					id: 6
				}, {
					name: 'VIP8区',
					id: 7
				}, {
					name: 'VIP9区',
					id: 8
				}, {
					name: 'VIP10区',
					id: 9
				}],
				current: 0,
				vip_level: 0,
				exchange_rate: '',
        dataShow:{
          '0':'天',
          '1':'周',
          '2':'月',
          '3':'天',
          '4':'小时',
          '5':'天',
        },
        totalData:{
          total_sign:'',
          total_user:'',
          total_send:'',
        },
        $:this.$,
			}
		},
		onShow() {
      this.bgUrl1 = "background-image:url('"+ this.$.imgUrl +"/name_bg1.png');background-repeat: no-repeat;background-position: center center;background-size:100% 100%;"
			// this.setTabBar()
			this.getTabs()
      this.getHomedata()
      this.getNum()
		},
		created() {
			this.seriesList[0].name = '版权品精选'
			this.seriesList[1].name = '盲盒精选'
			// this.seriesList[3].name = '人气艺术家'
			// this.seriesList[2].name = '发售日历'
		},
		onLoad(data) {
			// // #ifdef APP-PLUS
			// update()
			// // #endif
			if (data.token) {
				uni.setStorageSync('token', data.token)
			}
      this.exchange_rate = uni.getStorageSync('exchange_rate');
		},
		onReachBottom() {
			// if(this.listStatus === 'loadmore'){
			this.page++
			this.loadData(false)
			// }
		},
		onPullDownRefresh() {
			this.getHomedata()
		},
		methods: {
      returnDayRate(item){
        return Number(Number(item.maxmum_investment) * Number(item.profit_rate) / item.keep_days).toFixed(2)
      },
      returnRate(item){
        return Number(item.sales / (item.stock + item.sales)).toFixed(0)
      },
      changeBanner(e){
        console.log(e)
        this.currBanner = e.detail.current
      },
			// 去签到 或 积分商城
			goUrl(url) {
				if (!(this.user && this.user.user_account)) {
					uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				} else {
					// '/pages/my/signIn/index'
					uni.navigateTo({
						url: url
					})
				}
			},
			getHomedata() { //首页信息 接口
				this.$u.api.home_index().then(res => {
          this.list = []
          this.list.push({id:1111,link:null,pic:this.$.imgUrl + '/banner1.png',show_type:1,bannerType:1})
          // this.list.push({id:2222,link:null,pic:this.$.imgUrl + '/banner2.png',show_type:1,bannerType:2})
          // this.list.push({id:3333,link:null,pic:this.$.imgUrl + '/banner3.png',show_type:1,bannerType:3})
          this.list.push({id:4444,link:null,pic:this.$.imgUrl + '/banner4.png',show_type:1,bannerType:4})
					// this.list = res.data.banners
          for(let a = 0; a < res.data.banners.length; a++){
            res.data.banners[a].bannerType = ''
          }
          this.list.push(...res.data.banners)
          console.log(this.list)
					this.featuredList = res.data.cast_list.data; //精选系列
					// this.artistData = res.data.author_list; //人气艺术家
					this.blindboxList = res.data.list1; //盲盒系列
					// this.clendar = res.data.clendar; // 发售日历
					this.userCheck = res.data.check
					this.noticelist = res.data.notices
					this.startAnimationUrl = res.data.banner_tan?.pic
					if (this.startAnimationUrl && res.data.banner_tan.status === 0) {
						this.$refs.startPopup.open()
					}
					uni.stopPullDownRefresh()
				}).catch(err => {})

				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.sign = res.data.sign;
						this.user = res.data.user;
					}
					uni.stopPullDownRefresh()
				}).catch(err => {
					uni.stopPullDownRefresh()
				})
			},
      getNum() {
        this.$u.api.home_index_total_data().then(res => {
          if(res.code == 200){
            this.totalData = res.data
          }
        }).catch(err => {

        })
      },
			searchChange(val) {
				getApp().keyword = val
				// uni.reLaunch({
				// 	url: '../bazaar/bazaar-second',
				// })
				uni.switchTab({
					url: '../bazaar/bazaar-second'
				})
			},
			// 跳转我的页面
			go_my() {
				uni.switchTab({
					url: '../mine/mine'
				})
			},
			goSgin() {
				console.log(22)
				uni.navigateTo({
					url: '/pages/qiandao'
				})
			},
			// 跳转衍生品市场
			derivatives(type) {
				if (type == 1) {
					uni.navigateTo({
						url: "../bazaar/bazaar-yxg"
					})
				} else if (type == 2) {
					uni.navigateTo({
						url: "../bazaar/bazaar-cq"
					})
				} else if (type == 3) {
					uni.navigateTo({
						url: "/pages/tabbar/bazaar/bazaar-yxg-mh"
					})
				} else {
					uni.navigateTo({
						url: '../bazaar/bazaar'
					})
				}
			},
			// 跳转版权市场
			copyright() {
				uni.switchTab({
					url: '../bazaar/bazaar-second'
				})
			},
			// 跳转我的NFT
			my_nft() {
				uni.navigateTo({
					url: '../../my/casting/casting'
				})
			},
			// 系列选择索引
			change(index) {
				this.current = index;
			},
			calendar() {
				uni.navigateTo({
					url: "../../my/calendar/calendar"
				})
			},
			gocompound() {
				uni.navigateTo({
					url: "/pages/market/compound/compound"
				})
			},
			//切换单双列
			click_double() {
				this.isDouble = !this.isDouble
			},
			signIn(o) {
				if (!(this.user && this.user.phone)) {
					return uni.navigateTo({
						url: '/pages/my/bindPhone/bindPhone'
					})
				}
				if (o) {
					this.$u.api.signUp().then(res => {
						if (res.code == 200) {
							//this.getUserinfo()
							uni.showToast({
								icon: 'success',
								title: '签到成功'
							})
							this.showSignIn = false
						}
					})
				} else {
					this.showSignIn = true
				}
			},
      getTabs(){
        this.$u.api.getTabs({
        }).then(res => {
          if (res.code == 200) {
            this.tabs = res.data.list
            if(this.tabs.length > 0){
              this.getGoodsList()
            }
            // this.loadData(true)
          }
        })
      },
			loadData(flag) {
				if (flag) this.page = 1
				this.$u.api.vip_index({
					page: this.page,
					type: this.tabs[this.current].id
				}).then(res => {
					if (res.code == 200) {
						this.specialList = flag ? res.data.list.data : this.specialList.concat(res.data.list.data);

						// this.specialList =flag ? [...res.data.list.data,...res.data.list.data,...res.data.list.data,...res.data.list.data] : this.specialList.concat(res.data.list.data)
						this.vip_level = res.data.vip_level
						// this.loadStatus = res.data.list.next_page_url?'more':'noMore'
					}
				})
			},
      getGoodsList() {
        this.$u.api.getProjects({
          cate_id: this.tabs[this.current].id
        }).then(res => {
          if (res.code == 200) {
            this.goodsList = res.data.list
          }
        })
      },
			change(index) {
				if (this.current == index) return
				this.current = index;
        this.getGoodsList()
        // this.loadData(true)
        return
				console.log(this.vip_level, this.current);
				if (this.vip_level + 1 < this.current) {
					this.$refs.uToast.show({
						title: "vip等级不够，无权限查看！",
						type: 'error'
					});
					return
				} else {
          this.loadData(true)
				}

			},
			godetail(id) {
        uni.navigateTo({
          url: `/pages/Special/SpecialDetailsNew20240208?id=${id}`
        })
        return
        uni.navigateTo({
          url: `/pages/Special/SpecialDetailsNew?id=${id}`
        })
        return
				if (this.vip_level - 1 < this.current) {
					this.$refs.uToast.show({
						title: "vip等级不够，无权限查看！",
						type: 'error'
					});
					return
				} else {
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.GoodsList{
  .Unit{
    padding-bottom: 36rpx;
    .ImgBox{
      width: 100%;
      height: 574rpx!important;
    }
    .TagList{
      .Tag1{
        height: 40rpx;
        padding: 0rpx 16rpx;
        text{
          line-height: 40rpx;
        }
      }
      .Tag2{
        width: 92rpx;
        height: 40rpx;
        text{
          line-height: 40rpx;
          background-image:-webkit-linear-gradient(bottom,#3A4461,#9A9EC3);
          -webkit-background-clip:text;
          -webkit-text-fill-color:transparent;
        }
      }
      .Tag{
        padding-right: 20rpx;
        background-color: #2E2D2D;
        border-radius: 6rpx;
        .TagL{
          width: 112rpx;
          height: 40rpx;
          border-radius: 6rpx;
          background: linear-gradient(90deg, #E97FFF 0%, #64F2FF 100%);
          line-height: 40rpx;
        }
        .TagR{
          padding-left:20rpx;
          text{
            line-height: 40rpx;
          }
        }
      }
    }
    .ProgressBox{
      .ProgressMain{
        width: 218rpx;
        height: 8rpx;
        .Progress{
          background: linear-gradient(90deg, #2360EB 0%, #5FC5FF 100%);
        }
      }
    }
  }
}
.SwiperBox{
  width: 100%;
  height: 154px!important;
  .DotsBoxSelf{
    z-index: 999;
    bottom: 20rpx;
    left: 50%;
    transform: translateX(-50%);
    .DotsSelf{
      width: 14rpx;
      height: 14rpx;
      margin: 0 6rpx;
      border-radius: 22rpx;
      transition: all 0.5s;
      background-color: rgba(0, 0, 0, 0.3);
    }
    .DotsA{
      width: 36rpx!important;
      background-color: rgba(255,255,255,0.8)!important;
    }
  }
}
.Swiper{
  width: 100%;
  height: 154px!important;
  .Item{
    width: calc(100% - 30rpx);
  }
  .Height_30rpx{
    height: calc(100% - 30rpx);
    padding-top: 15rpx;
  }
  .TextContent{
    left: 50%;
    top: 50%;
    transform: translate(-50%,-60%);
  }
}
.ListBox{
  .Unit{
    overflow: hidden;
    width: calc(50% - 16rpx);
    .Bottom{
      height: 178rpx;
      background: linear-gradient(360deg, #131313 0%, #282828 100%);
      .Icon{
        width: 30rpx;
        height: 30rpx;
      }
    }
    .ImgBox{
      width: 100%;
      height: 266rpx;
      .BottomText{
        height: 64rpx;
        line-height: 64rpx;
        bottom: 0;
        left: 0;
        background: linear-gradient(360deg, #000000 0%, rgba(0,0,0,0) 100%);
      }
    }
  }
}
	.page {
		// background-color: #FBF7F2;
		// background-image: url('../../../static/images/HomeBgimg.png');
		background-size: 750rpx 1624rpx;
		background-position: 0 0;
		background-repeat: no-repeat;

		/deep/ .u-navbar-fixed {
			// background-color: #FBF7F2 !important;
			background-color: transparent !important;
		}
	}

	.home-notice {
		height: 80rpx;
		width: 100%;
		border-radius: 10rpx;
		padding: 5rpx 20rpx;
		margin-bottom: 24rpx;

		.home-noticeswi {
			flex: 1;
			height: 70rpx;

			.home-noticeswiitem {
				width: 100%;
				height: 70rpx;
				line-height: 70rpx;
			}
		}
	}

	.home_cardall {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		flex-wrap: wrap;
		justify-content: space-between;

		.home-card {
			width: 335rpx;
			height: 140rpx;
			border-radius: 10rpx;
			// padding: 0 20rpx;
			margin-bottom: 20rpx;
			// margin-right: 20rpx;

		}

		.home-card:nth-child(2n) {
			margin-right: 0;
		}
	}

	.home-sdchange {
		width: 690rpx;
		margin: 24rpx 30rpx 0 30rpx;
		height: 74rpx;
		border-radius: 10rpx;
		padding: 0 24rpx;
		color: #999999;
	}

	.kong-top-box {
		padding: 35rpx 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		border-bottom: solid 1rpx;

		.kong-top-item {
			width: 100%;
			border-right: 1rpx solid;
			margin-right: 25rpx;

			&:last-child {
				border: none;
				margin-right: 0;
			}
		}
	}

	.kong-bottom-box {
		border-radius: 10rpx;
		position: relative;

		.cardimg {
			height: 180rpx;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
	}

	.home-shop {
		width: 690rpx;
		margin: 0 30rpx 30rpx 30rpx;

		.home-shopimg {
			width: 330rpx;
			height: 172rpx;
			border-radius: 20rpx 20rpx 0 0;
		}

		.home-shopbot {
			width: 330rpx;
			height: 70rpx;
			padding: 0 20rpx;
			border-radius: 0 0 20rpx 20rpx;
			font-size: 26rpx;
			font-weight: bold;
			background-color: #FFFFFF;
		}
	}

	.utabs {
		border-radius: 10rpx;
		margin: 0 30rpx;
	}

	.text-area {
		height: 136rpx;
		margin-bottom: 70rpx;
		// line-height: 136rpx;
		// border: 1px solid red;
		line-height: 6;
		text-align: center;
		position: -webkit-sticky;
		position: sticky;
		top: 0px;
		z-index: 99;
		background-color: #FAF6F4;
	}

	.u_search {
		width: 100% !important;
		padding: 0 32rpx;
	}

	.title {
		font-size: 34rpx;
		color: #333333;
		margin-top: 102rpx;
		font-weight: bold;
	}

	.head_flex {
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 20rpx;

		.userAvatar {
			width: 70rpx;
			height: 70rpx;
			margin-right: 30rpx;
		}
	}

	.menu {
		background-color: #fff;
		margin: 0 30rpx 20rpx;
		display: flex;
		justify-content: space-between;
		padding: 34rpx 52rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		color: #333333;

		.menu_item {
			width: 120rpx;
			text-align: center;

			image {
				margin-bottom: 22rpx;
				width: 70rpx;

			}
		}
	}

	.bot_btn {
		margin: 88rpx 150rpx 0 150rpx;
		background-color: #764E39;
		border-radius: 50rpx;
		color: #fff;
		font-size: 30rpx;
		height: 80rpx;
		line-height: 80rpx;
	}

	// 开屏弹窗
	.start-opup-box {
		flex-direction: column;
		align-items: center;

		.start-img {
			width: 600rpx;
			height: 900rpx;
			border-radius: 10rpx;
		}
	}

	.rili-tag {
		height: 56rpx;
		line-height: 56rpx;
		padding: 0 25rpx;
		background: linear-gradient(90deg, #04D5A3 0%, #00E2E2 100%);
		border-radius: 20rpx 8rpx 20rpx 8rpx;
		position: absolute;
		top: 0;
		left: 0;
	}

	.rili-img {
		width: 634rpx;
		height: 634rpx;
		border-radius: 20rpx;
	}

	.rili-authorimg {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
	}

	.rili-price {
		font-size: 40rpx;
		font-weight: bold;
	}

	.page {
		padding-top: calc(var(--status-bar-height));
	}

	.coll-head {
		width: 750rpx;
		position: sticky;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.itemBox {
		overflow: hidden;
		background-color: #1E1E1E;
		margin: 32rpx 30rpx;
		border-radius: 30rpx;
		padding-bottom: 28rpx;

		>image {
			width: 100%;
			border-radius: 20rpx;
		}

		.time {
			background: rgba(115, 246, 162, 0.15);
			color: #73F6A2;
			font-size: 20rpx;
			padding: 9rpx 16rpx;
			border-radius: 10rpx;
		}

		.Limited {
			background: rgb(0, 0, 0);
			color: #ffffff;
			font-size: 20rpx;
			padding: 9rpx 16rpx;
			border-radius: 10rpx;
		}
	}

	.head_img {
		image {
			width: 100%;
		}
	}

	.casting_info {
		padding: 0 30rpx;

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
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.casting_left {
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
		}

		.casting_flex+.casting_flex {
			border-top: 1px solid;
		}
	}

	.btns {
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0 30rpx 0rpx;

		.btn {
			width: 300rpx;
			height: 94rpx;
			line-height: 94rpx;
			text-align: center;
			font-size: 32rpx;
			border-radius: 10rpx;
		}

		.cancel {
			background-color: #fff;
			border: 3rpx solid red;
			color: red;
		}
	}

	.dfk {
		display: flex;
		width: 630rpx;
		margin-top: 20rpx;
	}
</style>
