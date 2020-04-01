<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-main class="container">
      <el-container>
        <el-header style="height: 120px">
          <img class="recommend-banner" src="../assets/recommend-author.png"/>
        </el-header>
        <el-main>
          <el-row :gutter="30">
            <el-col :span="8" v-for="(user,index) in users" :key="index">
              <div class="wrap">
                <router-link tag="a" class="top" target="_blank" :to="/u/+user.id">
                  <el-avatar  class="avatar" :size="80"
                              :src="user.headUrl" alt="180"></el-avatar>
                  <h4 class="name">
                    {{user.nickname}}
                  </h4>
                  <p class="description">{{user.introduce}}</p>
                </router-link>
                <div v-show="userId != user.id">
                  <el-button v-if="!user.isFollowed" round type="success" class="off follow user-follow-button"
                             @click="follow(user.id, user.isFollowed,index)">
                    <i class="el-icon-plus"/>关注
                  </el-button>
                  <el-button v-else round type="info" class="on followed user-follow-button"
                             @click="follow(user.id, user.isFollowed,index)"
                             @mouseover.native="overFollow(index)"
                             @mouseleave.native="leaveFollow(index)"
                             :ref="`followBtn${index}`">
                    <i class="el-icon-check"/><span>已关注</span>
                  </el-button>
                </div>
                <hr>
                <div class="meta">最近更新</div>
                <div class="recent-update">
                  <router-link v-for="article in user.simpleArticleDTOS" :key="article.id" tag="a" class="new" target="_blank"
                              :to="/p/+article.articleId">{{article.title}}</router-link>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="7">
              <el-button  @click="getUser(++currentPage)" class="more_button" type="info" round>加载更多</el-button>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'RecommendationUsers',
  components: {
    NavComponent
  },
  data () {
    return {
      isFollowed: false,
      users: [],
      userId: '',
      currentPage: 1,
      totalPages: 1
    }
  },
  created () {
    this.getUser(1)
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    follow (id, isFollowed, index) {
      let _this = this
      isFollowed = !isFollowed
      _this.users[index].isFollowed = isFollowed
      this.axios.put('/api/follow', {
        'fromUserId': localStorage.getItem('userId'),
        'toUserId': id
      }).then(function (res) {
        if (res.data.code === '403') {
          _this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        if (isFollowed) {
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
      })
    },
    getUser (page) {
      if (page > this.totalPages) {
        this.$message({
          message: '到底了',
          type: 'success',
          center: true
        })
        return
      }
      let _this = this
      this.axios.get('/api/recommendUsers', {
        params: {
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.users = res.data.data.list
          _this.totalPages = res.data.data.totalPages
        }
      })
    },
    overFollow (e) {
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
      this.buttonName = '取消关注'
    },
    leaveFollow (e) {
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    }
  }
}
</script>

<style scoped>
  .wrap .top  {
    text-decoration: none;
    color: #333;
  }
  .container {
    width: 1100px;
    padding: 40px 0 50px;
    text-align: center;
  }
  .recommend-banner {
    width: 100%;
    min-height: 100px;
    background-color: hsla(0,0%,71%,.2);
    border-radius: 6px;
  }
  .wrap {
    height: 320px;
    margin-top: 50px;
    padding: 0 20px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    transition: .2s ease;
    -webkit-transition: .2s ease;
    -moz-transition: .2s ease;
    -o-transition: .2s ease;
    -ms-transition: .2s ease;
  }
  .wrap:hover {
     box-shadow: 0 5px 20px rgba(0,0,0,.1);
  }
  .avatar {
    margin: -40px 0 10px;
    display: inline-block;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .wrap h4 {
    font-size: 21px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wrap .description {
    margin: 0 auto 10px;
    max-width: 180px;
    min-height: 50px;
    font-size: 13px;
    line-height: 25px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .user-follow-button {
    outline: none;
  }
  .meta {
    float: left;
    margin-top: -29px;
    padding-right: 10px;
    font-size: 14px;
    color: #969696;
    background-color: #f8f8f8;
  }
  .recent-update {
    min-height: 75px;
  }
  .wrap .new {
    color: #333;
    font-size: 13px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .more_button {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
    padding: 10px 0;
    border-radius: 20px;
    border: none;
  }
</style>
