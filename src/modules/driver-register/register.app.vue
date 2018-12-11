<template>
  <div id="register"  class="register-container">
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
    background: #F5F5F5;
    font-size: 16px;
    color: #323232;
    font-family: PingFangSC-Regular;

  }
   .v-modal{
            opacity: 0.3!important;
    }
  
</style>
