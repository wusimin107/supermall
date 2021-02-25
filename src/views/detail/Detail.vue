<template>
<!-- goodslistitem的itemClick点击跳转到detail页，详情页通过传过来的id（这里叫iid）再发送数据请求，这个页面的data：iid用于接受传过来的iid-->
   <div id="detail">
      <detail-nav-bar class="detail-nav"></detail-nav-bar>
      <scroll class="content" ref="scroll">
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
        <detail-param-info :paramInfo="itemParams"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
        <goods-list :goods="recommends"></goods-list>
      </scroll>
   </div>
 
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
import DetailParamInfo from './childComps/DetailParamInfo.vue'
import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'


import {getDetail ,getRecommend, Goods, Shop , GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils/utils'
import {itemListenerMixin} from 'common/utils/mixin.js'
import Scroll from 'components/common/scroll/Scroll.vue'





export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList 
    
   
  },
  data() {
  return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends:[],
      // itemImageListener:null mixins对象复用了
    }
  },
  mixins: [itemListenerMixin],
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res)
        //2.1获取顶部的图片轮播数据
        const data = res.result
      this.topImages = data.itemInfo.topImages
       console.log(this.topImages)
       //2.2获取商品信息
       this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
       //2.3创建店铺信息的对象
       this.shop = new Shop(data.shopInfo)
       //2.4取出详情信息
       this.detailInfo = data.detailInfo
       //2.5获取参数信息
       this.itemParams = data.itemParams
       //2.6获取评论信息
        if (data.rate.list) {
            this.commentInfo = data.rate.list[0];
          }


    })
     //3.请求推荐数据
    getRecommend().then(res => {
      console.log(res)
      this.recommends = res.data.list
      
    })
   
  },
  mounted() {
    console.log('detail的mounted')
    /**
     *  const refresh = debounce(this.$refs.scroll.refresh)
        this.itemImageListener = () => {
            refresh()
        }
        this.$bus.$on('itemImageLoad',this.itemImageListener)
        被mixins混入给复用代码了
     */
   
  },
  destroyed() {
    //在首页，取消监听是在deactivated里面，这个函数（和activated）只有在组件被keep-alive的时候才会被激活，我们在app.vue的时候已经exclude=detail了，所以无法执行deactivated函数，所以只能在destroyed
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  }
   
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff ;
    height: 100vh;

  }
  .content {
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>