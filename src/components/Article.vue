<template>
  <el-container style="background: #f9f9f9">
    <el-header>
      <nav-component/>
    </el-header>
    <el-container class="container">
      <el-container>
        <el-main style="padding: 0">
          <div class="content" v-if="articleInfo.article != undefined">
            <h1 class="title">{{articleInfo.article.title}}</h1>
            <div class="userInfo">
              <el-avatar :size="48" :src="articleInfo.headUrl"></el-avatar>
              <div style="margin-left: 8px">
              <span>
                <router-link tag="a" class="nickname" :to="/u/+articleInfo.userId"  target="_blank">{{articleInfo.nickname}}</router-link>
              </span>
                <el-button v-show="!isMyself" v-if="!articleInfo.isFollowed" type="danger" size="mini" round class="followBtn off"
                           @click="follow(1)" ref="followBtn1">关注</el-button>
                <el-button v-show="!isMyself" v-else type="danger" size="mini" round class="followBtn on"
                           @click="follow(1)" ref="followBtn1"
                           @mouseover.native="overFollow(1)"
                           @mouseleave.native="leaveFollow(1)">已关注</el-button>
                <div style="margin-top: 4px;color: #969696;font-size: 14px">
                  <time>{{articleInfo.article.createdDate}}</time>
                  <span>字数 {{articleInfo.article.words}}</span>
                  <span>阅读 {{articleInfo.article.clicks}}</span>
                </div>
              </div>
            </div>
            <div class="article" v-html="articleInfo.article.content"></div>
            <div class="footer">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-button v-if="articleInfo.isLiked" class="likeBtn"
                             style="background: #ec7259; color: #ffffff" circle ref="likeBtn" @click="like">
                    <i class="iconfont el-icon-third-dianzan3"/>
                  </el-button>
                  <el-button v-else class="likeBtn" circle ref="likeBtn" @click="like">
                    <i class="iconfont el-icon-third-dianzan3"/>
                  </el-button>
                  <el-button class="likeCount" type="text"
                             @click="getLikeUsers(1)">{{articleInfo.article.likes}}人点赞<i class="el-icon-arrow-right"/></el-button>
                </el-col>
                <el-col :span="5" :offset="12">
                  <router-link tag="a" :to="/nb/+articleInfo.nbId" target="_blank" class="notebook"><i class="el-icon-s-management"/>{{articleInfo.notebook}}</router-link>
                  <el-dropdown>
                  <span class="el-dropdown-link">
                       <el-button class="more" icon="el-icon-more" circle></el-button>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="dialogCollectionVisible = true">收入专题</el-dropdown-item>
                      <el-dropdown-item @click.native="collect" v-if="!articleInfo.isCollected">收藏文章</el-dropdown-item>
                      <el-dropdown-item @click.native="cancelCollect" v-else icon="el-icon-check">已收藏</el-dropdown-item>
                      <el-dropdown-item divided @click.native="dialogFormVisible = true">举报文章</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </el-col>
              </el-row>
              <el-dialog title="收入到我的专题" :visible.sync="dialogCollectionVisible" width="40%">
                <el-row :gutter="30" style="margin-bottom: 40px">
                  <el-col :span="19">
                    <el-input placeholder="请输入内容">
                      <el-button slot="append" icon="el-icon-search" style="outline: none"></el-button>
                    </el-input>
                  </el-col>
                  <el-col :span="2">
                    <div><router-link to="/collections/new"><el-button type="text" icon="el-icon-plus" style="outline: none">新建专题</el-button></router-link></div>
                  </el-col>
                </el-row>
                <div style="height: 400px;overflow: auto">
                  <el-row v-for="n in 20" :key="n" style="margin-bottom: 20px">
                    <el-col :span="2">
                      <div>
                        <a class="_1OhGeD" href="/c/565a0de16ee1" target="_blank" rel="noopener noreferrer">
                          <img class="_1MTfTm" src="https://upload.jianshu.io/collections/images/1849232/STF%60KG3D__BR)VKEG__L__I.png?imageMogr2/auto-orient/strip|imageView2/1/w/100/h/100/format/webp" alt="">
                        </a>
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <div class="_1gXCcE">
                        <a class="_3puJ3K _1OhGeD" href="/c/565a0de16ee1" target="_blank" rel="noopener noreferrer">LPL</a>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div>
                        <el-button size="medium" type="danger" round v-if="true" class="add">收入</el-button>
                        <el-button size="medium" type="success" round v-if="false" class="remove">移出</el-button>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-dialog>
              <el-dialog title="点赞列表(只显示最新点赞10人)" :visible.sync="dialogTableVisible">
                <ul class="users infinite-list"
                    style="height: 500px; overflow: auto">
                  <li class="list infinite-list-item" v-for="(likeUser, index) in likeUsers" :key="index">
                    <div class="userInfo" style="margin-bottom: 10px;">
                      <el-avatar :size="48" :src="likeUser.headUrl"></el-avatar>
                      <div style="margin-left: 8px">
                      <span>
                        <router-link tag="a" class="nickname" :to="/u/+likeUser.userId"  target="_blank">{{likeUser.nickname}}</router-link>
                      </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </el-dialog>
              <el-dialog title="举报文章" :visible.sync="dialogFormVisible" width="500px">
                <el-radio-group v-model="radio">
                  <el-radio :label="3">广告及垃圾信息</el-radio>
                  <el-radio :label="6">抄袭或未授权转载</el-radio>
                  <el-radio :label="9">其它</el-radio>
                </el-radio-group>
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 5}"
                  placeholder="写下举报的详情情况（选填）"
                  v-model="textarea">
                </el-input>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="report">确 定</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="line" style="margin-top:24px;margin-bottom:24px"></div>
            <div class="userInfo">
              <el-avatar :size="50" :src="articleInfo.headUrl"></el-avatar>
              <div style="margin-left: 8px">
              <span>
                <router-link tag="a" class="nickname" :to="/u/+articleInfo.userId" target="_blank">你在烦恼什么</router-link>
              </span>
                <span class="introduce">{{articleInfo.introduce}}</span>
                <div style="margin-top: 4px;color: #969696;font-size: 14px">
                  <span>共写了{{articleInfo.allWords}}字</span>
                  <span>获得{{articleInfo.allLikes}}个赞</span>
                  <span>共{{articleInfo.fans}}个粉丝</span>
                </div>
              </div>
              <div v-show="!isMyself">
                <el-button v-if="!articleInfo.isFollowed" type="danger" round class="followBtn off"
                           @click="follow(2)" ref="followBtn2">关注</el-button>
                <el-button v-else type="danger" round class="followBtn on"
                           @click="follow(2)" ref="followBtn2"
                           @mouseover.native="overFollow(2)"
                           @mouseleave.native="leaveFollow(2)">已关注</el-button>
              </div>
            </div>
          </div>
          <div class="note-page-comment">
            <el-row :gutter="20">
              <el-col :span="2">
                <div>
                  <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                </div>
              </el-col>
              <el-col :span="22">
                <div>
                  <el-input
                    class="comment"
                    @focus="showCommentBtn = true"
                    type="textarea"
                    placeholder="写下你的评论..."
                    :autosize="{ minRows: 5, maxRows: 6}"
                    maxlength="180"
                    show-word-limit
                    v-model="comment">
                  </el-input>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top: 20px" v-if="showCommentBtn">
              <el-col :span="5" :offset="19">
                <div>
                  <el-button type="danger" round size="small" style="outline: none">发布</el-button>
                  <el-button type="info" round size="small" @click="showCommentBtn = false">取消</el-button>
                </div>
              </el-col>
            </el-row>
            <h3 class="QxT4hD" style="margin-top: 40px">
              <div class="_10KzV0">
                <span>精彩评论</span>
                <span class="countNum">13</span>
              </div>
            </h3>
            <div class="allCommentList">
              <div class="list" v-for="n in 5" :key="n">
                <div>
                  <el-avatar :size="45"></el-avatar>
                </div>
                <div style="margin-left: 8px">
                  <span>
                    <a class="nickname" href="/u/4b9ff86a7af4" target="_blank">你在烦恼什么</a>
                  </span>
                  <div style="margin-top: 4px;color: #969696;font-size: 14px">
                    <span>{{n}}楼</span>
                    <time datetime="2019-04-15T03:39:10.000Z">2019.04.15 11:39:10</time>
                  </div>
                  <div class="comment-content" style="width: 700px">
                    我们都是为了过的更舒服而已何来对错，何来对错何来对错何来对错何来对错何来对错
                  </div>
                  <div>
                    <el-button type="text" class="likeBtn">
                      <i class="iconfont el-icon-third-dianzan3"></i>33
                    </el-button>
                    <el-button type="text" class="replyBtn" @click="replyClassicBody(n)">
                      <i class="iconfont el-icon-third-pinglun2"></i>回复
                    </el-button>
                  </div>
                  <div :ref="`replyClassicBody${n}`" hidden>
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <div>
                          <el-input
                            class="comment"
                            type="textarea"
                            placeholder="写下你的评论..."
                            :autosize="{ minRows: 5, maxRows: 6}"
                            maxlength="180"
                            show-word-limit
                            v-model="reply">
                          </el-input>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 20px">
                      <el-col :span="5" :offset="19">
                        <div>
                          <el-button type="danger" round size="small" style="outline: none">发布</el-button>
                          <el-button type="info" round size="small" @click="cancelReplyClassicBody(n)">取消</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
            <h3 class="QxT4hD" style="margin-top: 40px">
              <div class="_10KzV0">
                <span>全部评论</span>
                <span class="countNum">200</span>
              </div>
            </h3>
            <div class="allCommentList">
              <div class="list" v-for="n in 5" :key="n">
                <div>
                  <el-avatar :size="45"></el-avatar>
                </div>
                <div style="margin-left: 8px">
                  <span>
                    <a class="nickname" href="/u/4b9ff86a7af4" target="_blank">你在烦恼什么</a>
                  </span>
                  <div style="margin-top: 4px;color: #969696;font-size: 14px">
                    <span>{{n}}楼</span>
                    <time datetime="2019-04-15T03:39:10.000Z">2019.04.15 11:39:10</time>
                  </div>
                  <div class="comment-content" style="width: 700px">
                    我们都是为了过的更舒服而已何来对错，何来对错何来对错何来对错何来对错何来对错
                  </div>
                  <div>
                    <el-button type="text" class="likeBtn">
                      <i class="iconfont el-icon-third-dianzan3"></i>33
                    </el-button>
                    <el-button type="text" class="replyBtn" @click="replyBody(n)">
                      <i class="iconfont el-icon-third-pinglun2"></i>回复
                    </el-button>
                  </div>
                  <div :ref="`replyBody${n}`" hidden>
                    <el-row :gutter="20">
                      <el-col :span="24">
                        <div>
                          <el-input
                            class="comment"
                            type="textarea"
                            placeholder="写下你的评论..."
                            :autosize="{ minRows: 5, maxRows: 6}"
                            maxlength="180"
                            show-word-limit
                            v-model="reply">
                          </el-input>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top: 20px">
                      <el-col :span="5" :offset="19">
                        <div>
                          <el-button type="danger" round size="small" style="outline: none">发布</el-button>
                          <el-button type="info" round size="small" @click="cancelReplyBody(n)">取消</el-button>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="block">
                <el-pagination
                  :page-size="100"
                  layout="prev, pager, next, jumper"
                  :total="1000">
                </el-pagination>
              </div>
            </div>
          </div>
          <div class="topic">
            <h3 class="QxT4hD"><span>被以下专题收入，发现更多相似内容</span></h3>
            <div class="topic-content">
              <a class="_3s5t0Q _1OhGeD" >
                <span class="_2-Djqu" @click="dialogCollectionVisible = true"><i class="el-icon-plus" style="margin-right: 2px;font-weight: bold"/>收入我的专题</span>
              </a>
              <a class="_3s5t0Q _1OhGeD" href="#/c/8a7716311371" target="_blank">
                <el-avatar class="topicImg" shape="square" size="small"></el-avatar>
                <span class="_2-Djqu">老玩家经验心得验心得家经验心得验心得验心得</span>
              </a>
              <el-button type="text" style="font-size: 14px;color: #999;outline: none">
                展开更多<i class="el-icon-arrow-down"/>
              </el-button>
            </div>
            <el-divider></el-divider>
            <h3 class="QxT4hD">
              <span>推荐阅读</span>
              <router-link :to="{path: '/'}" target="_blank">
                <el-button type="text" style="font-size: 14px;color:#000;outline: none">
                  更多精彩内容<i class="el-icon-arrow-right"/>
                </el-button>
              </router-link>
            </h3>
            <ul>
              <li v-for="n in 5" :key="n" style="display: flex;padding: 20px 0;border-bottom: 1px solid #eee;">
                <div class="recommend">
                  <div class="recommend-title">
                    <a class="_2voXH8 _1OhGeD" href="/p/4fe1350953c1" target="_blank" >常用技索技巧</a>
                  </div>
                  <div class="recommend-content">
                    这是在网易云日推里偶然间听到的一首。初见不惊，回首念念不忘。刚听的时候给我带来的触动并不怎么大，但今天脑海里一直单曲循环这首歌，我想我是喜欢上了。就像耐看的女孩，初见不惊，回首念念不忘……
                  </div>
                  <div class="recommend-footer">
                    <a class="_3IWz1q _1OhGeD" href="/u/d2fc38a07204" target="_blank" rel="noopener noreferrer">
                      <img class="head" src="https://upload.jianshu.io/users/upload_avatars/2835271/361fa5cda59b.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/48/h/48/format/webp" alt="">
                      <span style="font-size: 13px;color: #969696;">水果茶丁</span>
                    </a>
                    <span class="info">阅读 140</span>
                    <span class="info">评论 0</span>
                    <span class="info">赞 0</span>
                  </div>
                </div>
