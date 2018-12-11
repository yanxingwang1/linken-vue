<template>
  <div class="Malert" v-show="isShow" @click.self="close">
    <div class="Mforms">
        <i class="iconfont fr" alt="叉叉" @click="close">&#xe64b;</i>
        <div class="window">
            <div>
                <img v-show="value.driverPicture==null" src="http://i-club.gmmc.com.cn/fs01/assets/v2/img/images/noPicture.png">
                <img v-show="value.driverPicture!=null" :src="value.driverPicture">
            </div>
            <p>
                <span>司机工号:</span>
                <span>{{value.driverNo}}</span>
            </p>
            <p>
                <span>司机电话:</span>
                <span>{{value.driverPhone}}</span>
                <a :href="value.driverPhone | getPhone">
                    <i class="iconfont" alt="电话">&#xe625;</i>
                </a>

            </p>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Malert',
    data () {
      return {
        isShow:false,
      }
    },
    methods:{
      init(){},
      close(){
        this.isShow = false
        this.$emit('hidden',this.isShow)
      },
    },
    computed: {},
    components:{},
    beforeMount(){},
    mounted(){
        return this.$nextTick(()=>this.init())
    },
    props:['check','value'],
    filters:{
        getPhone(_val){
            return 'tel:'+_val;
        }
    },
    watch:{
        check(){
            this.isShow = this.check
        }
    }

  }
</script>

<style lang="sass" scoped>
  .Malert{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background-color:rgba(0,0,0,.4);
    z-index:99999;
    .Mforms{
        >i{
            color:white;
            margin: -1rem -1rem 0 0;
            font-size:1rem;
        }
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width:12rem;
        height:8rem;
        .window{
            box-sizing:border-box;
            padding:.5rem;
            width:100%;
            height:100%;
            background-color: white;
            border-radius: .5rem;
            >div{
                width:3rem;
                height:3rem;
                margin-left: 50%;
                transform: translateX(-50%);
                border-radius:1.5rem;
                border: .5px solid #ccc;
                overflow:hidden;
                img{
                    width:100%;
                }
                margin-bottom:.5rem;
            }
            >p{
                line-height:1.5rem;
                padding-left:2rem;
            }
            >p:nth-of-type(2){
                i{
                  color:rgb(229,0,20);
                }

            }
        }

    }
  }
</style>
