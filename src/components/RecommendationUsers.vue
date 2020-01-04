<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-main class="container">
      <el-container>
        <el-header style="height: 120px">
          <img class="recommend-banner" src="../assets/recommend-author.png"/>
        </el-header>
        <el-main>
          <el-row :gutter="30">
            <el-col :span="8" v-for="n in 10" :key="n">
              <div class="wrap">
                <a class="top" target="_blank" href="#/u/ef4f2422125f">
                  <el-avatar  class="avatar" :size="80" src="https://upload.jianshu.io/users/upload_avatars/14715425/e0668349-8c75-43db-8a9d-c388e5f00d0d.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/180/h/180" alt="180"></el-avatar>
                  <h4 class="name">
                    你在烦恼什么{{n}}
                  </h4>
                  <p class="description">愿意为你解答关于简书钻的一切疑问~书钻的问~书书钻的一的一切疑</p>
                </a>
                <el-button v-if="!isFollowed" round type="success" class="off follow user-follow-button">
                  <i class="el-icon-plus"/>关注
                </el-button>
                <el-button v-if="isFollowed" round type="info" class="on followed user-follow-button"
                           @mouseover.native="overFollow(n)"
                           @mouseleave.native="leaveFollow(n)"
                           :ref="`followBtn${n}`">
                  <i class="el-icon-check"/><span>已关注</span>
                </el-button>
                <hr>
                <div class="meta">最近更新</div>
                <div class="recent-update">
                  <a class="new" target="_blank" href="/p/73b0b68f86aa">卢子觅，再不听话，我就给你关家里！| 卢家小妞成长日记（三）</a>
                  <a class="new" target="_blank" href="/p/d8baebb36027">2020，我终于接受这些痛彻心扉的快乐</a>
                  <a class="new" target="_blank" href="/p/b3ee931afca3">发誓不靠父母的顶级富二代，为什么还是打脸了？</a>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="10" :offset="7"> <el-button class="more_button" type="info" round>加载更多</el-button></el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-main>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'RecommendationUsers',
  components: {
    NavComponent
  },
  data () {
    return {
      isFollowed: false
    }
  },
  methods: {
    overFollow (e) {
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '取消关注'
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-close')
      this.buttonName = '取消关注'
    },
    leaveFollow (e) {
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.firstElementChild.setAttribute('class', 'el-icon-check')
      this.$refs[`followBtn${e}`][0].$el.firstElementChild.lastElementChild.innerHTML = '已关注'
    }
  }
}
</script>

<style scoped>
  .wrap .top  {
    text-decoration: none;
    color: #333;
  }
  .container {
    width: 1100px;
    padding: 40px 0 50px;
    text-align: center;
  }
  .recommend-banner {
    width: 100%;
    min-height: 100px;
    background-color: hsla(0,0%,71%,.2);
    border-radius: 6px;
  }
  .wrap {
    height: 320px;
    margin-top: 50px;
    padding: 0 20px;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    background-color: hsla(0,0%,71%,.1);
    transition: .2s ease;
    -webkit-transition: .2s ease;
    -moz-transition: .2s ease;
    -o-transition: .2s ease;
    -ms-transition: .2s ease;
  }
  .wrap:hover {
     box-shadow: 0 5px 20px rgba(0,0,0,.1);
  }
  .avatar {
    margin: -40px 0 10px;
    display: inline-block;
    border: 1px solid #ddd;
    background-color: #fff;
  }
  .wrap h4 {
    font-size: 21px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wrap .description {
    margin: 0 auto 10px;
    max-width: 180px;
    min-height: 50px;
    font-size: 13px;
    line-height: 25px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .follow {
    font-size: 18px;
    outline: none;
  }
  .meta {
    float: left;
    margin-top: -29px;
    padding-right: 10px;
    font-size: 14px;
    color: #969696;
    background-color: #f8f8f8;
  }
  .recent-update {
    min-height: 75px;
  }
  .wrap .new {
    color: #333;
    font-size: 13px;
    line-height: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
  .more_button {
    margin-top: 30px;
    width: 100%;
    height: 40px;
    background-color: #a5a5a5;
    font-size: 15px;
    outline: none;
    padding: 10px 0;
    border-radius: 20px;
    border: none;
  }
</style>
