<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-container style="margin:30px auto">
      <el-main style="margin-right: 10px">
        <el-container class="main-top">
          <el-header style="height: 82px;">
            <el-avatar class="header" :src="userInfo.headUrl" :size="80"/>
            <div v-show="!isMyself">
              <el-button v-if="!userInfo.isFollowed" @click="follow" round type="success" class="off follow user-follow-button">
                <i class="el-icon-plus"/>关注
              </el-button>
              <el-button v-else round type="primary" class="on followed user-follow-button"
                         @click="follow"
                         @mouseover.native="overFollow"
                         @mouseleave.native="leaveFollow">
                <i :class="iconName"/>{{buttonName}}
              </el-button>
            </div>
            <el-container>
              <el-header style="height: 30px; padding-left:0px">
                <div class="title">
                  <a class="name" href="#/u/6d71c8ef87ab">你在烦恼些什么</a>
                  <i class="el-icon-male" style="color: deepskyblue"/>
                </div>
              </el-header>
              <el-main style="padding-top: 0">
                <div class="info">
                  <ul>
                    <li>
                      <div class="meta-block">
                        <router-link tag="a" :to="{name:'Followers', params:$route.params}">
                          <p>{{userInfo.followers}}</p>
                          关注 <i class="el-icon-arrow-right"></i>
                        </router-link>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <router-link tag="a" :to="{name:'Fans', params:$route.params}">
                          <p>{{userInfo.fans}}</p>
                          粉丝 <i class="el-icon-arrow-right"></i>
                        </router-link>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <router-link tag="a" :to="/u/ + userInfo.userId">
                          <p>{{userInfo.articles}}</p>
                          文章 <i class="el-icon-arrow-right"></i>
                        </router-link>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <p>{{userInfo.words}}</p>
                        <div>字数</div>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <p>{{userInfo.likes}}</p>
                        <div>收获喜欢</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-main>
            </el-container>
          </el-header>
          <el-main>
            <el-menu default-active="1"  mode="horizontal" class="menu" @select="handleSelect">
              <el-menu-item index="1"><i class="el-icon-tickets"></i>文章</el-menu-item>
<!--              <el-menu-item index="2"><i class="el-icon-bell"></i>动态</el-menu-item>-->
              <el-menu-item index="3"><i class="el-icon-chat-square"></i>最新评论</el-menu-item>
              <el-menu-item index="4"><i class="el-icon-star-off"></i>热门</el-menu-item>
            </el-menu>
          </el-main>
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
                <!--    无图片隐藏 aside      -->
