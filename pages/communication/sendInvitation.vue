<template>
	<view>

		<view class="topView">
			<view class="item_views">
				<view class="item_title">
					人才姓名：
				</view>
				<view class="item_name">
					{{dataInf.userName}}
				</view>
				<view class="item_title" style="margin-left: 15px;">
					邀请函模板
				</view>
				<view class="item" @tap="handleTap('pickerr1')">
					<view class="item_content">{{defaultPlateContent}}</view>
					<view class="item_imgView">
						<image class="item_img" src="../../static/login/star3.png" mode=""></image>
					</view>
				</view>
				<lb-picker ref="pickerr1" :props="myProps" mode="multiSelector" level='1' :list="dataInf.invitationCardArr"
				 @confirm="handleConfirm1"></lb-picker>

			</view>
		</view>

		<textarea class="text_content" maxlength="-1" cursor-spacing="1"  v-model="dataInf.defaultResponsibility" />

		<view class="bottom_view">
			<view class="bottom_view_leftview" @click="save()">
				保存
			</view>
			<view class="bottom_view_rightview" @click="send()">
				发送
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				myProps: {
					label: 'title',
					value: 'id',
					children: 'child'
				},
				id:'',
				dataInf:Object,
				defaultPlateContent:'',
				resumeId:''
				
			};
		},
		
		onLoad(e) {
			this.id = e.id
			this.resumeId=e.resumeId
			this.getListArr()
		},
		methods:{
				
			getListArr(){
					
						var loginkey = uni.getStorageSync('loginKey');
						if (loginkey) {
							this.loginKey = loginkey;
							this.$api.post('zpapp/zpResume!ajaxGetSendInvitationCard.action', {
								loginKey: loginkey,
								id:this.id
							}).then(res => {
								if (res.res.status == 0) {
									this.dataInf = res.inf
									
									for (let i = 0; i < res.inf.invitationCardArr.length; i++) {
										var item = res.inf.invitationCardArr[i]
										if(item.isDefault ===1){
											this.defaultPlateContent = item.title
											console.log('defaultPlateContent='+item.responsibility);
										}
									}
								} else {
									uni.showToast({
										title:res.res.errMsg
									})
								}
							})
						} 
					
				
			},
			handleTap(picker) {
				this.$refs[picker].show()
			},
			
			handleConfirm1(e){
				this.defaultPlateContent = e.value.map(item => item).join('-');
				for (var j = 0; j < this.dataInf.invitationCardArr.length; j++) {
					var item = this.dataInf.invitationCardArr[j]
					if(item.title === this.defaultPlateContent){
						this.dataInf.defaultId = item.id
						this.dataInf.defaultResponsibility = item.responsibility
						
						console.log('classificationContent=' + item.id);
					}
				}
			},
			
			save(){
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey) {
					this.loginKey = loginkey;
					this.$api.post('zpapp/zpResume!ajaxUpdateInvitationResponsibility.action', {
						loginKey: loginkey,
						id:this.dataInf.defaultId,
						invitationCardResposibility:this.dataInf.defaultResponsibility
					}).then(res => {
						if (res.res.status == 0) {
							uni.showToast({
								title:'保存成功'
							})
						} else {
							uni.showToast({
								title:res.res.errMsg
							})
						}
					})
				} 
				
			},
			
			send(){
				var loginkey = uni.getStorageSync('loginKey');
				if (loginkey) {
					this.loginKey = loginkey;
					this.$api.post('zpapp/zpResume!ajaxSendInvitationCardToUser.action', {
						loginKey: loginkey,
						id:this.id,
						resumeId:this.resumeId,
						invitationCardId:this.dataInf.defaultId,
						invitationCardResposibility:this.dataInf.defaultResponsibility
					}).then(res => {
						if (res.res.status == 0) {
							uni.showToast({
								title:'发送成功',
								success() {
									uni.navigateBack({
										
									})
								}
							})
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
		display: flex;
		margin-top: 10px; 
	}
	
	.item_views {
		margin-top: 10px;
		display: flex;
		align-items: center;
		padding: 10px;
		width: 100%;
		.item_title {
			margin-right: 10px;
			font-size: 14px;
			height: 20px;
			line-height: 20px;
		}
		
		.item_name{
			font-size: 14px;
			color: #333333;
			flex: 1;
		}
	
		.item {
			display: flex;
			margin: 0px 0px 0px 0px;
			border-radius: 5px;
			background-color: #f5f7f8;
			font-size: 14px;
			color: #666666;
	
			.item_content {
				// padding: 5px;
				width: 90px;
				height:30px ;
				line-height: 30px;
				padding-left: 5px;
	
			}
	
			.item_imgView {
				width: 30px;
				height: 30px;
				background-color: #e8654b;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px; //右下角
	
				display: flex;
				align-items: center;
				justify-content: center;
	
				.item_img {
					width: 8px;
					height: 5px;
				}
			}
	
		}
	}
	
	.text_content{
		background-color: #f5f7f8;
		border-radius: 5px;
		padding: 5px;
		font-size: 14px;
		width: calc(100vw - 30px);
		margin-left: 10px;
		height: 400px;
		
	}
	
	.bottom_view{
		margin-top: 10px;
		width: 100%;
		display: flex;
		.bottom_view_leftview{
			margin: 0px 10px;
			border: 1px solid #e8654b ;
			border-radius: 5px;
			background-color: #fddfd6;
			line-height: 25px;
			height: 25px;
			text-align: center;
			font-size: 14px;
			color: #e8654b;
			flex: 1;
		}
		
		.bottom_view_rightview{
			margin: 0px 10px;
			border: 1px solid #e8654b ;
			border-radius: 5px;
			background-color: #e8654b;
			line-height: 25px;
			height: 25px;
			text-align: center;
			font-size: 14px;
			color: #FFFFFF;
			flex: 1;
		}
	}
</style>
