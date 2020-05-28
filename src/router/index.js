import Vue from "vue";
import VueRouter from "vue-router";
import defaultLayot from "../layout/index.vue";
// import About from "../views/About.vue";
import User from "../views/User/index.vue";
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
        path: "/GameManagement",
        meta: {
          title: "GameManagement",
          show: true,
          index: "0"
        },
        component: nullLayout,
        children: [
          {
            path: "",
            meta: {
              title: "BasicSetting",
              show: true
            },
            redirect: "/GameManagement/gamecompany",
            component: nullLayout,
            children: [
              {
                path: "/GameManagement/gamecompany",
                name: "/GameManagement/gamecompany",
                meta: {
                  title: "GameCompany",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamecompany/index.vue"
                  )
              },
              {
                path: "/GameManagement/gamecompany/add",
                name: "/GameManagement/gamecompany/add",
                meta: {
                  title: "Add",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamecompany/add.vue"
                  )
              },
              {
                path: "/GameManagement/gamecompany/edit",
                name: "edit",
                meta: {
                  title: "Edit",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamecompany/edit.vue"
                  )
              },
              {
                path: "/GameManagement/Gamegroup",
                name: "/GameManagement/Gamegroup",
                meta: {
                  title: "Gamegroup",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamegroup/index.vue"
                  )
              },
              {
                path: "/GameManagement/Gamegroup/edit",
                name: "GamegroupEdit",
                meta: {
                  title: "Edit",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamegroup/edit.vue"
                  )
              },
              {
                path: "/GameManagement/Gamegroup/add",
                name: "add",
                meta: {
                  title: "Add",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "gameCompany" */ "../views/GameManagement/BasicSetting/Gamegroup/add.vue"
                  )
              }
              // {
              //   path: "/GameManagement/GameGroupBlacklist",
              //   name: "/GameManagement/GameGroupBlacklist",
              //   meta: {
              //     title: "游戏分组黑名单",
              //     show: true
              //   },
              //   component: () =>
              //     import(
              //       /* webpackChunkName: "black" */ "../views/GameManagement/BasicSetting/GameGroupBlacklist/index.vue"
              //     )
              // },
              // {
              //   path: "/GameManagement/GameGroupBlacklist/edit",
              //   name: "/GameManagement/GameGroupBlacklist/edit",
              //   meta: {
              //     title: "游戏分组黑名单",
              //     show: false
              //   },
              //   component: () =>
              //     import(
              //       /* webpackChunkName: "black" */ "../views/GameManagement/BasicSetting/GameGroupBlacklist/edit.vue"
              //     )
              // },
              // {
              //   path: "/GameManagement/GameGroupBlacklist/add",
              //   name: "/GameManagement/GameGroupBlacklist/add",
              //   meta: {
              //     title: "游戏分组黑名单",
              //     show: false
              //   },
              //   component: () =>
              //     import(
              //       /* webpackChunkName: "black" */ "../views/GameManagement/BasicSetting/GameGroupBlacklist/add.vue"
              //     )
              // }
            ]
          },
          {
            path: "GameList",
            component: nullLayout,
            meta: {
              title: "GameList",
              show: true
            },
            children: [
              {
                path: "/GameManagement/GameList",
                name: "/GameManagement/GameList",
                meta: {
                  title: "GameList",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/GameManagement/GameList/List/index.vue"
                  )
              },
              {
                path: "/GameManagement/GameList/add",
                name: "add",
                meta: {
                  title: "Add",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/GameManagement/GameList/List/add.vue"
                  )
              },
              {
                path: "/GameManagement/GameList/edit",
                name: "edit",
                meta: {
                  title: "Edit",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/GameManagement/GameList/List/edit.vue"
                  )
              },
              {
                path: "/GameManagement/GameStrategy",
                name: "/GameManagement/GameStrategy",
                meta: {
                  title: "GameStrategy",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/GameManagement/GameList/ChangeStrategy/index.vue"
                  )
              },
              {
                path: "/GameManagement/GameStrategy/add",
                name: "/GameManagement/GameStrategy/add",
                meta: {
                  title: "Add",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "add" */ "../views/GameManagement/GameList/ChangeStrategy/add.vue"
                  )
              },
              {
                path: "/GameManagement/GameStrategy/edit",
                name: "/GameManagement/GameStrategy/edit",
                meta: {
                  title: "Edit",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/GameManagement/GameList/ChangeStrategy/edit.vue"
                  )
              }
            ]
          },
          {
            path: "BtSrv",
            component: nullLayout,
            meta: {
              title: "BtSrvDistributeGame",
              show: true
            },
            children: [
              {
                path: "/GameManagement/BtSrv",
                name: "/GameManagement/BtSrv",
                meta: {
                  title: "BtSrvGameStatus",
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
        path: "/ServerManagement",
        meta: {
          title: "ServerManagement",
          index: "1"
        },
        component: nullLayout,
        redirect: "/ServerManagement/BasicSetting",
        children: [
          {
            path: "",
            name: "BasicSetting",
            meta: {
              title: "BasicSetting"
            },
            redirect: "/ServerManagement/BasicSetting/LineType",
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/BasicSetting/LineType",
                name: "LineType",
                meta: {
                  title: "LineType",
                  show: true
                },
                component: LineType
              },
              {
                path: "/ServerManagement/LineType/edit",
                name: "editLineType",
                meta: {
                  show: false,
                  title: "Edit"
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
                  show: false,
                  title: "Add"
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
              title: "BTServer",
              show: true
            },
            name: "BTserver",
            children: [
              {
                path: "/ServerManagement/BtServerGroup",
                name: "BTserverGroup",
                meta: {
                  title: "BtServerGroup",
                  show: true
                },
                component: BtServerGroup
              },
              {
                path: "/ServerManagement/BtServerGroup/add",
                name: "BTserverGroupList",
                meta: {
                  title: "Add",
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
                  title: "Edit",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Group/edit.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory",
                name: "BtServerCategory",
                meta: {
                  title: "BtServerList",
                  show: true
                },
                component: BtServerCategory
              },
              {
                path: "/ServerManagement/BtServerCategory/add",
                name: "BtServerCategoryadd",
                meta: {
                  show: false,
                  title: "Add"
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Category/add.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory/Gamelist",
                name: "BtServerGameList",
                meta: {
                  show: false,
                  title: "游戏详情"
                },
                component: () =>
                  import(
                    /* webpackChunkName: "addBtServerCategory" */ "../views/ServerManagement/BTServer/Category/GameList.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory/edit",
                name: "BtServerCategoryedit",
                meta: {
                  show: false,
                  title: "Edit"
                },
                component: () =>
                  import(
                    /* webpackChunkName: "editBtServerCategory" */ "../views/ServerManagement/BTServer/Category/edit.vue"
                  )
              },
              {
                path: "/ServerManagement/BtServerCategory/setRunConfig",
                name: "BtServerCategorysetRunConfig",
                meta: {
                  show: false,
                  title: "SetRunConfig"
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
                  title: "SeedServerList",
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
                  title: "Add",
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
                  title: "Edit",
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
              title: "BTClient"
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/BTClient",
                name: "/ServerManagement/BTClient",
                meta: {
                  title: "BTClient",
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
                  title: "SetRunConfig",
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
                  title: "Tracker",
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
              title: "FTPServer",
              show: true
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/FTPServer",
                name: "/ServerManagement/FTPServer",
                meta: {
                  title: "FTPServer",
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
                  title: "Add",
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
                  title: "Edit",
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
              title: "ClusterLoginServer",
              show: true
            },
            component: nullLayout,
            children: [
              {
                path: "/ServerManagement/ClusterLoginServer",
                name: "/ServerManagement/ClusterLoginServer",
                meta: {
                  title: "ClusterLoginServer",
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
                  title: "Add",
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
                  title: "Edit",
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
        path: "/EventMonitoring",
        meta: {
          title: "EventMonitoring",
          show: true,
          index: "2"
        },
        redirect: "/EventMonitoring/ConditionMonitoring",
        component: nullLayout,
        children: [
          {
            path: "/EventMonitoring/ConditionMonitoring",
            component: nullLayout,
            redirect: "/EventMonitoring/ConditionMonitoring/ServerState",
            meta: {
              title: "ServerState",
              show: true
            },
            children: [
              {
                path: "/EventMonitoring/ConditionMonitoring/ServerState",
                name: "/EventMonitoring/ConditionMonitoring/ServerState",
                meta: {
                  title: "ServerState",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/ServerState/index.vue"
                  )
              },
              {
                path:
                  "/EventMonitoring/ConditionMonitoring/ServerState/ServerDetails",
                name: "Details",
                meta: {
                  title: "详情",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/ServerState/ServerDetails.vue"
                  )
              },
              {
                path: "/EventMonitoring/ConditionMonitoring/GameState",
                name: "/EventMonitoring/ConditionMonitoring/GameState",
                meta: {
                  title: "GameState",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/GameState/index.vue"
                  )
              },
              {
                path:
                  "/EventMonitoring/ConditionMonitoring/GameState/GameDtails",
                name:
                  "/EventMonitoring/ConditionMonitoring/GameState/GameDetails",
                meta: {
                  title: "GameStateDetails",
                  show: false
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/GameState/GameDetails.vue"
                  )
              },
              {
                path:
                  "/EventMonitoring/ConditionMonitoring/ListOfCurrentValidData",
                name:
                  "/EventMonitoring/ConditionMonitoring/ListOfCurrentValidData",
                meta: {
                  title: "ListOfCurrentValidData",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "black" */ "../views/EventMonitor/ConditionMonitoring/ListOfValidData/index.vue"
                  )
              }
            ]
          },
          {
            path: "/EventMonitoring/EventQuery",
            component: nullLayout,
            redirect: "/EventMonitoring/EventQuery/gameDoseed",
            meta: {
              title: "EventQuery",
              show: true
            },
            children: [
              {
                path: "/EventMonitoring/EventQuery/gameDoseed",
                name: "GameDoseedHistory",
                meta: {
                  title: "GameDoseed",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "EventQuery" */ "../views/EventMonitor/EventQuery/GameSeedHistory/index.vue"
                  )
              },
              // {
              //   path: "/EventMonitoring/GameState",
              //   name: "/EventMonitoring/GameState",
              //   meta: {
              //     title: "游戏BtSrv同步日志",
              //     show: true
              //   }
              // },
              {
                path: "/EventMonitoring/EventQuery/GameProduceJSOMLog",
                name: "/EventMonitoring/EventQuery/GameProduceJSOMLog",
                meta: {
                  title: "GameProduceJSOMLog",
                  show: true
                },
                component: () =>
                  import(
                    /* webpackChunkName: "EventQuery" */ "../views/EventMonitor/EventQuery/GameProduceJSOMLog/index.vue"
                  )
              }
              // {
              //   path: "/EventMonitoring/ListOfCurrentValidData",
              //   name: "/EventMonitoring/ListOfCurrentValidData",
              //   meta: {
              //     title: "FTP文件变更日志",
              //     show: true
              //   },
              //   component: About
              // },
              // {
              //   path: "/EventMonitoring/Serverlog",
              //   name: "/EventMonitoring/Serverlog",
              //   meta: {
              //     title: "服务器异常日志",
              //     show: true
              //   },
              //   component: About
              // }
            ]
          }
        ]
      }
      // {
      //   path: "/base",
      //   meta: {
      //     title: "基础设置",
      //     show: true,
      //     index: "3"
      //   },
      //   component: nullLayout,
      //   children: [
      //     {
      //       path: "",
      //       meta: {
      //         title: "用户管理",
      //         show: true
      //       },
      //       component: nullLayout,
      //       children: [
      //         {
      //           path: "",
      //           meta: {
      //             title: "授权类表",
      //             show: true
      //           },
      //           component: () =>
      //             import(
      //               /* webpackChunkName: "Role" */ "../views/BasicSetting/Role/index.vue"
      //             )
      //         },
      //         {
      //           path: "",
      //           meta: {
      //             title: "角色列表"
      //           },
      //           component: About
      //         },
      //         {
      //           path: "",
      //           meta: {
      //             title: "用户列表",
      //             show: true
      //           },
      //           component: About
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  },
  {
    path: "/User",
    name: "User",
    redirect: "/User/login",
    component: User,
    children: [
      {
        path: "/User/login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../components/login.vue")
      },
      {
        path: "/User/forgetPassword",
        component: () =>
          import(
            /* webpackChunkName: "forgetPassword" */ "../components/forgetPassword.vue"
          )
      },
      {
        path: "/User/regist",
        component: () =>
          import(/* webpackChunkName: "regist" */ "../components/regist.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "hash",
  routes
});

export default router;
