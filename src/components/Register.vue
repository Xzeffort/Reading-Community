<template>
  <div class="sign">
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a class="" href="#/sign_in">登录</a>
          <b>·</b>
          <a id="js-sign-up-btn" class="active" href="#/sign_up">注册</a>
        </div>
      </h4>
      <div class="sign_in">
        <el-input
          class="username"
          placeholder="你的昵称"
          prefix-icon="el-icon-user" v-model="nickname">
        </el-input>
        <el-input
          class="username"
          placeholder="手机号"
          prefix-icon="el-icon-mobile-phone" v-model="username" @change="showInput">
        </el-input>
        <el-input
          v-if="show"
          class="code"
          placeholder="短信验证码"
          prefix-icon="el-icon-message" v-model="code">
          <el-button @click="sendMsg" :disabled="isDisabled" class="sendCode" slot="suffix" size="mini" round>{{buttonName}}</el-button>
        </el-input>
        <el-input
          class="password"
          placeholder="密码"
          prefix-icon="el-icon-lock" show-password v-model="password">
        </el-input>
      </div>
      <el-button class="register_button" round @click="register">注册</el-button>
      <p class="sign-up-msg">点击 “注册” 即表示您同意并愿意遵守简书<br> <a target="_blank" href="http://www.jianshu.com/p/c44d171298ce">用户协议</a> 和 <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。</p>
    </div>
  </div>
</template>

<script>
const TIME_COUNT = 10 // 倒计时的时间
export default {
  name: 'Register',
  data () {
    return {
      nickname: '',
      username: '',
      password: '',
      code: '',
      show: false,
      isDisabled: false,
      buttonName: '发送验证码',
      timer: null
    }
  },
  methods: {
    showInput () {
      this.show = true
    },
    sendMsg () {
      var _this = this
      // 验证码倒计时
      if (!(/^1[3456789]\d{9}$/.test(this.username))) {
        this.$message.error('手机号码有误，请重填')
        return false
      }
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isDisabled = false
        this.axios.get('/api/user/code', {
          params: {
            telephone: _this.username
          }
        }).then(function (res) {
          if (res.data.code) {
            _this.$message.success('发送成功，请注意查收')
            localStorage.setItem('code', res.data.data)
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
            this.buttonName = '重新发送（' + this.count + '秒' + '）'
            this.isDisabled = true
          } else {
            this.isDisabled = false
            clearInterval(this.timer)
            this.timer = null
            this.buttonName = '重新发送'
          }
        }, 1000)
      }
    },
    register () {
      let _this = this
      if (_this.code !== localStorage.getItem('code')) {
        _this.$message.error('验证码错误')
        return
      }
      _this.axios.post('/api/user/register', {
        'nickname': _this.nickname,
        'telephone': _this.username,
        'password': _this.password
      }).then(function (res) {
        if (res.data.code) {
          _this.$message.success('注册成功')
          _this.$router.push({name: 'signIn'})
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
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
  .code {
    height: 50px;
  }
  .register_button {
    margin-top: 20px;
    width: 100%;
    color: #fff;
    background: #3db922;
    font-size: 18px;
    outline: none;
  }
  .sign-up-msg {
    margin: 10px 0;
    padding: 0;
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    color: #969696;
  }
  .sendCode {
    background-color: #3db922;
    margin-top: 7px;
    color: #fff;
    outline: none;
  }
</style>
