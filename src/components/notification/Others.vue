<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">其他提醒</div>
        <ul class="other-list">
          <li v-for="(message, n) in messages" :key="n">
            <div class="info">
              <span>你投稿的文章</span>
              <router-link tag="a" :to="/p/ + message.articleId">《{{message.title}}》</router-link>
              <span v-if="!message.isRejected">已被加入专题</span>
              <span v-else>被拒绝 理由：{{message.reason}}</span>
              <div class="time">{{message.data}}</div>
            </div>
          </li>
        </ul>
        <el-pagination
          v-show="totals > 0"
          style=" text-align: center"
          :page-size="5"
          @current-change="getMessage"
          background
          layout="prev, pager, next"
          :total="totals">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Others',
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
      this.axios.get('/api/message/others', {
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
  .other-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .other-list .info {
    display: inline-block;
    line-height: 1.7;
    width: 535px;
    font-size: 15px;
  }
  .other-list .info a {
    font-size: 14px;
    color: #3194d0;
  }
  .other-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
</style>
