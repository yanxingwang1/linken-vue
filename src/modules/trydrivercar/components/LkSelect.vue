<template>
  <div class="lk-select-wrap" :class="{disabled:this.disabled}">
    <div class="lk-label">
      {{label}}
      <span class="reqired" v-if="required">*</span>
    </div>
    <div class="lk-content">
      <n3-select
        :value="value"
        :options="opts"
        @change="selectChange"
        :disabled="disabled"
      >
      </n3-select>
    </div>
  </div>
</template>

<script>
  import n3Select from 'N3-components/src/Select/n3Select'
  import n3Option from 'N3-components/src/Select/n3Option'
  import 'N3-components/dist/index.min.css'

  export default {
    name: 'LkSelect',
    props: {
      value:{
        type:String
      },
      label: {
        type: String,
        default: '选择框'
      },
      opts: {
        type: Array | Object,
        default () {
          return [
            {value: 'apple', label: 'Apple'},
            {value: 'banana', label: 'Banana'},
            {value: 'cherry', label: 'Cherry'},
            {value: 'orange', label: 'Orange'},
            {value: 'grape', label: 'Grape'}
          ]
        }
      },
      required:{
        type:Boolean,
        default:false
      },
      disabled:{
        type:Boolean,
        default:false
      }

    },
    methods:{
      selectChange(val){
        console.log('selectChange',val)
        this.$emit('input',val)
      }
    },
    components: {
      n3Select,
      n3Option
    }
  }
</script>

<style scoped lang="sass" type="text/scss">
  $nomal-color : #3E3E3E;
  $disabled-color : #E2E2E2;
  .lk-select-wrap {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    font-size: 16px;
    color: $nomal-color;
    .lk-label {
      width: 26%;
      font-weight: 500;
      .reqired{
        color: red;
      }
    }
    .lk-content {
      position: relative;
      width: 74%;
    }
    &.disabled{
      .lk-label {
        color: $disabled-color;
        .reqired{
          color: $disabled-color;
        }
      }
    }
  }
</style>
