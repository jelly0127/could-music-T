<template>
  <div class="login_container">
    <div class="login_box">
      <div class="back"
           @click="backClick">
        <i class="el-icon-close"></i>
      </div>
      <div class="login_icon">
        <i class="wyy_logo">
          <!-- <img src="../assets/网易云音乐.png"> -->
          <svg t="1638867598434"
               class="icon"
               viewBox="0 0 1024 1024"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               p-id="4834"
               width="60"
               height="60">
            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                  fill="#E82202"
                  p-id="4835"></path>
            <path d="M840.256 469.184a265.408 265.408 0 0 0-44.16-88.448 317.376 317.376 0 0 0-85.248-76.416 236.8 236.8 0 0 0-111.296-32.704l-16.32-61.248a31.36 31.36 0 0 1 8.384-28.288 44.032 44.032 0 0 1 28.288-14.592 80.128 80.128 0 0 1 44.16 14.592c4.928 2.624 8.384 6.784 13.248 10.112a44.8 44.8 0 0 0 64.512-54.784 51.776 51.776 0 0 0-17.664-21.632 184.192 184.192 0 0 0-69.376-33.472 132.672 132.672 0 0 0-68.48 0.896 129.152 129.152 0 0 0-47.296 29.184 126.848 126.848 0 0 0-32 40.192 122.048 122.048 0 0 0-6.784 88.448l10.624 40.832a221.312 221.312 0 0 0-122.816 84.864 199.808 199.808 0 0 0-33.536 121.92 193.088 193.088 0 0 0 10.624 57.6 159.424 159.424 0 0 0 62.72 81.344 144.512 144.512 0 0 0 105.984 19.84 150.592 150.592 0 0 0 121.6-152.896l-4.416-25.6c-9.28-35.776-19.2-71.104-27.84-106.496a139.264 139.264 0 0 1 37.056 14.144 246.144 246.144 0 0 1 37.056 27.2 186.496 186.496 0 0 1 56.128 86.144 220.48 220.48 0 0 1 0 122.496 196.224 196.224 0 0 1-16.832 39.744 239.808 239.808 0 0 1-130.752 112.192 302.016 302.016 0 0 1-101.184 18.112 258.432 258.432 0 0 1-120.64-29.184A285.824 285.824 0 0 1 251.456 600.384a289.792 289.792 0 0 1-15.936-140.8A284.48 284.48 0 0 1 416.256 231.616a44.8 44.8 0 0 0 10.112-77.76A59.072 59.072 0 0 0 376.896 151.232 372.928 372.928 0 0 0 153.344 416.576a380.032 380.032 0 0 0 100.288 350.336 353.472 353.472 0 0 0 193.536 102.4 364.032 364.032 0 0 0 107.392 0 353.472 353.472 0 0 0 146.24-51.2 332.096 332.096 0 0 0 132.544-162.56 323.264 323.264 0 0 0 17.664-84.864 294.4 294.4 0 0 0-10.752-101.504zM519.488 561.536a56.064 56.064 0 0 1-44.16-8.384 76.8 76.8 0 0 1-29.184-47.616 132.352 132.352 0 0 1 0-51.2 103.808 103.808 0 0 1 26.048-49.472 140.8 140.8 0 0 1 62.72-36.224l30.464 115.2a161.792 161.792 0 0 1 4.032 20.416 61.824 61.824 0 0 1-49.92 57.28z"
                  fill="#FFFFFF"
                  p-id="4836"></path>
          </svg>
        </i>
        <h3>网易云音乐</h3>
      </div>
      <!--        登录-->
      <el-form :model="login"
               :rules="loginRules"
               ref="longinRuleForm"
               label-width="80px"
               v-show="loginShow">
        <el-form-item label="手机号:"
                      prop="phone">
          <el-input v-model="login.phone"
                    placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="密码: "
                      prop="password">
          <el-input type="password"
                    v-model="login.password"
                    placeholder="请输入密码" />
        </el-form-item>
      </el-form>
      <!--        注册-->
      <el-form :model="login"
               :rules="loginRules"
               ref="registerRuleForm"
               label-width="80px"
               v-show="!loginShow">
        <el-form-item label="手机号: "
                      prop="phone">
          <el-input v-model="login.phone"
                    placeholder="注册的手机号码" />
        </el-form-item>
        <el-form-item label="密码: "
                      prop="password">
          <el-input type="password"
                    v-model="login.password"
                    placeholder="验证码" />
        </el-form-item>
      </el-form>
      <div class="login_button">
        <el-button type="danger"
                   :loading="LoginLoading"
                   :disabled="btnHide"
                   :style="{ width: '250px' }"
                   @click="loginPwd">{{ loginShow ? '登录' : '点击注册' }}</el-button>
        <el-button type="primary"
                   :style="{ width: '250px' }">{{
          loginShow ? '注册' : '返回登录'
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { loginInfo } from '../api/api'
export default {
  name: 'Login',
  components: {},
  props: {},
  data () {
    return {
      LoginLoading: false,
      btnHide: false,
      loginShow: true,
      isBack: false,
      login: {
        phone: '18276426127',
        password: 'CGL123456',
      },
      loginRules: {
        phone: [
          { required: true, message: '手机号码不能为空', trigger: 'change' },
          {
            pattern: /^1(3|5|7|8|9)\d{9}$/,
            message: '请输入正确的号码格式',
            trigger: 'change',
          },
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'change' },
          {
            min: 6,
            max: 18,
            message: '请输入6 - 18 位数的密码',
            trigger: 'change',
          },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  created () { },
  methods: {
    loginPwd () {
      this.$refs.longinRuleForm.validate(async (vaild) => {
        if (!vaild) return this.$message.error('验证失败!重新输入~')
        this.loginInfo()
      })
    },
    loginInfo () {
      this.LoginLoading = true
      this.btnHide = true
      loginInfo(this.login)
        .then((res) => {
          console.log(res)
          console.log(1111111, "登录成功");
          //将接口返回的用户相关数据放到本地存储,方便应用数据共享
          window.localStorage.setItem('user', JSON.stringify(res.data.token))
          window.localStorage.setItem('id', res.data.account.id)
          this.$message.success('登录成功')
          this.$router.push('/')
          if (location.href.indexOf('#reloaded') == -1) {
            location.href = location.href + '#reloaded'
            location.reload()
          }
          this.$router.push('/users')
        })
        .catch((err) => {
          console.log('登录失败', err)
          this.$message.error('登录失败，手机号或密码码错误')
        })
      this.LoginLoading = false
      this.btnHide = false
    },
    backClick () {
      this.$router.back()
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
  // background: rgba(0, 0, 0, 0.5);
  .login_box {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: box_scale 0.1s;
    padding: 5px;
    width: 400px;
    height: 550px;
    background: rgba(0, 0, 0, 0.05);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    .back {
      position: absolute;
      top: 10px;
      right: 20px;
    }
    .el-icon-close {
      font-size: 20px;
    }
    &:hover {
      animation: box_rotate 0.1s;
      color: red;
    }
    .login_icon {
      text-align: center;
      h3 {
        margin: 10px 0 60px;
        font-size: 50px;
      }
      .wyy_logo {
        display: inline-block;
        margin-top: 30px;
        width: 60px;
        height: 60px;
      }
    }

    .el-input {
      margin-left: -35px;
      width: 250px;
    }
    .login_button {
      text-align: center;
      padding: 0 0 0 45px;
      margin: 10px auto;
      .el-button {
        margin: 10px 0;
      }
    }
  }
}
</style>
