<template>
	<div>
		<div class="index-page">
			<div class="pay-msg">
				<div class="pay-icon">
					<img src="./img/Group@3x.png" alt="">
				</div>
				<div class="pay-title">支付成功</div>
				<div class="pay-desc">您已成功支付￥5,000</div>
			</div>
			<div class="btn-warp">
				<div @click="detail()" class="button">返回查看订单详情</div>
			</div>
		</div>
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


			}
		},
		directives: {

		},
		watch: {

		},
		methods: {
			detail() {
				var orderCode = util.getQueryValue("orderCode")
				// this.$router.push({name :'detail', query: { orderCode:orderId }});
				location.href = location.origin + '/modules/myorder.html#/detail?orderCode=' + orderCode
			}
		},
		beforeMount() {
			$(document).attr('title', '支付成功');
		},

		mounted() {
			// console.log(this.$route.query.mobile);
			// this.$route.query.userid


			// return this.$nextTick(() => this.init());
		}
	};
</script>

<style scoped>
	.index-page {
		padding: 0 30px;
	}

	.index-page .pay-msg {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: solid 1px #E2E2E2;
		padding-top: 60px;
		padding-bottom: 30px;
	}

	.index-page .pay-msg>div {
		margin: 5px 0;
	}

	.index-page .pay-msg .pay-title {
		font-size: large;
		font-weight: bold;
	}

	.index-page .pay-msg .pay-icon img {
		width: 60px;
		height: 60px;
	}

	.btn-warp {
		padding: 38px 0;
	}

	.btn-warp .button {
		width: 100%;
		background-color: #B45F1A;
		color: white;
		text-align: center;
		height: 45px;
		line-height: 45px;
		border-radius: 4px;
	}
	.btn-warp .button:active{
		
	}
</style>
