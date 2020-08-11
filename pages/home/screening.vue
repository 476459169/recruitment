<template>
	<view>

		<view class="title_view">
			简历状态
		</view>
		<view class="top_view">
			<view class="top_view_item" :class="[topSelect == item?'top_view_select_color':'']" v-for="(item,index) in topArr"
			 :key="index" @click="topItemClick(item)">
				{{item}}
			</view>
		</view>


		<view class="title_view" style="margin-top: 10px;">
			标签 <text style="color: #999999; font-size: 12px;">(多选)</text>
		</view>
		<view class="top_view">
			<view class="top_view_item" :class="[moreSelect.indexOf(item)!==-1?'top_view_select_color':'']"
			 v-for="(item,index) in bottomArr" :key="index" @click="moreSelectClick(item)">
				{{item}}
			</view>
		</view>

		<view class="bottom_view">
			<view class="bottom_view_cz">重置</view>
			<view class="bottom_view_qd">确定</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				topArr: ['已沟通', '已约面', '面试待接收', '面试已接收', '已面试', '未面试', '面试已拒绝', '不合适'],
				bottomArr: ['初选合格', '淘汰', '待约面试', '面试通过', '已发offer', '接收offer', '已入职', '已拒offer', '未接'],
				topSelect: '',
				moreSelect:[],
			}
		},
		methods: {

			topItemClick(item) {
				console.log("item = " + item);
				this.topSelect = item;
			},
			moreSelectClick(item){
				
				if (this.moreSelect.indexOf(item) == -1) {
					this.moreSelect.push(item)
				} else {
					var index1 = this.moreSelect.indexOf(item);
					this.moreSelect.splice(index1, 1)
				}
				
			}
		}
	}
</script>

<style lang="scss">
	.title_view {
		line-height: 20px;
		font-size: 17px;
		padding: 10px;
		margin-top: 10px;
	}



	.top_view {
		display: flex;
		flex-wrap: wrap;
		.top_view_item {
			background-color: #fbc9bc;
			color: #8f9291;
			font-size: 14px;
			border-radius: 5px;
			width: 30%;
			height: 25px;
			margin-top: 10px;
			margin-left: 10px;
			padding: 3px 0px;
			text-align: center;
			line-height: 25px;
		}
		
		.top_view_select_color {
			color: #e8654b;
		}
	}

	.bottom_view {
		position: fixed;
		bottom: 0px;
		height: 50px;
		display: flex;
		justify-content: center;
		width: 100%;

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
			margin: 10px 10px 10px 0px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 17px;
			text-align: center;
			line-height: 30px;

		}
	}
</style>
