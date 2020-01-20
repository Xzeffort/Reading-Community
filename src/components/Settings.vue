<template>
  <el-container>
    <el-header>
      <nav-component/>
    </el-header>
    <el-container style="margin:50px auto">
      <el-aside width="280px" class="aside">
        <ul>
          <li>
          <li :class="activeClass === 1 ? 'active':''" @click="activeClass = 1">
            <a href="#/settings/basic">
              <div class="setting-icon"><i class="el-icon-user"></i></div>
              <span>基础设置</span>
            </a>
          </li>
          <li :class="activeClass === 2 ? 'active':''" @click="activeClass = 2">
            <a href="#/settings/blacklist">
              <div class="setting-icon"><i class="iconfont el-icon-third-heimingdan"></i></div>
              <span>黑名单</span>
            </a>
          </li>
        </ul>
      </el-aside>
      <el-container style="margin-left: 40px;">
        <router-view/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Settings',
  components: {
    NavComponent
  },
  data () {
    return {
      activeClass: 1
    }
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
    color: #333333;
  }
  ul {
    padding-left: 0;
  }
  ol, ul {
    margin-top: 0;
    margin-bottom: 10px;
  }
  ul,li {
    list-style: none;
  }
  li {
    line-height: 20px;
  }
  .aside a {
    padding: 10px 15px;
    font-size: 15px;
    display: block;
  }
  .aside .setting-icon {
    margin-right: 15px;
    width: 32px;
    height: 32px;
    text-align: center;
    color: #fff;
    background-color: #a0a0a0;
    border-radius: 4px;
    display: inline-block;
    vertical-align: middle;
  }
  .aside .setting-icon i {
    margin: 8px 0 0 1px;
    font-size: 18px;
    display: block;
  }
  .aside span {
    vertical-align: middle;
  }
  .aside li.active a, .aside li:hover a {
    background-color: #f0f0f0;
    border-radius: 4px;
  }
</style>
