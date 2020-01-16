<template>
    <el-container>
      <el-header>
        <nav-component/>
      </el-header>
      <el-main style="padding-top:50px">
        <el-row :gutter="20">
          <el-col :span="11" :offset="6">
            <div>
              <img class="tag-banner" src="../assets/collect-note.png" alt="Collect note">
              <ul class="note-list">
                <li v-for="n in 3" :key="n" :ref="`list${n}`">
                  <el-container>
                    <el-container>
                      <el-header style="padding-left: 0">
                        <a class="title" target="_blank" href="#">
                          Vuex 原理{{n}}
                        </a>
                      </el-header>
                      <el-main class="content" style="padding: 0">
                        <p class="abstract">
                          1、Vue.use(Vuex)：将Vuex 应用到Vue中 use是一个自定义插件，这个插件里有一个固定方法install()，这句话的意思是调...
                        </p>
                      </el-main>
                      <el-footer  style="height: 20px; padding-left: 0">
                        <div class="meta">
                          <a class="nickname" target="_blank" href="/u/13e61986defe">Do_Du</a>
                          <a target="_blank" href="/p/6a92cb882e12#comments">
                            <i class="iconfont el-icon-third-pinglun2"/> 0
                          </a>
                          <span><i class="iconfont el-icon-third-aixin"/>0</span>
                          <a class="cancel" @click="deleteBookmarks(n)">取消收藏</a>
                        </div>
                      </el-footer>
                    </el-container>
                    <!--    无图片隐藏 aside      -->
                    <el-aside width="125px;">
                      <a href="#" target="_blank" class="wrap-img">
                        <img class="img" src="../assets/collection-test.png"/>
                      </a>
                    </el-aside>
                  </el-container>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>

<script>
import NavComponent from './common/Nav'

export default {
  name: 'Bookmarks',
  components: {
    NavComponent
  },
  methods: {
    deleteBookmarks (id) {
      this.$refs[`list${id}`][0].remove()
      this.$message({
        message: '取消收藏成功,id' + id,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
  a {
    color: #333;
  }
  ul,li {
    margin: 0;
    padding: 0;
  }
  .tag-banner {
    margin-bottom: 30px;
    width: 100%;
    min-height: 100px;
    background-color: hsla(0,0%,71%,.2);
    border-radius: 6px;
  }
  .note-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .note-list li {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0 2px 20px 0;
    border-bottom: 1px solid #f0f0f0;
    word-wrap: break-word;
  }
  .note-list .wrap-img {
    position: absolute;
    top: 50%;
    margin-top: -60px;
    right: 0;
    width: 125px;
    height: 100px;
  }
  .note-list img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #f0f0f0;
  }
  .note-list .title {
    padding-left: 0;
    font-size: 18px;
    font-weight: 700;
    line-height: 60px;
  }
  .note-list .title:visited {
    color: #969696;
  }
  .note-list .meta {
    padding-right: 0!important;
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
  }
  .note-list .abstract {
    margin: 0 0 8px;
    font-size: 14px;
    line-height: 24px;
    color: #999;
    width: 600px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .note-list .meta a {
    margin-right: 10px;
    color: #b4b4b4;
    text-decoration: none;
  }
  .note-list .meta span {
    margin-right: 10px;
    color: #b4b4b4;
  }
  .note-list .meta i{
    padding-right: 1px;
    padding-top: 1px;
    margin-right: 2px;
  }
  .note-list .cancel {
    display: inline-block;
    cursor: pointer;
  }
  .note-list .meta a:hover {
    color: #787878;
  }
</style>
