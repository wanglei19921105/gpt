<template>
	<view class="lime-svga" ref="limesvga">
		<!-- #ifndef APP-VUE || H5 || APP-NVUE-->
		<canvas class="lime-svga__canvas" v-if="use2dCanvas" :id="canvasId" type="2d"></canvas>
		<canvas class="lime-svga__canvas" v-else :canvas-id="canvasId" :id="canvasId"></canvas>
		<!-- #endif -->
		<!-- #ifdef APP-VUE || H5 -->
		<view class="lime-svga__canvas" :id="canvasId" 
		:rinit="canvasId" 
		:change:rinit="svga.init" 
		:rload="rLoadSrc"
		:change:rload="svga.parserLoad" 
		:rVideoItem="rVideoItem"
		:change:rVideoItem="svga.setVideoItem"
		
		:rPlayer="rPlayer"
		:change:rPlayer="svga.onPlayer"
		></view>
		
		<!-- #endif -->
		<!-- #ifdef APP-NVUE -->
		<web-view 
		class="lime-svga__canvas" 
		ref="webview" 
		@pagefinish="onPageFinish"
		@error="onError"
		@onPostMessage="onMessage"
		src="/uni_modules/lime-svga/static/index.html"></web-view>
		<!-- #endif -->
	</view>
</template>
<script>
	import {ENV_TYPE, toLoadPath} from './utils'
	// #ifndef APP-VUE || H5 || APP-NVUE
	import { Parser, Player} from './svgaplayer.weapp'
	// #endif
	// #ifdef APP-VUE || H5 
	import {Player, Parser} from './svga'
	import {Canvas} from './canvas'
	// #endif
	// #ifdef APP-NVUE
	import {Player, Parser} from './svga'
	// #endif
	export default {
		props: {
			type: {
				type: String,
				default: '2d'
			},
			src: String
		},
		data() {
			return {
				use2dCanvas: true,
				nIsInit: false,
				rIsLoad: false,
				rLoadSrc: null,
				rVideoItem: null,
				rSetVideoItem: false,
				rStartAnimation: null,
				rStopAnimation: null,
				rLoops: null,
				rClear: false,
				rPauseAnimation: null,
				rSetContentMode: null,
				rClearsAfterStop: true,
				rStartAnimationWithRange: null,
				rSetText: null,
				rSetImage: null,
				rOnFinished: false,
				rOnFrame: 0,
				rOnPercentage: 0,
			}
		},
		computed: {
			rPlayer() {
				const {rClearsAfterStop, rSetContentMode, rLoops, rStartAnimation, rStopAnimation, rClear, rPauseAnimation, rStartAnimationWithRange, rSetText, rSetImage}= this
				return {rClearsAfterStop, rSetContentMode, rLoops, rStartAnimation, rStopAnimation, rClear, rPauseAnimation, rStartAnimationWithRange, rSetText, rSetImage}
			},
			canvasId() {
				if(this._) {
					return `lime-svga${this._.uid}`
				}
				return `lime-svga${this._uid}`
			},
		},
		// #ifdef APP-NVUE
		watch: {
			rLoadSrc(v){
				if(!v) return
				this.$refs.webview.evalJS(`parserLoad("${v.split('@')[1]}")`)
			},
			rVideoItem(v) {
				if(!v) return
				this.$refs.webview.evalJS(`setVideoItem("${v.split('@')[0]}")`)
			},
			rPlayer: {
				handler(v){
					if(!v) return
					this.$refs.webview.evalJS(`onPlayer(${JSON.stringify(v)})`)
				},
			}
		},
		// #endif
		methods: {
			// #ifdef APP-NVUE
			onPageFinish() {
				this.$refs.webview.evalJS(`init()`)
			},
			// #endif
			onMessage(e) {
				const {detail: {data: [log]} = {}} = e 
				const {data, event} = log 
				if(Array.isArray(log)) {
					console.log(...log)
					return
				}
				if(event.onPercentage) {
					this.rOnPercentage = event.onPercentage
				}
				if(event.onFrame >= 0) {
					this.rOnFrame = event.onFrame
				}
				if(event.onFinished) {
					this.rOnFinished = true
				}
				if(event.inited) {
					this.nIsInit = true
				}
				if(event.load) {
					this.rIsLoad = `${event.load}@${+new Date()}`
				}
				if(event.setVideoItem) {
					this.rSetVideoItem = true
				}
			},
			setSvga(cb){
				cb(this.parser, this.player)
			},
			getContext() {
				return new Promise((resolve) => {
					// #ifndef APP-NVUE
					const {pixelRatio} = uni.getSystemInfoSync()
					if(this.use2dCanvas) {
						uni.createSelectorQuery()
							.in(this)
							.select(`#${this.canvasId}`)
							.fields({ node: true, size: true })
							.exec(res => {
								let {node: canvas, width, height} = res[0]
								resolve({canvas, width, height ,pixelRatio})
							})
					} else {
						uni.createSelectorQuery()
							.in(this)
							.select(`#${this.canvasId}`)
							.boundingClientRect()
							.exec(res => {
								if(res) {
									const {width, height} = res[0]
									const ctx = uni.createCanvasContext(this.canvasId, this)
									const canvas = new Canvas(this.canvasId, res[0], ctx, pixelRatio)
									resolve({canvas, width, height ,pixelRatio:1})
								}
							})
					}
					// #endif
					// #ifdef APP-NVUE
					if(this.nIsInit) return resolve(this.nIsInit)
					this.$watch('nIsInit', (v) => {
						if(v) {
							resolve(v)
						}
					})
					// #endif
				})
			},
			async render(cb) {
				await this.$nextTick()
				const confing = await this.getContext()
				// #ifndef APP-VUE || H5 || APP-NVUE
				if(!this.parser) {
					this.parser = new Parser;
				}
				if(!this.player) {
					this.player = new Player;
				}
				this.player.setCanvas(confing, `#${this.canvasId}` ,this)
				this.parser.load2 = this.parser.load
				this.parser.load = async (src) => {
					return this.parser.load2(await toLoadPath(src)) 
				}
				cb(this.parser, this.player)
				// #endif
				// #ifdef APP-VUE || H5 || APP-NVUE
				const _this = this
				this.parser = {
					load: async (src) => {
						const url = await toLoadPath(src)
						_this.rLoadSrc = `svga${+new Date()}@${url}`
						return new Promise(resolve => {
							_this.stopWatch = _this.$watch('rIsLoad', (v, o) => {
								if(v != o) {
									_this.stopWatch()
									resolve(v)
								}
							})
						})
					}
				}
				this.player = new Player(this)
				cb(this.parser, this.player)
				// #endif
			}
		},
		mounted() {
			if(this.src) {
				this.render(async (parser, player) => {
					const videoItem = await parser.load(this.src);
					await player.setVideoItem(videoItem);
					player.startAnimation()
				})
			}
		},
		created() {
			this.use2dCanvas = this.type === '2d' && ENV_TYPE()
		},
		beforeDestroy() {
			if(this.player) {
				this.player.stopAnimation(true)
				this.player.clear()
			}
		}
	}