<!--                <el-aside width="200px;">-->
<!--                  <a href="#" target="_blank">-->
<!--                    <img class="img" :src="url"/>-->
<!--                  </a>-->
<!--                </el-aside>-->
              </el-container>
            </li>
            <el-button @click="getArticles(currentPage+1,order)" class="more_button" type="info" round>查看更多</el-button>
          </ul>
        </el-container>
      </el-main>
      <el-aside style="padding-top: 20px">
        <div>
          <div class="title">个人介绍</div>
        </div>
        <div class="description">
          <el-input
            disabled
            style="height:120px;"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5}"
            placeholder="请输入内容"
            v-model="userInfo.introduce">
          </el-input>
        </div>
        <ul class="list user-dynamic">
          <li>
            <router-link tag="a" :to="{path:`/users/${userInfo.userId}/subscriptions`}">
              <i class="el-icon-notebook-1"></i>
              <span v-if="isMyself">我关注的专题/文集/连载</span>
              <span v-else>Ta关注的专题/文集/连载</span>
            </router-link>
          </li>
          <li>
            <router-link tag="a" :to="{path:`/users/${userInfo.userId}/subscriptions/liked_notes`}">
              <i class="el-icon-present"></i>
              <span v-if="isMyself">我喜欢的文章</span>
              <span v-else>Ta喜欢的文章</span>
            </router-link>
          </li>
        </ul>
        <div>
          <div v-if="isMyself" class="title">我创建的专题</div>
          <div v-else class="title">Ta创建的专题</div>
          <div class="new-collection-block">
            <el-button v-if="isMyself"
                       @click="$router.push({name:'NewCollection'})"
                       class="create" icon="el-icon-plus" type="text" style="color: #42c02e">创建一个新专题</el-button>
          </div>
          <ul class="list">
            <li v-for="(topic, n) in topics" :key="n">
              <router-link :to="/c/ + topic.id" target="_blank" class="avatar-collection">
                <img :src="topic.headUrl">
              </router-link>
              <router-link :to="/c/ + topic.id" target="_blank" class="name">{{topic.name}}</router-link>
            </li>
          </ul>
        </div>
        <div>
          <div v-if="isMyself" class="title">我的文集</div>
          <div v-else class="title">Ta的文集</div>
          <ul class="list">
            <li v-for="(nb, n) in notebooks" :key="n">
              <router-link :to="/nb/ + nb.id" target="_blank"><i class="el-icon-notebook-2"></i></router-link>
              <router-link :to="/nb/ + nb.id" target="_blank" class="name">
                {{nb.name}}
              </router-link>
            </li>
          </ul>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'User',
  components: {
    NavComponent
  },
  data () {
    return {
      iconName: 'el-icon-check',
      buttonName: '已关注',
      isFollowed: true,
      count: 5,
      isMyself: false,
      userInfo: {},
      topics: [],
      notebooks: [],
      articles: [],
      currentPage: 1,
      totalPages: 1,
      order: ''
    }
  },
  created () {
    this.getUserInfo()
    this.getTopics()
    this.getNotebooks()
    this.getArticles(1, '')
    // eslint-disable-next-line eqeqeq
    if (this.$route.params.id == localStorage.getItem('userId').toString()) {
      this.isMyself = true
    } else {
      this.isMyself = false
    }
  },
  watch: {
    '$route': function (to, from) {
      // 拿到目标参数 to.query.id 去再次请求数据接口
      this.getUserInfo()
      this.getTopics()
      this.getNotebooks()
      this.getArticles(1, '')
      // eslint-disable-next-line eqeqeq
      if (this.$route.params.id == localStorage.getItem('userId').toString()) {
        this.isMyself = true
      } else {
        this.isMyself = false
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
      if (key === '1') {
        this.order = ''
        this.currentPage = 1
        this.articles = []
        this.getArticles(this.currentPage, this.order)
      } else if (key === '2') {
        this.articles = []
      } else if (key === '3') {
        this.order = 'recentCommentDate'
        this.currentPage = 1
        this.articles = []
        this.getArticles(this.currentPage, this.order)
      } else {
        this.order = 'clicks'
        this.currentPage = 1
        this.articles = []
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
    getTopics () {
      let _this = this
      this.axios.get('/api/user/info/topic/' + _this.$route.params.id).then(function (res) {
        if (res.data.code) {
          _this.topics = res.data.data
        }
      })
    },
    getNotebooks () {
      let _this = this
      this.axios.get('api/user/info/nb/' + _this.$route.params.id).then(function (res) {
        if (res.data.code) {
          _this.notebooks = res.data.data
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
          _this.articles = _this.articles.concat(res.data.data.list)
          _this.totalPages = res.data.data.totalPages
        }
      })
    },
    follow () {
      this.userInfo.isFollowed = !this.userInfo.isFollowed
      let _this = this
      this.axios.put('/api/follow', {
        'fromUserId': localStorage.getItem('userId'),
        'toUserId': _this.$route.params.id
      }).then(function (res) {
        if (res.data.code === '403') {
          this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        if (_this.userInfo.isFollowed) {
          _this.$message({
            message: '关注成功',
            type: 'success',
            center: true
          })
        } else {
          _this.$message({
            message: '取消关注成功',
            type: 'success',
            center: true
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    overFollow () {
      this.iconName = 'el-icon-close'
      this.buttonName = '取消关注'
    },
    leaveFollow () {
      this.iconName = 'el-icon-check'
      this.buttonName = '已关注'
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
    margin-bottom: 10px;
    font-size: 16px;
    color: #969696;
  }
  .function-btn {
    float: right;
    font-size: 15px;
    color: #969696;
    padding: 0;
    outline: none;
  }
  .description{
    position: relative;
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }
  .list {
    margin-bottom: 16px;
    padding-bottom: 8px;
    list-style: none;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }
  .articles .list {
    padding-left: 40px;
    padding-right: 40px;
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
  .new-collection-block {
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 0;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }
  .create {
    outline: none;
  }
  .header {
    float: left;
  }
  .main-top {
    width: 800px;
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
  .main-top .info ul .meta-block {
    font-size: 12px;
    margin: 0 7px 6px 0;
    padding: 0 7px 0 0;
    border-right: 1px solid #f0f0f0;
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
    width: 700px;
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
  .user-follow-button {
    float: right;
    width: 120px;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
  .sendMsgBtn {
    float: right;
    width: 120px;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
  .list li a {
    display: inline-block;
  }
  .avatar-collection {
    margin-right: 5px;
    width: 32px;
    height: 32px;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
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
  .more_button {
    display:block;
    margin:0 auto;
    width: 80%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
  }
</style>
