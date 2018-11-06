
module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  baseUrl: '/',
  devServer: {
    // https: true,
    proxy: {
      '/api': {
        target: 'http://api.douban.com/v2/movie',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}


// http://api.douban.com/v2/movie/top250?start=25&count=25 top250

// http://api.douban.com/v2/movie/in_theaters   热映

// http://api.douban.com/v2/movie/search
// start : 数据的开始项

// count：单页条数

// q：要搜索的电影关键字

// tag：要搜索的电影的标签


// http://api.douban.com/v2/movie/subject/1764796 detail