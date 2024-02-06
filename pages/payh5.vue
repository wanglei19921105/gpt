<template>
	<view class="bg-white" style="height: 100vh;">
		<unavbar title="支付" ></unavbar>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				htmlstr: ''
			}
		},
		onLoad(data) {
			this.htmlstr = decodeURIComponent(sessionStorage.getItem('alH5Pay') || '')
			// this.htmlstr = decodeURIComponent(data.htmlstr)
			// document.getElementById("alipay_submit").submit()
			if(getCurrentPages().length > 1 && this.htmlstr){
				let divForm = document.getElementsByTagName('divform')
				if (divForm.length) {
				  document.body.removeChild(divForm[0])
				}
				const div = document.createElement('divform')
				div.innerHTML = this.htmlstr
				document.body.appendChild(div)
				// document.forms[0].setAttribute('target', '_blank')
				document.getElementById('alipay_submit').submit()
				this.htmlstr = ''
			} else {
				history.back()
			}
		},
		onShow() {}
	}
</script>

<style>
</style>
