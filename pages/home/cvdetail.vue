<template>
	<view class="">
		<view class="top_view">
			<view class="top_view_t">
				<view class="top_view_t_leftview">
					<view class="top_view_t_leftview_titleview">
						<view class="top_view_t_leftview_titleview_title">
							临小妹
						</view>
						<view class="top_view_t_leftview_titleview_img">

						</view>
						<view class="top_view_t_leftview_titleview_mes">
							随时到岗
						</view>
					</view>
					<view class="top_view_t_leftview_detailmsg">
						{{'26岁&nbsp|&nbsp工作5年&nbsp|&nbsp本科&nbsp|&nbsp北京-丰台区'}}
					</view>
					<view class="top_view_t_leftview_detailmsg">
						户籍吉林
					</view>
				</view>
				<view class="top_view_t_rightview">

				</view>
			</view>

			<view class="top_view_b">
				<view class="top_view_b_leftview">
					<view class="top_view_b_leftview_titleview">
						求职意向
					</view>
					<view class="top_view_b_leftview_wantjob">
						{{'产品经理 &nbsp&nbsp产品专员&nbsp&nbsp产品助理'}}
					</view>
					<view class="top_view_b_leftview_detailmsg">
						{{'互联网&nbsp|&nbsp医疗设备&nbsp|&nbsp零售/批发'}}
					</view>
					<view class="top_view_b_leftview_adress">
						北京
					</view>
				</view>

				<view class="top_view_b_rightview">
					1万-1.5万
				</view>
			</view>
		</view>
		<view class="line"></view>

		<view class="work_experience">

			<view class="work_experience_bt">
				工作经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in data.workExperience" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.company}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.workTime}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.job+'&nbsp'+item.salary}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.workMsg}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="work_experience">
			<view class="work_experience_bt">
				教育经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in data.educationExperience" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.school}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.beginTime+'&nbsp'+item.endTime}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.subject+'&nbsp'+item.education}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="work_experience">
			<view class="work_experience_bt">
				项目经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in data.ProjectExperience" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.Project}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.beginTime+'&nbsp'+item.endTime}}
					</view>
					<view class="work_experience_item_content_blackText">
						项目描述：
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.ProjectDescription}}
					</view>
				</view>
			</view>
		</view>
		
		<view class="work_experience">
			<view class="work_experience_bt">
				自我评价
			</view>
			<view class="work_experience_item">
				<view class="work_experience_item_content_blackText" style="margin-left: 10px;">
					{{data.selfAssessment}}  
				</view>
			</view>
		</view>
		
		
		<button class="bottom_btn" type="default">立即沟通</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data: {
					name: '临小妹',
					age: '26岁',
					worktime: '工作5年',
					xl: '本科',
					nowadress: '北京-丰台区',
					wantjob: '产品经理 产品专员',
					jobMes: '互联网',
					jobAdress: '北京',
					selfAssessment: '自我评价',
					workExperience: [{
							company: '临语堂（天津）健康管理有限公司',
							workTime: '2019年3月-至今',
							job: '产品经理',
							salary: '10k-15k',
							workMsg: '工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述'
						},
						{
							company: '临语堂（天津）健康管理有限公司',
							workTime: '2019年3月-至今',
							job: '经理',
							salary: '10k-15k',
							workMsg: '工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述工作描述'
						}
					],
					educationExperience: [{
							school: '吉林医学院',
							beginTime: '2010年09月',
							endTime: '2014年07月',
							subject: '药剂学',
							education: '本科'
						},
						{
							school: '吉林医学院',
							beginTime: '2010年09月',
							endTime: '2014年07月',
							subject: '药剂学',
							education: '本科'
						}
					],
					ProjectExperience: [{
						Project: '上海国药会',
						beginTime: '2010年09月',
						endTime: '2014年07月',
						ProjectDescription: '文字描述···'

					}]


				}
			}
		}
	}
</script>

<style lang="scss">
	.line {
		margin: 10px 0px;
		height: 1px;
		background-color: #f5f7f8;
	}

	.top_view {
		padding: 10px;
		background-color: #FFFFFF;

		.top_view_t {
			display: flex;
			align-items: center;

			.top_view_t_leftview {
				display: flex;
				flex-direction: column;
				justify-content: center;
				// align-items: center;
				flex: 1;

				.top_view_t_leftview_titleview {
					display: flex;
					line-height: 25px;
					height: 25px;

					.top_view_t_leftview_titleview_title {
						font-size: 16px;
					}

					.top_view_t_leftview_titleview_img {
						width: 10px;
						height: 10px;
						border-radius: 5px;
						background-color: #000000;
					}

					.top_view_t_leftview_titleview_mes {
						font-size: 10px;
						color: #666666;
					}
				}

				.top_view_t_leftview_detailmsg {
					font-size: 12px;
					color: #666666;
					line-height: 25px;
					height: 25px;
				}

			}

			.top_view_t_rightview {
				width: 40px;
				height: 40px;
				border-radius: 25px;
				background-color: #000000;
			}
		}

		.top_view_b {
			display: flex;
			align-items: center;
			margin-top: 10px;

			.top_view_b_leftview {
				display: flex;
				flex-direction: column;
				justify-content: center;
				flex: 1;

				.top_view_b_leftview_titleview {
					display: flex;
					line-height: 25px;
					height: 25px;
					font-size: 14px;
				}

				.top_view_b_leftview_wantjob {
					font-size: 12px;
				}

				.top_view_b_leftview_detailmsg {
					font-size: 12px;
					color: #666666;
					line-height: 25px;
					height: 25px;
				}

				.top_view_b_leftview_adress {
					font-size: 12px;
					color: #666666;
					line-height: 25px;
					height: 25px;
				}


			}

			.top_view_b_rightview {
				color: #e8654b;
				font-size: 12px;
				text-align: center;
				line-height: 25px;
			}

		}
	}

	.work_experience {
		.work_experience_bt {
			font-size: 14px;
			line-height: 25px;
			margin-left: 10px;
		}

		.work_experience_item {
			font-size: 12px;
			display: flex;

			.work_experience_item_img {
				margin: 10px 0px 10px 10px;
				width: 20px;
				height: 20px;
				background-color: #FF0000;
				border-radius: 10px;
				// 
			}

			.work_experience_item_content {
				flex: 1;
				padding: 10px;

				.work_experience_item_content_blackText {

					line-height: 20px;
					color: #666666;
				}

				.work_experience_item_content_garytext {
					// line-height: 20px;
					// height: 20px;

					line-height: 20px;
					color: #b3b3b3;
				}

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
</style>
