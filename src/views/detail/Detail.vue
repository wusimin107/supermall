<template>
<!-- goodslistitem的itemClick点击跳转到detail页，详情页通过传过来的id（这里叫iid）再发送数据请求，这个页面的data：iid用于接受传过来的iid-->
   <div id="detail">
      <detail-nav-bar></detail-nav-bar>
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
   </div>
 
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'


import {getDetail , Goods, Shop} from 'network/detail.js'



export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
    
   
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid
    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res)
        //2.1获取顶部的图片轮播数据
        const data = res.result
      this.topImages = data.itemInfo.topImages
       console.log(this.topImages)
       //2.2获取商品信息
       this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
       //2.3创建店铺信息的对象
       this.shop = new Shop(data.shopInfo)

    })
  }
}
</script>

<style scoped>

</style>