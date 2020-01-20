<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <el-form ref="form" :model="form" label-width="80px" label-position="left">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="手机">
            <span>151****1988</span>
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
            <el-button type="success" round>保存</el-button>
          </el-form-item>
        </el-form>
        <el-dialog title="安全验证" :visible.sync="dialogTelephone1Visible" width="450px">
          <p class="hint">为了保证你的账号安全，请先验证身份，验证成功后进行下一步操作，验证码10分钟内有效</p>
          <h3 class="contact">
            <span>用手机</span>
            151****1988
            <span>验证</span>
          </h3>
          <el-input
            class="code"
            placeholder="短信验证码"
            prefix-icon="el-icon-message" v-model="code">
            <el-button @click="sendMsg"  class="sendCode" slot="suffix" size="mini" round :disabled="isDisabled">{{buttonName}}</el-button>
          </el-input>
          <div slot="footer" class="dialog-footer" style="text-align: center">
            <el-button type="primary" @click="dialogTelephone1Visible = false,dialogTelephone2Visible = true" round style="width: 100%;outline: none">确 定</el-button>
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
            <el-button type="primary" @click="dialogTelephone2Visible = false" round style="width: 100%;outline: none">确 定</el-button>
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
        name: '你在烦恼什么',
        imageUrl: 'https://upload.jianshu.io/users/upload_avatars/5197898/418540bf-dbe8-4c86-82e7-638774a9d9c5?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/300/format/webp',
        telephone: '',
        sex: '男',
        introduce: ''
      },
      dialogTelephone1Visible: false,
      dialogTelephone2Visible: false,
      buttonName: '发送验证码',
      isDisabled: false,
      newTelephone: '',
      timer: null,
      code: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(URL.createObjectURL(file.raw))
      this.form.imageUrl = URL.createObjectURL(file.raw)
    },
    sendMsg () {
      if (!this.timer) {
        this.count = TIME_COUNT
        this.isDisabled = false
        this.$message.success('发送成功，请注意查收')
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
