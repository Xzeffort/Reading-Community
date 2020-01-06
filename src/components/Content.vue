<template>
  <el-container>
    <el-carousel indicator-position="outside" style="width: 960px" class="carousel">
      <el-carousel-item v-for="item in 3" :key="item">
        <img src="../assets/imgTxt-item-2.jpg">
      </el-carousel-item>
    </el-carousel>
    <el-header style="margin: 0 320px">
      <el-menu default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">推荐图文</el-menu-item>
        <el-menu-item index="2">最热图文</el-menu-item>
        <el-menu-item index="3">最新图文</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <el-container style="margin: 0 300px">
          <el-main class="articleList">
            <article-list/>
          </el-main>
          <el-aside width="340px">
            <recommend-author/>
          </el-aside>
        </el-container>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import RecommendAuthor from './RecommendAuthor'
import ArticleList from './ArticleList'
export default {
  name: 'Content',
  components: {
    RecommendAuthor,
    ArticleList
  }
}
</script>

<style scoped>
  .carousel{
    margin: 0 auto;
  }
  .articleList{
    padding: 0;
  }
</style>
