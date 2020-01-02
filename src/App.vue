<template>
  <div id="app">
    <router-view/>
    <template>
      <el-backtop target="#app">
        <div
          style="{
        height: 100%;
        width: 100%;
        background-color: #ffffff;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }"
        >
          <i class="el-icon-arrow-up"/>
        </div>
      </el-backtop>
    </template>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    font-family: "Source Sans Pro","Source Han Sans SC","Noto Sans CJK SC","HanHei SC",-apple-system,BlinkMacSystemFont,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji";
  }
  #app {
    height: 100vh;
    overflow-x: hidden;
  }
</style>
