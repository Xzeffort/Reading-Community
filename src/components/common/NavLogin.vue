<template>
  <div>
  <b-navbar type="light" variant="light">
    <b-navbar-brand href="#" class="logo">简书</b-navbar-brand>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="nav">
        <b-nav-item href="#">发现</b-nav-item>
        <b-nav-item href="#">关注</b-nav-item>
        <b-nav-item href="#">
          <el-dropdown>
            <span class="el-dropdown-link">
              消息
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item icon="el-icon-plus">评论</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">喜欢和赞</el-dropdown-item>
              <el-dropdown-item icon="el-icon-plus">系统信息</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar type="light" variant="light">
        <b-nav-form>
          <b-form-input class="mr-sm-2" placeholder="搜索"></b-form-input>
          <b-button variant="info" class="my-2 my-sm-0" type="submit">搜索</b-button>
        </b-nav-form>
      </b-navbar>
    </b-collapse>
    <b-navbar-nav>
      <el-dropdown>
          <span class="el-dropdown-link">
             <div class="head">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                <span class="el-dropdown-link">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
             </div>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>我的主页</el-dropdown-item>
          <el-dropdown-item>我收藏的文章</el-dropdown-item>
          <el-dropdown-item>我喜欢的文章</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <b-button pill variant="outline-danger" size="lg"><i class="el-icon-edit"/>写文章</b-button>
    </b-navbar-nav>
  </b-navbar>
</div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
  * {
    font-size: 16px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  }
  .head{
    margin-right: 30px;
  }
  .el-icon-arrow-down {
    font-size: 10px;
  }
  .logo{
     width: 300px;
     padding-left: 100px;
    font-size: 30px;
  }
</style>
