<template>
  <ul class="user-list">
    <li v-for="n in 5" :key="n">
      <a href="#/u/b90070931f39" target="_blank" class="avatar-collection">
        <img src="../../assets/avatar-notebook-default.png">
      </a>
      <div class="info">
        <a href="#/c/5AUzod" target="_blank" class="name">
          旅行·在路上
        </a>
        <div class="meta">
                  <span>
                    0 篇文章，0 人关注
                  </span>
        </div>
      </div>
      <el-button type="success" round class="follow" :ref="`followNotebookBtn${n}`"
                 @click="followNotebook(n)" hidden>
        <i class="el-icon-plus"/><span>关注</span></el-button>
      <el-button type="info" round class="follow"  :ref="`unfollowNotebookBtn${n}`"
                 @click="unfollowNotebook(n)"
                 @mouseover.native="overFollowNotebook(n)"
                 @mouseleave.native="leaveFollowNotebook(n)">
        <i class="el-icon-check"/><span>已关注</span></el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'FollowCollection',
  methods: {
    followCollection (index) {
      this.$refs[`followCollectionBtn${index}`][0].$el.setAttribute('hidden', 'hidden')
      this.$refs[`unfollowCollectionBtn${index}`][0].$el.removeAttribute('hidden')
    },
    unfollowCollection (index) {
      this.$refs[`unfollowCollectionBtn${index}`][0].$el.setAttribute('hidden', 'hidden')
      this.$refs[`followCollectionBtn${index}`][0].$el.removeAttribute('hidden')
    },
    overFollowCollection (e) {
      this.$refs[`unfollowCollectionBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`unfollowCollectionBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
    },
    leaveFollowCollection (e) {
      this.$refs[`unfollowCollectionBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`unfollowCollectionBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    },
    followNotebook (index) {
      this.$refs[`followNotebookBtn${index}`][0].$el.setAttribute('hidden', 'hidden')
      this.$refs[`unfollowNotebookBtn${index}`][0].$el.removeAttribute('hidden')
    },
    unfollowNotebook (index) {
      this.$refs[`unfollowNotebookBtn${index}`][0].$el.setAttribute('hidden', 'hidden')
      this.$refs[`followNotebookBtn${index}`][0].$el.removeAttribute('hidden')
    },
    overFollowNotebook (e) {
      this.$refs[`unfollowNotebookBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`unfollowNotebookBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
    },
    leaveFollowNotebook (e) {
      this.$refs[`unfollowNotebookBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`unfollowNotebookBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    }
  }
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
  .list li a {
    display: inline-block;
  }
  .avatar-collection {
    margin-right: 5px;
    width: 32px;
    height: 32px;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
  }
  .user-list li {
    padding-bottom: 20px;
    margin-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    border-bottom: 1px solid #f0f0f0;
    line-height: normal;
  }
  .user-list .avatar-collection {
    width: 52px;
    height: 52px;
    margin-right: 8px;
    vertical-align: middle;
    display: inline-block;
  }
  .user-list .info {
    vertical-align: middle;
    display: inline-block;
    max-width: 450px;
  }
  .user-list .name {
    font-size: 15px;
    font-weight: 700;
    color: #333;
  }
  .user-list .meta {
    padding-top: 2px;
    font-size: 0;
    color: #969696;
  }
  .user-list .meta span {
    margin-right: 10px;
    padding-right: 10px;
    font-size: 12px;
    border-right: 1px solid #969696;
  }
  .user-list .meta span:last-child {
    border: none;
  }
  .user-list .follow {
    float: right;
    margin-top: 7px;
    outline: none;
  }
</style>
