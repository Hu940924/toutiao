<template>
  <div class="article-list">
    <!-- 文章列表 -->
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh" :success-text="refreshsueecssText" :success-duration="1500">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :error.sync="error" error-text="请求失败，点击重新加载" @load="onLoad">
        <article-item :article="article" v-for="(article, index) in list" :key="index" />
      </van-list>
    </van-pull-refresh>
    <!-- /文章列表 -->

  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 文章列表
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载的结束状态
      timestamp: null, // 请求获取下一页的时间戳
      error: false, // 是否加载失败，加载失败后点击错误提示可以重新
      isRefreshLoading: false, // 控制下拉刷新的 loading 状态 
      refreshsueecssText: '刷新成功',  // 刷新后显示的文本
    }
  },
  created () {

  },
  mounted () { },
  methods: {
    // 滚动条与底部距离小于 offset 时触发
    async onLoad () {
      // 请求获取数据
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      if (res.status === 200) {
        // 把请求结果数据放到 list 数组中
        const { results } = res.data.data
        this.list.push(...results)
        // 本次数据加载结束后要把加载状态设置为结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (results.length) {
          this.timestamp = res.data.data.pre_timestamp
        } else {
          // 没有数据了，将 finished 设置为 true，不再 load 加载更多数据
          this.finished = true
        }
      } else {
        // 展示请求失败
        this.error = true
        // 请求失败了，loading 也要关闭
        this.loading = false
      }
    },
    // 下拉刷新时触发
    async onRefresh () {
      const res = await getArticles({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1
      })
      if (res.status === 200) {
        // 将数据追加到列表的顶部
        const { results } = res.data.data
        this.list.unshift(...results)
        // 关闭下拉刷新的 loading 状态
        this.isRefreshLoading = false
        // 更相信下拉刷新成功提示文本
        this.refreshsueecssText = `刷新成功，刷新了${results.length}条数据`
      } else {
        this.isRefreshLoading = true
        this.refreshsueecssText = '刷新失败了'
      }
    }
  },
  computed: {},
  components: {
    ArticleItem
  },
  watch: {}
}
</script>

<style lang='less' scoped>
.article-list {
  height: calc(100vh - 180px - 100px);
  overflow: auto;
}
</style>
