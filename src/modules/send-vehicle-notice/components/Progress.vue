<template>
    <div class="progstep">
        <div class="line"></div>
        <div class="main" v-show="showProgress==1">
            <div class="step " :class="step==1?'active':'hover'">
                <div>待确认</div>
                <div class="circle"></div>
                <div class="circle-line " :class="step>1?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step " :class="step==2?'active':step>2?'hover':''">
                <div>派单中</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>2?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step " :class="step==3?'active':step>3?'hover':''">
                <div>已接单</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>3?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==4?'active':step>4?'hover':''">
                <div>取车订单开启</div>
                <div class="circle"></div>
                <div class="circle-line " :class="step>4?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==5?'active':step>5?'hover':''">
                <div>取车中</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>5?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==6?'active':step>6?'hover':''">
                <div>已收车</div>
                <div class="circle"></div>
                <div class="circle-line" style="visibility: hidden;"></div>
                <div>2019-12-14</div>
            </div>
        </div>
         <div class="main" v-show="showProgress==2||showProgress==3">
                <div class="step " :class="step==11?'active':'hover'">
                <div>估价待确认</div>
                <div class="circle"></div>
                <div class="circle-line " :class="step>11?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step " :class="step==12?'active':step>12?'hover':''">
                <div>等待服务</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>12?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step " :class="step==13?'active':step>13?'hover':''">
                <div>正在服务</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>13?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==14?'active':step>14?'hover':''">
                <div>正在质检</div>
                <div class="circle"></div>
                <div class="circle-line " :class="step>14?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==15?'active':step>15?'hover':''">
                <div>正在洗车</div>
                <div class="circle"></div>
                <div class="circle-line" :class="step>15?'line-active':''"></div>
                <div>2019-12-14</div>
            </div>
             <div class="step" :class="step==16?'active':step>16?'hover':''">
                <div>交车准备</div>
                <div class="circle"></div>
                <div class="circle-line" style="visibility: hidden;"></div>
                <div>2019-12-14</div>
            </div>
         </div>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    props:{
        step:{
            type:Number,
            require:true
        },
        showProgress: {
            type:[Number,String]
        }
    },
}
</script>
<style lang="sass" scoped>
.progstep{
    .line{
            height:1px;
            background:rgba(174,174,174,1);
            margin: 15px 0;
         }
    .main{
        color:#BFBFBF;
        font-size:12px;
        .step{
            display: flex;
            height: 30px;
            position: relative;
            >div:nth-child(1){
                min-width:80px;
            }
             >div:nth-child(4){
                margin-left:20px;
            }
            .circle{
                   width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    background: #bdbdbd;
                    margin-top: 6px;
                    margin-left: 1px;
                    
                }
            .circle-line {
                    position: absolute;
                    width: 1px;
                    height: 30px;
                    background: #BDBDBD;
                    top: 11px;
                    left: 83px;
            }
            .line-active{
                background: #FFB57B;
            }
         
        }
        .active{
            color:#B45F1A;
            .circle{
                width: 7px;
                height: 7px;
                background: #ffb57b;
                border: 1px solid #b45f1a;
                z-index: 1;
                margin-left: 0;
            }
        }
        .hover{
             color:#1A1919;
             .circle{
                  background: #B45F1A;
             }
        }
           
        }
    }
</style>