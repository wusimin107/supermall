<template>
  <div class="goods-item">
      <img :src="goodsItem.show.img" alt="" @load="imageLoad" @click="itemClick">
      <!-- goodsItem是一个个对象 -->
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="collect">{{goodsItem.cfav}}</span>
          <!-- cfav是改商品的收藏数 -->
      </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
      goodsItem: {
          type: Object,
          default() {
              return {}
          }
      }
  },
  methods: {
      imageLoad() {
          this.$bus.$emit('itemImageLoad')   
          /**
           * @load监听图片加载完成,执行itemImageLoad方法,把完成的信号发送出去,调用scroll里的refresh方法,
           * 让scrollerHeight高度进行更新,在这个组件是调用不了refresh,(就算通过父子组件通信来解决,但是这里是孙子了,比较麻烦通信)
           * 目前只有home组件可以调用refresh,通过事件总线$bus可以解决这个问题;
           * this.$bus.$emit('itemImageLoad')  发送到事件总线那里,home那边通过this.$bus.$on('事件',function)监听
          */

      },
      itemClick() {
          this.$router.push('/detail/' + this.goodsItem.iid)
      }
  },
}
</script>

<style scoped>
  .goods-item {
      padding-bottom: 40px;
      position: relative;
      width: 48%;
  }
  .goods-item img {
      width: 100%;
      border-radius: 5px;
  }
  .goods-info {
      position: absolute;
      font-size: 12px;
      left: 0;
      right: 0;
      bottom: 5px;
      overflow: hidden;
      text-align: center;    
  }
  .goods-info p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
  }
  .goods-info .price {
      color: var(--color-high-text);
      margin-right: 20px;
  }
  .goods-info .collect {
      position: relative;
  }
  .goods-info .collect::before {
      content: '';
      position: absolute;
      left: -15px;
      top: -1px;
      width: 14px;
      height: 14px;
      background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>