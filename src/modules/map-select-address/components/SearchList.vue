<template>
  <div class="search-list-wrap">
    <div class="list-cell-wrap" v-for="(tip,i) in searchList">
      <div class="list-cell-inner" @click="$emit('list-cell-on-click',tip)">
        <div class="cell-title">{{tip.name}}</div>
        <div class="cell-desc">{{tip.district}}{{tip.address}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SearchList",
    props: {
      searchList: Array
    },
  }
</script>

<style lang="sass" type="text/scss" scoped>
  @function px($px) {
    @return ($px/20)+rem;
  }

  .search-list-wrap {
    position: absolute;
    padding: 0 px(15);
    right: px(15);
    top: px(80);
    width: px(270);
    /*height: px(400);*/
    background-color: #FFFFFF;
    border-radius: 3px;
    box-shadow: 4px 3px 5px rgba(0, 0, 0, .2);
  }

  .list-cell-wrap {
    .list-cell-inner {
      padding: 10px 0;
      border-bottom: solid 1px black;

      .cell-title {
        font-size: 14px;
      }

      .cell-desc {
        font-size: 12px;
      }
    }
  }

  .list-cell-wrap:nth-last-child(1) .list-cell-inner {
    border-bottom: initial;
  }
</style>
