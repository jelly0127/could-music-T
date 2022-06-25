<template>
  <!-- 推荐歌单的音乐详情模块 -->
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="detail.coverImgUrl" />
      </div>
      <div class="info-wrap">
        <p class="title">{{detail.name}}</p>
        <div class="author-wrap"
             v-if="detail.creator!=undefined">
          <img class="avatar"
               :src="detail.creator.avatarUrl" />
          <span class="name">{{detail.creator.nickname}}</span>
          <span class="time">{{detail.createTime}}</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in detail.tags"
                :key="index">{{item}}</li>
            <!-- <li>怀旧</li>
            <li>感动</li> -->
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <!-- 简介 -->
          <span class="desc">{{detail.description}}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表"
                   name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item,index) in detail.tracks"
                :key="index"
                @click="play(item.id)">
              <td>{{index+1}}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span></span>
                </div>
              </td>
              <td>{{item.ar[0].name}}</td>
              <td>{{item.al.name}}</td>
              <td>{{item.dt}}</td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="'评论'+(TotalSum)"
                   name="2">
        <!-- 热门评论 -->
        <div class="comment-wrap"
             v-if="hotComments.length!=0">
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
          <p class="title">最新评论<span class="number">({{comTotal}})</span></p>
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import { getComment, getMusicLyric, getListDetail, getHotComment, getNewComment, playSongs, getMusicDetail } from '../api/api'
export default {
  name: 'playlist',
  data () {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      limit: 10,
      //歌单详情数据
      detail: {},
      hotComments: [],
      //热评
      hotTotal: 0,
      //普通评论数
      comTotal: 0,
      //回复
      comments: [],
      //总评论数
      TotalSum: 0,
    };
  },
  created () {
    //歌单详情列表
    this.listDetail()
    //热评
    this.HotComments()
    //最新评论
    this.getNewList()


  },
  methods: {
    //歌单详情
    listDetail () {
      getListDetail(this.$route.query.id).then(res => {
        // console.log(res);
        this.detail = res.data.playlist
        let arr = this.detail.tracks;
        for (let i = 0; i < arr.length; i++) {
          let duration = arr[i].dt;
          //分补零  
          let min = parseInt(duration / 1000 / 60);
          if (min < 10) {
            min = '0' + min
          }
          //秒补零
          let sec = parseInt(duration / 1000 % 60)
          if (sec < 10) {
            sec = '0' + sec
          }
          //console.log(min+" "+sec)
          this.detail.tracks[i].dt = `${min}:${sec}`
        }
      })
    },
    //获取歌曲详情
    musicDetail (id) {
      // console.log(id); 
      getMusicDetail(id).then(res => {
        // console.log(res.data.songs[0]);
        this.$parent.songs.url = res.data.songs[0].al.picUrl
        this.$parent.songs.name = res.data.songs[0].al.name
        this.$parent.name = res.data.songs[0].ar[0].name
        this.$parent.musicName = res.data.songs[0].alia[0].name
        // console.log(res.data.songs[0].alia[0]);
      })
    },
    //热评
    HotComments () {
      getHotComment(this.$route.query.id, 2).then(res => {
        // console.log(res);
        this.hotComments = res.data.hotComments
        this.hotTotal = res.data.total
      })
    },
    //分页评论数   最新评论
    getNewList () {
      getNewComment(this.$route.query.id, this.limit,
        (this.page - 1) * this.limit).then(res => {
          // console.log(res);
          this.comTotal = res.data.total
          this.total = res.data.total
          this.comments = res.data.comments
          this.TotalSum = this.comTotal + this.hotTotal
        })
    },
    //获取歌词
    getLyric (id) {
      getMusicLyric(id).then(res => {
        // console.log(res);
        let lyrics = res.data.lrc.lyric;
        // 对获取到的歌词进行处理
        let arr = lyrics.split("\n");
        let array = [];
        // let obj = {};
        let time = "";
        let value = "";
        let result = [];
        //去除空行
        arr.forEach((item) => {
          if (item != "") {
            array.push(item);
          }
        });
        arr = array;
        arr.forEach((item) => {
          time = item.split("]")[0];
          value = item.split("]")[1];
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(":");
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
        });
        this.lyric = result;
        // console.log(result);
        this.$parent.lyric = result
      })
    },
    //歌曲评论
    Comments (id) {
      getComment(id).then(res => {
        // console.log(res.data.comments);
        // this.$bus.$emit('comments', res.data.comments)
        // this.$bus.$emit('hotComments', res.data.hotComments)
        this.$parent.comments = res.data.comments
        this.$parent.total = res.data.total
        this.$parent.hotComments = res.data.hotComments
      })
    },
    //点击播放音乐
    play (id) {
      // console.log(id);
      playSongs(id).then(res => {
        // console.log(res);
        let url = res.data.data[0].url
        if (url == null || url == "" || url == undefined) {
          this.$message({
            message: '您没有取得权限！',
            type: 'warning'
          })
        } else {// console.log(this.$parent.musicUrl)
          // 设置给父组件的 播放地址
          this.$parent.musicUrl = url
        }
        this.musicDetail(id)
        this.getLyric(id)
        this.Comments(id)
      })
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getNewList()
    }
  }
};
</script>

<style >
.playlist-container {
  margin: auto;
  padding-top: 40px;
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
