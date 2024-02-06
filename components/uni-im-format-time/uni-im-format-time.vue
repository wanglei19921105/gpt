<template>
	<text class="formatTime">{{ formatTime }}</text>
</template>
<script>
import uniImUtils from '@/common/imUtils.js';
export default {
	computed: {
		formatTime() {
			const index = this.index;
			const msg = this.msgList[index];
			let timestamp = msg.createTime || msg.sendTime;
			// console.log(index,'body:'+msg.body)
			if (index && index != this.msgList.length - 1) {
				// console.log(index)
				let PrevMsg = this.msgList[index - 1];
				let PrevTimestamp = PrevMsg.createTime || PrevMsg.sendTime;
				//两条消息之间间隔低于1分钟不显示
				// console.log(PrevTimestamp - timestamp)
				if (PrevTimestamp - timestamp < 60 * 1000) {
					return '';
				}
			}
			// return timeSpanStr;
			return uniImUtils.formatTime(timestamp);
		}
	},
	data() {
		return {};
	},
	props: {
		index: {
			type: Number,
			default() {
				return '';
			}
		},
		msgList: {
			type: Array,
			default() {
				return [];
			}
		}
	}
};
</script>

<style scoped>
.formatTime {
	width: 750rpx;
	height: 22px;
	text-align: center;
	color: #999999;
	font-size: 14px;
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
}
</style>
