<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px;margin-left: -18px">
      <div>
        <div class="menu">收到的评论</div>
        <ul class="comment-list">
          <li v-for="n in 5 " :key="n">
            <div style="float: left;margin-top: 10px;margin-right: 10px">
              <a href="#/u/c794c9aee939" class="avatar">
                <img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp">
              </a>
            </div>
            <div class="info">
              <a href="/u/c794c9aee939" class="user">奇怪的团子{{n}}</a>
              <span class="comment-slogan">在文章</span>
              <a href="/p/342a7eba6e42">《java上传照片于七牛云，解决使用非静态图片》</a>
              <span class="comment-slogan">中写了一条新评论</span>
              <div class="time">2020.01.17 12:23</div>
            </div>
            <p>哈哈哈哈</p>
            <div class="meta">
              <el-button type="text" class="replyBtn" @click="replyClassicBody(n)">
                <i class="iconfont el-icon-third-pinglun2"></i>回复
              </el-button>
              <el-button type="text" class="replyBtn">
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
                    <el-button type="danger" round size="small" style="outline: none">发布</el-button>
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
          layout="prev, pager, next"
          :total="500">
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
      reply: ''
    }
  },
  methods: {
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
