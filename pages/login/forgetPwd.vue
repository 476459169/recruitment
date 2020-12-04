<template>
	<view class="">
		<view class="titleLabel">账号</view>
		<input class="input_text" v-model="account" type="text" value="" placeholder="请输入公司名称或手机号" />


		<view class="titleLabel">新密码</view>
		<input class="input_text" v-model="pwd" type="text" value="" placeholder="6-12位密码" />

		<view class="titleLabel">重复密码</view>
		<input class="input_text" v-model="comfirmpwd" type="text" value="" />


		<view class="titleLabel">手机号</view>
		<view class="phone_view">
			<input class="phone_number" v-model="phoneNumber" type="text" value="" placeholder="您的手机号码" />
			<view class="phone_yzm">
				发送验证码
			</view>
		</view>

		<view class="titleLabel">验证码</view>
		<input class="input_text" v-model="code" type="text" value="" placeholder="请输入收到的验证码" />


		<button class="bottom_btn" type="default" @click="saveClick()">确定</button>
	</view>



</template>

<script>
	import areaData from './area-data-min'

	export default {
		data() {
			return {
				account: '',
				pwd: '',
				comfirmpwd: '',
				phoneNumber: '',
				code: '',

				value2: [], //公司所在地
				companyList: ['1-50人', '50-100人', '100-500人', '500人以上'],
				companyScale: '1-50人',
				list: areaData,
			}
		},

		methods: {
			handleTap(picker) {
				this.$refs[picker].show()
				// console.log("handleTap");
			},
			handleChange(item) {
				// console.log('change::', item)
			},
			
			saveClick(){
				this.$api.post('zpapp/enterprise!ajaxResetPassword.action', {
					tel: this.account,
					phoneCode:this.code,
					password:this.pwd,
					repeatPassword:this.comfirmpwd
					
					
				}).then(res => {
					if (res.res.status == 0) {
						uni.showToast({
							title:'修改成功',
							success() {
								uni.navigateBack({
									
								})
							}
						})
					}
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.top_view {
		display: flex;
		justify-content: center;
		padding: 40px 40px 20px 40px;

		.top_img {
			width: 80px;
			height: 80px;
			border-radius: 40px;
			background-color: #000000;
		}

	}

	.titleLabel {
		font-size: 14px;
		color: #666666;
		padding: 10px 20px;
		margin-top: 20px;
		line-height: 15px;
	}

	.input_text {
		margin: 0px 15px;
		height: 20px;
		font-size: 14px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
	}

	.address_view {
		display: flex;

		// padding: 5px;
		.address_item {
			display: flex;
			width: 100%;
			height: 30px;
			margin: 0px 15px;
			border-radius: 5px;
			background-color: #f5f7f8;
			color: #666666;
			font-size: 14px;

			.address_line {
				height: 30px;
				width: 2px;
				background-color: #FFFFFF;
			}

			.address_bt {
				width: 40px;
				text-align: center;
				line-height: 30px;
			}

			.address_content {
				flex: 1;
				line-height: 30px;
				padding-left: 5px;
			}


			.address_img {
				width: 30px;
				height: 30px;
				background-color: #e8654b;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px; //右下角
				display: flex;
				align-items: center;
				justify-content: center;

				.add_itemImg {
					width: 8px;
					height: 5px;
				}
			}

		}

	}


	.address_detail_msg {
		margin: 0px 15px;
		width: calc(100vw - 40px);
		height: 50px;
		font-size: 14px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
	}


	.phone_view {
		display: flex;
		margin: 0px 15px 15px 15px;
		border-radius: 5px;
		background-color: #f5f7f8;
		font-size: 14px;

		.phone_number {
			flex: 1;
			padding: 5px;
			line-height: 20px;
			color: #666666;
			font-size: 14px;
		}


		.phone_yzm {
			width: 100px;
			height: 30px;
			background-color: #e8654b;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px; //右下角
			text-align: center;
			color: #FFFFFF;
			font-size: 12px;
			line-height: 30px;
		}
	}


	.company {
		display: flex;
		margin: 0px 15px 15px 15px;
		border-radius: 5px;
		background-color: #f5f7f8;
		font-size: 14px;
		color: #666666;

		.company_content {
			flex: 1;
			padding: 5px;

		}

		.company_imgView {
			width: 30px;
			height: 30px;
			background-color: #e8654b;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px; //右下角

			display: flex;
			align-items: center;
			justify-content: center;

			.company_img {
				width: 8px;
				height: 5px;
			}
		}

	}

	.bottom_btn {
		background-color: #e8654b;
		color: #FFFFFF;
		font-size: 15px;
		border-radius: 5px;
		margin: 30px;
	}
</style>
