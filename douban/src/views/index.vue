<template>
  <div class="index">
    <mt-swipe class="swipe" :auto="3000">
      <mt-swipe-item>
        <router-link to="detail?id=2973079">
          <img src="@/assets/images/hbtr.jpg" />
        </router-link>
      </mt-swipe-item>
      <mt-swipe-item>
        <router-link to="detail?id=3610047">
          <img src="@/assets/images/bxjg.jpg" />
        </router-link>
      </mt-swipe-item>
      <mt-swipe-item>
        <router-link to="detail?id=3395373">
          <img src="@/assets/images/bhx.jpg" />
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
    <router-link to="/search" class="search_link">
      <img src="@/assets/images/icon_search.png" />搜索
    </router-link>
    <div class="module_box">
      <div class="module">
        <div class="module_title">
          <img src="@/assets/images/icon_hot.png" />
          <span>最新上映</span>
        </div>
        <div class="module_content">
          <ul :style="'width:' + (hot.length * 2.2 - 0.2) + 'rem'">
            <li v-for="item in hot" :key="item.id">
              <router-link :to="'/detail?id='+item.id">
                <img :src="item.images.small" />
                <span>{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link :to="{path:'/list',query: {type: 'hot'}}" class="more">查看更多</router-link>
      </div>
      <div class="module">
        <div class="module_title">
          <img src="@/assets/images/icon_top.png" />
          <span>TOP250</span>
        </div>
        <div class="module_content">
          <ul :style="'width:' + (top250.length * 2.2 - 0.2) + 'rem'">
            <li v-for="item in top250" :key="item.id">
              <router-link :to="'/detail?id='+item.id">
                <img :src="item.images.small" />
                <span>{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-link to="/list?type=top250" class="more">查看更多</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      banner:[{
        url:""
      },{
        url:"../assets/images/bxjg.jpg"
      }],
      hot: [],
      top250:[]
    };
  },
  beforeCreate(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  },
  created() {
    this.$store.state.page = "index";
    this.$store.state.pageGrade = 1;
    this.$store.state.title = "电影";
    this.$http.get("api/in_theaters?count=5").then(res => {
        Indicator.close();
        if(res.status == 200){
          this.hot = res.data.subjects;
        }
    }).catch(err => {
      Indicator.close();
      Toast({
        message: '加载失败',
        duration: 1000
      });
    });
    this.$http.get("api/top250?count=5").then(res => {
        Indicator.close();
        if(res.status == 200){
          this.top250 = res.data.subjects;
        }
    }).catch(err => {
      Indicator.close();
      Toast({
        message: '加载失败',
        duration: 1000
      });
    });
  }
};
</script>
<style scoped>
.swipe{ width: 100%; height: 3.5rem; }
.swipe img{ display: block; width: 100%; height: 100%; }
.search_link{ width: 6.9rem; height: 0.76rem; background-color: #f5f5f5; color: #999; font-size: 0.28rem; border-radius: 6px; margin: 0.3rem auto 0; display: flex; justify-content: center; align-items: center; align-content: center;}
.search_link img{ width: 0.46rem; height: 0.46rem;}
.module_box{ padding: 0.3rem; }
.module{ margin-bottom: 0.3rem; }
.module_title{ height: 0.68rem; margin-bottom: 0.2rem; border-bottom: 1px solid #eee; display: flex; justify-content: flex-start; align-content: center; align-items: center; }
.module_title img{ width: 0.46rem; height: 0.4rem;}
.module_title span{ font-size: 0.28rem; font-weight: bold; color: #E02620; margin-left: 0.1rem; }
.module_content{ width: 100%;  overflow-x: auto; }
.module_content ul{ width: 200%; height: 3.5rem; display: flex; justify-content: flex-start; }
.module_content ul li{ width: 2rem; height: 100%; margin-right: 0.2rem; }
.module_content ul a{ display: block; }
.module_content ul a img{ display: block; width: 2rem; height: 2.8rem;}
.module_content ul a span{ display: block; width: 90%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin: 0.2rem auto 0; font-size: 0.24rem; color: #999; text-align: center; }
.module .more{ display: block; width: 2.5rem; height: 0.66rem; background-color: #E02620; text-align: center; color: #fff; line-height: 0.66rem; border-radius: 0.66rem; box-shadow: 0 5px 5px 1px #F7B4B6; margin: 0 auto; }
</style> 