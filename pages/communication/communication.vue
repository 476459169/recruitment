<template>
	<view>
		<view class="list">

			<view class="" v-for="(item, index) in dataList" :key="index">
				<view class="cell">
					<image class="cell_img" :src="[item.isUp===1?'../../static/home/star.png':'../../static/home/star_g.png']" mode=""></image>
					<view class="cell_content" v-if="item.isUp === 1">
						<view class="cell_content_name">
							{{item.name}} <text style="font-size: 12px; color: #333333;">{{zwf+zwf+item.location}}</text>
						</view>
						<view class="cell_detail">
							{{item.salaryRequirement+zwf+"|"+zwf+item.experienceRequirement+zwf+"|"+zwf+item.educationRequirement}}
						</view>
						<view class="cell_bottomItems">
							<view class="cell_bottomItems_item " :class="[index1===5&&item.isTop===1?'cell_bottomItems_item_selected':'cell_bottomItems_item_nomarl']"
							 v-for="(item1, index1) in btnArr" :key="index" @click="btnClick(item,index1)">
								{{item1}}
							</view>
						</view>
					</view>

					<view class="cell_content" v-if="item.isUp === 0">
						<view class="cell_name_views">
							<view class="cell_name_views_title">
								{{item.name}} <text style="font-size: 12px; color: #666666;">{{zwf+zwf+item.location}}</text>
							</view>
							<view class="cell_name_views_type">
								未上架
							</view>
						</view>
						<view class="cell_detail" style="color: #666666;">
							{{item.salaryRequirement+zwf+"|"+zwf+item.experienceRequirement+zwf+"|"+zwf+item.educationRequirement}}
						</view>
						<view class="cell_bottomItems">
							<view class="cell_bottomItems_item cell_bottomItems_item_nomarl" v-for="(item1, index1) in xjBtnArr" :key="index1"
							 @click="btnClick(item,index1)">
								{{item1}}
							</view>
						</view>
					</view>
				</view>

				<view class="line"></view>
			</view>


		</view>

		<view class="pushBtn" @click="releaseposition()">
			发布\n职位
		</view>
	</view>
</template>

