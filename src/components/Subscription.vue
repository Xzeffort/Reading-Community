<template>
  <el-container>
    <el-header>
      <nav-component :active="true"/>
    </el-header>
    <el-container style="margin:50px auto">
      <el-aside width="280px" style="overflow: auto;height: 690px;">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{dropName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="全部关注">全部关注</el-dropdown-item>
            <el-dropdown-item command="只看作者">只看作者</el-dropdown-item>
            <el-dropdown-item command="只看专题">只看专题</el-dropdown-item>
            <el-dropdown-item command="只看文集">只看文集</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <ul class="subscription-list">
          <li @click="show = true,activeClass=-1,$router.push('/subscription')"   :class="activeClass === -1 ? 'active':''">
            <a class="wrap">
              <div class="avatar">
                <img src="../assets/jianyouquan.png" style="border: none;">
              </div>
              <div class="name">简友圈</div>
            </a>
          </li>
          <li v-for="n in 3" :key="n" @click="change(n)" :class="activeClass === n ? 'active':''" >
            <a class="wrap">
              <div class="avatar">
                <img src="../assets/jianyouquan.png" style="border: none;">
              </div>
              <div class="name">{{types[n % 3]}}</div>
            </a>
          </li>
        </ul>
      </el-aside>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Subscription',
  components: {
    NavComponent
  },
  data () {
    return {
      dropName: '全部关注',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      show: false,
      types: ['user', 'collection', 'notebook'],
      activeClass: -1
    }
  },
  methods: {
    handleCommand (command) {
      this.$message('click on item ' + command)
      this.dropName = command
    },
    change (index) {
      this.activeClass = index
      if (index === 1) {
        this.$router.push('/subscription/123/collection')
      } else if (index === 2) {
        this.$router.push('/subscription/123/notebook')
      } else {
        this.$router.push('/subscription/123/user')
      }
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
