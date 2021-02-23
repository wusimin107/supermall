<template>
  <div class="wrapper" ref="wrapper">
      <div class="content" >
          <!-- 设置ref是为了获取元素更加确定哪个（通过this.$refs.wrapper来获取），要是直接通过querrySelector（'.content'）来获取，要是别的界面有content，就不知道会获取到哪个了 -->
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
      return {
          scroll: null
      }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  methods: {
   scrollTo(x,y,time=300) {
      this.scroll && this.scroll.scrollTo(x,y,time=300)   
        // BScroll里面本来就有scrollTO方法可以回到顶部，300ms再回去，es6里可以给参数传默认值的
   },
   refresh() {
      this.scroll &&  this.scroll.refresh() 
     //this.scroll &&确保有了scroll挂载完才可以执行
   },
   finishPullUp() {
     this.scroll && this.scroll.finishPullUp()   //执行下一次的上拉加载更多
   },
   getScrollY() {
     return this.scroll ? this.scroll.y : 0
   }
  },
  mounted() {
      //1.创建bscroll对象 
      this.scroll = new BScroll(this.$refs.wrapper,{
        click: true,
        probeType: this.probeType,
        //如果是固定值，那么每次都在侦测position，有些滚动是不需要的
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置 ‘scroll’是组件的名字
      this.scroll.on('scroll',(position) => {
        this.$emit('scroll',position)   
       // 发送事件scroll，传递position滚动的实时位置
      })
      // 3.监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
  }
}
</script>

<style scoped>

</style>