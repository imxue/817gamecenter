<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    document.getElementById("app").style.display = "block";
    document.getElementById("appLoading").style.display = "none";
  }
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  width: 100%;
  background-color: #f8f8f9;
  margin: 0;
}
#app {
  height: 100%;
  min-width: 1100px;
  background-color: #f8f8f9;
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
