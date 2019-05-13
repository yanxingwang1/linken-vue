<template>
  <div>
    <div class="show-tip-title" @click.stop="phoneClick(userPhone)">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "ShowCancelTitle",
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

.show-tip-title {
  font-size: 14px;
  color: #323232;
  font-family: PingFangSC-Regular;
  font-weight: 400;
 
  padding: 15px 0 13px 0;
 text-align:center;
    border-bottom: 10px solid #F5F5F5;
}
</style>
