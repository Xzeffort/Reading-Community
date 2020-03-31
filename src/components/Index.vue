<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-main>
      <nav-content class="nav-content"/>
    </el-main>
    <el-footer class="footer">关于知书 · 联系我们 · 加入我们 · 简书出版 · 品牌与徽标 · 帮助中心 · 合作伙伴</el-footer>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
import NavContent from './Content'
export default {
  name: 'Index',
  components: {
    NavComponent,
    NavContent
  }
}
</script>
<style scoped>
 .el-header{
   padding: 0;
   margin-bottom: 30px;
 }
  .footer {
    text-align: center;
  }
</style>