<!--                <img class="recommend-img">-->
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
      <el-aside width="270px" class="aside">
        <div class="top">
          <div class="userInfo">
            <el-avatar :size="50" :src="articleInfo.headUrl"></el-avatar>
            <div style="margin-left: 8px">
              <span>
                <router-link tag="a" class="nickname" :to="/u/+articleInfo.userId" target="_blank">{{articleInfo.nickname}}</router-link>
              </span>
              <el-button v-show="!isMyself" v-if="!articleInfo.isFollowed" type="danger" size="mini" round class="followBtn off"
                         @click="follow(3)" ref="followBtn3">关注</el-button>
              <el-button v-show="!isMyself" v-else type="danger" size="mini" round class="followBtn on"
                         @click="follow(3)" ref="followBtn3"
                         @mouseover.native="overFollow(3)"
                         @mouseleave.native="leaveFollow(3)">已关注</el-button>
            </div>
          </div>
          <div class="_19DgIp"></div>
          <div class="item" v-for="(otherArticle, index) in otherArticles" :key="index">
            <div class="smallTitle">
              <router-link tag="a" class="_2ER8Tt _1OhGeD" :to="/p/+otherArticle.id" target="_blank">
                {{otherArticle.title}}
              </router-link>
            </div>
            <div class="readCount">阅读 {{otherArticle.clicks}}</div>
          </div>
        </div>
        <div class="bottom">
          <h3 class="QHRnq8 QxT4hD"><span>推荐阅读</span></h3>
          <div class="item" v-for="n in 3" :key="n">
            <div class="smallTitle">
              <router-link tag="a" class="_2ER8Tt _1OhGeD" to="/p/1" target="_blank">
                你喜欢他吗{{n}}
              </router-link>
            </div>
            <div class="readCount">阅读 230</div>
          </div>
        </div>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import NavComponent from './common/Nav'
