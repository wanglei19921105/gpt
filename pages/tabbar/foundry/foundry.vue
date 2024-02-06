<template>
	<view class="page" :class="getThemeClass">
		<!-- 铸造 -->
		<!-- <unavbar :title="i18n.casting1" :isback="false"></unavbar> -->
		<view class="title u-m-t-0">
			<!-- 上传文件 -->
			{{ i18n.casting2 }}
		</view>
		<view class="upload_box card-bg">
			<view class="upload_files card-bg">
				<view class="hint">
					JPG,JPEG,PNG,GIF{{ i18n.casting3 }}100MB
				</view>
			</view>
			<view class="upload_slot select_type default-btn-bg" v-if="!audioSrc && !videoSrc" @click="selectType">{{ i18n.casting5 }}</view>
		</view>
		<view class="" v-if="fileArr.length > 0">
			<u-upload :action="action" :custom-btn="true" :file-list="fileArr" :auto-upload="false" @on-remove="remove">
				<view slot="addBtn" class="upload_slot" v-show="false">
					<!-- 选择文件 -->
					<button type="default" class="select_file default-btn-bg" id="upload">{{ i18n.casting5 }}</button>
				</view>
			</u-upload>
		</view>

		<!-- MP3 -->
		<view class="audio_box" v-if="audioSrc">
			<audio :src="audioSrc" :name="audioFile.name" :poster="coverImg" loop controls></audio>
			<u-icon name="close" class="audio_icon" @click="DelAudio"></u-icon>
		</view>

		<!-- MP4 -->
		<view class="video_box" v-show="showVideo" style="position: relative;">
			<video :src="videoSrc" style="video"></video>
			<u-icon name="close" class="video_icon" @click="DelImg"></u-icon>
			<!-- <image src="" mode=""></image> -->
		</view>

		<!-- 上传封面 -->
		<!-- <view class="title" v-show="typeShow">{{ i18n.casting4 }}</view>
		<view class="upload_box" v-show="typeShow">
			<view class="upload_files card-bg">
				PNG,GIF,MP3,MP4,最大100MB
				<view class="hint">JPG,PNG,GIF,{{ i18n.casting3 }}100MB</view>
			</view>
			<view class="upload_slot select_type default-btn-bg" @click="chooseimg">{{ i18n.casting5 }}</view>
		</view> -->
		<view class="title" v-if="coverImg">藏品封面</view>
		<image :src="coverImg" class="img-cover u-m-t-30" mode="aspectFill" v-if="coverImg"></image>
		

		<!-- 版税 -->
		<view class="royalty">
			<view class="no_margin">
				<view class="size-28 u-p-b-10 text-bold ">{{ i18n.casting6 }}</view>
				<view class="size-20 flex align-center">
					<view class="">作者最高可收取版税{{copyright_Max}}%</view>
				</view>
			</view>
			<view class="step">
				<u-number-box v-model="copyright_tax" :positive-integer="false" input-height="48"></u-number-box>
				<text>%</text>
			</view>
		</view>
		<!-- 副本 -->
		<view class="title">{{ i18n.casting7 }}<text class="size-20">(*{{hintTitle}})</text></view>
		<!-- 输入商品副本数量 -->
		<input class="u_input card-bg" v-model="cast_num" type="number" :placeholder="i18n.casting8" placeholder-style="color:#BBBBBB;font-size:26rpx" />
		<!-- NFT名称 -->
		<view class="title">{{ i18n.casting9 }}</view>
		<!-- 输入一件商品的名称" -->
		<input class="u_input card-bg" v-model="title" type="text" maxlength="20" :placeholder="i18n.casting10" placeholder-style="color:#BBBBBB;font-size:26rpx" />
		<!-- NFT描述 -->
		<view class="title">{{ i18n.casting11 }}</view>
		<!-- 输入一件商品的描述 -->
		<view class="input_box card-bg">
			<editor
				id="editor"
				class="ql-container"
				:show-img-size="true"
				:show-img-resize="true"
				@ready="onEditorReady"
				@statuschange="statusChange"
				@input="blur"
				v-model="desc"
				placeholder="请输入内容"
			></editor>
			<view class="u-p-t-20 flex align-center">
				<uni-icons class="u-p-r-16" type="image-filled" size="30" @click="selectImages"></uni-icons>
				<!-- <uni-icons class="u-p-r-16" custom-prefix="iconfont" type="icon-zuoduiqi" size="24" @click="setLeft"></uni-icons>
				<uni-icons class="u-p-r-16" custom-prefix="iconfont" type="icon-juzhongduiqi" size="24" @click="setCenter()"></uni-icons>
				<uni-icons custom-prefix="iconfont" type="icon-youduiqi" size="24" @click="setRight()"></uni-icons> -->
			</view>
			<!-- <textarea class="u_input card-bg" value="" v-model="desc" :placeholder="i18n.casting12" placeholder-style="color:#BBBBBB;font-size:26rpx" :maxlength="-1" :auto-height="true" /> -->
			<!-- <view class="text_num">{{ desc.length }}/100</view> -->
		</view>
		<!-- 艺术品分类 -->
		<view class="title">{{ i18n.casting13 }}</view>
		<u-input class="sort_select card-bg" height="84" v-model="sortValue" type="select" @click="show = true" :customStyle="{color: getTextColor}" />
		<!-- <u-action-sheet :list="actionSheetList" v-model="show" @click="actionSheetCallback"></u-action-sheet> -->
		<u-select 
			:list="actionSheetList" 
			v-model="show" 
			value-name="id" 
			label-name="text" 
			:confirm-color="getMainColor" 
			:default-value="[actionSheetListIndex]"
			@confirm="actionSheetCallback"
		></u-select>
		<u-action-sheet class="my-action-sheet" :list="selectList" v-model="show1" @click="actionCli" :cancel-btn="true"></u-action-sheet>
		<botBtnp style="margin-top: 105rpx" class="night" :btnText="i18n.casting14" @click="casting"></botBtnp>
		<view style="height: 86rpx;"></view>
		<u-toast ref="uToast" />
		<view class="real-name-prompt" v-if="showGoArtist && token">
			<text>您尚未通过艺术家认证（认证后方可铸造）</text>
			<u-button 
				size="mini" 
				type="info" 
				:custom-style="{margin: '0rpx'}"
				@click="$u.route('/pages/my/creator/creator')"
			>
				<text>去认证</text>
				<u-icon name="arrow-right"></u-icon>
			</u-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			header: {
				//携带头信息
				token: uni.getStorageSync('token'),
				lang: uni.getStorageSync('lang')
			},
			action: uni.$myAppConfig.bendiUploadFilesUrl,
			formData: {
				//额外携带的参数
				type: 1,
				cover: {},
				files: {}
			},
			fileList: [], //上传图片文件临时存储
			type: 1, //上传文件类型1图片2音频3视频
			cover: '', //封面
			cast_num: null, //副本数量
			title: '', //NFT名称
			desc: '', //	NFT介绍
			copyright_tax: 1, //版率(%)
			class_id: '', //类型id
			show: false,
			actionSheetList: [], //艺术品分类数据
			sortValue: '', //艺术品分类选择
			selectList: [
				{
					text: 'JPG、JPEG、PNG'
				},
				{
					text: 'GIF'
				},
				// {
				// 	text: 'MP3'
				// },
				// {
				// 	text: 'MP4'
				// }
			],
			show1: false, //选择文件类型弹框 打开/隐藏
			documentType: null, //上传文件格式0:JPG、PNG,1:GIF,2:MP3,3:MP4
			typeShow: true, // 上传的文件格式是否需要上传封面
			listArr: '', //files加密路径
			showVideo: false, //视频预览
			videoSrc: '', //视频预览路径
			videoData: {}, //上传视频成功返回对象
			audioSrc: '', //音频预览路径
			audioFile: {}, //音频file
			audioEncrypt: '', //音频加密路径
			coverImg: '', //封面图临时路径

			fileArr: [],
			reload: false,
			coverFile: {},
			
			actionSheetListIndex: 0,
			
			showGoArtist: false,
			token: uni.getStorageSync("token"),
			
			copyright_Max:'',
			hintTitle:''
		};
	},
	onShow() {
		// this.setTabBar();
		this.castIndex();
		this.checkArtist()
		this.$u.api.open_status().then(res=>{
			this.copyright_Max = res.data.cast.copyright_tax
			this.hintTitle = res.data.cast.hint
		})
	},
	onTabItemTap() {
		//点击tab，清空上次铸造缓存的数据
		this.clear();
	},
	methods: {
		statusChange(e){
			console.log(e);
		},
		blur(){
			this.editorCtx.getContents({
				success: res => {
					// console.log(res);
					this.desc = res.html
				},
				fail:function(err){
					console.log(err);
				}
			})
		},
		onEditorReady() {
				uni.createSelectorQuery()
			.in(this)
			.select('.ql-container')
			.fields(
				{
					size: true,
					context: true
				},
				res => {
					this.editorCtx = res.context;
					this.editorCtx.setContents({
						html: this.html
					});
				}
			)
			.exec();
		},
		// 对齐方式
		setLeft() {
			this.textFormat.align = 'left';
			this.editorCtx.format('align', this.textFormat.align == 'left' ? 'left' : false);
		},
		setCenter() {
			this.textFormat.align = 'center';
			this.editorCtx.format('align', this.textFormat.align == 'center' ? 'center' : false);
		},
		setRight() {
			this.textFormat.align = 'right';
			this.editorCtx.format('align', this.textFormat.align == 'right' ? 'right' : false);
		},
		// 文本框插入图片
		selectImages() {
			let image;
			let that=this;
			uni.chooseImage({
				count: 3,
				sourceType: ['album'], //从相册选择
				success: chooseImageRes=> {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: 'http://nft.kenglu.com/api/upload_file',
						filePath: tempFilePaths[0],
						name: 'pic',
						header: this.header,
						formData: {
							type: 1,
							cover: chooseImageRes.tempFiles[0]
						},
						success: uploadFileRes => {
							let data = JSON.parse(uploadFileRes.data);
							console.log(data);
							// 上传完成后插入到内容中
							that.editorCtx.insertImage({
								src: data.data.real_path, // 此处实际需要先上传到服务器，获得真实地址后再插入到编辑器中，否则需要发布到后台时自行过滤、替换
								alt: '图片',
								success: function(e) {
									console.log(e);
								}
							});
						}
					});
					
				}
			});
		},
		checkArtist(){
			this.$u.api.author_index().then(res => {
				if(res.data.author_auth != 2){
					this.showGoArtist = true
					// this.$refs.uToast.show({
					// 	title: '暂未通过艺术家认证，认证后方可铸造！',
					// 	type: 'error'
					// });
				} else {
					this.showGoArtist = false
				}
				// return res.data.author_auth == 2
			})
		},
		chooseimg() {
			uni.chooseImage({
				count: 1,
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.uploadFile({
						url: this.action,
						filePath: tempFilePaths[0],
						name: 'files',
						header: this.header,
						formData: {
							type: 1,
							cover: chooseImageRes.tempFiles[0]
						},
						success: uploadFileRes => {
							let data = JSON.parse(uploadFileRes.data);
							console.log(data);
							if (data.code == 200) {
								if (this.documentType == 0) {
									//上传文件是IMG/PNG，隐藏上传封面
									// this.typeShow = false;
								}
								this.cover = data.data.cover;
								this.coverImg = tempFilePaths[0];
								this.coverFile = chooseImageRes.tempFiles[0];
							} else {
								this.clear();
								this.$refs.uToast.show({
									title: data.message,
									type: 'error'
								});
								return false;
							}
						}
					});
				}
			});
		},
		change(res) {
			//上传图片成功钩子
			let that = this;
			let data = JSON.parse(res.data);
			// console.log(data);
			if (data.code == 200) {
				// console.log(that.documentType);
				if (that.documentType == 0) {
					//上传文件是IMG/PNG，隐藏上传封面
					// that.typeShow = false;
				}
				that.fileList.push(data.data.file);
				// 上传第一张图片为封面
				if (that.fileList.length <= 1) {
					that.cover = data.data.cover;
				}
			} else {
				this.clear();
				this.$refs.uToast.show({
					title: data.message,
					type: 'error'
				});
				return false;
			}
			// console.log(this.typeShow);
		},
		remove(index) {
			//移除图片
			this.fileList.splice(index, 1);
			this.fileArr.splice(index, 1);

			// 上传的图片列表为空时，显示上传封面功能
			if (this.fileList.length == 0) {
				this.typeShow = true;
			}
		},
		complete(lists) {
			//选择图片后钩子
			console.log(lists);
			this.formData.cover = lists[0].file;
			this.formData.files = lists[0].file;

			// 上传第一张图片为封面
			if (this.fileList.length <= 1) {
				this.coverImg = lists[0].url;
			}
		},

		// JPG、PNG 或 GIF
		chooseImage() {
			// let that = this
			// document.getElementsByClassName('select_file')[0].click()
			uni.chooseImage({
				count: 1,
				success: chooseImageRes => {
					const tempFilePaths = chooseImageRes.tempFilePaths;
					uni.showLoading({
						title: '上传中...'
					})
					uni.uploadFile({
						url: this.action,
						filePath: tempFilePaths[0],
						name: 'files',
						header: this.header,
						formData: {
							type: 1,
							cover: chooseImageRes.tempFiles[0]
						},
						success: uploadFileRes => {
							let data = JSON.parse(uploadFileRes.data);
							console.log(data.code);
							// uni.showToast({
							// 	title:data.code
							// })
							// uni.showToast({
							// 	title:"***"+data.code+this.documentType,
							// 	icon:"none"
							// })
							uni.hideLoading()
							if (data.code == 200) {
								if (this.documentType == 0||!this.documentType) {
									//上传文件是IMG/PNG，隐藏上传封面
									// this.typeShow = false;
								}
								this.fileList.push(data.data.file);
								this.fileArr.push({ url: tempFilePaths[0] });
								// 上传第一张图片为封面
								if (this.fileList.length <= 1) {
									this.cover = data.data.cover;
									this.coverImg = tempFilePaths[0];
									this.coverFile = chooseImageRes.tempFiles[0];
								}
							} else {
								this.clear();
								this.$refs.uToast.show({
									title: data.message,
									type: 'error'
								});
								return false;
							}
						}
					});
				}
			});
		},

		// MP3
		chooseAudio() {
			return
			let that = this;
			uni.chooseFile({
				count: 1,
				extension: ['mp3'],
				success: function(res) {
					that.audioFile = res.tempFiles[0];
					that.audioSrc = res.tempFilePaths[0];
				},
				fail(err) {
					console.log(err);
				}
			});
		},

		// MP4
		chooseVideo() {
			return
			let that = this;
			uni.chooseFile({
				count: 1,
				success: function(res) {
					// console.log('选择视频成功', res);
					that.showVideo = true;
					that.videoData = res.tempFiles[0];
					that.videoSrc = res.tempFilePaths[0];
				},
				fail(err) {
					console.log(err);
				}
			});
			// uni.chooseVideo({
			// 	count: 1,
			// 	success: function(res) {
			// 		console.log("选择视频成功", res)
			// 		that.showVideo = true
			// 		that.videoSrc = res.tempFilePath;
			// 		that.videoData = res.tempFile
			// 	}
			// });
		},
		//删除已上传视频
		DelImg() {
			(this.videoSrc = ''), (this.showVideo = false);
			// this.addVideo = true
		},

		//删除已上传音频
		DelAudio() {
			this.audioSrc = '';
		},

		// 铸造商品按钮
		casting() {
			var that = this;
			let count = 0;
			if (that.type == 1) {
				//上传类型如果不是视频
				if (this.fileList.length >= 1) {
					for (var i = 0; i < that.fileList.length; i++) {
						if (!count) {
							//只有一张图
							that.listArr = that.fileList[i];
						}
						if (count != 0) {
							//多张图
							that.listArr += ',' + that.fileList[i];
						}
						count++;
					}
				}
			}

			if (that.type == 2) {
				//上传类型是音频
				uni.uploadFile({
					url: this.action,
					filePath: that.audioSrc,
					header: that.header,
					name: 'files',
					formData: {
						type: 2,
						cover: that.coverFile
					},
					success: uploadFileRes => {
						// console.log(uploadFileRes);
						let a = JSON.parse(uploadFileRes.data);
						if (a.code == 200) {
							let b = JSON.stringify(a.data);
							let c = JSON.parse(b);
							that.audioEncrypt = c.file;
							that.uploadAudio();
						} else {
							uni.showToast({
								title: a.message,
								icon: 'none'
							});
						}
					}
				});
				return false;
			}

			if (that.type == 3) {
				//上传类型是视频
				uni.uploadFile({
					url: this.action,
					filePath: that.videoSrc,
					header: that.header,
					name: 'files',
					formData: {
						type: 3,
						cover: that.coverFile
					},
					success: uploadFileRes => {
						let a = JSON.parse(uploadFileRes.data);
						if (a.code == 200) {
							let b = JSON.stringify(a.data);
							let c = JSON.parse(b);
							that.listArr = c.file;
							that.uploadVideo();
						} else {
							uni.showToast({
								title: a.message,
								icon: 'none'
							});
						}
					}
				});
				return false;
			}

			if (!this.listArr) {
				this.$refs.uToast.show({
					title: '请上传文件',
					type: 'warning'
				});
				return false;
	}

			if (!that.verify()) {
				return false;
			}
			// let desc = this.desc.replace(/\n/g,"<br/>");
			// desc = desc.replace(/\r\n/g,"<br/>");
			// console.log(desc)
			that.$u.api
				.cast_add1({
					type: that.type,
					files: that.listArr,
					cover: that.cover,
					cast_num: that.cast_num,
					title: that.title,
					desc: this.desc,
					copyright_tax: that.copyright_tax,
					class_id: that.class_id
				})
				.then(res => {
					if (res.code == 200) {
						this.clear()
						uni.navigateTo({
							url: '../../casting/casting-pay/casting-pay?id=' + res.data.cast.id
						});
					}
				})
				.catch(err => {});
		},

		uploadAudio() {
			//上传音频
			let that = this;

			if (!that.verify()) {
				return false;
			}
			let desc = this.desc.replace(/\n/g,"<br/>");
			desc = desc.replace(/\r\n/g,"<br/>");
			console.log(desc)
			that.$u.api
				.cast_add1({
					type: that.type,
					files: that.audioEncrypt,
					cover: that.cover,
					cast_num: that.cast_num,
					title: that.title,
					desc: desc,
					copyright_tax: that.copyright_tax,
					class_id: that.class_id
				})
				.then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '../../casting/casting-pay/casting-pay?id=' + res.data.cast.id
						});
					}
				})
				.catch(err => {});
		},

		uploadVideo() {
			//上传视频
			let that = this;

			if (!that.verify()) {
				return false;
			}
			let desc = this.desc.replace(/\n/g,"<br/>");
			desc = desc.replace(/\r\n/g,"<br/>");
			console.log(desc)
			that.$u.api
				.cast_add1({
					type: that.type,
					files: that.listArr,
					cover: that.cover,
					cast_num: that.cast_num,
					title: that.title,
					desc: desc,
					copyright_tax: that.copyright_tax,
					class_id: that.class_id
				})
				.then(res => {
					if (res.code == 200) {
						uni.navigateTo({
							url: '../../casting/casting-pay/casting-pay?id=' + res.data.cast.id
						});
					}
				})
				.catch(err => {});
		},

		// 验证
		verify() {
			if (!this.copyright_tax) {
				this.$refs.uToast.show({
					title: '请设置版税',
					type: 'warning'
				});
				return false;
			}

			if (!this.cast_num) {
				this.$refs.uToast.show({
					title: '请设置铸造数量',
					type: 'warning'
				});
				return false;
			}

			if (!this.title) {
				this.$refs.uToast.show({
					title: '请设置商品名称',
					type: 'warning'
				});
				return false;
			}

			if (!this.desc) {
				this.$refs.uToast.show({
					title: '请输入商品介绍',
					type: 'warning'
				});
				return false;
			}

			if (!this.sortValue) {
				this.$refs.uToast.show({
					title: '请选择分类',
					type: 'warning'
				});
				return false;
			}

			return true;
		},

		//获取艺术品分类
		castIndex() {
			this.actionSheetList = [];
			this.$u.api
				.cast_index()
				.then(res => {
					res.data.goods_class.forEach((item, index) => {
						this.actionSheetList.push({
							id: item.id,
							text: item.name,
							extra: index
						});
					});
					this.class_id = this.actionSheetList[0].id;
					this.sortValue = this.actionSheetList[0].text;
					this.actionSheetListIndex = 0
				})
				.catch(err => {});
		},

		// 艺术品分类，点击actionSheet回调
		actionSheetCallback(index) {
			// console.log(index);
			this.actionSheetListIndex = index[0].extra;
			this.class_id = index[0].value;
			this.sortValue = index[0].label;
			// for (var i = 0; i < this.actionSheetList.length; i++) {
			// 	this.class_id = this.actionSheetList[index].id;
			// 	this.sortValue = this.actionSheetList[index].text;
			// }
			// this.class_id = String(++index);
			// this.sortValue = this.actionSheetList[--index].text;
		},

		selectType() {
			//打开/关闭 文件类型选择弹框
			if(this.fileList.length > 0){
				uni.showToast({
					icon: 'none',
					title: '暂仅支持单个文件'
				})
				return
			}
			if (this.show1) {
				this.show1 = false;
			} else {
				this.show1 = true;
			}
		},
		actionCli(index) {
			//选择上传文件类型
			let that = this;

			// 上次上传格式为GIF，且上传数量大于等于1，且本次上传格式不为GIF
			if (that.documentType == 1) {
				if (index != 1 && that.fileList.length >= 1) {
					this.$refs.uToast.show({
						title: '不能同时选择两种格式文件',
						type: 'error'
					});
					return false;
				}
			}
			// 上次上传格式为JPG、PNG，且上传数量大于等于1，且本次上传格式不为JPG、PNG
			if (that.documentType == 0 && that.fileList.length >= 1) {
				if (index != 0) {
					this.$refs.uToast.show({
						title: '不能同时选择两种格式文件',
						type: 'error'
					});
					return false;
				}
			}
			// 上次上传格式为GIF，且上传数量大于等于1
			if (that.documentType == 1 && that.fileList.length >= 1) {
				this.$refs.uToast.show({
					title: 'GIF文件最多只能上传一张',
					type: 'error'
				});
				return false;
			}

			that.documentType = index;

			// 上传文件选择JPG、PNG、GIF
			if (index == 0 || index == 1) {
				that.type = 1;
				that.chooseImage();
			}

			// 上传文件选择MP3
			if (index == 2) {
				that.type = 2;
				that.chooseAudio();
			}

			// 上传文件选择MP4
			if (index == 3) {
				that.type = 3;
				that.chooseVideo();
			}
		},
		clear() {
			//初始化
			// this.$nextTick(function() {
			// 	this.$refs.uUpload1.clear()
			// 	this.$refs.uUpload2.clear()
			// })
			(this.type = 1), //上传文件类型1图片2音频3视频
				(this.cover = ''), //封面
				(this.cast_num = null), //副本数量
				(this.title = ''), //NFT名称
				(this.desc = ''), //	NFT介绍
				(this.editorCtx = ''),
				(this.copyright_tax = 1), //版率(%)
				(this.class_id = ''), //类型id
				(this.sortValue = ''), //艺术品分类选择
				(this.documentType = null), //上传文件格式0:JPG、PNG,1:GIF,2:MP3,3:MP4
				(this.listArr = ''), //files加密路径
				(this.showVideo = false), //视频预览
				(this.videoSrc = ''), //视频预览路径
				(this.videoData = {}), //上传视频成功返回对象
				(this.audioSrc = ''), //音频预览路径
				(this.audioFile = {}), //音频file
				(this.audioEncrypt = ''), //音频加密路径
				(this.coverImg = ''); //封面图临时路径
			this.fileList = [];
			this.fileArr = [];
			this.typeShow = true;
			this.actionSheetListIndex = 0
		}
	}
};
</script>

