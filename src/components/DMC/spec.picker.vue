<template>
  <div id="specPicker">
    <mt-popup v-model="isPopupShow" position="bottom">
      <!-- <a class="p-close" @click="cancel"></a> -->

      <div class="pick-wrapper">

        <!-- <div class="main-info">
          <div class="snap-image">
            <img src="../assets/img/demo/g5.png" alt="">
          </div>
          <div class="snap-info">
              <div class="info">1999积分</div>
              <div class="info">商品编号: 9116695379 </div>
          </div>
        </div> -->

        <!-- <div class="block-line"></div> -->

        <div class="pick-attr">
         <!-- <div class="attr-item" v-for="(attr,index) in attrList">
            <div class="dt">{{attr['saleName']}}</div>
            <div class="dd">
              <div class="item" v-if="item['saleValue'] != null" :class="{'disabled':item['disabled'],'selected':item['selected']&&!item['disabled']}" v-for="(item,pos) in attr['saleAttrList']" @click="handleCheckable(item['skuIds'],index,pos)">
                <img v-if="item['imagePath'] != null" v-bind:src="item['imagePath']|prefixImagePath(4)" alt="">
                <i>{{item['saleValue']}}</i>
              </div>
            </div>
            <div class="block-line"></div>
          </div>  -->
      
          <div class="attr-item" v-for="(attr,index) in attrList">
            <div class="dt">{{attr['saleName']}}</div>
            <div class="dd">
              <div class="item" v-for="(item,pos) in attr['saleAttrList']"  v-if="item['saleValue'] != null" :class="{'disabled':item['disabled'],'selected':item['selected']&&!item['disabled']}"  @click="handleCheckable(item['skuIds'],index,pos)">
                <img v-if="item['imagePath'] != null" v-bind:src="item['imagePath']|prefixImagePath(4)" alt="">
                <i>{{item['saleValue']}}</i>
              </div>
            </div>
            <div class="block-line"></div>
          </div> 

          <!-- <div class="attr-item">
            <div class="dt">颜色</div>
            <div class="dd">
              <div class="item" >
                <img  src="../assets/img/demo/g5.png" alt="">
                <i>蓝色</i>
              </div>
            </div>
            <div class="block-line"></div>
          </div> -->

        </div>

        <div class="pick-exchange clearfix">
          <div class="ex-dt">
            数量
          </div>
          <div class="ex-option">
            <!-- ios样式 -->
            <div class="opt-block"  v-show='ios'>
              <div class="opt pre-minus" :class="{'disabled':exNum==1}" @click="doAdd(-1)">-</div>
              <div class="ex-input"><input type="number"  v-model="exNum"></div>
              <div class="opt pre-plus" @click="doAdd(1)">+</div>
            </div>
            <!-- 安卓样式 -->
            <div class="opt-block Android"  v-show='!ios'>
              <div class="opt pre-minus" :class="{'disabled':exNum==1}" @click="doAdd(-1)">-</div>
              <div class="ex-input"><input type="number"  v-model="exNum"></div>
              <div class="opt pre-plus" @click="doAdd(1)">+</div>
            </div>
          </div>
        </div>

        <div class="pick-option position-footer ">
          <a href="javascript:void(0)" class="p-btn p-btn-red" @click="ok" >确定</a>
        </div>

      </div>


    </mt-popup>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { Popup,Picker,Toast} from 'mint-ui';
 import  store from '../common/DMC.store'
  import  util from '../common/DMC.util'
  function inArray(_arr,_target) {
    var i = _arr.length;
    while (i--) {
      if (_arr[i].toString() === _target.toString()) {
        return true;
      }
    }
    return false;
  }

  //求数组的交集
  function mixed(_arr1,_arr2) {
      let result = [];
      for(let i=0,len=_arr1.length;i<len;i++){
          if(inArray(_arr2,_arr1[i])){
            result.push(_arr1[i]);
          }
      }
      return result;

  }
