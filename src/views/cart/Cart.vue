<template>
  <div class="cart">
    <!-- 导航 -->
     <nav-bar class="nav-bar">
       <div slot="center">购物车({{cartLength}})</div>
     </nav-bar>
     <!-- 购物车列表展示 -->
    <scroll class="content" ref="scroll">
       <cart-list ></cart-list>
    </scroll>
     <!-- 底部全选计算 -->
     <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'   //mapGetters辅助函数仅仅是将store里的getter映射到局部的计算属性
import NavBar from 'components/common/navbar/NavBar.vue'
import Scroll from 'components/common/scroll/Scroll.vue'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar.vue'

export default {
   name: 'Cart',
   components: {
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
   },
   computed: {
     ...mapGetters(['cartLength'])  //将getters里面的cartLength当作计算属性使用
   },
    activated() {
      this.$refs.scroll.refresh()   //每次进入购物车界面要刷新一下，不然可滚动高度不变，无法进行滚动
  },
}
</script>

<style scoped>
 .cart {
   height: 100vh;
 }
 .content {
   height: calc(100% - 44px - 49px - 40px);  
   /* 100%-头-低-购物车全选那一栏 */
   overflow: hidden;
 }
 .nav-bar {
   background-color: var(--color-tint);
   color: white;
 }
</style>