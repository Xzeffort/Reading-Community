<template>
  <div class="sign">
    <div class="main">
      <h4 class="title">
        用手机号重置密码
      </h4>
      <div class="sign_in">
        <el-form :model="userForm" :rules="rules"  ref="userForm">
          <el-form-item prop="telephone">
            <el-input
              class="telephone"
              placeholder="手机号"
              prefix-icon="el-icon-mobile-phone" v-model.number="userForm.telephone">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              class="code"
              placeholder="短信验证码"
              prefix-icon="el-icon-message" v-model="userForm.code">
              <el-button @click="sendMsg" :disabled="isDisabled" class="sendCode" slot="suffix" size="mini" round>{{buttonName}}</el-button>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              class="password"
              placeholder="请输入新密码"
              prefix-icon="el-icon-lock" show-password v-model="userForm.password">
            </el-input>
          </el-form-item>
          <el-form-item prop="repassword">
            <el-input
              class="password"
              placeholder="请再一次输入新密码"
              prefix-icon="el-icon-lock" show-password v-model="userForm.repassword">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <el-button class="reset_button" round @click="submitForm('userForm')">重置密码</el-button>
      <el-link class="return" :underline="false" href="#/sign_in"><i class="el-icon-back"/>返回登录注册</el-link>
    </div>
  </div>
</template>
<script>
const TIME_COUNT = 10 // 倒计时的时间
export default {
  name: 'ForgetPassword',
  data () {
    const CheckTel = (rule, value, callback) => {
      this.isDisabled = true
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else if (!Number.isInteger(value)) {
        callback(new Error('手机号码必须是数字'))
      } else if (value.toString().length !== 11) {
        callback(new Error('手机号码必须是11位'))
      } else {
        callback()
        this.isDisabled = false
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.toString().length < 8 || value.toString().length > 16) {
        callback(new Error('密码长度为8-16位'))
      } else {
        if (this.userForm.password !== '') {
          this.$refs.userForm.validateField('repassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.userForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userForm: {
        telephone: '',
        code: '',
        password: '',
        repassword: ''
      },
      rules: {
        telephone: [
          { required: true, validator: CheckTel, trigger: ['blur', 'change'] }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        repassword: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      isDisabled: true,
      buttonName: '发送验证码',
      timer: null
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          console.log(this.userForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    sendMsg () {
      // 验证码倒计时
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isDisabled = false
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
