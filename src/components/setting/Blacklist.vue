<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div class="blacklist">
        <div class="title">你可以在用户主页将用户加入你的黑名单。在你黑名单中的用户无法在你文章下评论，无法在其它评论中提到你，无法给你发送简信，自动从你的粉丝列表移除且无法再关注你。</div>
        <ul>
          <li v-for="n in 8" :key="n">
            <a href="#/u/c794c9aee939">奇怪的团子</a>
            <el-button type="text" class="remove">从黑名单中移除</el-button>
          </li>
        </ul>
        <el-pagination
          style="text-align: center"
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Blacklist'
}
</script>

<style scoped>
  ul,li {
    list-style: none;
  }
  ul {
    padding: 0;
  }
  a {
    text-decoration: none;
  }
  .title {
    width: 630px;
    font-size: 12px;
    color: #969696;
  }
  .blacklist li {
    padding: 20px 0;
    font-size: 15px;
    border-bottom: 1px solid #f0f0f0;
  }
  .blacklist li a {
    margin-top: 1px;
    color: #969696;
  }
  .remove {
    float: right;
    outline: none;
    color: #969696;
  }
  .blacklist li a:hover {
    color: #2f2f2f;
  }
  .remove:hover {
    color: #2f2f2f;
  }
</style>
