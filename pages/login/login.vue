<template>
	<view>
		<view class="top_image">

		</view>

		<view class="title">临</view>

		<view class="main_view">
			<view class="lab">账号</view>
			<input class="account" type="text" value="" v-model="account" placeholder="请输入公司名称或手机号" />
			<view class="lab_pwd">密码</view>
			<input class="account" type="text" value="" v-model="pwd" placeholder="6-12位" />
			<button class="logBtn" type="default"> 登录</button>
		</view>

		<view class="bottom_flex">
			<view class="bottom_regist" @click="registClick()">注 册</view>
			<view class="bottom_forget" @click="forgetClcik()">忘记密码</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				account: '',
				pwd: ''
			}
		},
		methods: {

			registClick() {
				uni.navigateTo({
					url:'./regist'
				})
			},
			forgetClcik(){
				uni.navigateTo({
					url:'./forgetPwd'
				})
			}
		}
	}
</script>

<style lang="scss">
				.top_image {
				position: fixed;
				top: 0;
				width: 100%;
				height: 50%;
				background-color: #e8654b;
				// z-index: 0;
				}

				.title {
				position: relative;
				width: 100%;
				font-size: 22px;
				color: #FFFFFF;
				text-align: center;
				margin-top: 200upx;
				z-index: 1;

				}


				.main_view {
				position: relative;
				margin-top: 150upx;
				margin-left: 5%;
				margin-right: 5%;
				background-color: #FFFFFF;
				box-shadow: 0px 0px 3px #666;
				border-radius: 20px;

				padding: 20px;

				.lab {

				padding: 10px 0px 0px 30px;
				color: #666666;
				font-size: 14px;
				width: 100%;
				line-height: 30px;
				}

				.lab_pwd {

				padding: 10px 0px 0px 30px;
				color: #666666;
				font-size: 14px;
				width: 100%;
				line-height: 30px;
				margin-top: 15px;
				}

				.account {
				// width: 100%;
				height: 30px;
				margin: 0px 25px 0px 25px;
				padding-left: 10px;
				color: #eceff3;
				font-size: 14px;
				border-radius: 5px;
				background-color: #f3f3f3;
				}

				.logBtn {
				margin: 45px 25px 25px 25px;
				background-color: #e8654b;
				color: #FFFFFF;
				font-size: 14px;
				border-radius: 5px;
				}
				}


				.bottom_flex {
				display: flex;
				padding: 20px;
				justify-content: space-between;
				color: #333333;
				font-size: 14px;

				.bottom_regist {
				margin-left: 15px;
				line-height: 15px;
				text-decoration: underline;
				}

				.bottom_forget {
				margin-right: 15px;
				line-height: 15px;
				text-decoration: underline;
				}
				}
				</style>
