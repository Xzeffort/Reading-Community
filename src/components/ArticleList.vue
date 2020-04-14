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
<!--      <el-aside width="200px;">-->
<!--        <a href="#" target="_blank">-->
<!--          <img class="img" :src="url"/>-->
<!--        </a>-->
<!--      </el-aside>-->
    </el-container>
  </li>
      <el-button class="more_button" type="info" round @click="selectMethod(type,currentPage+1)">查看更多</el-button>
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
      articles: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  created () {
    this.getHotArticles(1)
  },
  watch: {
    type (val) {
      console.log(val)
      this.articles = []
      this.currentPage = 1
      this.totalPages = 1
      // eslint-disable-next-line eqeqeq
      if (val == '2') {
        this.getHotArticles(1)
      } else {
        this.getRecommendArticles(1)
      }
    }
  },
  methods: {
    selectMethod (type, page) {
      // eslint-disable-next-line eqeqeq
      if (type == '1') {
        this.getRecommendArticles(page)
      } else {
        this.getHotArticles(page)
      }
    },
    getHotArticles (page) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/p/hot', {
        params: {
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = _this.articles.concat(res.data.data.list)
          _this.totalPages = res.data.data.totalPages
        }
      })
    },
    getRecommendArticles (page) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/articles/recommend', {
        params: {
          'userId': localStorage.getItem('userId'),
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = _this.articles.concat(res.data.data.list)
          _this.totalPages = res.data.data.totalPages
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
