<template>
  <div id="fetchAndDeliver"  class="fetch-and-deliver">
    <!-- 这里是需要keepalive的 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 这里不会被keepalive -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="sass" scoped>
  .fetch-and-deliver{
    height: 100%;
  }
</style>
