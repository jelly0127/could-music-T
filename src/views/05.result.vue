<template>
  <!-- 搜索模块 -->
  <div class="result-container">
    <div class="title-wrap">
      <!-- 歌曲 -->
      <h2 class="title">{{$route.query.query}}</h2>
      <span class="sub-title">找到{{songCount}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲"
                   name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row"
                v-for="(item,index) in songList"
                :key="index"
                @dblclick="play(item.id)">
              <td>{{index+1}}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{item.name}}</span>
                    <!-- mv的图标 -->
                    <span v-if="item.mvid!=0"
                          class="iconfont icon-mv"></span>
                  </div>
                  <span v-if="item.alias.length!=0">{{item.alias[0]}}</span>
                </div>
              </td>
              <td>{{item.artists[0].name}}</td>
              <td>{{item.album.name}}</td>
              <td>{{item.duration}}</td>
            </tr>
          </tbody>
        </table>
        <!-- 歌单 -->
      </el-tab-pane>
      <el-tab-pane label="歌单"
                   name="lists">
        <div class="items">
          <div class="item"
               v-for="(item,index) in playList"
               :key="index"
               @click="toPlayList(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount}}</span>
              </div>
              <img :src="item.coverImgUrl"
                   alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </el-tab-pane>
      <!-- mv -->
      <el-tab-pane label="MV"
                   name="mv">
        <div class="items mv">
          <div class="item"
               v-for="(item,index) in mvList"
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
              <span class="time">02:43</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{item.name}}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>

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
</template>

<script>
import { getComment, getMusicLyric, getSearch, playSongs, getMusicDetail } from '../api/api'
export default {
  name: 'result',
  data () {
    return {
      activeIndex: 'songs',
      total: 0,
      page: 1,
      limit: 10,
      //歌曲查询结果
      songList: [],
      playList: [],
      mvList: [],
      //搜索结果总数
      songCount: 0,
      type: 1
    }
  },
  watch: {
    activeIndex () {
      this.page = 1;

      switch (this.activeIndex) {
        case 'songs':
          this.type = 1;
          break;
        case 'lists':
          this.type = 1000;
          break;
        case 'mv':
          this.type = 1004;
          break;
        default:
          break;
      }
      this.search()
    }
  }, mounted () {
    //搜索接口
    this.search();
  },
  created () {

  },
  methods: {
    // 搜索
    search () {
      getSearch(this.$route.query.query,
        this.type, this.limit,
        (this.page - 1) * this.limit).then(res => {
          console.log(res);
          if (res.data.hasOwnProperty('msg')) {
            this.$message.waring('搜索内容错误')
          } else if (this.type == 1) {
            this.songList = res.data.result.songs;
            this.songCount = res.data.result.songCount
            this.total = res.data.result.songCount
            //分化零
            for (let i = 0; i < this.songList.length; i++) {
              let duration = this.songList[i].duration;
              let min = parseInt(duration / 1000 / 60);
              if (min < 10) {
                min = '0' + min
              }
              //秒化零
              let sec = parseInt(duration / 1000 % 60)
              if (sec < 10) {
                sec = '0' + sec
              }
              //console.log(min+" "+sec)
              this.songList[i].duration = `${min}:${sec}`
            }
          } else if (this.type == 1000) {
            this.playList = res.data.result.playlists;
            this.total = res.data.result.playlistCount
            for (let i = 0; i < this.playList.length; i++) {
              if (this.playList[i].playCount > 100000) {
                this.playList[i].playCount = parseInt(this.playList[i].playCount / 10000) + '万'
              }
            }
          } else if (this.type == 1004) {
            this.mvList = res.data.result.mvs;
            this.total = res.data.result.mvCount
            for (let i = 0; i < this.mvList.length; i++) {
              if (this.mvList[i].playCount > 100000) {
                this.mvList[i].playCount = parseInt(this.mvList[i].playCount / 10000) + '万'
              }
            }
          }
        }).catch(err => {
          console.log(err);
        })
    },
    //获取歌曲详情
    musicDetail (id) {
      // console.log(id);
      getMusicDetail(id).then(res => {
        // console.log(res.data.songs[0]);
        this.$parent.songs.url = res.data.songs[0].al.picUrl
        this.$parent.songs.name = res.data.songs[0].name
        this.$parent.name = res.data.songs[0].ar[0].name
        // this.$parent.musicName = res.data.songs[0].alia[0].name
        // console.log(res.data.songs[0].alia[0]);
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
        // console.log(this.$parent.musicUrl)
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url
      })
      this.getLyric(id)
      this.Comments(id)
      this.musicDetail(id)
    },

    //点击歌单详情id
    toPlayList (id) {
      this.$router.push(`/playlist?id=${id}`)
    },

    //去mv详情
    toMv (id) {
      this.$router.push(`/mv?id=${id}`)
    },

    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.search()
    }

  }
}
</script>

<style >
.result-container .title-wrap {
  display: flex;
  align-items: flex-end;
  margin-bottom: 30px;
}

.result-container .title-wrap .title {
  margin-right: 10px;
}

.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}

.result-container .el-tabs__item {
  font-size: 18px;
}

.result-container .el-table td,
.result-container .el-table th.is-leaf {
  border-bottom: none;
}

.result-container .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.result-container .items .item {
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}

.result-container .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.result-container .items .item .img-wrap > .icon-play {
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

.result-container .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.result-container .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.result-container .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.result-container .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.result-container .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.result-container .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.result-container .items .item .name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.result-container .items .item .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.result-container .items.mv .item {
  width: 250px;
}
</style>
