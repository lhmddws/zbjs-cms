<script setup>
</script>
<template>
  <div id="listarea">
    <div class="background-image">
    <RouterView></RouterView>
    </div>
  </div>
</template>
<style scoped>
#listarea {
  width: calc(100% - 250px);
  height: 100%;
  background-color: #F3F2F9;
  overflow: auto;
}
/* 隐藏垂直滚动条 */
#listarea::-webkit-scrollbar {
    width: 0;
}
.background-image {
  width: 100%;
  height: 100%;
  background: url('@/assets/backgroundIcon.png') center center no-repeat; 
}
</style>