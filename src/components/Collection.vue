<template>
    <el-container>
      <el-header>
        <nav-component/>
      </el-header>
      <el-container style="margin:30px auto">
        <el-main>
          <el-container style="min-width: 760px">
            <el-header>
              <div class="main-top">
                <a class="avatar-collection" href="/c/V2CqjW">
                  <img src="../assets/collection.jpg" alt="240">
                </a>
                <el-button v-if="!isFollowed" round type="success" class="off follow user-follow-button">
                  <i class="el-icon-plus"/>关注
                </el-button>
                <el-button v-if="isFollowed" round type="primary" class="on followed user-follow-button"
                           @mouseover.native="overFollow"
                           @mouseleave.native="leaveFollow">
                  <i :class="iconName"/>{{buttonName}}
                </el-button>
                <el-button round class="sendArticleBtn">
                  投稿
                </el-button>
                <div class="title">
                  <a class="name" href="/c/V2CqjW">@IT·互联网</a>
                </div>
                <div class="info">
                  收录了51795篇文章 · 2207975人关注
                </div>
              </div>
            </el-header>
            <el-main>
              <el-menu default-active="1"  mode="horizontal" class="menu">
                <el-menu-item index="1"><i class="el-icon-chat-square"></i>最新评论</el-menu-item>
                <el-menu-item index="2"><i class="el-icon-tickets"></i>最新收录</el-menu-item>
                <el-menu-item index="4"><i class="el-icon-star-off"></i>热门</el-menu-item>
              </el-menu>
              <ul class="articles infinite-list"
                  infinite-scroll-distance="30px"
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
                        <a class="nickname" href="#" target="_blank">
                          <span class="nickname">你在烦恼什么</span>
                        </a>
                        <a class="comment" href="#" target="_blank">
                          <i class="iconfont el-icon-third-pinglun2"/>999
                        </a>
                        <span class="like"><i class="iconfont el-icon-third-aixin"/>999</span>
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
        </el-main>
        <el-aside style="padding-top: 20px;" class="aside">
          <p class="title">专题公告</p>
          <div class="description">
            <p>冲冲冲</p>
          </div>
          <div style="margin-bottom: 20px;padding-bottom: 10px;border-bottom: 1px solid #f0f0f0;">
            <p class="title">管理员</p>
            <a href="#/u/6d71c8ef87ab" target="_blank" class="avatar">
              <img src="https://upload.jianshu.io/users/upload_avatars/5197898/418540bf-dbe8-4c86-82e7-638774a9d9c5?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a> <a href="/u/6d71c8ef87ab" target="_blank" class="name">
              你在烦恼些什么
            </a>
          </div>
          <div class="user-action">
            <!--todo 编辑专题-->
            <el-button type="text" class="edit">编辑专题</el-button>
            <span class="delete-collection-button">·
            <el-button type="text" class="delete" @click="dialogDelete = true">删除专题</el-button>
            </span>
            <el-dialog
              title="删除专题"
              :visible.sync="dialogDelete"
              width="30%">
              <span>该专题目前收录了11篇文章，删除专题操作不可逆，请慎重！</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDelete = false">取 消</el-button>
                <el-button type="danger" @click="dialogDelete = false">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-aside>
      </el-container>
    </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Collection',
  components: {
    NavComponent
  },
  data () {
    return {
      iconName: 'el-icon-check',
      buttonName: '已关注',
      isFollowed: true,
      count: 5,
      loading: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      dialogDelete: false
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
    load () {
      this.loading = true
      this.count += 2
      this.loading = false
    },
    overFollow () {
      this.iconName = 'el-icon-close'
      this.buttonName = '取消关注'
    },
    leaveFollow () {
      this.iconName = 'el-icon-check'
      this.buttonName = '已关注'
    }
  }
}
</script>

<style scoped>
  a {
    color: #333;
    text-decoration: none;
  }
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  p {
    margin: 0 0 10px;
  }
  .main-top .avatar-collection {
    float: left;
    width: 80px;
    height: 80px;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
  }
  .main-top .title {
    padding: 10px 0 0 100px;
  }
  .main-top .title .name {
    display: inline;
    font-size: 21px;
    font-weight: 700;
    vertical-align: middle;
  }
  .main-top .info {
    margin-top: 10px;
    padding-left: 100px;
    font-size: 14px;
    color: #969696;
  }
  .sendArticleBtn {
    float: right;
    margin-top: 23px;
    outline: none;
    width: 110px;
    margin-right: 20px;
  }
  .user-follow-button {
    width: 110px;
    float: right;
    margin-top: 23px;
    outline: none;
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
    width: 530px;
    font-size: 14px;
    color: #999999;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
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
  .articles .nickname:hover{
    color: #787878;
  }
  .articles .content {
    padding-top: 0;
  }
  .aside .description {
    margin-bottom: 20px;
    padding: 0 0 16px;
    text-align: left;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
  }
  .avatar {
    margin-right: 5px;
    width: 32px;
    height: 32px;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .user-action .edit,.user-action .delete {
    color: #969696;
    outline: none;
  }
</style>
