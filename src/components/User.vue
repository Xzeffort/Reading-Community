<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-container style="margin:30px auto">
      <el-main style="margin-right: 10px">
        <el-container class="main-top">
          <el-header style="height: 82px;">
            <el-avatar class="header" :size="80"/>
            <el-button v-if="!isFollowed" round type="success" class="off follow user-follow-button">
              <i class="el-icon-check"/>关注
            </el-button>
            <el-button v-if="isFollowed" round type="primary" class="on followed user-follow-button"
                       @mouseover.native="overFollow"
                       @mouseleave.native="leaveFollow">
              <i :class="iconName"/>{{buttonName}}
            </el-button>
            <el-button round class="sendMsgBtn">
              发简信
            </el-button>
            <el-container>
              <el-header style="height: 30px; padding-left:0px">
                <div class="title">
                  <a class="name" href="#/u/6d71c8ef87ab">你在烦恼些什么</a>
                  <i class="el-icon-female" style="color: deeppink"/>
                  <i class="el-icon-male" style="color: deepskyblue"/>
                </div>
              </el-header>
              <el-main style="padding-top: 0">
                <div class="info">
                  <ul>
                    <li>
                      <div class="meta-block">
                        <a href="#/users/6d71c8ef87ab/following">
                          <p>1</p>
                          关注 <i class="el-icon-arrow-right"></i>
                        </a>        </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <a href="#/users/6d71c8ef87ab/followers">
                          <p>1</p>
                          粉丝 <i class="el-icon-arrow-right"></i>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <a href="#/u/6d71c8ef87ab">
                          <p>1</p>
                          文章 <i class="el-icon-arrow-right"></i>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <p>4100</p>
                        <div>字数</div>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <p>2</p>
                        <div>收获喜欢</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </el-main>
            </el-container>
          </el-header>
          <el-main>
            <el-menu default-active="1"  mode="horizontal" class="menu" @select="handleSelect">
              <el-menu-item index="1"><i class="el-icon-tickets"></i>文章</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-bell"></i>动态</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-chat-square"></i>最新评论</el-menu-item>
              <el-menu-item index="4"><i class="el-icon-star-off"></i>热门</el-menu-item>
            </el-menu>
          </el-main>
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
        </el-container>
      </el-main>
      <el-aside style="padding-top: 20px">
        <div>
          <div class="title">个人介绍</div>
          <el-button type="text" class="function-btn" @click="updatedDescription"><i class="el-icon-edit"></i>编辑</el-button>
        </div>
        <div class="description">
          <el-input
            style="height:120px;"
            v-if="!showDescription"
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5}"
            placeholder="请输入内容"
            v-model="description">
          </el-input>
          <el-button v-if="!showDescription" type="success" plain round style="outline: none">保存</el-button>
          <el-button v-if="!showDescription" type="text" round style="outline: none" @click="cancleUpdatedDescription">取消</el-button>
            <div v-if="showDescription">你在烦恼些什么你在烦恼些什么你在烦恼些什么你在烦恼些什么你在烦恼些什么你在烦恼些什么</div>
        </div>
        <ul class="list user-dynamic">
          <li>
            <a href="#/u/2">
              <i class="el-icon-notebook-1"></i> <span>我关注的专题/文集/连载</span>
            </a>
          <li>
          <a href="#/u/1">
            <i class="el-icon-present"></i> <span>我喜欢的文章</span>
          </a>
          </li>
        </ul>
        <div>
          <div class="title">我创建的专题</div>
          <div class="new-collection-block">
            <el-button class="create" icon="el-icon-plus" type="text" style="color: #42c02e">创建一个新专题</el-button>
          </div>
        </div>
        <div><div class="title">
          我的文集
        </div>
          <ul class="list">
            <li>
            <a href="/nb/10792727" target="_blank"><i class="el-icon-notebook-2"></i>
            </a>
            <a href="/nb/10792727" target="_blank" class="name">
              日记本
            </a>
            </li>
          </ul>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'User',
  components: {
    NavComponent
  },
  data () {
    return {
      iconName: 'el-icon-check',
      buttonName: '已关注',
      isFollowed: true,
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
    },
    overFollow () {
      this.iconName = 'el-icon-close'
      this.buttonName = '取消关注'
    },
    leaveFollow () {
      this.iconName = 'el-icon-check'
      this.buttonName = '已关注'
    },
    updatedDescription () {
      this.description = '原文本'
      this.showDescription = false
    },
    cancleUpdatedDescription () {
      this.showDescription = true
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
    margin-bottom: 10px;
    font-size: 16px;
    color: #969696;
  }
  .function-btn {
    float: right;
    font-size: 15px;
    color: #969696;
    padding: 0;
    outline: none;
  }
  .description{
    position: relative;
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }
  .list {
    margin-bottom: 16px;
    padding-bottom: 8px;
    list-style: none;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
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
  .new-collection-block {
    margin-bottom: 16px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 0;
    border-bottom: 1px solid #f0f0f0;
    clear: both;
  }
  .create {
    outline: none;
  }
  .header {
    float: left;
  }
  .main-top {
    width: 800px;
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
  .main-top .info ul .meta-block {
    font-size: 12px;
    margin: 0 7px 6px 0;
    padding: 0 7px 0 0;
    border-right: 1px solid #f0f0f0;
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
  .user-follow-button {
    float: right;
    width: 120px;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
  .sendMsgBtn {
    float: right;
    width: 120px;
    margin: 23px 0 23px 16px;
    font-size: 15px;
    outline: none;
  }
</style>