//var a = {0:[1,2,3],1:[2,4],3:[2]};
  function mutiMixed(_map) {
    let _mixed,_index,_res;
    for(let key in _map){
        key = parseInt(key);
      if(key == 0) _mixed = _map[key];
      if(_map[key+1]!=undefined){
        _index = key+1;
        _mixed = mixed(_mixed,_map[key+1]);
      }else{
        _res = _mixed;
      }
    }
    return _res;
  }

  export default {
    name:'specPicker',
    methods: {
      
      getGoodsSpec:function () {
          var _skuid=this.specParams['skuid']
        var params={
          inputSku:_skuid
        }
        //  debugger
       this.http.get('goodsSpec',params,(_res)=>{
          if(!_res){
            return;
            //  Toast({
            //     message: '规格为空',
            //     position: 'bottom',
            //     duration: 5000
            //   });
          }
          // debugger
            // console.log(_skuid);
            // console.log(_res)
          //   var _res=[
          //     { saleName:'颜色',
          //     skuIds:'10185866667',
          //     saleAttrList:[
          //       { imagePath:"jfs/t2854/180/3962862925/71466/296b5d7d/57a40bddNaccf4d42.jpg",
          //       disabled:true,
          //       selected:true,
          //       saleValue:'黄色',},
          //        { imagePath:"jfs/t2854/180/3962862925/71466/296b5d7d/57a40bddNaccf4d42.jpg",
          //       disabled:true,
          //       selected:true,
          //       saleValue:'红色',},
          //        { imagePath:"jfs/t2854/180/3962862925/71466/296b5d7d/57a40bddNaccf4d42.jpg",
          //       disabled:true,
          //       selected:true,
          //       saleValue:'绿色',}

          //     ] 
          // },
          //     { saleName:'长度',
          // imagePath:"jfs/t2854/180/3962862925/71466/296b5d7d/57a40bddNaccf4d42.jpg",
          // disabled:true,
          // selected:true,
          // saleValue:'5cm',
          // skuIds:'10185866667'}
            // ]
          this.attrList = _res;
          // debugger
          for(let i=0,iLen=this.attrList.length;i<iLen;i++){
              for(let j=0,jLen=this.attrList[i]['saleAttrList'].length;j<jLen;j++){
                  if(inArray(this.attrList[i]['saleAttrList'][j]['skuIds'],_skuid)){
                      this.$set(this.attrList[i]['saleAttrList'][j],'selected',true);
                      break
                  }
              }
          }
        })

      },
      handleCheckable:function (_arrSkuid,_index,_pos) {
        // debugger
        store.setLocal("sku", _arrSkuid[0]);
        console.info(_arrSkuid,"----",_index);
        //todo 求数组的交集
        if(this.attrList[_index]['saleAttrList'][_pos]['disabled']) return;
        for(let i=0,iLen=this.attrList[_index]['saleAttrList'].length;i<iLen;i++){
          this.$set(this.attrList[_index]['saleAttrList'][i],'selected',false);
        }
        if(this.attrList[_index]['saleAttrList'][_pos].hasOwnProperty('disabled')&&this.attrList[_index]['saleAttrList'][_pos]['disabled']){
          this.$set(this.attrList[_index]['saleAttrList'][_pos],'selected',false);
        }else{
          this.$set(this.attrList[_index]['saleAttrList'][_pos],'selected',true);
        }

            for(let j=0,jLen=this.attrList.length;j<jLen;j++){
                if(_index == j) continue;
                let saleAttrLists = this.attrList[j]['saleAttrList'];
                for(let k=0,kLen=saleAttrLists.length;k<kLen;k++){
                    let currentAttr = saleAttrLists[k];
                    let targetSkuIds = currentAttr.skuIds;
                  if(mixed(_arrSkuid,targetSkuIds).length==0){
                    this.$set(this.attrList[j]['saleAttrList'][k],'disabled',true);
                  }else{
                    this.$set(this.attrList[j]['saleAttrList'][k],'disabled',false);
                  }

                }

            }

      },
      doAdd:function (_val) {
        this.exNum = this.exNum+_val;
        // debugger
      },
      getSelectedResult:function () {
        let count = 0;
        let map = {};
        let skuid = [];
        //selected=true,disabled=false
        for(let i=0,iLen=this.attrList.length;i<iLen;i++){
          for(let j=0,jLen=this.attrList[i]['saleAttrList'].length;j<jLen;j++){
              if(this.attrList[i]['saleAttrList'][j].hasOwnProperty('selected')&&this.attrList[i]['saleAttrList'][j]['selected']){
                  map[count] = this.attrList[i]['saleAttrList'][j]['skuId'];
                  ++count;
              }
          }
        }
        if(count == this.attrList.length){
          skuid = mutiMixed(map);
        }
        return skuid;
      },
      save:function (_skuId) {
          // console.log(_skuId,'1111111111111111111111')
            // paymentType:this.paytype
          // let postParam = {'id':this.specParams['sid'],'skuId':_skuId,'num':this.exNum};
          let postParam = {'skuId':store.getLocal("sku"),paymentType:this.specParams['paymentType'],'num':this.exNum};
          // debugger
        //  console.log("保存到购物车的信息",postParam)
          //  store.setLocal("skuId", _skuId);
        this.http.post('shoppingCar',postParam,(_callback)=>{
          //  debugger
          console.log("保存到购物车的信息",postParam)
          /*if(_callback['flag'].toString() === '1'){*/
           if(_callback.flag==1){
              Toast({
                message: _callback.msg,
                position: 'bottom',
                duration: 5000
              });
              this.$emit('update', this, postParam,'ok');
              this.isPopupShow = !this.isPopupShow;
              // this.$router.go(0)
          }else{
             Toast({
                message: '商品保存失败',
                position: 'bottom',
                duration: 5000
              });
                // this.$emit('update', this, postParam,'ok');
            this.isPopupShow = !this.isPopupShow;
            // this.$router.go(0)
          }
          
         /* }*/
        })
      },
      ok:function () {
        
        // let resultSkuId = this.getSelectedResult();
        // debugger
        // if(resultSkuId.length == 0){
        //   Toast({
        //     message: '请选择商品属性',
        //     position: 'bottom',
        //     duration: 5000
        //   });
        // }else{
          // this.save(resultSkuId[0]);
        // }
           this.save()

      },
      cancel:function () {
        this.isPopupShow=!this.isPopupShow;
        this.$emit('update', this, this.specParams,'cancel');
      }
    },

    data(){
      return {
        isPopupShow:this.isVisible,
        specParams:this.params,
        attrList:[],
        exNum:this.params['num'],
        ios:true
      }
    },
    components:{Popup,Picker,Toast},
    props:{
      selected:{
        type:Array
      },
      params:{
        type:Object
      },
      isVisible:{
        type:Boolean,
        default:false
      }
    },
    computed:{

    },
    watch:{
      
      isVisible(){
        this.isPopupShow = !this.isPopupShow;
      },
      exNum() {
        //  debugger;
        if(this.exNum<=1){
            this.exNum = 1;
        }
      },
      specParams:{
        
          handler:function () {
            // debugger;
            this.getGoodsSpec(this.specParams['skuid']);
          },
          deep:true
      }

    },
     created: function () {
        // console.log("组件传过来的值",this.specParams)
     },
    mounted(){
      // 初始化调用
      // console.log("组件prop传过来的值",this.params)
      // this.getGoodsSpec(this.params['sku']);
    // debugger
       this.getGoodsSpec();
      if(util.isAPP('Android')){
        this.ios=false
      }
    }
  }



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" type="text/scss" scoped>
.Android .opt,.Android .ex-input input{
  padding-top:4px!important;
}

