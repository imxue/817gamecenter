<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.ivu-menu-vertical.ivu-menu-light:after {
  content: "";
  display: block;
  width: 0px;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}
.layout-logo {
  width: 140px;
  height: 30px;
  color: white;
  float: left;
}
.ivu-menu-light.ivu-menu-vertical
  .ivu-menu-item-active:not(.ivu-menu-submenu):after {
  content: "";
  display: block;
  width: 0px;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background: #2d8cf0;
}
.page_nav {
  position: fixed;
  width: 240px;
  top: 0;
  bottom: 0;
  margin-top: 64px;
  background: white;
}
.page_content_main {
    height: calc(100vh - 88px);
    background: white;
    margin-right: 2px;
     border-radius: 4px;
}
.content {
    padding: 17px;
    border-radius: 4px;
    background: #fff;
    overflow: hidden;
}
</style>
<template>
  <div class="layout">
    <Header>
      <Menu
        mode="horizontal"
        theme="dark"
        active-name="0"
        @on-select="menuChange"
      >
        <div class="layout-logo">游戏管理中心</div>
        <div class="layout-nav">
          <MenuItem
            :name="item.meta.index"
            v-for="(item, index) in menu"
            :key="index"
            :to="item.path"
          >
            <Icon type="ios-navigate"></Icon>
            {{ item.meta.title }}
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <div class="main">
      <div class="container">
        <el-scrollbar class="page_nav" :native="false">
          <Menu
            ref="menu"
            :active-name="activeAsiderMenuName"
            theme="light"
            width="auto"
            @on-select="asiderMenuChange"
            :open-names="openNames"
          >
            <template v-for="(item, index) in asider[0].children">
              <Submenu :name="index + ''" v-if="item.children" :key="index">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  {{ item.meta ? item.meta.title : "未上设置meta" }}
                </template>
                <template v-for="(i, j) in item.children">
                  <template v-if="i.meta.show">
                    <MenuItem :name="i.path" :key="j" :to="i.path">
                      {{ i.meta.title }}
                    </MenuItem>
                  </template>
                </template>
              </Submenu>
            </template>
          </Menu>
        </el-scrollbar>
        <div class="page_content">
          <div :style="{  marginLeft: '250px',marginRight: '4px' }">
              <div style="margin:10px;">
            <Breadcrumb >
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Components</BreadcrumbItem>
              <BreadcrumbItem>Layout</BreadcrumbItem>
            </Breadcrumb>
              </div>
            <el-scrollbar  :native="false" class="page_content_main_wrap">
            <div class="page_content_main" >
              <div class="content"
              >
                <router-view></router-view>
              </div>
            </div>
                </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menu: null,
      activeMenuIndex: "0",
      activeAsiderMenuName: "",
      openNames: ["0", "1", "2", "3", "4", "5"] //打开子菜单
    };
  },
  created() {
    this.menu = this.$router.options.routes[0].children;
    this.activeAsiderMenuName = this.activeRouterName;
  },
  computed: {
    asider() {
      return this.menu.filter(item => {
        return this.activeMenuIndex === item.meta.index;
      });
    },
    activeRouterName() {
      return this.$route.name;
    }
  },
  watch: {
    $route(e) {
      this.activeAsiderMenuName = e.name;
    }
  },
  methods: {
    menuChange(Index) {
      this.activeMenuIndex = Index;
      this.openNames = ["0", "1", "2", "3", "4", "5"];
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    asiderMenuChange(name) {
      this.activeAsiderMenuName = name;
    }
  }
};
</script>
