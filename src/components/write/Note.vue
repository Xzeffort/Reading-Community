<template>
  <div>
    <div style="padding-top: 20px;height: 80px;position: relative">
      <input type="text" class="title" value="java上传照片于七牛云，解决使用非静态图片"
             v-model="title" @keyup="isUpdate"/>
      <p class="status">已保存</p>
    </div>
    <div style="height: 100%;">
      <editor
        :init="init"
        v-model="content"  @onChange="onChange"/>
    </div>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
export default {
  name: 'Note',
  components: {Editor},
  props: ['isUpdated'],
  mounted () {
    tinymce.init({})
  },
  data () {
    let _this = this
    return {
      isFlag: false,
      index: '',
      title: '请输入您的标题',
      content: '',
      init: {
        language_url: '/static/zh_CN.js',
        language: 'zh_CN',
        height: 800,
        plugins: 'link lists image code table wordcount quickbars',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        images_upload_handler: function (blobInfo, succFun, failFun) {
          _this.handleImgUpload(blobInfo, succFun, failFun)
        }
      }
    }
  },
  methods: {
    handleImgUpload (blobInfo, success, failure) {
      let formdata = new FormData()
      formdata.set('file', blobInfo.blob())
      this.axios.post('http://localhost:8085/api/articles/img', formdata).then(res => {
        success(res.data.data)
      }).catch(res => {
        failure('error')
      })
    },
    getArticle (id) {
      let _this = this
      this.axios.get('/api/articles/one', {
        params: { 'id': id }
      }).then(function (res) {
        if (res.data.code) {
          _this.title = res.data.data.title
          _this.content = res.data.data.content ? res.data.data.content : ''
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    onChange (e, editor) {
      // this.$emit('change', e, tinymce)
      let _this = this
      var wordcount = tinymce.activeEditor.plugins.wordcount
      let article = {
        'id': _this.$route.params.nbId,
        'title': _this.title,
        'content': _this.content,
        'words': wordcount.body.getWordCount()
      }
      _this.isFlag = true
      this.$emit('getUpdateContent', article)
    },
    isUpdate () {
      let _this = this
      var wordcount = tinymce.activeEditor.plugins.wordcount
      _this.isFlag = true
      let article = {
        'id': _this.$route.params.nbId,
        'title': _this.title,
        'content': _this.content,
        'words': wordcount.body.getWordCount()
      }
      this.isFlag = true
      this.$emit('getUpdateContent', article)
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getArticle(to.params.nbId)
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (this.isFlag && !this.isUpdated) {
      this.$confirm('您已经更新了文章，还未发布，是否要离开页面', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getArticle(to.params.nbId)
        this.isFlag = false
        next()
      }).catch(() => {
        next(false)
      })
    } else {
      this.getArticle(to.params.nbId)
      this.isFlag = false
      next()
    }
  }
}
</script>

<style scoped>
  .title {
    flex-shrink: 0;
    width: 100%;
    padding: 0 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .status {
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 18px;
    color: rgba(0,0,0,.65);
  }
</style>
