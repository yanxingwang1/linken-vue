<template>
  <div id="director"  class="register-container">
    <!-- 这里是需要keepalive的 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 这里不会被keepalive -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<style lang="sass" scoped>
  .register-container{
    height: 100%;
  }
</style>
