<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class = "tab-control" :titles = "['流行','新款','精选']" @tabClick = 'tabClick'></tab-control>
    <goods-list :goods = "showGoods"/>    
  </div>
</template>

<script>

import homeSwiper from './homeComps/homeSwiper'
import RecommendView from './homeComps/RecommendView'
import FeatureView from './homeComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar.vue'
import TabControl from 'components/content/tabcontrol/TabControl.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'

import { getHomeMultidata , getHomeGoods} from 'network/home.js'

export default {
  name: 'Home',
  components: { 
    homeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodsList
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
      currentType: 'pop'
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
          break
      }
       
    },
    /**
     * 网络请求的
     */
      getHomeMultidata() {
         getHomeMultidata().then(
          res => {   //请求到的结果保存到res里面，函数里面的结果在函数调用执行完后就会被删除掉了，所以要把结果给保存起来，在data里定义banners和recommends保存起来
            console.log(res)
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
            }            
         )
       }
         
      

     }
  
} 

</script>

<style>
   #home {
     padding-top: 44px;
   }
   .home-nav {
     background-color: var(--color-tint);
     color: #fff;
     position: fixed;
     left: 0;
     top: 0;
     right: 0;
     z-index: 9;
   }
   .tab-control {
     position: sticky;
     top: 44px;
     z-index: 9;
   }
</style>