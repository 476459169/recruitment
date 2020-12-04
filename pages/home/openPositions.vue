<template>
	<view class="">

		<view class="titleLabel">职位名称</view>

		<view class="top_topview">
			<view class="top_zw">
				<input class="top_zw_content" type="text" value="" v-model="dataInf.name" placeholder="请填写您要招聘的职位" />
			</view>

			<view class="top_view_select">
				<view class="top_zw_type" @tap="handleTap('picker11')">
					{{dataInf.worknatureContent?dataInf.worknatureContent:''}}
				</view>
				<view class="top_zw_imgView" @tap="handleTap('picker11')">
					<image class="top_zw_img" src="../../static/login/star3.png" mode=""></image>
				</view>
			</view>
		</view>
		<lb-picker :props="myProps" ref="picker11" mode="multiSelector" level='1' :list="listInfo.worknatureArr" @confirm="zwTypehandleConfirm">
		</lb-picker>


		<view class="titleLabel">经验要求</view>
		<view class="input_text" @tap="handleTap('picker12')">
			<view class="input_text_content">
				{{dataInf.experienceContent.length>0?dataInf.experienceContent:''}}
			</view>
			<view class="input_text_imgView">
				<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker :props="myProps" ref="picker12" mode="multiSelector" level='1' :list="listInfo.experienceArr" @confirm="experiencehandleConfirm">
		</lb-picker>


		<view class="titleLabel">学历要求</view>
		<view class="input_text" @tap="handleTap('picker13')">
			<view class="input_text_content">
				{{dataInf.educationContent.length>0?dataInf.educationContent:''}}
			</view>
			<view class="input_text_imgView">
				<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker :props="myProps" ref="picker13" mode="multiSelector" level='1' :list="listInfo.educationArr" @confirm="xlhandleConfirm">
		</lb-picker>

		<view class="titleLabel">职位月薪</view>
		<view class="input_text" @tap="handleTap('picker113')">
			<view class="input_text_content">
				{{dataInf.salaryContent.length>0?dataInf.salaryContent:''}}
			</view>
			<view class="input_text_imgView">
				<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker :props="myProps" ref="picker113" mode="multiSelector" level='1' :list="listInfo.salaryArr" @confirm="salaryhandleConfirm">
		</lb-picker>


		<view class="line"></view>

		<view class="titleLabel">工作职责</view>
		<textarea class="zw_textarea" v-model="dataInf.jobResponsibility" maxlength="-1" cursor-spacing="0" value=""
		 placeholder="请填写职位描述" />



		<view class="titleLabel">任职要求</view>
		<textarea class="zw_textarea" v-model="dataInf.jobRequirement" maxlength = "-1" cursor-spacing="0" value="" placeholder="请填写职位描述" />

		<view class="titleLabel">公司福利</view>
		<view class="fl">
			<view class="fl_item" v-for="(item,index) in listInfo.benefitArr" :key="index" @click="flitemSelect(item)">
				<view  :class="[item.isSelected ?'fl_item_btnSelected':'fl_item_btnNormal']">
					
				</view>
				<view :class="[item.isSelected ?'fl_item_textSelected':'fl_item_textNormal']">
					{{item.content}}
				</view>
			</view>
		</view>
		
		
		<view class="titleLabel">职能标签</view>
		<view class="fl">
			<view class="fl_item" v-for="(item,index) in listInfo.positionTagArr" :key="index" @click="itemSelect(item)">
				<view  :class="[item.isSelected ?'fl_item_btnSelected':'fl_item_btnNormal']">
					
				</view>
				<view :class="[item.isSelected ?'fl_item_textSelected':'fl_item_textNormal']">
					{{item.content}}
				</view>
			</view>
		</view>
		
		
		<view class="titleLabel">工作位置</view>
		<view class="input_text" @tap="handleTap('picker1212')">
			<view class="input_text_content">
				{{dataInf.location.length>0?dataInf.location.join('-'):''}}
			</view>
			<view class="input_text_imgView">
					<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker ref="picker1212" v-model="dataInf.location" mode="multiSelector" :list="list" :level="3"
		>
		</lb-picker>
		
		<textarea class="address_textarea"  v-model="dataInf.address" value="" placeholder="详细地址到门牌号" />
		
		
		
		<view class="bottom_view">
			<view class="bottom_view_title">
				招聘人数
			</view>
			<view class="bottom_view_complateView">
				<view class="bottom_view_complateView_minus" @click="minus()">
					-
				</view>
				
				<input class="bottom_view_complateView_content" type="text" :value="dataInf.recruitNum" />
				<view class="bottom_view_complateView_add" @click="add()">
					+
				</view>
			</view>
		</view>
		
		<view class="bottom_view_b">
			<view class="bottom_view_cz" @click="okClick('publish')">立即发布</view>
			<view class="bottom_view_qd" @click="okClick('save')">保存</view>
		</view>
		
	</view>



