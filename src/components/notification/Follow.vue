<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">全部关注</div>
        <ul class="follow-list">
          <li>
           <div style="float: left;margin-top: 10px;margin-right: 10px">
             <a href="#/u/c794c9aee939" class="avatar">
               <img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp">
             </a>
           </div>
            <div class="info">
              <a href="/u/c794c9aee939" class="user">奇怪的团子</a>
              <span>关注了你</span>
              <div class="time">2020.01.17 12:23</div>
            </div>
            <el-button type="success" round size="medium" class="followBtn" hidden>关注</el-button>
            <el-button type="info" round size="medium" class="followBtn">已关注</el-button>
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
  name: 'Follow'
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
  .menu {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  .follow-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .follow-list .avatar {
    display: inline-block;
    margin-right: 5px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    margin-top: -10px;
  }
  .follow-list .info {
    max-width: 420px;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .follow-list .info {
    display: inline-block;
    width: 500px;
    line-height: 1.7;
  }
  .follow-list .info a {
    font-size: 15px;
    color: #3194d0;
  }
  .info .user {
    margin: 0 5px 0 0;
    color: #333 !important;
  }
  .follow-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
  .follow-list .followBtn {
    float: right;
    margin-top: 5px;
    outline: none;
  }
</style>
