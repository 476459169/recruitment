<template>
	<view>
		<view class="top_fixed_view">
			<view class="top_view">
				<view class="top_view_items" v-for="(item,index) in topArr" :key="index">

					<view v-if="index===0" class="top_view_item">
						<image class="top_view_item_img" src="../../static/home/sx_o.png" mode=""></image>
						<view class="top_view_item_text_select">
							筛选
						</view>
					</view>

					<view class="top_view_item" @click="topItemClick(item)">
						<view :class="[item.content===topSelect.content?'top_view_item_btn_selected':'top_view_item_btn_normal']"></view>
						<view :class="[item.content===topSelect.content?'top_view_item_text_select':'top_view_item_text_normal']">
							{{item.content}}
						</view>
					</view>


				</view>
			</view>
		</view>

		<view class="content_view">
			<view class="content_item" v-for="(item,index) in dataArr" :key="index" @click="itemClick(item)">
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
	var timer = null;
	export default {
		data() {
			return {
				topArr: [],
				topSelect: Object,
				id: '', //职位id
				page: 1,
				dataArr: []
			};
		},

		onLoad(e) {
			this.id = e.id
			this.getTopList()
			this.getData()
		},
		
		onShow() {
			if(this.page==2){
				this.page =1
				this.getData()
			}
		},

		onPullDownRefresh: function() {
			this.page = 1;
			this.getData()

		},

		onReachBottom: function() { //当划到最底部的时候触发事件
			if (timer != null) { //加载缓冲延迟
				clearTimeout(timer);
			}
			let _this = this
			timer = setTimeout(function() {
				_this.getData();
			}, 600);
		},

		methods: {
			getTopList() {

				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey) {
					this.loginKey = loginkey;
					this.$api.post('zpapp/zpResume!ajaxGetResumeStatusList.action', {
						loginKey: loginkey,
						
					}).then(res => {
						if (res.res.status == 0) {
							this.topArr = res.inf.arr
						} else {

						}
					})

				} else {}

			},

			getData() {
				let _this = this
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey) {
					this.loginKey = loginkey;
					this.$api.post('zpapp/zpResume!ajaxGetDeliveryResumeList.action', {
						loginKey: loginkey,
						firstIndex: this.page,
						id: this.id,
						selResumeStatusId: this.topSelect.id ? this.topSelect.id : ''

					}).then(res => {
						if (res.res.status == 0) {
							if (_this.page === 1) {
								this.dataArr = res.inf.arr
								_this.page++;
							} else {
								if (_this.page <= res.inf.pageCount) {
									_this.dataArr = _this.dataArr.concat(res.inf.arr); //进行数据的累加
									_this.page++; //页数的++
									_this.loading = "加载更多";
								} else {
									uni.showToast({
										title: '没有更多了！'
									});
								}
							}
						} else {

						}
					})

				} else {}

			},

			topItemClick(item) {
				this.topSelect = item;
				this.page = 1
				this.getData()
			},

			itemClick(item) {
				uni.navigateTo({
					url: '../home/cvdetail?id=' + item.id + '&resumeId=' + item.resumeId
				})
			}

		}

	}
</script>

<style lang="scss">
	.top_fixed_view {
		position: fixed;
		top: 0px;
		width: 100%;
		padding: 0px 0px;
		background-color: #e7e9ea;




		.top_view {
			position: relative;
			display: flex;
			// flex-wrap: wrap;

			.top_view_items {
				display: flex;
				align-items: center;
			}

			.top_view_item {
				display: flex;
				align-items: center;
				padding: 10px 5px;
				margin-left: 5px;

				.top_view_item_img {
					width: 10px;
					height: 10px;
				}

				.top_view_item_btn_normal {
					width: 8px;
					height: 8px;
					border: 1px solid #000000;
					background-color: #e7e9ea;
					border-radius: 4px;

				}

				.top_view_item_btn_selected {
					width: 8px;
					height: 8px;
					border: 1px solid #e8654b;
					border-radius: 4px;
					// background-color: #e8654b;

				}

				.top_view_item_text_normal {
					font-size: 14px;
					color: #666666;
					margin-left: 2px;
				}

				.top_view_item_text_select {
					font-size: 14px;
					color: #e8654b;
					margin-left: 2px;
				}
			}

			.top_view_select_color {
				color: #e8654b;
			}
		}
	}

	.content_view {

		height: auto;
		width: 100%;

		.content_item {
			margin-top: 10px;
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
