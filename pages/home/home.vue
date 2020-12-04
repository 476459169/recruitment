<template>
	<view>



		<view class="newtopView">
			<swiper :indicator-dots="true" :autoplay="true" indicator-active-color="#ee7b5e">
				<swiper-item v-for="(item, index) in banner" :key="index" @click="bannarClick(item,index)">
					<image class="swiper-item" :src="baseUrl+item.imgUrl" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>

		<view class="scorlTop" v-bind:class="[isFixedTop?'is_fixed':'']" id="navbar">
			<view class="search">
				<view class="search_view">
					<image class="image_search" src="../../static/home/search.png" mode=""></image>
					<input class="input_v" type="text" v-model="searchValue" value="searchValue" placeholder="输入课程或老师关键字搜索相关课程"
					 confirm-type="search" @confirm="search()" />
				</view>

				<image class="top_fb" src="../../static/home/fzw.png" mode="" @click="gotoOpenPositions()"></image>
			</view>

			<view class="top_click_view">
				<view class="click_item" style="margin-left: 10px;">
					<view class="click_item_text" :class="[selectType==0?'select_textcolor':'']" @click="typeClick(0)">推荐</view>
					<view class="click_item_line" v-if="selectType==0"></view>
				</view>

				<view class="click_item">
					<view class="click_item_text" :class="[selectType==1?'select_textcolor':'']" @click="typeClick(1)">最新</view>
					<view class="click_item_line" v-if="selectType==1"></view>
				</view>

				<view class="click_none"></view>
				<!-- <view class="click_sx_view" @click="screenClick()">
					<view class="click_sx_title">筛选</view>
					<image class="click_sx_img" src="../../static/home/rc_sx.png" mode=""></image>
				</view> -->
			</view>
			<view class="top_line"></view>
		</view>

		<view class="content_view">
			<view class="content_item" v-for="(item,index) in data" :key="index" @click="itemClick(item)">
				<view class="title">{{item.userName}}</view>
				<view class="content_item_person_msg">{{item.userAge +'&nbsp&nbsp' + '工作'+item.workYears+'&nbsp&nbsp'+item.education+'&nbsp&nbsp'+item.salary}}</view>
				<!-- <view class="content_item_jobIntention">{{'求职意向：'+item.jobIntention}}</view> -->
				<view class="content_item_work_msgView" v-for="(childItem,index) in item.experienceArr" :key="index">
					<image class="content_item_work_msgView_img" src="../../static/home/company.png" mode=""></image>
					<view class="content_item_work_msgView_textView">
						<view class="content_item_work_msgView_textView_title">
							{{childItem.companyName +'&nbsp·&nbsp' +childItem.workYear}}
						</view>
						<view class="content_item_work_msgView_textView_job">
							{{childItem.positionName}}
						</view>
					</view>
				</view>
				<view class="certificate">
					<view class="certificate_item" v-for="(item1, index) in item.certificate" :key='index'>
						{{item1}}
					</view>
				</view>

				<view class="content_view_line"></view>
			</view>
		</view>



	</view>
</template>

<script>
	var _this;
	var timer = null;
	export default {
		data() {
			return {
				selectType: 0,
				banner: [],
				baseUrl: "https://uat.crlink.com/crlink/",
				navbarInitTop: 0,
				isFixedTop: false,
				data: [],
				searchValue: '',
				page: 1
			}
		},

		onLoad() {
			_this = this
			this.baseUrl = getApp().globalData.baseUrl
			this.getAdImage()
			this.getData()
		},
		onPullDownRefresh: function() {
			this.page = 1;
			this.getData()

		},

		onReachBottom: function() { //当划到最底部的时候触发事件
			if (timer != null) { //加载缓冲延迟
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				_this.getData();
			}, 600);
		},
		methods: {

			getData() {
				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('zpapp/zpResume!ajaxGetResumeList.action', {
					loginKey: loginkey,
					selKeyWord: this.searchValue,
					firstIndex: this.page
				}).then(res => {
					if (res.res.status == 0) {
						if (_this.page === 1) {
							this.data = res.inf.arr
							_this.page++;
						} else {
							if (_this.page <= res.inf.pageCount) {
								_this.data = _this.data.concat(res.inf.arr); //进行数据的累加
								_this.page++; //页数的++
								_this.loading = "加载更多";
							} else {
								uni.showToast({
									title: '没有更多了！'
								});
							}
						}

					} else {
						uni.showToast({
							title: res.res.errMsg,
						})
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh(); //数据加载完成,刷新结束
				})

			},

			getAdImage() {
				this.$api.post('zpapp/zpResume!ajaxGetAdImage.action').then(res => {
					if (res.res.status == 0) {
						this.banner = res.inf.arr
					}
				})
			},

			typeClick(e) {
				this.selectType = e
			},

			screenClick() {
				uni.navigateTo({
					url: './screening'
				})
			},

			gotoOpenPositions() {
				uni.navigateTo({
					url: './openPositions'
				})
			},

			itemClick(item) {
				uni.navigateTo({
					url: './cvdetail'
				})
			},
			//获取节点距离顶部的距离
			getTopViewHeight() {
				var that = this;
				uni.createSelectorQuery().select('#navbar').boundingClientRect(function(rect) {
					if (rect && rect.top > 0) {
						var navbarInitTop = parseInt(rect.top);
						that.navbarInitTop = navbarInitTop
					}
				}).exec();
			},
		},

		mounted() {
			this.getTopViewHeight();
		},

		/**
		 * 监听页面滑动事件
		 */
		onPageScroll: function(e) {
			var that = this;
			var scrollTop = parseInt(e.scrollTop); //滚动条距离顶部高度
			// console.log("scrollTop =" + scrollTop);
			// that.lastScorlH = scrollTop;
			//判断'滚动条'滚动的距离 和 '元素在初始时'距顶部的距离进行判断
			var isSatisfy = scrollTop >= that.navbarInitTop ? true : false;
			//为了防止不停的setData, 这儿做了一个等式判断。 只有处于吸顶的临界值才会不相等
			if (that.isFixedTop === isSatisfy) {
				return false;
			}
			that.isFixedTop = isSatisfy

		},
	}
