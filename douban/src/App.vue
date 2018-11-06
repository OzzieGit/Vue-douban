<template>
  <div id="app">
    <Top :page="this.$store.state.page" />
    <div class="main" ><router-view/></div>
    <!-- :style="`padding: 0.88rem 0 ${$store.state.pageGrade == 1 ? 1 : 0.3}rem;`" -->
    <Bottom v-if="false" />
  </div>
</template>

<script>
import Top from "./components/top";
import Bottom from "./components/bottom";
export default {
  name: "app",
  components: {
    Top, Bottom
  }
};
</script>

<style>
.main{ padding: 0.88rem 0 0;}
</style>
