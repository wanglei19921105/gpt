import {
	CbEvents,
	OpenIMSDK
} from 'open-im-sdk';

import {
	v4 as uuidv4
} from 'uuid'

import moment from 'moment'
import 'moment/locale/zh-cn'

// 中文时间格式化
moment.locale('zh-cn', {
	months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
	monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
	weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
	weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
	weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
	longDateFormat: {
		LT: 'Ah:mm',
		LTS: 'Ah:mm:ss',
		L: 'YYYY-MM-DD',
		LL: 'YYYY年MMMD日',
		LLL: 'YYYY年MMMD日Ah:mm',
		LLLL: 'YYYY年MMMD日ddddAh:mm',
		l: 'YYYY-MM-DD',
		ll: 'YYYY年MMMD日',
		lll: 'YYYY年MMMD日Ah:mm',
		llll: 'YYYY年MMMD日ddddAh:mm'
	},
	meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
	meridiemHour: function(h, meridiem) {
		let hour = h;
		if (hour === 12) {
			hour = 0;
		}
		if (meridiem === '凌晨' || meridiem === '早上' ||
			meridiem === '上午') {
			return hour;
		} else if (meridiem === '下午' || meridiem === '晚上') {
			return hour + 12;
		} else {
			// '中午'
			return hour >= 11 ? hour : hour + 12;
		}
	},
	meridiem: function(hour, minute, isLower) {
		const hm = hour * 100 + minute;
		if (hm < 600) {
			return '凌晨';
		} else if (hm < 900) {
			return '早上';
		} else if (hm < 1130) {
			return '上午';
		} else if (hm < 1230) {
			return '中午';
		} else if (hm < 1800) {
			return '下午';
		} else {
			return '晚上';
		}
	},
	calendar: {
		sameDay: function() {
			return 'LT';
		},
		nextDay: function() {
			return '[明天]LT';
		},
		lastDay: function() {
			return '[昨天]LT';
		},
		nextWeek: function() {
			let startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.diff(startOfWeek, 'days') >= 7 ? '[下]' : '[本]';
			return this.minutes() === 0 ? prefix + 'dddAh点整' : prefix + 'dddAh点mm';
		},
		lastWeek: function() {
			let startOfWeek, prefix;
			startOfWeek = moment().startOf('week');
			prefix = this.unix() < startOfWeek.unix() ? '[上]' : '[本]';
			return prefix + 'dddAh:mm';
		},
		sameElse: 'L'
	},
	ordinalParse: /\d{1,2}(日|月|周)/,
	ordinal: function(number, period) {
		switch (period) {
			case 'd':
			case 'D':
			case 'DDD':
				return number + '日';
			case 'M':
				return number + '月';
			case 'w':
			case 'W':
				return number + '周';
			default:
				return number;
		}
	},
	relativeTime: {
		future: '%s内',
		past: '%s前',
		s: '几秒',
		m: '1 分钟',
		mm: '%d 分钟',
		h: '1 小时',
		hh: '%d 小时',
		d: '1 天',
		dd: '%d 天',
		M: '1 个月',
		MM: '%d 个月',
		y: '1 年',
		yy: '%d 年'
	},
	week: {
		// GB/T 7408-1994《数据元和交换格式·信息交换·日期和时间表示法》与ISO 8601:1988等效
		dow: 1, // Monday is the first day of the week.
		doy: 4 // The week that contains Jan 4th is the first week of the year.
	}
});

const openIM = new OpenIMSDK();

// ws地址
const url = 'ws://47.108.211.211:10003'

// {Int}平台号
const platformID = 5

// {String}用户ID
let userID = null

// IM的token
let imToken = null

