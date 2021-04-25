<template>
	<view>
		<view class="topline"></view>
		<view class="list">
			<view class="" v-for="(item,index) in dataArr" :key = "index">
				<view class="cell" @click="cellClick(item)">
					<image class="cell_selectBtn" :src="[item.isSelected==true?'../../static/mine/tb_selected.png':'../../static/mine/tb_normal.png']" mode=""></image>
					<view class="cell_content">
						<view class="cell_content_titleview">
							<view class="cell_content_titleview_name">
								{{item.name}}
							</view>
							<view class="cell_content_titleview_salay">
								{{item.salaryRequirement}}
							</view>
						</view>
						<view class="cell_content_msg">
							{{item.location+zwf+'|'+zwf+item.experienceRequirement+zwf+'|'+zwf+item.educationRequirement}}
						</view>
					</view>
				</view>
				<view class="line">
					
				</view>
			</view>
		</view>
		
		<view class="bottomview">
			<view class="bottomView_btnview" @click="sendClick()">
				发送面试邀请
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				dataArr:[1,2,3],
				id:'',
				zwf:'\u0020',
				selectid:''
			};
		},
		
		onLoad(e) {
			this.id = e.id
			this.getdata()
		},
		
		methods:{
			
				
			getdata(){
				
					let loginkey = uni.getStorageSync('loginKey')
					this.$api.post('zpapp/position!ajaxGetUpPositionList.action', {
						loginKey: loginkey,
						id: this.id,
					}).then(res => {
						if (res.res.status == 0) {
							this.dataArr = res.inf.arr
						} else {
							uni.showToast({
								title: res.res.errMsg,
							})
						}
				
					})
				
			},
			cellClick(item){
				item.isSelected = !item.isSelected
				this.selectid = item.id
			},
			
				
			sendClick(){
				if(this.selectid.length>0){
					uni.navigateTo({
						url:'../communication/normalSendInvitation?id='+this.id+'&selectId='+this.selectid
					})
					
				}else{
					uni.showToast({
						title:'未选择职位'
					})
				}
				
				
			}
		}
	}
</script>

<style lang="scss">
	
	.list{
			
		.cell{
			display: flex;
			align-items: center;
			padding: 15px 10px;
			.cell_selectBtn{
				margin: 10px;
				width: 15px;
				height: 15px;
			}
			.cell_content{
				flex: 1;
				.cell_content_titleview{
					display: flex;
					.cell_content_titleview_name{
						font-size: 14px;
						color: #333333;
						flex: 1;
					}
					.cell_content_titleview_salay{
						font-size: 14px;
						color: #e8654b;
						margin-right: 10px;
					}
				}
				
				.cell_content_msg{
					font-size: 12px;
					color: #666666;
				}
			}
		}
	}
	.line{
		width: 100%;
		height: 2px;
		background-color: #f5f7f8;
		
	}
	
	.topline{
		width: 100%;
		height: 1px;
		background-color: #f5f7f8;
		position: fixed;
		top: 0px;
		z-index: 999;
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
