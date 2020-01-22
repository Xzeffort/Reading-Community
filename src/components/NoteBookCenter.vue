<template>
  <el-row style="height: 100%;">
    <el-col :span="4" style="height: 100%;">
      <div class="aside">
        <div class="backIndex">
          <a href="/">回首页</a>
        </div>
        <div class="_1iZMb">
          <div class="_33Zlg" @click="showCreate = !showCreate"><i class="el-icon-plus"></i><span>新建文集</span></div>
          <div>
            <el-collapse-transition>
              <div v-show="showCreate">
                <div class="transition-box" style="margin-top: 10px">
                  <input type="text" placeholder="请输入文集名..." name="name" class="_1CtV4">
                  <el-button type="success" size="small" round style="outline: none;background-color: unset;color: #42c02e;">提交</el-button>
                  <el-button type="text" style="outline: none;color: #999;" @click="showCreate=false">取消</el-button>
                </div>
              </div>
            </el-collapse-transition>
          </div>
        </div>
        <ul class="clist">
          <router-link :to="url">
              <li title="日记本" v-for="n in 4" :key="n"
                :class="activeClass === n ? 'active':''" @click="selectItem(n)">
              <el-dropdown class="setting" trigger="click" :class="activeClass === n ? '':'hidden'">
                <span class="el-dropdown-link" style="outline: none">
                  <i class="el-icon-s-tools"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-edit" @click.native="dialogEditVisible = true">修改文集</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-delete" @click.native="deleteNoteBook(id)">删除文集</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>日记本{{n}}</span>
            </li>
          </router-link>
        </ul>
        <div class="h-5Am">
          <div style="float: left"> <i class="el-icon-delete"></i><span>回收站</span></div>
          <span class="Yv5Zx" @click="dialogInfoVisible = true">遇到问题<i class="el-icon-question"></i></span>
        </div>
      </div>
      <el-dialog title="请输入新文集名" :visible.sync="dialogEditVisible" width="312px">
        <el-input v-model="notebookName" placeholder="请输入内容"></el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogEditVisible = false">取 消</el-button>
          <el-button type="success" @click="dialogEditVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="常见问题" :visible.sync="dialogInfoVisible" width="320px" center>
        <ul>
          <li style="margin-top: 20px;">1. Windows用户尽量将浏览器设置为极速模式，不要使用兼容模式写作</li>
          <li style="margin-top: 20px;">2.推荐使用chrome浏览器，创作体验更加流畅</li>
          <li style="margin-top: 20px;">3.浏览器插件可能与编辑器功能冲突，可以在使用编辑器时禁用插件</li>
        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button type="text" @click="dialogInfoVisible = false" style="color: #ec7259;text-align: center">我知道了</el-button>
        </div>
      </el-dialog>
    </el-col>
    <el-col :span="20" style="height: 100%;">
      <div style="height: 100%;">
        <router-view/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'NoteBookCenter',
  data: () => ({
    showCreate: false,
    dialogInfoVisible: false,
    dialogEditVisible: false,
    notebookName: '',
    activeClass: 1,
    url: '/writer/notebooks/23'
  }),
  methods: {
    selectItem (index) {
      this.activeClass = index
    },
    deleteNoteBook (id) {
      this.$confirm('确认删除文集《22》，文章将被移动到回收站。', '提示', {
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
    }
  }
}
</script>

<style scoped>
  * {
    font-family: -apple-system,SF UI Text,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
  }
  ul,li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
  .router-link-active {
    text-decoration: none;
  }
  .aside {
    position: relative;
    height: 100%;
    overflow-y: auto;
    background-color: #404040;
    color: #f2f2f2;
    z-index: 100;
  }
  .backIndex {
    padding: 30px 18px 5px;
    text-align: center;
  }
  .backIndex a {
    display: block;
    font-size: 15px;
    padding: 9px 0;
    color: #ec7259;
    border: 1px solid rgba(236,114,89,.8);
    border-radius: 20px;
    -webkit-transition: border-color .2s ease-in;
    -o-transition: border-color .2s ease-in;
    transition: border-color .2s ease-in;
    text-decoration: none;
  }
  ._1iZMb {
    padding: 0 15px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
  ._1iZMb ._33Zlg {
    cursor: pointer;
    color: #f2f2f2;
    -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
    -o-transition: color .2s cubic-bezier(.645,.045,.355,1);
    transition: color .2s cubic-bezier(.645,.045,.355,1);
  }
  ._1iZMb ._33Zlg span {
    margin-left: 4px;
  }
  ._1CtV4 {
    width: 100%;
    height: 35px;
    color: #ccc;
    background-color: #595959;
    border: 1px solid #333;
    padding: 4px 6px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .clist li {
    position: relative;
    line-height: 50px;
    list-style: none;
    font-size: 15px;
    color: #f2f2f2;
    background-color: #404040;
    padding: 0 15px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .clist .hidden {
    display: none;
  }
  .clist li:hover {
    background-color: #666;
  }
  .clist .active {
    background-color: #666;
    border-left: 3px solid #ec7259;
    padding-left: 12px;
  }
  .clist span {
    display: block;
    margin-right: 20px;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clist .setting {
    font-size: 18px;
    float: right;
    color: #ffffff;
  }
  .h-5Am {
    position: fixed;
    bottom: 0;
    width: 16%;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
    padding-left: 15px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 150;
    background-color: #404040;
  }
  .Yv5Zx {
    float: right;
    margin-right: 15px;
    color: #999;
    cursor: pointer;
  }
  .Yv5Zx i {
    margin-left: 2px;
  }
</style>