</template>

<script>
	
	import areaData from '../login/area-data-min.js'
	export default {
		data() {
			return {
				myProps: {
					label: 'content',
					value: 'id',
					children: 'child'
				},
				
				dataInf:{
					  educationContent:"",//所选学历内容
					  worknatureContent:"",//所选工作性质内容
					  experienceContent:"",//所选经验要求内容
					  salaryContent:"",//所选薪资要求内容
					  
					  experienceId:"",//所选经验要求id
					  worknatureId:"",//所选工作性质id
					  educationId:"",//所选学历要求id
					   salaryId:"",//所选薪资要求id
					   
					  name:"",//职位名称
					  location:"",//地点
					  recruitNum:"",//招聘人数
					  jobResponsibility:"",//职位职责
					  jobRequirement:"",//任职要求
					  benefitArr:[],//福利列表
					  positionTagArr:[],//标签列表
					  address:"",//详细地址
					  recruitNum:1,
					  benefitArr:[], //福利选中数组
					  positionTagArr:[] //标签选中数组
					  
					  
				},
				
				
				personNum:1,
				list:areaData,
				listInfo:Object,
				flSelectArr:[],
				tagArr:[],
				id:'',
				

			}
		},
		
		onLoad(e) {
			
			this.getListData()
			this.id = e.id
			if(this.id.length>0){
				this.getData()
			}
		},

		methods: {
			
			
			getListData(){
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/position!ajaxGetPostPositionDropdownInfo.action', {
					loginKey: loginkey,
				}).then(res => {
					if (res.res.status == 0) {
						 this.listInfo = res.inf
						this.dataInf.worknatureContent = this.listInfo.worknatureArr[0].content
						this.dataInf.worknatureId =  this.listInfo.worknatureArr[0].id
					} else {
						uni.showToast({
							title: res.res.error,
						})
							
					}
				})
			},
			
			getData(){
				var loginkey = uni.getStorageSync('loginKey');
				this.$api.post('zpapp/position!ajaxGetPositionInfo.action', {
					loginKey: loginkey,
					positionId:this.id
				}).then(res => {
					if (res.res.status == 0) {
						this.dataInf = res.inf
						this.dataInf.location = this.dataInf.location.split('-')
						this.listInfo.benefitArr = this.dataInf.benefitArr
						this.listInfo.positionTagArr = this.dataInf.positionTagArr
						this.dataInf.benefitArr = []
						this.dataInf.positionTagArr = []
						
						for (let i = 0; i < this.listInfo.benefitArr.length; i++) {
							var fl = this.listInfo.benefitArr[i]
							if(fl.isSelected ===1){
								this.dataInf.benefitArr.push(fl.id)
							}
						}
						for (let i = 0; i < this.listInfo.positionTagArr.length; i++) {
							var fl = this.listInfo.positionTagArr[i]
							if(fl.isSelected ===1){
								this.dataInf.positionTagArr.push(fl.id)
							}
						}
					} else {
						uni.showToast({
							title: res.res.error,
						})
							
					}
				})
			},
			
			handleTap(picker) {
				this.$refs[picker].show()
				// console.log("handleTap");
			},
			handleChange(item) {
				// console.log('change::', item)
			},
			
			
			okClick(e){
					var loginkey = uni.getStorageSync('loginKey');
					if(this.dataInf.location.length>0){
						this.dataInf.location = this.dataInf.location.join('-')
					}
					
					if(this.id){
						//更新
						this.$api.post('zpapp/position!ajaxUpdatePositionInfo.action', {
							loginKey: loginkey,
							type:e,
							positionId:this.id,
							positionInfo:JSON.stringify(this.dataInf)
						}).then(res => {
							if (res.res.status == 0) {
								uni.showToast({
									title:'上传成功',
									success() {
										uni.navigateBack({
											
										})
									}
								})
								
							} else {
								uni.showToast({
									title: res.res.errMsg,
								})
									
							}
						})
					}else{
						this.$api.post('zpapp/position!ajaxAddPosition.action', {
							loginKey: loginkey,
							type:e,
							positionInfo:JSON.stringify(this.dataInf)
						}).then(res => {
							if (res.res.status == 0) {
								uni.showToast({
									title:'上传成功',
									success() {
										uni.navigateBack({
											
										})
									}
								})
							} else {
								uni.showToast({
									title: res.res.errMsg,
								})
									
							}
						})
					}
					
				
			},
		
			
			zwTypehandleConfirm(e){
				this.dataInf.worknatureContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('worknatureId=' + e.item[i].id);
						this.dataInf.worknatureId = e.item[i].id
					} else {
							
							
					}
				}
			},
			experiencehandleConfirm(e){
				this.dataInf.experienceContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('selCompanyNatureId=' + e.item[i].id);
						this.dataInf.experienceId = e.item[i].id
					} else {
							
							
					}
				}
			},
			
				
			xlhandleConfirm(e){
				this.dataInf.educationContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('selCompanyNatureId=' + e.item[i].id);
						this.dataInf.educationId = e.item[i].id
					} else {
							
							
					}
				}
			},
			
			salaryhandleConfirm(e){
				this.dataInf.salaryContent = e.value.map(item => item).join('-');
				for (var i = 0; i < e.item.length; i++) {
					if (i == 0) {
						console.log('selCompanyNatureId=' + e.item[i].id);
						this.dataInf.salaryId = e.item[i].id
					} else {
							
							
					}
				}
			},
			
			flitemSelect(item){
				item.isSelected = !item.isSelected
				if(item.isSelected){
					this.dataInf.benefitArr.push(item.id)
					
				}else{
					this.dataInf.benefitArr.splice(this.dataInf.benefitArr.indexOf(item.id),1)
				}
			},

		itemSelect(item){
			item.isSelected = !item.isSelected
			if(item.isSelected){
				this.dataInf.positionTagArr.push(item.id)
				
			}else{
				this.dataInf.positionTagArr.splice(this.dataInf.positionTagArr.indexOf(item.id),1)
			}
		},
			minus(){
				if(this.dataInf.recruitNum !=1){
					this.dataInf.recruitNum
				}
			},
			
			add(){
				this.dataInf.recruitNum++
			}

		}
	}
