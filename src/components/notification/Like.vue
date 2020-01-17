<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">收到的喜欢和赞</div>
        <ul class="like-list">
          <li>
           <div style="float: left;margin-top: 10px;margin-right: 10px">
             <a href="#/u/c794c9aee939" class="avatar">
               <img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp">
             </a>
           </div>
            <div class="info">
              <a href="/u/c794c9aee939" class="user">奇怪的团子</a>
              <span>赞你的评论</span>
              <a href="/p/342a7eba6e42" class="middle">不错</a>
              <div class="time">2020.01.17 12:23</div>
            </div>
          </li>
          <li>
            <div style="float: left;margin-top: 10px;margin-right: 10px">
              <a href="#/u/c794c9aee939" class="avatar">
                <img src="https://upload.jianshu.io/users/upload_avatars/20911150/66b9433f-d699-4a37-aeb5-3f560fca98c7?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120/format/webp">
              </a>
            </div>
            <div class="info"><a href="/u/b3d3c611e580" class="user">似醉非醉一笑置之</a> <span>喜欢了你的文章</span> <a href="/p/342a7eba6e42">《java上传照片于七牛云，解决使用非静态图片》</a> <div class="time">2020.01.06 08:05</div></div>
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
  name: 'Like'
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
  .like-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .like-list .avatar {
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
  .like-list .info {
    display: inline-block;
    width: 535px;
    line-height: 1.7;
  }
  .like-list .info a {
    font-size: 15px;
    color: #3194d0;
  }
  .info .user {
    margin: 0 5px 0 0;
    color: #333 !important;
  }
  .info .middle {
    margin: 0 5px;
  }
  .like-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
</style>
