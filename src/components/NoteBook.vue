<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-container style="margin:30px auto">
      <el-main>
        <el-container style="min-width: 760px">
          <el-header>
            <div class="main-top">
              <router-link tag="a" class="avatar-collection" :to="/nb/ + info.id">
                <img src="../assets/avatar-notebook-default.png" alt="240">
              </router-link>
              <div v-show=" userId != info.userId">
                <el-button v-if="!info.isFollowed"
                           @click="followNoteBook"
                           round type="success" class="off follow user-follow-button">
                  <i class="el-icon-plus"/>关注
                </el-button>
                <el-button v-else
                           @click="followNoteBook"
                           round type="primary" class="on followed user-follow-button"
                           @mouseover.native="overFollow"
                           @mouseleave.native="leaveFollow">
                  <i :class="iconName"/>{{buttonName}}
                </el-button>
              </div>
              <div class="title">
                <router-link  tag="a" class="name" :to="/nb/ + info.id">{{info.name}}</router-link>
              </div>
              <div class="info">
                {{info.articles}}篇文章 · {{info.words}}字 · {{info.followers}}人关注
              </div>
            </div>
          </el-header>
          <el-main>
            <el-menu default-active="1"  mode="horizontal" class="menu">
              <el-menu-item index="1"><i class="el-icon-tickets"></i>目录</el-menu-item>
            </el-menu>
            <ul class="articles">
              <li class="list" v-for="(article, n) in articles" v-bind:key="n">
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
                  <!--    无图片隐藏 aside      -->
<!--                  <el-aside width="200px;">-->
<!--                    <a href="#" target="_blank">-->
<!--                      <img class="img" :src="url"/>-->
<!--                    </a>-->
<!--                  </el-aside>-->
                </el-container>
              </li>
              <el-button class="more_button" @click="getArticles(curentPage + 1)" type="info" round>查看更多</el-button>
            </ul>
          </el-main>
        </el-container>
      </el-main>
      <el-aside style="padding-top: 20px;" class="aside">
        <div style="margin-bottom: 20px;padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
          <p class="title">文集作者</p>
            <router-link tag="a" :to="/u/ + info.userId" target="_blank" class="avatar">
              <img :src="info.headUrl">
            </router-link>
            <router-link tag="a" :to="/u/ + info.userId" target="_blank" class="name">
              {{info.nickname}}
            </router-link>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'NoteBook',
  components: {
    NavComponent
  },
  data () {
    return {
      iconName: 'el-icon-check',
      buttonName: '已关注',
      isFollowed: false,
      count: 5,
      loading: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      info: {},
      userId: '',
      curentPage: 1,
      totalPages: 1,
      articles: []
    }
  },
  created () {
    this.getInfo(this.$route.params.id)
    this.userId = localStorage.getItem('userId')
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
    },
    followNoteBook () {
      let _this = this
      _this.info.isFollowed = !_this.info.isFollowed
      this.axios.put('/api/follow/notebook', {
        'typeId': _this.$route.params.id,
        'userId': localStorage.getItem('userId')
      }).then(function (res) {
        if (res.data.code) {
          if (_this.info.isFollowed) {
            _this.$message({
              message: '关注成功',
              type: 'success',
              center: true
            })
          } else {
            _this.$message({
              message: '取关成功',
              type: 'success',
              center: true
            })
          }
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
  a {
    color: #333;
    text-decoration: none;
  }
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0 0 10px;
  }
  .main-top .avatar-collection {
    float: left;
    width: 80px;
    height: 80px;
  }
  .title {
    color: #969696;
    margin-bottom: 10px;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
  }
  .main-top .title {
    padding: 10px 0 0 100px;
  }
  .main-top .title .name {
    display: inline;
    font-size: 21px;
    font-weight: 700;
    vertical-align: middle;
  }
  .main-top .info {
    margin-top: 10px;
    padding-left: 100px;
    font-size: 14px;
    color: #969696;
  }
  .user-follow-button {
    width: 110px;
    float: right;
    margin-top: 23px;
    outline: none;
  }
  .list {
    margin-bottom: 16px;
    padding-bottom: 8px;
    list-style: none;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
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
  .articles .nickname:hover{
    color: #787878;
  }
  .articles .content {
    padding-top: 0;
  }
  .avatar {
    margin-right: 5px;
    width: 32px;
    height: 32px;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
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
</style>
