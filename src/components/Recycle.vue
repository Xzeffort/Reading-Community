<template>
  <el-row style="height: 100%;">
    <el-col :span="5" style="height: 100%;">
      <div class="aside">
        <div class="_1T8aX"><i class="el-icon-delete-solid"/>回收站({{articles.length}})</div>
        <ul>

          <li v-for="(article,n) in articles" :key="n"  :class="activeClass === n ? 'active':''"
              @mouseover="overDate(n)"
              @mouseleave="leaveDate(n)"
              @click="index(n)">
            <router-link :to="url">
              <h5><i class="el-icon-s-order"/>{{article.title}}</h5>
              <span data-destroy-days-left="35" data-destroy-date="2020-06-24" :ref="`date${n}`">60天后清除</span>
            </router-link>
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :span="19" style="height: 100%;">
      <div style="height: 100%;">
        <router-view :article="article" :articleIndex="articleIndex" @getMessage="getVal"/>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Recycle',
  data () {
    return {
      activeClass: -1,
      articles: [],
      url: '',
      article: '',
      articleIndex: ''
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    index (index) {
      this.activeClass = index
      this.url = '/writer/recycle/' + this.articles[index].id
      this.article = this.articles[index]
      this.articleIndex = index
    },
    getInfo () {
      let _this = this
      this.axios.get('/api/articles/recycle').then(function (res) {
        if (res.data.code) {
          _this.articles = res.data.data
        } else {
          _this.$message.error(res.data.msg)
          _this.$router.push({name: 'signIn'})
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getVal (val) {
      console.log('删除的ID' + val)
      this.articles.splice(val, 1)
    },
    overDate (index) {
      this.$refs[`date${index}`][0].innerHTML = '将于' + this.$refs[`date${index}`][0].dataset.destroyDate + '后清除'
    },
    leaveDate (index) {
      this.$refs[`date${index}`][0].innerHTML = this.$refs[`date${index}`][0].dataset.destroyDaysLeft + '天后清除'
    }
  }
}
</script>

<style scoped>
  ul, li {
    list-style: none;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
  .aside {
    position: fixed;
    top: 0;
    left: 0;
    width: 20.6%;
    height: 100%;
    border-right: 1px solid #d9d9d9;
    overflow-y: auto;
  }
  .aside ul li {
    border-left: 3px solid transparent;
  }
  .aside ul li:hover {
    background-color: #e6e6e6;
  }
  .aside ul li.active {
    background-color: #f2f2f2;
    border-color: #ec7259;
  }
  ._1T8aX {
    padding: 5px 10px;
    margin: 0;
    border-bottom: 1px solid #d9d9d9;
    font-size: 20px;
    font-weight: 400;
    color: rgba(0,0,0,.65);
  }
  ._1T8aX i {
    margin-right: 4px;
  }
  .aside ul li a {
    display: block;
    position: relative;
    padding: 15px 10px;
    font-size: 12px;
    line-height: 20px;
    border-bottom: 1px solid #d9d9d9;
  }
  .aside ul li a h5 {
    width: 180px;
    margin: 0;
    color: #333;
    font-weight: 400;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }
  .aside ul li a span {
    position: absolute;
    top: 12px;
    right: 10px;
    display: block;
    color: #b3b3b3;
  }
</style>
