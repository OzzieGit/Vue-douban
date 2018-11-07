<template>
  <div id="detail">
    <div class="detail_head">
      <img :src="detailData.images.small" class="left_img" />
      <div class="right_content">
        <strong>{{ detailData.title }}</strong>
        <span>上映时间: {{ detailData.year }}</span>
        <span>上映地区: <i v-for="item in detailData.countries" :key="item">{{ item }}</i></span>
        <span>类型: <i v-for="item in detailData.genres" :key="item">{{ item }}</i></span>
        <b>{{ detailData.rating.average }}</b>
      </div>
    </div>
    <div class="info">
      <strong>剧情简介</strong>
      <p >{{ detailData.summary.replace('©豆瓣', '') }}</p>
    </div>
    <div class="personage">
      <strong>相关人物</strong>
      <ul :style="'width:' + ((detailData.directors.length + detailData.casts.length) * 2.2 - 0.2) + 'rem'">
        <li v-for="item in detailData.directors" :key="item.id">
          <img :src="item.avatars.small" />
          <span>{{ item.name }}</span>
        </li>
        <li v-for="item in detailData.casts" :key="item.id">
          <img :src="item.avatars.small" />
          <span>{{ item.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  name:"detail",
  data(){
    return{
      detailData:""
    }
  },
  beforeCreate(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  },
  created(){
    this.$store.state.page = "details";
    this.$store.state.pageGrade = 2;
    this.$store.state.title = "电影详情";
    this.$http.get('api/subject/'+this.$route.query.id).then(res=>{
      Indicator.close();
      if(res.status == 200){
        this.detailData = res.data;
      }
    }).catch(err=>{
      Indicator.close();
      Toast({
        message: '加载失败',
        duration: 1000
      });
    })
  }
}
</script>
<style scoped>
  #detail{ padding: 0.3rem; }
  .detail_head{ padding: 0.3rem; border-radius: 6px; display: flex; justify-content: flex-start; box-shadow: 0 0 10px 1px #ddd;}
  .detail_head img.left_img{ width: 2rem; height: 2.8rem; }
  .detail_head .right_content{ width: 4.3rem; height: 2.8rem; margin-left: 0.3rem; position: relative; }
  .detail_head .right_content strong{ display: block; width: 85%; margin: 0.2rem 0 0.2rem; font-size: 0.36rem; color: #666; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .detail_head .right_content span{ display: block; margin-bottom: 0.2rem; color: #999; font-size: 0.24rem; }
  .detail_head .right_content span i{ font-style: normal; margin-right: 0.1rem;}
  .detail_head .right_content b{ position: absolute; top: 0; right: 0; font-size: 0.40rem; color: #E02620; font-style: italic; }
  .info{ padding: 0.6rem 0 0.3rem;}
  .info strong{ display: block; height: 0.36rem; line-height: 0.36rem; color: #E02620; border-left: 5px solid #E02620; padding-left: 0.2rem; font-size: 0.32rem; }
  .info p{ line-height: 1.8; text-indent: 2em; margin-top: 0.2rem; color: #666; }



  .personage{ width: 100%;  overflow-x: auto; }
  .personage strong{ display: block; height: 0.36rem; line-height: 0.36rem; color: #E02620; border-left: 5px solid #E02620; padding-left: 0.2rem; font-size: 0.32rem; margin-bottom: 0.3rem; }
  .personage ul{ width: 200%; height: 3.5rem; display: flex; justify-content: flex-start; }
  .personage ul li{ width: 2rem; height: 100%; margin-right: 0.2rem; }
  .personage ul img{ display: block; width: 2rem; height: 2.8rem;}
  .personage ul span{ display: block; width: 90%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin: 0.2rem auto 0; font-size: 0.24rem; color: #999; text-align: center; }
</style>


