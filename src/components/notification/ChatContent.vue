<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div class="chat-top">
        <a href="#/notifications/chats" class="back-to-list active"><i class="el-icon-back"></i> 返回简信列表</a>
        <b>
          与
          <a href="/u/c794c9aee939" target="_blank">奇怪的团子</a>
          的对话
        </b>
        <el-dropdown style="float: right">
          <span class="el-dropdown-link">
             <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogBlack = true">加入黑名单</el-dropdown-item>
            <el-dropdown-item @click.native="dialogFormVisible = true">举报用户</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="message-show">
        <ul style="margin-top: 10px; height: 400px; overflow: auto">
          <li class="message-l" v-for="n in 10" :key="n">
            <a href="/u/6d71c8ef87ab" class="avatar">
              <img src="https://upload.jianshu.io/users/upload_avatars/5197898/418540bf-dbe8-4c86-82e7-638774a9d9c5?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp">
            </a>
            <div>
              <span class="content">你在烦恼什么{{n}}</span>
            </div>
            <span class="time">14:17</span>
          </li>
          <li class="message-r">
            <a href="/u/c794c9aee939" class="avatar"><img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp"></a>
            <div><span class="content">你是 啊的哈空间？</span></div>
            <span class="time">15:02</span>
          </li>
        </ul>
        <div>
          <el-row :gutter="20" class="write-message">
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
            <el-col :span="2" :offset="21">
              <div>
                <el-button type="success" round size="small" style="outline: none">发送</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-dialog
        title="加入黑名单"
        :visible.sync="dialogBlack"
        width="30%">
        <span>确认将该用户加入黑名单吗？在你黑名单中的用户无法在你文章下评论，无法在其它评论中提到你，无法给你发送简信，自动从你的粉丝列表移除且无法再关注你。</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogBlack = false">取 消</el-button>
          <el-button type="danger" @click="dialogBlack = false">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="举报文章" :visible.sync="dialogFormVisible" width="500px">
        <el-radio-group v-model="radio">
          <el-radio :label="3">广告及垃圾信息</el-radio>
          <el-radio :label="6">抄袭或未授权转载</el-radio>
          <el-radio :label="9">其它</el-radio>
        </el-radio-group>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 5}"
          placeholder="写下举报的详情情况（选填）"
          v-model="textarea">
        </el-input>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" round>取 消</el-button>
          <el-button type="success" @click="report" round>确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ChatContent',
  data () {
    return {
      dialogBlack: false,
      dialogFormVisible: false,
      radio: '',
      textarea: ''
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #333;
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
  .chat-top{
    position: fixed;
    width: 625px;
    z-index: 1;
    min-height: 35px;
    margin-bottom: 20px;
    padding-bottom: 10px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }
  .back-to-list {
    position: absolute;
    top: 4px;
    left: 0;
    font-size: 14px;
    color: #969696;
  }
  .chat-top b{
    display: inline-block;
    padding: 0 140px 0 160px;
    font-size: 14px;
  }
  .message-show {
    padding-top: 46px;
  }
  .message-show li {
    margin-bottom: 15px;
    overflow: hidden;
  }
  .message-show .message-l .avatar {
    float: left;
  }
  .message-show .avatar {
    width: 40px;
    height: 40px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .message-show li div {
    position: relative;
    display: block;
    margin: 4px 56px 0;
    min-height: 39px;
  }
  .message-show .message-l div .content {
    min-height: 39px;
    background-color: #e7f1fc;
    border-color: #bad0e9;
    border-radius: 0 4px 4px 4px;
  }
  .message-show li div .content {
    position: relative;
    padding: 8px 12px;
    font-size: 14px;
    border: 1px solid;
    word-break: break-word!important;
    word-break: break-all;
    line-height: 1.5;
    display: table-cell;
  }
  .message-show .message-l .time {
    margin-left: 56px;
  }
  .message-show .time {
    margin-top: 2px;
    font-size: 12px;
    color: #d9d9d9;
  }
  .message-r .avatar {
    float: right;
  }
  .message-show .message-r div .content {
    float: right;
    min-height: 39px;
    background-color: #eee;
    border-color: #d9d9d9;
    border-radius: 4px 0 4px 4px;
  }
  .message-show .message-r .time {
    float: right;
    margin-right: 56px;
  }
</style>
