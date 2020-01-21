<template>
  <div id="list-container">
    <ul class="user-list">
      <li v-for="n in 5" :key="n">
        <a href="" class="avatar">
          <img src="https://upload.jianshu.io/users/upload_avatars/7622636/d4c6cc80-edfd-44fb-986a-8ef869df8161?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180" alt="180">
        </a>
        <div class="info">
          <a class="name" href="#/u/c794c9aee939">你在烦恼什么</a>
          <div class="meta">
            <span>关注 1</span><span>粉丝 1</span><span>文章 2</span>
          </div>
          <div class="meta">
            写了 49 字，获得了 0 个喜欢
          </div>
        </div>
        <el-button type="success" round class="followBtn" hidden
                   :ref="`followBtn${n}`"><i class="el-icon-plus"></i><span>关注</span></el-button>
        <el-button type="info" round class="followBtn followed"
                   :ref="`unfollowBtn${n}`"
                   @mouseover.native="overFollow(n)"
                   @mouseleave.native="leaveFollow(n)"><i class="el-icon-check"></i><span>已关注</span></el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Followers',
  methods: {
    overFollow (e) {
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
    },
    leaveFollow (e) {
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`unfollowBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin-top: 20px;
  }
  .user-list li {
    padding-bottom: 20px;
    padding-right: 20px;
    padding-left: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #f0f0f0;
    line-height: normal;
  }
  .user-list .avatar{
    width: 52px;
    height: 52px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .user-list .name {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .user-list .info {
    vertical-align: middle;
    display: inline-block;
    max-width: 450px;
  }
  .user-list .meta {
    padding-top: 2px;
    font-size: 12px;
    color: #969696;
  }
  .user-list .meta span {
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px solid #969696;
  }
  .user-list .meta span:last-child {
    border: none;
  }
  .user-list .followBtn {
    float: right;
    margin-top: 10px;
    outline: none;
  }
</style>
