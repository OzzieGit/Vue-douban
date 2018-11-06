<template>
  <div id="list_control">
    <ul>
      <li v-for="item in listData" :key="item.id" @click="toDetails(item.id)">
        <div class="item">
          <img :src="item.images.medium" class="left_img" />
          <div class="right_content">
            <strong>{{ item.title }}</strong>
            <div class="star">
              <span><i :style="'width:'+ item.rating.average * 10 +'%'"></i></span><b>{{ item.rating.average }}分</b>
            </div>
            <p v-if="item.directors.length != 0" class="p directors">导演:<span v-for="item in item.directors" :key="item.id">{{ item.name }}</span></p>
            <p v-if="item.casts.length != 0" class="p casts">演员:<span v-for="item in item.casts" :key="item.id">{{ item.name }}</span></p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name:"list_control",
  props:['listData'],
  data(){
    return {}
  },
  methods:{
    toDetails(id){
      this.$router.push({ path: '/detail', query: { id:id }})
    }
  }
}
</script>
<style scoped>
  #list_control li{ padding: 0.3rem; border-radius: 0.06rem; box-shadow: 0 0 10px 1px #ddd; margin-bottom: 0.2rem; }
  #list_control .item{ display: flex; justify-content: flex-start; }
  #list_control img.left_img{ width: 2rem; height: 2.8rem; }
  #list_control .right_content{ width: 4.3rem; height: 2.8rem; margin-left: 0.3rem; }
  #list_control .right_content strong{ display: block; margin: 0.2rem 0 0.2rem; font-size: 0.36rem; color: #666; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  #list_control .right_content .p{ color: #999; margin-bottom: 0.1rem; line-height: 1.4; }
  #list_control .right_content .p span{ margin-left: 0.1rem; }
  #list_control .right_content .directors{ overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  #list_control .right_content .casts{ display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden; }
  .star{ margin-bottom: 0.2rem; display: flex; justify-content: flex-start; align-items: center; align-content: center; }
  .star span{ width: 1.5rem; height: 0.3rem; background: url(../assets/images/icon_star1.png) repeat-x; background-size: 0.3rem 0.3rem; }
  .star span i{ display: block; width: 50%; height: 100%; background: url(../assets/images/icon_star2.png) repeat-x; background-size: 0.3rem 0.3rem; }
  .star b{ font-size: 0.32rem; margin-left: 0.2rem; color: #E02620; }
</style>