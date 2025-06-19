<script setup>
import left from '@/pages/left.vue'
import listarea from '@/pages/listarea.vue'
</script>
<template>
  <div id="mainContent">
  <left />
  <listarea />
  </div>
</template>
<style scoped>
#mainContent {
  width: 100%;
  /* flex: 1; */
  height: calc(100vh - 45px);
  display: flex;
  justify-content: flex-start;
}
</style>
