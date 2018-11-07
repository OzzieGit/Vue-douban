<!-- 页面底部 -->
<template>
  <div id="bottom">
    <ul>
      <li>
        <router-link to="/" active-class="active">
          <img src="@/assets/images/icon_foot1.png" />
          <img class="active_img" src="@/assets/images/icon_foot_active1.png" />
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link to="/detail" active-class="active">
          <img src="@/assets/images/icon_foot2.png" />
          <img class="active_img" src="@/assets/images/icon_foot_active2.png" />
          <span>列表</span>
        </router-link>
      </li>
      <!-- <li>
        <router-link to="/user" active-class="active">
          <img src="@/assets/images/icon_foot3.png" />
          <img class="active_img" src="@/assets/images/icon_foot_active3.png" />
          <span>个人</span>
        </router-link>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  name: "bottom"
};
</script>

<style scoped>
#bottom{ position: fixed; bottom: 0; left: 0; width: 100%; height: 0.98rem; }
#bottom ul{ width: 7.5rem; height: 100%; background-color: #fff; border-top: 1px solid #eee; margin: 0 auto; display: flex; justify-content: space-between; }
#bottom li{ width: 50%; height: 100%; }
#bottom li a{ height: 100%; display: flex; justify-content: center; align-items: center; align-content: center; flex-wrap: wrap; }
#bottom li a img{ width: 0.43rem; height: 0.4rem; }
#bottom li a img.active_img{ width: 0; height: 0; }
#bottom li a span{ width: 100%; color: #999; text-align: center; margin-top: 0.1rem; font-size: 0.24rem; }
#bottom li a.router-link-exact-active span{ color: #E02620; }
#bottom li a.router-link-exact-active img{ width: 0; height: 0; }
#bottom li a.router-link-exact-active img.active_img{ width: 0.43rem; height: 0.4rem; }
</style>