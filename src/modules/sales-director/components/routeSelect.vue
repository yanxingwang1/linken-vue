<template>
    <div class="route-select-main">
        <n3-select :cancelled="false" placeholder="请选择" v-model="choose" :options="list" style="width:100%;" @change='saveSelect()'>
            <!-- <n3-option v-for="(item,i) in list" :key="i" :value="item.planCode">{{item.description}}</n3-option> -->
            <!-- <li v-for="(item,i) in list" :key="i" :value="item.planCode" style="position:relative;">
                <a>
                    <span>{{item.description}}</span>
                    <i class="n3-fa n3-fa-check" style="display:none;"></i>
                </a>
            </li> -->
        </n3-select>    
    </div>
</template>

<script>
  export default {
    name: 'route-select',
    props: {
        list:{
            type:Array,
            required:true
        },
        selectItem:{
            type:String,
            required:true
        }
    },
    data() {
      return {
          choose:''
      }
    },
    watch: {
    },
    methods:{
        saveSelect(){
            //给父组件传参
            this.$emit('changeValue',this.choose);
        }
    },
    mounted() {
        this.choose = this.selectItem;
    },
  }
</script>
<style lang="sass" scoped>
    .route-select-main {
        font-family:'PingFangSC-Regular';
        margin: 20px 0 5px 0;
    }
</style>



