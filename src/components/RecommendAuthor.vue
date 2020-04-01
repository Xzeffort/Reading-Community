<template>
  <el-container>
    <el-header class="header" height="50px">
      <span class="banner">推荐作者</span>
      <el-button class="page-change" @click="getUser(++currentPage)" type="text"><i class="el-icon-refresh"/>换一批</el-button>
    </el-header>
    <el-main style="padding: 0 20px">
      <ul>
        <li class="authors" v-for="(user,index) in users" :key="user.id">
          <router-link tag="a" :to="/u/+user.id" target="_blank" class="avatar">
            <el-avatar :size="58" :src="user.headUrl"/>
          </router-link>
          <router-link tag="a" :to="/u/+user.id" target="_blank" class="name">
            {{user.nickname}}
            <p>
              写了{{user.words}}字 · {{user.likes}}喜欢
            </p>
          </router-link>
          <div v-show="userId != user.id">
            <el-button class="follow" v-if="user.isFollowed" size="mini" round
                       style="outline: none"
                       @click="follow(user.id, user.isFollowed,index)">取消关注</el-button>
            <el-button class="follow" v-else size="mini" round
                       style="outline: none"
                       @click="follow(user.id, user.isFollowed,index)">关注</el-button>
          </div>
        </li>
      </ul>
    </el-main>
    <el-footer>
      <el-button @click.native="$router.push({name: 'RecommendationUsers'})"
                 class="more" style="outline: none">查看全部<i class="el-icon-arrow-right"/></el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'RecommendAuthor',
  data () {
    return {
      users: [],
      currentPage: 1,
      totalPages: 1,
      userId: ''
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
  .header{
    line-height: 60px;
  }
  .banner{
    font-size: 14px;
    color: #969696;
  }
  .page-change{
    float: right;
    color: #787878;
    display: inline-block;
    line-height: 60px;
    padding: 0;
    outline: none;
  }
  .authors{
    margin-top: 5px;
    height: 70px;
  }
  .name{
    float: left;
    margin-top: 10px;
    padding-left: 10px;
    font-size: 14px;
    display: inline-block;
    color: #333333;
    text-decoration: none;
  }
  .name p{
    font-size: 12px;
    color: #969696;
  }
  .follow{
    float: right;
    margin-top: 10px;
    margin-left: 12px;
  }
  .more {
    width: 100%;
  }
  .avatar {
    float: left;
  }
</style>
