<template>
  <div id="salemap">
    <!-- 销售车型 -->
    <div class="car-type">
      <div>
        <div>
          <img src="../images/car.png" alt>
        </div>
        <div>MKC</div>
      </div>
      <div>
        <div>
          <img src="../images/car.png" alt>
        </div>
        <div>NKC</div>
      </div>
      <div>
        <div>
          <img src="../images/car.png" alt>
        </div>
        <div>MAV</div>
      </div>
      <div>
        <div>
          <img src="../images/car.png" alt>
        </div>
        <div>MKZ</div>
      </div>
      <div>
        <div>
          <img src="../images/car.png" alt>
        </div>
        <div>CONT</div>
      </div>
      <div>
        <div>达成率</div>
        <div class="pass">
          <img src="../images/open.png">
        </div>
      </div>
    </div>
    <!-- 销售地区 -->
    <div class="salearea">
      <div v-for="(item,index) in data" :key="index">
        <!-- 遍历显示大区 -->
        <div class="row0">
          <div class="area" @click="folded(item.name,index)">
            {{item.name}}
            <img src="../images/down.png" alt>
          </div>
          <div class="num" v-for="(v,i) in item.num" :key="i">{{v}}</div>
          <div class="total">{{item.total}}</div>
        </div>
        <!-- 遍历东一区 -->
        <div v-for="(v1,i1) in item.child" :key="i1" v-if="v1.show">
          <div class="row0">
            <div class="area">
              {{v1.name}}
              <img src="../images/down.png" alt>
            </div>
            <div class="num" v-for="(v2,i2) in v1.num" :key="i2">{{v2}}</div>
            <div class="total">{{v1.total}}</div>
          </div>
          <!-- 遍历显示北京上海 -->
          <div v-for="(v3,i3) in v1.child" :key="i3" v-if="v3.show">
            <div class="row0">
              <div class="area">
                {{v3.name}}
                <img src="../images/down.png" alt>
              </div>
              <div class="num" v-for="(v4,i4) in v3.num" :key="i4">{{v4}}</div>
              <div class="total">{{v3.total}}</div>
            </div>
            <!-- 遍历城市具体的经销商 -->
            <div class="row0" v-for="(v5,i5) in v3.child" :key="i5">
              <div class="area">
                {{v5.name}}
                <img src="../images/down.png" alt>
              </div>
              <div class="num" v-for="(v6,i6) in v5.num" :key="i6">{{v6}}</div>
              <div class="total">{{v5.total}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          name: "东区",
          num: [1, 2, 3, 4, 5],
          total: 15,
          show: false,
          child: [
            {
              name: "东一区",
              num: [1, 2, 3, 4, 5],
              total: 18,
              show: false,
              child: [
                {
                  name: "上海",
                  num: [1, 2, 3, 4, 5],
                  total: 111,
                  show: false,
                  child: [
                    {
                      name: "林肯",
                      num: [1, 2, 3, 4, 5],
                      total: 11
                    },
                    {
                      name: "绿地",
                      num: [1, 2, 3, 4, 5],
                      total: 16
                    }
                  ]
                },
                {
                  name: "北京",
                  num: [1, 2, 3, 4, 5],
                  total: 122,
                  show: false
                }
              ]
            },
            {
              name: "东二区",
              num: [1, 2, 3, 4, 5],
              total: 10,
              show: false
            }
          ]
        },
        {
          name: "西区",
          num: [1, 2, 3, 4, 5],
          total: 15,
          show: false,
          child: [
            {
              name: "西一区",
              num: [1, 2, 3, 4, 5],
              total: 18,
              show: false
            },
            {
              name: "西二区",
              num: [1, 2, 3, 4, 5],
              total: 10,
              show: false
            }
          ]
        }
      ]
    };
  },
  methods: {
    folded(name, index) {
      debugger;
      if (this.data[index].show == false) {
        if (name == "东区" || name == "西区") {
          // 所有关闭
          this.data.forEach(child => {
            //   把一级值为关
            child.show = false;
            child.child.forEach(element => {
              element.show = false;
            });
          });

          // 当前展开，
          this.data[index].show = true;
          this.data[index].child.forEach(element => {
            element.show = true;
          });
        }
      } else {
        debugger;
        this.data[index].show = false;
        this.data[index].child.forEach(element => {
          element.show = false;
        });
      }
    }
  }
};
</script>
<style lang="sass" scope>
    .car-type{
    display: flex;
    text-align: center;
    margin: 15px 0 10px 65px;
        img{
            width:50px;
            height:25px;
        }
        .pass{
            img{
             width:24px;
            height:12px;
            }
          
        }
    }
    .salearea{
        .row0{
             display: flex;
             text-align: center;
             background: #F6F6F6;
             height:44px;
             align-items:center;
             font-size: 14px;
            color: #444344;
            margin-top:4px;
             .area{
                 width:65px;
                 img{
                     float:right;
                     margin-top: 7px;
                     width: 12px;
                 }
             }
             .num,.total{
                  width:50px;
             }
            //  .row1{
            //      display:flex;
            //  }
        }
    }
</style>
