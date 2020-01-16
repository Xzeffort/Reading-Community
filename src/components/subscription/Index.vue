<template>
  <div>
    <ul class="note-list">
      <li>
        <el-container>
          <el-container>
            <el-header height="24px">
              <div class="author"><a href="/u/4b9ff86a7af4" target="_blank" class="avatar"><img src="https://upload.jianshu.io/users/upload_avatars/1211570/a02b7997-3ccb-4857-9e95-9fbd9deca9ee.png?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp"></a> <div class="info"><a href="/u/4b9ff86a7af4" target="_blank" class="nickname">Sir电影</a> <span>发表了文章 · 13分钟前</span></div></div>
            </el-header>
            <el-main class="content">
              <a href="/p/7309728cb463" target="_blank" class="title">现在开始，她又要做回全民偶像</a>
              <p class="abstract">一代人即将沸腾。 Sir已经感受到前奏的炽热。 来自一段怼上脸的质问： 咱们这场打得这么难堪 您考虑过换个战术吗？ 来自一段撕破脸的逼...</p>
            </el-main>
            <el-footer  style="height: 30px">
              <a class="comment" href="#" target="_blank">
                <i class="iconfont el-icon-third-pinglun2"/>999
              </a>
              <span class="like"><i class="iconfont el-icon-third-aixin"/>999</span>
            </el-footer>
          </el-container>
          <!--    无图片隐藏 aside      -->
          <el-aside width="200px;" style="min-width: 200px">
            <a href="#" target="_blank">
              <img class="img" :src="url"/>
            </a>
          </el-aside>
        </el-container>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style scoped>
  li, ul {
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #404040;
  }
  img {
    vertical-align: middle;
  }
  .content {
    padding-bottom: 0;
  }
  .subscription-list {
    margin-top: 7px;
    list-style: none;
    border-top: 1px solid #f0f0f0;
  }
  .wrap {
    padding: 10px 13px;
    display: block;
  }
  .avatar{
    width: 45px;
    height: 45px;
    margin-right: 4px;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .name {
    font-size: 16px;
    vertical-align: middle;
    display: inline-block;
    max-width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  li:hover .wrap {
    background-color: #f0f0f0;
    border-radius: 4px 0 0 4px;
  }
  .active {
    background-color: #f0f0f0;
    border-radius: 4px 0 0 4px;
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
    height: 24px;
    margin-bottom: 14px;
    font-size: 14px;
  }
  .note-list .author .info .nickname {
    vertical-align: middle;
  }
  .note-list .author .info span {
    display: inline-block;
    padding-left: 3px;
    color: #969696;
    vertical-align: middle;
  }
  .note-list .author .info {
    display: inline-block;
    vertical-align: middle;
  }
  .note-list .avatar {
    width: 24px;
    height: 24px;
  }
  .note-list .author img {
    width: 24px;
    height: 24px;
  }
  .note-list .title {
    margin: -7px 0 4px;
    display: inherit;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
  }
  .note-list .title:hover {
    text-decoration: underline;
  }
  .note-list .abstract {
    width: 500px;
    margin: 0 0 8px;
    font-size: 13px;
    line-height: 24px;
    color: #999;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .note-list .img{
    margin-top: 30px;
    width: 150px;
    height: 100px;
    /*object-fit: contain;*/
    border-radius: 4px;
  }
  .comment, .like{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 5px;
    text-decoration: none;
  }
</style>
