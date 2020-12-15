<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="header-nav-bar" fixed>
      <van-button class="search-btn" slot="title" type="info" size="small" round icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <!-- 文章列表 -->
      <van-tab :title="channel.name" v-for="(channel, index) in channels" :key="index">
        <article-list :channel="channel" />
      </van-tab>
      <!-- /文章列表 -->
      <!-- 面包按钮 -->
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hanburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- /面包按钮 -->
    </van-tabs>
    <!-- /频道列表 -->

  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from './components/article-list'
export default {
  name: 'HomeIndex',
  props: {},
  data () {
    return {
      active: 0, // 控制导航栏切换
      channels: [], // 频道列表
    }
  },
  created () {
    this.getChannels()
  },
  mounted () { },
  methods: {
    async getChannels () {
      const res = await getUserChannels()
      if (res.status !== 200) {
        return this.$toast('获取频道信息失败！')
      }
      this.channels = res.data.data.channels
    }
  },
  computed: {},
  components: {
    ArticleList
  },
  watch: {}
}
</script>

<style lang='less' scoped>
.home-container {
  padding-bottom: 100px;

  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #55a7ff;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs {
    margin-top: 92px;
    .van-tabs__content {
      min-height: 79vh;
    }
    .van-tabs__nav {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      padding: 0;
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
    .hanburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &::before {
        position: absolute;
        left: 0;
        content: '';
        width: 1px;
        height: 100%;
        background: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
