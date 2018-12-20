<template>
  <div>
    <div class="fun-btn-title">服务类型<span>*</span></div>
    <div class="fun-btn-wrap">
      <div
        v-for="(item,i) in serviceTypeList"
        @click="serviceTypehandleClick(item,i)"
        class="fun-btn"
        :class="{active: item.isActive}"
      >{{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    //服务类型选择
    name: "ServiceType",
    components: {},
    data() {
      return {
        serviceTypeList: [
          {serviceType: 1, text: '维修', isActive: false},
          {serviceType: 2, text: '保养', isActive: false},
          {serviceType: 3, text: '检查', isActive: false},
          {serviceType: 4, text: '其他', isActive: false}
        ],
        value2: 0,
      }
    },
    props: {
      value: {
        type: Number | String
      }
    },
    mounted() {
      this.value2 = this.value
    },
    computed: {},
    watch: {
      value(value) {
        this.serviceTypeList.forEach((item, i) => {
          if (item.serviceType == value) {
            item.isActive = true
          }else {
            item.isActive = false
          }
        })
      },
      value2(value) {
        console.log('维修服务类型改变', value)
        this.$emit('input', value)
        // this.$emit('vehicleServicesChange', value)
      }
    },
    methods: {
      serviceTypehandleClick(item, i) {
        if (item.isActive) {
          item.isActive = false
          this.value2 = 0
        } else {
          this.serviceTypeList.forEach((item, index) => {
            if (i == index) {
              item.isActive = true
              this.value2 = item.serviceType
            } else {
              item.isActive = false
            }
          })
        }
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .fun-btn-title {
    text-align: center;
    color: #3E3E3E;
    font-size: px(16);
    span{
      color: red;
    }
  }

  .fun-btn-wrap {
    display: flex;
    height: px(80);
    justify-content: space-around;
    align-items: center;

    .fun-btn {
      width: px(70);
      height: px(30);
      line-height: px(30);
      text-align: center;
      font-size: px(12);
      background-color: #EBEBEB;
      color: #3E3E3E;
      border-radius: px(3);

      &.active {
        background-color: #B45F1A;
        color: #ffffff;
        transition: all .3s ease;
      }
    }
  }
</style>
