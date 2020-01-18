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
          <li>
            <a href="#/notifications/collections/565a0de16ee1/submissions" class="wrap">
              <div class="avatar-collection">
                <el-badge :value="12" class="item">
                  <img src="https://upload.jianshu.io/collections/images/1849232/STF%60KG3D__BR%29VKEG__L__I.png?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp">
                </el-badge>
              </div>
              <div class="name">
                LPL
                <div>
                  有新投稿《2020-01-18 dasd》
                </div>
              </div>
            </a>
          </li>
          <li>
            <a href="#/notifications/collections/565a0de16ee1/submissions" class="wrap">
              <div class="avatar-collection">
                <el-badge :value="12" class="item">
                  <img src="https://upload.jianshu.io/collections/images/1849232/STF%60KG3D__BR%29VKEG__L__I.png?imageMogr2/auto-orient/strip|imageView2/1/w/144/h/144/format/webp">
                </el-badge>
              </div>
              <div class="name">
                LPL
                <div>
                  有新投稿《2020-01-18 dasd》
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Request'
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
