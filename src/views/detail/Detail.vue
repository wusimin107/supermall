<template>
<!-- goodslistitem的itemClick点击跳转到detail页，详情页通过传过来的id（这里叫iid）再发送数据请求，这个页面的data：iid用于接受传过来的iid-->
   <div id="detail">
      <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
      <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      
        <detail-swiper :top-images="topImages"/>
        <detail-base-info :goods="goods"></detail-base-info>
        <detail-shop-info :shop="shop"></detail-shop-info>
        <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
        <detail-param-info :paramInfo="itemParams" ref="params"></detail-param-info>
        <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
        <goods-list :goods="recommends" ref="recommends"></goods-list>
         

      </scroll>
      <detail-bottom-bar @addCart = "addToCart"></detail-bottom-bar>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from './childComps/DetailBottomBar.vue'
// import BackTop from 'components/content/backTop/BackTop.vue'   mixins了

import {getDetail ,getRecommend, Goods, Shop , GoodsParam} from 'network/detail.js'
import {debounce} from 'common/utils/utils'
import {itemListenerMixin ,backTopMixin} from 'common/utils/mixin.js'
import{ mapActions } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'







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
    GoodsList,
    DetailBottomBar,
    // BackTop,  mixins了
    // isShowBackTop: false,  mixins了
    
   
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
      themeTopYs:[],
      getThemeTopY: null,
      positionY: 0,
      currentIndex: 0,
      isShowBackTop: false
    }
  },
  mixins: [itemListenerMixin , backTopMixin],
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
    //4.给getThemeTopY赋值，对他进行防抖操作，然后detailImageLoad里面调用，确保获得图片加载完的offsetTop的值
    this.getThemeTopY = debounce( () => {
      
      this.themeTopYs = []   //每次调用这个getThemeTopY函数，要清空，不然会从4个变成8个的，push是在原数组里增加个数的
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)   //用于下面contentScroll判断的优化
      
      
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
  },
  methods: {
    ...mapActions(['addCart']),
    imageLoad() {
       this.$refs.scroll.refresh() 
       this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
    },
    contentScroll(position) {

     
      // console.log(position)  一开始打印不出来，因为默认的probeType是0
      
      const positionY = -position.y
      /**
       * 这里是让详情页滚动到哪里时，对应的标题能够显示，所以只要滚动的position.y等于themeTopY（点击标题滚动到对应的位置），然后显示即可
       * 详情页的商品，参数，评论，推荐对应的值是【0，2901，4332，4527】
       * positionY 在0和2901时 index=0
       * positionY 在2901~4332时，index=1
       * positionY 在4330~4527时  index=2
       * positionY 在大于4527时    index=3
       */
      let length = this.themeTopYs.length
       /**
      for ( let i = 0;i < length ;i++) {
       
         * 普通做法（这个判断有点多和复杂，如果我们的themeTopY数组里的值再多一个，且这个值很大很大，就可以直接判断了，就可以不用||后面的判断，最大值可以是Number.MAX_VALUE）
         if( this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1] ) || ( i ===length-1 && positionY >= this.themeTopYs[i]))){
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
            console.log(this.currentIndex)

         }
     }
        */
       //hack做法（this.currentIndex !== i 防止频繁调用的做法）
       for ( let i = 0;i < length-1 ;i++) {
         if( this.currentIndex !== i && ( positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
           this.currentIndex = i
           this.$refs.nav.currentIndex = this.currentIndex
         }
       }
        //判断上拉加载更多那个箭头什么时候显示
         this.isShowBackTop = (-position.y) > 1000
      },
    //    mixins了
    //  backClick() {
    //   this.$refs.scroll.scrollTo(0,0)
    // },
    addToCart() {
      //1.获取购物车需要展示的信息
     const product = {}
     product.image = this.topImages[0]
     product.title = this.goods.title
     product.desc = this.goods.desc
     product.price = this.goods.realPrice
     product.iid = this.iid
     console.log(product)
     //2.将商品添加到购物车里
    //  this.$store.commit('addCart', product)   //调用store里mutations里面的addCart方法
    // this.$store.dispatch('addCart' , product).then( res => {
    //   console.log(res)
    // })  //与下面相等的
    //用下面这种直接this.addCart的方法，记得在methods里加入  ...mapActions(['addCart']),
    this.addCart(product).then( res => {
      this.$toast.show(res,2000)
      // console.log(this.$toast)
    })
    }

     
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
    height: calc(100% - 44px - 49px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>