<template>
  <el-container>
    <el-header>
      <nav-component :activeNotification="true"/>
    </el-header>
    <el-container style="margin:50px auto">
      <el-aside width="280px">
        <ul>
          <li :class="activeClass === 1 ? 'active':''" @click="change(1)">
            <a href="#/notifications/comments"><i class="el-icon-chat-line-square"></i>
              <span>评论<el-badge style="margin-top: 7px;margin-left: 12px;" :value="4" /></span>
            </a>
          </li>
          <li :class="activeClass === 2 ? 'active':''" @click="change(2)">
            <a href="#/notifications/chats"><i class="el-icon-message"></i>
              <span>简信<el-badge style="margin-top: 7px;margin-left: 12px;" :value="6" /></span>
            </a>
          </li>
          <li :class="activeClass === 3 ? 'active':''" @click="change(3)">
            <a href="#/notifications/requests"><i class="el-icon-upload2"></i>
              <span>投稿请求<el-badge style="margin-top: 7px;margin-left: 12px;" :value="12" /></span>
            </a>
          </li>
          <li :class="activeClass === 4 ? 'active':''" @click="change(4)">
            <a href="#/notifications/likes"><i class="iconfont el-icon-third-xihuan"></i>
              <span>喜欢和赞<el-badge style="margin-top: 7px;margin-left: 12px;" :value="3" /></span>
            </a>
          </li>
          <li :class="activeClass === 5 ? 'active':''" @click="change(5)">
            <a href="#/notifications/follows"><i class="el-icon-finished"></i>
              <span>关注<el-badge style="margin-top: 7px;margin-left: 12px;" :value="5" /></span>
            </a>
          </li>
          <li :class="activeClass === 6 ? 'active':''" @click="change(6)">
            <a href="#/notifications/others"><i class="el-icon-more-outline"></i>
              <span>其他提醒<el-badge style="margin-top: 7px;margin-left: 12px;" :value="1" /></span>
            </a>
          </li>
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
      activeClass: 1
    }
  },
  methods: {
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