</script>

<style lang="scss">
	.top_view {
		display: flex;
		justify-content: center;
		padding: 40px 40px 20px 40px;

		.top_img {
			width: 80px;
			height: 80px;
			border-radius: 40px;
			background-color: #000000;
		}

	}

	.titleLabel {
		font-size: 14px;
		color: #666666;
		padding: 10px 20px;
		margin-top: 10px;
		line-height: 15px;
	}

	.input_text {
		margin: 0px 15px;
		height: 20px;
		font-size: 14px;
		background-color: #f5f7f8;
		border-radius: 5px;
		display: flex;
		color: #666666;
		align-items: center;
		padding: 5px 0px 5px 5px;
		.input_text_content{
			flex: 1;
			// height: 20px;
		}
		
		.input_text_imgView{
			width: 30px;
			height: 30px;
			background-color: #e8654b;
			border-top-right-radius: 5px;
			border-bottom-right-radius: 5px; //右下角
			display: flex;
			align-items: center;
			justify-content: center;
			.input_text_imgView_img {
				width: 8px;
				height: 5px;
			}
		}
	}

	.top_topview{
		display: flex;
		margin: 0px;
		width: 100%;
		
		.top_zw {
			display: flex;
			margin: 0px 10px 15px 15px;
			border-radius: 5px;
			background-color: #f5f7f8;
			font-size: 14px;
			color: #666666;
			flex: 1;
		
			.top_zw_content {
				flex: 1;
				padding: 5px;
			}
		
		}
		
		.top_view_select{
			display: flex;
			margin-right: 10px;
			.top_zw_type {
				width: 40px;
				height: 30px;
				background-color: #f5f7f8;
				color: #333333;
				line-height: 30px;
				text-align: center;
				font-size: 12px;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
					
			}
					
			.top_zw_imgView {
				width: 30px;
				height: 30px;
				background-color: #e8654b;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px; //右下角
					
				display: flex;
				align-items: center;
				justify-content: center;
					
				.top_zw_img {
					width: 8px;
					height: 5px;
				}
			}
		}
		
	}

	

	
		
	.line{
		margin-left: 10px;
		margin-right: 10px;
		margin-top: 15px;
		height: 1px;
		background-color: #f5f7f8 ;
	}
	
	.zw_textarea{
		margin: 0px 15px;
		width: calc(100vw - 40px);
		height:120px;
		font-size: 14px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
	}
	
	.bottom_view{
		display: flex;
		padding: 15px;
		margin-top: 10px;
		align-items: center;
		.bottom_view_title{
			font-size: 14px;
			color: #000000;
			flex: 1;
		}
		
		.bottom_view_complateView{
			display: flex;
			border-radius: 5px;
			font-size: 14px;
			background-color:#f5f7f8 ;
			
			.bottom_view_complateView_add{
				
				width: 30px;
				height: 30px;
				background-color: #e8654b;
				border-top-right-radius: 5px;
				border-bottom-right-radius: 5px; //右下角
				text-align: center;
				line-height: 30px;
				color: #FFFFFF;
			}
			
			.bottom_view_complateView_content{
				width: 50px;
				line-height: 30px;
				text-align: center;
				color: #000000;
				font-size: 14px;
				height: 30px;
				
			}
				
			.bottom_view_complateView_minus{
				width: 30px;
				height: 30px;
				background-color: #e8654b;
				border-top-left-radius: 5px;
				border-bottom-left-radius: 5px;
				text-align: center;
				line-height: 30px;
				color: #FFFFFF;
			}
			
		}
		
		
	}
	
	.bottom_btn{
		background-color: #e8654b;
		color: #FFFFFF;
		font-size: 15px;
		border-radius: 5px;
		margin: 30px;
		text-align: center;
		line-height: 40px;
		height: 40px;
	}
	
		
	.fl{
		display: flex;
		flex-wrap:wrap;
		.fl_item{
			width: 25%;
			display: flex;
			height: 25px;
			// padding: 5px;
			// background-color: #FF0000;
			align-items: center;
			// justify-content: center;
			.fl_item_btnNormal{
				width: 5px;
				height: 5px;
				border: 1px solid #333333;
				margin-left: 10px;
			}
			.fl_item_btnSelected{
				width: 5px;
				height: 5px;
				border: 1px solid #e8654b;
				margin-left: 10px;
			}
			
			.fl_item_textNormal{
				font-size: 12px;
				margin-left: 3px;
				color: #333333;
			}
			.fl_item_textSelected{
				font-size: 12px;
				margin-left: 3px;
				color: #e8654b;
			}
		}
	}
	
	.address_textarea{
		margin: 10px 15px;
		width: calc(100vw - 40px);
		height:30px;
		font-size: 12px;
		background-color: #f5f7f8;
		padding: 5px;
		border-radius: 5px;
	}
	.bottom_view_b {
		margin-top: 30px;
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	
		.bottom_view_cz {
			border: 2px solid #e8654b;
			background-color: #fbc9bc;
			color: #e8654b;
			font-size: 14px;
			border-radius: 5px;
			// width: 40%;
			margin: 10px;
			flex: 1;
			height: 30px;
			text-align: center;
			line-height: 30px;
		}
	
		.bottom_view_qd {
			border: 2px solid #e8654b;
			border-radius: 5px;
			height: 30px;
			flex: 1;
			background-color: #e8654b;
			color: #FFFFFF;
			font-size: 14px;
			text-align: center;
			line-height: 30px;
			margin-right: 10px;
	
		}
	}
</style>
