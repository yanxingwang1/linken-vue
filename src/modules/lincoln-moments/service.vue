<template>
  <div>
    <img src="https://lincoln-mp-dev.yonyouauto.com/fs01/material/lincoln-service.jpg" style="width:100%"/>
    <div class="desction-service">
      <div class="desctitle">以你至上，让豪华回归本源</div>
      <div class="desc">
          <div class="descline">
            在林肯，我们所有的服务，都只有一个出发点：你。 我们运用全球资源, 与世界顶尖的顾客体验专家一同，打造专属于你的豪华体验。
            <br/>
            当你走近林肯，从售前、购置到享有的全程，你所得到的绝不仅仅是一台豪华座驾本身，
          </div>
          <div class="descline">
            舒适、安心、个性、便利，将始终一路相随为你尊享。&nbsp;
          </div>
      </div>
    </div>
    <desc-tion v-bind:desc='tryDrive'></desc-tion>
    <desc-tion v-bind:desc='newCarPay'></desc-tion>
    <desc-tion v-bind:desc='service'></desc-tion>
    <div style="background-color:rgb(247, 247, 247)">
      <desc-tion v-bind:desc='lincoln'></desc-tion>
    </div>
  </div>
</template>

<script>
import descTion from "./components/desction.vue"

  export default {
    name: "index",
    components: {
        descTion
    },
    created() {
      end_time = new Date().getTime();
      console.log("index加载时间：", end_time - start_time, "ms");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    data() {
      return {
        tryDrive: {
          title:'个性化试驾',
          cons:[
            {desc:'试驾，是选车过程中及其重要的环节。林肯了解，再完美的展厅试驾路线，始终是他人的预先设定，只有你才了解自己的真是需求。'},
            {desc:'正因为如此，林肯愿意倾听你的需要，为你定制最符合期待的路线，让你找到最有价值的答案。'}
          ]
        },
        newCarPay: {
          title:'新车交付',
          cons:[
            {desc:'交付新车，意味着一段很长远而真挚的关系正式启程，这一时刻，对你和林肯而言都很重要。届时，你的专属服务团队将列队迎接，与你共同见证这一时刻， 而全新座驾中的一切，都将按照你的身形、喜好预先设置就位，等待与你一同出发。'}
          ]
        },
        service: {
          title:'代步车服务',
          cons:[
            {desc:'如果您的座驾在保修期内因质量问题需送修且无法立即取用，您只需要提前成功电话预约代步车服务，即可在送修同时享受该服务，'},
            {desc:'避免因座驾缺失而造成生活的不便。从你走进林肯开始，我们就已为你考虑购享林肯的每个环节，让便利与省心始终相伴。'}
          ]
        },
        lincoln:{
          title:'林肯之道',
          cons:[
            {desc:'以人性化体验，与你建立真挚而恒久的关系'}
          ]
        },
      }
    },
    directives: {
    },
    watch:{
      
    },
    methods: {
      init() {
        this.queryOrder();
      },
      
          
    },
    activated: function () {
      // if(this.$route.query.type=='preview'){
      //   this.init();// this.carOwnerDto.totalPrice = (this.$route.query.money || 81500);
      //   this.configId = this.$route.query.id;
      // }
      $(document).attr('title','林肯服务');
    },
    beforeMount() {
      $(document).attr('title','林肯服务');
    },
  

    mounted() {
    
      // return this.$nextTick(() => this.init());
    }
  };

</script>

<style lang="sass" scoped>
  .desction-service{
        font-family: lincolnmillerb, Georgia, "Microsoft Yahei", 微软雅黑, STXihei, sans-serif, Heiti, Songti;
        font-weight: normal;
        padding: 15px 30px 20px 30px;
        line-height:1.5;
        .desctitle{
            color: #000;
            font-weight:bold;
            font-size:24px;
            text-align:center;
            margin-top: 20px;
            margin-bottom: 10px;
        }
        .desc{
            font-size: 12px;
            .descline{
              text-align: center;
              color: #4f4c43;
              padding-bottom:10px;
            }
        }
    }
  
</style>
