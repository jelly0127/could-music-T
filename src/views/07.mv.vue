<template>
  <!-- 最新mv的视频详情模块 -->
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls
               autoplay
               loop
               :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvData.cover" />
          </div>
          <span class="name"
                v-if='mvData.artists!=undefined'>{{mvData.artists[0].name}}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{mvData.name}}</h2>
          <span class="date">发布：{{mvData.publishTime}}</span>
          <span class="number">播放：{{mvData.playCount}} 次</span>
          <p class="desc">
            {{mvData.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap"
           v-if="hotComments!=undefined">
        <p class="title">热门评论<span class="number">({{hotTotal}})</span></p>
        <div class="comments-wrap">
          <div class="item"
               v-for="(item,index) in hotComments"
               :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
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
        <p class="title">最新评论<span class="number">({{total}})</span></p>
        <div class="comments-wrap">
          <div class="item"
               v-for="(item,index) in comments"
               :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{item.user.nickname}}：</span>
                <span class="comment">{{item.content}}</span>
              </div>
              <!-- 评论回复 -->
              <div class="re-content"
                   v-if="item.beReplied.length!=0">
                <span class="name">{{item.beReplied[0].user.nickname}}：</span>
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
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item"
               v-for="(item,index) in mvs"
               :key="index"
               @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover"
                   alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{item.playCount}}</div>
              </div>
              <span class="time">{{item.duration}}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  getMvDetail, getMvsDetails,
  getMvsComment, getSiMiMvs, getMvsList
} from '../api/api'
export default {
  name: 'mv',
  data () {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      url: '',
      //mv详情
      mvData: {},
      //热门评论
      hotComments: [],
      hotTotal: 0,
      //普通评论数
      comTotal: 0,
      comments: [],
      //相关mv
      mvs: []
    };
  },

  created () {
    this.MvDetail()
    this.MvsDetails()
    this.MvsComment()
    this.SiMiMvs()
    this.MvsList()
  },
  methods: {
    //获取mv
    MvDetail () {
      getMvDetail(this.$route.query.id).then(res => {
        // console.log(res);
        this.url = res.data.data.url
      })
    },
    //mv详情
    MvsDetails () {
      getMvsDetails(this.$route.query.id).then(res => {
        // console.log(res);
        this.mvData = res.data.data
      })
    },
    //获取mv评论
    MvsComment () {
      getMvsComment(this.$route.query.id,
        this.limit, (this.page - 1) * this.limit).then(res => {
          // console.log(res);
          this.hotComments = res.data.hotComments;
          this.hotTotal = this.hotComments.length;
          this.comments = res.data.comments;
          this.total = res.data.total;
        })

    },
    //获取相关mv
    SiMiMvs () {
      getSiMiMvs(this.$route.query.id).then(res => {
        // console.log(res);
        this.mvs = res.data.mvs;
        //格式化播放量
        for (let i = 0; i < this.mvs.length; i++) {
          if (this.mvs[i].playCount > 100000) {
            this.mvs[i].playCount = parseInt(this.mvs[i].playCount / 10000) + '万'
          }
          //格式化视频时长
          let duration = this.mvs[i].duration;
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = '0' + min
          }
          let sec = parseInt(duration / 1000 % 60)
          if (sec < 10) {
            sec = '0' + sec
          }
          //console.log(min+" "+sec)
          this.mvs[i].duration = `${min}:${sec}`
        }
      })
    },

    //获取mv的评论列表 
    MvsList () {
      getMvsList(this.$route.query.id,
        this.limit, (this.page - 1) * this.limit).then(res => {

          this.hotComments = res.data.hotComments;
          this.comments = res.data.comments;

          // for (let i = 0; i < this.comments.length; i++) {
          //   var unixTimestamp = new Date(this.comments[i].time);
          //   //重载方法
          //   //时间补零格式化
          //   Date.prototype.toLocaleString = function () {
          //     this.hour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
          //     this.minute = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
          //     this.second = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();
          //     return this.getFullYear() + "/"
          //       + (this.getMonth() + 1) + "/"
          //       + this.getDate() +
          //       "/ " + this.hour + ":"
          //       + this.minute + ":"
          //       + this.second;
          //   };
          //   this.comments[i].time = unixTimestamp.toLocaleString();
          // }
        })
    },
    //去mv详情
    toMv (id) {
      this.$router.push(`/mv?id=${id}`)
    },
    //已挂载全局使用时间格式化
    // dateFormat: function (time) {
    //   var date = new Date(time);
    //   var year = date.getFullYear();
    //   var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    //   var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    //   var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    //   var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    //   var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //   // 拼接
    //   return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
    // },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.MvsList()
    }
  }
};
</script>

<style>
.mv-container {
  display: flex;
}

.mv-container .title {
  margin-bottom: 20px;
}

.mv-container .mv-wrap {
  width: 700px;
  margin-right: 35px;
}

.mv-container .mv-wrap .date {
  margin-right: 25px;
}

.mv-container .mv-wrap .date,
.mv-container .mv-wrap .number {
  color: #bebebe;
  font-size: 14px;
}

.mv-container .mv-wrap .video-wrap {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
}

.mv-container .mv-wrap .video-wrap video {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  outline: none;
}

.mv-container .mv-wrap .info-wrap {
  margin-bottom: 50px;
}

.mv-container .mv-wrap .info-wrap .singer-info {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}

.mv-container .mv-wrap .info-wrap .singer-info .avatar-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
}

.mv-container .mv-wrap .info-wrap .singer-info .avatar-wrap img {
  height: 100%;
}

.mv-container .mv-wrap .info-wrap .mv-info .title {
  font-size: 30px;
}

.mv-container .mv-wrap .info-wrap .mv-info .desc {
  font-size: 15px;
  margin-top: 20px;
}

.mv-container .mv-wrap .comment-wrap {
  margin-bottom: 70px;
}

.mv-container .mv-wrap .comment-wrap .title {
  font-size: 25px;
}

.mv-container .mv-wrap .comment-wrap .title .number {
  color: black;
  font-size: 20px;
}

.mv-container .mv-wrap .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.mv-container .mv-wrap .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.mv-container .mv-wrap .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.mv-container .mv-wrap .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .content,
.mv-container .mv-wrap .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}

.mv-container .mv-recommend {
  flex: 1;
}

.mv-container .mv-recommend .mvs .items {
  display: flex;
  flex-wrap: wrap;
}

.mv-container .mv-recommend .mvs .items .item {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.mv-container .mv-recommend .mvs .items .item:hover {
  background-color: #f5f5f5;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap {
  width: 180px;
  position: relative;
  margin-right: 10px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap > .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.mv-container .mv-recommend .mvs .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap {
  flex: 1;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
