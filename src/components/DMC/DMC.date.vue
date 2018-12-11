<template>
  <div class="DMC-date" v-show="show">
       <popup-picker :show=" show " :show-cell="false" :title="title" :data="data"  :columns="3" v-model="value" show-name></popup-picker>
       <div class="show" v-show="false"></div>
  </div>
</template>

<script>
import { PopupPicker } from 'vux'
export default {
 mame:'DMC-date',
  data () {
    return {
      title: '',
      arr: [] , /*模拟日期数据*/
      value: [] ,
      showPopupPicker: true ,
    }
  },
  components: {
    PopupPicker
  },
  methods: {
    init(){
        this.date()
    },
    date(){
        // 初始化时间
        let now = new Date();
        let nowYear = now.getFullYear();
        let nowMonth = now.getMonth() + 1;
        let nowDate = now.getDate();
        // 数据初始化
        for (let i = nowYear - 100; i <= nowYear + 30; i++) {
          this.arr.push({
              id: i + '',
              name: i + '年',
              value: i+"",
              parent: 0
          });
          this.formatMonth(i+"")
        }
    },
    formatMonth(year) {
      for (let i = 1; i <= 12; i++) {
          this.arr.push({
              id: i + '',
              name: i + '月',
              value: year+""+i,
              parent: year
          });
          if(/^4|6|9|11$/.test(i)){
              this.formatDate(30,year+""+i)
          }else if(/^1|3|5|7|8|10|12$/.test(i)){
              this.formatDate(31,year+""+i)
          }else if(/^2$/.test(i)){
            if (parseInt(year) % 4 === 0 && parseInt(year) % 100 !==0 || parseInt(year) % 400 === 0) {
                this.formatDate(29,year+'2')
            } else {
                this.formatDate(28,year+'2')
            }
          }
      }
    },
    formatDate (count,month) {
      for (let i = 1; i <= count; i++) {
        this.arr.push({
            id: i + '',
            name: i + '日',
            value: count+'day',
            parent: month
        });
      }
    },
    change(){

    }

  },
  props:["show", "data"],
  mounted(){
    return this.$nextTick(()=>this.init())
  },
  watch:{
    value(){
      //console.log(2)
      this.$emit('on-change', [this.value, !this.show])
    }
  }

}
</script>

<style lang="sass" scoped>
.DMC-date{
  position: relative;
}
.shadow{
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  overflow: hidden;
}
.shoadow{
  background: rgba(0,0,0,.3);
}
</style>