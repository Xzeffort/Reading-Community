<template>
  <el-container class="main-top">
    <el-header style="height: 82px;">
      <el-avatar class="header" :src="info.topicHeadUrl" :size="80"/>
      <el-button round class="sendMsgBtn" @click="$router.push('/c/' + info.id)" type="success">
        专题主页
      </el-button>
      <el-button round class="sendMsgBtn" @click="searchArticle('')">
        投稿
      </el-button>
      <el-dialog :visible.sync="dialogCollectionVisible" width="40%" top="8vh">
        <div slot="title" class="dialog-footer">
          <span>给该专题投稿</span>
          <el-button type="text" class="newArticleBtn">写篇新文章</el-button>
          <p class="notice">请珍惜每次投稿机会</p>
          <div style="margin-top: 30px;position: relative;">
            <input type="text" placeholder="搜索我的文章" v-model="searchName" class="search-input">
            <a class="el-icon-search search-btn" @click="searchArticle(searchName)"/>
          </div>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="(article,n) in searchArticles" :key="n">
              <div>
                <div class="note-name">{{article.title}}</div>
                <a class="action-btn collect" v-if="article.isCollected">已收录</a>
                <div v-else>
                  <a class="action-btn push"  @click="sendArticle(article.articleId)">投稿</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-dialog>
      <el-container>
        <el-header style="height: 30px; padding-left:0px">
          <div class="title">
            <router-link tag="a" class="name" :to="/c/ + info.id">{{info.name}}</router-link>
          </div>
        </el-header>
        <el-main style="padding-top: 0">
          <div class="info">收录了{{info.articles}}篇文章 · {{info.followers}}人关注</div>
        </el-main>
      </el-container>
    </el-header>
    <el-main>
      <el-menu default-active="1"  mode="horizontal" class="menu">
        <el-menu-item index="1"><i class="el-icon-tickets"></i>目录</el-menu-item>
      </el-menu>
      <ul class="articles">
        <li class="list"  v-for="(article,n) in articles" v-bind:key="n">
          <el-container>
            <el-container>
              <el-header>
                <router-link tag="a" class="title" target="_blank" :to="/p/+article.articleId">
                  {{article.title}}
                </router-link>
              </el-header>
              <el-main class="content">
                <p class="abstract">
                  {{article.content}}
                </p>
              </el-main>
              <el-footer  style="height: 30px">
                <router-link tag="a" class="nickname" :to="/p/+article.userId" target="_blank">
                  <span class="nickname">{{article.nickname}}</span>
                </router-link>
                <router-link tag="a" class="comment" :to="/p/+article.articleId" target="_blank">
                  <i class="iconfont el-icon-third-pinglun2"/>{{article.comments}}
                </router-link>
                <span class="like"><i class="iconfont el-icon-third-aixin"/>{{article.likes}}</span>
              </el-footer>
            </el-container>
          </el-container>
        </li>
        <el-button class="more_button" v-if="totalPages > 1" @click="getArticles(curentPage+1)" type="info" round>查看更多</el-button>
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
      dialogCollectionVisible: false,
      articles: [],
      info: {},
      currentPage: 1,
      totalPages: 1,
      searchArticles: [],
      searchName: ''
    }
  },
  created () {
    this.getInfo(this.$route.params.id)
    this.getArticles(1)
  },
  methods: {
    getInfo (id) {
      let _this = this
      this.axios.get('/api/topic/' + id).then(function (res) {
        if (res.data.code) {
          _this.info = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/follow/topic/followers', {
        params: {
          'page': 1,
          'size': 8,
          'typeId': id
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.followers = res.data.data.list
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getArticles (page) {
      let _this = this
      _this.curentPage = page
      if (page > _this.totalPages) {
        this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/topic/collect', {
        params: {
          'page': _this.curentPage,
          'topicId': _this.$route.params.id
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = _this.articles.concat(res.data.data.list)
          _this.totalPages = res.data.data.totalPages
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    searchArticle (name) {
      let _this = this
      _this.dialogCollectionVisible = true
      this.axios.get('/api/topic/submit/search', {
        params: {
          'name': name,
          'topicId': _this.$route.params.id
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.searchArticles = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    sendArticle (id) {
      let _this = this
      this.axios.post('/api/topic/submit', {
        'articleId': id,
        'topicId': _this.$route.params.id
      }).then(function (res) {
        if (res.data.code) {
          _this.$message({
            message: '投稿成功',
            type: 'success'
          })
        } else {
          _this.$message({
            message: res.data.msg,
            type: 'error'
          })
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
    cursor: pointer;
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
  .sendMsgBtn {
    float: right;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
  .dialog-footer span {
    font-size: 18px;
    font-weight: bold;
  }
  .dialog-footer .newArticleBtn {
    color: #42c02e;
    outline: none;
    padding-left: 10px;
  }
  .dialog-footer .notice {
    font-size: 13px;
    vertical-align: middle;
    color: #969696;
  }
  .search-input {
    padding: 0 40px 0 20px;
    width: 100%;
    height: 40px;
    font-size: 14px;
    background-color: hsla(0,0%,71%,.2);
    border: none;
    border-radius: 40px;
    outline: none;
  }
  .search-btn:hover {
    color: #969696;
  }
  .search-btn {
    position: absolute;
    top: 12px;
    right: 10px;
    width: 30px;
    height: 30px;
    color: #969696;
    text-align: center;
  }
  .modal-body {
    padding-top: 0;
    height: 450px;
    overflow: auto;
  }
  .modal-body li {
    display: block!important;
    position: relative;
    padding: 20px 100px 20px 25px;
    font-size: 15px;
    border-bottom: 1px solid #e6e6e6;
  }
  .modal-body .push{
    color: #42c02e;
    border: 1px solid #42c02e;
  }
  .modal-body .back {
    color: #8c8c8c;
    border: 1px solid #8c8c8c;
  }
  .modal-body .hidden {
    display: none;
  }
  .modal-body .collect {
    cursor: default;
  }
  .modal-body .action-btn {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -12px;
    padding: 2px 8px;
    font-size: 13px;
    border-radius: 20px;
    line-height: normal;
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
</style>