const im = {
	// 登录状态
	loginStatus: 0,
	// 个人信息（faceURL、nickname、userID）
	selfInfo: {},
	// 解析时间戳
	initTime: num => {
		return moment(num).calendar()
	},
	// 初始化
	initIm: () => {
		return new Promise((resolve, reject)=>{
			userID = uni.getStorageSync('openImUserid')
			imToken = uni.getStorageSync('openImToken')
			let token = uni.getStorageSync('token')
			if(token && imToken){
				openIM.getLoginStatus().then(res => {
					// 如果ws已连接，没登录会自动登录，无需处理
				}).catch(err => {
					// ws未连接过，开始登录
					const config = {
						token: imToken,
						userID,
						url,
						platformID
					};
					openIM.login(config).then(res => {
						im.loginStatus = 1
							console.log('IM登录成功');
							openIM.getSelfUserInfo().then(({
								data
							}) => {
								let info = JSON.parse(data)
								uni.setStorageSync('selfInfo', info)
								im.selfInfo = info
								console.log('成功更新个人信息');
								resolve()
							}).catch(err => {
								console.log('获取个人信息失败');
								reject()
							})
						})
						.catch(err => {
							im.loginStatus = 0
							console.log(err);
							console.log('IM登录失败');
							reject()
						});
				})
			}else{
				reject()
			}
		})
	},
	// 修改用户信息
	setInfo:(faceURL)=>{
		const userInfo = {
			userID:uni.getStorageSync('openImUserid'),
		  faceURL: `${uni.$myAppConfig.baseUrl}`+faceURL.data.avatar,//头像URL
		}
		console.log(userInfo);
		openIM.setSelfInfo(userInfo).then(({
			data
		}) => {
			console.log("头像更改成功");
		}).catch(err => {
			console.log(err);
		})
	},
	// IM登出
	imLogout: () => {
		openIM.logout().then(res => {
			uni.removeStorageSync('openImToken')
			console.log("IM退出登录成功");
		}).catch(err => {
			console.log("IM退出登录失败");
		})
	},
	// 分页获取聊天记录
	imGetChatHistory: (groupID = "", msgID = "", count = 12) => {
		let id = groupID.toString()

		return new Promise((resolve, reject) => {
			const config = {
				groupID: id,
				startClientMsgID: msgID,
				count,
				userID: ""
			}
			openIM.getHistoryMessageList(config).then(({
				data
			}) => {
				console.log(JSON.parse(data));
				resolve(JSON.parse(data))
			}).catch(err => {
				console.log(err);
				reject()
			})
		})
	},
	// 发一条文字消息
	imCreateTextMessage: (text, id) => {
		return new Promise((resolve, reject) => {
			openIM.createTextMessage(text).then(({
				data
			}) => {
				let config = {
					message: data,
					recvID: "",
					groupID: id.toString()
				}
				openIM.sendMessage(config).then(({
					res,
					errCode
				}) => {
					if (errCode == 0) {
						console.log('文字消息发送成功');
						resolve()
					} else {
						console.log('文字消息发送失败');
					}
				}).catch(err => {
					console.log(err);
				})
			}).catch(err => {
				console.log(err);
			})
		})
	},
	// 发送一条图片消息
	imCreateImgMessage: id => {
		return new Promise((resolve, reject) => {
			uploadImage().then(res => {
				let baseInfo = Object.assign({
					uuid: uuidv4()
				}, res)
				let config = {
					sourcePicture: baseInfo,
					bigPicture: baseInfo,
					snapshotPicture: baseInfo
				}
				openIM.createImageMessage(config).then(({
					data
				}) => {
					let config = {
						message: data,
						recvID: "",
						groupID: id.toString()
					}
					openIM.sendMessageNotOss(config).then(({
						res,
						errCode
					}) => {
						if (errCode == 0) {
							resolve(baseInfo.url)
						} else {
							console.log('图片消息发送失败');
						}
					}).catch(err => {
						console.log('图片消息发送失败');
					})
				}).catch(err => {
					console.log('图片消息创建失败');
				})
			})
		})

	}
}

function getInfo() {
	openIM.getSelfUserInfo().then(({
		data
	}) => {
		let info = JSON.parse(data)
		uni.setStorageSync('selfInfo', info)
		im.selfInfo = info
		console.log('成功获取个人信息');
	}).catch(err => {
		console.log('获取个人信息失败');
	})
}

openIM.on(CbEvents.ONCONNECTFAILED, (data) => {
	// 连接失败...
	im.loginStatus = 0
	console.log('监听到连接失败');
})
openIM.on(CbEvents.ONCONNECTSUCCESS, (data) => {
	// 连接成功...
	im.loginStatus = 1
	console.log('监听到连接成功');
})
openIM.on(CbEvents.ONCONNECTING, (data) => {
	// 连接中...
	im.loginStatus = 2
	console.log('监听到连接中...');
})
openIM.on(CbEvents.ONKICKEDOFFLINE, (data) => {
	// 被踢下线...
	im.loginStatus = 0
	console.log('监听到被踢下线');
})
openIM.on(CbEvents.ONUSERTOKENEXPIRED, (data) => {
	// token过期...
	im.loginStatus = 0
	uni.removeStorageSync('openImToken')
	uni.showModal({
		title: '登录提示',
		confirmColor: '#FF5756',
		content: '该账户登录已过期，请重新登录',
		showCancel: false,
		success(res) {
			uni.reLaunch({
				url: "/pages/login/index/logInMain"
			})
		}
	})
})

// 消息监听
// 收到新消息...
openIM.on(CbEvents.ONRECVNEWMESSAGE,(data)=>{
	let message = ''
	if(data.data)message = JSON.parse(data.data)
	uni.$emit('onRecvNewMessage',message)
})

function uploadImage() {
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: 1,
			success: (chooseImageRes) => {
				const tempFilePaths = chooseImageRes.tempFilePaths;
				let fileinfo = {}
				uni.getImageInfo({
					src: tempFilePaths[0],
					success: image => {
						fileinfo = {
							type: tempFilePaths[0].type,
							size: tempFilePaths[0].size,
							width: image.width,
							height: image.height
						}
						uni.uploadFile({
							url: 'http://pg.metapuge.com/api/upload_file',
							filePath: tempFilePaths[0],
							name: 'pic',
							header: {
								'token': uni.getStorageSync('token')
							},
							formData: {
								sence: 'district'
							},
							success: (uploadFileRes) => {
								let res = JSON.parse(uploadFileRes.data)
								if (res.code == 200) {
									resolve({
										...fileinfo,
										...{
											url: res.data.real_path
										}
									})
								}
							}
						});
					}
				})
			}
		});
	})
}


export default im;
