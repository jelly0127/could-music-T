<template>
  <!-- 最新音乐模块 -->
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item"
            :class="{ active: tag == '0' }"
            @click="tag = '0'">全部</span>
      <span class="item"
            :class="{ active: tag == '7' }"
            @click="tag = '7'">华语</span>
      <span class="item"
            :class="{ active: tag == '96' }"
            @click="tag = '96'">欧美</span>
      <span class="item"
            :class="{ active: tag == '8' }"
            @click="tag = '8'">日本</span>
      <span class="item"
            :class="{ active: tag == '16' }"
            @click="tag = '16'">韩国</span>
    </div>
    <!-- 底部的table -->
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
            v-for="(item, index) in list"
            :key="index">
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img :src="item.album.picUrl"
                   alt="" />
              <span class="iconfont icon-play"
                    @click="play(item.id)"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{ item.album.name }}</span>
            </div>
          </td>
          <td>{{ item.artists[0].name }}</td>
          <td>{{ item.album.name }}</td>
          <td>{{ item.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getComment,
  getMusicLyric,
  songLists,
  playSongs,
  getMusicDetail,
} from '../api/api'
export default {
  name: 'songs',
  data () {
    return {
      list: [],
      tag: '0',
    }
  },
  //侦听器
  watch: {
    tag () {
      // console.log(this.tag)
      this.songList()
    },
  },
  created () {
    //最新音乐数据
    this.songList()
  },
  methods: {
    songList () {
      songLists(this.tag).then((res) => {
        // console.log(res);
        this.list = res.data.data
        // 格式化歌曲时间

        for (let i = 0; i < this.list.length; i++) {
          //分补零
          let duration = this.list[i].duration

          let min = parseInt(duration / 1000 / 60)
          if (min < 10) {
            min = '0' + min
          }
          //秒补零
          let sec = parseInt((duration / 1000) % 60)
          if (sec < 10) {
            sec = '0' + sec
          }
          this.list[i].duration = `${min}:${sec}`
        }
      })
    },
    //获取歌曲详情
    musicDetail (id) {
      // console.log(id);
      getMusicDetail(id).then((res) => {
        // console.log(res.data.songs[0]);
        this.$parent.songs.url = res.data.songs[0].al.picUrl
        this.$parent.songs.name = res.data.songs[0].al.name
        this.$parent.name = res.data.songs[0].ar[0].name
        // this.$parent.musicName = res.data.songs[0].alia[0].name
        // console.log(res.data.songs[0].alia[0]);
      })
    },
    //获取歌词
    getLyric (id) {
      getMusicLyric(id).then((res) => {
        // console.log(res);
        let lyrics = res.data.lrc.lyric
        // 对获取到的歌词进行处理
        let arr = lyrics.split('\n')
        let array = []
        // let obj = {};
        let time = ''
        let value = ''
        let result = []
        //去除空行
        arr.forEach((item) => {
          if (item != '') {
            array.push(item)
          }
        })
        arr = array
        arr.forEach((item) => {
          time = item.split(']')[0]
          value = item.split(']')[1]
          //去掉时间里的中括号得到xx:xx.xx
          var t = time.slice(1).split(':')
          //将结果压入最终数组
          result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value])
        })
        this.lyric = result
        // console.log(result);
        this.$parent.lyric = result
      })
    },
    //歌曲评论
    Comments (id) {
      getComment(id).then((res) => {
        // console.log(res.data.comments);
        // this.$bus.$emit('comments', res.data.comments)
        // this.$bus.$emit('hotComments', res.data.hotComments)
        this.$parent.comments = res.data.comments
        this.$parent.total = res.data.total
        this.$parent.hotComments = res.data.hotComments
      })
    },
    //点击播放歌曲
    play (id) {
      // console.log(id);
      playSongs(id).then((res) => {
        // console.log(res)
        let url = res.data.data[0].url
        // console.log(this.$parent.musicUrl)
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url
      })
      this.musicDetail(id)
      this.getLyric(id)
      this.Comments(id)
    },
  },
}
</script>

<style>
.songs-container {
  height: 100vh;
}
.songs-container .tab-bar {
  display: flex;
  justify-content: flex-end;
}

.songs-container .tab-bar .item {
  font-size: 15px;
  color: gray;
  margin-right: 20px;
  cursor: pointer;
}

.songs-container .tab-bar .item.active {
  color: #dd6d60;
}

.songs-container .song-table .song-wrap > span {
  margin-top: 20px;
  display: inline-block;
  color: #bebebe;
}

.songs-container .song-table .song-wrap .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.songs-container .song-table .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}

.songs-container .song-table .img-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.songs-container .song-table .img-wrap .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.songs-container .song-table .img-wrap .icon-play::before {
  transform: translateX(1px);
}
</style>
