<template>
  <div class="baseinfo">
    <div class="name">
      <span>
        姓名
        <span class="red">*</span>
      </span>
      <input
        type="text"
        :value="uptrust.lastName"
        @change="changeinput($event,'lastName')"
        placeholder="姓"
        @blur="onblur('lastName')"
      >
      <!-- <span style="text-align: center;">名</span> -->
      <input
        type="text"
        placeholder="名"
        :value="uptrust.firstName"
        @change="changeinput($event,'firstName')"
        @blur="onblur('firstName')"
      >
    </div>
    <div class="sex">
      <span>
        称谓
        <span class="red">*</span>
      </span>
      <span style="padding-left:0" @click="changesex('0')">
        <img v-show="uptrust.sex=='0'" src="../imgs/sex.png">
        <img v-show="uptrust.sex!='0'" src="../imgs/unsex.png">
        <span>先生</span>
      </span>
      <span @click="changesex('1')">
        <img v-show="uptrust.sex=='1'" src="../imgs/sex.png">
        <img v-show="uptrust.sex!='1'" src="../imgs/unsex.png">
        <span>女士</span>
      </span>
    </div>
    <div class="phone">
      <span>
        联系电话
        <span class="red">*</span>
      </span>
      <input
        type="number"
        :value="uptrust.phone"
        @change="changeinput($event,'phone')"
        @blur="onblur('phone')"
      >
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { debuglog } from "util";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      phone: "",
      sex: ""
    };
  },
  mounted() {
    this.firstName = this.uptrust.firstName;
    this.lastName = this.uptrust.lastName;
    this.phone = this.uptrust.phone;
    this.sex = this.uptrust.sex;
  },
  props: {
    uptrust: {
      type: Object,
      default: false
    }
  },
  watch: {},
  methods: {
    changeinput(e, target) {
      this[target] = e.target.value;
      console.log(this.phone);
      this.$Bus.$emit("uptrust", this.$data);
    },
    changesex(value) {
      this.sex = value;
      this.$Bus.$emit("uptrust", this.$data);
    },
    onblur(type) {
      if (type == "lastName") {
        if (!this.lastName) {
          Toast({
            message: "填写姓名"
          });
          return;
        }
      }
      if (type == "phone") {
        if (!this.phone || !/^1[0-9]{10}$/.test(this.phone)) {
          Toast({
            message: "请输入正确手机号"
          });
          return;
        }
      }
    }
  }
};
</script>
<style lang="sass" scope>
  @function px($px) {
    @return ($px/20)+rem;
  }
.baseinfo{
            input{
            border: none;
           outline: none;
         -webkit-appearance: none;
         -webkit-appearance: none;
         -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              border-radius:3px;
              border:1px solid rgba(226,226,226,1);
              height:34px;
              padding:4px;
            }
            .name {
                height:34px;
                line-height:34px;
                span{
                    display:inline-block;
                    width:23%;
                }
                input{
                       max-width: 36.5%;
                    padding-left:5px;
                }
            }
            .phone{
                 span{
                    display:inline-block;
                    width:23%;
                }
               input{
                   outline: none;
                    width:74%;
                     padding-left:5px;
                       
                }
            }
            .sex{
                  margin: 10px 0;
                >span:nth-child(1){
                    width:23%;
                    padding:0;
                }
                >span{
                    display:inline-block;
                    padding:5px 10px;

                    img{
                    width:20px;
                    vertical-align: top;
                    }
                }

            }
           
}

</style>
