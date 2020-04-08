<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">全部投稿请求</div>
        <ul class="push-list">
          <li>
            <a href="#/notifications/allRequests" class="wrap">
              <div class="all-push">
                <i class="el-icon-upload2"></i>
              </div>
              <div class="name">全部未处理请求</div>
            </a>
          </li>
          <li v-for="(topic, n) in topics" :key="n">
            <router-link tag="a" :to="'/notifications/collections/' + topic.topicId +'/submissions?name='+ topic.name + ''" class="wrap">
              <div class="avatar-collection">
                <el-badge :value="topic.unSolve" class="item">
                  <img :src="topic.headUrl">
                </el-badge>
              </div>
              <div class="name">
                {{topic.name}}
                <div v-show="topic.unSolve">
                  有新投稿!!!
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Request',
  data () {
    return {
      topics: []
    }
  },
  created () {
    this.getMessage()
  },
  methods: {
    getMessage () {
      let _this = this
      this.axios.get('/api/message/topic', {
        params: {
          'userId': localStorage.getItem('userId')
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.topics = res.data.data
        }
      })
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #333;
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
  .push-list .wrap {
    padding: 20px;
    display: block;
  }
  .push-list .all-push {
    position: relative;
    margin-right: 10px;
    width: 48px;
    height: 48px;
    text-align: center;
    border: 1px solid #f4f4f4;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
  }
  .push-list .all-push i {
    margin-top: 12px;
    font-size: 24px;
    color: #ea6f5a;
  }
  .push-list .name {
    max-width: 500px;
    font-size: 15px;
    vertical-align: middle;
    display: inline-block;
    margin-left: 10px;
  }
  .push-list li {
    border-top: 1px solid #f0f0f0;
  }
  .push-list .avatar-collection {
    position: relative;
    margin-right: 10px;
    width: 48px;
    height: 48px;
    display: inline-block;
  }
  .avatar-collection img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 10%;
  }
  .push-list .name {
    max-width: 500px;
    font-size: 15px;
    vertical-align: middle;
    display: inline-block;
  }
  .push-list .name div {
    font-size: 12px;
    color: #969696;
  }
</style>
