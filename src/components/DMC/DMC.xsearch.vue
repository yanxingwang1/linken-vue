<template>
	<div class="x-search-wrapper " :class="{'x-show':isShow}">

    <!--搜索遮罩层-->
    <div class="x-search-modal">

    </div>

	  <!--搜索框-->

    <form @submit="submit" style="overflow: hidden;"> 
      <div class="x-search-bar">
        <div class="x-search-bar-inner">
          <i class="x-icon-search iconfont">&#xe60d;</i>
          <input
            ref="input"
            @click="visible = true"
            @focus="doFocus"
            type="search"
            v-model="currentValue"
            :placeholder="placeholder"
            class="x-search-input" />
          <a
            class="x-search-ok"
            @click="doSearch(currentValue)"

            v-text="okText">
          </a>
        </div>
      </div>
    </form>


    <!--搜索历史-->
    <div class="x-search-history ">
      <div class="split-line"></div>
      <div class="x-history-head">
        <h5>
          历史搜索

          <i class="x-icon-trash icon iconfont" @click="removeHistory">&#xe74c;</i>

        </h5>
      </div>
      <div class="x-history-list">
        <ul v-for="(item,index) in historyList" :key="index">
          <li><a class="item"  v-text="item" @click="doSearch(item,true)"></a></li>
        </ul>
      </div>


    </div>


	</div>
</template>

<script>
    import ds from '../common/DMC.store'
    export default {
        name: 'xsearch',
        props: {
          value: String,
          okText: {
            default: '搜索'
          },
          placeholder: {
            default: '搜索',
            type:String
          }
        },
        data() {
          return {
            visible: false,
            isShow:false,
            currentValue: this.value,
            historyKey:'X-SEARCH',
            historyList:[]
          }
        },
        watch:{
          currentValue(val) {
            this.$emit('input', val);
          },
          value(val) {
            this.currentValue = val;
          }
        },
        components: {},

        methods: {
            init() {
                //todo

              this.getHistoryList();

            },
            submit(){
              this.doSearch(this.currentValue)
            },
          getHistoryList(){
            this.$set(this.$data,'historyList',ds.getLocal(this.historyKey));
          },
          removeHistory(){
            ds.removeLocal(this.historyKey);
            this.getHistoryList();
          },
          saveToLocal(_val){
            let tempArr = [].concat(this.historyList||[]),hasVal=false;
            for(let i=0,len=tempArr.length;i<len;i++){
              if(tempArr[i] === _val){
                hasVal = !0;
                break;
              }
            }

            if(!hasVal&&_val!==''){
              tempArr.push(_val);
              ds.setLocal(this.historyKey,tempArr);
            }

          },
          doFocus(){
            this.isShow = !this.isShow;
            this.getHistoryList();
          },
          doSearch(_text,_isHis){
              if(!_isHis){
                this.saveToLocal(this.currentValue);
              }else {
                this.currentValue = _text;
              }

              this.$emit('search',_text);

              this.isShow = !this.isShow;


          }


        },
        beforeMount() {
            //todo

        },
        mounted() {
            //todo
          this.init();

        }
    }

</script>

<style lang="sass" scoped>
  $x-light-black:#777;
  .x-search-wrapper{
    /*init*/
	 .x-search-history{
      display: none;

      }

     .x-search-modal{
        display: none;
    }


     .x-search-bar{
       width: 100%;
       position: relative;
       padding: .2rem .5rem;
       .x-search-bar-inner{
         display: table;
         width: 100%;
         line-height: initial;
         border-radius: 4px;
         text-align: center;
         font-size: 14px;
         .x-icon-search{

           display: table-cell;
           padding: 0 .3rem;


         }

         .x-search-ok{
           display: none;
           height: 100%;
           background-color: red;
           color: #fff;
           padding: .1rem .2rem;
           border-bottom-right-radius: 4px;
           border-top-right-radius: 4px;
           cursor: pointer;

       }

         .x-search-input{
           display: table-cell;
           background-color: #eee;
           border: none;
           width: 100%;

       }

     }

     }
    /*init end*/


    &.x-show{
      position: fixed;
      display: block;
      width: 100%;
      height: 100%;
      clear: both;
      top: 2rem;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 10px;
      text-align: start;


      .x-search-modal{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        background-color: #fff;
        }


        .x-search-bar{
          width: 100%;
          position: relative;
          padding: .2rem .5rem;
          .x-search-bar-inner{
            display: table;
            width: 100%;
            line-height: 26px;
            border: 1px solid red;
            border-radius: 4px;
            text-align: center;
            font-size: 14px;
            .x-icon-search{

              display: table-cell;
              padding: 0 .3rem;


              }

            .x-search-ok{
              display: table-cell;
              height: 100%;
              background-color: red;
              color: #fff;
              padding: .1rem .2rem;
              border-bottom-right-radius: 4px;
              border-top-right-radius: 4px;
              cursor: pointer;

            }

            .x-search-input{
              display: table-cell;
              border: none;
              background-color:#fff;
              width: 100%;

            }

          }

      }

        .x-search-history{
          position: relative;
          min-height: 500px;
          padding: 8px;
          display: block;

          .split-line{
            height: 1px;
            width: 100%;
            display: block;
            background-color: #ddd;
          }

          .x-history-head{
            color: $x-light-black;
            .x-icon-trash{
              float: right;
              cursor: pointer;
            }

          }

          .x-history-list{

            .item{
              display: inline-block;
              padding: .2rem .5rem;
              background-color: #f8f3f3;
              border-radius: 14px;
              font-size: .5rem;
              line-height: 1.0rem;
              cursor: pointer;
            }

          }


       }

    }



    /*common*/






  }

</style>
