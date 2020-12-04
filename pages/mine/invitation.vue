<template>
	<view>
		<view class="list">
			<view class="cell" v-for="(item,index) in dataArr" :key="index">
				<view class="cell_content">
					<image class="cell_content_img" src="../../static/home/star.png" mode=""></image>
					<view class="cell_content_text">
						{{item.title}}
					</view>
					<view class="cell_content_btns">
						<view class="cell_content_btns_item_normal" @click="settingItem(item)">
							编辑
						</view>
						<view class="cell_content_btns_item_normal" @click="removeClick(item)">
							删除
						</view>
						<view :class="[item.isDefault ===0?'cell_content_btns_item_normal':'cell_content_btns_item_select']" @click="normalClick(item)">
							默认 
						</view>
					</view>
				</view>
				<view class="cell_line">

				</view>
			</view>
		</view>
		<view class="bottom_view">
			<view class="bottom_view_qd" @click="newPlate()">新建模板</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataArr: []
			};
		},

		onShow() {
			this.getData()
		},
		methods: {
			getData() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/enterprise!ajaxGetInvitationCardList.action', {
					loginKey: loginkey,

				}).then(res => {
					if (res.res.status == 0) {
						this.dataArr = res.inf.arr

					} else {
						uni.showToast({
							title: res.res.error,
						})

					}
				})


			},

			settingItem(item) {
				uni.navigateTo({
					url: './addInvitation?id=' + item.id
				})
			},
			removeClick(item) {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/enterprise!ajaxDeleteInvitationCard.action', {
					loginKey: loginkey,
					id: item.id
				}).then(res => {
					if (res.res.status == 0) {
						 this.getData()
			
					} else {
						uni.showToast({
							title: res.res.error,
						})
			
					}
				})
			
			},
			normalClick(item) {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/enterprise!ajaxSetInvitationCardDefault.action', {
					loginKey: loginkey,
					id: item.id
				}).then(res => {
					if (res.res.status == 0) {
						 this.getData()

					} else {
						uni.showToast({
							title: res.res.error,
						})

					}
				})
			},

			newPlate() {
				uni.navigateTo({
					url: './addInvitation'
				})
			}



		},


	}
</script>

<style lang="scss">
	.list {
		padding: 10px;

		.cell {
			.cell_content {
				display: flex;
				align-items: center;
				margin: 10px 0px;

				.cell_content_img {
					width: 20px;
					height: 20px;
				}

				.cell_content_text {
					flex: 1;
					font-size: 14px;
					color: #666666;
					margin-left: 10px;
				}

				.cell_content_btns {
					display: flex;
					margin-right: 10px;

					.cell_content_btns_item_normal {
						border: 1px solid #666666;
						border-radius: 5px;
						padding: 0px 8px;
						margin-left: 10px;
						color: #666666;
						font-size: 12px;

					}

					.cell_content_btns_item_select {
						border: 1px solid #e8654b;
						border-radius: 5px;
						padding: 0px 8px;
						margin-left: 10px;
						color: #FFFFFF;
						background-color: #e8654b;
						font-size: 12px;
					}

				}

			}

			.cell_line {
				margin: 0px;
				height: 1px;
				background-color: #f5f8f7;
			}
		}
	}

	.bottom_view {
		position: fixed;
		bottom: 0px;
		height: 50px;
		display: flex;
		justify-content: center;
		width: 100%;
		z-index: 999;

		.bottom_view_cz {
			border: 2px solid #e8654b;
			background-color: #fbc9bc;
			color: #e8654b;
			font-size: 17px;
			border-radius: 5px;
			width: 80px;
			height: 30px;
			margin: 10px;
			text-align: center;
			line-height: 30px;
		}

		.bottom_view_qd {
			border: 2px solid #e8654b;
			border-radius: 5px;
			height: 30px;
			flex: 1;
			margin: 10px 10px 10px 10px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 17px;
			text-align: center;
			line-height: 30px;

		}
	}
</style>
