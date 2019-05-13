<template>
  <div class="tip">
    <div class="show-tip-title">{{title}}</div>
    <div class="fetch-phone" @click.stop="phoneClick(userPhone)">
      <img class="fetch-phone-img" src="../imgs/phoneBrown.png">
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowTipTitle",
  data() {
    return {
      // switchValue: false
    };
  },
  computed: {},
  watch: {},
  props: {
    title: String,
    userPhone: {
      type: String
    }
  },

  methods: {
    phoneClick(phone) {
      if (phone) {
        console.log("打电话", phone);
        window.location.href = `tel:${phone}`;
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="sass" type="text/scss">
.tip {
  position: relative;
}
.fetch-phone {
  position: absolute;
  top: 17px;
  right: 6px;
  .fetch-phone-img {
    width:18px;
    height:18px;
  }
}
.show-tip-title {
  font-size: 14px;
  color: #323232;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  border-bottom: 1px solid #e2e2e2;
  padding: 19px 0 13px 0;
  margin-bottom: 13px;
}
</style>
