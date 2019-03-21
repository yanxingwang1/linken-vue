<template>
  <div id="salemap">
    <!-- 销售地区 -->
    <div class="salearea tree-cell" @click="toggle" :style="{display:item.hidden}">
      <div class="row0">
        <div class="area">
          {{item.name}}
          <img
            src="../images/down.png"
            :class="{'arrow-down':item.isOpen}"
            v-if="item.type!=4"
            alt
          >
        </div>
        <div class="num" v-for="(num,index) in item.num" :key="index">{{num}}</div>
      </div>
    </div>
    <div v-show="item.isOpen" v-if="isFolder">
      <tree-item class="item" v-for="(child,index) in item.children" :key="index" :item="child"></tree-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "tree-item",
  props: {
    item: Object
  },
  data() {
    return {};
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        // this.item.isOpen = !this.item.isOpen;
        if (this.$parent.item) {
          this.$parent.item.children.forEach(item => {
            if (item === this.item) {
              item.isOpen = !item.isOpen;
            } else {
              item.isOpen = false;
            }
          });
        }
      }
    }
  },
  created() {},
  mounted() {
    if (!this.item.isOpen) {
      this.$set(this.item, "isOpen", false);
    } else {
      this.$set(this.item, "hidden", "none");
    }
  }
};
</script>
<style lang="sass" scope>

    .salearea{
        .row0{
             display: flex;
             text-align: center;
             background: #F6F6F6;
             height:44px;
             align-items:center;
             font-size: 14px;
            color: #444344;
            margin-top:4px;
             .area{
                 width:75px;
                 img{
                     float:right;
                     margin-top: 7px;
                     width: 12px;
                 }
                .arrow-down{
                     transform: rotate(180deg);
                }
             }
             .num,.total{
                  width:50px;
             }
            //  .row1{
            //      display:flex;
            //  }
        }
    }
</style>
