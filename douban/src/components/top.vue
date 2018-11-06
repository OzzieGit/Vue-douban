<!-- 页面顶部 -->
<template>
  <div id="top">
    <div>
      <span class="back" v-if="$store.state.page != 'index'" @click="$router.back(-1)"></span>
      <h1>{{ $store.state.title }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  props: {
    page: String
  }
};
</script>

<style scoped>
#top { width: 100%; height: 0.88rem; position: fixed; top: 0; left: 0; z-index: 1; }
#top div{ width: 7.5rem; height: 100%; background-color: #E02620; margin: 0 auto; position: relative; }
#top div h1{ line-height: 0.88rem; color: #fff; font-size: 0.32rem; font-weight: 100; text-align: center; }
#top div span.back{ width: 0.63rem; height: 0.88rem; position: absolute; top: 0; left: 0; z-index: 1; background: url(../assets/images/icon_back.png) no-repeat 0.3rem center; background-size: 0.23rem 0.4rem; }
</style>