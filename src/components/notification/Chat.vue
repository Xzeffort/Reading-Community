<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">全部简信</div>
        <ul class="jianxin-list">
          <li v-for="n in 5" :key="n" :ref="`list${n}`">
            <div class="pull-right">
              <span class="time">14:32</span>
              <el-dropdown>
                <span class="el-dropdown-link">
                   <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="removeList(n)">删除会话</el-dropdown-item>
                  <el-dropdown-item @click.native="dialogBlack = true">加入黑名单</el-dropdown-item>
                  <el-dropdown-item @click.native="dialogFormVisible = true">举报用户</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <a href="/u/c794c9aee939" target="_blank" class="avatar">
              <el-badge :value="12" class="item">
                <img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp">
              </el-badge>
            </a>
            <a href="/u/c794c9aee939" target="_blank" class="name">奇怪的团子{{n}}</a>
            <a href="#/notifications/chats/1300017468" class="wrap"><p>22</p></a>
          </li>
        </ul>
        <el-pagination
          style=" text-align: center"
          background
          layout="prev, pager, next"
          :total="500">
        </el-pagination>
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
  name: 'Chat',
  data () {
    return {
      dialogBlack: false,
      dialogFormVisible: false,
      radio: '',
      textarea: ''
    }
  },
  methods: {
    removeList (id) {
      this.$refs[`list${id}`][0].remove()
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    cursor: pointer;
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
  .menu {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  .avatar {
    width: 24px;
    height: 24px;
    display: block;
    cursor: pointer;
  }
  .jianxin-list li {
    position: relative;
    border-top: 1px solid #f0f0f0;
  }
  .jianxin-list .avatar {
    float: left;
    margin: 20px 10px 20px 20px;
    width: 48px;
    height: 48px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .jianxin-list .name {
    position: absolute;
    top: 25px;
    font-size: 15px;
  }
  .jianxin-list .wrap {
    display: block;
    padding: 20px 20px 20px 0;
    min-height: 88px;
  }
  .jianxin-list p {
    margin: 28px 0 0;
    font-size: 12px;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .jianxin-list .pull-right .time {
    color: #9b9b9b;
  }
  .pull-right {
    float: right!important;
  }
  .jianxin-list .pull-right {
    margin: 20px 20px 0 0;
    font-size: 13px;
  }
</style>
