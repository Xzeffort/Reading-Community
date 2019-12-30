<template>
  <div class="sign">
    <div class="main">
      <h4 class="title">
        用手机号重置密码
      </h4>
      <div class="sign_in">
        <el-input
          class="telephone"
          placeholder="手机号"
          prefix-icon="el-icon-mobile-phone" v-model="telephone">
        </el-input>
        <el-input
          class="code"
          placeholder="短信验证码"
          prefix-icon="el-icon-message" v-model="code">
          <el-button class="sendCode" slot="suffix" size="mini" round>发送验证码</el-button>
        </el-input>
        <el-input
          class="password"
          placeholder="请输入新密码"
          prefix-icon="el-icon-lock" show-password v-model="password">
        </el-input>
        <el-input
          class="password"
          placeholder="请再一次输入新密码"
          prefix-icon="el-icon-lock" show-password v-model="repassword">
        </el-input>
      </div>
      <el-button class="reset_button" round>重置密码</el-button>
      <el-link class="return" :underline="false" href="#/sign_in"><i class="el-icon-back"/>返回登录注册</el-link>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ForgetPassword',
  data () {
    return {
      telephone: '',
      code: '',
      password: '',
      repassword: ''
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
    font-weight: bold;
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
  .telephone {
    height: 50px;
  }
  .code {
    height: 50px;
  }
  .password {
    height: 50px;
  }
  .reset_button {
    margin-top: 20px;
    width: 100%;
    color: #fff;
    background: #3194d0;
    font-size: 18px;
    outline: none;
  }
  .return {
     margin-top: 20px;
     color:  #969696;
   }
  .return:hover {
    color:  #333333;
  }
  .sendCode {
    background-color: #3194d0;
    margin-top: 7px;
    color: #fff;
    outline: none;
  }
</style>
