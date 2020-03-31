<template>
    <ul>
  <li class="list" v-for="article in articles" :key="article.articleId">
    <el-container>
      <el-container>
        <el-header>
          <router-link tag="a" :to="/p/+article.articleId" class="title" target="_blank">
            {{article.title}}
          </router-link>
        </el-header>
        <el-main>
          <p class="abstract">
            {{article.content}}
          </p>
        </el-main>
        <el-footer  style="height: 30px;padding: 0">
          <router-link tag="a" :to="/u/+article.userId" class="nickname" target="_blank" >{{article.nickname}}</router-link>
          <router-link tag="a" :to="/p/+article.articleId" class="comment"  target="_blank">
            <i class="iconfont el-icon-third-pinglun2" style="padding-right: 5px"/>{{article.comments}}
          </router-link>
          <span class="like"><i class="iconfont el-icon-third-aixin" style="padding-right: 5px"/>{{article.likes}}</span>
        </el-footer>
      </el-container>
      <!--    无图片隐藏 aside      -->
      <el-aside width="200px;">
        <a href="#" target="_blank">
          <img class="img" :src="url"/>
        </a>
      </el-aside>
    </el-container>
  </li>
      <el-button class="more_button" type="info" round>查看更多</el-button>
</ul>
</template>

<script>
export default {
  name: 'ArticleList',
  props: ['type'],
  data () {
    return {
      fit: 'contain',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      articles: []
    }
  },
  created () {
    this.getHotArticles(1)
  },
  watch: {
    type (val) {
      console.log(val)
    }
  },
  methods: {
    getHotArticles (page) {
      let _this = this
      this.axios.get('/api/p/hot', {
        params: {
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data.list
        }
      })
    }
  }
}
</script>
<style scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a {
    color: #333333;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding: 0 20px 0 0;
  }
  .list{
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
  }
  .title:visited {
    color: #969696;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 60px;
  }
  .abstract {
    margin: 0 0 8px;
    font-size: 14px;
    line-height: 24px;
    color: #999;
    width: 700px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .img {
    margin-top: 30px;
    width: 150px;
    height: 100px;
    /*object-fit: contain;*/
    border-radius: 4px;
  }
  .nickname {
    margin-right: 10px;
    color: #b4b4b4;
    font-size: 13px;
    text-decoration: none;
  }
  .nickname:hover{
    color: #787878;
  }
  .comment{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 10px;
    text-decoration: none;
  }
  .comment:hover{
    color: #787878;
  }
  .like{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 10px;
  }
  .more_button {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
  }
</style>