</script>

<style lang="scss">
	.navbar {
		width: 100%;
		height: 100px;
	}

	.newtopView {
		width: 100%;
		height: 320rpx;
		background-color: #000000;

		image {
			width: 100%;
			height: 320rpx;
		}

		swiper {
			height: 320upx;

			.swiper-item {
				width: 100%;
				height: 100%;
				background-color: #000000;
			}
		}
	}

	.is_fixed {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
	}


	.scorlTop {
		width: 100%;
		height: 100px;
		background-color: #f3f3f3;

		.search {
			display: flex;
			width: 100%;
			height: 60px;
			align-items: center;

			.search_view {
				flex: 1;
				display: flex;
				margin: 10px 10px 10px 10px;
				height: 40px;
				background-color: #FFFFFF;
				align-items: center;
				border-radius: 20px;

				.image_search {
					width: 20px;
					height: 20px;
					margin-left: 10px;
				}

				.input_v {
					font-size: 14px;
					color: #666666;
					flex: 1;
					margin-left: 10px;
				}

			}


			.top_fb {
				width: 25px;
				height: 30px;
				margin-right: 15px;
			}
		}

	}

	// .topView {
	// 	position: fixed;
	// 	top: 0px;
	// 	width: 100%;
	// 	height: 100px;
	// 	background-color: #f3f3f3;

	// 	.search {
	// 		display: flex;
	// 		width: 100%;
	// 		height: 60px;
	// 		align-items: center;

	// 		.search_view {
	// 			flex: 1;
	// 			display: flex;
	// 			margin: 10px 10px 10px 10px;
	// 			height: 40px;
	// 			background-color: #FFFFFF;
	// 			align-items: center;
	// 			border-radius: 20px;

	// 			.image_search {
	// 				width: 20px;
	// 				height: 20px;
	// 				margin-left: 10px;
	// 			}

	// 			.input_v {
	// 				font-size: 14px;
	// 				color: #666666;
	// 				flex: 1;
	// 				margin-left: 10px;
	// 			}

	// 		}


	// 		.top_fb {
	// 			width: 25px;
	// 			height: 30px;
	// 			margin-right: 15px;
	// 		}
	// 	}
	// }

	.top_click_view {
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		display: flex;
		text-align: center;
		font-size: 14px;
		color: #666666;

		.select_textcolor {
			color: #e8654b;
		}

		.click_item {
			// margin: 10px 0px 10px 10px;
			width: 50px;
			text-align: center;

			// line-height: 45px;
			.click_item_text {
				line-height: 38.5px;
			}

			.click_item_line {
				width: 30px;
				height: 1.5px;
				margin-left: 10px;
				background-color: #e8654b;
			}

		}

		.click_none {
			flex: 1;
		}

		.click_sx_view {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 15px;

			.click_sx_title {}

			.click_sx_img {
				width: 10px;
				height: 12px;
				margin-left: 2px;
			}
		}
	}


	.top_line {
		width: 100%;
		height: 1px;
		background-color: #f3f3f3;
	}

	.content_view {
		// margin-top: 10px;
		height: auto;
		width: 100%;

		.content_item {
			padding: 15px;

			.content_item_title {
				font-size: 19px;
				color: #000000;
				line-height: 35px;
			}

			.content_item_person_msg {
				font-size: 12px;
				color: #4c4c4c;
				line-height: 25px;
			}

			.content_item_jobIntention {
				font-size: 12px;
				color: #cccccc;
				line-height: 20px;
			}

			.content_item_work_msgView {
				display: flex;
				// align-items: center;
				margin: 0px 0px;

				.content_item_work_msgView_img {
					// margin: 10px;

					margin-top: 5px;
					margin-right: 15px;
					width: 20px;
					height: 20px;
					// background-color: #000000;
				}

				.content_item_work_msgView_textView {
					flex: 1;
					height: 40px;
					margin-right: 10px;
					font-size: 12px;

					.content_item_work_msgView_textView_title {
						line-height: 20px;
						color: #4c4c4c;
						font-size: 12px;
					}

					.content_item_work_msgView_textView_job {
						line-height: 20px;
						color: #cccccc;
						font-size: 12px;
					}
				}
			}
		}
	}

	.certificate {
		display: flex;
		width: 100%;

		.certificate_item {
			background-color: #fbc9bc;
			color: #e8654b;
			font-size: 14px;
			border-radius: 5px;
			padding: 2px 10px;
			margin-left: 10px;

		}
	}


	.content_view_line {
		margin-top: 20px;
		width: 100%;
		height: 1px;
		background-color: #f3f3f3;
	}
</style>
