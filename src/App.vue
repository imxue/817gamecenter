<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*{
  box-sizing: border-box;
}
html,body {
  height: 100%;
   width: 100%;
}
#app {
  height: 100%;
}
.el-scrollbar__wrap {
  overflow-x: auto !important; 
}
.el-scrollbar__bar {
  z-index: 999999999999999999 !important;
}
.el-scrollbar__thumb {
  z-index: 999999999999999999 !important;
}
</style>
