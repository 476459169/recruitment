<template>
	<view class="">
		<view class="top_view">
			<view class="top_img"></view>
		</view>

		<view class="titleLabel">公司名称</view>
		<input class="input_text" type="text" value="" placeholder="公司全称" />


		<view class="titleLabel">公司所在地</view>
		<view class="address_view">
			<view class="address_item" @tap="handleTap('picker2')">
				<view class="address_content">{{value2.length>0?value2.join('-'):''}}</view>
				<view class="address_img">
					<image class="add_itemImg" src="../../static/login/star3.png" mode=""></image>
				</view>

				<lb-picker ref="picker2" v-model="value2" mode="multiSelector" :list="list" :level="3" @change="handleChange"
				 @confirm="handleConfirm" @cancel="handleCancel">
				</lb-picker>
			</view>
		</view>

		<view class="titleLabel">详细地址</view>
		<textarea class="address_detail_msg" value="" placeholder="" />



		<view class="titleLabel">公司邮箱</view>
        <input class="input_text" type="text" value="" placeholder="用于简历的接收,非常重要" />
		
		  <view class="titleLabel"  >公司规模</view>
		  <view class="company" @tap="handleTap('picker3')">
		  	<view class="company_content">{{companyScale}}</view>
		  	<view class="company_imgView">
				<image class="company_img" src="../../static/login/star3.png" mode=""></image>
			</view>
			
		  </view>
		  <lb-picker ref="picker3"
		    v-model="companyScale"
		    mode="selector"
		    :list="companyList"
		    @change="handleChange"
		    @confirm="handleConfirm"
		    @cancel="handleCancel">
		  </lb-picker> 
		  
		 

        <view class="titleLabel">公司介绍</view>
		<textarea class="address_detail_msg" value="" placeholder="" />
		
		<view class="titleLabel">手机号</view>
		<view class="phone_view">
			<input class="phone_number" type="text" value="" placeholder="您的手机号码"/>
			<view class="phone_yzm">
				发送验证码
			</view>
		</view>
		
		<view class="titleLabel">验证码</view>
		<input class="input_text" type="text" value="" placeholder="请输入收到的验证码" />
		
		
		<button class="bottom_btn" type="default">确定</button>
	</view>
	
	
	
</template>

<script>
	import areaData from './area-data-min'

	export default {
		data(){
			return {
				value2: [], //公司所在地
				companyList:['1-50人','50-100人','100-500人','500人以上'],
				companyScale:'1-50人',
				list: areaData,
			}
	},

		methods: {
handleTap (picker) {
				this.$refs[picker].show()
				// console.log("handleTap");
			},
			handleChange (item) {
				// console.log('change::', item)
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
				.add_itemImg{
					width: 8px;
					height: 5px;
				}
			}

		}

	}
	
		
	.address_detail_msg{
		margin: 0px 15px;
		width: calc(100vw - 40px);
		height:50px;
		font-size: 14px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
	}
	
	
	.phone_view{
		display: flex;
		margin:0px 15px 15px 15px;
		border-radius: 5px;
		background-color: #f5f7f8;
		font-size: 14px;
		.phone_number{
			flex:1;
			padding: 5px;
			line-height: 20px;
			color: #666666;
			font-size: 14px;
		}
		
			
		.phone_yzm{
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
	
		
	.company{
	display: flex;
	margin:0px 15px 15px 15px;
	border-radius: 5px;
	background-color: #f5f7f8;
	font-size: 14px;
	color: #666666;
	.company_content{
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
		.company_img{
			width: 8px;
			height: 5px;
		}
	}
	
	}
	
	.bottom_btn{
		background-color: #e8654b;
		color: #FFFFFF;
		font-size: 15px;
		border-radius: 5px;
		margin: 30px;
	}
	
</style>
