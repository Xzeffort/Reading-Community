<template>
  <div style="height: 100%">
    <div class="title">
      <h3>{{article.title}}</h3>
      <router-link to="/writer/notebooks/123"><a class="_1i-No">×</a></router-link>
    </div>
    <div class="noteBody">
      <div class="note-view">
        {{article.content}}
      </div>
    </div>
    <div class="footer" v-if="article.id">
      <el-button type="success" class="footer_btn" @click="recycleArticle">恢复文章</el-button>
      <el-button type="danger" class="footer_btn" @click="deleteArticle">彻底删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecycleBody',
  props: ['article', 'articleIndex'],
  watch: {
    article (val) {
      console.log('子组件接收' + val)
    },
    articleIndex (val) {
      console.log('子组件接收' + val)
    }
  },
  methods: {
    recycleArticle () {
      let _this = this
      this.axios.put('/api/articles/recycle',
        {
          'id': this.article.id
        }).then(function (res) {
        if (res.data.code) {
          _this.$message.success('恢复成功')
          _this.$router.push('/writer/notebooks/' + _this.article.notebookId + '/notes/' + _this.article.id)
        } else {
          _this.$message.error(res.data.msg)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    deleteArticle () {
      this.$confirm('确认删除文章《' + this.article.title + '》，文章将被彻底删除，无法恢复', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this
        this.axios.delete('/api/articles/recycle',
          {
            'data': {
              'id': _this.article.id
            }
          }).then(function (res) {
          if (res.data.code) {
            _this.$message.success('删除成功')
            _this.$emit('getMessage', _this.articleIndex)
          } else {
            _this.$message.error(res.data.msg)
          }
        }).catch(function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
  .title {
    width: 100%;
    height: 82px;
    padding-top: 20px;
    padding-bottom: 20px;
    background: #e6e6e6;
    position:fixed;
    top: 0;
  }
  .title h3 {
    position: relative;
    width: 740px;
    display: inline-block;
    left: 45%;
    margin: auto auto auto -370px;
    font-size: 25px;
    color: #333;
    font-weight: bold;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .title ._1i-No {
    position: relative;
    display: inline-block;
    right: 50%;
    font-weight: bold;
    margin-right: -390px;
    margin-top: -14px;
    font-size: 40px;
    float: right;
    color: #595959;
    cursor: pointer;
  }
  .noteBody {
    position: relative;
    top: 82px;
    z-index: -999;
  }
  .note-view {
    width: 800px;
    margin: auto;
    padding: 30px 30px 50px;
  }
  .footer {
    position:fixed;
    background: #ffffff;
    width: 100%;
    bottom: 0;
    padding: 8px 0;
  }
  .footer .footer_btn {
    position:relative;
    left: 25%;
  }
</style>
