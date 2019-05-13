<template>
  <div class="check-cell" :class="{checked:value}">
    <div class="check-icon" @click="$emit('input',!value)"></div>
    <div class="check-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "WxCheckBox",
    data() {
      return {}
    },
    props: {
      value: Boolean
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .check-cell {
    display: flex;
    align-items: center;
    font-size: px(14);
    color: #323232;
    height: px(45);

    .check-icon {
      background-image: url("./../imgs/check0@2x.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: px(14);
      width: px(35);
      height: px(20);
      flex: 0 1 auto;
    }

    &.checked .check-icon {
      background-image: url("./../imgs/check1@2x.png");
    }
    .ageen{
     color: #A9A9A9;
    }
     &.checked  .ageen{
       color:#323232;
     }

    .check-label {
      flex: 1 1 auto;
      padding-left: px(5);
    }
  }
</style>
