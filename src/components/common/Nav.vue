<template>
  <div class="navTitle">
    <b-navbar >
      <b-navbar-brand href="#" class="logo">简书</b-navbar-brand>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="nav">
          <b-nav-item class="nav-item" :to="{name: 'Index'}" exact exact-active-class="active"><i class="el-icon-s-home"/>首页</b-nav-item>
          <b-nav-item class="nav-item" :to="{name: 'IndexSubscription'}" v-if="isLogin" exact exact-active-class="active" :active="active"><i class="el-icon-reading" />关注</b-nav-item>
          <b-nav-item class="nav-item nav-item-msg" v-if="isLogin" exact exact-active-class="active">
            <el-dropdown>
            <span class="el-dropdown-link">
                  <i class="el-icon-bell"/>消息
            </span>
              <el-dropdown-menu slot="dropdown" class="dropdown">
                <el-dropdown-item><i class="el-icon-chat-line-square"/>评论</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-message"/>简信</el-dropdown-item>
                <el-dropdown-item><i class="iconfont el-icon-third-xihuan"/>喜欢和赞</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-finished"/>关注</el-dropdown-item>
                <el-dropdown-item><i class="el-icon-more-outline"/>其他提醒</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </b-nav-item>
        </b-navbar-nav>
        <b-navbar>
<!--          <b-nav-form>-->
<!--            <b-form-input class="mr-sm-2" placeholder="搜索"></b-form-input>-->
<!--            <b-button variant="info" class="my-2 my-sm-0" type="submit">搜索</b-button>-->
<!--          </b-nav-form>-->
          <el-input class="search"
            placeholder="搜索">
            <el-button slot="suffix" type="text" class="el-icon-search" circle size="mini"></el-button>
          </el-input>
        </b-navbar>
      </b-collapse>
      <b-navbar-nav v-if="!isLogin">
        <router-link to='/sign_in'>
          <el-button class="login" type="text">登录</el-button>
        </router-link>
        <router-link to='/sign_up'>
          <el-button class="register" type="danger" round>注册</el-button>
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav v-if="isLogin">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
             <div class="head">
                <span class="el-dropdown-link">
                  <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
<!--                      <i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
                </span>
             </div>
          </span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown">
            <el-dropdown-item><i class="el-icon-user-solid"/>我的主页</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-star-on"/>我收藏的文章</el-dropdown-item>
            <el-dropdown-item><i class="iconfont el-icon-third-aixin"/>我喜欢的文章</el-dropdown-item>
            <el-dropdown-item command="logout"><i class="el-icon-switch-button"/>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <b-button pill variant="outline-danger" size="lg"><i class="el-icon-edit"/>写文章</b-button>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data: function () {
    return {
      isLogin: true
    }
  },
  props: {
    'active': Boolean
  },
  methods: {
    login () {
      this.isLogin = true
    },
    handleCommand (command) {
      if (command === 'logout') {
        this.isLogin = false
      }
    }
  }
}
</script>

<style scoped>
  * {
    font-size: 17px;
    font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  .head{
    margin-right: 30px;
  }
  .el-icon-arrow-down {
    font-size: 10px;
  }
  .logo{
    width: 300px;
    padding-left: 100px;
    font-size: 30px;
  }
  .login {
    color: #969696;
    margin-right: 30px;
    outline: none;
  }
  .register {
    margin-right: 30px;
    outline: none;
  }
  .navTitle {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    border-bottom: 1px solid #f0f0f0;
    background: #ffffff;
  }
  nav .nav-link.active {
    color:  #ea6f5a !important;
  }
  .search >>> input{
    border-radius: 30px !important;
    background: #eeeeee;
    border-color: #eeeeee;
    outline: none;
  }
  .search >>> button {
    margin-top: 3px;
    outline: none;
    color: gray;
  }
  .nav-item i {
    font-size: 18px;
    margin-right: 5px;
  }
  .nav-item {
    margin-right: 20px;
  }
  .nav-item a {
    font-size: 18px;
  }
  .nav-item span {
    font-size: 18px;
  }
  .nav-item-msg span:hover {
    color: rgba(0, 0, 0, 0.7)
  }
  .dropdown i {
    margin-right: 15px;
    font-size: 20px;
    color: #ea6f5a;
    vertical-align: middle;
  }
  .dropdown li:hover {
    color: #333;
    background: #f0f0f0;
  }
  .user-dropdown i {
    margin-right: 15px;
    font-size: 20px;
    color: #ea6f5a;
    vertical-align: middle;
  }
  .user-dropdown li:hover {
    color: #333;
    background: #f0f0f0;
  }
</style>
