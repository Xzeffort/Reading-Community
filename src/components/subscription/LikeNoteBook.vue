<template>
  <ul class="articles"
      ref="articleList">
    <li class="list" v-for="(article, n) in articles" v-bind:key="n">
      <el-container>
        <el-container>
          <el-header>
            <div class="author">
              <el-avatar :size="30" class="avatar"
                         :src="article.headUrl" alt="64"></el-avatar>
              <div class="info">
                <router-link tag="a" class="nickname" :to="/u/ + article.userId">{{article.nickname}}</router-link>
                <span class="time">{{article.createdDate}}</span>
              </div>
              <router-link tag="a" :to="/p/ + article.articleId" class="title" target="_blank">
                {{article.title}}
              </router-link>
            </div>
          </el-header>
          <el-main class="content" style="padding-bottom: 10px">
            <p class="abstract">
              {{article.content}}
            </p>
          </el-main>
          <el-footer  style="height: 30px">
            <router-link tag="a" :to="/p/ + article.articleId" class="comment" target="_blank">
              <span class="view"><i class="el-icon-view"/>{{article.clicks}}</span>
            </router-link>
            <router-link tag="a" :to="/p/ + article.articleId" class="comment"  target="_blank">
              <i class="iconfont el-icon-third-pinglun2"/>{{article.comments}}
            </router-link>
            <span class="like"><i class="iconfont el-icon-third-aixin"/>{{article.likes}}</span>
          </el-footer>
        </el-container>
      </el-container>
    </li>
    <el-button v-if="totalPages > 1" class="more_button" @click="getArticles(currentPage + 1)" type="info" round>查看更多</el-button>
  </ul>
</template>

<script>
export default {
  name: 'LikeNoteBook',
  data () {
    return {
      articles: [],
      currentPage: 1,
      totalPages: 1
    }
  },
  created () {
    this.getArticles(1)
  },
  methods: {
    getArticles (page) {
      let _this = this
      _this.currentPage = page
      if (page > _this.totalPages) {
        _this.$message({
          message: '到底啦',
          type: 'success'
        })
        return
      }
      this.axios.get('/api/user/' + _this.$route.params.id + '/like/articles',
        {
          params: {
            'page': page
          }
        }).then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data.list
          _this.totalPages = res.data.data.totalPages
        }
      })
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
  p {
    margin: 0 ;
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
    margin: 10px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    color: #333333;
  }
  .articles .abstract {
    margin-top: 15px;
    font-size: 14px;
    line-height: 24px;
    color: #999;
    width: 700px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
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
  .articles .view:hover{
    color: #787878;
  }
  .articles .content {
    padding-top: 0;
  }
 .avatar, .author .info {
    display: inline-block;
    vertical-align: middle;
  }
  .author .nickname {
    text-decoration: none;
    color: #333333;
  }
  .more_button {
    display:block;
    margin:20px auto;
    width: 80%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
  }
</style>
