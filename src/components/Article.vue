<template>
  <el-container style="background: #f9f9f9">
    <el-header>
      <nav-component/>
    </el-header>
    <el-container class="container">
      <el-container>
        <el-main style="padding: 0">
          <div class="content">
            <h1 class="title">高级前端面试题目大全(一)</h1>
            <div class="userInfo">
              <el-avatar :size="48"></el-avatar>
              <div style="margin-left: 8px">
              <span>
                <a class="nickname" href="/u/4b9ff86a7af4" target="_blank">你在烦恼什么</a>
              </span>
                <el-button v-if="!isFollow" type="danger" size="mini" round class="followBtn off"
                           @click="follow(1)" ref="followBtn1">关注</el-button>
                <el-button v-if="isFollow" type="danger" size="mini" round class="followBtn on"
                           @click="follow(1)" ref="followBtn1"
                           @mouseover.native="overFollow(1)"
                           @mouseleave.native="leaveFollow(1)">已关注</el-button>
                <div style="margin-top: 4px;color: #969696;font-size: 14px">
                  <time datetime="2019-04-15T03:39:10.000Z">2019.04.15 11:39:10</time>
                  <span>字数 3,859</span>
                  <span>阅读 6,033</span>
                </div>
              </div>
            </div>
            <div class="article">
              <blockquote>
                <p>回忆是目前穿梭时空的唯一办法</p>
              </blockquote>
              <p>大约是在三个月前我离开了有赞，最近也是在准备学校的工程实习答辩，被要求写一份实习总结<br>
                一如既往，我对于学校的事情都抱有「能不做就不做，能少做就少做」的原则<br>
                于是我写了一堆快速制作的狗屎文字当作了总结，看着达到了规定的字数要求后，我连一个句号都不想加了，的确是「文不加点」了</p>
              <p>这是一段体验复杂，收获颇多的经历，所以这段实习结束后我想表达的东西是有很多的<br>
                之前刚实习的时候就写了一点关于「体制化」的思考<br>
                其实如果继续讨论其他一些想法的话，其实也有很多的：</p>
              <ul>
                <li>在互联网公司极快的节奏，各种 DDL(Dead Line) 下被异化的个体</li>
                <li>996 下企业资本家对于劳动者的肉体剥削和精神摧残</li>
                <li>关于年轻人要在企业奋斗快速上升和年轻人要多为自己思考的矛盾悖论</li>
                <li>...<br>
                  想写又不想写<br>
                  很宏大又很琐碎<br>
                  触及个人又牵涉社会大背景</li>
              </ul>
              <p>这些思考的话还是等以后觉得自己驾驭得住而且有时间了再写吧……</p>
              <p>所以现在我也就仅仅写写我这小半年学到的做人行事<br>
                走走停停且坐坐，写写想想再前行</p>
              <p>有赞是一个有着三千多人的互联网公司<br>
                正如《人类简史》中所言：「一个150人以下的组织团体可以根据团队内部的关系联系维持，一旦人数更多，就要有许多 <strong>想象</strong> 来维持」在大公司中，公司文化和公司制度就是这种想象和虚构来体现</p>
              <p>这半年我脱离了象牙塔，第一次真正意义上去了大公司正式上班，大公司不仅仅在技术上非常强大，而且其公司制度文化对于我个人眼界的开阔和思想的成长也很有帮助，这也是我一直所崇尚的「格局」的学习<br>
                所以下面我也想通过「领导者」和「被领导者」的角度来总结我所学到的想到的</p>
              <hr>
              <h4>A Nice Worker</h4>
              <ul>
                <li>
                  <strong>闭环沟通</strong><br>
                  还记得之前有赞官网展示页法务的页面出了问题，那时候是我来负责官网的维护，所以法务那边的负责人也就找到了我，我修复了BUG，然后一共向他反馈了三次：<br>
                  「我现在开始着手修复这个问题，预计下周周二上线」<br>
                  「我已经修复好了，下周二正常发车上线」<br>
                  「页面已经重新部署上线，你那边可以验收一下」<br>
                  其实不管什么项目，我一般都是习惯性地从开始，完成，验收都会向需求发起者同步一下，但是这次结束后，法务那边的负责人夸了我一句「闭环沟通👍」<br>
                  这也是我第一次看到这个词：</li>
              </ul>
              <blockquote>
                <p>闭环沟通：解决事情从开始到结束，都会主动同步到给事情发起者，最后形成了一个闭环</p>
              </blockquote>
              <p>这样发起者就可以及时了解情况，不用付出额外的时间精力来关心事情的完成度<br>
                //默默吐槽一句，这好像就是 <code>Node.js</code> 中所谓的异步I/O</p>
              <h4>A Nice Leader &amp;&amp; Team</h4>
              <ul>
                <li>
                  <strong>实时了解</strong><br>
                  之前上班的时候，每周小组内部都会有总结，通过两种方式来实行：</li>
              </ul>
              <ol>
                <li>周五下午在小组群里每人发个周报，这周干的事情和下周准备干的事情</li>
                <li>周一早上在会议室轮流发言，吐槽也好，遇到的问题也好，都可以讲<br>
                  在开始入职的时候，我有挺多地方都不太适应，也是通过这些方式，我的问题慢慢地被组长和带我的大哥所了解，同时小组组员之间也会知道大家在做什么，同时有些问题其实以前其他人遇到过，借此可以避免重走弯路</li>
              </ol>
              <ul>
                <li><p><strong>自由氛围</strong><br>
                  互联网公司有一个好处，就是大家思想比较年轻开发，形式上也没有那么多的框架束缚，我记得在企业微信中我们前端有两个群：一个是正式的工作群，工作中的项目划分或者问题都在这里交流，还有一个是「PC组圆桌会议」<br>
                  「圆桌会议」的设立目的就是为了平等地交流，所以这个群也就是为了大家吐槽，讲骚话，或者讨论工作之外的新技术等等<br>
                  优秀的程序员都是很有思想，很有激情的人，所以这个群允许大家说各种话题，这个群的群主就是我的 TL ，我想他建立这个群的初衷大约如此<br>
                  记得B站源码泄露，林志玲脱单...我都是从这里知道的</p></li>
                <li><p><strong>可靠担当</strong><br>
                  记得无论是小组 TL，还是我们的大组 TL，他们的经常一句话就是「你们要是被为难，让他们来找我」<br>
                  和产品撕逼，和后端撕逼，是会发生的事情，但是如果是常态，那就很有问题了，这时候 TL 的靠谱不靠谱，有没有担当就很重要<br>
                  周会上也经常会有组员反映哪个产品经理需求拎不清楚，不可理喻，导致很多无效加班...<br>
                  当时我的 TL 在听了多次的关于某个产品经理的吐槽后，他就去和产品经理那边的 TL 沟通了，约他吃了个饭，后一天我就听说了那个产品经理就没了...</p></li>
                <li><p><strong>及时复盘</strong><br>
                  项目落地上线后，总要进行复盘，对于这个过程中哪方面做得不好的，哪个人员拖沓不牢靠的，都可以进行总结反馈<br>
                  每一次复盘就是对于这一段时间工作的总结，避免下一段工作再犯前期已经发生过的错误</p></li>
                <li><p><strong>技术分享</strong><br>
                  技术一途，浩瀚烟海<br>
                  你总有不知道的，技术分享就可以让你学习到自己没有接触过或者没有那么深入了解过的，通过技术分享会是可以看到学习到很多知识的<br>
                  我一直觉得程序员都是有着一种浪漫情怀的<br>
                  乐于将自己掌握的东西分享出去，热情于将自己的代码开源出去<br>
                  而且技术分享其实就是写博客一样，对于展示者也是一种考验，毕竟当一个好学生和当一个老师所要求的理解程度是不一样的</p></li>
              </ul>
              <hr>
              <p>当然<br>
                作为一个优秀牢靠的工作者，也有很多要明白：懂得感恩、不断学习...<br>
                作为一个优秀的Leader、企业，同样也有很多是要具备...<br>
                但是<br>
                我所总结也是我在这段时间在有赞学到的，至于其他一些常识性或者是我之前就已经明白的，我也就没写了</p>
              <p>也感谢有赞业务中台 PC 组的大哥们这小半年的包容和照顾，我确实是学习到了很多东西，小半年的实习工资也让我感觉到了有好多钱真好...</p>
            </div>
            <div class="footer">
              <el-row :gutter="20">
                <el-col :span="7">
                  <el-button class="likeBtn" circle ref="likeBtn" @click="like"><i class="iconfont el-icon-third-dianzan3"/></el-button>
                  <el-button class="likeCount" type="text" @click="dialogTableVisible = true">0人点赞<i class="el-icon-arrow-right"/></el-button>
                  <el-button class="likeBtn" circle ref="unLikeBtn" @click="unLike"><i class="iconfont el-icon-third-dianzan2"/> </el-button>
                </el-col>
                <el-col :span="5" :offset="12">
                  <a href="#" target="_blank" class="notebook"><i class="el-icon-s-management"/>笔记本</a>
                  <el-dropdown>
                  <span class="el-dropdown-link">
                       <el-button class="more" icon="el-icon-more" circle></el-button>
                  </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native="dialogCollectionVisible = true">收入专题</el-dropdown-item>
                      <el-dropdown-item>收藏文章</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-check">已收藏</el-dropdown-item>
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
              <el-dialog title="点赞列表" :visible.sync="dialogTableVisible">
                <ul class="users infinite-list"
                    v-infinite-scroll="load"
                    infinite-scroll-disabled="disabled"  style="height: 500px; overflow: auto">
                  <li class="list infinite-list-item" v-for="n in count" v-bind:key="n">
                    <div class="userInfo" style="margin-bottom: 10px;">
                      <el-avatar :size="48"></el-avatar>
                      <div style="margin-left: 8px">
                      <span>
                        <a class="nickname" href="#/u/4b9ff86a7af4" target="_blank">你在烦恼什么{{n}}</a>
                      </span>
                      </div>
                    </div>
                  </li>
                  <p v-if="loading" v-loading="loading" style="width: 100%; height: 50px"></p>
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
              <el-avatar :size="50"></el-avatar>
              <div style="margin-left: 8px">
              <span>
                <a class="nickname" href="/u/4b9ff86a7af4" target="_blank">你在烦恼什么</a>
              </span>
                <span class="introduce">非典型程序员非典型程序员非典型程序员典型程序</span>
                <div style="margin-top: 4px;color: #969696;font-size: 14px">
                  <span>共写了2.2W字</span>
                  <span>获得23个赞</span>
                  <span>共8个粉丝</span>
                </div>
              </div>
              <el-button v-if="!isFollow" type="danger" round class="followBtn off"
                         @click="follow(2)" ref="followBtn2">关注</el-button>
              <el-button v-if="isFollow" type="danger" round class="followBtn on"
                         @click="follow(2)" ref="followBtn2"
                         @mouseover.native="overFollow(2)"
                         @mouseleave.native="leaveFollow(2)">已关注</el-button>
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
                <img class="recommend-img" src="//upload-images.jianshu.io/upload_images/2445675-d63a702890fa4c63.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/300/h/240/format/webp">
              </li>
            </ul>
          </div>
        </el-main>
      </el-container>
      <el-aside width="270px" class="aside">
        <div class="top">
          <div class="userInfo">
            <el-avatar :size="50"></el-avatar>
            <div style="margin-left: 8px">
              <span>
                <a class="nickname" href="/u/4b9ff86a7af4" target="_blank">你在烦恼什么</a>
              </span>
              <el-button v-if="!isFollow" type="danger" size="mini" round class="followBtn off"
                         @click="follow(3)" ref="followBtn3">关注</el-button>
              <el-button v-if="isFollow" type="danger" size="mini" round class="followBtn on"
                         @click="follow(3)" ref="followBtn3"
                         @mouseover.native="overFollow(3)"
                         @mouseleave.native="leaveFollow(3)">已关注</el-button>
            </div>
          </div>
          <div class="_19DgIp"></div>
          <div class="item" v-for="n in 3" :key="n">
            <div class="smallTitle" title="高级前端面试题目大全(二)"><a class="_2ER8Tt _1OhGeD" href="/p/02c51f83d4a7" target="_blank" rel="noopener noreferrer">高级前端面试题目大全({{n}})</a></div>
            <div class="readCount">阅读 230</div>
          </div>
        </div>
        <div class="bottom">
          <h3 class="QHRnq8 QxT4hD"><span>推荐阅读</span></h3>
          <div class="item" v-for="n in 5" :key="n">
            <div class="smallTitle" title="高级前端面试题目大全(二)"><a class="_2ER8Tt _1OhGeD" href="/p/02c51f83d4a7" target="_blank" rel="noopener noreferrer">高级前端面试题目大全({{n}})</a></div>
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
      isFollow: false,
      isLike: false,
      isVeto: false,
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogCollectionVisible: false,
      showCommentBtn: false,
      count: 6,
      loading: false,
      radio: '',
      textarea: '',
      comment: '',
      reply: ''
    }
  },
  computed: {
    disabled () {
      return this.loading
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    like () {
      this.isLike = !this.isLike
      if (this.isLike && this.isVeto) {
        this.$message({
          message: '您不能同时对一篇文章又赞又踩哦',
          type: 'error',
          center: true
        })
        return
      }
      if (this.isLike) {
        this.$refs.likeBtn.$el.style.background = '#ec7259'
        this.$refs.likeBtn.$el.style.color = '#fff'
      } else {
        this.$refs.likeBtn.$el.style.background = ''
        this.$refs.likeBtn.$el.style.color = ''
      }
    },
    unLike () {
      this.isVeto = !this.isVeto
      if (this.isLike && this.isVeto) {
        this.$message({
          message: '您不能同时对一篇文章又赞又踩哦',
          type: 'error',
          center: true
        })
        return
      }
      if (this.isVeto) {
        this.$refs.unLikeBtn.$el.style.background = '#ec7259'
        this.$refs.unLikeBtn.$el.style.color = '#fff'
      } else {
        this.$refs.unLikeBtn.$el.style.background = ''
        this.$refs.unLikeBtn.$el.style.color = ''
      }
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
      this.isFollow = !this.isFollow
      this.$message({
        message: '关注||取消关注',
        type: 'success',
        center: true
      })
      if (!this.isFollow) {
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
