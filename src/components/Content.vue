<template>
  <el-container>
    <el-carousel indicator-position="outside" style="width: 960px" class="carousel">
      <el-carousel-item v-for="item in 3" :key="item">
        <img src="../assets/imgTxt-item-2.jpg">
      </el-carousel-item>
    </el-carousel>
    <el-header style="margin: 0 320px">
      <el-menu default-active="2" class="el-menu-demo" mode="horizontal">
        <el-menu-item v-if="show" @click="type=1" index="1" style="font-size: 16px;">推荐</el-menu-item>
        <el-menu-item @click="type=2" index="2" style="font-size: 16px;">热榜</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <el-container style="margin: 0 300px">
          <el-main class="articleList">
            <article-list :type="type"/>
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
  },
  data () {
    return {
      type: 2,
      show: false
    }
  },
  created () {
    if (localStorage.getItem('userId')) {
      this.show = true
    } else {
      this.show = false
    }
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