<style lang="scss" scoped>
	@import "@/static/iconfont.css";
// .box {
// 	background-color: #f9f9f9;
// 	// min-height: 100vh;
// 	height: 100%;
// }
.ql-container{
	// padding: 0 30rpx;
}
.img-cover {
	width: 200rpx;
	height: 200rpx;
	margin-left: 30rpx;
	border-radius: 10rpx;
}
.title {
	margin: 44rpx 0 0 30rpx;
	// color: #232323;
	font-size: 28rpx;
	font-weight: bold;
}

.img_box {
	border: 1px solid;
	display: flex;
	flex-wrap: wrap;

	.img_item {
		height: 200rpx;
		width: 200rpx;
		overflow: hidden;
		position: relative;
	}

	image {
		width: 100%;
	}

	.cu-tag {
		width: 40rpx;
		height: 40rpx;
		position: absolute;
		top: 0;
		right: 20rpx;
	}
}

.video_box {
	width: 100%;
	position: relative;

	.video_item {
		margin: 0 30rpx;
	}

	.video_icon {
		position: absolute;
		top: 14rpx;
		right: 14rpx;
		background-color: #ffffff;
		z-index: 9999;
	}

	video {
		width: 100%;
	}
}

.upload_box {
	position: relative;
	margin: 30rpx;
}