</script>
<!-- #ifdef APP-VUE  || H5-->
<script module="svga" lang="renderjs">
	// #ifdef APP-VUE || H5
	// #ifdef VUE2
	import { Parser, Player } from '../../static/svgaplayer.web'
	// #endif
	// #ifdef VUE3
	// import { Parser, Player } from 'svgaplayerweb'
	// #endif
	export default{
		data() {
			return {
				canvasid: null,
				rparser: null,
				rplayer: null,
				clearsAfterStop: true,
				videoItem: {},
				map: {}
			}
		},
		unmounted() {
			console.log('unmounted')
		},
		beforeUnmount() {
			console.log('beforeUnmount')
		},
		beforeDestroy() {
			console.log('beforeDestroy')
		},
		destroyed() {
			console.log('destroy')
		},
		methods: {
			// #ifdef APP-PLUS
			getfile(e){
				let url = e
				// if() {
				// 	url = plus.io.convertLocalFileSystemURL( e )
				// }
				return new Promise((resolve, reject)=>{
					plus.io.resolveLocalFileSystemURL(url, entry => {
						var reader = null;
						entry.file( file => {
							reader = new plus.io.FileReader();
							reader.onloadend = ( read )=> {
								resolve(read.target.result)
							};
							reader.readAsDataURL( file );
						}, reject );
					},reject)
				})
			},
			// #endif
			init(newValue) {
				if(newValue) {
					this.canvasid = newValue
					this.$nextTick(() => {
						const div = document.createElement('div')
						const id = `${this.canvasid}div`
						div.id = id
						div.style = 'height: 100%'
						document.querySelector(`#${this.canvasid}`).appendChild(div)
						if(!this.rplayer) {
							this.rplayer = new Player(`#${id}`);
							this.rplayer.onFinished(() => {
								this.emit({onFinished: true})
							})
							this.rplayer.onFrame(number => {
								this.emit({onFrame: number})
							})
							this.rplayer.onPercentage(number => {
								this.emit({onPercentage: number})
							})
							
						}
						if(!this.rparser) {
							this.rparser = new Parser(`#${id}`);
						}
					})
				}
			},
			emit(event) {
				this.$ownerInstance.callMethod('onMessage', {
					detail: {
						data: [
							{
								event
							}
						]
					}
				})
			},
			parserLoad(newValue) {
				if(this.rparser && newValue) {
					const url = /@/.test(newValue) ? newValue.split('@')[1]: newValue
					if(this.map[url]) {
						this.emit({load: this.map[url]})
					} else {
						// #ifdef APP-PLUS
						this.getfile(url).then(res => {
							this.rparser.load(res, (videoItem) => {
								const key = `video${+new Date()}`
								this.map[url] = key
								if(!this.videoItem[key]) {
									this.videoItem[key] = videoItem
								}
								this.emit({load: key})
							})
						}).catch((err) => {
							console.error(err)
						})
						// #endif
						// #ifdef H5
						 this.rparser.load(url, (videoItem) => {
						 	const key = `video${+new Date()}`
						 	this.map[url] = key
						 	if(!this.videoItem[key]) {
						 		this.videoItem[key] = videoItem
						 	}
						 	this.emit({load: key})
						 })
						// #endif
					}
				}
			},
			setVideoItem(newValue) {
				if(newValue) {newValue = newValue.split('@')[0]}
				if(newValue && this.videoItem[newValue] && this.rplayer) {
					this.rplayer.setVideoItem(this.videoItem[newValue])
					this.emit({setVideoItem: true})
				}
			},
			startAnimation(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.startAnimation(newValue.reverse||false)
				}
			},
			stopAnimation(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.stopAnimation()
				}
			},
			setLoops(newValue) {
				if(newValue >= 0 && this.rplayer) {
					this.rplayer.loops = newValue
				}
			},
			clear(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.clear()
				}
			},
			pauseAnimation(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.pauseAnimation()
				}
			},
			startAnimationWithRange(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.startAnimationWithRange(newValue.range, newValue.reverse)
				}
			},
			setContentMode(newValue) {
				if(newValue && this.rplayer) {
					this.rplayer.setContentMode(newValue)
				}
			},
			onPlayer(newValue) {
				if(newValue.rLoops && this.rLoops2 != newValue.rLoops) {
					this.rLoops2 = newValue.rLoops
					this.setLoops(newValue.rLoops)
				}
				if(newValue.rStartAnimation) {
					this.startAnimation(newValue.rStartAnimation)
				}
				if(newValue.rStopAnimation) {
					this.stopAnimation(newValue.rStopAnimation)
				}
				if(newValue.rClear) {
					this.clear(newValue.rClear)
				}
				if(newValue.rPauseAnimation) {
					this.pauseAnimation(newValue.rPauseAnimation)
				}
				if(newValue.rStartAnimationWithRange) {
					this.startAnimationWithRange(newValue.rStartAnimationWithRange)
				}
				if(newValue.rSetContentMode) {
					this.setContentMode(newValue.rSetContentMode)
				}
				if(newValue.rClearsAfterStop != this.clearsAfterStop && this.rplayer) {
					this.clearsAfterStop = newValue.rClearsAfterStop
					this.rplayer.clearsAfterStop = newValue.rClearsAfterStop
				}
				if(newValue.rSetText && this.setText != newValue.rSetText) {
					this.setText = newValue.rSetText
					const [text, key] = newValue.rSetText
					this.rplayer && this.rplayer.setText(text, key)
				}
				if(newValue.rSetImage && this.setImage != newValue.rSetImage) {
					this.setImage = newValue.rSetImage
					const [src, key] = newValue.rSetImage
					this.rplayer && this.rplayer.setImage(src, key)
				}
			}
		}
	}
	// #endif
</script>
<!-- #endif -->
<style lang="stylus">
	.lime-svga,
	.lime-svga__canvas {
		// #ifndef APP-NVUE
		width: 100%;
		height: 100%;
		// #endif
		// #ifdef APP-NVUE
		flex: 1;
		// #endif
	}
</style>
