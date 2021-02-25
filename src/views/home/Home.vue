<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-control :titles = "['流行','新款','精选']"
         @tabClick = 'tabClick' ref="tabControl2" class = "tab-control" v-show="isTabFixed" >
         </tab-control>
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll":pullUpLoad="true" @pullingUp="loadMore">
        <home-swiper :banners="banners"  @swiperImageLoad='swiperImageLoad'></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control  :titles = "['流行','新款','精选']"
         @tabClick = 'tabClick' ref="tabControl1">
         </tab-control>
        <goods-list :goods = "showGoods"/>  
      </scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  
  </div>
</template>

<script>

import homeSwiper from './homeComps/homeSwiper'
import RecommendView from './homeComps/RecommendView'
import FeatureView from './homeComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import {debounce} from 'common/utils/utils.js'
import {itemListenerMixin} from 'common/utils/mixin.js'


import { getHomeMultidata , getHomeGoods} from 'network/home.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export default {
  name: 'Home',
  components: { 
    homeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop 
    },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: 'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      // itemImgListener: null  mixins对象复用了
    }
  },
  mixins: [itemListenerMixin],
    created() {
      //1.请求多个数据（轮播图和推荐的）
     this.getHomeMultidata()
     //2.请求流行/新款/精选的数据des
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
    },
    mounted() {
      console.log('home的mounted')
       //3.监听图片是否加载完成
    /**    const refresh = debounce(this.$refs.scroll.refresh)
           this.itemImgListener = () => {
              refresh()
           }
           this.$bus.$on('itemImageLoad', this.itemImgListener)
           这里面的代码，在home这里会使用，在detail里面也会使用，以后需要用到goodsitem的时候也需要使用，所以重复性很高，
           可以对它进行抽离，两个组件之间想复用代码的话，通过混入mixins来复用的，
           【mixins就是用来更高效的实现组件内容的复用，在使用mixin的组件中引入后，mixin中的方法和属性也就并入到该组件中，
           可以直接使用。钩子函数会两个都被调用，mixin中的钩子首先执行；即你创建的mixins.js是作用在mounted，到时后导入在一个组件里，
           这个组件本身mounted也有东西执行，结果是两个都会被执行
           。】
    */ 
    

    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()  
    },
    deactivated() {
      //保存y值
      this.saveY = this.$refs.scroll.getScrollY()
     //取消全局事件的监听（goodsitem组件里的image加载完成都会发送itemImageLoad事件，然后在home.vue里监听刷新，在详情页里也用了goodsitem的组件
     //也需要刷新才能滚动，但是它那边的图片加载完，通知的是home刷新，我们不应该通知home页面刷新，应该通知详情页面刷新，所以从home点击进入到
     //详情页的时候，home应该都已经刷新完成了，所以在离开home时，我们应该取消这个传送过来的事件itemImageLoad所执行的函数）,之后谁需要监听itemImageLoad事件，就在谁的mounted里监听
     this.$bus.$off('itemImageLoad', this.itemImgListener)
        
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
  methods: {
    /**
     * 事件监听的
     */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index

       
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
      // 也可以这样写：this.$refs.scroll(这里是拿到叫ref名字叫scroll的组件，通过ref可以访问组件里的属性和方法).scroll（拿到组件里的scroll，即BScroll）.scrollTo(0,0)（访问bscroll自带的scrollTo方法）
    },
    contentScroll(position) {
      //1.判断上拉加载更多那个箭头什么时候显示
      this.isShowBackTop = (-position.y) > 1000
      //2.判断tabControl什么时候吸顶（大于tabOffsetTop）
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()  //上拉加载一次后刷新，不然滚动不上去
    },
    swiperImageLoad() {
      //由于图片加载较慢，offsetTop一开始获取的值可能是图片没加载完成的，基本上轮播图加载完成了，图片也就完成了，
      //所以监听轮播图加载完成发出的swiperimageload事件
      this.tabOffsetTop = this.$refs.tabControl1.$el.offsetTop
    },
    /**
     * 网络请求的
     */
      getHomeMultidata() {
         getHomeMultidata().then(
          res => {   //请求到的结果保存到res里面，函数里面的结果在函数调用执行完后就会被删除掉了，所以要把结果给保存起来，在data里定义banners和recommends保存起来
            this.banners = res.data.banner.list
            this.recommends = res.data.recommend.list 
        }
        
      )
       },
       getHomeGoods(type) {
          const page = this.goods[type].page + 1   //page=0+1  定义的page和this.goods[type].page不一样,此时this.goods[type].page还是0
         getHomeGoods(type,page).then(
            res => {
               this.goods[type].list.push(...res.data.list)  
               this.goods[type].page += 1   //把goods里面的page改成1，下次请求就是从1开始，而不是0了

               this.$refs.scroll.finishPullUp()
            }            
         )
       }
         
      

     }
  
} 

</script>

<style scoped>
/* scoped表明这些样式的作用域就是这个界面 */
    #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tab-control {
    position: relative;
    z-index: 9;
    top: 44px;
  }
</style>