<template>
  <!-- 发现音乐模块 -->
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class=""
                 :interval="4000"
                 type="card">
      <el-carousel-item v-for="(item,index) in banners"
                        :key="index">
        <img :src="item.imageUrl" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item"
             v-for="(item,index) in list"
             :key="index"
             @click="toPlayList(item.id)">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{item.copywriter}}</span>
            </div>
            <img :src="item.picUrl"
                 alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>

      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item"
             v-for="(item,index) in songs"
             :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" />
            <span />
            <span @click="play(item.id)"
                  class="iconfont icon-play"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>

      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item"
             v-for="(item,index) in mv"
             :key="index"
             @click="toMv(item.id)">
          <div class="img-wrap">
            <img :src="item.picUrl"
                 alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  getComment,
  getBanner, getPersonalized,
  getNewSongs, getMvs, playSongs, getMusicDetail, getMusicLyric
} from '../api/api'
export default {
  name: 'discovery',
  data () {
    return {
      //轮播图
      banners: [],
      //推荐歌单
      list: [],
      //最新歌曲
      songs: [],
      //推荐mv
      mv: [],
      lyric: [],
    }
  },
  created () {
    this.banner(),
      this.personalized(),
      this.newSong(),
      this.mvs()
  },
  methods: {
    //歌曲评论
    Comments (id) {
      getComment(id).then(res => {
        console.log(res.data);
        // this.$bus.$emit('comments', res.data.comments)
        // this.$bus.$emit('hotComments', res.data.hotComments)
        this.$parent.comments = res.data.comments
        this.$parent.total = res.data.total
        this.$parent.hotComments = res.data.hotComments
      })
    },
    //获取歌曲详情
    musicDetail (id) {
      // console.log(id);
      getMusicDetail(id).then(res => {
        console.log(res.data.songs[0]);
        this.$parent.songs.url = res.data.songs[0].al.picUrl
        this.$parent.songs.name = res.data.songs[0].al.name
        this.$parent.name = res.data.songs[0].ar[0].name
        // this.$parent.musicName = res.data.songs[0].alia[0].name
        // console.log(res.data.songs[0].alia[0]);
      })
    },
    //轮播图
    banner () {
      getBanner().then(res => {
        this.banners = res.data.banners
      })
    },
    //推荐歌单
    personalized (limit) {
      getPersonalized(limit).then(res => {
        console.log(res);
        this.list = res.data.result
      })
    },
    //最新歌曲
    newSong () {
      getNewSongs().then(res => {
        this.songs = res.data.result
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
    //推荐mv
    mvs () {
      getMvs().then(res => {
        // console.log(res);
        this.mv = res.data.result
      })
    },
    //点击播放歌曲
    play (id) {
      playSongs(id).then(res => {
        console.log(res);
        let url = res.data.data[0].url;
        //设置给父组件的 播放地址
        this.$parent.musicUrl = url
        // console.log(url);
      })
      this.musicDetail(id)
      this.getLyric(id)
      this.Comments(id)
    },
    //点击去歌单详情
    toPlayList (id) {
      this.$router.push(`/playlist?id=${id}`)
    },
    //去mv详情
    toMv (id) {
      this.$router.push(`/mv?id=${id}`)
    }

  }
}
</script>

<style >
.discovery-container .el-carousel__container {
  height: 230px;
}

.discovery-container .el-carousel__item img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}

.discovery-container .title {
  margin-bottom: 20px;
  padding-left: 8px;
}

.discovery-container .recommend {
  margin-bottom: 40px;
}

.discovery-container .recommend .items {
  display: flex;
  flex-wrap: wrap;
}

.discovery-container .recommend .items .item {
  width: 200px;
  margin: 10px;
  position: relative;
  overflow: hidden;
}

.discovery-container .recommend .items .item img {
  width: 200px;
  height: 200px;
  border-radius: 5px;
}

.discovery-container .recommend .items .item .desc-wrap {
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  font-size: 16px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  max-height: 50px;
  padding: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  top: -50px;
}

.discovery-container .recommend .items .item .desc-wrap span {
  font-size: 14px;
}

.discovery-container .recommend .items .item:hover .desc-wrap {
  top: 0;
}

.discovery-container .recommend .items .item .img-wrap {
  position: relative;
}

.discovery-container .recommend .items .item .img-wrap .icon-play {
  position: absolute;
  right: 10px;
  bottom: 13px;
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

.discovery-container .recommend .items .item .img-wrap .icon-play::before {
  transform: translateX(3px);
}

.discovery-container .recommend .items .item .img-wrap:hover .icon-play {
  opacity: 1;
}

.discovery-container .recommend .items .item .name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 14px;
}

.discovery-container .news {
  margin-bottom: 40px;
}

.discovery-container .news .items {
  height: 500px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding-left: 15px;
}

.discovery-container .news .items .item {
  height: 100px;
  width: 50%;
  display: flex;
  align-items: center;
}

.discovery-container .news .items .item:hover {
  background-color: #f5f5f5;
}

.discovery-container .news .items .item .index {
  margin-right: 15px;
  font-size: 15px;
}

.discovery-container .news .items .item .img-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.discovery-container .news .items .item .img-wrap img {
  width: 80px;
  height: 80px;
}

.discovery-container .news .items .item .img-wrap .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  color: #dd6d60;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.discovery-container .news .items .item .img-wrap .iconfont::before {
  transform: translateX(3px);
}

.discovery-container .news .items .item .img-wrap:hover .iconfont {
  opacity: 1;
}

.discovery-container .news .items .item .song-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
  padding: 10px;
  font-size: 16px;
}

.discovery-container .news .items .item .song-wrap .singer {
  font-size: 14px;
  color: gray;
}

.discovery-container .mvs .items {
  display: flex;
  justify-content: space-around;
}

.discovery-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
}

.discovery-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.discovery-container .mvs .items .item .img-wrap > .icon-play {
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

.discovery-container .mvs .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.discovery-container .mvs .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.discovery-container .mvs .items .item .img-wrap img {
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}

.discovery-container .mvs .items .item .img-wrap .num-wrap {
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

.discovery-container .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.discovery-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
  margin-bottom: 5px;
}

.discovery-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
</style>
