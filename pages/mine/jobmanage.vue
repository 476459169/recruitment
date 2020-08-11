<template>
	<view>
		<view class="" v-for="(item,index) in data" :key="index">
			<view class="item">
				<view class="item_title">
					{{item.title}}
				</view>
				<view class="item_mes">
					<text class="item_mes_text">{{item.money}}</text>&nbsp|&nbsp<text class="item_mes_text">{{item.address}}</text>&nbsp|&nbsp <text class="item_mes_text">{{item.workTime}}</text>
				</view>

				<view class="item_btn_items">
					<view class="item_btn_items_btn">编辑</view>
					<view class="item_btn_items_btn">刷新</view>
					<view class="item_btn_items_btn">下架</view>
				</view>
			</view>
				<view class="line"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: [{
					title: 'CRA-北京',
					money: '7000-10000',
					address: '北京',
					workTime: '1-3年'
				}, {
					title: 'CRA-北京',
					money: '7000-10000',
					address: '北京',
					workTime: '1-3年'
				}, {
					title: 'CRA-北京',
					money: '7000-10000',
					address: '北京',
					workTime: '1-3年'
				}]
			}
		}
	}
</script>

<style lang="scss">
	.line {
		width: 100%;
		height: 3px;
		background-color: #e7e9ea;
	}

	.item {
		padding: 10px;

		.item_title {
			font-size: 16px;
			height: 30px;
			line-height: 30px;
		}

		.item_mes {
			font-size: 13px;
			height: 20px;
			line-height: 20px;
			color: #b3b3b3;
			.item_mes_text{
				color: #333333;
			}
		}

		.item_btn_items {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 40px;

			.item_btn_items_btn {
				width: 50px;
				height: 20px;
				color: #666666;
				border-radius: 18px;
				font-size: 12px;
				margin-left: 10px;
				border: 1px solid #666666;
				line-height: 20px;
				text-align: center;
			}
		}

	}
</style>
