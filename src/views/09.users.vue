<template>
  <div class='users-container'>

    <div class="userInfoBox">
      <el-card class="box-card">
        <div class="img">
          <img :src="userInfo.url"
               alt="">
        </div>

        <div class="detail">
          <h3>云昵称：{{userInfo.name}}</h3>
          <h4>云id:{{userInfo.id}}</h4>
          <h4>创建时间:{{dateFormat(userInfo.createTime)}}</h4>
          <h4>已创建:{{userInfo.createDays}}天了</h4>
        </div>
      </el-card>
    </div>

  </div>
</template>

<script>
import { getUser } from '../api/api'
export default {
  name: 'user',
  components: {},
  props: {},
  data () {
    return {
      userInfo: {
        url: '',
        name: '',
        id: '',
        createTime: '',
        createDays: ''
      },
    };
  },
  computed: {

  },
  watch: {},
  created () {
    this.getUserInfo()
  },
  mounted () {

  },
  methods: {
    getUserInfo () {
      const uid = window.localStorage.getItem('id')
      getUser(uid).then(res => {
        this.userInfo.url = res.data.profile.avatarUrl
        this.userInfo.name = res.data.profile.nickname
        this.userInfo.id = res.data.profile.userId
        this.userInfo.createTime = res.data.profile.createTime
        this.userInfo.createDays = res.data.createDays
        // this.$router.push('/')
        // console.log(res);
        // this.$bus.$emit('user', this.userInfo)

      })
    },

  },
};
</script>

<style lang='less' scoped>
.users-container {
  .userInfoBox {
    position: relative;
    .detail {
      position: absolute;
      margin-top: -170px;
      margin-left: 200px;
      height: 200px;
      width: 200px;
    }
    .img {
      height: 180px;
      width: 180px;
      // background-color: pink;
      border-radius: 50%;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>