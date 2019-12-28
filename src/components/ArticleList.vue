<template>
    <ul>
      <li>
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
            <el-footer>
              <a class="nickname" target="_blank" href="#">你在烦恼什么</a>
              <a class="comment" href="#">
                <i class="el-icon-chat-square"/>999
              </a>
              <span class="icon iconfont el-icon-third-aixin"></span>
            </el-footer>
          </el-container>
          <!--    无图片隐藏 aside      -->
          <el-aside width="150px">
            <el-image
              class="img"
              style="width: 150px; height: 100px"
              :src="url"
              fit="contain"/>
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
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>
<style scoped src="//at.alicdn.com/t/font_657480_o914zy73uf.css"></style>
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
    margin-top: 20px;
  }
  .nickname {
    margin-right: 10px;
    color: #b4b4b4;
    font-size: 12px;
  }
  .comment{
    font-size: 14px;
    font-weight: 400;
    color: #b4b4b4;
  }
</style>
