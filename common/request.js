import store from '@/store/index'
const install = (Vue, vm) => {
	Vue.prototype.$u.http.setConfig({
		baseUrl: Vue.prototype.baseUrl, // 请求的本域名
		method: 'POST',
		// 设置为json，返回后会对数据进行一次JSON.parse()
		dataType: 'json',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		originalData: false, // 是否在拦截器中返回服务端的原始数据
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 配置请求头信息
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
	});

	Vue.prototype.$u.http.interceptor.request = (config) => {
		const token = uni.getStorageSync("token");
		const lang = uni.getStorageSync('lang');
		const invite_code = uni.getStorageSync('invite_code');
		config.header.token = token ? token : '';
		config.header.invite_code = invite_code ? invite_code : '';
		config.header.lang = lang ? lang : store.state.lang;

		return config;
	}

	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		if(res.code == 300)
		{
			vm.$u.toast(res.message);
			setTimeout(function()
			{
				uni.navigateTo({
					url:'/pages/my/verified/verified'
				})
			},400)
		}
		if (res.code == 200) {
			return res;
		} else if (res.code == 400) {
			vm.$u.toast(res.message);
			if(res.message == "绑定手机号后才能操作"){
				uni.navigateTo({
					url:'/pages/my/bindPhone/bindPhone'
				})
			}
			return false
		} else if(res.code == 401||res.code==403) {
			uni.showModal({
				title: '提示',
				content: res.message,
				success: res=> {
					if (res.confirm) {
						uni.removeStorageSync('userpwd')
						uni.removeStorageSync('token')
						uni.removeStorageSync('lang')
						uni.removeStorageSync('id')
						uni.reLaunch({
							url:"/pages/login/index/logInAccount"
						})
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
			return false

		}
		// if (res.code == 200) {
		// 	// res为服务端返回值，可能有code，result等字段
		// 	// 这里对res.result进行返回，将会在this.$u.post(url).then(res => {})的then回调中的res的到
		// 	// 如果配置了originalData为true，请留意这里的返回值
		// 	return res.result;
		// } else if (res.code == 201) {
		// 	// 假设201为token失效，这里跳转登录
		// 	vm.$u.toast('验证失败，请重新登录');
		// 	setTimeout(() => {
		// 		// 此为uView的方法，详见路由相关文档
		// 		vm.$u.route('/pages/user/login')
		// 	}, 1500)
		// 	return false;
		// } else {
		// 	// 如果返回false，则会调用Promise的reject回调，
		// 	// 并将进入this.$u.post(url).then().catch(res=>{})的catch回调中，res为服务端的返回值
		// 	return false;
		// }
	}
}

export default {
	install
}
