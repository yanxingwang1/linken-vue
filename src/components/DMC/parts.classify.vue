<template>

    <popup v-model="value" position="right" :hideOnBlur="true" @on-hide="onhide" @on-show="onshow">
      <div class="content">
        <!-- <section class="clearfix">
          <span>品牌</span>
          <span @click=" change('brandShow') " class="fr">全部
            <i v-show="brandShow" class="iconfont">&#xe688;</i>
            <i v-show="!brandShow" class="iconfont">&#xe6cc;</i>
          </span>
        </section> -->
        <ul v-show="!brandShow" class="clearfix">
            <li v-for="(item,i) in brandData" :class="{'checked': item.selected } " @click="select('brand',i)">{{item.brand}}</li>
        </ul>

<!--
        <section class="clearfix">
          <span>种类</span>
          <span @click=" change('typeShow') " class="fr">全部
            <i v-show="typeShow" class="iconfont">&#xe688;</i>
            <i v-show="!typeShow" class="iconfont">&#xe6cc;</i>
          </span>
        </section>
        <ul v-show="!typeShow" class="clearfix">
            <li v-for="(item,i) in typeData" :class="{'checked': typeData[i].selected}" @click="select('type',i)">{{item.partType}}</li>
        </ul>
-->


        <!-- // <footer>
        //   <button @click="reset">重置</button>
        //   <button @click="confirm">确定</button>
        // </footer> -->
      </div>
    </popup>

</template>

<script>
import { Popup } from 'vux'
  export default {
    name: 'classify',
    data () {
      return {
        value: false ,
        brandShow: false ,
        typeShow: false ,
        brandData: "",
        typeData:"",
        setData:{
          brand: "",
          type: ""
        },
        cruntbrand: 0 ,
        crunttype: 0 ,
        isConfirm: false ,
        isReset: false,
      }
    },
    methods:{
      init(){

      },
      confirm(){

        // 提交状态
        console.log('confirm=======================')
        store.setLocal('cruntbrand',this.cruntbrand)
        store.setLocal('crunttype',this.crunttype)
        store.setLocal('crunsetData',this.setData)
        //if(this.isReset === false){}
        this.$emit('switch', [false, this.setData])

        this.isConfirm = true
        //console.log('confirm')
        if(this.isReset === true){
          this.isReset = false
          this.isConfirm = false
          //debugger
        }

      },
      change(val){
        this[val] = !this[val]
      },
      reset(){   // 重置
        //console.log('reset=======================')
        this.clear('brand')
        this.clear('type')
        //debugger;
        this.setData.brand = ""
        this.setData.type = ""
        //this.isConfirm = true
        this.isReset = true
        //store.setLocal('cruntbrand',99)
        //store.setLocal('crunttype',99)
        //this.brandData[0].selected = true
        //this.typeData[0].selected = true
        this.cruntbrand = 99
        this.crunttype = 99
        this['brandShow'] = !this['brandShow']
        this['brandShow'] = !this['brandShow']
        //this.$emit('resets',"")
        //console.log('reset-------------')
      },
      clear(brand){  // 清除状态
        brand += 'Data'
        this[brand].forEach((v,i)=>{
          this.$set(v,'selected',false)
        })
      },
      select(brand,i){ // 添加状态
     
        this.clear(brand)
        // 刷新数据 页面重渲
        this[brand+'Show'] = !this[brand+'Show']
        this[brand+'Show'] = !this[brand+'Show']
        this.$set(this[brand + 'Data'][i],'selected',true)
        let typ = (brand==='brand'?'brand':'partType')
        this.setData[brand] = this[brand  + 'Data'][i][typ]
        this['crunt'+brand] = i
      },
      onhide(){
        console.log('hide======')
        //console.log(this.isConfirm)
        //console.log(this.isReset)
        if(this.isConfirm === true){
          this.isConfirm = false
          return
        }
        if(this.isReset === true){
          //debugger
          this.confirm()
          return
        }
        console.log('hide---------')
        this.$emit('switch', [false])

      },
      onshow(){
          ////console.log("onshow")
      }

    },
    computed: {},
    props:["show","brand","type"],
    components: {
      Popup
    },
    beforeMount(){
    },
    beforeUpdate(){

    },
    mounted(){
        return this.$nextTick(()=>this.init())
    },
    beforeDestroy(){

    },
    destroyed(){

    },
    watch:{
      show(){
        this.value = this.show
        //console.log('watch')
        if(this.show === true){
          //debugger
          this.brandData = this.brand
          this.typeData = this.type
        }
        this.cruntbrand = store.getLocal('cruntbrand') || 0
        this.crunttype = store.getLocal('crunttype') || 0
        this.setData = store.getLocal('crunsetData') || {"brand":"","type":""}
      }
    }

  }
</script>

<style lang="sass" scoped>
  .content{
    font-size:.7rem;
    width: 10rem;
    height:100%;
    background-color:white;
    padding:.5rem;
    section{
      line-height:1.6rem;
      width: 100%;
    }
    ul{
      width:100%;
      padding-top:1rem;
      li{
        box-sizing:border-box;
        width: 48%;
        float:left;
        line-height:1.5rem;
        padding:0 .3rem;
        border-radius:.2rem;
        background-color:#f1f1f1;
        margin: 0 4% .5rem 0;
        text-align: center;
        overflow:hidden;
        font-size: .7rem;
        white-space:nowrap;
        text-overflow:ellipsis;
        overflow:hidden ;
      }
      li:nth-child(2n){
        margin-right:0;
      }
    }
    button{
      position: absolute;
      bottom:0;
      border:none;
      text-align:center;
      line-height:2rem;
    }
    button:nth-child(1){
      left:0;
      width:40%;
    }
    button:nth-child(2){
      right:0;
      width:60%;
      background-color:rgb(229,0,20);
      color:white;
    }
    .checked{
      background-color: pink;
      color:red;
    }
  }
</style>
