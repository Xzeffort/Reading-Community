<template>
  <el-container>
    <el-header>
      <nav-component :activeNotification="true"/>
    </el-header>
    <el-container style="margin:50px auto">
      <el-aside width="280px">
        <ul>
          <router-link tag="li" to="/notifications/comments">
            <a href="#"><i class="el-icon-chat-line-square"></i>
              <span>评论<el-badge style="margin-top: 7px;margin-left: 12px;" v-if="messages.comments" :value="messages.comments" /></span>
            </a>
          </router-link>
<!--          <li :class="activeClass === 2 ? 'active':''" @click="change(2)">-->
<!--            <a href="#/notifications/chats"><i class="el-icon-message"></i>-->
<!--              <span>简信<el-badge style="margin-top: 7px;margin-left: 12px;" :value="messages.likes" /></span>-->
<!--            </a>-->
<!--          </li>-->
          <router-link tag="li" to="/notifications/requests">
            <a href="#"><i class="el-icon-upload2"></i>
              <span>投稿请求<el-badge style="margin-top: 7px;margin-left: 12px;" v-if="messages.submits" :value="messages.submits" /></span>
            </a>
          </router-link>
          <router-link tag="li" to="/notifications/likes" >
            <a href="#"><i class="iconfont el-icon-third-xihuan"></i>
              <span>喜欢和赞<el-badge style="margin-top: 7px;margin-left: 12px;" v-if="messages.likes" :value="messages.likes" /></span>
            </a>
          </router-link>
          <router-link tag="li" to="/notifications/follows" >
            <a href="#"><i class="el-icon-finished"></i>
              <span>关注<el-badge style="margin-top: 7px;margin-left: 12px;" v-if="messages.follows" :value="messages.follows" /></span>
            </a>
          </router-link>
        </ul>
      </el-aside>
      <el-container style="margin-left: 40px;">
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Notification',
  components: {
    NavComponent
  },
  data () {
    return {
      activeClass: 1,
      messages: {}
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      let _this = this
      this.axios.get('/api/message/count', {
        params: {
          'userId': localStorage.getItem('userId')
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.messages = res.data.data
        }
      })
    },
    change (index) {
      this.activeClass = index
    }
  }
}
</script>

<style scoped>
  a {
    color: #333;
    cursor: pointer;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
  ul li {
    margin: 0;
  }
  li {
    line-height: 20px;
  }
  ul a {
    height: auto;
    padding: 10px 25px;
    line-height: 30px;
    display: block;
  }
  ul i {
    margin-right: 15px;
    font-size: 24px;
    color: #ea6f5a;
    vertical-align: middle;
  }
  ul span {
    font-size: 18px;
    vertical-align: middle;
  }
  ul li.active a {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>
