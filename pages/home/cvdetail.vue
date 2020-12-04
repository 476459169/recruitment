<template>
	<view class="">
		<view class="top_view">
			<view class="top_view_t">
				<view class="top_view_t_leftview">
					<view class="top_view_t_leftview_titleview">
						<view class="top_view_t_leftview_titleview_title">
							{{dataInf.userInfo.realName}}
						</view>
						<image class="top_view_t_leftview_titleview_img" :src="dataInf.userInfo.sex===1?'../../static/home/man.png':'../../static/home/woman.png'"
						 mode=""></image>
						<view class="top_view_t_leftview_titleview_mes">
							随时到岗
						</view>
					</view>
					<view class="top_view_t_leftview_detailmsg">
						{{dataInf.userInfo.userAge+'&nbsp|&nbsp工作'+dataInf.userInfo.workYears+'&nbsp|&nbsp'+dataInf.education+'&nbsp|&nbsp'+dataInf.userInfo.livingLocation}}
					</view>
					<view class="top_view_t_leftview_detailmsg">
						{{dataInf.userInfo.hukouLocation}}
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
						{{dataInf.wantedIntention.expectedPosition}}
					</view>
					<!-- 	<view class="top_view_b_leftview_detailmsg">
						{{'互联网&nbsp|&nbsp医疗设备&nbsp|&nbsp零售/批发'}}
						{{dataInf.wantedIntention}}
					</view> -->
					<view class="top_view_b_leftview_adress">
						{{dataInf.wantedIntention.location}}
					</view>
				</view>

				<view class="top_view_b_rightview">
					{{dataInf.wantedIntention.expectedSalary}}
				</view>
			</view>
		</view>
		<view class="line"></view>

		<view class="work_experience">

			<view class="work_experience_bt">
				工作经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in dataInf.workExpArr" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.companyName}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.workDate}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.positionName+'&nbsp'+item.monthSalary}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.workDescription}}
					</view>
				</view>
			</view>
		</view>

		<view class="work_experience">
			<view class="work_experience_bt">
				教育经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in dataInf.educationArr" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.schoolName}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.studyDate}}
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.major+'&nbsp'+item.education}}
					</view>
				</view>
			</view>
		</view>

		<view class="work_experience">
			<view class="work_experience_bt">
				项目经历
			</view>
			<view class="work_experience_item" v-for="(item,index) in dataInf.projectExpArr" :key="index">
				<image class="work_experience_item_img" src="../../static/home/star.png" mode=""></image>
				<view class="work_experience_item_content">
					<view class="work_experience_item_content_blackText">
						{{item.companyName}}
					</view>
					<view class="work_experience_item_content_garytext">
						{{item.projectDate}}
					</view>
					<view class="work_experience_item_content_blackText">
						项目描述：
					</view>
					<view class="work_experience_item_content_blackText">
						{{item.description}}
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
					{{dataInf.selfEvaluation}}
				</view>
			</view>
		</view>


		<!-- <button class="bottom_btn" type="default">立即沟通</button>
		 -->
		<view class="bottom_btns">
			<view class="bottom_btns_btn" @click="notOk()">
				不合适
			</view>
			<view class="bottom_btns_btn" @click="invitation()">
				面试邀请
			</view>
			<view class="bottom_btns_btn_callme" @click="callme()">
				联系方式
			</view>
		</view>


		<popup-layer ref="popupRef" :direction="'top'" v-model="boolShow" style="background-color: #f5f7f8;">
			
			<view class="potitle">
				查看联系方式
			</view>
			<view class="" style="width: calc(100vw - 20px);margin-left: 10px;">
				<view class="popView_items">
					<view class="popView_items_title">
						真实姓名:
					</view>
					<view class="popView_items_content">
						{{userInf.realName}}
					</view>
				</view>
				<view class="popView_items">
					<view class="popView_items_title">
						手机号码:
					</view>
					<view class="popView_items_content">
						{{userInf.contactPhoneNum}}
					</view>
				</view>
				<view class="popView_items">
					<view class="popView_items_title">
						email:
					</view>
					<view class="popView_items_content">
						{{userInf.email}}
					</view>
				</view>
				
				<view class="popbtns">
					<view class="popbtn_item_left" @click="close()">
						关闭
					</view>
					<view class="popbtn_item_right" @click="callPhone()">
						拨打电话
					</view>
				</view>
				
				
			</view>
		</popup-layer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				dataInf: Object,
				resumeId: '',
				boolShow: false,
				userInf:Object
			}
		},
		onLoad(e) {
			this.id = e.id
			this.resumeId = e.resumeId
			this.getData()
		},
		methods: {
			getData() {

				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('zpapp/zpResume!ajaxGetDeliveryResumeDetail.action', {
					loginKey: loginkey,
					id: this.id,
					resumeId: this.resumeId
				}).then(res => {
					if (res.res.status == 0) {
						this.dataInf = res.inf
					} else {
						uni.showToast({
							title: res.res.errMsg,
						})
					}

				})
			},
			notOk() {
				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('zpapp/zpResume!ajaxSetUnsuitableStatus.action', {
					loginKey: loginkey,
					id: this.id,
				}).then(res => {
					if (res.res.status == 0) {
						uni.navigateBack({

						})
					} else {
						uni.showToast({
							title: res.res.errMsg,
						})
					}

				})
			},

			invitation() {
				uni.navigateTo({
					url: '../communication/sendInvitation?id=' + this.id + '&resumeId=' + this.resumeId
				})
			},
			callme() {
				let loginkey = uni.getStorageSync('loginKey')
				this.$api.post('zpapp/zpResume!ajaxGetUserContactInfo.action', {
					loginKey: loginkey,
					id: this.resumeId,
				}).then(res => {
					if (res.res.status == 0) {
						this.userInf = res.inf
						this.$refs.popupRef.show();
					} else {
						uni.showToast({
							title: res.res.errMsg,
						})
					}

				})
			},
			
				
			close(){
					this.$refs.popupRef.close();
			},
			
			callPhone(){
				wx.makePhoneCall({
					phoneNumber:this.userInf.contactPhoneNum
				})
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
					// align-items: center;

					.top_view_t_leftview_titleview_title {
						font-size: 16px;
					}

					.top_view_t_leftview_titleview_img {
						width: 10px;
						height: 10px;
						margin-left: 5px;
						border-radius: 5px;
						margin-top: 3px;
					}

					.top_view_t_leftview_titleview_mes {
						font-size: 10px;
						margin-left: 5px;
						color: #666666;
						line-height: 20px;
						height: 20px;
						margin-top: 5px;
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
				font-size: 12px;

				.work_experience_item_content_blackText {

					line-height: 20px;
					color: #666666;
					font-size: 12px;
				}

				.work_experience_item_content_garytext {
					// line-height: 20px;
					// height: 20px;

					line-height: 20px;
					color: #b3b3b3;
					font-size: 12px;
				}

			}
		}
	}

	.bottom_btn {
		background-color: #e8654b;
		color: #FFFFFF;
		font-size: 15px;
		border-radius: 5px;
		margin: 30px;
	}

	.bottom_btns {
		display: flex;
		margin: 30px 0px;
		align-items: center;

		.bottom_btns_btn {
			margin: 0px 10px;
			flex: 1;
			border: 1px solid #e8654b;
			border-radius: 5px;
			background-color: #fddfd6;
			color: #e8654b;
			font-size: 14px;
			text-align: center;
			line-height: 25px;
			height: 25px;
		}

		.bottom_btns_btn_callme {
			margin: 0px 10px;
			flex: 1;
			border: 1px solid #e8654b;
			border-radius: 5px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 14px;
			text-align: center;
			line-height: 25px;
			height: 25px;
		}
	}

	.popView_items {
		display: flex;
		padding: 5px 10px;

		.popView_items_title {
			font-size: 14px;
			color: #333333;
			line-height: 25px;
			height: 25px;
			flex: 1;
		}
		
		.popView_items_content{
			font-size: 14px;
			color: #666666;
			line-height: 25px;
			height: 25px;
		}
		
	}
	
	.potitle{
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #000000;
		height: 30px;
		line-height: 30px;
	}
	
	.popbtns{
		display: flex;
		align-items: center;
		width: 100%;
		margin-top: 20px;
		margin-bottom: 20px;
		.popbtn_item_left{
			margin: 0px 10px;
			flex: 1;
			border: 1px solid #e8654b;
			border-radius: 5px;
			background-color: #fddfd6;
			color: #e8654b;
			font-size: 14px;
			text-align: center;
			line-height: 25px;
		}
		
		.popbtn_item_right{
			margin: 0px 10px;
			flex: 1;
			border: 1px solid #e8654b;
			border-radius: 5px;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 14px;
			text-align: center;
			line-height: 25px;
			height: 25px;
		}
	}
</style>
