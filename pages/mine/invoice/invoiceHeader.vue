<template>
	<view>
		<view class="item">
			<view class="item_title">
				公司名称：
			</view>
			<view class="item_normalValue">
				{{dataInf.enterpriseName}}
			</view>
		</view>
		<view class="item">
			<view class="item_title">
				公司税号 <text style="color: #e8654b;">*</text>
			</view>
			<input class="item_value" v-model="dataInf.taxNumber" type="text" value=""  placeholder="请填写纳税人识别号"/>
		</view>
		
		<view class="item">
			<view class="item_title">
				注册地址
			</view>
			<input class="item_value" v-model="dataInf.registerAddress" type="text" value="" placeholder="请填写公司注册地址"/>
		</view>
		
		<view class="item">
			<view class="item_title">
				注册电话
			</view>
			<input class="item_value" v-model="dataInf.registerTel" type="text" value="" placeholder="请填写公司注册电话"/>
		</view>
		<view class="item">
			<view class="item_title">
				开户银行
			</view>
			<input class="item_value" v-model="dataInf.bankAccount" type="text" value="" placeholder="请填写公司开户银行"/>
		</view>
		<view class="item">
			<view class="item_title">
				银行卡号
			</view>
			<input class="item_value"v-model="dataInf.bankCardNo" type="text" value="" placeholder="请填写公司银行卡号"/>
		</view>
		
		<view class="bottomview">
			<view class="bottomView_btnview" @click="save()">
				保存
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataInf:Object
			};
		},
		
		onLoad() {
			 this.getUserInfo()
		},
		methods:{
			getUserInfo() {
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/zpCardSetmeal!ajaxGetInvoiceHead.action', {
					loginKey: loginkey
			
				}).then(res => {
					if (res.res.status == 0) {
						this.dataInf = res.inf
					} else {
						this.logout()
					}
				})
			},
			save(){
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/zpCardSetmeal!ajaxUpdateInvoiceHead.action', {
					loginKey: loginkey,
					invoiceHeadInfo:JSON.stringify(this.dataInf)	
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
						this.logout()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.item{
		padding: 0px 10px;
		margin-top: 20px;	
		display: flex;
		align-items: center;
		.item_title{
			width: 70px;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			color: #333333;
		}
		.item_value{
			margin-left: 5px;
			padding: 5px;
			height: 20px;
			line-height: 20px;
			flex: 1;
			background-color: #f5f7f8;
			font-size: 14px;
			color: #333333;
		}
		.item_normalValue{
			margin-left: 5px;
			padding: 5px;
			height: 20px;
			line-height: 20px;
			flex: 1;
			background-color: #FFFFFF;
			font-size: 14px;
			color: #333333;
		}
	}
	
	.bottomview{
		height: 60px;
		width: 100%;
		display: flex;
		justify-content: center;
		.bottomView_btnview{
			position: fixed;
			bottom: 10px;
			width: 80%;
			border-radius: 5px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 14px;
			line-height: 40px;
			height: 40px;
			text-align: center;
		}
	}
</style>
