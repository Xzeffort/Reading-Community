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
                <router-link tag="a" class="avatar-collection" :to="/c/ + info.id">
                  <img :src="info.topicHeadUrl" alt="240">
                </router-link>
                <el-button v-if="!info.isFollowed" @click="followTopic" round type="success" class="off follow user-follow-button">
                  <i class="el-icon-plus"/>关注
                </el-button>
                <el-button v-else round type="primary"
                           @click="followTopic"
                           class="on followed user-follow-button"
                           @mouseover.native="overFollow"
                           @mouseleave.native="leaveFollow">
                  <i :class="iconName"/>{{buttonName}}
                </el-button>
                <el-button v-show="info.isSubmit" round class="sendArticleBtn"
                           @click="searchArticle('')">
                  投稿
                </el-button>
                <div class="title">
                  <router-link tag="a" class="name" :to="/c/ + info.id">{{info.name}}</router-link>
                </div>
                <div class="info">
                  收录了{{info.articles}}篇文章 · {{info.followers}}人关注
                </div>
              </div>
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
            </el-header>
            <el-main>
              <el-menu default-active="1"  mode="horizontal" class="menu">
                <el-menu-item index="1"><i class="el-icon-chat-square"></i>目录</el-menu-item>
              </el-menu>
              <ul class="articles">
                <li class="list infinite-list-item" v-for="(article,n) in articles" v-bind:key="n">
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
                    <!--    无图片隐藏 aside      -->
<!--                    <el-aside width="200px;">-->
<!--                      <a href="#" target="_blank">-->
<!--                        <img class="img" :src="url"/>-->
<!--                      </a>-->
<!--                    </el-aside>-->
                  </el-container>
                </li>
                <el-button class="more_button" v-if="totalPages > 1" @click="getArticles(curentPage+1)" type="info" round>查看更多</el-button>
              </ul>
            </el-main>
          </el-container>
        </el-main>
        <el-aside style="padding-top: 20px;" class="aside">
          <p class="title">专题公告</p>
          <div class="description">
            <p>{{info.introduce}}</p>
          </div>
          <div style="margin-bottom: 20px;padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
            <p class="title">管理员</p>
            <router-link tag="a" :to="/u/ + info.userId" target="_blank" class="avatar">
              <img :src="info.userHeadUrl">
            </router-link>
            <router-link tag="a" :to="/u/ + info.userId" target="_blank" class="name">
              {{info.nickname}}
            </router-link>
          </div>
          <div style="margin-bottom: 20px;padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
            <div class="title">关注的人({{info.followers}})</div>
              <ul class="collection-follower">
                <li v-for="(follower,n) in followers" :key="n">
                  <el-tooltip class="item" effect="dark" placement="bottom">
                    <div slot="content">{{follower.nickname}} · {{follower.createdDate}} 关注</div>
                    <router-link tag="a" :to="/u/ + follower.userId" target="_blank" class="avatar">
                      <img :src="follower.headUrl">
                    </router-link>
                  </el-tooltip>
                </li>
                <a class="function-btn" @click="dialogFollowers = true"><i class="el-icon-more"></i></a>
                <el-dialog
                  title="关注的人"
                  :visible.sync="dialogFollowers"
                  width="30%">
                  <ul class="followersList">
                    <li  v-for="(follower,n) in followers" :key="n">
                      <router-link tag="a" :to="/u/ + follower.userId" target="_blank" class="avatar">
                        <img :src="follower.headUrl">
                      </router-link>
                      <router-link tag="a" :to="/u/ + follower.userId" target="_blank" class="name">{{follower.nickname}}</router-link>
                      <span class="follow-time">{{follower.createdDate}} 关注</span>
                    </li>
                  </ul>
                </el-dialog>
              </ul>
          </div>
          <div class="user-action" v-show="userId == info.userId">
            <router-link :to="{name:'EditCollection',params:{id:$route.params.id}}">
              <el-button type="text" class="edit">编辑专题</el-button>
            </router-link >
            <span class="delete-collection-button">·
            <el-button type="text" class="delete" @click="dialogDelete = true">删除专题</el-button>
            </span>
            <el-dialog
              title="删除专题"
              :visible.sync="dialogDelete"
              width="30%">
              <span>该专题目前收录了{{info.articles}}篇文章，删除专题操作不可逆，请慎重！</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDelete = false">取 消</el-button>
                <el-button type="danger" @click="dialogDelete = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-aside>
      </el-container>
    </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Collection',
  components: {
    NavComponent
  },
  data () {
    return {
      iconName: 'el-icon-check',
      buttonName: '已关注',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogDelete: false,
      dialogFollowers: false,
      dialogCollectionVisible: false,
      info: {},
      followers: [],
      userId: '',
      articles: [],
      loading: false,
      curentPage: 1,
      totalPages: 1,
      searchArticles: [],
      searchName: ''
    }
  },
  created () {
    this.getInfo(this.$route.params.id)
    this.getArticles(1)
    this.userId = localStorage.getItem('userId')
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
    deleteTopic (id) {
      let _this = this
      this.axios.delete('/api/follow/topic/followers', {
        data: {
          'id': id
        }
      }).then(function (res) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        _this.$route.push('/index')
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
    followTopic () {
      let _this = this
      _this.info.isFollowed = !_this.info.isFollowed
      this.axios.put('/api/follow/topic', {
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
  a {
    color: #333;
    text-decoration: none;
    cursor: pointer;
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
  .sendArticleBtn {
    float: right;
    margin-top: 23px;
    outline: none;
    width: 110px;
    margin-right: 20px;
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
    width: 530px;
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
  .aside {
    position: relative;
  }
  .aside .description {
    margin-bottom: 20px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
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
  .user-action .edit,.user-action .delete {
    color: #969696;
    outline: none;
  }
  .collection-follower li {
    display: inline-block;
  }
  .aside .collection-follower li a {
    margin-right: -10px;
  }
  .aside .collection-follower li img {
    border: 3px solid #fff;
    background-color: #fff;
  }
  .aside .function-btn {
    position: absolute;
    margin-left: 3px;
    width: 32px;
    height: 32px;
    border: 3px solid #fff;
    border-radius: 50%;
    background-color: #f0f0f0;
    color: #999;
    text-align: center;
  }
  .aside .function-btn i {
    font-size: 14px;
  }
  .followersList {
    height: 420px;
    overflow: auto;
  }
  .followersList li {
    width: 100%;
    height: 60px;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
  }
  .followersList .name {
    margin-left: 20px;
    font-size: 15px;
    color: #333;
    vertical-align: middle;
    display: inline-block;
  }
  .followersList .follow-time {
    float: right;
    margin-top: 7px;
    font-size: 12px;
    color: #969696;
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
</style>
