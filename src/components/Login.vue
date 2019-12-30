<template>
  <div class="sign">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a class="active" href="#/sign_in">登录</a>
          <b>·</b>
          <a id="js-sign-up-btn" class="" href="#/sign_up">注册</a>
        </div>
      </h4>
      <div class="sign_in">
        <el-input
          class="username"
          placeholder="账号"
          prefix-icon="el-icon-user" v-model="username">
        </el-input>
        <el-input
          class="password"
          placeholder="密码"
          prefix-icon="el-icon-lock" show-password v-model="password">
        </el-input>
      </div>
      <div>
        <el-link class="forget" :underline="false">忘记密码?</el-link>
      </div>
      <el-button class="login_button" round>登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  .sign {
    height: 100%;
    min-height: 900px;
    text-align: center;
    font-size: 14px;
    background-color: #f1f1f1;
    overflow: hidden;
  }
  .main {
    width: 400px;
    margin: 90px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
  }
  .title{
    font-size: 22px;
    margin: 0 auto 50px;
    padding: 10px;
    font-weight: 400;
    color: #969696;
    text-align: center;
  }
  .title a {
     padding: 10px;
     color: #969696;
   }
  .title a:hover {
    color: #ea6f5a;
    border-bottom: 3px solid #ea6f5a;
  }
  .title .active {
    font-weight: 700;
    color: #ea6f5a;
    border-bottom: 3px solid #ea6f5a;
  }
  .username {
    height: 50px;
  }
  .password {
    height: 50px;
  }
  .forget {
    float: right;
    margin-top: 10px;
  }
  .login_button {
    margin-top: 20px;
    width: 100%;
    color: #fff;
    background: #3194d0;
    font-size: 18px;
    outline: none;
  }
</style>
