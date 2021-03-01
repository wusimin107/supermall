<template>
   <div class="bottom-bar">
      <div class="check-content">
          <check-button class="check-button" :is-checked= "isSelectAll" @click.native="checkClick"></check-button>
          <span>全选</span>
      </div>
      <div class="price">
          合计：{{totalPrice}}
      </div>
      <div class="calculate" @click="calcClick">
          去计算（{{checkLength}}）
      </div>
   </div>
</template>

<script>
import CheckButton from './CheckButton.vue'
export default {
  name: "CartBottomBar",
   components: {
       CheckButton 
   
   },
   computed: {
       totalPrice() {
           return '￥' + this.$store.state.cartList.filter( item => {
               return item.checked 
           }).reduce((preValue,item) => {
               return preValue + item.count * item.price
           }, 0)
       },
       checkLength() {
           return this.$store.state.cartList.filter( item => item.checked).length
       },
       isSelectAll() {
           if(this.$store.state.cartList.length === 0) return false
           return !this.$store.state.cartList.find( item => !item.checked)
        //  另一种方法： return !(this.$store.state.cartList.filter( item => !item.checked).length)   !数字 = false   ！0 =true
       }
   },
   methods: {
       checkClick() {
         if(this.isSelectAll) {
             this.$store.state.cartList.forEach( item => item.checked = false);
         }else {
             this.$store.state.cartList.forEach( item => item.checked = true )
         }
       },
       calcClick() {
           if(!this.isSelectAll) {
               this.$toast.show('请先选中要购买的商品')
           }
       }
   }
}
</script>

<style scoped>
 .bottom-bar {
     position: relative;
     display: flex;

     height: 40px;
     line-height: 40px;
     background-color: #eee;
 }
 .check-content {
     display: flex;
     align-items: center;
     width: 100px;
 }
 .check-button {
     width: 20px;
     height: 20px;
     line-height: 20px;
     margin-left: 10px;
     margin-right: 10px;
 }
 .price {
    margin-left: 30px;
    flex: 1;
 }
 .calculate {
     width: 120px;
     background-color: red;
     text-align: center;
     color: white;
 }
</style>