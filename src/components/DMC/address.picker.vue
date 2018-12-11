<template>
  <div id="addressPicker" @click.self="stopPropagation">
    <mt-popup v-model="isPopupShow" :closeOnClickModal="false" position="bottom">


      <div class="pick-wrapper">
        <div id="pick" class="swing">
          <div id="area-title">
            <div class="opt-tool">
              <a class="opt-btn cancel" href="javascript:void (0);" @click="cancel">取消</a>
              <a class="opt-btn ok" href="javascript:void (0);" @click.self="ascertain">确定</a>
            </div>
          </div>
          <div id="area-tab">
            <span v-for="(tab,tIndex) in selectedValue" v-bind:class="[{ active: tab['active'] }]" class="tab" v-on:click.self="tabHandler(tIndex)"><span class="label-text">{{ tab['text'] }}</span></span>
          </div>
          <ul v-show="area['isShow']" class="area-wrap" v-for="(area,index) in addressData">
            <li v-for="(item,ind) in area['values']" @click.self="getAddress(item,index,ind)"
                :class="{'label label-danger': item['isSelected']}">{{ item.addressName }}
            </li>
          </ul>

        </div>

      </div>


    </mt-popup>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {Popup, Toast} from 'mint-ui';

  function insertArr(_arr,_target) {
    let obj = {};
    let temp = [];

    for(let i=0,len=_arr.length;i<len;i++){
      obj[_target] = false;
      Object.assign(_arr[i],obj);
      temp.push(_arr[i]);
    }

    return temp;
  }
  export default {
    data () {
      return {
        selectedValue:[{'index':0,'text':'请选择','hasVal':false,'select':'','active':true}],
        addressData: [],
        isPopupShow: this.isVisible,
      }
    },
    components: {Popup, Toast},
    props: {
      selected: {
        type: Array
      },
      isVisible: {
        type: Boolean,
        default: false
      }
    },

    methods: {
        tabHandler(_tIndex){
          if(this.addressData[_tIndex] == undefined) return;
          for(let k=0,kLen=this.addressData.length;k<kLen;k++){
              this.addressData[k]['isShow'] = false;
          }
           this.addressData[_tIndex]['isShow'] = true;
          for(let n=0,nLen=this.selectedValue.length;n<nLen;n++){
              this.selectedValue[n]['active'] = false;
          }
          this.selectedValue[_tIndex]['active'] = true;
        },
      tabLevelHandler(_parentCode,_index){
            let tabItem = {'index':0,'text':'请选择','hasVal':false,'select':'','active':false};

        this.http.get('address',{'parentCode':_parentCode},(_res)=>{
            if(_res.length > 0){
              let firstItemCode = _res[0]['addressCode'];
              if(typeof _index != 'undefined'){
                this.selectedValue[0]['active'] = false;
                tabItem['active'] = true;
              }
              this.selectedValue.push(tabItem);

              this.tabLevelHandler(firstItemCode);
            }

        })
      },
      getAddress(item,_index,_ind){
        item  = typeof item === 'undefined'?{'addressCode':''}:item;
        this.http.get('address',{'parentCode':item['addressCode']},(_res)=>{
          let baseObj = {'index':0,'values':[],'isShow':true};
          baseObj['values'] = insertArr(_res,'isSelected');
            if(_res.length > 0){
              this.addressData.splice(_index+1,this.addressData.length-_index);
              this.addressData.push(baseObj);
            }
            if(typeof _index != 'undefined'){
              this.selectedValue[_index]['text'] = item['addressName'];
              this.selectedValue[_index]['select'] = item;
              this.selectedValue[_index]['hasVal'] = true;
              if(_res.length > 0){
                  this.addressData[_index]['isShow']=false;
              }else{
                  //todo
                //close
                //this.ok();
                document.body.style.overflow = "scroll"
                let _rstVal = this.checkRealSelected();
                if(_rstVal['statue']){
                  this.isPopupShow=!this.isPopupShow;
                  this.$emit('update', _rstVal['value'],'ok');
                }


              }

              for(let i=0,len=this.addressData[_index]['values'].length;i<len;i++){
                this.addressData[_index]['values'][i]['isSelected'] = false;
              }
              this.addressData[_index]['values'][_ind]['isSelected'] = true;

              if(_index == 0){
                this.selectedValue.splice(1,this.selectedValue.length-1);
                this.tabLevelHandler(item['addressCode'],_index);
              }else if(_index>0) {

                  for(let j=0,jLen=this.selectedValue.length;j<jLen;j++){
                    this.selectedValue[j]['active'] = false;
                  }
                this.selectedValue.splice(_index+1,this.selectedValue.length-(_index+1));
                this.tabLevelHandler(item['addressCode'],_index);
                if(typeof this.selectedValue[_index+1] !== 'undefined'){
                  if(_res.length > 0){
                    this.selectedValue[_index+1]['active'] = true;
                  }else if(_res.length == 0){
                    this.selectedValue[_index]['active'] = true;
                  }
                }

              }
            }

        })

      },
      unCheckAll(_arr) {

      },
      checkRealSelected() {
        let num = 0,result={'value':[],'statue':false,'isSelectedAll':false};
        this.selectedValue.forEach((current,index)=>{
//          this.addressData[index]['values'].forEach((item)=>{
//              console.log(JSON.stringify(item));
//          })
            if(current['hasVal']){
              result['value'].push(current['select']);
                ++num;
            }else{
              result['value'].push(0);
            }
        })
        if(num==this.selectedValue.length){
          result['statue'] = true;
        }
/*        else{
           // console.log("result['value']===",result);
          Toast({
            message: '请选择完整的地址！',
            position: 'bottom',
            duration: 1500
          });
        }*/
        return result;
      },
      ascertain(){
        Toast({
          message: '请选择完整的地址！',
          position: 'bottom',
          duration: 1500,
          className:"zIndex"
        });


/*        if(!_rstVal['statue']) return;
        this.isPopupShow=!this.isPopupShow;
        this.$emit('update', _rstVal['value'],'ok');*/
      },
      cancel() {
        document.body.style.height = "auto"
        document.body.style.overflow = "scroll"
        // Toast({
        //   message: '请选择完整的地址！',
        //   position: 'bottom',
        //   duration: 1500
        // });
        this.isPopupShow=!this.isPopupShow;
        this.$emit('update', this.selectedValue,'cancel');
      },
      stopPropagation(){}
    },
    watch: {
      isVisible(){
      //  debugger
        this.isPopupShow = !this.isPopupShow;
        if(this.isPopupShow){
          document.body.style.height = "100%"
          document.body.style.overflow = "hidden"
          this.selectedValue = [{'index':0,'text':'请选择','hasVal':false,'select':'','active':true}];
          this.addressData = [];
          this.getAddress();
        }else{

        }
      }

    },
    beforeMount(){
      this.getAddress();
    },
    mounted(){
      this.$nextTick(()=>{



      })
    }
  }


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
  #addressPicker {

  .mint-popup {
    width: 100%;
  }

  .pick-wrapper {
    position: relative;
    width: 100%;
    background-color: #fff;

  }
  .zIndex{
    z-index:999;
  }
  .opt-tool {
    width: 100%;
    display: inline-table;
    height: 100%;
    padding: .4rem;

  .opt-btn {
    display: inline-block;
    color: red;

  &:hover,&:active,&:focus {
    text-decoration: none;
  }

  &.cancel {
    float: left;
  }

  &.ok {
    float: right;
  }

  }
  }

  }

  #pick {
    width: 100%;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
    background: #fff;
    z-index: 1000;
  }

  .cascading-address ul {
    padding: 5px auto 5px 5%;
    text-align: left;
    overflow-y: auto;
    height: 200px;
  }

  .cascading-address ul li {
    font-size: 13px;
    list-style: none;
    display: block;
    margin: 3px 5px;
    cursor: pointer;
    padding: 2% 5%;
    border-radius: 3px;
    -webkit-tap-highlight-color: transparent;
  }


  @-webkit-keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideInUp {
    from {
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
      visibility: visible;
    }
    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .swing {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation: slideInUp .2s;
    animation: slideInUp .2s;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-transform-origin: top center;
    transform-origin: top center;
    -webkit-animation: fadeIn .5s;
    animation: fadeIn .5s;
  }

  #area-tab {
    border-bottom: 1px solid #efefef;
    position: relative;
    height: 30px;
  }

  .tab {
    position: relative;
    font-size: .7rem;
    width: 60px;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 30px;
    float: left;
    overflow: hidden;
  }

  .tab.active {
    color: #f00;
  }

  .tab.active:after {
    content: "";
    background: #f00;
    display: inline-block;
    width: 60px;
    height: 1px;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: move .5s;
  }

  @keyframes move {
    0% {
      left: -60px;
    }
    100% {
      left: 0;
    }
  }

  @-webkit-keyframes move {
    0% {
      left: -60px;
    }
    100% {
      left: 0;
    }
  }

  #area-title {
    font-size: 16px;
  }
.label-text{
  font-size: .7rem;
}
.label{
  padding: .08rem;
}
  .area-wrap {
    height: 200px;
    padding: .4rem;
    overflow-y: auto;
    li{
      line-height: 1.2rem;
      font-size: .7rem;
    }
  }

  #title {
    width: 100%;
    display: inline-block;
    text-align: center;
    height: 30px;
    line-height: 30px;
  }

  #close {
    width: 0.56rem;
    height: 0.56rem;
    position: absolute;
    right: 10px;
    top: 10px;
    /*background: url('./h5_details_btn_close@2x.png') no-repeat;*/
    background-size: 100% auto;
  }

</style>
