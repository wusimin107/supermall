<template>
   <div id="category">
     <nav-bar class="nav-bar">
       <div slot="center">商品分类</div>
     </nav-bar>
   </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
  


  export default {
		name: "Category",
   components: {
     NavBar
   }
  
  }
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: white;
  font-weight:700 ;
}
  
</style>
