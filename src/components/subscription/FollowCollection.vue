<template>
  <ul class="user-list">
    <li v-for="(work,n) in works" :key="n">
      <router-link v-if="work.isNotebook" tag="a" :to="/nb/ + work.typeId" target="_blank" class="avatar-collection">
        <img src="../../assets/avatar-notebook-default.png">
      </router-link>
      <router-link v-else tag="a" :to="/c/ + work.typeId" target="_blank" class="avatar-collection">
        <img :src="work.headUrl">
      </router-link>
      <div class="info">
        <router-link v-if="work.isNotebook" tag="a" :to="/nb/ + work.typeId" target="_blank" class="name">
          {{work.name}}
        </router-link>
        <router-link v-else tag="a" :to="/c/ + work.typeId" target="_blank" class="name">
          {{work.name}}
        </router-link>
        <div class="meta">
          <span>
            {{work.articles}} 篇文章，{{work.followers}} 人关注
          </span>
        </div>
      </div>
      <el-button v-if="!work.isFollowed" type="success" round class="follow"
                 @click="followBtn(n)">
        <i class="el-icon-plus"/><span>关注</span></el-button>
      <el-button v-else type="info" round class="follow"  :ref="`unfollowNotebookBtn${n}`"
                 @click="followBtn(n)">
        <i class="el-icon-check"/><span>已关注</span></el-button>
    </li>
    <el-button v-if="totalPages > 1" class="more_button" @click="getWorks(currentPage + 1)" type="info" round>查看更多</el-button>
  </ul>
</template>

<script>
export default {
  name: 'FollowCollection',
  data () {
    return {
      works: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  created () {
    this.getWorks(1)
  },
  methods: {
    getWorks (page) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/user/' + _this.$route.params.id + '/follows',
        {
          params: {
            'page': page
          }
        }).then(function (res) {
        if (res.data.code) {
          _this.works = res.data.data.list
          _this.totalPages = res.data.data.totalPages
        }
      })
    },
    followBtn (index) {
      this.works[index].isFollowed = !this.works[index].isFollowed
      let _this = this
      if (_this.works[index].isNotebook) {
        _this.followNoteBook(index)
      } else {
        _this.followTopic(index)
      }
    },
    followNoteBook (index) {
      let _this = this
      this.axios.put('/api/follow/notebook', {
        'typeId': _this.works[index].typeId,
        'userId': localStorage.getItem('userId')
      }).then(function (res) {
        if (res.data.code) {
          if (_this.works[index].isFollowed) {
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
    followTopic (index) {
      let _this = this
      this.axios.put('/api/follow/topic', {
        'typeId': _this.works[index].typeId,
        'userId': localStorage.getItem('userId')
      }).then(function (res) {
        if (res.data.code) {
          if (_this.works[index].isFollowed) {
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
  .user-list li {
    padding-bottom: 20px;
    margin-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 1px solid #f0f0f0;
    line-height: normal;
  }
  .user-list .avatar-collection {
    width: 52px;
    height: 52px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
  }
  .user-list .info {
    vertical-align: middle;
    display: inline-block;
    max-width: 450px;
  }
  .user-list .name {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .user-list .meta {
    padding-top: 2px;
    font-size: 0;
    color: #969696;
  }
  .user-list .meta span {
    margin-right: 10px;
    padding-right: 10px;
    font-size: 12px;
    border-right: 1px solid #969696;
  }
  .user-list .meta span:last-child {
    border: none;
  }
  .user-list .follow {
    float: right;
    margin-top: 7px;
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
