const install = (Vue, vm) => {
	// 微信登录
	const loginWechat = (params) => vm.$u.post('api/loginWechat', params);
	const regWechat = (params) => vm.$u.post('api/regWechat', params);
	// 手机注册
	const register_make = (params) => vm.$u.post('api/register_make', params);
	// 账号密码登录
	const login_make = (params) => vm.$u.post('api/login_make', params);
	// 快捷登录
	const login_make1 = (params) => vm.$u.post('api/login_make1', params);
	// 获取手机验证码
	const send_code = (params) => vm.$u.post('api/send_code', params);
	// 忘记密码
	const forget_make = (params) => vm.$u.post('api/forget_make', params);
	// 用户协议/隐私政策/关于我们
	const user_rule = (params) => vm.$u.post('api/user_rule', params);
	// 发行方列表
	const author_list = (params) => vm.$u.post('api/author/list', params);
	// 关注
	const attention = (params) => vm.$u.post('api/author/attention', params);
	// 取消关注
	const callback_attention = (params) => vm.$u.post('api/author/callback_attention', params);
	// 认证预览
	const author_index = (params) => vm.$u.post('api/author/index', params);
	// 作者认证申请
	const author_apply = (params) => vm.$u.post('api/author/apply', params);
	// 发行方详情
	const author_detail = (params) => vm.$u.post('api/author/detail', params);
	// 作家作品列表
	const author_pro_list = (params) => vm.$u.post('api/author/author_pro_list', params);
	// 设置背景
	const author_bgimg = (params) => vm.$u.post('api/author/bgimg', params);
	// 我的(首页)
	const center_index = (params) => vm.$u.post('api/center/index', params);
	// 修改昵称
	const nickname_change = (params) => vm.$u.post('api/center/nickname_change', params);
	// 修改头像
	const change_head = (params) => vm.$u.post('api/center/change_head', params);
	// 获取邮箱验证码
	const send_email_code = (params) => vm.$u.post('api/send_email_code', params);
	// 邮箱绑定
	const email_make = (params) => vm.$u.post('api/center/email_make', params);
	// 收款方式信息
	const draw_info = (params) => vm.$u.post('api/center/draw_info', params);
	// 收款方式添加
	const bind_draw = (params) => vm.$u.post('api/center/bind_draw', params);
	// 推广中心
	const recommend = (params) => vm.$u.post('api/center/recommend', params);
	const recommendChildrenList = (params) => vm.$u.post('api/center/children_raking', params); // 下级列表
	// 帮助中心问题列表
	const question_list = (params) => vm.$u.post('api/center/question_list', params);
	// 帮助中心问题详情
	const question_detail = (params) => vm.$u.post('api/center/question_detail', params);
	// 公告类别
	const news_type = (params) => vm.$u.post('api/center/news_type', params);
	// 资讯/新闻列表
	const news_list = (params) => vm.$u.post('api/center/news_list', params);
	// 资讯/新闻详情
	const news_detail = (params) => vm.$u.post('api/center/news_detail', params);
	// 我的关注
	const my_concern = (params) => vm.$u.post('api/center/my_concern', params);
	// 我的粉丝
	const my_fans = (params) => vm.$u.post('api/center/my_fans', params);
	// 支付密码修改/绑定
	const security_make = (params) => vm.$u.post('api/center/security_make', params);
	// 铸造申请预览
	const cast_index = (params) => vm.$u.post('api/cast/index', params);
	// 上架
	const up = (params) => vm.$u.post('api/cast/up', params);
	// 实名认证信息校验(暂时无法使用)
	const certification_verification = (params) => vm.$u.post('api/center/certification_verification', params);
	// 绑定手机号
	const phone_make = (params) => vm.$u.post('api/center/phone_make', params);
	// 首页信息
	const home_index = (params) => vm.$u.post('api/home/index', params);
	const home_index_total_data = (params) => vm.$u.get('api/home/summary', params);
	// 首页信息
	const banner_detail = (params) => vm.$u.post('api/home/banner_detail', params);
	// 首页信息(NFT)
	const shop_index = (params) => vm.$u.post('api/shop/index', params);
	const shop_new_index = (params) => vm.$u.post('api/shop/new_index', params);
	// NFT详情
	const product_detail = (params) => vm.$u.post('api/shop/product_detail', params);
	const new_detail = (params) => vm.$u.post('api/shop/new_detail', params);
	// 铸造下单
	const cast_add1 = (params) => vm.$u.post('api/cast/cast_add1', params);
	// 铸造上传图片
	const upload_file = (params) => vm.$u.post('api/cast/upload_file', params);
	// 钱包首页
	const wallet_index = (params) => vm.$u.post('api/wallet/index', params);
	// 空投奖励
	const air_drop = (params) => vm.$u.post('api/wallet/air_drop', params);
	// 钱包记录(余额/空投)
	const wallet_log = (params) => vm.$u.post('api/wallet/wallet_log', params);
	// 充值/提现预览
	const wallet_show = (params) => vm.$u.post('api/wallet/wallet_show', params);
	// 充值订单提交(支付宝微信)
	const recharge_edit = (params) => vm.$u.post('api/wallet/recharge_edit', params);
	// 充值支付(微信app/H5/公众号)
	const recharge_pay_wechat = (params) => vm.$u.post('api/wallet/recharge_pay_wechat', params);

	const recharge_usdt = (params) => vm.$u.post('api/wallet/recharge_usdt', params);
	// 提现订单提交(支付宝微信)
	const draw_make = (params) => vm.$u.post('api/wallet/draw_make', params);

	const draw_usdt = (params) => vm.$u.post('api/wallet/draw_usdt', params);
	// 提现记录
	const draw_list = (params) => vm.$u.post('api/wallet/draw_list', params);
	// NFT转增
	const given_nft = (params) => vm.$u.post('api/wallet/given_nft', params);
	// 转赠
	const given = (params) => vm.$u.post('api/wallet/given', params);
	// NFT转增记录
	const given_list = (params) => vm.$u.post('api/wallet/given_list', params);
	// 我上架的
	const my_publish = (params) => vm.$u.post('api/wallet/my_publish', params);
	// 我的藏品
	const my_object = (params) => vm.$u.post('api/wallet/my_object', params);
	// 下架
	const down = (params) => vm.$u.post('api/cast/down', params);
	// 发起拍卖
	const create_new_auction = (params) => vm.$u.post('api/shop/create_new_auction', params);
	// 交易记录
	const trade_log = (params) => vm.$u.post('api/shop/trade_log', params);
	const pre_trade_log = (params) => vm.$u.post('api/shop/pre_trade_log', params);

	// 拍卖预览
	const action_show = (params) => vm.$u.post('api/shop/action_show', params);
	// 我的喜欢列表
	const like_list = (params) => vm.$u.post('api/shop/like_list', params);
	// 商品移除我的喜欢
	const like_del = (params) => vm.$u.post('api/shop/like_del', params);
	// 商品加入我的喜欢
	const like_add = (params) => vm.$u.post('api/shop/like_add', params);
	// 市场支付-支付宝
	const pre_pay_ali = (params) => vm.$u.post('api/shop/pre_pay_ali', params);
	// 我的铸造
	const my_list = (params) => vm.$u.post('api/cast/my_list', params);
	// 我的铸造(审核中)
	const my_list_check = (params) => vm.$u.post('api/cast/my_list_check', params);
	// 我的铸造详情
	const cast_detail = (params) => vm.$u.post('api/cast/cast_detail', params);
	// 我的铸造-支付宝支付
	const cast_pay_ali = (params) => vm.$u.post('api/cast/cast_pay_ali', params);
	// 作品订单详情预览
	const order_pro_list = (params) => vm.$u.post('api/shop/order_pro_list', params);
	// 竞价记录
	const auction_log = (params) => vm.$u.post('api/shop/auction_log', params);
	// 在售订单支付下单
	const sale_order_add = (params) => vm.$u.post('api/shop/sale_order_add', params);
	// 余额支付
	const balance_pay = (params) => vm.$u.post('api/shop/balance_pay', params);
	// 我买到的待支付订单
	const pay_sale_order = (params) => vm.$u.post('api/shop/pay_sale_order', params);
	// 浏览记录添加
	const history = (params) => vm.$u.post('api/shop/history', params);
	// 历史记录列表
	const history_list = (params) => vm.$u.post('api/shop/history_list', params);
	// 清空历史记录
	const history_del = (params) => vm.$u.post('api/shop/history_del', params);
	// 拍卖保证金支付下单
	const auction_order_add = (params) => vm.$u.post('api/shop/auction_order_add', params);
	// 参与拍卖余额支付
	const auction_balance_pay = (params) => vm.$u.post('api/shop/auction_balance_pay', params);
	// 出价预览
	const my_auction_show = (params) => vm.$u.post('api/shop/my_auction_show', params);
	// 我的竞拍
	const my_auction = (params) => vm.$u.post('api/shop/my_auction', params);
	// 竞拍出价
	const update_price = (params) => vm.$u.post('api/shop/update_price', params);
	// 订单支付(微信app/H5/公众号)
	const pre_pay_wechat = (params) => vm.$u.post('api/shop/pre_pay_wechat', params);
	// 盲盒
	const blindbox_index = (params) => vm.$u.post('api/blindbox/index', params);
	// 盲盒详情
	const blind_box_detail = (params) => vm.$u.post('api/blindbox/blind_box_detail', params);
	// 盲盒订单详情预览
	const order_box_list = (params) => vm.$u.post('api/blindbox/order_box_list', params);
	// 盲盒订单支付下单
	const box_order_add = (params) => vm.$u.post('api/blindbox/box_order_add', params);
	// 盲盒余额支付
	const boxbalance_pay = (params) => vm.$u.post('api/blindbox/balance_pay', params);
	// 查询盲盒订单信息
	const box_info = (params) => vm.$u.post('api/blindbox/box_info', params);
	// 领取盲盒
	const receive_blind_box = (params) => vm.$u.post('api/blindbox/receive_blind_box', params);
	// 铸造支付预览
	const order_show = (params) => vm.$u.post('api/cast/order_show', params);
	// 铸造支付下单
	const order_add = (params) => vm.$u.post('api/cast/order_add', params);
	// 铸造支付下单
	const cast_balance_pay = (params) => vm.$u.post('api/cast/balance_pay', params);
	// 发行日历
	const calendar = (params) => vm.$u.post('api/cast/calendar', params);
	// 我的收藏详情
	const my_object_detail = (params) => vm.$u.post('api/shop/my_object_detail', params);
	// 支付宝充值
	const recharge_pay_ali = (params) => vm.$u.post('api/wallet/recharge_pay_ali', params);

	// 多库存
	const one_index = (params) => vm.$u.post('api/shop/one_index', params);
	const jfshop = (params) => vm.$u.post('api/shop/jfshop', params);
	const jifenduihuan = (params) => vm.$u.post('api/shop/jifenduihuan', params);
	const getJFGoods = (params) => vm.$u.get('api/point_goods', params);

	const product_one_detail = (params) => vm.$u.post('api/shop/product_one_detail', params);
	const one_order_pro_list = (params) => vm.$u.post('api/shop/one_order_pro_list', params);
	const one_sale_order_add = (params) => vm.$u.post('api/shop/one_sale_order_add', params);
	const one_balance_pay = (params) => vm.$u.post('api/shop/one_balance_pay', params);
	const one_pay_sale_order = (params) => vm.$u.post('api/shop/one_pay_sale_order', params);
	const my_list_cast_check = (params) => vm.$u.post('api/cast/my_list_check', params);
	const up_new = (params) => vm.$u.post('api/cast/up_new', params);

	// 支付
	const cast_pay_wechat = (params) => vm.$u.post('api/cast/cast_pay_wechat', params);
	const auction_pay_wechat = (params) => vm.$u.post('api/shop/auction_pay_wechat', params);
	const auction_pay_ali = (params) => vm.$u.post('api/shop/auction_pay_ali', params);
	const box_pay_wechat = (params) => vm.$u.post('api/blindbox/box_pay_wechat', params);
	const box_pay_ali = (params) => vm.$u.post('api/blindbox/box_pay_ali', params);
	const one_pre_pay_wechat = (params) => vm.$u.post('api/shop/one_pre_pay_wechat', params);
	const one_pre_pay_ali = (params) => vm.$u.post('api/shop/one_pre_pay_ali', params);
	const air_pay = (params) => vm.$u.post('api/cast/air_pay', params);
	const blindbox_air_pay = (params) => vm.$u.post('api/blindbox/air_pay', params);
	const shop_air_pay = (params) => vm.$u.post('api/shop/air_pay', params);
	const shop_one_air_pay = (params) => vm.$u.post('api/shop/one_air_pay', params);

	// 对战专区
	const ticket_info = (params) => vm.$u.post('api/ticket/info', params);
	const battle_index = (params) => vm.$u.post('api/battle/index', params);
	const ticket_buy = (params) => vm.$u.post('api/ticket/buy', params);
	const ticket_logs = (params) => vm.$u.post('api/ticket/logs', params);
	const battle_check = (params) => vm.$u.post('api/battle/check', params);
	const mortgage_index = (params) => vm.$u.post('api/mortgage/index', params);
	const mortgage_detail = (params) => vm.$u.post('api/mortgage/detail', params);
	const mortgage_order = (params) => vm.$u.post('api/mortgage/order', params);
	const mortgage_orderAdd = (params) => vm.$u.post('api/mortgage/orderAdd', params);
	const battle_match = (params) => vm.$u.post('api/battle/match', params);
	const battle_rank = (params) => vm.$u.post('api/battle/rank', params);
	const battle_invite = (params) => vm.$u.post('api/battle/invite', params); // 对战邀请
	const battle_refuseInvite = (params) => vm.$u.post('api/battle/refuseInvite', params); // 拒绝邀请
	const battle_againInvite = (params) => vm.$u.post('api/battle/againInvite', params); // 再次邀请
	const battle_cancelInvite = (params) => vm.$u.post('api/battle/cancelInvite', params); // 取消邀请
	const battle_acceptInvite = (params) => vm.$u.post('api/battle/acceptInvite', params); // 接受邀请
	const battle_getStatus = (params) => vm.$u.post('api/battle/getStatus', params); // 定时刷新对战状态
	const battle_battle_index = (params) => vm.$u.post('api/battle/battle_index', params); // 对战中
	const battle_move = (params) => vm.$u.post('api/battle/move', params); // 出招
	const battle_logs = (params) => vm.$u.post('api/battle/logs', params); // 出招

	// 盲盒待付款
	const blindbox_pay_sale_order = (params) => vm.$u.post('api/blindbox/pay_sale_order', params);
	// 联系我们
	const service_info = (params) => vm.$u.post('api/center/service_info', params);

	const rank = (params) => vm.$u.post('api/home/rank', params);

	const mechi_rank = (params) => vm.$u.post('api/center/mechi_rank', params); //专区排行

	// 缤纷合成
	const mix_index = (params) => vm.$u.post('api/mix_active/index', params);
	const mix_detail = (params) => vm.$u.post('api/mix_active/detail', params);
	const mix_compose = (params) => vm.$u.post('api/mix_active/compose', params);
	const mix_pool_compose = (params) => vm.$u.post('api/mix_active/pool_compose', params);
	const mix_receive = (params) => vm.$u.post('api/mix_active/receive', params);


	const lucky_join = (params) => vm.$u.post('api/shop/lucky_join', params);

	const captcha = (params) => vm.$u.post('api/captcha', params);

	const active_rank = (params) => vm.$u.post('api/home/active_rank', params);

	const open_box = (params) => vm.$u.post('api/wallet/open_box', params);

	const batch_open_box = (params) => vm.$u.post('api/wallet/batch_open_box  ', params);

	const open_status = (params) => vm.$u.post('api/open_status', params);

	const my_shai = (params) => vm.$u.post('api/wallet/my_shai', params);

	// 版权市场取消订单
	const order_cancel = (params) => vm.$u.post('api/shop/cancel_order', params);
	// 流转市场取消订单
	const new_order_cancel = (params) => vm.$u.post('api/shop/new_cancel_order', params);
	// 取消盲盒订单
	const blindbox_order_cancel = (params) => vm.$u.post('api/blindbox/cancel_order', params);

	const transfer_show = (params) => vm.$u.post('api/wallet/transfer_show', params);
	const transfer_balance = (params) => vm.$u.post('api/wallet/transfer_balance', params);
	const transfer_log = (params) => vm.$u.post('api/wallet/transfer_log', params);
	const balance_transfer = (params) => vm.$u.post('api/wallet/balance_transfer', params);

	const my_auction_pay_show = (params) => vm.$u.post('api/shop/my_auction_pay_show', params);
	const auction_product_order_add = (params) => vm.$u.post('api/shop/auction_product_order_add', params);
	const userUrlscheme = (params) => vm.$u.post('api/user/urlscheme', params);

	// 实名认证回显
	const checkInformation = (params) => vm.$u.post('/api/center/checkInformation', params);

	// 签到
	const signUp = (params) => vm.$u.post('/api/center/signUp', params);
	const signLog = (params) => vm.$u.post('/api/center/signLog', params);
	const biography = (params) => vm.$u.post('/api/author/biography', params);
	const splist = (params) => vm.$u.post('/api/center/splist', params);

	const product_tong_list = (params) => vm.$u.post('api/shop/product_tong_list', params);
	const new_tong_list = (params) => vm.$u.post('api/shop/new_tong_list', params);
	// 市场快捷下单  api/shop/quick_info
	const quick_info = (params) => vm.$u.post('api/shop/quick_info', params);
	const message_add = (params) => vm.$u.post('api/center/message_add', params);

	const started_auction = (params) => vm.$u.post('api/wallet/started_auction', params);
	const mix_join_log = (params) => vm.$u.post('api/mix_active/mix_join_log', params);
	const mix_join_log_detail = (params) => vm.$u.post('api/mix_active/mix_join_log_detail', params);

	const my_wallet_object_detail = (params) => vm.$u.post('api/wallet/my_object_detail', params);

	// 哆啦宝支付
	const recharge_pay_dlb = (params) => vm.$u.post('api/wallet/recharge_pay_dlb', params);
	const pre_pay_dlb = (params) => vm.$u.post('api/shop/pre_pay_dlb', params);
	const box_pay_dlb = (params) => vm.$u.post('api/blindbox/box_pay_dlb', params);
	const cast_pay_dlb = (params) => vm.$u.post('api/cast/cast_pay_dlb', params);
	const auction_pay_dlb = (params) => vm.$u.post('api/shop/auction_pay_dlb', params);

	// 杉德快捷支付
	const recharge_pay_sand = (params) => vm.$u.post('api/wallet/recharge_pay_sand', params);
	const pre_pay_sand = (params) => vm.$u.post('api/shop/pre_pay_sand', params);
	const box_pay_sand = (params) => vm.$u.post('api/blindbox/box_pay_sand', params);
	const cast_pay_sand = (params) => vm.$u.post('api/cast/cast_pay_sand', params);
	const auction_pay_sand = (params) => vm.$u.post('api/shop/auction_pay_sand', params);

	//杉德云钱包
	const sandindex = (params) => vm.$u.post('api/sandYun/index ', params); //杉德云钱包开通状态
	const sand_fee = (params) => vm.$u.post('api/sandYun/fee', params); //杉德云钱包开户手续费支付
	const open_account = (params) => vm.$u.post('api/sandYun/open_account', params); //杉德云钱包（开户或我的钱包）
	const pre_pay_sandYun = (params) => vm.$u.post('api/shop/pre_pay_sandYun', params); //藏品云支付
	const auction_pay_sandYun = (params) => vm.$u.post('api/shop/auction_pay_sandYun', params); // 保证金云支付
	const box_pay_sandYun = (params) => vm.$u.post('api/blindbox/box_pay_sandYun', params); //盲盒云支付
	const cast_pay_sandYun = (params) => vm.$u.post('api/cast/cast_pay_sandYun', params); //铸造支付

	// 发售日历详情
	const calendars_detail = (params) => vm.$u.post('api/calendars_detail', params);

	// 收货地址
	const address = (params) => vm.$u.post('api/address/index', params);
	const address_add = (params) => vm.$u.post('api/address/add', params);
	const address_info = (params) => vm.$u.post('api/address/info', params);
	const address_del = (params) => vm.$u.post('api/address/del', params);

	// 积分
	const point_index = (params) => vm.$u.post('api/point/index', params);
	const point_detail = (params) => vm.$u.post('api/point/detail', params);
	const point_order = (params) => vm.$u.post('api/point/order', params);
	const point_order_add = (params) => vm.$u.post('api/point/order_add', params);
	const shop_detail = (params) => vm.$u.post('api/shop/shop_detail', params); // 积分商品详情
	const shop_exchange = (params) => vm.$u.post('api/shop/exchange', params); //积分商品兑换

	// 物流订单
	const myOrders_index_list = (params) => vm.$u.get('api/delivery_order', params); // 物流订单
	const myOrders_index = (params) => vm.$u.post('api/myOrders/index', params);
	const myOrders_detail = (params) => vm.$u.post('api/myOrders/detail', params);
	const myOrders_express = (params) => vm.$u.post('api/myOrders/express', params);
	const myOrders_receive = (params) => vm.$u.post('api/myOrders/receive', params);
	const myOrders_receive_put = (params) => vm.$u.put('api/delivery_order/' + params.id, params);

	// 大转盘
	const bonus_index = (params) => vm.$u.post('api/bonus/index', params);
	const bonus_start = (params) => vm.$u.post('api/bonus/start', params);
	const bonus_logs = (params) => vm.$u.post('api/bonus/logs', params); // 大转盘抽奖记录
	// 下载证书
	const certificateInfo = (params) => vm.$u.post('api/certificateInfo', params);
	// 社区
	const districtIndex = (params) => vm.$u.post('api/districtIndex', params);
	const districtInfo = (params) => vm.$u.post('api/districtInfo', params);
	const districtJoin = (params) => vm.$u.post('api/districtJoin', params);
	const districtQuit = (params) => vm.$u.post('api/districtQuit', params);
	const districtContent = (params) => vm.$u.post('api/districtContent', params);
	const districtGroupUsers = (params) => vm.$u.post('api/districtGroupUsers', params);
	const districtApply = (params) => vm.$u.post('api/districtApply', params);
	const districtSignIn = (params) => vm.$u.post('api/districtSignIn', params);
	const districtSetGroupUserInfo = (params) => vm.$u.post('api/districtSetGroupUserInfo', params);
	const districtMuteGroup = (params) => vm.$u.post('api/districtMuteGroup', params);
	const districtSendVerify = (params) => vm.$u.post('api/districtSendVerify', params);

	// IM
	const imToken = (params) => vm.$u.post('api/imToken', params);

	// 上传图片
	const upload_img = (params) => vm.$u.post('api/upload_file', params);

	// 动态
	const districtDynamicPublish = (params) => vm.$u.post('api/districtDynamicPublish', params);
	const districtDynamic = (params) => vm.$u.post('api/districtDynamic', params);
	const districtDynamicIndex = (params) => vm.$u.post('api/districtDynamicIndex', params);
	const districtNoticeList = (params) => vm.$u.post('api/districtNoticeList', params);
	const districtDynamicInfo = (params) => vm.$u.post('api/districtDynamicInfo', params);
	const districtCommentPublish = (params) => vm.$u.post('api/districtCommentPublish', params);
	const districtDynamicCommentList = (params) => vm.$u.post('api/districtDynamicCommentList', params);
	const districtPraise = (params) => vm.$u.post('api/districtPraise', params);
	const districtDynamicDel = (params) => vm.$u.post('api/districtDynamicDel', params);
	const districtReport = (params) => vm.$u.post('api/districtReport', params);

	const calendars = (params) => vm.$u.post('api/calendars', params);

	const invite = (params) => vm.$u.post('api/center/invite', params);
	const inviteTopData = (params) => vm.$u.get('api/center/invite_summary', params);


	const getNewSignInLog = (params) => vm.$u.get('api/center/sign_reward_list', params); // 新签到记录

	// 购买邀请码
	const buyInvitationInfo = (params) => vm.$u.post('api/buyInvitationInfo', params);
	const buyInvitation = (params) => vm.$u.post('api/buyInvitation', params);

	// 批量购
	const batch_limit_info = (params) => vm.$u.post('api/shop/batch_limit_info', params);
	const batch_order = (params) => vm.$u.post('api/shop/batch_order', params);
	const batch_unpay_order = (params) => vm.$u.post('api/shop/batch_unpay_order', params);
	const batch_cancel_order = (params) => vm.$u.post('api/shop/batch_cancel_order', params);
	const batch_pay_detail = (params) => vm.$u.post('api/shop/batch_pay_detail', params);
	const batch_balance_pay = (params) => vm.$u.post('api/shop/batch_balance_pay', params);
	const batch_air_pay = (params) => vm.$u.post('api/shop/batch_air_pay', params);
	const batch_pay_sand = (params) => vm.$u.post('api/shop/batch_pay_sand', params);
	const batch_pay_ali = (params) => vm.$u.post('api/shop/batch_pay_ali', params);
	const batch_pay_wechat = (params) => vm.$u.post('api/shop/batch_pay_wechat', params);
	const batch_compose = (params) => vm.$u.post('api/mix_active/batch_compose', params);

	// 专区
	const vip_index = (params) => vm.$u.post('api/vip/index', params);
	const getTabs = (params) => vm.$u.get('api/project_cate', params);
	const getProjects = (params) => vm.$u.get('api/project', params);
	const vip_product_detail = (params) => vm.$u.post('api/vip/product_detail', params);
	const getJFGoodsInfo = (params) => vm.$u.get('api/point_goods/' + params.id, params);
	const getProjectGoodsInfo = (params) => vm.$u.get('api/project/' + params.id, params);
	const getProjectGoodsReturnLog = (params) => vm.$u.get('api/cashback', params); // 项目返现列表
	const getProjectGoodsLog = (params) => vm.$u.get('api/purchase_log', params); // 项目购买列表
	const getProjectGoodsInfoOrder = (params) => vm.$u.post('api/purchase_log', params);
	const getProjectGoodsInfoOrderBuy = (params) => vm.$u.put('api/purchase_log/' + params.id, params);
	const vip_order_pro_list = (params) => vm.$u.post('api/vip/vip_order_pro_list', params);
	const vip_sale_order_add = (params) => vm.$u.post('api/vip/vip_sale_order_add', params);
	const vip_pay_wechat = (params) => vm.$u.post('api/vip/vip_pay_wechat', params);
	const vip_pay_ali = (params) => vm.$u.post('api/vip/vip_pay_ali', params);
	const vip_pay_sand = (params) => vm.$u.post('api/vip/vip_pay_sand', params);
	const vip_pay_dlb = (params) => vm.$u.post('api/vip/vip_pay_dlb', params);
	const vip_balance_pay = (params) => vm.$u.post('api/vip/vip_balance_pay', params);
	const vip_pay_sale_order = (params) => vm.$u.post('api/vip/pay_sale_order', params); //积分
	const vip_cancel_order = (params) => vm.$u.post('api/vip/cancel_order', params); //取消订单
	const vip_zone_orders = (params) => vm.$u.post('api/vip/zone_orders', params); //取消订单
	const vip_my_vip = (params) => vm.$u.post('api/vip/my_vip', params); //我的vip


	const my_team = (params) => vm.$u.post('api/center/my_team', params); //我的团队
	const my_team_detail = (params) => vm.$u.post('api/center/my_team_detail', params); //我的团队详情

	const my_sign_in = (params) => vm.$u.post('api/center/sign_record', params); //签到信息
	const my_sign_in_info = (params) => vm.$u.post('api/center/sign_ranking', params); //签到信息详情
	const my_sign_in_info_num = (params) => vm.$u.post('api/center/sign_gifts', params); //签到信息详情积分

	// 交易所
	const Trading_preview = (params) => vm.$u.post('api/exchange/preview', params); //平台信息
	const Trading_apply_merchant = (params) => vm.$u.post('api/exchange/apply_merchant', params); //申请商户
	const Trading_index = (params) => vm.$u.post('api/exchange/index', params); //去购买列表
	const Trading_show = (params) => vm.$u.post('api/exchange/show', params); //订单详情
	const Trading_purchase = (params) => vm.$u.post('api/exchange/purchase', params); //购买提交
	const Trading_sell = (params) => vm.$u.post('api/exchange/sell', params); //出售提交
	const Trading_trade_order = (params) => vm.$u.post('api/exchange/trade_order', params); //我的交易订单
	const Trading_sell_order = (params) => vm.$u.post('api/exchange/sell_order', params); //我的出售订单
	const Trading_sell_down = (params) => vm.$u.post('api/exchange/sell_down', params); //下架
	const Trading_confirm = (params) => vm.$u.post('api/exchange/confirm', params); //确认订单

	// AI画展
	const exhibition_index = (params) => vm.$u.post('api/exhibition/index', params);
	const exhibition_details = (params) => vm.$u.post('api/exhibition/details', params);
	const gallery = (params) => vm.$u.post('api/gallery/gallery', params);
	const gallery_detail = (params) => vm.$u.post('api/gallery/gallery_detail', params);
	const gallery_subject = (params) => vm.$u.post('api/gallery/subject', params);
	const gallery_publish = (params) => vm.$u.post('api/gallery/publish', params);
	const gallery_del = (params) => vm.$u.post('api/gallery/del', params);
	const selector = (params) => vm.$u.post('api/painting/selector', params); //风格画家接口
	const put_task = (params) => vm.$u.post('api/painting/put_task', params); //生成绘画

	const starIndex = (params) => vm.$u.post('api/showroom/index', params);
	const starDetail = (params) => vm.$u.post('api/showroom/starDetail', params);
	const floorDetail = (params) => vm.$u.post('api/showroom/floorDetail', params);
	const join = (params) => vm.$u.post('api/showroom/join', params);
	const preList = (params) => vm.$u.post('api/showroom/preList', params);
	const addPre = (params) => vm.$u.post('api/showroom/addPre', params);

	const delPre = (params) => vm.$u.post('api/showroom/delPre', params);


	const jfBuy = (params) => vm.$u.post('api/point_exchange_record', params); // 积分购买商品
	const jfBuyLog = (params) => vm.$u.get('api/point_exchange_record', params); // 积分购买商品

	// 三方聊天
	const openaiRegister = (params) => vm.$u.post('api/center/openaiRegister', params);

	vm.$u.api = {
		openaiRegister,

		jfBuy, // 积分购买商品
		jfBuyLog, // 积分购买商品

		delPre,
		addPre,
		preList,
		starIndex,
		starDetail,
		floorDetail,
		join,
		exhibition_index,
		exhibition_details,
		gallery,
		gallery_detail,
		gallery_subject,
		gallery_publish,
		gallery_del,
		selector,
		put_task,

		Trading_preview,
		Trading_apply_merchant,
		Trading_show,
		Trading_index,
		Trading_purchase,
		Trading_sell,
		Trading_trade_order,
		Trading_sell_order,
		Trading_sell_down,
		Trading_confirm,

		my_team,
		my_team_detail,

		my_sign_in,
		my_sign_in_info,
		my_sign_in_info_num,

		vip_product_detail,
		getJFGoodsInfo,
		getProjectGoodsInfo,
		getProjectGoodsInfoOrder,
		getProjectGoodsLog,
		getProjectGoodsReturnLog,
		getProjectGoodsInfoOrderBuy,
		vip_index,
		getTabs,
		getProjects,
		vip_order_pro_list,
		vip_sale_order_add,
		vip_pay_wechat,
		vip_pay_ali,
		vip_pay_sand,
		vip_pay_dlb,
		vip_balance_pay,
		vip_pay_sale_order,
		vip_cancel_order,
		vip_zone_orders,
		vip_my_vip,

		ticket_info,
		battle_index,
		ticket_buy,
		ticket_logs,
		battle_check,
		mortgage_index,
		mortgage_detail,
		mortgage_order,
		mortgage_orderAdd,
		battle_match,
		battle_rank,
		battle_invite,
		battle_refuseInvite,
		battle_againInvite,
		battle_cancelInvite,
		battle_acceptInvite,
		battle_getStatus,
		battle_battle_index,
		battle_move,
		battle_logs,


		batch_compose,
		batch_limit_info,
		batch_order,
		batch_unpay_order,
		batch_cancel_order,
		batch_pay_detail,
		batch_balance_pay,
		batch_air_pay,
		batch_pay_sand,
		batch_pay_ali,
		batch_pay_wechat,

		buyInvitationInfo,
		buyInvitation,

		calendars,

		districtDynamicPublish,
		districtDynamic,
		districtDynamicIndex,
		districtNoticeList,
		districtDynamicInfo,
		districtCommentPublish,
		districtDynamicCommentList,
		districtPraise,
		districtDynamicDel,
		districtReport,

		imToken,

		upload_img,

		districtIndex,
		districtInfo,
		districtJoin,
		districtQuit,
		districtContent,
		districtGroupUsers,
		districtApply,
		districtSignIn,
		districtSetGroupUserInfo,
		districtMuteGroup,
		districtSendVerify,

		certificateInfo,

		bonus_index,
		bonus_start,
		bonus_logs,

		myOrders_index,
		myOrders_index_list,
		myOrders_detail,
		myOrders_express,
		myOrders_receive,
		myOrders_receive_put,

		point_index,
		point_detail,
		point_order,
		point_order_add,

		address,
		address_add,
		address_del,
		address_info,

		calendars_detail,
		loginWechat,
		jifenduihuan,
		getJFGoods, // 积分商城商品
		regWechat,
		register_make,
		login_make,
		login_make1,
		send_code,
		forget_make,
		user_rule,
		author_list,
		attention,
		callback_attention,
		author_index,
		author_apply,
		author_detail,
		author_pro_list,
		center_index,
		nickname_change,
		change_head,
		send_email_code,
		email_make,
		draw_info,
		bind_draw,
		recommend,
		recommendChildrenList,
		question_list,
		question_detail,
		news_type,
		news_list,
		news_detail,
		my_concern,
		security_make,
		my_fans,
		cast_index,
		up,
		certification_verification,
		phone_make,
		home_index,
		home_index_total_data,
		banner_detail,
		shop_index,
		shop_new_index,
		product_detail,
		new_detail,
		upload_file,
		cast_add1,
		wallet_index,
		air_drop,
		wallet_log,
		wallet_show,
		recharge_edit,
		recharge_usdt,
		recharge_pay_wechat,
		draw_list,
		given_nft,
		given,
		given_list,
		my_publish,
		my_object,
		down,
		create_new_auction,
		trade_log,
		pre_trade_log,
		action_show,
		like_list,
		like_add,
		like_del,
		my_list,
		my_list_check,
		cast_detail,
		order_pro_list,
		auction_log,
		sale_order_add,
		balance_pay,
		pay_sale_order,
		history,
		history_list,
		history_del,
		auction_order_add,
		auction_balance_pay,
		my_auction_show,
		my_auction,
		update_price,
		blindbox_index,
		blind_box_detail,
		order_box_list,
		box_order_add,
		boxbalance_pay,
		box_info,
		receive_blind_box,
		order_show,
		order_add,
		cast_balance_pay,
		pre_pay_wechat,
		calendar,
		draw_make,
		draw_usdt,
		pre_pay_ali,
		cast_pay_ali,
		my_object_detail,
		recharge_pay_ali,

		one_index,
		jfshop,
		product_one_detail,
		one_order_pro_list,
		one_sale_order_add,
		one_balance_pay,
		one_pay_sale_order,
		my_list_cast_check,
		up_new,

		cast_pay_wechat,
		auction_pay_wechat,
		auction_pay_ali,
		box_pay_ali,
		box_pay_wechat,
		one_pre_pay_ali,
		one_pre_pay_wechat,
		air_pay,
		blindbox_air_pay,
		shop_air_pay,
		shop_one_air_pay,

		blindbox_pay_sale_order,
		service_info,

		rank,
		mechi_rank,

		mix_index,
		mix_detail,
		mix_compose,
		mix_pool_compose,
		mix_receive,
		lucky_join,

		captcha,
		active_rank,
		open_box,
		batch_open_box,
		open_status,
		my_shai,
		order_cancel,
		blindbox_order_cancel,
		new_order_cancel,

		transfer_show,
		transfer_balance,
		transfer_log,
		balance_transfer,

		my_auction_pay_show,
		auction_product_order_add,
		userUrlscheme,
		author_bgimg,

		checkInformation,
		signUp,
		signLog,
		biography,
		product_tong_list,
		new_tong_list,
		quick_info,
		message_add,
		splist,

		started_auction,
		mix_join_log,
		mix_join_log_detail,

		my_wallet_object_detail,

		recharge_pay_dlb,
		pre_pay_dlb,
		box_pay_dlb,
		cast_pay_dlb,
		auction_pay_dlb,

		recharge_pay_sand,
		pre_pay_sand,
		box_pay_sand,
		cast_pay_sand,
		auction_pay_sand,
		invite,
		inviteTopData,

		getNewSignInLog,

		sandindex,
		sand_fee,
		open_account,
		pre_pay_sandYun,
		auction_pay_sandYun,
		box_pay_sandYun,
		cast_pay_sandYun,
		shop_detail,
		shop_exchange
	};
}

export default {
	install
}
