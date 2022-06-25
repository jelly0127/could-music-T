<template>
  <div class="index-container">
    <top></top>
    <!-- 导航区域 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
        <div class="text">
          部分功能尚未完成
          仅用于学习，侵权必删
          电话：19162159697

        </div>
      </ul>
    </div>
    <!-- 主题区域 -->
    <div class="main">
      <el-backtop :bottom="120"
                  target=".main"><i class="el-icon-caret-top"></i></el-backtop>
      <router-view :key=key></router-view>
    </div>

    <!-- 播放区域 -->
    <div class="player">
      <div class="playerImg">
        <i v-show="!songs.url"
           class="play">
          <svg t="1638869530645"
               class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="4982"
               width="50"
               height="50">
            <path d="M627.086095 5.11496c28.131779-7.67194 58.821538-7.67194 86.953317 0 33.246739 7.67194 63.936497 23.016819 89.511296 43.476658 10.22992 7.67294 17.901859 15.344879 23.016819 28.131779 7.67294 17.902859 5.11496 38.362698-5.11496 53.707578-7.67194 12.786899-23.016819 23.016819-40.919678 25.573799-12.786899 2.55798-25.573799 0-38.361698-7.67194-5.11496-2.55798-10.22992-10.22992-17.90186-12.7869-17.901859-10.22992-35.804719-20.459839-56.264557-17.902859-15.344879 0-28.131779 7.67294-35.803719 17.902859-10.22992 10.22992-12.787899 23.016819-10.22992 35.803719 7.67194 25.574799 12.786899 53.706578 20.45984 79.281377 51.149598 2.55798 99.740216 15.344879 143.217874 40.919678 40.919678 25.574799 79.280377 58.821538 109.970135 97.183236 25.574799 33.246739 46.034638 71.609437 56.264558 112.529115 12.786899 43.476658 17.901859 89.510296 12.786899 132.986955-2.55698 38.362698-10.22992 74.166417-23.016819 109.971135-33.246739 84.396337-92.069276 161.119733-171.349653 209.712352-56.264558 35.803719-122.759035 58.821538-189.252512 66.493477-46.034638 5.11496-92.069276 5.11496-138.102914-2.55698-94.626256-15.344879-181.579573-61.379517-250.63103-130.430974-66.494477-66.493477-112.529115-153.447794-132.988954-245.51607-7.67194-69.051457-7.67194-138.102914 7.672939-207.154372 17.902859-81.839357 61.379517-161.119733 117.643075-222.499251 48.592618-51.149598 107.414156-89.511296 171.350653-117.643075 7.67194-2.55798 12.786899-5.11496 20.45984-7.67294 15.343879-2.55698 30.689759 0 43.476658 10.22992 17.901859 12.787899 25.573799 33.247739 23.016819 53.706578-2.55698 20.459839-17.901859 38.362698-35.804719 46.034638-63.936497 25.574799-122.758035 69.051457-163.677713 122.759035-38.361698 53.705578-63.936497 112.527115-71.608437 173.906633-7.67194 61.379517 0 122.758035 20.459839 181.579572 30.689759 84.396337 94.626256 156.004774 173.907633 196.924452 48.591618 25.574799 102.298196 38.361698 156.004774 38.361699 43.476658 0 89.511296-7.67194 130.429974-23.016819 35.804719-12.786899 71.609437-33.246739 99.741216-58.821538 28.132779-23.016819 51.149598-53.706578 66.494477-84.396337 7.67194-15.344879 17.901859-33.246739 20.45984-51.149597 15.344879-51.149598 17.901859-107.413156 2.556979-158.561754-12.786899-43.477658-38.361698-81.839357-71.609437-109.971135-15.343879-12.786899-30.689759-25.574799-48.591618-35.804719-15.343879-7.67194-30.689759-15.344879-48.591618-17.901859 12.787899 46.033638 23.017819 92.069276 35.804719 135.544934 2.55798 10.22992 5.11496 23.017819 5.11496 33.247739 2.55798 46.033638-15.344879 94.625256-46.034638 130.429974-28.131779 33.246739-69.051457 58.821538-112.528116 66.494478-46.033638 10.22992-97.183236 0-138.102914-25.574799-38.361698-25.574799-66.493477-63.936497-81.839357-104.856176-7.67194-23.016819-12.786899-48.591618-12.786899-74.166417-2.55698-56.263558 12.787899-109.971135 43.477658-156.004773 35.803719-53.706578 94.625256-92.069276 158.561753-109.971136-5.11496-17.901859-10.22992-35.804719-12.786899-53.706578-12.786899-38.361698-10.22992-81.839357 7.67194-115.086095 10.22992-20.459839 23.017819-38.361698 40.919678-51.149598 23.016819-20.459839 43.476658-33.246739 66.494477-40.918678M478.753261 419.423703c-17.902859 17.901859-28.132779 40.919678-33.247738 63.936497-5.11396 20.459839-5.11396 43.476658 0 66.494477 5.11496 23.016819 17.902859 46.033638 38.362698 61.379518 15.344879 10.22892 35.803719 15.343879 56.263558 10.228919 35.804719-5.11496 63.936497-38.361698 63.936497-74.166416-2.55698-7.67194-2.55698-17.901859-5.11496-25.574799-12.786899-48.591618-25.573799-99.741216-38.361698-148.332834-30.689759 7.67294-58.821538 23.017819-81.839357 46.034638z"
                  fill="#E72D2C"
                  p-id="4983"></path>
          </svg>
        </i>

        <img :src="songs.url"
             @click="drawer = true">
      </div>
      <div class="info">
        <h5>{{songs.name}}</h5>
        <h6>{{name}}</h6>
        <h6>{{musicName}}</h6>
      </div>
      <audio :src="musicUrl"
             autoplay
             controls
             ref="volumes"></audio>
    </div>
   
   <!-- <Aplayer  autoplay
   mini:true
   showLrc:true
  :music="{
    title: 'secret base~君がくれたもの~',
    artist: 'Silent Siren',
    src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
    pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
  }"
   /> -->
    <!-- 歌词部分-->
    <el-drawer style="margin-bottom: 60px;"
               size='100%'
               :show-close="false"
               :visible.sync="drawer"
               :direction="direction">
      <div class="drawer_Box">
        <el-backtop :bottom="120"
                    target=".drawer_Box"><i class="el-icon-caret-top"></i></el-backtop>
        <div class="left">
          <i class="el-icon-arrow-down"
             @click="drawer=false"></i>
          <div class="logo">
            <div class="one">
              <img src="../assets/disc.png">
            </div>
            <div class="two">
              <img :src="songs.url">
            </div>
          </div>
        </div>
        <div class="right">
          <h3>{{songs.name}}</h3>
          <div class="scroll">
            <ul class="infinite-list"
                style="overflow:auto">
              <li v-for="(i,index) in lyric"
                  :key=index
                  class="infinite-list-item">
                {{i[1]}}
              </li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <div class="playlist-container">
            <el-tabs v-model="activeIndex">
              <el-tab-pane :label="''"
                           name="2">
                <!-- 热门评论 -->
                <div class="comment-wrap"
                     v-if="hotComments.length!=0">
                  <p class="title">热门评论<span class="number"></span></p>
                  <div class="comments-wrap">
                    <div class="item"
                         v-for="(item,index) in hotComments"
                         :key="index">
                      <div class="icon-wrap">
                        <img :src="item.user.avatarUrl" />
                      </div>
                      <div class="content-wrap">
                        <div class="content">
                          <span class="name">{{item.user.nickname}}:</span>
                          <span class="comment">{{item.content}}</span>
                        </div>
                        <!-- 评论回复 -->
                        <div class="re-content"
                             v-if="item.beReplied.length!=0">
                          <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                          <span class="comment">{{item.beReplied[0].content}}</span>
                        </div>
                        <div class="date">{{dateFormat(item.time)}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 最新评论 -->
                <div class="comment-wrap">
                  <p class="title">最新评论<span class="number"></span></p>
                  <div class="comments-wrap">
                    <div class="item"
                         v-for="(item,index) in comments"
                         :key="index">
                      <div class="icon-wrap">
                        <img :src="item.user.avatarUrl" />
                      </div>
                      <div class="content-wrap">
                        <div class="content">
                          <span class="name">{{item.user.nickname}}:</span>
                          <span class="comment">{{item.content}}</span>
                        </div>
                        <!-- 评论回复 -->
                        <div class="re-content"
                             v-if="item.beReplied.length!=0">
                          <span class="name">{{item.beReplied[0].user.nickname}}:</span>
                          <span class="comment">{{item.beReplied[0].content}}</span>
                        </div>
                        <div class="date">{{dateFormat(item.time)}}</div>
                      </div>
                    </div>

                  </div>
                </div>
                <!-- 分页器 -->
                <el-pagination @current-change="handleCurrentChange"
                               background
                               layout="prev, pager, next"
                               :total="total"
                               :current-page="page"
                               :page-size="10"
                               :limit="limit">
                </el-pagination>
              </el-tab-pane>
            </el-tabs>
          </div>
        </div>
        <!-- <div class="comment"></div> -->
      </div>

    </el-drawer>

  </div>
</template>

<script >
import { getComment } from '../api/api'
import Aplayer from 'vue-aplayer'
import top from './01.top.vue';
export default {
  name: 'index',
  components: {
    top,Aplayer
   
  },
  data () {
    return {
      musicUrl: "",
      songs: {
        url: '',
        name: ''
      },
      name: "",
      musicName: '',
      drawer: false,
      direction: 'btt',
      count: 10,
      lyric: [],
      activeIndex: '2',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      limit: 10,
      //歌单详情数据
      detail: {},
      hotComments: {},
      //热评
      hotTotal: 0,
      //普通评论数
      comTotal: 0,
      //回复
      comments: {},
      //总评论数
      TotalSum: 0,
    }
  },
  // vue-router的切换不同于传统的页面的切换。
  // 路由之间的切换，其实就是组件之间的切换，
  // 不是真正的页面切换。这也会导致一个问题，
  // 就是引用相同组件的时候，会导致该组件无法更新，
  // 也就是我们口中的页面无法更新的问题了。
  //给路由跳转时每次都添加一个随机数就能防止页面不更新问题
  computed: {
    key () {
      return this.$route.path + Math.random();
    }

  }, mounted () {
    this.test()

  },
  created () {
  },
  methods: {
    test () {
      this.$refs.volumes.volume = 0.3
    },
    // 1900093943
    //歌曲评论
    Comments () {
      // getComment(id).then(res => {
      //   console.log(111111,res.data);
    
      //   this.$parent.comments = res.data.comments
      //   this.$parent.total = res.data.total
      //   this.$parent.hotComments = res.data.hotComments
      // })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      console.log(val);
      this.page = val;
     getComment(65904).then(res=>{
       console.log(res);
     })

    }
  }
}
</script>

 <style lang="less" scope>
.index-container {
  // bottom: ; margin-bottom: ;
  display: flex;
  ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
}

.index-container .nav {
  background-color: #ededed;
  width: 200px;
  height: 100%;
}

.index-container .nav li {
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.index-container .nav li:hover {
  background-color: #e7e7e7;
}

.index-container .nav li .iconfont {
  margin-right: 10px;
  font-size: 20px;
}

.index-container .nav li a {
  color: black;
  padding-left: 30px;
  font-size: 18px;
  line-height: 60px;
  width: 100%;
  height: 100%;
}

.index-container .nav li a.router-link-active {
  color: #dd6d60;
}

.index-container .nav li a.router-link-active .iconfont {
  color: #dd6d60;
}

.index-container .main {
  flex: 1;
  overflow-y: scroll;
  padding: 10px 20px;
}

.index-container .main > div {
  max-width: 1100px;
  margin: 0 auto;
}

.index-container .player {
  display: flex;
  background: #f1f3f4;
  height: 60px;
  position: fixed;
  z-index: 9999;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: 0;
  border-top: 1px solid rgb(216, 213, 213);
  svg {
    margin-top: 6px;
  }
}
.index-container .player img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 7px 0 3px 50px;
  -webkit-animation: changeright 60s linear infinite;
  background-size: cover;
}
.index-container .player .info {
  text-align: center;
  width: 160px;
  margin: auto;
  margin-left: 20px;
}
.index-container audio {
  width: 100%;
  border-radius: none;
  outline: none;
}
.el-drawer__header {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  color: #72767b;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin-bottom: 0 !important;
  padding: 0 !important;
}
.infinite-list {
  margin-top: 10px;
  .infinite-list-item {
    margin-top: 10px;
  }
}
.el-drawer__body {
  background-color: #f1f3f4;
}

.index-container .drawer_Box {
  margin-left: auto;
  margin-right: auto;
  // bottom: 60px;
  // max-width: 1000px;
  height: 100%;
  /* background-color: #f1f3f4; */
  position: relative;
  overflow-y: auto;
}
.index-container .drawer_Box .left {
  position: absolute;
  width: 40%;
  height: 500px;
  left: 280px;
  top: 0;
  i {
    // margin-left: 30px;
    margin-top: 100px;
    margin-left: 250px;
    font-size: 30px;
    left: 0;
    z-index: 9999;
  }

  .logo {
    height: 260px;
    width: 260px;
    margin-left: 17%;
    margin-top: 15%;

    .one {
      position: relative;
      img {
        height: 260px;
        width: 260px;
      }
    }
    .two {
      position: absolute;
      margin-top: -224px;
      margin-left: 40px;
      img {
        height: 180px;
        width: 180px;
        border-radius: 50%;
        -webkit-animation: changeright 60s linear infinite;
      }
    }
  }
}
@-webkit-keyframes changeright {
  0% {
    -webkit-transform: rotate(0deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

* {
  text-align: center;
}
.index-container .drawer_Box .right {
  margin-top: 120px;
  position: absolute;
  width: 60%;
  height: 500px;
  right: 0;
  // background-color: pink;
  h3 {
    margin-right: 338px;
  }
  .scroll {
    height: 350px;
    width: 500px;
    margin-top: 20px;
    margin-left: 50px;
    overflow-y: auto;
    // overflow: hidden;
  }
  ::-webkit-scrollbar {
    display: none; /*隐藏滚动条*/
  }
}
.index-container .drawer_Box .footer {
  position: absolute;
  width: 100%;
  height: 100%;
  margin-top: 500px;
  // background-color: rgb(235, 194, 105);
  // bottom: 0;
}

.playlist-container {
  margin: auto;
  padding-top: 40px;
  el-tabs {
    margin-left: 20px !important;
  }
}

.playlist-container .top-wrap {
  display: flex;
}

.playlist-container .top-wrap span {
  font-size: 17px;
}

.playlist-container .top-wrap .img-wrap {
  margin-right: 30px;
}

.playlist-container .top-wrap .img-wrap img {
  width: 230px;
  height: 230px;
}

.playlist-container .top-wrap .info-wrap .title {
  margin-bottom: 20px;
}

.playlist-container .top-wrap .info-wrap .author-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.playlist-container .top-wrap .info-wrap .author-wrap img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.playlist-container .top-wrap .info-wrap .author-wrap .name {
  margin-right: 10px;
}

.playlist-container .top-wrap .info-wrap .author-wrap .time {
  font-size: 14px;
}

.playlist-container .top-wrap .info-wrap .play-wrap {
  width: 120px;
  height: 35px;
  border-radius: 4px;
  background: linear-gradient(to right, #e85e4d, #c6483c);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.playlist-container .top-wrap .info-wrap .play-wrap span {
  color: white;
}

.playlist-container .top-wrap .info-wrap .play-wrap span.iconfont {
  margin-right: 8px;
}

.playlist-container .top-wrap .info-wrap .play-wrap span.text {
  font-size: 16px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap {
  display: flex;
  margin-bottom: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap span {
  margin: 0;
}

.playlist-container .top-wrap .info-wrap .tag-wrap ul {
  display: flex;
  align-items: center;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li {
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li:not(:last-child)::after {
  content: "/";
  margin: 0 4px;
}

.playlist-container .top-wrap .info-wrap .desc-wrap span:last-child {
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap span:first-child {
  margin-right: 10px;
}

.playlist-container .comment-wrap {
  margin-bottom: 70px;
}

.playlist-container .comment-wrap .title {
  font-size: 20px;
}

.playlist-container .comment-wrap .title .number {
  color: black;
  font-size: 18px;
}

.playlist-container .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.playlist-container .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.playlist-container .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-left: 100px;
}

.playlist-container .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.playlist-container .comment-wrap .item .date {
  color: #bebebe;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  padding-left: -20px;
  flex: 1;
}

.playlist-container .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .content,
.playlist-container .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.playlist-container .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}
</style>
