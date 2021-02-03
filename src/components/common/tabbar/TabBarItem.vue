<template>
  <div class="tab-bar-item" @click="itemClick"> 
     <div v-if="!isActive"><slot name="item-icon"></slot></div>
     <div v-else><slot name="item-icon-active"></slot></div>
     <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type:String,
      default: 'red'
      //这个是这只tabbaritem的字体颜色动态传入，默认红色
    }   
  },
  data() {
      return {
          
      }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1  //==-1表示indexOf两边不相等
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch(err => err)//catch后面是解决一直点同个tabbaritem的时候的报错
      
    }
  }
}
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  margin-top: 3px;
  vertical-align: middle;
}
.tab-bar-item img {
    height: 24px;
    width: 24px;

}

</style>