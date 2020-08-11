<template>
	<view>
		<view class="topView">
			<view class="search">
				<view class="search_view">
					<image class="image_search" src="../../static/home/search.png" mode=""></image>
					<input class="input_v" type="text" v-model="searchValue" value="searchValue" placeholder="输入课程或老师关键字搜索相关课程"
					 confirm-type="search" @confirm="search()" />
				</view>

				<image class="top_fb" src="../../static/home/fzw.png" mode="" @click="gotoOpenPositions()"></image>
			</view>

			<view class="top_click_view">
				<view class="click_item" style="margin-left: 10px;">
					<view class="click_item_text" :class="[selectType==0?'select_textcolor':'']" @click="typeClick(0)">推荐</view>
					<view class="click_item_line" v-if="selectType==0"></view>
				</view>

				<view class="click_item">
					<view class="click_item_text" :class="[selectType==1?'select_textcolor':'']" @click="typeClick(1)">最新</view>
					<view class="click_item_line" v-if="selectType==1"></view>
				</view>

				<view class="click_none"></view>
				<view class="click_sx_view" @click="screenClick()">
					<view class="click_sx_title">筛选</view>
					<image class="click_sx_img" src="../../static/home/rc_sx.png" mode=""></image>
				</view>
			</view>
			<view class="top_line"></view>
		</view>
		
		<view class="content_view">
			<view class="content_item" v-for="(item,index) in data" :key ="index" @click="itemClick(item)">
				<view class="title">{{item.name}}</view>
				<view class="content_item_person_msg">{{item.age +'岁' +'&nbsp&nbsp' + item.workDuration+'&nbsp&nbsp'+item.xl+'&nbsp&nbsp'+item.salary}}</view>
				<view class="content_item_jobIntention">{{'求职意向：'+item.jobIntention}}</view>
				<view class="content_item_work_msgView" v-for="(childItem,index) in item.content" :key="index">
					<image class="content_item_work_msgView_img" src="../../static/home/company.png" mode=""></image>
					<view class="content_item_work_msgView_textView">
						<view class="content_item_work_msgView_textView_title">
							{{childItem.company +'&nbsp·&nbsp' +childItem.time}}
						</view>
						<view class="content_item_work_msgView_textView_job">
							{{childItem.job}}
						</view>
					</view>
				</view>
				<view class="certificate">
					<view class="certificate_item" v-for="(item1, index) in item.certificate" :key='index'>
						{{item1}}
					</view>
				</view>
				
				<view class="content_view_line"></view>
			</view>
		</view>
		
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectType: 0,
				data: [{
					name: '临小妹',
					age: '15',
					workDuration: '工作5年',
					xl: '本科',
					salary: '1万-1.5万',
					jobIntention: 'CRA',
					content: [{
						company: '临语堂（天津）健康管理有限公司',
						time: '2年6个月',
						job: 'CRA'
					}, {
						company: '临语堂（天津）健康管理有限公司',
						time: '3年6个月',
						job: 'PM'
					}],
					certificate: ['CRA', 'GCP证书']
				},
				{
					name: '临大妹',
					age: '15',
					workDuration: '工作5年',
					xl: '本科',
					salary: '1万-1.5万',
					jobIntention: 'CRA',
					content: [{
						company: '临语堂（天津）健康管理有限公司',
						time: '2年6个月',
						job: 'CRA'
					}, {
						company: '临语堂（天津）健康管理有限公司',
						time: '3年6个月',
						job: 'PM'
					}],
					certificate: ['CRA', 'GCP证书']
				}]
			}
		},
		methods: {
			typeClick(e) {
				this.selectType = e
			},
			
			screenClick(){
				uni.navigateTo({
					url:'./screening'
				})
			},
			
			gotoOpenPositions(){
				uni.navigateTo({
					url:'./openPositions'
				})
			},
				
			itemClick(item){
				uni.navigateTo({
					url:'./cvdetail'
				})
			}
		}
	}
</script>

<style lang="scss">
	.topView {
		position: fixed;
		top: 0px;
		width: 100%;
		height: 100px;
		background-color: #f3f3f3;

		.search {
			display: flex;
			width: 100%;
			height: 60px;
			align-items: center;

			.search_view {
				flex: 1;
				display: flex;
				margin: 10px 10px 10px 10px;
				height: 40px;
				background-color: #FFFFFF;
				align-items: center;
				border-radius: 20px;

				.image_search {
					width: 20px;
					height: 20px;
					margin-left: 10px;
				}

				.input_v {
					font-size: 14px;
					color: #666666;
					flex: 1;
					margin-left: 10px;
				}

			}


			.top_fb {
				width: 25px;
				height: 30px;
				margin-right: 15px;
			}
		}
	}

	.top_click_view {
		width: 100%;
		height: 40px;
		background-color: #FFFFFF;
		display: flex;
		text-align: center;
		font-size: 14px;
		color: #666666;

		.select_textcolor {
			color: #e8654b;
		}

		.click_item {
			// margin: 10px 0px 10px 10px;
			width: 50px;
			text-align: center;

			// line-height: 45px;
			.click_item_text {
				line-height: 38.5px;
			}

			.click_item_line {
				width: 30px;
				height: 1.5px;
				margin-left: 10px;
				background-color: #e8654b;
			}

		}

		.click_none {
			flex: 1;
		}

		.click_sx_view {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 15px;

			.click_sx_title {}

			.click_sx_img {
				width: 10px;
				height: 12px;
				margin-left: 2px;
			}
		}
	}


	.top_line {
		width: 100%;
		height: 1px;
		background-color: #f3f3f3;
	}
	
	.content_view{
		margin-top: 101px;
		width: 100%;
		
		.content_item{
			padding: 15px;
			
			.content_item_title{
				font-size: 19px;
				color: #000000;
				line-height: 35px;
			}
			.content_item_person_msg{
				font-size: 14px;
				color: #4c4c4c;
				line-height: 25px;
			}
			.content_item_jobIntention{
				font-size: 14px;
				color: #cccccc;
				line-height: 20px;
			}
			
			.content_item_work_msgView{
				display:  flex;
				// align-items: center;
				margin: 10px 10px 10px 0px;
				.content_item_work_msgView_img{
					// margin: 10px;
					
					margin-top: 5px;
					margin-right: 15px;
					width: 20px;
					height: 20px;
					// background-color: #000000;
				}
				
				.content_item_work_msgView_textView{
					flex: 1;
					height: 40px;
					margin-right: 10px;
					font-size: 14px;
					.content_item_work_msgView_textView_title{
						line-height: 20px;
						color: #4c4c4c;
					}
					.content_item_work_msgView_textView_job{
						line-height: 20px;
						color: #cccccc;
					}
				}
			}
		}
	}
	
	.certificate{
		display: flex;
		width: 100%;
		
		.certificate_item{
			background-color: #fbc9bc;
			color: #e8654b;
			font-size: 14px;
			border-radius: 5px;
			padding: 2px 10px;
			margin-left: 10px;
			
		}
	}
	
		
	.content_view_line{
		margin-top: 20px;
		width: 100%;
		height: 1px;
		background-color: #f3f3f3;
	}
	
</style>
