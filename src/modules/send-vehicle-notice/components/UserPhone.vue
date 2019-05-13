<template>
    <div class="fetch-detail-index-custome">
        <div class="fetch-detail-index-custome-name">
            {{userName}}&nbsp;&nbsp;&nbsp;{{sex}}
        </div>
        <div class="fetch-detail-index-custome-phone" @click.stop="phoneClick(userPhone)">
            <div class="fetch-detail-index-custome-phone-img">
            <img src="../imgs/phoneBrown.png"/>
            </div>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'UserPhone',
    data() {
      return {
        // switchValue: false
      }
    },
    computed: {
    },
    watch: {
    },
    props: {
      userName: {
        type: String
      },
      sex: {
        type: String
      },
      userPhone: {
        type: String
      }
    },
    methods: {
        phoneClick(phone) {
            if (phone) {
            console.log('打电话', phone)
            window.location.href = `tel:${phone}`
            }
        },
    },
    components: {
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
    .fetch-detail-index-custome {
      display:flex;
      align-items: center;
      padding:14px 15px;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(50,50,50,1);
      border-bottom: 10px solid #F5F5F5;
      &-name {
        width:85%;
      }
      &-phone {
        width:13%;
        border-left:1px solid #E2E2E2;
        line-height: 30px;
        &-img {
          float:right;
          img {
            width: 18px;
            height: 18px;
            vertical-align: sub;
          }
        }
      }
    }
</style>
