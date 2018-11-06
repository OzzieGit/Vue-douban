<template>
  <div id="search">
    <div class="search_module">
      <input type="text" v-model="searchKey" placeholder="请输入电影名称" />
      <span class="btn" @click="search">搜索</span>
    </div>
    <ul v-if="!showList" class="search_label">
      <li>
        <strong>热映</strong>
        <p>
          <span v-for="item in hotLabel" :key="item.id" @click="toDetails(item.id)">{{ item.title }}</span>
        </p>
      </li>
      <li>
        <strong>好评</strong>
        <p>
          <span v-for="item in topLabel" :key="item.id" @click="toDetails(item.id)">{{ item.title }}</span>
        </p>
      </li>
    </ul>
    <p v-if="showList" class="search_msg">
      搜索"{{ showSearchKey }}"的结果...
    </p>
    <p class="not" v-if="showList&&searchList.length == 0">无搜索结果~</p>
    <ListControl v-if="showList" :listData="searchList"></ListControl>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import ListControl from "../components/list_control"
export default {
  name:"search",
  components:{
    ListControl
  },
  data(){
    return {
      searchKey:"",
      searchList:[],
      showList:false,
      showSearchKey:"",
      hotLabel:[],
      topLabel:[],
      start: 0,
      not:false
    }
  },
  methods:{
    search(){
      if(this.searchKey == ""){
        Toast({
          message: '请输入电影名称',
          duration: 1000
        });
      }else{
        this.start = 0;
        this.not = false;
        Indicator.open({
          text: `正在搜索${this.searchKey}...`,
          spinnerType: 'fading-circle'
        });
        this.$http.get("api/search?count=10&q="+this.searchKey).then(res=>{
          Indicator.close();
          if(res.status == 200){
            this.searchList = res.data.subjects;
            this.showList = true;
            this.showSearchKey = this.searchKey;
          }
        }).catch(err=>{
          Indicator.close();
          Toast({
            message: '加载失败',
            duration: 1000
          });
        })
      }
    },
    toDetails(id){
      this.$router.push({ path: '/detail', query: { id:id }})
    }
  },
  created(){
    this.$store.state.page = "search";
    this.$store.state.pageGrade = 2;
    this.$store.state.title = "电影搜索";
    this.$http.get('api/top250?count=8').then(res => {
      if(res.status == 200){
        this.topLabel = res.data.subjects;
      }
    }).catch(err => {
      Toast({
        message: '加载失败',
        duration: 1000
      });
    })
    this.$http.get('api/in_theaters?count=8').then(res => {
      if(res.status == 200){
        this.hotLabel = res.data.subjects;
      }
    }).catch(err => {
      Toast({
        message: '加载失败',
        duration: 1000
      });
    })
  },
  mounted(){
    let that = this;
    window.onscroll = function(){
      let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let bodyHeight = document.body.clientHeight;
      if(scrollTop + clientHeight == bodyHeight){
        if(that.not){ 
          Toast({
            message: '没有更多了',
            duration: 1000
          });
          return 
        }
        Indicator.open({
          text: '加载更多...',
          spinnerType: 'fading-circle'
        });
        that.start += 8;
        that.$http.get("api/search?count=10&q="+ that.searchKey + "&start=" + that.start).then(res => {
          Indicator.close();
          if (res.status == 200) {
            if(res.data.subjects.length == 0){
              that.start -= 8;
              that.not = true;
              Toast({
                message: '没有更多了',
                duration: 1000
              });
            }else{
              that.searchList = that.searchList.concat(res.data.subjects);
            }
          }
        }).catch(err => {
          Indicator.close();
          Toast({
            message: '加载失败',
            duration: 1000
          });
        });
      }
    }
  },
  updated(){
    if(this.searchKey == ""){
      this.showList = false;
      this.showSearchKey = "";
      this.start = 0;
      this.not = false;
    }
  },
  destroyed(){
    window.onscroll = null;
  }
}
</script>
<style scoped>
  #search{ padding: 0.3rem; }
  #search .search_module{ height:0.68rem; margin-bottom: 0.4rem; display: flex; justify-content: space-between; align-items: center; align-content: center; }
  #search .search_module input{ width: 5.5rem; height: 0.68rem; line-height: 0.68rem; padding: 0 0.3rem; box-sizing: border-box; border: 1px solid #E02620; }
  #search .search_module span{ width: 1.4rem; height: 0.68rem; line-height: 0.68rem; color: #fff; text-align: center; background-color: #E02620; }
  .search_label li{ margin-bottom: 0.4rem; }
  .search_label strong{ display: block; height: 0.36rem; line-height: 0.36rem; color: #E02620; border-left: 5px solid #E02620; padding-left: 0.2rem; font-size: 0.32rem; }
  .search_label p{ line-height: 1.8; margin-top: 0.2rem; color: #999; }
  .search_label p span{ display: inline-block; max-width: 1.7rem; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; margin-right: 0.2rem; }
  .search_msg{ font-size: 0.32rem; margin-bottom: 0.3rem; color: #666; }
  .not{ font-size: 0.32rem; color: #E02620; text-align: center; padding-top: 0.4rem; }
</style>