.upload_files {
	margin: 30rpx 0;
	background-color: #fff;
	min-height: 212rpx;
	border-radius: 10rpx;
	border: 1px dashed #e5e1e1;

	.hint {
		font-size: 26rpx;
		color: #999999;
		text-align: center;
		margin-top: 54rpx;
	}
}

.select_type {
	width: 230rpx;
	height: 58rpx;
	// background-color: #e6bb81;
	border-radius: 6rpx;
	// color: #333333;
	font-size: 24rpx;
	line-height: 58rpx;
	border: none;
	text-align: center;
	margin: 0 auto;
}

.upload_slot {
	height: 58rpx;
	margin-top: 40rpx;
	position: absolute;
	top: 80rpx;
	left: 0;
	right: 0;
}

.select_file {
	width: 230rpx;
	height: 58rpx;
	// background-color: #e6bb81;
	border-radius: 6rpx;
	// color: #333333;
	font-size: 24rpx;
	line-height: 58rpx;
	border: none;
}

uni-button:after {
	border: none;
}

/deep/.u-list-item {
	width: 160rpx !important;
	height: 160rpx !important;
	margin-right: 12rpx;
}

/deep/.u-delete-icon {
	background-color: #fff !important;
	width: 24rpx;
	height: 24rpx;
}

