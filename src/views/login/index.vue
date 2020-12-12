<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="header-nav-bar" title="登录" />
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="userRef">
      <!-- 表单区域 -->
      <van-field type="number" maxlength="11" v-model="user.mobile" name="mobile" placeholder="请输入手机号" :rules="userRules.mobile">
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field type="number" maxlength="6" v-model="user.code" name="code" placeholder="请输入验证码" :rules="userRules.code">
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <span class="vertical-line">|</span>
          <van-count-down class="show-count-down" v-if="isshoowCountDown" :time="1000 * 60" format="ss s" @finish="finish" />
          <van-button v-else native-type="button" class="send-sms-btn" round size="mini" type="default" @click="onsemdSms">获取验证码</van-button>
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn">
        <van-button block type="info" native-type="submit">登 录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  props: {},
  data () {
    return {
      user: { // 登录表单数据
        mobile: '13737353735',
        code: '246810'
      },
      userRules: { // 表单验证规则对象
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[34578][0-9]{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isshoowCountDown: false, // 控制显示验证倒计时
    }
  },
  methods: {
    // 点击登录按钮，发起登录请求
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data: res } = await login(this.user)
        this.$toast.success({
          message: '登陆成功！',
          onOpened: () => {
            this.$router.push('/my')
          }
        })
      } catch (err) {
        console.log(err);
        if (err.response.status === 400) {
          console.log('手机号或验证码错误！', err);
          // 手机号或验证码错误！
        } else {
          console.log('登录失败，请稍后重试！', err);
        }
      }
    },
    // 获取验证信息
    async onsemdSms () {
      // 验证手机号是否正确
      try {
        await this.$refs.userRef.validate('mobile')
      } catch (err) {
        this.$toast.fail('验证失败，请稍重试！')
      }
      // 显示倒计时
      this.isshoowCountDown = true
      // 发起请求，获取验证码
      try {
        await getSendSms(this.user.mobile)
        this.$toast('发送成功！')
      } catch (err) {
        // 发送失败，关闭验证码
        this.isshoowCountDown = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁，请稍后重试！')
        } else {
          this.$toast('验证失败，请稍后重试！')
        }
      }
    },
    // 验证倒计时接收后执行的函数
    finish () {
      this.isshoowCountDown = false
    }
  },
  computed: {},
}
</script>

<style lang='less' scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .van-cell .vertical-line {
    position: absolute;
    top: 0%;
    right: 170px;
    font-size: 50px;
    box-sizing: border-box;
    color: #f4f4f4;
  }
  .send-sms-btn {
    vertical-align: middle;
    width: 157px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
    background-color: #ededed;
    border: none;
  }
  .show-count-down {
    margin-right: 50px;
  }
  .login-btn {
    padding: 53px 33px;
    .van-button {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
