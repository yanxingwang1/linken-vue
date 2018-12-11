<template>
	<div>
		<!-- <h1>支付方式选择</h1> -->
		<div class="cell-warp">
			<div class="cell-title">应付金额</div>
			<div class="cell-text">￥5,000</div>
		</div>
		<div style="height: 10px;background-color: #f5f5f5;"></div>
		<div class="title" style="padding: 0 20px;height: 60px;line-height: 60px;">选择支付方式</div>
		<div style="height: 2px;background-color: #f5f5f5;"></div>
		<div class="pay-cell-list">
			<div class="pay-cell-warp" @click="btnDsiabled=false;payStyle=1">
        <div class="pay-cell-check">
          <img v-if="payStyle===1" src="./img/Group@3x.png" alt="">
          <img v-else src="./img/OvalCopy@3x.png" alt="">
        </div>
				<div class="pay-cell-icon">
					<img src="./img/yinlian@3x.png" alt="">
				</div>
				<div class="pay-cell-title">中国银联</div>

			</div>
			<div class="pay-cell-warp" @click="btnDsiabled=false;payStyle=2">

        <div class="pay-cell-check">
          <img v-if="payStyle===2" src="./img/Group@3x.png" alt="">
          <img v-else src="./img/OvalCopy@3x.png" alt="">
        </div>
				<div class="pay-cell-icon">
					<img class="wx" src="./img/Fill1@3x.png" alt="">
				</div>
				<div class="pay-cell-title">微信</div>
			</div>
		</div>
		<div class="bottom-warp">
			<button :disabled="btnDsiabled" class="button primary" @click="apply()">去支付</button>
		</div>
		<div class="page-footer">该商城服务由用友汽车提供</div>
	</div>
</template>

<script>
	import util from '../../common/DMC.util'
	export default {
		name: "index",

		created() {
			end_time = new Date().getTime();
			console.log("index加载时间：", end_time - start_time, "ms");

		},
		beforeDestroy() {
			clearInterval(this.timer)
		},
		data() {
			return {
				payStyle: 0,
				btnDsiabled:true
			}
		},
		directives: {},
		watch: {

		},
		methods: {
			// 获取订单号
			test() {
				console.log('test')
				const params = {
					"authCode": "123",
					"dealerCode": "LK180101",
					"dealerName": "林肯中心",
					"delearAdress": "长宁",
					"delearPhone": "121212",
					"deposit": "0.01",
					"firstName": "名",
					"lastName": "姓",
					"phoneNum": "15201875715",
					"remark": "备注",
					"returnUrl": "https://lincoln-mp-dev.yonyouauto.com/modules/apply.html#/",
					"salesCaseId": "jmmr6l4oiy5gjcvryhwj47xd",
					"seriesName": "车型",
					"sex": 0
				};
				return new Promise((resolve, reject) => {
					this.http.post('createOrder', params, res => {
						//console.log('createOrder', res);
						if (res.resultCode == '1') {
							resolve(res.data);
						} else {
							alert(res.errMsg)
							reject()
						}
					})
				})


			},
			apply() {
				this.btnDsiabled = true;
				// this.test().then(data => {
					const params = {
						// "orderCode": data,
						"orderCode": util.getQueryValue("orderCode"),
						"payStyle": this.payStyle
					}
					console.log(params)
					// 更新订单时间
					this.updatatime();
					this.http.post("createOnlinepayOrder", params, res => {
						console.log(res)
						if (res.resultCode == '1') {

							if (this.payStyle === 1) { //银联
								console.log('银联')
								const data = JSON.parse(res.data);
								console.log(data.interfaceUrl, data)
								const params2 = {
									interfaceName: data.interfaceName,
									interfaceVersion: data.interfaceVersion,
									tranData: data.tranData,
									merSignMsg: data.signMsg,
									merCert: data.certs,
									clientType: data.clientType
								};
								this.postcall(data.interfaceUrl, params2);
							} else if (this.payStyle == 2) { //微信

								console.log('微信');
								const data = res.data;
								console.log(data)
								$('body').append($(data))
							}
						} else {
							alert(res.errMsg)
						}
						/*
						if (res.resultCode == '1') {
							location.href = res.data
						} else {
							alert(res.errMsg)
						}
						*/
					});
				// });
				/*
				return;
				var orderCode = util.getQueryValue("orderCode")
				var parmas = {
					"orderCode": orderCode,
					"payStyle": this.payStyle
				}
				// debugger
				this.http.post("createOnlinepayOrder", parmas, res => {
					//  debugger
					if (res.resultCode == '1') {
						location.href = res.data
					} else {
						alert(res.errMsg)
					}

				});
				*/
			},
			updatatime(){
				this.http.get('updateCancelTime', {'orderCode':util.getQueryValue("orderCode")}, res => {
						//console.log('createOrder', res);
						if (res.resultCode == '1') {
							return;
						} else {
							alert(res.errMsg)
						}
					})

			},
			applyYL() {

			},
			applyWX() {

			},
			// 模拟表单提交
			postcall(url, params, target) {
				var tempform = document.createElement("form");
				tempform.action = url;
				tempform.method = "post";
				tempform.style.display = "none"
				if (target) {
					tempform.target = target;
				}

				for (var x in params) {
					var opt = document.createElement("input");
					opt.name = x;
					opt.value = params[x];
					tempform.appendChild(opt);
				}

				var opt = document.createElement("input");
				opt.type = "submit";
				tempform.appendChild(opt);
				document.body.appendChild(tempform);
				tempform.submit();
				document.body.removeChild(tempform);
			}
		},
		beforeMount() {
			$(document).attr('title', '订单支付');
		},


		mounted() {
		}
	};
</script>

<style lang="sass" scoped>
	.cell-warp {
		display: flex;
		height: 80px;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;

		.cell-text {
			color: #B45F1A;
		}
	}

	.pay-cell-list {
		padding: 0 10px;

		.pay-cell-warp {
			display: flex;
			height: 80px;
			align-items: center;
			padding: 0 10px;
			border-bottom: 1px solid #f5f5f5;

			.pay-cell-icon,
			.pay-cell-check {
				width: 40px;
			}
      .pay-cell-check {
        margin-right: 30px
      }
			.pay-cell-icon img {
				width: 30px;
				height: 22px;
			}

			.pay-cell-title {
				padding-left: 25px;
				width: 100%;
			}

			.pay-cell-check img {
				width: 23px;
				height: 23px;
			}

			.pay-cell-icon img.wx {
				width: 22px;
				height: 22px;
			}
		}
	}




	.bottom-warp {
		position: relative;
		padding: 30px 40px;

		.button {
			width: 100%;
			background-color: #B45F1A;
			color: white;
			text-align: center;
			height: 45px;
			line-height: 45px;
			border: none;
			border-radius: 4px;
		}

		.button:active {
			background-color: #B45F1A * 0.8;
		}
		.button:disabled{
			background-color: #9F9F9F;
      color: white;
		}
	}

	.page-footer {
		position: absolute;
		width: 100%;
		height: 30px;
		bottom: 0;
		text-align: center;
		line-height: 30px;
		background-color: #F5F5F5;
		color: #B45F1A;
		font-size: 12px;
	}
</style>
