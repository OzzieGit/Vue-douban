<template>
  <div id="list">
    <ListControl :listData="list"></ListControl>
  </div>
</template>
<script>
import { Toast, Indicator, Loadmore } from "mint-ui";
import ListControl from "../components/list_control";
export default {
  name: "list",
  components: {
    ListControl
  },
  data() {
    return {
      list: [],
      start: 0,
      not:false,
      type:'hot',
      url:""
    };
  },
  methods:{ },
  beforeCreate(){
    Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
  },
  created() {
    this.type = this.$route.query.type;
    this.$store.state.page = "list";
    this.$store.state.pageGrade = 2;
    this.$store.state.title = this.type == "hot" ? "最新上映" : "TOP250";
    this.url = this.type == "hot" ? "api/in_theaters?count=8&" : "api/top250?count=8&";
    this.$http.get(this.url + "start=" + this.start).then(res => {
      Indicator.close();
      if (res.status == 200) {
        this.list = res.data.subjects;
      }
    }).catch(err => {
      Indicator.close();
      Toast({
        message: '加载失败',
        duration: 1000
      });
    });
  },
  mounted(){
    let that = this;
    // if(this.$store.state.page != "list"){ return }
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
        that.$http.get(that.url + "start=" + that.start).then(res => {
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
              that.list = that.list.concat(res.data.subjects);
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
  destroyed(){
    window.onscroll = null;
  }
};
</script>
<style>
#list{ padding: 0.3rem; }
</style>