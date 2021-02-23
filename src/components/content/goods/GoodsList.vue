<template>
  <div class="goods">
      <goods-list-item v-for="item in goods" :goods-item = "item"/>
      <!-- goods是个list，list里面的图片是一个个对象，所以item是一个个对象object，把item传给goods-item，让组件goodsListItem.vue有了数据-->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'

export default {
  name: 'GoodsList',
  components: {
      GoodsListItem
  },
  props: {
      goods: {
          type: Array,
          default() {
              return []
          }
      }
  }
}
</script>

<style scoped>
  .goods {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
  }
</style>