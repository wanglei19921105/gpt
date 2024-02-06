# lmk-signIn 签到组件
1.引入

	import signIn from '../../uni_modules/lmk-signIn/components/lmk-signIn/lmk-signIn.vue'
   
2.注册
   
	components:{
		signIn
	}
   
3.使用

	<sign-in @signSuccess="signSuccess"></sign-in>
	
4.传参

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
	
5.部分方法说明

   getSignLog();<!-- //获取签到记录列表 -->
   
   daySign();<!-- //立即签到方法 -->
   
   signToday();<!-- //补签方法 -->