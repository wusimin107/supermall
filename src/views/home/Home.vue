<template>
  <div id="home">
     <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll" :pullUpLoad="true" @pullingUp="loadMore">
        <home-swiper :banners="banners"></home-swiper>
        <recommend-view :recommends="recommends"></recommend-view>
        <feature-view></feature-view>
        <tab-control class = "tab-control" :titles = "['流行','新款','精选']" @tabClick = 'tabClick'></tab-control>
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
      isShowBackTop: false
    }
  },
    created() {
      //1.请求多个数据（轮播图和推荐的）
     this.getHomeMultidata()
     //2.请求流行/新款/精选的数据
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
  
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
       
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0)
      // 也可以这样写：this.$refs.scroll(这里是拿到叫ref名字叫scroll的组件，通过ref可以访问组件里的属性和方法).scroll（拿到组件里的scroll，即BScroll）.scrollTo(0,0)（访问bscroll自带的scrollTo方法）
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      // console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.scroll.refresh()  //上拉加载一次后刷新，不然滚动不上去
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

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }

  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>