<template>
	<view>
		<!-- <input class="uni-input" cursor-spacing="0"/> -->

		<view class="titleLabel">邀请函名称</view>
		<input class="uni-input input_text" maxlength="-1" cursor-spacing="0" type="text" value="" v-model="dataInf.title" />

		<view class="titleLabel">工作职责</view>
		<textarea class="uni-input address_detail_msg" maxlength="-1" cursor-spacing="0" value="" v-model="dataInf.responsibility" />


		<view class="bottom_view">
			<view class="bottom_view_qd" @click="saveClick()">保存</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
				dataInf:{
					isDefault:'0',
					responsibility:'',
					title:'',
					id:''
				}
				
			};
		},
		
		onLoad(e) {
			this.id = e.id
			if(this.id.length>0){
				this.getData()
			}
		},
		
		methods:{
				
			getData(){
				var loginkey = uni.getStorageSync('loginKey');
						this.$api.post('zpapp/enterprise!ajaxGetInvitationCardInfo.action', {
							loginKey: loginkey,
							id:this.id
						}).then(res => {
							if (res.res.status == 0) {
							    this.dataInf = res.inf
											
							} else {
								uni.showToast({
									title: res.res.error,
								})
											
							}
						})
											
					

			},
			
			upData(){
				
					var loginkey = uni.getStorageSync('loginKey');
							this.$api.post('zpapp/enterprise!ajaxUpdateInvitationCardInfo.action', {
								loginKey: loginkey,
								invitaionCardInfo:JSON.stringify(this.dataInf)
							}).then(res => {
								if (res.res.status == 0) {
								   uni.showToast({
								   	title:'保存成功',
									success() {
										uni.navigateBack({
											
										})
									}
								   })
												
								} else {
									uni.showToast({
										title: res.res.error,
									})
												
								}
							})
												
						
				
				
			},
			
			saveClick(){
				
				if(this.id){
					if(this.id.length>0){
						this.upData()
					}
					
				}else{
					var loginkey = uni.getStorageSync('loginKey');
						this.$api.post('zpapp/enterprise!ajaxCreateInvitationCard.action', {
							loginKey: loginkey,
							invitationCardTitle:this.dataInf.title,
							invitationCardResposibility:this.dataInf.responsibility
							
						}).then(res => {
							if (res.res.status == 0) {
							    uni.showToast({
							    	title: "保存成功",
							    	success() {
							    		uni.navigateBack({
							    			
							    		})
							    	}
							    })
											
							} else {
								uni.showToast({
									title: res.res.error,
								})
											
							}
						})
				}
				
										
				
			}
		}
	}
</script>

<style lang="scss">
	
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
		color: #333333;
	}
	
	.address_detail_msg{
		margin: 0px 15px;
		width: calc(100vw - 40px);
		height:calc(100vh - 240px);
		font-size: 14px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
		color: #333333;
	}
	
	.bottom_view {
		position: fixed;
		bottom: 0px;
		height: 50px;
		display: flex;
		justify-content: center;
		width: 100%;
		z-index: 999;
	
		.bottom_view_cz {
			border: 2px solid #e8654b;
			background-color: #fbc9bc;
			color: #e8654b;
			font-size: 17px;
			border-radius: 5px;
			width: 80px;
			height: 30px;
			margin: 10px;
			text-align: center;
			line-height: 30px;
		}
	
		.bottom_view_qd {
			border: 2px solid #e8654b;
			border-radius: 5px;
			height: 30px;
			flex: 1;
			margin: 10px 10px 10px 10px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 17px;
			text-align: center;
			line-height: 30px;
	
		}
	}
</style>
