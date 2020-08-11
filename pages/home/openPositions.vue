<template>
	<view class="">

		<view class="titleLabel">职位名称</view>
		<view class="top_zw">
			<input class="top_zw_content" type="text" value="" placeholder="请填写您要招聘的职位" />
			<view class="top_zw_type" @tap="handleTap('picker')">
				{{jobType}}
			</view>
			<view class="top_zw_imgView" @tap="handleTap('picker11')">
				<image class="top_zw_img" src="../../static/login/star3.png" mode=""></image>
			</view>
			<lb-picker ref="picker11" v-model="jobType" mode="selector" :list="typeList">
			</lb-picker>
		</view>

		<view class="titleLabel">经验要求</view>
		<view class="input_text" @tap="handleTap('picker12')">
			<view class="input_text_content">
				{{year.length>0?year:'经验要求'}}
			</view>
			<view class="input_text_imgView">
					<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker ref="picker12" v-model="year" mode="selector" :list="yearList">
		</lb-picker>
		
		
		<view class="titleLabel">学历要求</view>
		<view class="input_text" @tap="handleTap('picker13')">
			<view class="input_text_content">
				{{xl.length>0?xl:'学历要求'}}
			</view>
			<view class="input_text_imgView">
					<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker ref="picker13" v-model="xl" mode="selector" :list="xlList">
		</lb-picker>
		
		<view class="titleLabel">职位月薪</view>
		<view class="input_text" @tap="handleTap('picker113')">
			<view class="input_text_content">
				{{money.length>0?money:'学历要求'}}
			</view>
			<view class="input_text_imgView">
					<image class="input_text_imgView_img" src="../../static/login/star3.png" mode=""></image>
			</view>
		</view>
		<lb-picker ref="picker113" v-model="money" mode="selector" :list="moneyList">
		</lb-picker>
		

		<view class="line"></view>

		<view class="titleLabel">职位描述</view>
		<textarea class="zw_textarea" value="" placeholder="请填写职位描述" />

		<view class="titleLabel">上班位置</view>
		<input class="input_text" type="text" value="" placeholder="请填写上班位置"/>

		<view class="line"></view>
		
		<view class="titleLabel">简历接收邮箱（选填）</view>
		<input class="input_text" type="text" value="" placeholder="填写邮箱"/>
		
		<view class="titleLabel">职位福利（选填）</view>
		<input class="input_text" type="text" value="" placeholder="如(年底双薪)"/>
		
		<view class="bottom_view">
			<view class="bottom_view_title">
				招聘人数
			</view>
			<view class="bottom_view_complateView">
				<view class="bottom_view_complateView_minus" @click="minus()">
					-
				</view>
				
				<input class="bottom_view_complateView_content" type="text" :value="personNum" />
				<view class="bottom_view_complateView_add" @click="add()">
					+
				</view>
			</view>
		</view>
		
		<view class="bottom_btn" >立即发布</view>
		
	</view>



</template>

<script>
	export default {
		data() {
			return {
				value2: [], //公司所在地
				typeList: ['全职', '兼职'],
				yearList: ['无经验要求','一年经验以上','二年经验以上','三年经验以上','五年经验以上'],
				xlList:['无学历要求','大专以上','本科以上','硕士以上'],
				moneyList:['5000-8000','8000-12000','12000-15000','15000-20000','面议'],
				jobType: '全职',
				year:'',
				xl: '',
				money: '',
				personNum:1

			}
		},

		methods: {
			handleTap(picker) {
				this.$refs[picker].show()
				// console.log("handleTap");
			},
			handleChange(item) {
				// console.log('change::', item)
			},

		
			minus(){
				if(this.personNum !=1){
					this.personNum--
				}
			},
			
			add(){
				this.personNum++
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


	.top_zw {
		display: flex;
		margin: 0px 15px 15px 15px;
		border-radius: 5px;
		background-color: #f5f7f8;
		font-size: 14px;
		color: #666666;

		.top_zw_content {
			flex: 1;
			padding: 5px;
		}

		.top_zw_type {
			width: 40px;
			height: 30px;
			background-color: #e8654b;
			color: #FFFFFF;
			line-height: 30px;
			text-align: center;
			font-size: 14px;

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
		height:50px;
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
	
	
		
	
</style>
