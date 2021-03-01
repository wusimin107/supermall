<template>
  <div class="cart-list">
     <cart-list-item v-for="(item, index) in cartList" :key="index"  :itemInfo = "item"></cart-list-item>
     <!-- 把遍历出来的item传给cartlistitem组件做展示，组件的itemInfo做接收 -->
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";






export default {
  name: 'CartList',
  components: {
      CartListItem
  },
  computed: {
      ...mapGetters(['cartList'])
  },
 
}
</script>

<style scoped>
  .cart-list {
      height: 100%;
  }
</style>