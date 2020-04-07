<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">全部关注</div>
        <ul class="follow-list">
          <li v-for="(message, n) in messages" :key="n">
           <div style="float: left;margin-top: 10px;margin-right: 10px">
             <router-link tag="a" :to="/u/ + message.userId" class="avatar">
               <img :src="message.headUrl">
             </router-link>
           </div>
            <div class="info" v-if="message.type == 1">
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span>关注了你</span>
              <div class="time">{{message.date}}</div>
            </div>
            <div class="info" v-else-if="message.type == 2">
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span>关注了你的专题</span>
              <router-link tag="a" :to="/c/ + message.typeId">
                <span style="color:#409EFF;">{{message.name}}</span>
              </router-link>
              <div class="time">{{message.date}}</div>
            </div>
            <div class="info" v-else>
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span>关注了你的文集</span>
              <router-link tag="a" :to="/nb/ + message.typeId">
                <span style="color:#409EFF;">{{message.name}}</span>
              </router-link>
              <div class="time">{{message.date}}</div>
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
  name: 'Follow',
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
      this.axios.get('/api/message/follow', {
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
  .follow-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .follow-list .avatar {
    display: inline-block;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-top: -10px;
  }
  .follow-list .info {
    max-width: 420px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .follow-list .info {
    display: inline-block;
    width: 500px;
    line-height: 1.7;
  }
  .follow-list .info a {
    font-size: 15px;
    color: #3194d0;
  }
  .info .user {
    margin: 0 5px 0 0;
    color: #333 !important;
  }
  .follow-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
  .follow-list .followBtn {
    float: right;
    margin-top: 5px;
    outline: none;
  }
</style>
