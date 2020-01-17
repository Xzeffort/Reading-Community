<template>
  <el-row>
    <el-col :span="24" style="min-width: 630px">
      <div>
        <div class="menu">其他提醒</div>
        <ul class="other-list">
          <li v-for="n in 5 " :key="n">
            <div class="info">
              <span>今天是你加入简书的第2年，感谢你的陪伴，快来回顾你与简书的故事吧，
                <a target="_blank" href="http://www.jianshu.com/mobile/u/6d71c8ef87ab/anniversary?notify_id=43353370">点击查看</a>
              </span>
              <div class="time">2020.01.17 12:23</div>
            </div>
          </li>
        </ul>
        <el-pagination
          style=" text-align: center"
          background
          layout="prev, pager, next"
          :total="500">
        </el-pagination>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Others'
}
</script>

<style scoped>
  a {
    text-decoration: none;
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
  .other-list li {
    padding: 20px;
    border-top: 1px solid #f0f0f0;
  }
  .avatar img {
    width: 100%;
    height: 100%;
    border: 1px solid #ddd;
    border-radius: 50%;
  }
  .other-list .info {
    display: inline-block;
    line-height: 1.7;
    width: 535px;
    font-size: 15px;
  }
  .other-list .info a {
    font-size: 14px;
    color: #3194d0;
  }
  .other-list .time {
    margin-top: 2px;
    font-size: 12px;
    color: #969696;
    line-height: normal;
  }
</style>
