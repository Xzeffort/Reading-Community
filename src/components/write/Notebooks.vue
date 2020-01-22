<template>
  <el-row style="height: 100%;">
    <el-col :span="7" style="height: 100%;">
      <div class="body">
        <div class="top">
          <el-button type="text" class="createBtn" @click="createNoteBook"><i class="el-icon-circle-plus"/>新建文章</el-button>
        </div>
        <ul class="list" ref="list">
          <li v-for="n in count" :key="n"
              :class="[activeClass === n ? 'active':'',list[n-1].isPublish ? 'publish':'noPublish']" @click="selectItem(n)">
            <i class="tag"/>
            <el-dropdown class="setting" trigger="click" :class="activeClass === n ? '':'hidden'">
              <span class="el-dropdown-link" style="outline: none">
                <i class="el-icon-s-tools"/>
              </span>
              <el-dropdown-menu slot="dropdown">
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
            <span class="title">{{list[n-1].title}}</span>
            <span class="content">{{list[n-1].content}}</span>
            <span class="fontCount">字数:{{list[n-1].fontCount}}</span>
          </li>
        </ul>
<!--        <div class="footer">-->
<!--          <el-button type="text" class="createBtn"><i class="el-icon-plus"/>在下方新建文章</el-button>-->
<!--        </div>-->
      </div>
    </el-col>
    <el-col :span="17"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Notebooks',
  data: () => ({
    activeClass: 1,
    count: 2,
    list: [
      {
        'title': 'java上传照片于七牛云，解决使用非静态图片',
        'content': '开发语言：Java编辑器：IntelliJ IDEA操作系统：win10基于spring-boot',
        'fontCount': 456,
        'isPublish': true
      },
      {
        'title': 'java上传照片于七牛云，解决使用非静态图片',
        'content': '开发语言：Java编辑器：IntelliJ IDEA操作系统：win10基于spring-boot',
        'fontCount': 456,
        'isPublish': false
      }
    ]
  }),
  methods: {
    selectItem (index) {
      this.activeClass = index
    },
    createNoteBook () {
      this.list.push({
        'title': this.getDate(),
        'content': '',
        'fontCount': 0,
        'isPublish': false
      })
      this.count++
      this.activeClass = this.count
    },
    deleteNoteBook (id) {
      this.$confirm('确认删除文章《2020-01-22》，文章将被移动到回收站，您可以在那里恢复它。60天后将被彻底删除。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
  .list li.active, .list li:hover {
    background-color: #e6e6e6;
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
