<template>
  <div id="tab-bar">
       <slot></slot>
 </div>
</template>

<script>
export default {
    name: 'TabBar'

}
</script>

<style>
#tab-bar {
  display: flex;
  height: 49px;
  background-color: #f6f6f6;
  position: fixed;
  left: 0px;
  right: 0px;
  bottom: 0px;
  box-shadow: 0 -1px 1px rgba(100,100,100,.1);
}

</style>