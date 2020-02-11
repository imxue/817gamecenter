import Vue from "vue";
import VueRouter from "vue-router";
import defaultLayot from "../layout/index.vue";
import About from "../views/About.vue";
import nullLayout from "../layout/null.vue";
import LineType from "../views/ServerManagement/BasicSetting/LineType/index.vue";
import BtServerGroup from "../views/ServerManagement/BTServer/Group/index.vue";
import BtServerCategory from "../views/ServerManagement/BTServer/Category/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: defaultLayot,
    redirect: "/ServerManagement",
    children: [
      {
        path: "/ServerManagement",
        meta: {
          title: "服务器管理",
          index: "0"
        },
        component: nullLayout,
        children: [
          {
            path: "",
            meta: {
              title: "基础设置"
            },
            redirect: { name: "/ServerManagement/LineType" },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/LineType",
                name: "/ServerManagement/LineType",
                meta: {
                  title: "线路类型",
                  show: true
                },
                component: LineType
              },
              {
                path: "/ServerManagement/LineType/edit",
                name: "editLineType",
                meta: {
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addLineType" */ "../views/ServerManagement/BasicSetting/LineType/edit.vue"
                  )
              },
              {
                path: "/ServerManagement/LineType/add",
                name: "addLineType",
                meta: {
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addLineType" */ "../views/ServerManagement/BasicSetting/LineType/add.vue"
                  )
              }
            ]
          },
          {
            path: "BTserver",
            component: nullLayout,
            meta: {
              title: "BT server",
              show: true
            },
            children: [
              {
                path: "/ServerManagement/BtServerGroup",
                name: "/ServerManagement/BtServerGroup",
                meta: {
                  title: "Bt Server分组",
                  show: true
                },
                component: BtServerGroup
              },
              {
                path: "/ServerManagement/BtServerGroup/add",
                name: "/ServerManagement/BtServerGroup/add",
                meta: {
                  title: "add Bt Server分组",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Group/add.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerGroup/edit",
                name: "/ServerManagement/BtServerGroup/edit",
                meta: {
                  title: "edit Bt Server分组",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Group/edit.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory",
                name: "/ServerManagement/BtServerCategory",
                meta: {
                  title: "Bt Server类别",
                  show: true
                },
                component: BtServerCategory,
              },
              {
                path: "/ServerManagement/BtServerCategory/add",
                name: "/ServerManagement/BtServerCategory/add",
                meta: {
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Category/add.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory/edit",
                name: "/ServerManagement/BtServerCategory/edit",
                meta: {
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "editBtServerCategory" */ "../views/ServerManagement/BTServer/Category/edit.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory/setRunConfig",
                name: "/ServerManagement/BtServerCategory/setRunConfig",
                meta: {
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "editBtServerCategory" */ "../views/ServerManagement/BTServer/Category/setRunConfig.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServer/SeedServerList",
                name: "/ServerManagement/BtServer/SeedServerList",
                meta: {
                  title: "做种服务器列表",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/BTServer/SeedServerList/index.vue"
                )
              },
              {
                path: "/ServerManagement/BtServer/SeedServerList/add",
                name: "/ServerManagement/BtServer/SeedServerList/add",
                meta: {
                  title: "做种服务器列表",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "addSeedServerList" */ "../views/ServerManagement/BTServer/SeedServerList/add.vue"
                )
              },
              {
                path: "/ServerManagement/BtServer/SeedServerList/edit",
                name: "/ServerManagement/BtServer/SeedServerList/edit",
                meta: {
                  title: "做种服务器列表",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/BTServer/SeedServerList/index.vue"
                )
              }
            ]
          },
          {
            path: "",
            meta: {
              title: "BT Client"
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/BTClient",
                name: "/ServerManagement/BTClient",
                meta: {
                  title: "BT Client 设置",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/BTClient/Set/index.vue"
                )
              },
              {
                path: "/ServerManagement/BTClient/setRunConfig",
                name: "/ServerManagement/BTClient/setRunConfig",
                meta: {
                  title: "BT Client",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/BTClient/Set/setRunConfig.vue"
                )
              }
            ]
          },
          {
            path: "",
            meta: {
              title: "Tracker"
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/Tracker",
                name: "/ServerManagement/Tracker",
                meta: {
                  title: "Tracker 列表",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/Tracker/List/index.vue"
                )
              },
              {
                path: "/ServerManagement/Tracker/add",
                name: "/ServerManagement/Tracker/add",
                meta: {
                  title: "addTracker",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/Tracker/List/add.vue"
                )
              },
              {
                path: "/ServerManagement/Tracker/edit",
                name: "/ServerManagement/Tracker/edit",
                meta: {
                  title: "editTracker",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/Tracker/List/edit.vue"
                )
              },
              {
                path: "/ServerManagement/Tracker/setRunConfig",
                name: "/ServerManagement/Tracker/setRunConfig",
                meta: {
                  title: "setRunConfig",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/Tracker/List/setRunConfig.vue"
                )
              }
            ]
          },
          {
            path: "",
            meta: {
              title: "FTP Server",
              show: true
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/FTPServer",
                name: "/ServerManagement/FTPServer",
                meta: {
                  title: "FTPServer服务器列表",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/FTPServer/List/index.vue"
                )
              },
              {
                path: "/ServerManagement/FTPServer/add",
                name: "/ServerManagement/FTPServer/add",
                meta: {
                  title: "addFTPServer",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/FTPServer/List/add.vue"
                )
              },
              {
                path: "/ServerManagement/FTPServer/edit",
                name: "/ServerManagement/FTPServer/edit",
                meta: {
                  title: "editFTPServer",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/FTPServer/List/edit.vue"
                )
              }
            ]
          },
          {
            path: "",
            meta: {
              title: "集群登录服务器",
              show: true
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/ClusterLoginServer",
                name: "/ServerManagement/ClusterLoginServer",
                meta: {
                  title: "集群登录服务器列表",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/ClusterLoginServer/List/index.vue"
                )
              },
              {
                path: "/ServerManagement/ClusterLoginServer/add",
                name: "/ServerManagement/ClusterLoginServer/add",
                meta: {
                  title: "集群登录服务器列表",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/ClusterLoginServer/List/add.vue"
                )
              },
              {
                path: "/ServerManagement/ClusterLoginServer/edit",
                name: "/ServerManagement/ClusterLoginServer/edit",
                meta: {
                  title: "集群登录服务器列表",
                  show: false
                },
                component: () =>
                import(
                  /* webpackChunkName: "SeedServerList" */ "../views/ServerManagement/ClusterLoginServer/List/edit.vue"
                )
              }
            ]
          }
        ]
      },
      {
        path: "/GameManagement",
        meta: {
          title: "游戏管理",
          show: true,
          index: "1"
        },
        component: nullLayout,
        children: [
          {
            path: "",
            meta: {
              title: "基础设置",
              show: true
            },
            redirect: "/GameManagement/gamecompany",
            component: nullLayout,
            children: [
              {
                path: "GameCompany",
                name: "GameCompany",
                meta: {
                  title: "游戏公司",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamecompany/index.vue"
                )
              },
              {
                path: "BasicSettings2",
                name: "BasicSettings2",
                meta: {
                  title: "游戏分组",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamegroup/index.vue"
                )
              },
              {
                path: "BasicSettings222222",
                name: "BasicSettings222222",
                meta: {
                  title: "游戏分组黑名单",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "black" */ "../views/GameManagement/BasicSetting/GameGroupBlacklist/index.vue"
                )
              }
            ]
          },
          {
            path: "GameList",
            component: nullLayout,
            meta: {
              title: "游戏列表",
              show: true
            },
            children: [
              {
                path: "/GameManagement/GameList",
                name: "/GameManagement/GameList",
                meta: {
                  title: "游戏列表",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "black" */ "../views/GameManagement/GameList/List/index.vue"
                )
              },

              {
                path: "/GameManagement/GameStrategy",
                name: "/GameManagement/GameStrategy",
                meta: {
                  title: "游戏版本变更策略",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "black" */ "../views/GameManagement/GameList/ChangeStrategy/index.vue"
                )
              }
            ]
          },
          {
            path: "BtSrv",
            component: nullLayout,
            meta: {
              title: "BtSrv分配游戏",
              show: true
            },
            children: [
              {
                path: "/GameManagement/BtSrv",
                name: "/GameManagement/BtSrv",
                meta: {
                  title: "BtSrv游戏状态",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "black" */ "../views/GameManagement/BtSrv/GameState/index.vue"
                )
              }
            ]
          }
        ]
      },
      {
        path: "/EventMonitoring",
        meta: {
          title: "事件监控",
          show: true,
          index: "2"
        },
        component: nullLayout,
        children: [
          {
            path: "",
            component: nullLayout,
            redirect: "/EventMonitoring/ConditionMonitoring/ServerState",
            meta: {
              title: "状态监控",
              show: true
            },
            children: [
              {
                path: "/EventMonitoring/ConditionMonitoring/ServerState",
                name: "/EventMonitoring/ConditionMonitoring/ServerState",
                meta: {
                  title: "服务器状态",
                  show: true
                },
                component: () =>
                import(
                  /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/ServerState/index.vue"
                )
              },
              {
                path: "/EventMonitoring/GameState",
                name: "/EventMonitoring/GameState",
                meta: {
                  title: "游戏状态",
                  show: true
                }
              },
              {
                path: "/EventMonitoring/ListOfCurrentValidData",
                name: "/EventMonitoring/ListOfCurrentValidData",
                meta: {
                  title: "当前有效数据清单",
                  show: true
                }
              }
            ]
          },
          {
            path: "",
            component: nullLayout,
            redirect: "/EventMonitoring/xxxx",
            meta: {
              title: "事件查询",
              show: true
            },
            children: [
              {
                path: "/EventMonitoring/xxxx",
                name: "/EventMonitoring/xxxx",
                meta: {
                  title: "游戏做种历史",
                  show: true
                }
              },
              {
                path: "/EventMonitoring/GameState",
                name: "/EventMonitoring/GameState",
                meta: {
                  title: "游戏BtSrv同步日志",
                  show: true
                }
              },
              {
                path: "/EventMonitoring/ListOfCurrentValidData",
                name: "/EventMonitoring/ListOfCurrentValidData",
                meta: {
                  title: "游戏json文件生成日志",
                  show: true
                }
              },
              {
                path: "/EventMonitoring/ListOfCurrentValidData",
                name: "/EventMonitoring/ListOfCurrentValidData",
                meta: {
                  title: "FTP文件变更日志",
                  show: true
                }
              },
              {
                path: "/EventMonitoring/Serverlog",
                name: "/EventMonitoring/Serverlog",
                meta: {
                  title: "服务器异常日志",
                  show: true
                }
              }
            ]
          }
        ]
      },
      {
        path: "/base",
        meta: {
          title: "基础设置",
          show: true,
          index: "3"
        },
        component: nullLayout,
        children: [
          {
            path: "",
            meta: {
              title: "用户管理",
              show: true
            },
            component: nullLayout,
            children: [
              {
                path: "",
                meta: {
                  title: "授权类表",
                  show: true
                },
                component: About
              },
              {
                path: "",
                meta: {
                  title: "角色列表"
                },
                component: About
              },
              {
                path: "",
                meta: {
                  title: "用户列表",
                  show: true
                },
                component: About
              }
            ]
          }
        ]
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  routes
});

export default router;
