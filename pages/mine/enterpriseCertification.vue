<template>
	<view class="">
		<view class="top_view">
			<!-- <view class="top_img"></view> -->
			<image class="top_view_img" :src="topPicStr.length>0?topPicStr:dataInf.headImgUrl?baseUrl+dataInf.headImgUrl:'../../static/login/addPic.png' "
			 @click="topPictureClick()"></image>
		</view>

		<view class="titleLabel">公司全称</view>
		<input class="input_text" type="text" value="" v-model="dataInf.fullName" />

		<view class="titleLabel">公司简称</view>
		<input class="input_text" type="text" value="" v-model="dataInf.abbrName" />

		<view class="titleLabel">公司邮箱</view>
		<input class="input_text" type="text" value="" v-model="dataInf.email" />


		<view class="titleLabel">公司所在地</view>
		<view class="address_view">
			<view class="address_item" @tap="handleTap('picker2')">
				<view class="address_content">{{location.length>0?location.join('-'):dataInf.location.length>0?dataInf.location:''}}</view>
				<view class="address_img">
					<image class="add_itemImg" src="../../static/login/star3.png" mode=""></image>
				</view>

				<lb-picker ref="picker2" v-model="location" mode="multiSelector" :list="list" :level="3" @change="handleChange">
				</lb-picker>
			</view>
		</view>

		<view class="titleLabel">详细地址</view>
		<textarea class="address_detail_msg" value="" v-model="dataInf.address" />

		<view class="titleLabel"  >公司规模</view>
		  <view class="company" @tap="handleTap('picker311')">
		  	<view class="company_content">{{dataInf.selCompanyNatureContent}}</view>
		  	<view class="company_imgView">
				<image class="company_img" src="../../static/login/star3.png" mode=""></image>
			</view>
			
		  </view>
		<lb-picker ref="picker311" :props="myProps" mode="multiSelector" level='1' :list="dataInf.companyNatureArr" @confirm="handleConfirm2">
		</lb-picker>
		
		
		<view class="titleLabel"  >公司类型</view>
		  <view class="company" @tap="handleTap('picker3111')">
		  	<view class="company_content">{{dataInf.selScopeContent}}</view>
		  	<view class="company_imgView">
				<image class="company_img" src="../../static/login/star3.png" mode=""></image>
			</view>
			
		  </view>
		<lb-picker ref="picker3111" :props="myProps" mode="multiSelector" level='1' :list="dataInf.scopeArr" @confirm="handleConfirm1">
		</lb-picker>

        <view class="titleLabel">公司简介</view>
		<textarea class="address_detail_msg" value="" v-model="dataInf.intro"/>
		
		<view class="itemview">
			<view class="itemview_title">证书照片</view>
			<image class="itemview_picture" :src="picStr.length>0?picStr:dataInf.businessLicenseUrl?baseUrl+dataInf.businessLicenseUrl:'../../static/mine/addpicture.png' "
			 mode="widthFix" @click="pictureClick()"></image>
		</view>
		
		
		<button class="bottom_btn" @click="okClick()">认证</button>
	</view>
	
	
	
</template>

