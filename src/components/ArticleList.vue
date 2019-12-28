<template>
    <ul>
  <li class="list" v-for="n in 5" v-bind:key="n">
    <el-container>
      <el-container>
        <el-header>
          <a class="title" target="_blank" href="#">
            《诛仙》口碑遭遇滑铁卢，虽不是经典，但绝不是烂片
          </a>
        </el-header>
        <el-main>
          <p class="abstract">
            《诛仙》是我高中时代就很喜欢的小说，记得那时候废寝忘食地追书。书中陆雪琪和碧瑶留给我留下了深刻的印象，男主在两个女子之间辗转反侧，情难独钟。 武...
          </p>
        </el-main>
        <el-footer  style="height: 30px">
          <a class="nickname" target="_blank" href="#">你在烦恼什么{{n}}</a>
          <a class="comment" href="#">
            <i class="iconfont el-icon-third-pinglun2"/>999
          </a>
          <span class="like"><i class="iconfont el-icon-third-aixin"/>999</span>
        </el-footer>
      </el-container>
      <!--    无图片隐藏 aside      -->
      <el-aside width="200px;">
        <img class="img" :src="url"/>
      </el-aside>
    </el-container>
  </li>
</ul>
</template>

<script>
export default {
  name: 'ArticleList',
  data () {
    return {
      fit: 'contain',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>
<style scoped>
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  a {
    color: #333333;
  }
  .el-header{
    padding: 0;
  }
  .el-main{
    padding: 0 20px 0 0;
  }
  .list{
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 15px;
  }
  .title:visited {
    color: #969696;
  }
  .title {
    font-size: 18px;
    font-weight: 700;
    line-height: 60px;
  }
  .abstract {
    font-size: 14px;
    color: #999999;
  }
  .img {
    margin-top: 30px;
    width: 150px;
    height: 100px;
    /*object-fit: contain;*/
    border-radius: 4px;
  }
  .nickname {
    margin-right: 10px;
    color: #b4b4b4;
    font-size: 13px;
    text-decoration: none;
  }
  .nickname:hover{
    color: #787878;
  }
  .comment{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 10px;
    text-decoration: none;
  }
  .comment:hover{
    color: #787878;
  }
  .like{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
    margin-right: 10px;
  }
</style>
