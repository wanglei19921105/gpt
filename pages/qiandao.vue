<template>
	<view>
		<sign-in @signSuccess="signSuccess"></sign-in>
	</view>
</template>

<script>
	import signIn from '../uni_modules/lmk-signIn/components/lmk-signIn/lmk-signIn.vue';
	export default {
		components:{
		    signIn
		},
		data(){
			return{
				userInfo:'',
				props: {
				    lang: { //语言
				        type: String,
				        default: 'zh'
				    },
				    type: { //日历
				        type: String,
				        default: 'calendar'
				    },
				    bgweek: { //当前周文字颜色
				        type: String,
				        default: '#4187F9'
				    },
				    signBtnBg: { //签到按钮颜色
				        type: String,
				        default: '#4187F9'
				    }
				}
			}
		},
		onShow() {
			this.getUserinfo()
		},
		onLoad() {
		},
		methods:{
			getUserinfo() {
				this.$u.api.center_index().then(res => {
					if (res.code == 200) {
						this.userInfo = res.data.user
					}
				}).catch(err => {})
			},
			// getSignLog();<!-- //获取签到记录列表 -->
			
			// daySign();<!-- //立即签到方法 -->
			
			// signToday();<!-- //补签方法 -->
		}
	}
</script>

<style>
</style>