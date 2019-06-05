<template>
  <div class="e-btn-group">
    <div @click="messageBtnHandleClick" class="e-btn message"></div>
    <div @click="phoneBtnHandleClick('400-062-0500')" class="e-btn phone"></div>
  </div>
</template>

<script>
export default {
  name: "BtnGroup",
  components: {},
  methods: {
    messageBtnHandleClick() {
      console.log("messageBtnHandleClick");
      this.$emit("messageBtnHandleClick");
    },
    phoneBtnHandleClick(phone) {
      debugger;
      console.log("phoneBtnHandleClick");
      window.location.href = `tel:${phone}`;
    }
  }
};
</script>

<style lang="sass" type="text/scss" rel="stylesheet/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .e-btn-group {
    position: relative;
    height: px(127);
    padding: 0 px(5);
    display: flex;

    .e-btn {
      height: 100%;
      width: 50%;

      &.phone {
        background: url("./../imgs/icon_1.png") center/px(172) px(126) no-repeat;
      }

      &.message {
        background: url("./../imgs/icon_2.png") center/px(172) px(126) no-repeat;
      }
    }
  }
</style>
