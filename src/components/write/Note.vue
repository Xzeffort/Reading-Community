<template>
  <div>
    <div style="padding-top: 20px;height: 80px;position: relative">
      <input type="text" class="title" value="java上传照片于七牛云，解决使用非静态图片"/>
      <p class="status">已保存</p>
    </div>
<!--    <editor/>-->
  </div>
</template>

<script>
import editor from '@/components/wangEnduit'
export default {
  name: 'Note',
  components: {
    editor
  }
}
</script>

<style scoped>
  .title {
    flex-shrink: 0;
    width: 100%;
    padding: 0 80px 10px 40px;
    margin-bottom: 0;
    border: none;
    font-size: 30px;
    font-weight: 400;
    line-height: 30px;
    -webkit-box-shadow: none;
    box-shadow: none;
    color: #595959;
    background-color: transparent;
    outline: none;
    border-radius: 0;
    overflow: hidden;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .status {
    position: absolute;
    right: 5px;
    top: 2px;
    font-size: 18px;
    color: rgba(0,0,0,.65);
  }
</style>
