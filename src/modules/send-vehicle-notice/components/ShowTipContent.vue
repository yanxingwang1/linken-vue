<template>
  <div class="show-tip-detail">
    <div class="title">{{title}}</div>
    <div class="detail">
      {{detail}}
      <span v-if="phone" @click="phoneClick(phone)">{{phone}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowTipContent",
  data() {
    return {
      // switchValue: false
    };
  },
  computed: {},
  watch: {},
  props: {
    title: String,
    detail: String,
    phone: String
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
    .show-tip-detail {
        display:flex;
        margin-bottom:5px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        font-weight:400;
        letter-spacing: -0.39px;
        .title {
            width:30%;
            color: #676767;
        }
        .detail {
            width:70%;
            color: #323232;
            span{
              color:#18B0FF;
            }
        }
    }
</style>
