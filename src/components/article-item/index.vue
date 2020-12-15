<template>
  <van-cell class="article-item">
    <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
    <div slot="label">
      <div class="cover-wrap" v-if="article.cover.type === 3">
        <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
          <van-image fit="cover" class="cover-item-img" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <van-image fit="cover" class="right-cover" slot="default" v-if="article.cover.type === 1" :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {
  },
  computed: {},
  components: {},
  watch: {}
}
</script>

<style lang='less' scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    padding-left: 5px;
    width: 231px;
    height: 146px;
  }
  .right-cover {
    width: 231px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    margin-right: 25px;
    color: #b4b4b4;
  }
  .cover-wrap {
    display: flex;
    .cover-item {
      flex: 1;
      padding: 15px 0 30px;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      .cover-item-img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
