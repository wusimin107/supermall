<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="">  
        </a>    
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import {Swiper,SwiperItem} from 'components/common/swiper'
import {getHomeMultidata} from 'network/home.js'
export default {
  name: 'Home',
  components: { 
    NavBar,
    Swiper,
    SwiperItem
   
    },
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
    created() {
      getHomeMultidata().then(
        res => {   //请求到的结果保存到res里面，函数里面的结果在函数调用执行完后就会被删除掉了，所以要把结果给保存起来，在data里定义banners和recommends保存起来
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }
        
      )
    }
  
}
</script>

<style>
   .home-nav {
     background-color: var(--color-tint);
     color: #fff;
   }
</style>