<script>
	var _this;
	export default {
		data() {
			return {
				zwf: "\u0020",
				btnArr: ['简历', '下架', '删除', '复制', '修改', '置顶', '刷新'],
				xjBtnArr: ['简历', '上架', '删除', '复制', '修改', '置顶', '刷新'],
				dataList: [],
				userInfo:Object
			};
		},

		onLoad(e) {
			_this = this
		},

		onShow() {
			this.getData()
			this.getUserInfo()
		},

		methods: {
			
			getUserInfo() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/enterprise!ajaxGetEnterpriseBaseInfo.action', {
					loginKey: loginkey
			
				}).then(res => {
					if (res.res.status == 0) {
						this.userInfo = res.inf
					} else {
						this.logout()
					}
				})
			},
			
			getData() {
				var loginkey = uni.getStorageSync('loginKey')
				this.$api.post('zpapp/position!ajaxGetPositionList.action', {
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						this.dataList = res.inf.arr
					} else {
						uni.showToast({
							title: res.res.errMsg,
						})

					}
				})
			},

			btnClick(item, index) {
				console.log("item.id  = " + item.id);
				if (index === 0) {
					//简历
					uni.navigateTo({
						url: './cvSubmit?id=' + item.id
					})
				} else if (index === 1) {
					var up = 1
					if (item.isUp === 1) {
						up = 0
					} else {
						up = 1
					}
					var loginkey = uni.getStorageSync('loginKey')
					this.$api.post('zpapp/position!ajaxPositionUp.action', {
						loginKey: loginkey,
						positionId: item.id,
						isUp: up
					}).then(res => {
						if (res.res.status == 0) {
							item.isUp = up
						} else {
							uni.showToast({
								title: res.res.errMsg,
							})

						}
					})
				} else if (index === 2) {
					//删除
					uni.showModal({
						title: '确定删除？',
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								var loginkey = uni.getStorageSync('loginKey')
								_this.$api.post('zpapp/position!ajaxDeletePosition.action', {
									loginKey: loginkey,
									positionId: item.id,
								}).then(res => {
									if (res.res.status == 0) {
										_this.dataList.splice(_this.dataList.indexOf(item), 1)
									} else {
										uni.showToast({
											title: res.res.errMsg,
										})

									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})



				} else if (index === 3) {
					//复制
					var loginkey = uni.getStorageSync('loginKey')
					this.$api.post('zpapp/position!ajaxCopyPosition.action', {
						loginKey: loginkey,
						id: item.id,
					}).then(res => {
						if (res.res.status == 0) {
							this.getData()
						} else {
							uni.showToast({
								title: res.res.errMsg,
							})

						}
					})
				} else if (index === 4) {
					//修改
					uni.navigateTo({
						url: '../home/openPositions?id=' + item.id
					})
				} else if (index === 5) {

				} else if (index === 6) {
					//刷新
					var loginkey = uni.getStorageSync('loginKey')
					this.$api.post('zpapp/position!ajaxRefreshPosition.action', {
						loginKey: loginkey,
						id: item.id,
					}).then(res => {
						if (res.res.status == 0) {
							uni.showToast({
								title: '刷新成功'
							})
						} else {
							uni.showToast({
								title: res.res.errMsg,
							})

						}
					})
				}

			},
			releaseposition() {
				if(this.userInfo.isReview === 1){
					var loginKey = uni.getStorageSync('loginKey')
					if (loginKey.length > 0) {
					
						uni.navigateTo({
							url: '../home/openPositions'
						})
					}
				}else{
					uni.showToast({
						title:'企业认证后\r\n才可以发布职位！'
					})
				}
				
			}


		}
	}
</script>

<style lang="scss">
	.list {

		.cell {
			width: 100%;
			height: auto;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			margin: 10px;

			.cell_img {
				width: 20px;
				height: 20px;
			}

			.cell_content {
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 5px;
				flex: 1;
				margin-left: 5px;

				.cell_name_views {
					display: flex;
					height: 20px;

					.cell_name_views_title {
						height: 20px;
						color: #666666;
						font-size: 18px;
						line-height: 20px;
						flex: 1;
					}

					.cell_name_views_location {
						font-size: 12px;
						color: #666666;
						flex: 1;
						margin-left: 5px;
					}

					.cell_name_views_type {
						height: 20px;
						color: #666666;
						font-size: 12px;
						line-height: 20px;
						margin-right: 15px;
					}
				}

				.cell_content_name {
					height: 20px;
					color: #e8654b;
					font-size: 18px;
					line-height: 20px;

				}

				.cell_detail {
					height: 20px;
					color: #333333;
					font-size: 12px;
					line-height: 20px;
					margin-top: 5px;
				}

				.cell_bottomItems {
					display: flex;
					align-items: center;
					margin-top: 5px;

					.cell_bottomItems_item {
						margin: 0px 5px 0px 0px;
						font-size: 12px;
						height: 15px;
						width: 40px;
						border-radius: 5px;
						line-height: 15px;
						text-align: center;
					}

					.cell_bottomItems_item_nomarl {
						border: 1px solid #666666;
						background-color: #FFFFFF;
						color: #666666;
					}

					.cell_bottomItems_item_selected {
						border: 1px solid #e8654b;
						background-color: #e8654b;
						color: #FFFFFF;
					}
				}
			}

		}
	}

	.line {
		background-color: #f5f7f8;
		width: 100%;
		height: 1px;
	}

	.pushBtn {
		position: fixed;
		bottom: 40px;
		right: 0px;
		width: 40px;
		height: 40px;
		background-color: #e8654b;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px; //右下角
		color: #FFFFFF;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		padding: 4px;
		box-shadow:3px 3px 3px #888888 ;
	}
</style>
