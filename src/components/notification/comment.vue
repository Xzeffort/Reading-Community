<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px;margin-left: -18px">
      <div>
        <div class="menu">收到的评论</div>
        <ul class="comment-list">
          <li v-for="(message, n) in messages " :key="n">
            <div style="float: left;margin-top: 10px;margin-right: 10px">
              <router-link tag="a" :to="/u/ + message.userId" class="avatar">
                <img :src="message.headUrl">
              </router-link>
            </div>
            <div class="info">
              <router-link tag="a" :to="/u/ + message.userId" class="user">{{message.nickname}}</router-link>
              <span class="comment-slogan">在文章</span>
              <router-link tag="a" :to="/p/ + message.articleId">
                《{{message.title}}》
              </router-link>
              <span class="comment-slogan">中写了一条新评论</span>
              <div class="time">{{message.date}}</div>
            </div>
            <p>{{message.comment}}</p>
            <div class="meta">
              <el-button type="text" class="replyBtn" @click="replyClassicBody(n)">
                <i class="iconfont el-icon-third-pinglun2"></i>回复
              </el-button>
              <el-button type="text" class="replyBtn" @click="$router.push('/p/' + message.articleId)">
                <i class="el-icon-right"></i>查看对话
              </el-button>
            </div>
            <div :ref="`replyClassicBody${n}`" hidden>
              <el-row :gutter="20">
                <el-col :span="24">
                  <div>
                    <el-input
                      class="comment"
                      type="textarea"
                      placeholder="写下你的回复..."
                      :autosize="{ minRows: 5, maxRows: 6}"
                      maxlength="180"
                      show-word-limit
                      v-model="reply">
                    </el-input>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" style="margin-top: 20px">
                <el-col :span="6" :offset="18">
                  <div>
                    <el-button type="danger"
                               @click="postReply(n,message.userId,message.commentId,message.articleId)"
                               round size="small" style="outline: none">发布</el-button>
                    <el-button type="info" round size="small" @click="cancelReplyClassicBody(n)">取消</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </li>
        </ul>
        <el-pagination
          style=" text-align: center"
          background
          :page-size="5"
          @current-change="getMessage"
          layout="prev, pager, next"
          :total="totals">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'comment',
  data () {
    return {
      reply: '',
      messages: [],
      totals: 0,
      totalPages: 1
    }
  },
  created () {
    this.getMessage(1)
  },
  methods: {
    getMessage (page) {
      let _this = this
      this.axios.get('/api/message/comment', {
        params: {
          'userId': localStorage.getItem('userId'),
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.messages = res.data.data.list
          _this.totalPages = res.data.data.totalPages
          _this.totals = res.data.data.totalElements
        }
      })
    },
    postReply (index, toUserId, commentId, articleId) {
      let _this = this
      this.axios.post('/api/reply', {
        'fromUserId': localStorage.getItem('userId'),
        'toUserId': toUserId,
        'articleId': articleId,
        'content': _this.reply,
        'commentId': commentId
      }).then(function (res) {
        if (res.data.code) {
          _this.$message({
            message: '回复成功',
            type: 'success',
            center: true
          })
          _this.$refs[`replyClassicBody${index}`][0].setAttribute('hidden', 'hidden')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    replyClassicBody (e) {
      this.$refs[`replyClassicBody${e}`][0].removeAttribute('hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    },
    cancelReplyClassicBody (e) {
      this.$refs[`replyClassicBody${e}`][0].setAttribute('hidden', 'hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
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
  p {
    margin: 10px 0 0;
    font-size: 15px;
    line-height: 1.7;
  }
  .menu {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  .comment-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .comment-list .avatar {
    display: inline-block;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-top: -10px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .comment-list .info {
    display: inline-block;
    line-height: 1.7;
    width: 535px;
    font-size: 15px;
  }
  .comment-list .info a {
    font-size: 15px;
    color: #3194d0;
  }
  .info .user {
    margin: 0 5px 0 0;
    color: #333 !important;
  }
  .comment-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
  .replyBtn {
    color: #969696;
    outline: none;
  }
  .meta i {
    margin-right: 5px;
  }
</style>
