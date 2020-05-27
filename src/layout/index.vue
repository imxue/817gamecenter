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
  width: 220px;
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
  min-height: 400px;
  margin-bottom: 10px;
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
        <div class="layout-logo">{{ $t("GameCenter") }}</div>
        <div class="layout-nav">
          <MenuItem
            :name="item.meta.index"
            v-for="(item, index) in menu"
            :key="index"
            :to="item.path"
          >
            <template v-if="item.meta.title === 'GameManagement'">
              <Icon type="md-game-controller-b" />
            </template>
            <template v-if="item.meta.title === 'ServerManagement'">
              <Icon type="md-list-box" />
            </template>
            <template v-if="item.meta.title === 'EventMonitoring'">
              <Icon type="ios-calendar-outline" />
            </template>
            {{ $t(item.meta.title) }}
          </MenuItem>
        </div>
        <div class="User">
          <Dropdown @on-click="handleLogout">
            <a href="javascript:void(0)">
              <span>{{ $t("User") }}： {{ user.user_name }}</span>
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="logout">{{ $t("Logout") }}</DropdownItem>
              <DropdownItem name="changepassword">{{
                $t("ChangePassword")
              }}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="language">
          <Dropdown @on-click="HandleChange">
            <a href="javascript:void(0)">
              {{ $t("language") }}
              <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem
                v-for="item in langName"
                :name="item.value"
                :key="item.value"
                :selected="item.value === selectedLang"
                >{{ item.name }}</DropdownItem
              >
            </DropdownMenu>
          </Dropdown>
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
            width="217px"
            @on-select="asiderMenuChange"
            :open-names="openNames"
          >
            <template v-for="(item, index) in asider[0].children">
              <Submenu :name="index + ''" v-if="item.children" :key="index">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  {{ $t(item.meta ? item.meta.title : "未上设置meta") }}
                </template>
                <template v-for="(i, j) in item.children">
                  <template v-if="i.meta.show">
                    <MenuItem :name="i.name" :key="j" :to="i.path">
                      {{ $t(i.meta.title) }}
                    </MenuItem>
                  </template>
                </template>
              </Submenu>
            </template>
          </Menu>
        </el-scrollbar>
        <div class="page_content">
          <div :style="{ marginLeft: '228px', marginRight: '4px' }">
            <div style="margin:10px;">
              <Breadcrumb>
                <BreadcrumbItem
                  v-for="(item, index) in routeArray"
                  :key="index"
                  >{{ $t(item.meta.title || "") }}</BreadcrumbItem
                >
              </Breadcrumb>
            </div>
            <el-scrollbar :native="false" class="page_content_main_wrap">
              <div class="page_content_main">
                <div class="content">
                  <router-view></router-view>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
    <Modal
      v-model="showModelPassword"
      :title="this.$t('ChangePassword')"
      footer-hide
    >
      <Form
        ref="passwordform"
        :model="passwordform"
        :rules="rules"
        :label-width="140"
      >
        <FormItem :label="this.$t('OldPassword')" prop="password">
          <Input
            v-model="passwordform.password"
            type="password"
            :placeholder="this.$t('OldPassword')"
          ></Input>
        </FormItem>

        <FormItem :label="this.$t('NewPassword')" prop="newpassword">
          <Input
            v-model="passwordform.newpassword"
            type="password"
            :placeholder="this.$t('NewPassword')"
          ></Input>
        </FormItem>

        <FormItem :label="this.$t('ConfirmPassword')" prop="confirmpassword">
          <Input
            v-model="passwordform.confirmpassword"
            type="password"
            :placeholder="this.$t('ConfirmPassword')"
          ></Input>
        </FormItem>

        <FormItem>
          <Button type="primary" @click="HandleSubmit('passwordform')">{{
            $t("Save")
          }}</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import { parseJWT } from "@/utils/index";
import { changePassword } from "@/api/user.js";
import md5 from "blueimp-md5";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password"));
      } else {
        if (this.passwordform.newpassword !== value) {
          // 对第二个密码框单独验证
          callback(new Error(this.$t("mmd")));
        }
        callback();
      }
    };
    return {
      langName: [],
      selectedLang: "",
      menu: null,
      activeMenuIndex: "0",
      activeAsiderMenuName: "",
      openNames: ["0", "1", "2", "3", "4", "5"], //打开子菜单
      routeArray: [],
      user: {
        user_id: "",
        user_name: "",
        role_names: [],
        exp: "",
        iss: ""
      },
      passwordform: {
        password: "",
        newpassword: "",
        confirmpassword: ""
      },
      rules: {
        password: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        newpassword: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        confirmpassword: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      },
      showModelPassword: false
    };
  },
  created() {
    if (localStorage.getItem("gamecenterToken")) {
      this.selectedLang = localStorage.getItem("GameLang") || "";
      this.menu = this.$router.options.routes[0].children;
      this.activeAsiderMenuName = this.activeRouterName;
      this.user = parseJWT(localStorage.getItem("gamecenterToken")) || "";
      for (const key in this.$i18n.messages) {
        if (this.$i18n.messages.hasOwnProperty(key)) {
          this.langName.push({
            value: key,
            name: this.$i18n.messages[key].lang
          });
        }
      }
    } else {
      this.$router.push("/User");
    }
  },
  computed: {
    asider() {
      return this.menu.filter(item => {
        return this.activeMenuIndex === item.meta.index;
      });
    },
    activeRouterName() {
      return this.$route.name;
    },
    activeRouterTitle() {
      return this.$route.name;
    }
  },
  watch: {
    $route(e) {
      this.routeArray = e.matched;
      this.activeAsiderMenuName = e.name;
    }
  },
  methods: {
    HandleChange(value) {
      this.selectedLang = value;
      this.$i18n.locale = value;
      localStorage.setItem("GameLang", value);
    },
    menuChange(Index) {
      this.activeMenuIndex = Index;
      this.openNames = ["0", "1", "2", "3", "4", "5"];
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
        this.$refs.menu.updateActiveName();
      });
    },
    HandleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            await changePassword({
              password: md5(this.passwordform.password),
              newpassword: md5(this.passwordform.confirmpassword)
            });
            this.showModelPassword = false;
            this.$Modal.info({
              title: this.$t("lts"),
              content: this.$t("mecrg"),
              onOk: () => {
                this.$router.push("/User/login");
              }
            });
          } catch (error) {
            this.$Message.error(this.$t("mmef"));
            this.showModelPassword = true;
          } finally {
            this.passwordform.password = "";
            this.passwordform.newpassword = "";
            this.passwordform.confirmpassword = "";
          }
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    asiderMenuChange(name) {
      this.activeAsiderMenuName = name;
    },
    handleLogout(name) {
      if (name === "logout") {
        this.$router.push("/User/login");
        localStorage.removeItem("gamecenterToken");
      } else if (name === "changepassword") {
        this.showModelPassword = true;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.User {
  float: right;
  color: white;
  a {
    color: white;
  }
}
.language {
  float: right;
  margin-right: 10px;
  color: white;
  a {
    color: white;
  }
}
</style>
