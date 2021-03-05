<template>
	<view>
		<view class="user_view" @click="setting()">
			<image class="user_view_img"  :src="userInfo.headImgUrl.length>0?baseUrl+userInfo.headImgUrl:'../../static/login/addPic.png'" mode=""></image>
			<view class="user_view_contentview">
				<view class="user_view_contentview_title">
					{{userInfo.fullName.length>0?userInfo.fullName:''}}
				</view>
				<!-- <view  v-if="notios" class="user_view_contentview_zw">
					<view v-if="userInfo.rz.length>0" class="">
						
					</view>
				</view> -->
			</view>
			<image v-if="userInfo.isReview==1" class="user_view_review" src="../../static/mine/review.png" mode=""></image>
		</view>

		<!-- <view class="flex_item" @click="vipCenter()">
			<image class="flex_item_img" src="../../static/mine/hyzx.png" mode=""></image>
			<view class="flex_item_content">会员中心</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view> -->

		<view class="flex_item" @click="invitation()">
			<image class="flex_item_img" src="../../static/mine/yqh.png" mode=""></image>
			<view class="flex_item_content">邀请函模板</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>

<!-- 
		<view class="flex_item" @click="manageJob()">
			<image class="flex_item_img" src="../../static/mine/ddjl.png" mode=""></image>
			<view class="flex_item_content">订单记录</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view> -->
<!-- 
		<view class="flex_item" @click="invoice()">
			<image class="flex_item_img" src="../../static/mine/wdfp.png" mode=""></image>
			<view class="flex_item_content">我的发票</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view> -->

		<view class="flex_item" @click="mangeCv()">
			<image class="flex_item_img" src="../../static/mine/xxjx.png" mode=""></image>
			<view class="flex_item_content">学习进修</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>


		<view class="flex_item" @click="changePwd()">
			<image class="flex_item_img" src="../../static/mine/xgmm.png" mode=""></image>
			<view class="flex_item_content">修改密码</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>

		<view class="flex_item" @click="logout()">
			<image class="flex_item_img" src="../../static/mine/tcdl.png" mode=""></image>
			<view class="flex_item_content">退出登录</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: Object,
				baseUrl: "http://39.105.48.243/crlink/",
				notios:true
			};
		},

		onLoad(e) {
			this.baseUrl = getApp().globalData.baseUrl
			uni.getSystemInfo({
			    success: function (res) {
						
					if(res.platform == 'ios'){
						_this.notios =  false
					}
			    }
			});
		},
		onShow() {
			this.getUserInfo()
		},

		methods: {
			manageJob() {
				uni.navigateTo({
					url: './jobmanage'
				})
			},
			mangeCv() {
				uni.navigateTo({
					url: './cvmanage'
				})
			},
			
			invitation(){
				uni.navigateTo({
					url: './invitation'
				})
			},
			
			invoice(){
				uni.navigateTo({
					url:'./invoice/invoice'
				})
			},
			
			vipCenter(){
				uni.navigateTo({
					url:'./vipCenter'
				})
			},
			
			changePwd(){
				uni.navigateTo({
					url:'./changePwd'
				})
			},

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


			setting() {
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey.length > 0) {
					uni.navigateTo({
						url: './enterpriseCertification'
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}

			},

			logout() {
				
				uni.removeStorageSync('loginKey');
				uni.removeStorageSync('userId');
				uni.removeStorageSync('isFill');
				this.userInfo = null;
				
			}
		}

	}
</script>

<style lang="scss">
	.line {
		margin: 0px 10px;
		height: 1px;
		background-color: #cccccc;
	}

	.user_view {
		margin: 30px 15px 20px 15px;
		border-radius: 10px;
		box-shadow: 0px 2px 4px #666;
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		overflow: hidden;
		.user_view_img {
			margin: 20px;
			width: 60px;
			height: 60px;
			border-radius: 30px;
			// background-color: #e8654b;
		}
		
		.user_view_review{
			position: relative;
			right: -5px;
			top: -35px;
			width: 55px;
			height: 55px;
		}

		.user_view_contentview {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.user_view_contentview_title {
				font-size: 15px;
				color: #000000;
				line-height: 25px;
			}

			.user_view_contentview_zw {
				font-size: 14px;
				color: #cccccc;
				line-height: 25px;
			}

		}
	}

	.endImg {
		margin-right: 15px;
		height: 15px;
		width: 5px;
	}

	.flex_item {
		display: flex;
		align-items: center;
		margin-top: 5px;

		.flex_item_img {
			margin: 15px;
			width: 15px;
			height: 15px;
		}

		.flex_item_content {
			font-size: 14px;
			// color: #000000;
			line-height: 20px;
			height: 20px;
			flex: 1;
		}

	}
</style>
