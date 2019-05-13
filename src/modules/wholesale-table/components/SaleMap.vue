<template>
  <div id="salemap" v-show="item.isShow">
    <!-- 销售地区 -->
    <div class="salearea tree-cell" @click="toggle" :style="{display:item.hidden}">
      <div v-if="percent" class="row0" :class="item.type">
        <div class="area">
          <span>{{item.name}}</span>
          <img
            src="../images/down.png"
            class="arrow"
            :class="{'arrow-down':item.isOpen}"
            v-if="item.type!='jxs'"
          >
        </div>
        <div class="num" v-for="(num,index) in item.rate">{{num}}</div>
      </div>
      <div v-else class="row0" :class="item.type">
        <div class="area">
          <span>{{item.name}}</span>
          <img
            src="../images/down.png"
            class="arrow"
            :class="{'arrow-down':item.isOpen}"
            v-if="item.type!='jxs'"
          >
        </div>
        <div class="num" v-for="(num,index) in item.amount">{{num}}</div>
      </div>
    </div>
    <div v-show="item.isOpen">
      <tree-item
        :percent="percent"
        class="item"
        v-for="(child,index) in item.children"
        :key="index"
        :item="child"
      ></tree-item>
    </div>
  </div>
</template>
<script>
  export default {
    name: "tree-item",
    props: {
      item: Object,
      percent: Boolean
    },
    data() {
      return {
        isShow: true
      };
    },
    watch: {
      isShow(val, oldVal) {
        this.item.isShow = val
      }
    },
    computed: {
      isFolder: function () {
        return this.item.children && this.item.children.length;
      }
    },
    methods: {
      toggle: function () {
        if (this.isFolder) {
          // this.item.isOpen = !this.item.isOpen;
          if (this.$parent.item) {
            this.$parent.item.children.forEach(item => {
              if (item === this.item) {
                item.isOpen = !item.isOpen;
                if (!item.isOpen) foldingChildern(item);
              } else {
                item.isOpen = false;
                foldingChildern(item);
              }
            });
          }
        }
        //控制 同级组件 显示和隐藏
        showChildern(this.$parent);
        if (this.item.isOpen) {
          this.$parent.$children.forEach(vm => {
            if (vm === this) {
              // console.log(vm.item.name, '显示')
              // vm.isShow = true;
              vm.item.isShow = true;
            } else {
              // console.log(vm.item.name, '隐藏')
              // vm.isShow = false;
              vm.item.isShow = false;
            }
          });
        } else {
          this.$parent.$children.forEach(vm => {
            // console.log(vm.item.name, '显示')
            // vm.isShow = true;
            vm.item.isShow = true;
          });
        }

        //折叠 组件下所有子组件
        function foldingChildern(item) {
          item.isOpen = false;
          if (item.children) {
            item.children.forEach(item => {
              foldingChildern(item);
            });
          }
        }

        //显示 组件下所有子组件
        function showChildern(vm) {
          // vm.isShow = true;
          vm.item.isShow = true;
          if (vm.$children) {
            vm.$children.forEach(vm => {
              showChildern(vm);
            });
          }
        }
      }
    },
    created() {
    },
    mounted() {
      if (!this.item.isOpen) {
        this.$set(this.item, "isOpen", false);
      } else {
        this.$set(this.item, "hidden", "none");
      }
      this.$set(this.item, "isShow", true);
    }
  };
</script>
<style lang="sass" scope type="text/scss">
  .salearea {
    .row0 {
      display: flex;
      background: #f6f6f6;
      height: 50px;
      align-items: center;
      font-size: 14px;
      color: #444344;
      margin-top: 4px;

      &.daqu {
        background-color: #F6F6F6;
      }

      &.xiaoqu {
        background-color: #DCDCDC;
      }

      &.jxs {
        background-color: #F6F3F0;
      }

      &.hj {
        background-color: #FFF0E3;
      }

      .area {
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        color: #444344;
        /*width: 100px;*/
        flex: 0 1 90px;
        position: relative;
        font-size: 12px;
        padding: 0 20px 0 5px;


        img {
          width: 10px;
          position: absolute;
          top: 5px;
          right: 5px;
        }

        .arrow {
          transition: transform 0.3s ease;
        }

        .arrow-down {
          transform: rotate(180deg);
        }
      }

      .num,
      .total {
        // width:50px;
        text-align: center;
        flex: 1;
        font-size: 12px;
      }

      .num:last-child {
        font-family: PingFangSC-Semibold;
        font-size: 14px;
        color: #444344;
      }
    }
  }
</style>