export default {
  name: 'Article',
  components: {
    NavComponent
  },
  data () {
    return {
      isVeto: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogCollectionVisible: false,
      showCommentBtn: false,
      count: 6,
      radio: '',
      textarea: '',
      comment: '',
      reply: '',
      articleInfo: {},
      otherArticles: [],
      likeUsers: [],
      isMyself: false
    }
  },
  created () {
    this.getArticle(this.$route.params.id)
  },
  computed: {
    disabled () {
      return this.loading
    }
  },
  methods: {
    getArticle (id) {
      let _this = this
      this.axios.put('/api/p/click', {
        'id': id
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/p/' + id).then(function (res) {
        if (res.data.code) {
          _this.articleInfo = res.data.data
          // eslint-disable-next-line eqeqeq
          if (_this.articleInfo.userId == localStorage.getItem('userId').toString()) {
            _this.isMyself = true
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
      this.axios.get('/api/p/user/' + id).then(function (res) {
        if (res.data.code) {
          _this.otherArticles = res.data.data
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getLikeUsers (page) {
      let _this = this
      _this.dialogTableVisible = true
      this.axios.get('/api/p/like/user', {
        params: {
          'articleId': _this.$route.params.id,
          'page': page
        }
      }).then(function (res) {
        if (res.data.code) {
          _this.likeUsers = res.data.data.list
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    like () {
      let _this = this
      this.articleInfo.isLiked = !this.articleInfo.isLiked
      this.axios.put('/api/p/like', {
        'userId': localStorage.getItem('userId'),
        'articleId': _this.$route.params.id
      }).then(function (res) {
        if (res.data.code === '403') {
          this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        if (_this.articleInfo.isLiked) {
          _this.articleInfo.article.likes++
        } else {
          _this.articleInfo.article.likes--
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    collect () {
      let _this = this
      this.articleInfo.isCollected = !this.articleInfo.isCollected
      this.axios.post('/api/p/collection', {
        'userId': localStorage.getItem('userId'),
        'articleId': _this.$route.params.id
      }).then(function (res) {
        if (res.data.code === '403') {
          this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        _this.$message({
          message: '收藏成功',
          type: 'success',
          center: true
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    cancelCollect () {
      let _this = this
      this.articleInfo.isCollected = !this.articleInfo.isCollected
      this.axios.delete('/api/p/collection', {
        data: {
          'userId': localStorage.getItem('userId'),
          'articleId': _this.$route.params.id
        }
      }).then(function (res) {
        if (res.data.code === '403') {
          this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        _this.$message({
          message: '已取消收藏',
          type: 'success',
          center: true
        })
      }).catch(function (error) {
        console.log(error)
      })
    },
    report () {
      this.dialogFormVisible = false
      this.$message({
        message: '举报成功',
        type: 'success',
        center: true
      })
    },
    replyBody (e) {
      this.$refs[`replyBody${e}`][0].removeAttribute('hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    },
    cancelReplyBody (e) {
      this.$refs[`replyBody${e}`][0].setAttribute('hidden', 'hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    },
    replyClassicBody (e) {
      this.$refs[`replyClassicBody${e}`][0].removeAttribute('hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    },
    cancelReplyClassicBody (e) {
      this.$refs[`replyClassicBody${e}`][0].setAttribute('hidden', 'hidden')
      // console.log(this.$refs[`replyBody${e}`][0])
    },
    follow (index) {
      this.articleInfo.isFollowed = !this.articleInfo.isFollowed
      let _this = this
      this.axios.put('/api/follow', {
        'fromUserId': localStorage.getItem('userId'),
        'toUserId': _this.articleInfo.userId
      }).then(function (res) {
        if (res.data.code === '403') {
          this.$message({
            message: '您还未登录',
            type: 'error',
            center: true
          })
          return
        }
        if (_this.articleInfo.isFollowed) {
          _this.articleInfo.fans++
          _this.$message({
            message: '关注成功',
            type: 'success',
            center: true
          })
        } else {
          _this.articleInfo.fans--
          _this.$message({
            message: '取消关注成功',
            type: 'success',
            center: true
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
      if (!this.articleInfo.isFollowed) {
        this.$refs.followBtn1.$el.firstElementChild.innerHTML = '关注'
        this.$refs.followBtn2.$el.firstElementChild.innerHTML = '关注'
        this.$refs.followBtn3.$el.firstElementChild.innerHTML = '关注'
      } else {
        this.$refs.followBtn1.$el.firstElementChild.innerHTML = '已关注'
        this.$refs.followBtn2.$el.firstElementChild.innerHTML = '已关注'
        this.$refs.followBtn3.$el.firstElementChild.innerHTML = '已关注'
      }
    },
    overFollow (index) {
      if (index === 1) {
        this.$refs.followBtn1.$el.firstElementChild.innerHTML = '取消关注'
      } else if (index === 2) {
        this.$refs.followBtn2.$el.firstElementChild.innerHTML = '取消关注'
      } else {
        this.$refs.followBtn3.$el.firstElementChild.innerHTML = '取消关注'
      }
    },
    leaveFollow (index) {
      if (index === 1) {
        this.$refs.followBtn1.$el.firstElementChild.innerHTML = '已关注'
      } else if (index === 2) {
        this.$refs.followBtn2.$el.firstElementChild.innerHTML = '已关注'
      } else {
        this.$refs.followBtn3.$el.firstElementChild.innerHTML = '已关注'
      }
    }
  }
}
</script>

<style scoped>
  ul li {
    list-style: none;
  }
  ul {
    padding: 0;
    margin: 0;
  }
  blockquote {
    padding: 20px;
    background-color: #fafafa;
    border-left: 6px solid #e6e6e6;
    word-break: break-word;
    font-size: 16px;
    font-weight: normal;
    line-height: 30px;
    margin: 0 0 20px;
  }
  a {
    text-decoration: none;
    color: #404040;
  }
  .container {
    padding: 24px 16px;
    margin: 0 auto;
    width: 1120px;
  }
  .content {
    background: #ffffff;
    border-radius: 5px;
    padding: 24px 30px;
  }
  .title{
    font-size: 35px;
    font-weight: 700;
    word-break: break-word;
    margin-top: 0;
    margin-bottom: .5em;
  }
  .userInfo {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
  }
  .userInfo .followBtn {
    background-color: #fff;
    color:#ec7259;
    outline: none;
    padding: 6px 12px;
    margin-left: 2px;
  }
  .userInfo .on {
    color: #ec7259;
    background-color: #ffebeb;
    border-color: #ffebeb;
  }
  .content .article {
    font-size: 18px;
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: 20px;
  }
  .content .footer .likeBtn {
    width: 50px;
    height: 50px;
    align-items: center;
    outline: none;
  }
  .content .likeCount {
    outline: none;
    color:  #969696;
  }
  .content .footer .likeBtn i {
    font-size: 20px;
  }
  .content .footer .likeBtn:hover {
    background: #ffffff;
  }
  .notebook {
    color:  #969696;
  }
  .notebook i {
    margin-right: 8px;
    font-size: 18px;
  }
  .content .more {
    margin-left: 10px;
    outline: none;
    color:  #969696;
  }
  .content .line {
    width: 100%;
    height: 1px;
    margin: 16px 0;
    background-color: #eee;
  }
  .content .userInfo {
    display: flex;
    align-items: center;
    background-color: #fafafa;
    border-radius: 4px;
    padding: 12px 16px;
  }
  .content .userInfo span {
    margin-right: 12px;
  }
  .content .userInfo .introduce {
    margin-top: 4px;
    font-size: 14px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    width:360px;
    height:24px;
    display:block;
    line-height: 24px;
  }
  .aside {
    margin-left: 10px;
  }
  ._19DgIp {
    width: 100%;
    height: 1px;
    margin: 16px 0;
    background-color: #eee;
  }
  .aside .top {
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 16px;
  }
  .item {
    margin-top: 16px;
  }
  .item .smallTitle:hover {
    text-decoration: underline;
  }
  .item .readCount {
    font-size: 14px;
    color: #969696;
  }
  .aside .bottom {
    background: #ffffff;
    border-radius: 4px;
    margin-bottom: 10px;
    padding: 16px;
  }
  .QHRnq8 {
    font-size: 16px;
    padding-left: 6px;
    height: 18px;
  }
  .QxT4hD {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-left: 12px;
    border-left: 4px solid #ec7259;
    font-size: 18px;
    font-weight: 500;
    height: 20px;
    line-height: 20px;
  }
  .note-page-comment {
    padding: 24px 30px;
    background: #ffffff;
    border-radius: 4px;
    margin-top: 20px;
  }
  .allCommentList .list{
    display: flex;
  }
  .allCommentList .list .comment-content {
    margin-top: 10px;
    font-size: 16px;
    line-height: 1.5;
    word-break: break-word;
  }
  .allCommentList .list .likeBtn {
    color: #b0b0b0;
    outline: none;
  }
  .allCommentList .list .replyBtn {
    color: #b0b0b0;
    outline: none;
  }
  .allCommentList .list .likeBtn:hover {
    color: #ec7259;
  }
  .allCommentList .list i {
    margin-right: 5px;
  }
  .block {
    text-align: center;
  }
  .topic {
    padding: 24px 30px;
    margin-top: 20px;
    background-color: #fff;
    border-radius: 4px;
  }
  .topic .topic-content {
    display: flex;
    flex-wrap: wrap;
  }
  ._3s5t0Q {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    margin-right: 12px;
    margin-bottom: 12px;
    cursor: pointer;
    background-color: #f5f5f5;
    padding: 5px 10px 5px 5px;
    border-radius: 4px;
  }
  .topic .topicImg {
    margin-right: 10px;
  }
  ._2-Djqu {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    width:115px;
    height:24px;
    display:block;
  }
  ._2voXH8 {
    font-size: 18px;
    width: 500px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    white-space:nowrap;
    margin-top: 4px;
  }
  ._2voXH8:active, ._2voXH8:hover {
    text-decoration: underline;
  }
  .recommend-content {
    margin-top: 8px;
    font-size: 14px;
    color: #666;
    line-height: 22px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .recommend-footer {
    margin-top: 4px;
    line-height: 40px;
  }
  .recommend-footer .info {
    display: inline-block;
    margin-top: 2px;
    font-size: 13px;
    color: #969696;
    margin-left: 12px;
  }
  .recommend-footer .head{
    width: 28px;
    height: 28px;
    margin-right: 4px;
    border-radius: 50%;
  }
  .recommend-img {
    width: 150px;
    height: 120px;
    margin-left: 20px;
    border-radius: 4px;
    border: 1px solid hsla(0,0%,50.2%,.1);
  }
  ._1MTfTm {
    min-width: 50px;
    min-height: 50px;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    border: 1px solid #eee;
  }
  ._3puJ3K {
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    line-height: 50px;
    margin-left: 10px;
  }
  .remove {
    color: #ec7259;
    background-color: #ffebeb;
    border-color: #ffebeb;
    outline: none;
  }
  .add {
    color: #ec7259;
    background-color: #fff;
    border-color: #ec7259;
    outline: none;
  }
  .add:hover{
    color: #ec7259;
    background-color: #fef8f7;
    border-color: #ec7259;
  }
</style>