/deep/.u-icon__icon {
	// color: transparent!important;
	color: rgba(0, 0, 0, 0.5) !important;
	font-size: 20rpx;
}

.royalty {
	display: flex;
	margin: 70rpx 30rpx;
	justify-content: space-between;
	align-items: center;

	.step {
		text {
			margin-left: 26rpx;
		}
	}
}

.no_margin {
	margin: 0;
}

.u_input {
	margin: 30rpx;
	border: 1px solid #e5e1e1;
	height: 84rpx;
	text-indent: 30rpx;
	border-radius: 8rpx;
}

.input_box {
	min-height: 200rpx;
	border: 1px solid #e5e1e1;
	margin: 30rpx;
	padding: 30rpx 30rpx 10rpx;
	border-radius: 8rpx;

	.u_input {
		margin: 0;
		min-height: 210rpx;
		width: 100%;
		border: none;
	}

	.text_num {
		margin: 0 20rpx 20rpx 0;
		text-align: right;
		color: #cccccc;
		font-size: 24rpx;
	}
}

.sort_select {
	margin: 30rpx;
	border: 1px solid #e5e1e1;
	padding: 0 30rpx !important;
}

.audio_box {
	text-align: center;
	position: relative;

	.audio_icon {
		position: absolute;
		right: 74rpx;
		background-color: #ffffff;
		border: 1px solid #c1c1c1;
		z-index: 999;
	}
}
</style>
