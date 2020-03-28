<template>
  <el-row style="height: 100%;overflow:hidden; ">
    <el-col :span="7" style="height: 100%;">
      <div class="body">
        <div class="top">
          <el-button type="text" class="createBtn" @click="createNoteBook"><i class="el-icon-circle-plus"/>新建文章</el-button>
        </div>
        <ul class="list" ref="list">
            <router-link :to="{path:'/writer/notebooks/' + article.notebookId + '/notes/'+article.id}" tag="li" v-for="(article,n) in articles" :key="n"
                :class="[article.isPublished ? 'publish':'noPublish']" @click.native="selectItem(n)">
              <i class="tag"/>
              <el-dropdown class="setting hidden" trigger="click" >
              <span class="el-dropdown-link" style="outline: none">
                <i class="el-icon-s-tools"/>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="publishNoteBook" v-if="!article.isPublished">
                    发布文章
                  </el-dropdown-item>
                  <el-dropdown-item v-else>
                    已发布
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="updateNoteBook">
                    更新文章
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="setTop" v-if="article.isPublished">
                    置顶文章
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <i class="iconfont el-icon-third-wenjianjia" style="font-size: 10px;"></i>
                    <!--       todo 弹窗           -->
                    移动文章
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="deleteNoteBook(n)">
                    <i class="el-icon-delete" style="font-size: 14px;"></i>
                    删除文章
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span class="title">
                <span :class="article.isTop ? 'topIcon':'noTopIcon'">置顶</span>
                {{article.title}}
              </span>
              <!--    过滤html          -->
              <span class="content"> {{article.content}}</span>
              <span class="fontCount">字数:{{article.words}}</span>
            </router-link>
        </ul>
      </div>
    </el-col>
    <el-col :span="17" style="height: 100%">
      <div>
        <router-view :isUpdated="isUpdated" @getUpdateContent="getUpdateContent"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Notebooks',
  data: () => ({
    articles: [],
    updateIndex: '',
    topIndex: '',
    updateArticle: {},
    isUpdated: false
  }),
  methods: {
    selectItem (index) {
      this.updateIndex = index
    },
    getInfo (id) {
      let _this = this
      this.axios.get('/api/articles', {
        params: { 'noteId': id }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data
          for (let i = 0; i < _this.articles.length; i++) {
            if (_this.articles[i].isTop) {
              _this.topIndex = i
              break
            }
            if (_this.articles[i].id === _this.$route.params.nbId) {
              _this.updateIndex = i
            }
          }
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    createNoteBook () {
      let _this = this
      this.axios.post('/api/articles', {
        'notebookId': this.$route.params.id
      }).then(function (res) {
        if (res.data.code) {
          let article = {
            'id': res.data.data.id,
            'title': _this.getDate(),
            'content': '',
            'words': 0,
            'isPublished': false,
            'notebookId': _this.$route.params.id
          }
          _this.articles.push(article)
          _this.$message.success('创建成功')
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    publishNoteBook () {
      let _this = this
      this.axios.put('/api/articles/publish', {
        'id': this.articles[_this.updateIndex].id,
        'title': this.updateArticle.title,
        'content': this.updateArticle.content,
        'words': this.updateArticle.words
      }).then(function (res) {
        if (res.data.code) {
          _this.articles[_this.updateIndex].isPublished = true
          _this.articles[_this.updateIndex].title = res.data.data.title
          _this.articles[_this.updateIndex].content = res.data.data.content
          _this.articles[_this.updateIndex].words = res.data.data.words
          _this.isUpdated = true
          _this.$message.success('发布成功')
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    updateNoteBook () {
      let _this = this
      this.axios.put('/api/articles', {
        'id': this.articles[_this.updateIndex].id,
        'title': this.updateArticle.title,
        'content': this.updateArticle.content,
        'words': this.updateArticle.words
      }).then(function (res) {
        if (res.data.code) {
          _this.articles[_this.updateIndex].isPublished = true
          _this.articles[_this.updateIndex].title = res.data.data.title
          _this.articles[_this.updateIndex].content = res.data.data.content
          _this.articles[_this.updateIndex].words = res.data.data.words
          _this.isUpdated = true
          _this.$message.success('更新成功')
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    setTop () {
      let _this = this
      this.axios.put('/api/articles/top', {
        'id': this.articles[_this.updateIndex].id
      }).then(function (res) {
        if (res.data.code) {
          _this.articles[_this.updateIndex].isTop = true
          _this.articles[_this.topIndex].isTop = false
          _this.topIndex = _this.updateIndex
          _this.$message.success('置顶成功')
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    deleteNoteBook (n) {
      this.$confirm('确认删除文章《' + this.articles[n].title + '》，文章将被移动到回收站，您可以在那里恢复它。60天后将被彻底删除。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this
        this.axios.delete('/api/articles',
          {
            'data': {
              'id': this.articles[n].id
            }
          }).then(function (res) {
          if (res.data.code) {
            _this.$message.success('删除成功')
          } else {
            _this.$message.error(res.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.articles.splice(n, 1)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 父组件接受更新的文章数据
    getUpdateContent (val) {
      this.updateArticle = val
      this.isUpdated = false
      // this.articles[val.index].title = val.title
      // this.articles[val.index].content = val.content
    },
    getDate () {
      var date = new Date()
      var seperator1 = '-'
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      return year + seperator1 + month + seperator1 + strDate
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.getInfo(to.params.id)
    })
  },
  beforeRouteUpdate (to, from, next) {
    if (from.params.id !== to.params.id) {
      this.getInfo(to.params.id)
    }
    next()
  }
}
</script>

<style scoped>
  ul, li {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .body{
    overflow-y: scroll;
    height: 100%;
  }
  .top {
    line-height: 20px;
    font-size: 15px;
    font-weight: 400;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    color: #595959;
  }
  .top i {
    padding-right: 3px;
    font-size: 18px;
    vertical-align: bottom;
  }
  .top .createBtn {
    font-size: 18px;
    color: #595959;
    outline: none;
  }
  .footer {
    line-height: 30px;
    padding: 20px 0 20px 25px;
    cursor: pointer;
    margin-bottom: 80px;
  }
  .footer i {
    padding-right: 2px;
    font-weight: bold;
  }
  .footer .createBtn {
    font-size: 16px;
    color: #999;
    outline: none;
  }
  .footer .createBtn:hover {
    color: #666;
  }
  .list {
    position: relative;
  }
  .list .hidden {
    display: none;
  }
  .list li {
    position: relative;
    height: 90px;
    color: #595959;
    background-color: #fff;
    margin-bottom: 0;
    padding: 15px 10px 15px 60px;
    -webkit-box-shadow: 0 0 0 1px #d9d9d9;
    box-shadow: 0 0 0 1px #d9d9d9;
    border-left: 5px solid transparent;
    list-style: none;
    line-height: 60px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .list li.active {
    border-left-color: #ec7259;
  }
  .list li.active .hidden{
    display: block;
  }
  .list li.active, .list li:hover {
    background-color: #e6e6e6;
  }
  .list a:hover {
    text-decoration: none;
  }
  .publish .tag {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 22px;
    height: 30px;
    background: url('../../assets/sprite.png') no-repeat -50px -25px;
    background-size: 250px;
  }
  .noPublish .tag {
    position: absolute;
    top: 30px;
    left: 20px;
    width: 22px;
    height: 30px;
    background: url('../../assets/sprite.png') no-repeat 0 -25px;
    background-size: 250px;
  }
  .title {
    font-size: 20px;
    font-weight: bold;
  }
  .content,.title {
    display: block;
    height: 30px;
    line-height: 30px;
    margin-right: 40px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title .topIcon {
    float: left;
    margin-top: 4px;
    display: inline-block;
    width: 40px;
    height: 22px;
    line-height: 22px;
    border-radius: 4px;
    color: #fff;
    background-color: #ec7259;
    text-align: center;
    font-size: 12px;
    margin-right: 8px;
  }
  .title .noTopIcon {
    display: none;
  }
  .setting {
    float: right;
  }
  .setting i {
    font-size: 18px;
    margin-right: 10px;
  }
  .fontCount {
    position: absolute;
    bottom: 2px;
    left: 5px;
    font-size: 9px;
    line-height: 16px;
    color: #595959;
  }
  .el-dropdown-menu__item {
    padding: 0 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
