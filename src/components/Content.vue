<template>
  <el-container>
    <el-carousel indicator-position="outside" style="width: 960px" class="carousel">
      <el-carousel-item v-for="item in 3" :key="item">
        <img src="../assets/imgTxt-item-2.jpg">
      </el-carousel-item>
    </el-carousel>
    <el-header style="margin: 0 320px">
      <el-menu :default-active="1" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1">最热图文</el-menu-item>
        <el-menu-item index="2">最新图文</el-menu-item>
        <el-menu-item index="3">篮球</el-menu-item>
        <el-menu-item index="4">电竞</el-menu-item>
        <el-menu-item index="5">娱乐</el-menu-item>
        <el-menu-item index="6">足球</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-main>
        <el-container style="margin: 0 300px">
          <el-main>《诛仙》口碑遭遇滑铁卢，虽不是经典，但绝不是烂片</el-main>
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
export default {
  name: 'Content',
  components: {RecommendAuthor}
}
</script>

<style scoped>
  .carousel{
    margin: 0 auto;
  }
</style>
