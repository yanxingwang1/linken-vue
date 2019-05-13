<!-- 欢迎语句 -->
<template>
  <div class="title">
    尊敬的
    {{
    ($route.query.from==='boundCar'?$route.query.lastName:lastName) +
    (Number($route.query.from==='boundCar'?$route.query.sex:sex) ?'女士': '先生')
    }}，{{ filteTimePeriod() }}！
  </div>
</template>

<script>
  export default {
    name: "WelcomePanel",
    props: {
      lastName: String,
      sex: Number | String
    },
    methods: {
      filteTimePeriod() {
        const hour = new Date().getHours()
        let str = ''
        if (hour >= 5 && hour < 11) {
          str = '早上好'
        } else if (hour >= 11 && hour < 13) {
          str = '中午好'
        } else if (hour >= 13 && hour < 19) {
          str = '下午好'
        } else {
          str = '晚上好'
        }
        return str
      },
    }
  }
</script>

<style scoped lang="sass" type="scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .title {
    font-weight: 500;
    font-size: px(14);
    height: px(50);
    line-height: px(50);
    padding: 0 px(20);
  }

</style>
