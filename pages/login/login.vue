<template>
	<view>
		
		<image class="top_image" src="../../static/login/loginBg.png" mode=""></image>

		<view class="title">临</view>

		<view class="main_view" v-if="type==='pwd'">
			<view class="lab">账号</view>
			<input class="account" type="text" value="" v-model="account" placeholder="请输入账号" />
			<view class="lab_pwd">密码</view>
			<input class="account" type="text" value="" v-model="pwd" placeholder="6-12位" />

			<view class="type_text" @click="typeClick()">
				{{type==='pwd'?'验证码登录':'账号密码登录'}}
			</view>
			<button class="logBtn" type="default" @click="gotologin()"> 登录</button>
		</view>

		<view class="main_view" v-if="type==='yzm'">
			<view class="lab">账号</view>
			<input class="account" type="text" value="" v-model="account" placeholder="请输入手机号" />
			<view class="lab_pwd">验证码</view>

			<view class="yzm">
				<input class="yzmcontent" type="text" value="" v-model="yzm" placeholder="输入验证码" />
				<view class="yz" :class="[disabled===true?'yz_selected':'']" @click="getVerificationCode">{{VerificationMes}} </view>
			</view>


			<view class="type_text" @click="typeClick()">
				{{type==='pwd'?'验证码登录':'账号密码登录'}}
			</view>
			<button class="logBtn" type="default" @click="gotologin()"> 登录</button>
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
				pwd: '',
				type: 'pwd',
				VerificationMes: "获取验证码",
				disabled: false,
				yzm:''
			}
		},
		methods: {

			registClick() {
				uni.navigateTo({
					url: './newRegist'
				})
			},
			forgetClcik() {
				uni.navigateTo({
					url: './forgetPwd'
				})
			},

			typeClick() {
				this.account = ''
				this.pwd = ''
				this.VerificationMes = '获取验证码'
				if (this.type === 'pwd') {
					this.type = 'yzm'
				} else {
					this.type = 'pwd'
				}
			},
			
			gotologin(){
				// zpapp/enterprise!ajaxLoginByPhoneCode.action
				console.log('type = '+this.type);
				if (this.type === 'pwd') {
					this.$api.post('zpapp/enterprise!ajaxLoginByPassword.action', {
						tel: this.account,
						password:this.pwd,
						
					}).then(res => {
						if (res.res.status == 0) {
							var dict = res.inf;
							uni.setStorageSync('userId', dict.enterpriseId);
							uni.setStorage({
								key: "loginKey",
								data: dict.loginKey,
								success() {
									uni.showToast({
										title: '登录中···'
									});
									setTimeout(function() {
										uni.navigateBack({
											delta: 1
										})
									}, 1500)
								}
							})
						}else{
							uni.showToast({
								title:res.res.errMsg
							})
						}
					})
				} else {
					if(this.yzm.length>0){
						this.$api.post('zpapp/enterprise!ajaxLoginByPhoneCode.action', {
							tel: this.account,
							phoneCode:this.yzm,
							
						}).then(res => {
							if (res.res.status == 0) {
								var dict = res.inf;
								uni.setStorageSync('userId', dict.enterpriseId);
								uni.setStorage({
									key: "loginKey",
									data: dict.loginKey,
									success() {
										uni.showToast({
											title: '登录中···'
										});
										setTimeout(function() {
											uni.navigateBack({
												delta: 1
											})
										}, 1500)
									}
								})
							}
						})
					}else{
						uni.showToast({
							title:'未填写验证码'
						})
					}
					
				}
				
			},
			
			getVerificationCode() {
			
				if (this.disabled === false){
					if (!this.account || this.account.length !== 11) {
						uni.showToast({
							title: '请输入正确的手机号！'
						});
					} else {
						var ii = 0;
						this.disabled = true;
						this.VerificationMes = "60s";
						this.timer = setInterval(() => {
								
							ii = ii + 1;
							console.log("ii=" + ii);
							this.VerificationMes = (60 - ii).toString() + "s";
								
							if (ii == 30) {
								this.disabled = false;
								this.VerificationMes = "获取验证码";
								ii = 0;
								clearInterval(this.timer);
							}
						}, 1000)
								
						this.$api.post('zpapp/enterprise!ajaxGetPhoneCode.action', {
							tel: this.account
						}).then(res => {
							if (res.res.status == 0) {
								console.log("获取验证码成功")
							}
						})
								
					}
				}
			
			
			},
			

		}
	}
</script>

<style lang="scss">
	.top_image {
		position: fixed;
		top: 0;
		width: 100%;
		height: 50%;
		// z-index: 0;
	}

	.title {
		position: relative;
		width: 100%;
		font-size: 22px;
		color: #FFFFFF;
		text-align: center;
		margin-top: 80px;
		z-index: 1;

	}


	.main_view {
		position: relative;
		margin-top: 20px;
		margin-left: 5%;
		margin-right: 5%;
		background-color: #FFFFFF;
		box-shadow: 0px 0px 3px #666;
		border-radius: 20px;

		padding: 40px 20px;

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
			color: #666666;
			font-size: 14px;
			border-radius: 5px;
			background-color: #f3f3f3;
		}

		.logBtn {
			margin: 25px 25px 25px 25px;
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

	.type_text {
		width: 100%;
		text-align: center;
		line-height: 30px;
		height: 30px;
		color: #007AFF;
		font-size: 12px;
		margin-top: 20px;
	}

	.yzm {
		display: flex;
		align-items: center;
		margin: 0px 25px;

	

		
		

	}
	
	.yz_selected{
		background-color: #919293;
		color: #FFFFFF;
	}
	.yz {
		color: #FFFFFF;
		font-size: 12px;
		height: 30px;
		width: 80px;
		line-height: 30px;
		background-color: #e8654b;
		border: none;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		text-align: center;
	}
	
	
	.yzmcontent {
		background-color: #f3f3f3;
		flex: 1;
		height: 30px;
		margin: 0px;
		padding-left: 10px;
		color: #666666;
		font-size: 14px;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		
	}
</style>
