<template>
  <el-container class="main-top">
    <el-header style="height: 82px;">
      <el-avatar class="header" :size="80"/>
      <el-button round class="noteBookBtn" type="success">
        文集主页
      </el-button>
      <el-container>
        <el-header style="height: 30px; padding-left:0px">
          <div class="title">
            <a class="name" href="#/nb/6d71c8ef87ab">游记</a>
          </div>
        </el-header>
        <el-main style="padding-top: 0">
          <div class="info"><a href="#" style="color: #3194d0;">Andrew_liu</a>编 · 收录了2780篇文章 · 14755人关注</div>
        </el-main>
      </el-container>
    </el-header>
    <el-main>
      <el-menu default-active="1"  mode="horizontal" class="menu" @select="handleSelect">
        <el-menu-item index="1"><i class="el-icon-tickets"></i>最新发布</el-menu-item>
        <el-menu-item index="2"><i class="el-icon-chat-square"></i>最新评论</el-menu-item>
        <el-menu-item index="3"><i class="el-icon-document-copy"></i>目录</el-menu-item>
      </el-menu>
      <ul class="articles infinite-list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled">
        <li class="list infinite-list-item" v-for="n in count" v-bind:key="n">
          <el-container>
            <el-container>
              <el-header>
                <a class="title" target="_blank" href="#">
                  《诛仙》口碑遭遇滑铁卢，虽不是经典，但绝不是烂片{{n}}
                </a>
              </el-header>
              <el-main class="content">
                <p class="abstract">
                  《诛仙》是我高中时代就很喜欢的小说，记得那时候废寝忘食地追书。书中陆雪琪和碧瑶留给我留下了深刻的印象，男主在两个女子之间辗转反侧，情难独钟。 武...
                </p>
              </el-main>
              <el-footer  style="height: 30px">
                <a class="comment" href="#" target="_blank">
                  <span class="view"><i class="el-icon-view"/>999</span>
                </a>
                <a class="comment" href="#" target="_blank">
                  <i class="iconfont el-icon-third-pinglun2"/>999
                </a>
                <span class="like"><i class="iconfont el-icon-third-aixin"/>999</span>
                <span class="date">2019.10.17 12:04</span>
              </el-footer>
            </el-container>
            <!--    无图片隐藏 aside      -->
            <el-aside width="200px;">
              <a href="#" target="_blank">
                <img class="img" :src="url"/>
              </a>
            </el-aside>
          </el-container>
        </li>
        <p v-if="loading" v-loading="loading" style="width: 100%; height: 50px"></p>
      </ul>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UserSubscription',
  data () {
    return {
      fit: 'contain',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      count: 5,
      loading: false,
      description: '',
      showDescription: true
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
  p {
    margin: 0 ;
  }
  .title {
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 16px;
    color: #969696;
  }
  .main-top .info {
    margin-top: 20px;
    padding-left: 10px;
    font-size: 15px;
    color: #969696;
  }
  .list li {
    margin-bottom: 12px;
  }
  .list i {
    margin-right: 10px;
    font-size: 20px;
  }
  .user-dynamic a {
    font-size: 18px;
  }
  .header {
    float: left;
  }
  .main-top {
    width: 742px;
  }
  .main-top .title {
    padding-left: 30px;
    display: inline;
    font-size: 21px;
    font-weight: 700;
    vertical-align: middle;
  }
  .info {
    margin-top: 5px;
    font-size: 14px;
  }
  .info ul p {
    font-size: 15px;
    color: #333;
  }
  .info a {
    color: #969696;
  }
  .info .meta-block div{
    color: #969696;
  }
  .info li {
    display: inline-block;
  }
  .el-menu-item {
    font-size: 18px !important;
  }
  .menu {
    font-weight: 600;
    color: #969696;
  }
  .articles .list{
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
  }
  .articles .list i {
    margin: 0;
    font-size: 16px;
  }
  .articles .title:visited {
    color: #969696; text-decoration: underline;
  }
  .articles .title:hover {
    text-decoration: underline;
  }
  .articles .title {
    padding-left: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 60px;
  }
  .articles .abstract {
    font-size: 14px;
    color: #999999;
  }
  .articles .img {
    margin-top: 30px;
    width: 150px;
    height: 100px;
    /*object-fit: contain;*/
    border-radius: 4px;
  }
  .articles .comment{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 5px;
    text-decoration: none;
  }
  .articles .comment:hover{
    color: #787878;
  }
  .articles span{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 5px;
  }
  .articles .view:hover{
    color: #787878;
  }
  .articles .content {
    padding-top: 0;
  }
  .noteBookBtn {
    float: right;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
</style>
