<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">收到的喜欢和赞</div>
        <ul class="like-list">
          <li v-for="(message, n) in messages" :key="n">
           <div style="float: left;margin-top: 10px;margin-right: 10px">
             <router-link tag="a" :to="/u/ + message.userId" class="avatar">
               <img :src="message.headUrl">
             </router-link>
           </div>
            <div class="info" v-if="message.isComment">
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span>赞你的评论</span>
              <router-link tag="a" :to="/p/ + message.articleId" class="middle">{{message.comment}}</router-link>
              <div class="time">{{message.date}}</div>
            </div>
            <div v-else class="info">
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span>喜欢了你的文章</span>
              <router-link tag="a" :to="/p/ + message.articleId" class="middle">{{message.title}}</router-link>
              <div class="time">{{message.date}}</div>
            </div>
          </li>
        </ul>
        <el-pagination
          style=" text-align: center"
          background
          v-show="totals > 0"
          :page-size="5"
          @current-change="getMessage"
          layout="prev, pager, next"
          :total="totals">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Like',
  data () {
    return {
      messages: [],
      totals: 0,
      totalPages: 1
    }
  },
  created () {
    this.getMessage(1)
  },
  methods: {
    getMessage (page) {
      let _this = this
      this.axios.get('/api/message/like', {
        params: {
          'userId': localStorage.getItem('userId'),
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.messages = res.data.data.list
          _this.totalPages = res.data.data.totalPages
          _this.totals = res.data.data.totalElements
        }
      })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
  }
  ul {
    padding-left: 0;
  }
  img {
    vertical-align: middle;
  }
  .menu {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  .like-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .like-list .avatar {
    display: inline-block;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-top: -10px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .like-list .info {
    display: inline-block;
    width: 535px;
    line-height: 1.7;
  }
  .like-list .info a {
    font-size: 15px;
    color: #3194d0;
  }
  .info .user {
    margin: 0 5px 0 0;
    color: #333 !important;
  }
  .info .middle {
    margin: 0 5px;
  }
  .like-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
</style>
