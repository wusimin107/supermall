<template>
  <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="ImageLoad">  
        </a>    
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name: 'homeSwiper',
    props: {
       banners: {
           type: Array,
           default() {
               return []
           }
       }
    },
    data() {
      return {
         isLoad: false
      }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
      ImageLoad() {
        if(!this.isLoad) {
          this.$emit('swiperImageLoad')
          this.isLoad = true  //设置这个是因为轮播图有四张，要执行四次，但是我们只需要知道一次的高度即可
        }
      }
    }

}
</script>

<style>

</style>