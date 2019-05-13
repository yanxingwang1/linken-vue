<!-- 取车时间选择 -->
<template>
  <div>
    <div v-if="simple" class="check-cell-wrap simple" :class="{active:defaultValue}">
      <div class="check-cell">
        <div class="check-icon"></div>
        <div class="check-label">
          <div @click="popupVisible=true">{{filterTitle()}}</div>
        </div>
      </div>
    </div>
    <div v-else class="check-cell-wrap" :class="{active:defaultValue}">
      <div class="check-cell">
        <div class="check-icon"></div>
        <div class="check-label">
          <div @click="popupVisible=true">{{filterTitle()}}</div>
        </div>
      </div>
      <div class="check-cell-sub">{{filterSubTitle()}}</div>
    </div>

    <mt-popup v-model="popupVisible" position="bottom">
      <date-time-picker :default-value="defaultValue" @confirm="pickerConfirm"></date-time-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
import WxButton from "./../../../../components/WxButton";
import DateTimePicker from "./DateTimePicker2";

export default {
  components: {
    Popup,
    WxButton,
    DateTimePicker
  },
  name: "TakeTimePickerView",
  data() {
    return {
      popupVisible: false
    };
  },
  props: {
    //简洁模式 显示一行
    simple: {
      type: Boolean,
      default: false
    },
    defaultValue: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "选择时间"
    },
    subtitle: {
      type: String,
      default: "选择时间"
    }
  },
  computed: {},
  methods: {
    filterTitle() {
      const { defaultValue, simple } = this;
      if (simple && defaultValue) {
        // console.log(value)
        return moment(defaultValue).format("YYYY年MM月DD日 dddd HH:mm");
      } else {
        return this.title;
      }
    },
    filterSubTitle() {
      const { defaultValue } = this;
      if (defaultValue) {
        return moment(defaultValue).format("YYYY年MM月DD日 dddd HH:mm");
      } else {
        return this.subtitle;
      }
    },
    pickerConfirm(value) {
      console.log("pickerConfirm", value);
      this.$emit("change", value);
      this.popupVisible = false;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="sass" type="text/scss">
  @function px($px) {
    @return ($px/20)+rem;
  }

  .check-cell-wrap {
    .check-cell {
      display: flex;
      align-items: center;
      font-size: px(14);
      color: #323232;
      min-height: px(20);
      margin-bottom: px(5);

      .check-icon {
        background-image: url("./../../imgs/time0@2x.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: px(14);
        width: px(35);
        min-height: px(20);
        flex: 0 1 auto;
      }

      &.checked .check-icon {
        background-image: url("./../../imgs/time1@2x.png");
      }


      .check-label {
        flex: 1 1 auto;
        padding-left: px(5);
      }
    }

    .check-cell-sub {
      min-height: px(20);
      font-size: px(12);
      padding-left: px(40);
      color: #A9A9A9;
    }
  }

  .check-cell-wrap.simple {
    .check-cell {
      height: px(45);
    }
  }

  .check-cell-wrap.simple.active {
    .check-cell {
      color: #B45F1A;

      .check-icon {
        background-image: url("./../../imgs/time1@2x.png");
      }
    }

  }

  .check-cell-wrap.active {
    .check-cell {
      .check-icon {
        background-image: url("./../../imgs/time1@2x.png");
      }
    }

    .check-cell-sub {
      color: initial;
    }

  }
</style>
