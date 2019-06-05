
<template>
    <div class="servicemode">
        <!-- 取消订单 -->
        <div v-if="servicemode.status==10661006" class="completed">
           <div class="step await" :class="canelstep==1?'active':'hover'" @click="Link(1)">
                 <div class="icon"></div>
                <div>待进厂</div>
            </div>
            <div class="line" :class="canelstep==2?'lineactive':''"></div>
             <div class="step willdone canel" :class="canelstep==2?'active':'hover'" @click="Link(2)">
               <div class="icon"></div>
                <div>已取消</div>
            </div>
            <div class="line" style="visibility: hidden;"></div>
            <div class="step" style="visibility: hidden;"></div>
        </div>
        <!-- 订单非取消状态视图 -->
        <div v-else class="completed">
            <div class="step await" :class="wait==3?'active':'hover'" @click="Wait(1)">
                 <div class="icon"></div>
                <div>待进厂</div>
            </div>
            <div class="line" :class="line1?'lineactive':''"></div>
             <div class="step willdone" :class="willdone==3?'active':willdone==2?'hover':''" @click="Wait(2)">
               <div class="icon"></div>
                <div>已进厂</div>
            </div>
              <div class="line" :class="line2?'lineactive':''"></div>
             <div class="step done" :class="done==3?'active':done==2?'hover':''" @click="Wait(3)">
                <div class="icon"></div>
                <div>已完成</div>
            </div>
        </div>
        
    </div>
</template>
<script>
  const reparetypes = {
    '10661003': '待进厂',
	'10661000': '已进厂',
	'10661004': '已完成',
	'10661006': '已取消'
};
export default {
    name: 'serviceMode',
    data(){
        return {
            canelstep:2,//取消状态标记默认取消态
            clickstep:null,//保存点击态
        }
    },
      props:{
       servicemode:{
           type:Object,
           require:true
       }
    },
    computed:{
        wait(){//待进厂状态1 灰色 2 可点击 3 激活
            var state=2
            if(this.servicemode.status==10661003){//待进厂
                state=3
            }else if(this.servicemode.status==10661000){//已进厂
                    if(this.clickstep==1){
                         state=3
                    }
            }else if(this.servicemode.status==10661004){
                    if(this.clickstep==1){
                         state=3
                    }
            }
            return state;
        },
        willdone(){//已进厂状态1 灰色 2 可点击 3 激活
          var state=2
            if(this.servicemode.status==10661003){//待进厂
                state=1
            }else if(this.servicemode.status==10661000){//已进厂
                  state=3
                 if(this.clickstep==1){
                     state=2
                 }
            }else if(this.servicemode.status==10661004){
                    if(this.clickstep==2){
                         state=3
                    }
            }
             return state;
        },
        done(){//已完成状态1 灰色 2 可点击 3 激活
          var state=2
             if(this.servicemode.status==10661003){//待进厂
                state=1
            }else if(this.servicemode.status==10661000){//已进厂
                 state=1
            }else if(this.servicemode.status==10661004){//已进厂
                 state=3
                 if(this.clickstep==1||this.clickstep==2){
                     state=2
                 }
                 
            }
             return state;
        },
        line1(){
            var state=false
             if(this.servicemode.status==10661003){//待进厂
                state=false
            }else if(this.servicemode.status==10661000){//已进厂
                 state=true
            }
            else if(this.servicemode.status==10661004){//已进厂
                 state=true
                 if(this.clickstep==1){
                     state=false
                 }
            }
             return state;
        },
        line2(){
            var state=false
             if(this.servicemode.status==10661004){//已进厂
                 state=true
            }
            if(this.clickstep==1||this.clickstep==2){
                 state=false
            }
             return state;
        },
    
    },
    methods:{
        Link(value){//取消转态点击事件
            this.canelstep=value
            // this.$Bus.$emit('diff',value)
        },
        Wait(value){//已进厂可完成状态切换
            this.$emit('diffValue',value)
            // 防止重复点击
            if(this.servicemode.status==10661003){
                return ;
            }else if(this.servicemode.status==10661000){
                if(value==1||value==2){
                    this.clickstep=value
                }
            }else if(this.servicemode.status==10661004){
                this.clickstep=value
            }
           
        }
    }
    
}
</script>
<style lang="sass" scoped="" type="text/css">
    .completed{
        padding:20px;
        font-size: 12px;
        padding-bottom:5px;
        display:flex;
        align-items: center;
         
        .step{
            width:60px;
            height:60px;
            border-radius: 50%;
            border: 1px solid #A1A1A1;
            color: #A1A1A1;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
        }
      
        .await{
            .icon{
                width:16px;
                height:20px;
                background:url("../imgs/qr-on.png") no-repeat;
                background-size: 100%;
            }
        }
        .willdone{
            .icon{
                width:16px;
                height:20px;
                background:url("../imgs/jc-unable.png") no-repeat;
                background-size: 100%;
            }
        }
        .canel{
             .icon{
                width:16px;
                height:20px;
                background:url("../imgs/qx-on.png") no-repeat;
                background-size: 100%;
            }
        }
        .done{
            .icon{
                width:16px;
                height:20px;
                background:url("../imgs/wc-unable.png") no-repeat;
                background-size: 100%;
            }
        }
         .active{
            background: #B45F1A;
            color: #fff;
            border-color: transparent;
        }
        .line.lineactive{
            background: #B45F1A;
        }
        .active.await{
            .icon{
                background:url("../imgs/qr-able.png") no-repeat;
                background-size: 100%;
            }
        }
        .active.willdone{
            .icon{
                background:url("../imgs/jc-able.png") no-repeat;
                background-size: 100%;
            }
        }
         .active.canel{
            .icon{
                background:url("../imgs/qx-able.png") no-repeat;
                background-size: 100%;
            }
        }
        .active.done{
            .icon{
                background:url("../imgs/wc-able.png") no-repeat;
                background-size: 100%;
            }
        }
        .hover{
            background: #fff;
            color: #B45F1A;
            border-color: #B45F1A;
        }
        .hover.await{
            .icon{
                background:url("../imgs/qr-on.png") no-repeat;
                background-size: 100%;
            }
        }
        .hover.willdone{
            .icon{
                background:url("../imgs/jc-on.png") no-repeat;
                background-size: 100%;
            }
        }
         .hover.canel{
            .icon{
                background:url("../imgs/qx-on.png") no-repeat;
                background-size: 100%;
            }
        }
        .hover.done{
            .icon{
                background:url("../imgs/wc-on.png") no-repeat;
                background-size: 100%;
            }
        }
       
        .line{
            display:flex;
            flex:1;
            height:1px;
            background: #A1A1A1;
            margin: 0px 7px;
            border-radius: 0;
        }

    }
</style>
