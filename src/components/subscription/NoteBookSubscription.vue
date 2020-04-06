<template>
  <el-container class="main-top">
    <el-header style="height: 82px;">
      <div class="avatar">
        <img src="../../assets/avatar-notebook-default.png"  style="border-radius: 10%;border: none;">
      </div>
      <el-button round class="noteBookBtn" @click="$router.push('/nb/' + info.id)" type="success">
        文集主页
      </el-button>
      <el-container>
        <el-header style="height: 30px; padding-left:0px">
          <div class="title">
            <router-link  tag="a" class="name" :to="/nb/ + info.id">{{info.name}}</router-link>
          </div>
        </el-header>
        <el-main style="padding-top: 0">
          <div class="info">
            <router-link tag="a" :to="/u/ + info.userId" target="_blank" class="name" style="color: #409EFF">
              {{info.nickname}}
            </router-link>
            编 · {{info.articles}}篇文章 · {{info.words}}字 · {{info.followers}}人关注
          </div>
        </el-main>
      </el-container>
    </el-header>
    <el-main>
      <el-menu default-active="1"  mode="horizontal" class="menu">
        <el-menu-item index="1"><i class="el-icon-document-copy"></i>目录</el-menu-item>
      </el-menu>
      <ul class="articles infinite-list">
        <li class="list infinite-list-item" v-for="(article, n) in articles" v-bind:key="n">
          <el-container>
            <el-container>
              <el-header>
                <router-link tag="a" :to="/p/ + article.articleId"
                             class="title" :class="article.isTop ? 'isTop' : ''"
                             target="_blank" >
                  {{article.title}}
                </router-link>
              </el-header>
              <el-main class="content">
                <p class="abstract">
                  {{article.content}}
                </p>
              </el-main>
              <el-footer  style="height: 30px">
                <span class="like"><i style="margin-right: 5px" class="iconfont el-icon-third-aixin"/>{{article.clicks}}</span>
                <a class="comment" href="#" target="_blank">
                  <i style="margin-right: 5px" class="iconfont el-icon-third-pinglun2"/>{{article.comments}}
                </a>
                <span class="like"><i style="margin-right: 5px" class="iconfont el-icon-third-aixin"/>{{article.likes}}</span>
                <span class="data">{{article.createdDate}}</span>
              </el-footer>
            </el-container>
          </el-container>
          <el-button v-show="totalPages > 1"  class="more_button" @click="getArticles(curentPage + 1)" type="info" round>查看更多</el-button>
        </li>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UserSubscription',
  data () {
    return {
      fit: 'contain',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      count: 5,
      info: {},
      currentPage: 1,
      totalPages: 1,
      articles: []
    }
  },
  created () {
    this.getInfo(this.$route.params.id)
    this.getArticles(1)
  },
  methods: {
    getInfo (id) {
      let _this = this
      this.axios.get('/api/notebooks/' + id).then(function (res) {
        if (res.data.code) {
          _this.info = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getArticles (page) {
      let _this = this
      _this.curentPage = page
      if (_this.curentPage > _this.totalPages) {
        this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/notebooks/' + _this.$route.params.id + '/articles/', {
        params: {
          'page': _this.curentPage
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = _this.articles.concat(res.data.data.list)
          _this.totalPages = res.data.data.totalPages
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
  p {
    margin: 0 ;
  }
  .title {
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #969696;
  }
  .main-top .info {
    margin-top: 20px;
    padding-left: 10px;
    font-size: 15px;
    color: #969696;
  }
  .list li {
    margin-bottom: 12px;
  }
  .list i {
    margin-right: 10px;
    font-size: 20px;
  }
  .user-dynamic a {
    font-size: 18px;
  }
  .header {
    float: left;
  }
  .main-top {
    width: 742px;
  }
  .main-top .title {
    padding-left: 30px;
    display: inline;
    font-size: 21px;
    font-weight: 700;
    vertical-align: middle;
  }
  .info {
    margin-top: 5px;
    font-size: 14px;
  }
  .info ul p {
    font-size: 15px;
    color: #333;
  }
  .info a {
    color: #969696;
  }
  .info .meta-block div{
    color: #969696;
  }
  .info li {
    display: inline-block;
  }
  .el-menu-item {
    font-size: 18px !important;
  }
  .menu {
    font-weight: 600;
    color: #969696;
  }
  .articles .list{
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
  }
  .articles .list i {
    margin: 0;
    font-size: 16px;
  }
  .articles .title:visited {
    color: #969696; text-decoration: underline;
  }
  .articles .title:hover {
    text-decoration: underline;
  }
  .articles .title {
    padding-left: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 60px;
  }
  .articles .abstract {
    font-size: 14px;
    color: #999999;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .articles .img {
    margin-top: 30px;
    width: 150px;
    height: 100px;
    /*object-fit: contain;*/
    border-radius: 4px;
  }
  .articles .comment{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 5px;
    text-decoration: none;
  }
  .articles .comment:hover{
    color: #787878;
  }
  .articles span{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 5px;
  }
  .articles .view:hover{
    color: #787878;
  }
  .articles .content {
    padding-top: 0;
  }
  .noteBookBtn {
    float: right;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
  .more_button {
    display:block;
    margin:20px auto;
    width: 80%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
  }
  .isTop:before {
    content: "\7F6E\9876";
    display: inline-block;
    vertical-align: middle;
    width: 40px;
    line-height: 22px;
    border-radius: 4px;
    margin-right: 8px;
    font-size: 12px;
    text-align: center;
    background-color: #e9634c;
    color: #fff;
    font-weight: 400;
  }
  .avatar{
    width: 80px;
    height: 80px;
    float: left;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
</style>
