<template>
  <div>
    <div style="display:flex;">
      <Select
        v-model="ServerType"
        @on-change="HandleServerTypeId"
        style="width:220px;marginRight:10px;"
      >
        <Option :value="999">{{ $t("All") }}{{ $t("Type") }}</Option>
        <Option :value="1"
          >{{ $t("Not") }}{{ $t("Seeding") }}{{ $t("Server") }}</Option
        >
        <Option :value="0">{{ $t("Seeding") }}{{ $t("Server") }}</Option>
      </Select>
      <Select
        style="width:220px;marginRight:10px;"
        v-model="LineTypeId"
        @on-change="HandleLineTypeId"
        :disabled="screenDisable"
      >
        <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Select
        style="width:220px;marginRight:10px;"
        v-model="ServerGroupId"
        @on-change="HandleServerGroupId"
        :disabled="screenDisable"
      >
        <Option v-for="item in ServerGroup" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
      <Input
        v-model="ip"
        search
        style="width:300px"
        :enter-button="this.$t('Search')"
        :placeholder="this.$t('Input') + this.$t('IP') + this.$t('Search')"
        @on-search="HandleSearch"
      />
    </div>
    <div style="margin:10px 0;display:flex;">
      <Col style="padding-right:6px;">
        <router-link to="/ServerManagement/BtServerCategory/add">
          <Button type="success">
            {{ $t("Add") }}
          </Button>
        </router-link>
      </Col>
      <Col style="padding-right:6px">
        <Button type="info" @click="HandleEdit">
          {{ $t("Edit") }}
        </Button>
      </Col>
      <Col>
        <Button type="info" @click="HandlesetRunConfig">
          {{ $t("Set") }}{{ $t("RunConfig") }}
        </Button>
      </Col>
    </div>
      <Table
      size="small"
        :columns="columns"
        :data="data"
        border
        :loading="loading"
        @on-selection-change="ChangeSelection"
        context-menu
      show-context-menu
      @on-contextmenu="handleContextMenu"
      >
       <template slot="contextMenu">
        <DropdownItem
          @click.native="handleContextMenuEdit"
          >{{$t('Edit')}}</DropdownItem>
        <DropdownItem style="color: #ed4014" @click.native="handleContextMenuResou">{{$t('ResourceStatus')}}</DropdownItem>
        <DropdownItem style="color: #ed4014" @click.native="handleContextMenuSetRun">{{ $t("Set") }}{{ $t("RunConfig") }}</DropdownItem>
      </template>
      </Table>
      <Page
        show-total
        :total="pageinfo.count"
        :page-size="limit"
        style="margin-top:10px;float:right;"
        @on-change="HandleChangePage"
      />
    </div>
  </div>
</template>