<script>
	import areaData from '../login/area-data-min.js'
	var _this
	export default {
		data(){
			return {
				myProps: {
					label: 'content',
					value: 'id',
					children: 'child'
				},
				value2: [], //公司所在地
				companyList:['1-50人','50-100人','100-500人','500人以上'],
				companyScale:'1-50人',
				list: areaData,
				topPicStr:'',
				location:[],
				picStr:'',
				baseUrl:'',
				dataInf:Object
				
			}
	},
	onLoad() {
		_this = this
			this.baseUrl = getApp().globalData.baseUrl
			this.getData()
	},

		methods: {
			
				
			getData(){
					var loginkey = uni.getStorageSync('loginKey');
					if (loginkey) {
						this.$api.post('zpapp/enterprise!ajaxGetEnterpriseInfo.action', {
							loginKey: loginkey
						}).then(res => {
							if (res.res.status == 0) {
							this.dataInf = res.inf
							
							} else {
								
				
							}
						})
				
					} else {
				
					}
				
				
			},
			
			handleConfirm1(e){
				this.dataInf.selScopeContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('selScopeId=' + e.item[i].id);
						this.dataInf.selScopeId = e.item[i].id
					} else {
							
							
					}
				}
			},
			
			handleConfirm2(e){
				this.dataInf.selCompanyNatureContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('selCompanyNatureId=' + e.item[i].id);
						this.dataInf.selCompanyNatureId = e.item[i].id
					} else {
							
							
					}
				}
			},
			handleTap (picker) {
				this.$refs[picker].show()
				// console.log("handleTap");
			},
			handleChange (item) {
				// console.log('change::', item)
			},
			
			okClick(){
				var loginkey = uni.getStorageSync('loginKey');
				if(this.topPicStr.length>0){
					uni.uploadFile({
						url: this.baseUrl + 'zpapp/enterprise!ajaxUpdateEnterpriseHeadImg.action', //仅为示例，非真实的接口地址
						filePath: _this.topPicStr ? _this.topPicStr : _this.dataInf.headImgUrl ? _this.baseUrl + _this.dataInf.headImgUrl : '../../static/login/addPic.png',
						name: 'headImgFile',
						formData: {
							'loginKey':loginkey
						},
						success: (uploadFileRes) => {
							_this.updata()
						
						}
					})
				}else{
					_this.updata()
				}	
			},
			
			updata(){
				
				
				console.log('location = '+this.dataInf.location);
				var loginkey = uni.getStorageSync('loginKey');
				if(this.picStr.length>0){
					uni.uploadFile({
						url: this.baseUrl + 'zpapp/enterprise!ajaxUpdateEnterpriseInfo.action', //仅为示例，非真实的接口地址
						filePath: _this.picStr ? _this.picStr : _this.dataInf.businessLicenseUrl ? _this.baseUrl + _this.dataInf.businessLicenseUrl : '../../static/login/addPic.png',
						name: 'businessLicenseImgFile',
						formData: {
							'loginKey':loginkey,
							'enterpriseInfo':JSON.stringify({
						address:this.dataInf.address,
						abbrName:this.dataInf.abbrName,
						fullName:this.dataInf.fullName,
						selScopeId:this.dataInf.selScopeId,
						intro:this.dataInf.intro,
						location:this.location.length>0?this.location.join('-'):this.dataInf.location.length>0?this.dataInf.location:'',
						email:this.dataInf.email, 
						selCompanyNatureId:this.dataInf.selCompanyNatureId 
					})
						},
						success: (uploadFileRes) => {
							uni.showToast({
								title: "上传成功",
								success() {
									uni.navigateBack({
										
									})
								}
							})
						}
					
					})
				}else{
					
							
							if (loginkey) {
								this.$api.post('zpapp/enterprise!ajaxUpdateEnterpriseInfo.action', {
									loginKey: loginkey,
									enterpriseInfo:JSON.stringify({
										address:this.dataInf.address,
										abbrName:this.dataInf.abbrName,
										fullName:this.dataInf.fullName,
										selScopeId:this.dataInf.selScopeId,
										intro:this.dataInf.intro,
										location:this.location.length>0?this.location.join('-'):this.dataInf.location.length>0?this.dataInf.location:'',
										email:this.dataInf.email,
										selCompanyNatureId:this.dataInf.selCompanyNatureId
									})
								}).then(res => {
									if (res.res.status == 0) {
									uni.showToast({
										title: "上传成功",
										success() {
											uni.navigateBack({
												
											})
										}
									})
						
									} else {
										
						
									}
								})
						
							} else {
						
							}
						
						
					
				}
			},
			
			topPictureClick(){
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success(response) {
						// 选择图片后, 返回的数据
						var fileUrl = response.tempFilePaths[0]
						console.log("用户点击了从图库上传222 =" + fileUrl);
						_this.topPicStr = fileUrl
					}
				})
			},
			
			pictureClick() {
				console.log("用户点击了从图库上传");
				uni.chooseImage({
					count: 1,
					sizeType: ["compressed"],
					success(response) {
						// 选择图片后, 返回的数据
						var fileUrl = response.tempFilePaths[0]
						console.log("用户点击了从图库上传222 =" + fileUrl);
						_this.picStr = fileUrl
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
		
		.top_view_img{
			width: 80px;
			height: 80px;
			border-radius: 40px;
			
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
	
	.itemview {
		padding: 15px;
	
		.itemview_title {
			height: 20px;
			line-height: 20px;
			font-size: 14px;
			color: #666666;
			margin-left: 5px;
		}
	
		.itemview_text {
			margin-top: 10px;
			height: 20px;
			line-height: 20px;
			border-radius: 5px;
			background-color: #f5f7f8;
			font-size: 14px;
			color: #666666;
			padding: 5px;
		}
	
		.itemview_picture {
			margin: 10px 0px;
			// background-size:contain|cover;
			width: 100%;
			height: auto;
			border-radius: 5px;
			background-color: #f5f7f8;
		}
	}
	
</style>
