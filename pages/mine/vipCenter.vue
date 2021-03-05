<template>
	<view>
		<view class="topView">
			<!-- <view class="topView_img"></view>-->
			<image class="topView_img" :src="dataInf.headImgUrl.length>0?baseUrl+dataInf.headImgUrl:''" mode=""></image>
			<view class="topView_centent">
				<view class="topView_centent_nameView">
					<view class="topView_centent_nameView_name">
						{{dataInf.companyName}}
					</view>
					<image class="topView_centent_nameView_img" src="../../static/mine/vip_g.png" mode=""></image>
				</view>
				<view class="topView_centent_time">
					2020.11.23到期，购买后有效期顺延
				</view>
			</view>
		</view>
		
		<view class="titleLabel">
			会员套餐
		</view>
		<view class="vipPlate">
			<view class="vipPlateItem" v-for="(item,index) in dataInf.vipCardArr" :key="index">
				<view class="vipPlateItem_toptitle_view">
					<view class="vipPlateItem_toptitle_view_none">
						
					</view>
					<view class="vipPlateItem_topTitle">
						{{item.name}}
					</view>
				</view>
				
				<view class="vipPlateItem_money">
					{{'￥'+item.soldFee}}  <text class="vipPlateItem_xmoney">{{'￥'+item.originalFee}}</text>
				</view>
				<view class="vipPlateItem_detailMsg">
					职位发布{{item.positionNum}}个
				</view>
				<view class="vipPlateItem_detailMsg">
					查看简历{{item.resumeNum}}个
				</view>
			</view>
		</view>
		
		
		<view class="buyBtn">
			<view class="buyBtn_btn">
				立即开通
			</view>
		</view>
		
		<view class="titleLabel">
			简历卡套餐 <text style="font-size: 10px;margin-left: 10px;color: #666666;">可查看简历</text>
		</view>
		<view class="vipPlate">
			<view class="vipPlateItem" v-for="(item,index) in dataInf.resumeCardArr" :key="index">
				<view class="vipPlateItem_toptitle_view">
					<view class="vipPlateItem_toptitle_view_none">
						
					</view>
					<view class="vipPlateItem_topTitle">
						{{item.name}}
					</view>
				</view>
				
				<view class="vipPlateItem_money">
						{{'￥'+item.soldFee}}  <text class="vipPlateItem_xmoney">{{'￥'+item.originalFee}}</text>
				</view>
				
				<view class="vipPlateItem_btns">
					<view class="vipPlateItem_btns_btn">
						立即购买
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="titleLabel">
			置顶卡 <text style="font-size: 10px;margin-left: 10px;color: #666666;">招聘岗位首页置顶</text>
		</view>
		<view class="vipPlate" style="margin-bottom: 20px;">
			<view class="vipPlateItem" v-for="(item,index) in dataInf.topCardArr" :key="index">
				<view class="vipPlateItem_toptitle_view">
					<view class="vipPlateItem_toptitle_view_none">
						
					</view>
					<view class="vipPlateItem_topTitle">
						{{item.name+item.baseNum+'张'}}
					</view>
				</view>
				
				<view class="vipPlateItem_money">
					{{'￥'+item.soldFee}}  <text class="vipPlateItem_xmoney">{{'￥'+item.originalFee}}</text>
				</view>
				
				<view class="vipPlateItem_btns">
					<view class="vipPlateItem_btns_btn">
						立即购买
					</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				vipArr:[1,2,3,4,5,6],
				cvArr:[1,2,3],
				zdArr:[1,2,3],
				dataInf:Object,
				baseUrl:''
			};
		},
		
		onLoad() {
			this.baseUrl = getApp().globalData.baseUrl
			this.getData()
			
		},
		
		methods:{
				
			getData(){
				//zpapp/zpCardSetmeal!ajaxGetSetmealList.action
				
						
							var loginkey = uni.getStorageSync('loginKey');
							if (loginkey) {
								this.loginKey = loginkey;
								this.$api.post('zpapp/zpCardSetmeal!ajaxGetSetmealList.action', {
									loginKey: loginkey,
								}).then(res => {
									if (res.res.status == 0) {
										this.dataInf = res.inf
									} else {
										uni.showToast({
											title:res.res.errMsg
										})
									}
								})
							} 
						
					
				
			}
		}
	}
</script>

<style lang="scss">
	.topView{
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		 background-image: linear-gradient(to right, #e87050 , #f1b35b);
		 box-shadow: 2px 3px 0px #cccccc;
		margin: 0px 10px;
		 height: 100px;
		display: flex;
		align-items: center;
		.topView_img{
			margin:0px 15px;
			width: 50px;
			height: 50px;
			border-radius: 25px;
		}
		
			
		.topView_centent{
			display: flex;
			flex-direction: column;
			justify-content: center;
			.topView_centent_nameView{
				display: flex;
				align-items: center;
				.topView_centent_nameView_name{
					height: 30px;
					line-height: 30px;
					font-size: 15px;
					color: #FFFFFF;
				}
					
				.topView_centent_nameView_img{
					margin-left: 5px;
					width: 15px;
					height: 13px;
				}
				
			}
			
			.topView_centent_time{
				font-size: 12px;
				color: #FFFFFF;
				line-height: 20px;
				height: 20px;
			}
		}
		 
	}
	
	.titleLabel{
		margin-left: 10px;
		margin-top: 20px;
		font-size: 14px;
		color: #000000;
		height: 30px;
		line-height: 30px;
	}
	
	.vipPlate{
		margin: 0px 0px;
		display: flex;
		flex-wrap: wrap;
		
		.vipPlateItem{
			width: calc((100vw - 40px) / 3);
			height: 110px;
			background-color: #f5f7f8;
			border-radius: 5px;
			margin-top: 10px;
			margin-left: 10px;
			
				
			.vipPlateItem_toptitle_view{
				display: flex;
					
				.vipPlateItem_toptitle_view_none{
					flex: 1;
				}
				
				.vipPlateItem_topTitle{
					height: 20px;
					line-height: 20px;
					padding: 0px 5px;
					border-top-right-radius: 5px;
					border-bottom-left-radius: 5px;
					color: #FFFFFF;
					font-size: 10px;
					background-color: #e7654c;
				}
			}
			
			
			.vipPlateItem_money{
				margin-left: 20px;
				margin-top: 10px;
				font-size: 14px;
				color: #000000;
				
			}
			
			.vipPlateItem_xmoney{
				margin-left: 5px;
				font-size: 10px;
				color: #666666;
				text-decoration: line-through;
			}
			
				
			.vipPlateItem_detailMsg{
				font-size: 10px;
				color: #666666;
				margin-left: 20px;
				line-height: 15px;
				height: 15px;
			}
			
				
			.vipPlateItem_btns{
				margin: 10px 0px;
				display: flex;
				justify-content: center;
					
				.vipPlateItem_btns_btn{
					border-radius: 5px;
					padding: 2px 7px;
					color: #FFFFFF;
					font-size: 10px;
					background-color: #e7654c;
				}
				
			}
		}
	}
	
	.buyBtn{
		display: flex;
		width: 100%;
		margin-top: 10px;
		justify-content: center;
			
		.buyBtn_btn{
			width: 200px;
			height: 30px;
			line-height: 30px;
			font-size: 12px;
			color: #FFFFFF;
			background-color: #e7654c;
			border-radius: 5px;
			text-align: center;
		}
	}
</style>
