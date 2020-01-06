<template>
  <el-container>
    <el-header class="header" height="50px">
      <span class="banner">推荐作者</span>
      <el-button class="page-change" type="text"><i class="el-icon-refresh"/>换一批</el-button>
    </el-header>
    <el-main style="padding: 0 20px">
      <ul>
        <li class="authors" v-for="n in 5" :key="n">
          <a href="#" target="_blank" class="avatar">
            <el-avatar :size="58" src="https://upload.jianshu.io/users/upload_avatars/2558050/7761b285-2805-4534-9870-ba7dcc7538ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"/>
          </a>
          <a href="#" target="_blank" class="name">
            只有一半影子的人{{n}}
            <p>
              写了486.2k字 · 1.5k喜欢
            </p>
          </a>
          <el-button class="follow" v-if="isFollow" size="mini" round
                     style="outline: none"
                     @click="follow(n)"
                     :ref="`followBtn${n}`">取消关注</el-button>
          <el-button class="follow" v-if="!isFollow" size="mini" round
                     style="outline: none"
                     @click="follow(n)"
                     :ref="`followBtn${n}`">关注</el-button>
        </li>
      </ul>
    </el-main>
    <el-footer>
      <el-button class="more" style="outline: none">查看全部<i class="el-icon-arrow-right"/></el-button>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: 'RecommendAuthor',
  data () {
    return {
      isFollow: false
    }
  },
  methods: {
    follow (index) {
      this.isFollow = !this.isFollow
    }
  }
}
</script>

<style scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .header{
    line-height: 60px;
  }
  .banner{
    font-size: 14px;
    color: #969696;
  }
  .page-change{
    float: right;
    color: #787878;
    display: inline-block;
    line-height: 60px;
    padding: 0;
    outline: none;
  }
  .authors{
    margin-top: 5px;
    height: 70px;
  }
  .name{
    float: left;
    margin-top: 10px;
    padding-left: 10px;
    font-size: 14px;
    display: inline-block;
    color: #333333;
    text-decoration: none;
  }
  .name p{
    font-size: 12px;
    color: #969696;
  }
  .follow{
    float: right;
    margin-top: 10px;
    margin-left: 12px;
  }
  .more {
    width: 100%;
  }
  .avatar {
    float: left;
  }
</style>