@function px($px){
    @return ($px/23.4375)+rem;   
 } 
 @media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
    .position-footer {
      margin-bottom:24px;
    }
  }
  $font-light-grey:grey;
  $red:rgb(229,0,20);
  $font-grey:#555;
  #specPicker{
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none !important;
    margin: 0;
  }
  .p-close{
    display: inline-block;
    right: .2rem;
    top: .2rem;
    background-image: url('http://i-club.gmmc.com.cn/fs01/assets/v2/img/close.png');
    background-size: .75rem;
    background-repeat: no-repeat;
    background-position: center;
    width: 1rem;
    height: 1rem;
    z-index: 99;
    position: absolute;
    cursor: pointer;
    &:hover{
      transform: rotate(90deg);
      transition: transform .3s ease;
      -webkit-transition: transform .3s ease;
     }
  }
  .mint-popup{
    width: 100%;
  }
  .block-line{
    width: 100%;
    display: inline-block;
    height: .04rem;
    background-color: #eeeaea;
  }
  .pick-wrapper{
    position: relative;
    width: 100%;
    background-color: #fff;
    .main-info{
      position: relative;
      display:block;
      width:100%;
      .snap-image{
        display:block;
        position: absolute;
        width: 40%;
        text-align:center;
        img{
          width: 80%;
          border-radius: .2rem;
          margin-top:-1.2rem;
        }
      }
      .snap-info{
        display:block;
        position: relative;
        width: 100%;
        margin-left: 40%;
        padding: .5rem 0;
        .info{
          &:nth-child(1){
             color: $red;
             font-size: .6rem;
           }
          &:nth-child(2){
             color: $font-grey;
              font-size: .5rem;
           }
        }
      }
    }
    .pick-attr{
      position: relative;
      width: 100%;
      max-height: 12rem;
      overflow-y: auto;
      padding:.3rem .4rem 0;
      .attr-item{
        width: 100%;
        display:inline-block;
        padding:0 .3rem .3rem;
        .dt{
          width: 100%;
          font-size: .6rem;
          color: $font-light-grey;
          padding: .2rem 0;
        }
        .dd{
          .item{
            float: left;
            border:1px solid #d9d9d9;
            border-radius:.1rem;
            padding: .15rem;
            cursor: pointer;

            &.disabled{
              background-color: #d9d9d9;
              cursor:not-allowed;
              img{
                filter: grayscale(100%);
                -webkit-filter: grayscale(100%);
                -moz-filter: grayscale(100%);
                -ms-filter: grayscale(100%);
                -o-filter: grayscale(100%);
              }
              i{
                color: $font-grey;
              }
             }

            &.selected{
              border-color: $red;
              i{
                color: $red;
              }
             }
            img{
              width: 1.2rem;
            }
            i{
              font-style: normal;
              font-weight: 400;
              font-size: .5rem;
              color: $font-grey;
            }
          }
          .item{
            margin: .3rem;
          }
        }
      }
    }

  .pick-option{
    position: relative;
    width: 100%;
    text-align:center;
    margin-top: 1.6rem;
    .p-btn{
      background-color: rgb(229,0,20);
      color: #fff;
      display: inline-block;
      padding: .4rem .2rem;
      margin: 0 auto;
      font-size: .7rem;
      font-weight: 500;
      width: 100%;
      cursor: pointer;
      &:hover{
        text-decoration: none;
       }
    }

  }

  .pick-exchange{
    width: 100%;
    padding: 0 .6rem;
    position: relative;
    display:inline-table;
    .ex-dt{
      // width: 40%;
      // position: relative;
      // display:inline-block;
      float:left;
      font-size: px(16);
      color: $font-light-grey;
      line-height: 1.28rem;
    }
    .ex-option{
      // width: 60%;
      // display:inline-block;
      // box-sizing: border-box;
      // text-align:right;
      font-size: px(16);
          height: 1.28rem;
      float:right;
      .opt-block{
        display:inline-block;
        height: px(30);
          .opt{
            float: left;
            border: 0.5px solid #ccc;
           width:px(30);
           height:px(30);
               padding: 3px;
               padding-top:2px;
          //  line-height:px(30);
            display: inline-block;
          //  padding-top:px(3);
            color: #373636;
            cursor: pointer;
            text-align:center;
          }
          .pre-minus{
            // border-right: none;

            &.disabled{
              background-color: #faf8f8;
              color:#c1bfbf;
              cursor: not-allowed;
             }

          }
          .pre-plus{
            // border-left: none;
          }
          .ex-input{
            float: left;
            width:px(32);
           height:px(30);
           margin:0 px(5);
             border: 0.5px solid #ccc;
          input{
             width:px(26);
           height:px(28);
            padding: 1px;
         margin-left: 3px;
            text-align:center;
            border:none;
              border-radius:0;
            &:focus{
              outline: none;
             }
          }
      }

      }
    }
  }

  }

  }

</style>
