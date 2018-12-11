<template>
  <div class="imgValidate">
    <canvas id="canvas" width="120" height="40" @click="drawPic"></canvas>
  </div>
</template>

<script>
  export default {
    name: 'imgValidate',
    data () {
      return {
        sum:1
      }
    },
    methods:{
        init(){
            this.drawPic()
        },
        drawPic(){  // 生成图片
            ++this.sum
          var parentEl = $(".imgValidate");
          var canvas=document.getElementById("canvas");
          var width=parentEl.width();
          $("#canvas").width(width+'px');
          var height=canvas.height;
          var ctx = canvas.getContext('2d');
          ctx.textBaseline = 'bottom';

          /**绘制背景色**/
          ctx.fillStyle = this.randomColor(180,240); //颜色若太深可能导致看不清
          ctx.fillRect(0,0,width,height);

          /**绘制文字**/
          var str = this.validate || 'ABCE';
          for(var i=0; i<4; i++){
            //var txt = str[randomNum(0,str.length)];
            var txt = str[i];
            ctx.fillStyle = this.randomColor(50,160);  //随机生成字体颜色
            ctx.font = this.randomNum(15,35)+'px SimHei'; //随机生成字体大小
            var x = 10+i*25;
            var y = this.randomNum(25,40);
            var deg = this.randomNum(-40, 40);
            //修改坐标原点和旋转角度
            ctx.translate(x,y);
            ctx.rotate(deg*Math.PI/180);
            ctx.fillText(txt, 0,0);
            //恢复坐标原点和旋转角度
            ctx.rotate(-deg*Math.PI/180);
            ctx.translate(-x,-y);
          }
          /**绘制干扰线**/
/*          for(var i=0; i<8; i++){
            ctx.strokeStyle = this.randomColor(40,180);
            ctx.beginPath();
            ctx.moveTo( this.randomNum(0,width), this.randomNum(0,height) );
            ctx.lineTo( this.randomNum(0,width), this.randomNum(0,height) );
            ctx.stroke();
          }*/
          /**绘制干扰点**/
          for(var i=0; i<100; i++){
            ctx.fillStyle = this.randomColor(0,255);
            ctx.beginPath();
            ctx.arc(this.randomNum(0,width),this.randomNum(0,height), 1, 0, 2*Math.PI);
            ctx.fill();
          }
        },
        randomNum(min,max){ // 生成随机数
          return Math.floor( Math.random()*(max-min)+min);
        },
        randomColor(min,max){ // 生成随机颜色
          var r = this.randomNum(min,max);
          var g = this.randomNum(min,max);
          var b = this.randomNum(min,max);
          return "rgb("+r+","+g+","+b+")";
        }
    },
    computed: {},
    components:{},
    props:['validate','change'],
    beforeMount(){},
    mounted(){
        return this.$nextTick(()=>this.init())
    },
    watch:{
        validate(){
            console.log(0)
            this.drawPic()
        },
        change(){
            console.log(2)
            this.drawPic()
        }
    }

  }
</script>

<style lang="sass" scoped>
  .imgValidate{
      height:40px;
        padding: 6px 0px;

  }
</style>
