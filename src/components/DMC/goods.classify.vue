<template>
  <div id="gcl" class="gcl-wrap" v-on:click="nodeclick($event)">
    <ul>
      <item ref="tree"
        class="item"
        :model="treeData">
      </item>
    </ul>
  </div>
</template>


<script>

  const prev = {'id':''};
  const currentItem = {'selected':''};
  function trigger(_element,_event){
//IE
    if(document.all) {
      _element._event();
    }
// 其它浏览器
    else {
      var e = document.createEvent("MouseEvents");
      e.initEvent(_event, true, true);
      _element.dispatchEvent(e);　
    }
  }

  // define the item component


  export default {
    name: 'GdClassify',
    props:{
      cdata:{
        type:Array,
        default:[]
      }
    },
    data() {
      return {
        treeData: {
          // name: '全部分类',
          isRoot:true,
          level:0,
          child: []
        }
      }
    },
    watch:{
      cdata:function () {
        this.$set(this.treeData,'child',this['cdata']);
      }
    },
    components: {
      item:{
        name:'item',
        template: '<li>\n' +
        '    <div :id="model.id" class="itemName" \n' +
        '      :class="{root:model.isRoot,last:!isFolder&&!model.isRoot}"\n' +
        '       :style="\'paddingLeft:\'+lv+\'em\'"'+
        '      @click.capture="toggle($event,model)">\n' +
        '      {{model.name}}\n' +
        ' <i class="iconfont p-right iok" v-if="!isFolder">&#xe624;</i>\n' +
        '      <i class="iconfont p-right" v-if="isFolder&&!model.isRoot">{{open ? \'&#xe611;\' : \'&#xe688;\'}}</i>\n' +
        '    </div>\n' +
        '    <ul class="item-ul" v-show="open||model.isRoot" v-if="isFolder||model.isRoot">\n' +
        '      <item\n' +
        '        class="item"\n' +
        '        v-for="(model,index) in model.child"\n' +
        '        :model="model" :key="index">\n' +
        '      </item>\n' +
        '    </ul>\n' +
        '  </li>',
        props: {
          model: Object
        },
        data: function () {
          return {
            open: false
          }
        },
        computed: {
          isFolder: function () {
            return this.model.child &&
              this.model.child.length
          },
          lv: function () {
            return this.model.level
          }
        },
        methods: {
          toggle: function (event,item) {
            

            const $wrap = document.getElementById('gcl');


            if (this.isFolder) {
              this.open = !this.open;
            }else {
              const $target = event.target;
              const $prev = document.getElementById(prev['id']);
              const isdiff = item['id'] != prev['id'];
              if($prev&&isdiff){
                $prev.className = 'itemName';
                currentItem['selected'] = item;
              }else{
                if($target.className.indexOf('item-selected')>-1){
                  currentItem['selected'] = {};
                  // debugger
                }else{
                  currentItem['selected'] = item;
                }
              }
              if($target.className.indexOf('item-selected')>-1){
                $target.className = 'itemName last';
              }else{
                $target.className = $target.className+' item-selected last';
              }


              trigger($wrap,'click');


              prev['id'] = item['id'];
            }


          }
        }
      }
    },

    methods: {
      nodeclick(event){
        // debugger
        const $target = event.target;
        // debugger
        if($target.className.indexOf('root')>-1){
          
          $target.className = $target.className+' item-selected';
          currentItem['selected'] = {};
          // //  this.open = !this.open;
          //  if($target.className.indexOf('item-selected')>-1){
          //    debugger
          //         currentItem['selected'] = {};
          //         // debugger
          //       }else{
          //         currentItem['selected'] = item;
          //       }
          this.$emit('gselected',1);
          //  trigger($wrap,'click');
          // debugger
        }
        if($target.className.indexOf('last')>-1){
          this.$emit('gselected',currentItem['selected']);
          // debugger
        }

      }
    },
    beforeMount() {
      //todo

    },
    mounted() {
      //todo
    }

  }

</script>

<style lang="sass">
  .root{
      text-align: center;
    line-height: 3.3em;
    font-weight: bold;
    }
  .item {
    cursor: pointer;

  }
  .itemName{
    border-bottom: 1px solid #f2f1f1;
    padding-left:.5rem;
      padding-right: .5rem;
  }

    .item-ul>.item>.itemName{
    padding-left: 1em;
        line-height: 2rem;
  }


  ul {
    padding-left: 1em;
    line-height: 2.5em;
    list-style-type: dot;
  }
    .p-right{
      float: right;
      }
      .iok{

        visibility: hidden;
        }
      .item-selected .iok{
        visibility: visible;
        }

        .itemName.item-selected{
        color: red;
    }




</style>
