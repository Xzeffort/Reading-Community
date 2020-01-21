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
                        <a href="#/users/123/following">
                          <p>1</p>
                          关注 <i class="el-icon-arrow-right"></i>
                        </a>
                      </div>
                    </li>
                    <li>
                      <div class="meta-block">
                        <a href="#/users/123/following/fans">
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
            <el-menu :default-active="$route.path" router mode="horizontal" class="menu">
              <el-menu-item :index= url1>关注用户 93</el-menu-item>
              <el-menu-item :index= url2>粉丝 6473</el-menu-item>
            </el-menu>
            <router-view/>
          </el-main>
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
            <a href="#/users/123/subscriptions">
              <i class="el-icon-notebook-1"></i> <span>我关注的专题/文集/连载</span>
            </a>
          <li>
            <a href="#/users/123/subscriptions">
              <i class="el-icon-present"></i> <span>我喜欢的文章</span>
            </a>
          </li>
        </ul>
        <div>
          <div class="title">我创建的专题</div>
          <!--     如果有专题 下面隐藏     -->
          <div class="new-collection-block" hidden>
            <el-button class="create" icon="el-icon-plus" type="text" style="color: #42c02e">创建一个新专题</el-button>
          </div>
          <el-button class="create" icon="el-icon-plus" type="text" style="color: #42c02e">新建专题</el-button>
          <ul class="list">
            <li>
              <a href="/c/565a0de16ee1" target="_blank" class="avatar-collection">
                <img src="https://upload.jianshu.io/collections/images/1849232/STF%60KG3D__BR%29VKEG__L__I.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a>
              <a href="/c/565a0de16ee1" target="_blank" class="name">LPL</a>
            </li>
          </ul>
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
  name: 'UserFollowCenter',
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
      description: '',
      showDescription: true,
      url1: '/users/123/following',
      url2: '/users/123/following/fans'
    }
  },
  methods: {
    overFollow () {
      this.iconName = 'el-icon-close'
      this.buttonName = '取消关注'
      console.log(this.$route.path)
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
  .articles .list {
    padding-left: 40px;
    padding-right: 40px;
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
    float: right;
    outline: none;
    padding-top: 5px;
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
  .list li a {
    display: inline-block;
  }
  .avatar-collection {
    margin-right: 5px;
    width: 32px;
    height: 32px;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
  }
</style>
