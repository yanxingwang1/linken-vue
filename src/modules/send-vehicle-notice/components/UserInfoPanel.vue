<template>
  <div class="user-info-wrap">
    <div class="user-info">
      <div class="user">
        <div class="name"><img class="driver" src="../imgs/user.png" alt>{{data.userName||data.lastName}} {{data.sex=='1'?'女士':'先生'}}</div>
        <div class="phone">{{data.phone}}</div>
      </div>
      <div class="call" @click.stop="phoneClick(data.phone)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoPanel",
  props: {
    data: Object
  },
  methods: {
    phoneClick(phone) {
      if (phone) {
        console.log("打电话", phone);
        window.location.href = `tel:${phone}`;
      }
    }
  }
};
</script>

<style scoped lang="sass" type="scss">
@function px($px) {
  @return ($px/20) + rem;
}

/*车主信息*/
.user-info-wrap {
  padding: 0 px(10);

  .user-info {
    height: px(88);
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: px(35);
    border-bottom: solid 1px #e2e2e2;
    position: relative;
    .driver {
      position: absolute;
      width: 12px;
      left: 8px;
      top: 20px;
    }
    .user {
      flex: 1 1 auto;

      .name {
        height: px(30);
        line-height: px(30);
      }

      .phone {
        height: px(30);
        line-height: px(30);
      }
    }

    .call {
      height: px(26);
      border-left: solid 1px #e2e2e2;
      flex: 0 1 px(55);
      background: url("./../imgs/phone-o@2x.png") right/px(15) no-repeat
        content-box;
      padding-right: px(10);
    }
  }
}
</style>
