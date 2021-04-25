<template>
	<view>
		<view class="title">
			发票详情
		</view>

		<view class="cell">
			<view class="cell_content">
				<view class="cell_content_name">
					公司名称：
				</view>
				<input class="cell_content_value" v-model="baseInf.enterpriseName" type="text" value="" />
			</view>
			<view class="cell_line"></view>
		</view>
		<view class="cell">
			<view class="cell_content">
				<view class="cell_content_name">
					公司税号：
				</view>
				<input class="cell_content_value" v-model="baseInf.taxNumber" type="text" value="" />
			</view>
			<view class="cell_line"></view>
		</view>

		<view class="cell">
			<view class="cell_content">
				<view class="cell_content_name">
					更多内容
				</view>
				<view class="cell_downBtn" @click="openviewClick()">
					填写备注、地址等（非必填项）{{openview?"∨":"∧"}}
				</view>
			</view>
			<view class="cell_line"></view>
		</view>

		<view v-if="openview== true">
			<view class="cell">
				<view class="cell_content">
					<view class="cell_content_name">
						注册地址：
					</view>
					<input class="cell_content_value" type="text" value="" />
				</view>
				<view class="cell_line"></view>
			</view>
			<view class="cell">
				<view class="cell_content">
					<view class="cell_content_name">
						注册电话：
					</view>
					<input class="cell_content_value" type="text" value="" />
				</view>
				<view class="cell_line"></view>
			</view>
			<view class="cell">
				<view class="cell_content">
					<view class="cell_content_name">
						开户银行：
					</view>
					<input class="cell_content_value" type="text" value="" />
				</view>
				<view class="cell_line"></view>
			</view>
			<view class="cell">
				<view class="cell_content">
					<view class="cell_content_name">
						银行账号：
					</view>
					<input class="cell_content_value" type="text" value="" />
				</view>
				<view class="cell_line"></view>
			</view>

		</view>

		<view class="line" style="height: 5px;"></view>
		<view class="cell">
			<view class="cell_content">
				<view class="cell_content_name">
					总金额：
				</view>
				<view class="cell_content_value">
					<text class="cell_content_name_o">{{money}}</text>元
				</view>
			</view>
			<view class="cell_line"></view>
		</view>

		<view class="title">
			接收方式
		</view>
		<view class="cell">
			<view class="cell_content">
				<view class="cell_content_name">
					电子邮箱：
				</view>
				<input class="cell_content_value" type="text" value="" />
			</view>
			<view class="cell_line"></view>
		</view>

		<view class="cell">
			<view class="cell_content">
				<image class="cell_content_img" src="../../../static/mine/wx.png" mode=""></image>
				<view class="cell_content_value">
					微信卡包
				</view>
				<view class="cell_downBtn">
					去授权>
				</view>
			</view>
			<view class="cell_line"></view>
		</view>

		<view class="commitBtn">
			提交
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				openview: false,
				dataArr: [],
				money: 0,
				baseInf: {
					taxNumber: "",
					enterpriseName: "",
					email: ""
				}
			};
		},
		onLoad(e) {
			this.dataArr = JSON.parse(decodeURIComponent(e.data))
			for (var i = 0; i < this.dataArr.length; i++) {
				var item = this.dataArr[i]
				this.money += item.money
			}
			
			this.getInvoiceHeader()
		},

		methods: {
			getInvoiceHeader() {

				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/zpCardSetmeal!ajaxGetInvoiceBaseInfo.action', {
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						this.baseInf = res.inf
					} else {
						this.logout()
					}
				})

			},
			openviewClick() {
				this.openview = !this.openview
			}
		}
	}
</script>

<style lang="scss">
	.title {
		background-color: #f5f7f8;
		padding: 10px;
		font-size: 12px;
		height: 10px;
		line-height: 10px;
	}

	.cell {
		.cell_content {
			display: flex;
			align-items: center;

			.cell_content_name {
				font-size: 14px;
				color: #333333;
				margin: 10px;
			}

			.cell_content_name_o {
				color: #e8654b;
			}

			.cell_content_value {
				font-size: 12px;
				color: #666666;
				margin-right: 10px;
				padding: 5px;
				height: 25px;
				line-height: 25px;
			}

			.cell_downBtn {
				color: #CCCCCC;
				font-size: 12px;
				height: 25px;
				line-height: 25px;
				text-align: right;
				margin-right: 10px;
				flex: 1;
			}

			.cell_content_img {
				margin-left: 10px;
				margin-right: 10px;
				width: 20px;
				height: 20px;
			}
		}


		.cell_line {
			width: 100%;
			background-color: #f5f7f8;
			height: 1px;
		}
	}

	.line {
		width: 100%;
		background-color: #f5f7f8;
		height: 1px;
	}

	.commitBtn {
		width: 80%;
		margin-left: 10%;
		margin-top: 50px;
		margin-bottom: 15px;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		color: #FFFFFF;
		background-color: #e8654b;
		border-radius: 5px;
		text-align: center;


	}
</style>
