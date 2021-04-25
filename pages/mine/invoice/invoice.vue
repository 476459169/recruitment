<template>
	<view>
		
		<view class="top_line">
			
		</view>
		<view class="list">
			<view class="" v-for="(item,index) in  dataArr" :key="index">
				<view class="cell_content" @click="itemSelect(item)">
					<image class="cell_content_img" :src="[item.isSelected?'../../../static/mine/tb_selected.png':'../../../static/mine/tb_normal.png']" mode="" ></image>
					<view class="cell_content_msg">
						<view class="cell_content_msg_time">
							{{item.time}}
						</view>
						<view class="cell_content_msg_name">
							{{item.name}}
						</view>
					</view>
					
					<view class="cell_right_view">
						<view class="cell_right_view_order">
							订单号：{{item.orderNum}}
						</view>
						<view class="cell_right_view_money">
							￥{{item.money}}
						</view>
					</view>
				</view>
				
				<view class="line"></view>
			</view>
		</view>
		
		<view class="bottom_view">
			<view class="bottom_view_fixed">
				<view class="bottom_view_fixed_money">
					<text class="bottom_view_fixed_money_o">{{selectNum}}</text>个订单，共<text class="bottom_view_fixed_money_o">{{sumMoney}}</text>元
				</view>
				<view class="line">
					
				</view>
				<view class="bottom_view_selectView">
					<image class="bottom_view_selectView_selectAllBtn" :src="[selectAll?'../../../static/mine/tb_selected.png':'../../../static/mine/tb_normal.png']" mode="" @click="selectAllitem()"></image>
					<view class="bottom_view_selectView_text">
						全选
					</view>
					<view class="bottom_view_selectView_nextbtn" @click="nextClick()">
						下一步
					</view>
				</view>
			</view>
			
		</view>
		
		<view class="pushBtn" @click="invoiceHeader()">
			发票抬头
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				zwf:'\u0020',
				selectNum:0,
				sumMoney:0,
				selectAll:false,
				selectArr:[],
				dataArr:[{
					id:1,
					time:'2020-03-19',
					isSelected:false,
					name:'年卡A套餐',
					orderNum:'139048284',
					money:199
				},
				{
					id:2,
					time:'2020-03-19',
					isSelected:false,
					name:'年卡A套餐',
					orderNum:'139048284',
					money:199
				},
				{
					id:3,
					time:'2020-03-19',
					isSelected:false,
					name:'年卡A套餐',
					orderNum:'139048284',
					money:199
				}]
			};
		},
		
		methods:{
			itemSelect(item){
				item.isSelected = !item.isSelected
				if(item.isSelected){
					this.selectNum++
					this.sumMoney = this.sumMoney +item.money
					this.selectArr.push(item)
				}else{
					this.selectNum--
					this.sumMoney = this.sumMoney -item.money
					
					var index = this.selectAll.indexOf(item)
					this.selectArr.splice(index,1)
				}
			},
			
			selectAllitem(){
				this.selectAll = !this.selectAll
				this.sumMoney = 0
				this.selectNum = 0
				
				this.selectArr=[]
				if(this.selectAll){
					for (let i = 0; i < this.dataArr.length; i++) {
					    var item =	this.dataArr[i]
						item.isSelected = true
						this.sumMoney = this.sumMoney +item.money
						this.selectArr.push(item)
					}
					this.selectNum = this.dataArr.length
				}else{
					for (let i = 0; i < this.dataArr.length; i++) {
					    var item =	this.dataArr[i]
						item.isSelected = false
						this.selectArr = []
					}
				}
				
			},
			
			nextClick(){
				uni.navigateTo({
					url:'./outInvoice?data='+encodeURIComponent(JSON.stringify(this.selectArr))
				})
			},
			
			invoiceHeader(){
				uni.navigateTo({
					url:'./invoiceHeader'
				})
			}
		}
	}
</script>

<style lang="scss">
		
	.list{
		margin: 1px 0px 70px 0px;
		.cell_content{
			margin-top: 5px;
			padding: 10px;
			display: flex;
			align-items: center;
			.cell_content_img{
				width: 15px;
				height: 15px;
				margin-right: 5px;
			}
			.cell_content_msg{
				flex: 1;
				margin-left: 5px;
				.cell_content_msg_time{
					font-size: 10px;
					color: #666666;
					height: 15px;
					line-height: 15px;
				}
				.cell_content_msg_name{
					font-size: 14px;
					color: #000000;
					height: 25px;
					line-height: 25px;
				}
			}
			
			.cell_right_view{
				.cell_right_view_order{
					font-size: 10px;
					color: #666666;
					height: 15px;
					line-height: 15px;
				}
				.cell_right_view_money{
					font-size: 14px;
					color: #000000;
					height: 25px;
					line-height: 25px;
				}
			}
			
		}
	}
	
	
	.bottom_view{
		width: 100%;
		.bottom_view_fixed{
			position: fixed;
			bottom: 0px;
			width: 100%;
			background-color: #f5f7f8;
			.bottom_view_fixed_money{
				font-size: 10px;
				height: 25px;
				line-height: 25px;
				margin-left: 10px;
				color: #333333;
			}
			
			.bottom_view_fixed_money_o{
				color: #e8654b;
			}
			
			.bottom_view_selectView{
				height: 50px;
				width: 100%;
				display: flex;
				align-items: center;
				.bottom_view_selectView_selectAllBtn{
					width: 15px;
					height: 15px;
					margin-left: 10px;
					margin-right: 10px;
				}
				
				.bottom_view_selectView_text{
					font-size: 14px;
					color: #333333;
					flex: 1px;
				}
				
				.bottom_view_selectView_nextbtn{
					width: 70px;
					height: 30px;
					border-radius: 5px;
					background-color: #e8654b;
					text-align: center;
					line-height: 30px;
					color: #FFFFFF;
					font-size: 14px;
					margin-right: 10px;
				}
			}
		}
		
		
	}
	
	.line{
		margin: 0px;
		height: 1px;
		background-color: #e6e6e6;
	}
	
	.top_lint{
		position: fixed;
		top: 0px;
		width: 100%;
		height: 1px;
		background-color: #e6e6e6;
	}
	
	.pushBtn {
		position: fixed;
		bottom: 80px;
		right: 0px;
		width: 40px;
		height: 40px;
		background-color: #e8654b;
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px; //右下角
		color: #FFFFFF;
		font-size: 14px;
		line-height: 20px;
		text-align: center;
		padding: 4px;
		box-shadow:3px 3px 3px #888888 ;
	}
</style>
