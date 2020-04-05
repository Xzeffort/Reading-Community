<template>
  <div id="list-container">
    <ul class="user-list">
      <li v-for="(fan, n) in fans" :key="n">
        <router-link tag="a" :to="/u/ + fan.userId" class="avatar">
          <img :src="fan.headUrl" alt="180">
        </router-link>
        <div class="info">
          <router-link class="name" tag="a" :to="/u/ + fan.userId">{{fan.nickname}}</router-link>
          <div class="meta">
            <span>关注 {{fan.followers}}</span><span>粉丝 {{fan.fans}}</span><span>文章 {{fan.articles}}</span>
          </div>
          <div class="meta">
            写了 {{fan.words}} 字，获得了 {{fan.likes}} 个喜欢
          </div>
        </div>
        <el-button v-if="!fan.isFollowed" type="success" round class="followBtn"
                   @click="follow(n)"
                   :ref="`followBtn${n}`"><i class="el-icon-plus"></i><span>关注</span></el-button>
        <el-button v-else type="info" round class="followBtn followed"
                   @click="follow(n)"
                   :ref="`unfollowBtn${n}`"
                   @mouseenter.native="overFollow(n)"
                   @mouseleave.native="leaveFollow(n)"><i class="el-icon-check"></i><span>已关注</span></el-button>
      </li>
      <el-button v-if="totalPages > 1" class="more_button" @click="getFans(currentPage + 1)" type="info" round>查看更多</el-button>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Fans',
  data () {
    return {
      fans: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  created () {
    this.getFans(1)
  },
  methods: {
    getFans (page) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/user/' + _this.$route.params.id + '/fans',
        {
          params: {
            'page': page
          }
        }).then(function (res) {
        if (res.data.code) {
          _this.fans = res.data.data.list
          _this.totalPages = res.data.data.totalPages
        }
      })
    },
    follow (index) {
      let _this = this
      _this.fans[index].isFollowed = !_this.fans[index].isFollowed
      this.axios.put('/api/follow',
        {
          'fromUserId': localStorage.getItem('userId'),
          'toUserId': _this.$route.params.id
        }).then(function (res) {
        if (res.data.code) {
          if (_this.fans[index].isFollowed) {
            _this.$message({
              message: '关注成功',
              type: 'success'
            })
            _this.$refs[`unfollowBtn${index}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
          } else {
            _this.$message({
              message: '取关成功',
              type: 'success'
            })
            _this.$refs[`followBtn${index}`][0].$el.firstElementChild.lastElementChild.innerHTML = '关注'
          }
        }
      })
    },
    overFollow (e) {
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
    },
    leaveFollow (e) {
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin-top: 20px;
  }
  .user-list li {
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    line-height: normal;
  }
  .user-list .avatar{
    width: 52px;
    height: 52px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .user-list .name {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .user-list .info {
    vertical-align: middle;
    display: inline-block;
    max-width: 450px;
  }
  .user-list .meta {
    padding-top: 2px;
    font-size: 12px;
    color: #969696;
  }
  .user-list .meta span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #969696;
  }
  .user-list .meta span:last-child {
    border: none;
  }
  .user-list .followBtn {
    float: right;
    margin-top: 10px;
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
</style>
