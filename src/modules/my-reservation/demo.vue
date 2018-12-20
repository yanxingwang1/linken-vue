
      <template>
          <div>

              <h1>test input number</h1>
              <input  type="file" multiple>
              <audio src="" controls preload loop></audio>
              <video src="" autoplay controls loop preload=""></video>
              <div id='dv' data-name='小明' data-user-age='18'>eeeee</div>
              <canvas id="mycanvas" width='800'></canvas>
        
        <!--[if !IE]><!-->
        
        <!--<![endif]-->
          </div>

      </template>
      
      <script>
      export default {
          data(){
              return{
                  age:''
              }
          },
          watch:{
              age(value){
                  console.log(value)
              },
              
          },
          methods:{
                test(){
                //   document.getElementsByClassName
                //   document.querySelector('stop')
                //  var select= document.querySelectorAll('select')
                // select.classList.add('class')
                // select.classList.remove('class')
                // select.classList.tiggle('class')
                // select.classList.contains('class')
                var dt=document.querySelector('#dv').dataset;
                console.log(dt.name)
                dt.userAge
                dt.userHeight=18
                var fs=document.querySelector('input')
                fs.onchange=function(){
                    var file=this.files[0];
                    var freader=new FileReader;
                    freader.readAsText(file)
                    freader.onload=function(){
                        var style=document.createElement('style');
                        style.innerHTML=freader.result;
                        document.querySelector('head').appendChild(style)

                    }

                    // window.navigator.onLine;
                    // window.ononline=function(){

                    // }
                    // window.onoffline=function(){

                    // }
                    debugger
                   
                }
                // 定位
                 window.navigator.geolocation.getCurrentPosition((msg)=>{
                    
       
                            console.log(msg)
                    },(msg)=>{

                  })

                  var c=document.querySelector("#mycanvas");
                  var ctx=c.getContext('2d');
                  ctx.moveTo(100,100);
                  ctx.lineTo(300,100);
                  ctx.strokeStyle='green';
                  ctx.stroke();
                  ctx.beginPath()

              }
          },
          mounted() {
              this.$nextTick(()=>{
                    this.test()
              })
             
          },
      }
      </script>
      
      <style>
      
      </style>
      