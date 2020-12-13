<template>
  <div>
    <!-- 登录的头部 -->
    <div v-if="user" class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" :src="userInfo.photo" round />
          <span class="name">{{userInfo.name}}</span>
        </div>
        <div class="right">
          <van-button class="info-btn" round size="mini" type="default">编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <span class="count">{{userInfo.art_count}}</span>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.follow_count}}</span>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.fans_count}}</span>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <span class="count">{{userInfo.like_count}}</span>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <!-- /登录的头部 -->
    <!-- 未登录的头部 -->
    <div v-else class="header not-login" @click="$router.push('/login')">
      <div class="login-btn">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登陆 / 注册</span>
      </div>
    </div>
    <!-- /未登录的头部 -->

    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="grid-nav">
      <van-grid-item class="collection">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收 藏</span>
      </van-grid-item>
      <van-grid-item class="annals">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历 史</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格导航 -->

    <!-- 单元格导航 -->
    <div class="cell-nav">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <!-- /单元格导航 -->

    <!-- 退出按钮 -->
    <van-button block class="logout-btn" @click="logout">退出登录</van-button>
    <!-- /退出按钮 -->
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'MyIndex',
  props: {},
  data () {
    return {
      userInfo: []
    }
  },
  created () {
    this.loaderUerInfo()
  },
  mounted () { },
  methods: {
    // 获取用户资料
    async loaderUerInfo () {
      const res = await getUserInfo()
      if (res.status === 200) {
        this.userInfo = res.data.data
      } else {
        this.$toast('获取数据失败，请稍后重试！')
      }
    },
    // 点击退出按钮，退出登录
    logout () {
      this.$dialog.confirm({
        title: '确认退出吗？',
      }).then(() => {
        // 确认退出，清除登录状态
        this.$store.commit('setUser', null)
      }).catch(() => { });
    }
  },
  computed: {
    ...mapState(['user'])
  },
  components: {},
  watch: {}
}
</script>

<style lang='less' scoped>
.layout-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 158px;
        height: 158px;
        margin-bottom: 20px;
      }
      .text {
        font-size: 32px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
          margin-right: 23px;
        }
        .name {
          color: #fff;
          font-size: 34px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .info-btn {
          height: 40px;
          color: #858585;
          letter-spacing: 0.1em;
          padding: 5px 18px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 132px;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #fff;
        span.count {
          font-size: 36px;
        }
        span.text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .collection {
      i.toutiao {
        font-size: 46px;
        color: #eb5253;
      }
      span.text {
        font-size: 28px;
      }
    }
    .annals {
      i.toutiao {
        font-size: 46px;
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .cell-nav {
    margin: 10px 0;
  }
  .logout-btn {
    height: 110px;
    font-size: 36px;
    color: #e49595;
  }
}
</style>