<script>
import { getAllenabled, getAllBtServerGroupenabled, getBTServer } from "@/api/server";
import { parseTime } from "@/utils";
export default {
  name: "ListIndex",
  data() {
    return {
      loading: true,
      model1: "",
      screenDisable: false, // 筛选条件
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: this.$t("Online") + this.$t("Status"),
          key: "is_online",
          minWidth: 90,
          maxWidth: 90,
          render: (h, params) => {
            let isOnline = {
              1: {
                title: this.$t("Online"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Offline"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: isOnline[params.row.is_online].color
                }
              },
              isOnline[params.row.is_online].title
            );
          }
        },
        {
          title: this.$t("Type"),
          key: "type",
          width: 150,
          render: (h, params) => {
            let type = {
              0: this.$t("Seeding") + this.$t("Server"),
              1: this.$t("Not") + this.$t("Seeding") + this.$t("Server")
            };
            return h("span", type[params.row.type]);
          }
        },
        {
          title: this.$t("Group"),
          key: "bt_server_group",
          width: 130
        },
        {
          title: this.$t("Region"),
          key: "area_name",
          width: 130
        },
        {
          title: this.$t("Line") + this.$t("Type"),
          key: "line_type",
          width: 100
        },
        {
          title: this.$t("IP") + this.$t("Address"),
          key: "ip",
          width: 140
        },
        {
          title: this.$t("Exceptions"),
          key: "except_count",
          minWidth: 115
        },
        {
          title: this.$t("Lately") + this.$t("Exceptions") + this.$t("Message"),
          key: "except_msg",
          minWidth: 185,
          ellipsis:true,
          tooltip: true
        },
        {
          title: this.$t("BT") + this.$t("Program") + this.$t("Version"),
          key: "version",
          minWidth: 110,
          maxWidth: 110,
          ellipsis:true,
          tooltip: true
        },
        {
        title: this.$t("Available"),
          key: "enable",
          minWidth: 100,
          maxWidth: 100,
          render: (h, params) => {
            let opt = {
              1: {
                title: this.$t("Enable"),
                color: "#52c41a"
              },
              0: {
                title: this.$t("Disabled"),
                color: "#ffa39e"
              }
            };
            return h(
              "span",
              {
                style: {
                  color: opt[params.row.enable].color
                }
              },
              opt[params.row.enable].title
            );
          }
        },
        {
          title: this.$t("Last") + this.$t("Heartbeat") + this.$t("Time"),
          key: "last_heart_time",
          minWidth: 170,
          maxWidth: 170,
          render: (h, params) => {
            return h("span", parseTime(params.row.last_heart_time));
          }
        },
        {
          title: this.$t("Status"),
          minWidth: 130,
          key: "operator",
          fixed: 'right',
          render: (h, params) => {
            let a;
            a= h('Button',{
              props:{
                type:"primary"
              },
             on:{
               click: () => {
                this.getGameIp(params.row.ip)
              }
             }
            },this.$t('ResourceStatus'))
            return a
          }
        }
      ],
      data: [],
      LineType: [],
      ServerGroup: [],
      offset: 0,
      limit: 10,
      LineTypeId: "0",
      ServerGroupId: "0",
      selectedItems: [],
      ServerType: 999,
      orderby: "",
      pageinfo: {
        page_index: 0,
        page_size: 1,
        count: 2
      },
      ip: "",
      currentItem:""
    };
  },
  methods: {
    HandleChangePage(page) {
      this.HandleGetBTServer({
        offset: page * this.limit - this.limit,
        limit: page * this.limit,
        type: this.ServerType || '',
        groupid: this.ServerGroupId || '',
        linetypeid: this.LineTypeId || '',
        ip: this.ip || '',
        orderby: this.orderby || ''
      });
    },
    HandleSearch(v) {
      this.ip = v;
      this.HandleGetBTServer({
        offset: this.offset,
        limit: this.limit,
        type: this.ServerType,
        groupid: this.ServerGroupId,
        linetypeid: this.LineTypeId,
        ip: this.ip,
        orderby: this.orderby
      });
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleServerTypeId(item) {
      this.ServerType = item;
      this.HandleGetBTServer({
        offset: this.offset,
        limit: this.limit,
        type: this.ServerType,
        groupid: this.ServerGroupId,
        linetypeid: this.LineTypeId,
        ip: this.ip,
        orderby: this.orderby
      });
    },
    HandleLineTypeId(id) {
      this.LineTypeId = id;
      this.HandleGetBTServer({
        offset: this.offset,
        limit: this.limit,
        type: this.ServerType,
        groupid: this.ServerGroupId,
        linetypeid: this.LineTypeId,
        ip: this.ip,
        orderby: this.orderby
      });
    },
    HandleServerGroupId(id) {
      this.ServerGroupId = id;
      this.HandleGetBTServer({
        offset: this.offset,
        limit: this.limit,
        type: this.ServerType,
        groupid: this.ServerGroupId,
        linetypeid: this.LineTypeId,
        ip: this.ip,
        orderby: this.orderby
      });
    },
    async HandleGetBTServer({
      offset,
      limit,
      type,
      groupid,
      linetypeid,
      ip,
      orderby
    }) {
      this.loading = true;
      groupid = groupid === "0" ? "" : groupid;
      linetypeid = linetypeid === "0" ? "" : linetypeid;
      type = type === 999 ? "" : type;
      try {
        let resp = await getBTServer({
          offset,
          limit,
          type,
          groupid,
          linetypeid,
          ip,
          orderby
        });
        this.data = resp.data.data.data;
        this.pageinfo = resp.data.data.pageino;
      } catch (error) {
        this.$Message.info(
          this.$t("Get") +
            this.$t("BT") +
            this.$t("Server") +
            this.$t("List") +
            this.$t("Failed")
        );
      } finally {
        this.loading = false;
      }
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/BtServerCategory/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    HandlesetRunConfig() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/BtServerCategory/setRunConfig",
          query: this.selectedItems
        });
      } else {
        this.$Message.info(this.$t("PleaseSelectOneItem"));
      }
    },
    getGameIp(e) {
      this.$router.push({
        path: "/ServerManagement/BtServerCategory/Gamelist",
        query: {ip:e}
      })
      
    },
    handleContextMenu(row) {
      this.currentItem = row
    },
    handleContextMenuResou() {
      this.currentItem.ip
      this.$router.push({
        path: "/ServerManagement/BtServerCategory/Gamelist",
        query: {ip:this.currentItem.ip}
      })
      
    },
    handleContextMenuEdit() {
      this.$router.push({
          path: "/ServerManagement/BtServerCategory/setRunConfig",
          query: [this.currentItem]
        });
    },
    handleContextMenuSetRun() {
      this.$router.push({
          path: "/ServerManagement/BtServerCategory/setRunConfig",
          query: [this.currentItem]
        });
    }
  },
  async created() {
    this.screenDisable = true;
    Promise.all([getAllenabled(), getAllBtServerGroupenabled()]).then(
      resp => {
        this.LineType = resp[0].data.data;
        this.LineType.unshift({
          id: "0",
          name: this.$t("All") + this.$t("Line") + this.$t("Type")
        });
        this.ServerGroup = resp[1].data.data;
        this.ServerGroup.unshift({
          id: "0",
          name: this.$t("All") + this.$t("Group")
        });
        this.screenDisable = false;
      },
      () => {
        this.$Message.info(
          this.$t("Get") +
            this.$t("Line") +
            this.$t("Group") +
            this.$t("List") +
            this.$t("Failed")
        );
      }
    );

    this.HandleGetBTServer({
      offset: this.offset,
      limit: this.limit,
      type: this.ServerType,
      groupid: this.ServerGroupId,
      linetypeid: this.LineTypeId,
      ip: this.ip,
      orderby: this.orderby
    });
    
  }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
</style>
