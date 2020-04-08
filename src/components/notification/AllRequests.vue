<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="push-top">
          <a href="#/notifications/requests" class="back-to-list">
            <i class="el-icon-back"></i> 返回投稿请求列表
          </a>
        </div>
        <ul class="note-list">
          <li v-for="(article,n) in articles" :key="n">
            <div class="content">
              <div class="author">
                <router-link tag="a" :to="/u/+ article.userId" class="avatar">
                  <img :src="article.headUrl">
                </router-link>
                <div class="info">
                  <router-link tag="a" :to="/u/+ article.userId" class="nickname">{{article.nickname}}</router-link>
                  <span class="time">{{article.createdDate}}</span>
                </div>
              </div>
              <router-link tag="a" :to="/p/+ article.articleId" target="_blank" class="title">{{article.title}}</router-link>
              <p class="abstract">
                {{article.content}}
              </p>
              <div class="meta">
                <router-link tag="a" :to="/p/+ article.articleId">
                  <i style="margin-right: 5px" class="iconfont el-icon-third-liulan"></i>{{article.clicks}}</router-link>
                <router-link tag="a" :to="/p/+ article.articleId">
                  <i style="margin-right: 5px" class="iconfont el-icon-third-pinglun2"></i>{{article.comments}}</router-link>
                <span><i style="margin-right: 5px" class="iconfont el-icon-third-aixin"></i>{{article.likes}}</span>
              </div>
            </div>
            <div class="push-action">
              <el-button round type="success" size="mini" style="outline: none"
                         @click="verifyArticle(n,article.articleId, true, article.topicId)">接受</el-button>
              <el-button round type="info" size="mini" style="outline: none" @click="dialogDenyVisible = true,index = n">拒绝</el-button>
            </div>
          </li>
        </ul>
        <el-dialog title="拒绝投稿" :visible.sync="dialogDenyVisible" width="30%">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5}"
            placeholder="（选填）回个简信给投稿者，告知您的拒绝理由，或继续加油什么的..."
            v-model="reason">
          </el-input>
          <div slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialogDenyVisible = false,verifyArticle(index,articles[index].articleId, false, articles[index].topicId)">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AllRequests',
  data () {
    return {
      dialogDenyVisible: false,
      reason: '',
      articles: [],
      index: ''
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      let _this = this
      this.axios.get('/api/message/topic/allRequests', {
        params: {
          'userId': localStorage.getItem('userId')
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data
        }
      })
    },
    verifyArticle (index, articleId, isPassed, topicId) {
      let _this = this
      this.axios.put('/api/message/topic/article', {
        'articleId': articleId,
        'topicId': topicId,
        'isPassed': isPassed,
        'reason': _this.reason
      }).then(function (res) {
        _this.articles.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #333333;
  }
  ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
  }
  ul {
    padding-left: 0;
  }
  img {
    vertical-align: middle;
  }
  .push-top {
    width: 625px;
    z-index: 1;
    min-height: 35px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .push-top .back-to-list {
    position: absolute;
    top: 4px;
    left: 0;
    font-size: 14px;
    color: #969696;
  }
  .note-list li {
    position: relative;
    width: 100%;
    margin: 0 0 15px;
    padding: 15px 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
  }
  .note-list .author {
    margin-bottom: 14px;
    font-size: 13px;
  }
  .note-list .author .avatar, .note-list .author .info {
    display: inline-block;
    vertical-align: middle;
  }
  .note-list .author .avatar {
    margin: 0 5px 0 0;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .avatar {
    width: 30px;
    height: 30px;
    display: block;
    cursor: pointer;
  }
  .note-list .author .info span {
    display: inline-block;
    padding-left: 3px;
    color: #969696;
    vertical-align: middle;
  }
  .note-list .title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
  }
  .note-list .title:hover {
    text-decoration: underline;
  }
  .note-list .title:visited {
    color: #969696;
  }
  .note-list .abstract {
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
    width: 600px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .note-list .meta {
    padding-right: 0!important;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
  }
  .note-list .push-action {
    margin-top: 10px;
  }
  .note-list .push-time {
    margin-left: 10px;
    font-size: 12px;
    color: #969696;
  }
  .note-list .meta a {
    margin-right: 10px;
    color: #b4b4b4;
  }
  .note-list .meta span {
    margin-right: 10px;
    color: #b4b4b4;
  }
  .note-list .meta a:hover {
    color: #787878;
  }
</style>
