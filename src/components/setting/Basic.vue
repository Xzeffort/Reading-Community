<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="myHeaders"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <span>{{form.telephone}}</span>
            <el-button type="text" style="outline: none;color: #969696;" @click="dialogTelephone1Visible = true">更换手机号</el-button>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="保密"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="个人简介">
            <el-input
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4}"
              placeholder="请填写您的个人简介"
              v-model="form.introduce">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" round @click="updateInfo">保存</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="安全验证" :visible.sync="dialogTelephone1Visible" width="450px">
          <p class="hint">为了保证你的账号安全，请先验证身份，验证成功后进行下一步操作，验证码10分钟内有效</p>
          <h3 class="contact">
            <span>用手机</span>
            {{form.telephone}}
            <span>验证</span>
          </h3>
          <el-input
            class="code"
            placeholder="短信验证码"
            prefix-icon="el-icon-message" v-model="code">
            <el-button @click="sendMsg"  class="sendCode" slot="suffix" size="mini" round :disabled="isDisabled">{{buttonName}}</el-button>
          </el-input>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="checkTelephone" round style="width: 100%;outline: none">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="绑定手机" :visible.sync="dialogTelephone2Visible" width="450px">
          <el-input
            class="username"
            placeholder="手机号"
            prefix-icon="el-icon-mobile-phone" v-model="newTelephone">
          </el-input>
          <el-input
            class="code"
            placeholder="短信验证码"
            prefix-icon="el-icon-message" v-model="code">
            <el-button @click="sendMsg" :disabled="isDisabled" class="sendCode" slot="suffix" size="mini" round>{{buttonName}}</el-button>
          </el-input>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="resetTelephone" round style="width: 100%;outline: none">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
const TIME_COUNT = 10 // 倒计时的时间
export default {
  name: 'Basic',
  data () {
    return {
      form: {
        name: '',
        imageUrl: '',
        telephone: '',
        sex: '',
        introduce: ''
      },
      dialogTelephone1Visible: false,
      dialogTelephone2Visible: false,
      buttonName: '发送验证码',
      isDisabled: false,
      newTelephone: '',
      timer: null,
      code: '',
      uploadUrl: '/api/user/head',
      myHeaders: {Authorization: ''}
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.form.imageUrl = res.data
      this.$message.success('上传成功')
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    getInfo () {
      let _this = this
      this.axios.get('/api/user/info').then(function (res) {
        if (res.data.code) {
          let info = res.data.data
          _this.form.name = info.nickname
          _this.form.imageUrl = info.headUrl
          _this.form.telephone = info.telephone
          _this.form.sex = info.sex
          _this.form.introduce = info.introduce
          _this.myHeaders.Authorization = localStorage.getItem('token')
        } else {
          _this.$message.error(res.data.msg)
          _this.$router.push({name: 'signIn'})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateInfo () {
      let _this = this
      let user = {
        nickname: _this.form.name,
        sex: _this.form.sex,
        introduce: _this.form.introduce
      }
      this.axios.put('/api/user/info', user).then(function (res) {
        if (res.data.code) {
          let info = res.data.data
          _this.form.name = info.nickname
          _this.form.sex = info.sex
          _this.form.introduce = info.introduce
          _this.$message.success('保存成功')
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    sendMsg () {
      let _this = this
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isDisabled = false
        this.axios.get('/api/user/code', {
          params: {
            telephone: _this.form.telephone
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
    checkTelephone () {
      let _this = this
      if (_this.code !== localStorage.getItem('code')) {
        _this.$message.error('验证码错误')
        return
      }
      _this.code = ''
      _this.buttonName = '发送验证码'
      _this.dialogTelephone1Visible = false
      _this.dialogTelephone2Visible = true
    },
    resetTelephone () {
      let _this = this
      if (_this.code !== localStorage.getItem('code')) {
        _this.$message.error('验证码错误')
        return
      }
      _this.axios.put('/api/user/resetTelephone', {
        'telephone': _this.newTelephone
      }).then(function (res) {
        if (res.data.code) {
          _this.$message.success('修改成功')
          _this.dialogTelephone2Visible = false
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
  }
  .hint {
    margin: 0;
    padding: 8px 0 0;
    font-size: 14px;
    color: #969696;
    clear: both;
  }
  .contact {
    margin-top: 25px;
    margin-bottom: 25px;
    text-align: center;
  }
  .contact  span {
    margin: 0 20px 0 6px;
    font-size: 15px;
    vertical-align: middle;
  }
  .sendCode {
    margin-top: 6px;
  }
</style>
