<template>
	<view>
		<view class="user_view">
			<view class="user_view_img">
			</view>
			<view class="user_view_contentview">
				<view class="user_view_contentview_title">
					临语堂
				</view>
				<view class="user_view_contentview_zw">
					未填写职务名称
				</view>
			</view>
			<!-- <image class="endImg" src="../../static/mine/endImg.png" mode=""></image> -->
		</view>
		
		<view class="flex_item" @click="manageJob()">
			<image class="flex_item_img" src="../../static/mine/zwgl.png" mode=""></image>
			<view class="flex_item_content">职位管理</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>
		
		<view class="flex_item" @click="mangeCv()">
			<image class="flex_item_img" src="../../static/mine/jlgl.png" mode=""></image>
			<view class="flex_item_content">简历管理</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>
		
		
		<view class="flex_item">
			<image class="flex_item_img" src="../../static/mine/wdgs.png" mode=""></image>
			<view class="flex_item_content">我的公司</view>
			<image class="endImg" src="../../static/mine/endImg.png" mode=""></image>
		</view>
		<view class="line"></view>
		
		<view class="flex_item">
			<image class="flex_item_img" src="../../static/mine/wdgs.png" mode=""></image>
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

			};
		},
		methods:{
			manageJob(){
				uni.navigateTo({
					url:'./jobmanage'
				})
			},
			mangeCv(){
				uni.navigateTo({
					url:'./cvmanage'
				})
			}
		}
		
	}
</script>

<style lang="scss">
	
		
	.line{
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

		.user_view_img {
			margin: 20px;
			width: 60px;
			height: 60px;
			border-radius: 30px;
			background-color: #e8654b;
		}

		.user_view_contentview {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			.user_view_contentview_title{
				font-size: 16px;
				color: #000000;
				line-height: 25px;
			}
			.user_view_contentview_zw{
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
	
	.flex_item{
		display: flex;
		align-items: center;
		margin-top: 5px;
		.flex_item_img{
			margin: 15px;
			width: 15px;
			height: 15px;
		}
		.flex_item_content{
			font-size: 14px;
			// color: #000000;
			line-height: 20px;
			height: 20px;
			flex: 1;
		}
		
	}
</style>
