<template>
  <div class="baseinfo">
    <div class="name">
      <span>
        姓名
        <span class="red">*</span>
      </span>

      <input type="text" v-model="uptrust.lastName" placeholder="姓" @blur="checklastName">

      <input type="text" placeholder="名" v-model="uptrust.firstName">
    </div>

    <slot></slot>
    <div class="phone">
      <span>
        联系电话
        <span class="red">*</span>
      </span>

      <input type="number" v-model="uptrust.phone" @blur="checkphone">
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { debuglog } from "util";
export default {
  data() {
    return {
      firstName: this.uptrust.firstName,
      lastName: this.uptrust.lastName,
      phone: this.uptrust.phone,
      sex: this.uptrust.sex
    };
  },
  mounted() {
  
  },
  props: {
    uptrust: {
      type: Object,
      default: false
    }
  },
  watch: {},
  methods: {
    checklastName() {
      if (!this.uptrust.lastName) {
        Toast({
          message: "填写姓名",
          duration: 500
        });
        return;
      }
      
    },
    checkphone() {
      if (!this.uptrust.phone || !/^1[0-9]{10}$/.test(this.uptrust.phone)) {
        Toast({
          message: "请输入正确手机号",
          duration: 500
        });
        return;
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
                // line-height:34px;
                span{
                    display:inline-block;
                    width:23%;
                }
                input{
                  outline: none;
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
