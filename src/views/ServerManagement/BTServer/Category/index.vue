<template>
  <div>
<Row>
      <Col span="5" style="padding-right:10px">
         <Select v-model="ServerType" @on-change="HandleServerTypeId">
           <Option value='999'>所以类型</option>
            <Option :value=1>非做种服务器</option>
            <Option :value=0>做种服务器</option>
      </Select> 
        </Col>
           <Col span="5" style="padding-right:10px">
      <Select v-model="LineTypeId" @on-change="HandleLineTypeId">
        <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
        </Col>
               </Col>
           <Col span="5" style="padding-right:10px">
      <Select v-model="ServerGroupId" @on-change="HandleServerGroupId">
        <Option v-for="item in ServerGroup" :value="item.id" :key="item.id">{{
          item.name
        }}</Option>
      </Select>
        </Col>
           <Col span="6" style="padding-right:10px">
    <Input search enter-button="搜索" placeholder="Enter something..." />
        </Col>
    
</Row>
<div style="margin:10px 0;">

<Row>
    <Col span="2" style="padding-right:6px;">
      <router-link to="/ServerManagement/BtServerCategory/add">
        <Button type="success">
          添加
        </Button>
      </router-link>
        </Col>
        <Col span="2" style="padding-right:6px">
        <Button type="info" @click="HandleEdit">
          编辑
        </Button>
        </Col>
    <Col span="2" >
        <Button type="info" @click="HandlesetRunConfig">
          设置运行配置
        </Button>
        </Col>
</Row>
</div>
    <div>
      <Checkbox-group
        v-model="tableColumnsChecked"
        @on-change="changeTableColumns"
      >
        <Checkbox label="OnlineStatu">在线状态</Checkbox>
        <Checkbox label="type">类型</Checkbox>
        <Checkbox label="Group">所在分组</Checkbox>
        <Checkbox label="Region">所在地区</Checkbox>
        <Checkbox label="LineType">线路类型</Checkbox>
        <Checkbox label="IP">IP地址</Checkbox>
        <Checkbox label="ExceptionCount">异常数</Checkbox>
        <Checkbox label="CurrentExceptionCount">最近异常信息</Checkbox>
        <Checkbox label="lastHeartbeat">最后心跳时间</Checkbox>
        <Checkbox label="status">状态</Checkbox>
        <Checkbox label="Operator">操作人</Checkbox>
      </Checkbox-group>
      <Table :columns="columns" :data="data" border :loading="loading" @on-selection-change="ChangeSelection"></Table>
    </div>
  </div>
</template>

<script>
import { getLineType, getBTServerGroup, getBTServer } from "@/api/server";
// getBTServer
export default {
  name: "ListIndex",
  data() {
    return {
      loading: true,
      model1: "",
      tableColumnsChecked: [
        "selection",
        "OnlineStatu",
        "type",
        "Group",
        "Region",
        "LineType"
      ],
      columns: [],
      data: [],
      LineType: [],
      ServerGroup: [],
      offset:0,
      limit:10,
      LineTypeId: "0",
      ServerGroupId: "0",
      selectedItems:[],
      ServerType: '999'
    };
  },
  methods: {
    ChangeSelection(item) {
      this.selectedItems = item
    },
    HandleServerTypeId(item) {
      if (item === "999") {
        this.ServerType = ''
      } else {
        this.ServerType = item
      }

this.HandleGetBTServer(this.offset,this.limit,this.ServerGroupId,this.LineTypeId,this.ServerType)
    },
    getTableColumns() {
      const ColumnList = {
         selection:{
          type: "selection",
          width: 60,
          align: "center"
        },
        OnlineStatu: {
          title: "在线状态",
          key: "is_online",
          width: 130
        },
        type: {
          title: "类型",
          key: "type",
          width: 130
        },
        Group: {
          title: "所在分组",
          key: "bt_server_group",
          width: 130
        },
        Region: {
          title: "所在地区",
          key: "area_name",
          sortable: true
        },
        LineType: {
          title: "线路类型",
          key: "line_type",
          width: 150,
          sortable: true
        },
        IP: {
          title: "IP地址",
          key: "ip",
          sortable: true
        },
        ExceptionCount: {
          title: "异常数",
          key: "except_count",
          sortable: true,
          width: 130
        },
        CurrentExceptionCount: {
          title: "最近异常信息",
          key: "except_msg",
          width: 130,
          minWidth: 130
        },
        BtProgram: {
          title: "Bt程序版本",
          key: "BtProgram",
          sortable: true,
          width: 130,
          minWidth: 130
        },
        lastHeartbeat: {
          title: "最后心跳时间",
          key: "last_heart_time",
          width: 130,
          sortable: true
        },
        status: {
          title: "状态",
          key: "enable",
          width: 130
        },
        Operator: {
          title: "操作人",
          width: 130,
          key: "operator"
        }
      };
      let data = [];
      this.tableColumnsChecked.forEach(col => data.push(ColumnList[col]));
      return data;
    },
    changeTableColumns() {
      this.columns = this.getTableColumns();
    },
    HandleLineTypeId(id) {
       this.LineTypeId = id
       this.HandleGetBTServer(this.offset,this.limit,this.ServerGroupId,this.LineTypeId)
    },
    HandleServerGroupId(id) {
      this.ServerGroupId = id
      this.HandleGetBTServer(this.offset,this.limit,this.ServerGroupId,this.LineTypeId)
    },
    async HandleGetBTServer(offset,limit,groupid,linetypeid,type) {
      this.loading = true;
      groupid = groupid === '0' ? '' : groupid
      linetypeid = linetypeid === '0' ? '' : linetypeid
      try {
      let resp = await getBTServer({ offset: offset, limit: limit,groupid:groupid,linetypeid:linetypeid,type:type });
      this.data = resp.data.data.data;
    } catch (error) {
      console.log(error);
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
        this.$Message.info("请选择一项");
      }
    },
    HandlesetRunConfig() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/BtServerCategory/setRunConfig",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    }
  },
  async created() {
    this.changeTableColumns();
    Promise.all([getLineType(), getBTServerGroup()]).then(
      resp => {
        this.LineType = resp[0].data;
        this.LineType.push({
          id: "0",
          name: "所有类型"
        });
        this.ServerGroup = resp[1].data;
        this.ServerGroup.push({
          id: "0",
          name: "所有分组"
        });
      },
      e => {
        console.log(e);
      }
    );

    this.HandleGetBTServer(0,10)
  },

  // mounted() {
  //   this.changeTableColumns();
  // }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
</style>
