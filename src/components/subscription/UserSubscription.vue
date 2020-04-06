<template>
  <el-container class="main-top">
    <el-header style="height: 82px;">
      <el-avatar class="header" :src="userInfo.headUrl" :size="80"/>
      <el-button round class="sendMsgBtn"  @click="$router.push('/u/'+ userInfo.userId)" type="success">
        个人中心
      </el-button>
      <el-container>
        <el-header style="height: 30px; padding-left:0px">
          <div class="title">
            <router-link tag="a" class="name" :to="/u/ + userInfo.userId">{{userInfo.nickname}}</router-link>
          </div>
        </el-header>
        <el-main style="padding-top: 0">
          <div class="info">写了{{userInfo.words}}字，获得了{{userInfo.likes}}个喜欢</div>
        </el-main>
      </el-container>
    </el-header>
    <el-main>
      <el-menu default-active="1"  mode="horizontal" class="menu" @select="handleSelect">
        <el-menu-item index="1"><i class="el-icon-tickets"></i>最新发布</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-chat-square"></i>最新评论</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-star-off"></i>热门</el-menu-item>
      </el-menu>
      <ul class="articles">
        <li class="list" v-for="(article, n) in articles" v-bind:key="n">
          <el-container>
            <el-container>
              <el-header>
                <router-link tag="a"
                             :class="article.isTop ? 'isTop' : ''"
                             :to="/p/ + article.articleId" class="title" target="_blank">
                  {{article.title}}
                </router-link>
              </el-header>
              <el-main class="content">
                <p class="abstract">
                  {{article.content}}
                </p>
              </el-main>
              <el-footer  style="height: 30px">
                <router-link tag="a" :to="/p/ + article.articleId" class="comment" target="_blank">
                  <span class="view"><i style="margin-right: 3px" class="el-icon-view"/>{{article.clicks}}</span>
                </router-link>
                <router-link tag="a" :to="/p/ + article.articleId" class="comment" target="_blank">
                  <i style="margin-right: 5px" class="iconfont el-icon-third-pinglun2"/>{{article.comments}}
                </router-link>
                <span class="like"><i style="margin-right: 5px" class="iconfont el-icon-third-aixin"/>{{article.likes}}</span>
                <span class="date">{{article.createdDate}}</span>
              </el-footer>
            </el-container>
<!--            &lt;!&ndash;    无图片隐藏 aside      &ndash;&gt;-->
<!--            <el-aside width="200px;">-->
<!--              <a href="#" target="_blank">-->
<!--                <img class="img" :src="url"/>-->
<!--              </a>-->
<!--            </el-aside>-->
          </el-container>
          <el-button class="more_button" v-if="totalPages > 1" @click="getArticles(currentPage+1, order)" type="info" round>查看更多</el-button>
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
      userInfo: {},
      articles: [],
      currentPage: 1,
      totalPages: 1,
      order: ''
    }
  },
  created () {
    this.getUserInfo()
    this.getArticles(1, '')
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.order = ''
        this.currentPage = 1
        this.getArticles(this.currentPage, this.order)
      } else if (key === '2') {
        this.order = 'recentCommentDate'
        this.currentPage = 1
        this.getArticles(this.currentPage, this.order)
      } else {
        this.order = 'clicks'
        this.currentPage = 1
        this.getArticles(this.currentPage, this.order)
      }
    },
    getUserInfo () {
      let _this = this
      this.axios.get('/api/user/info/' + _this.$route.params.id).then(function (res) {
        if (res.data.code) {
          _this.userInfo = res.data.data
        }
      })
    },
    getArticles (page, order) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('api/user/' + _this.$route.params.id + '/articles', {
        params: {
          'page': page,
          'order': order
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data.list
          _this.totalPages = res.data.data.totalPages
        }
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
  .sendMsgBtn {
    float: right;
    width: 120px;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
</style>
