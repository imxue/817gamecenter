<template>
  <div>
    <Row :gutter="16">
      <Col span="5">
        <Select v-model="id" @on-change="HandleLineTypeId">
          <Option v-for="item in LineType" :value="item.id" :key="item.id">{{
            item.name
          }}</Option>
        </Select>
      </Col>
      <Col span="6">
        <Input search enter-button="搜索" placeholder="Enter something..." />
      </Col>
    </Row>

    <Row style="margin:10px 0;">
      <Col span="2">
        <router-link to="/ServerManagement/BtServer/SeedServerList/add">
          <Button type="success">
            添加
          </Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandleStart">
          启用
        </Button>
      </Col>
      <Col span="2">
        <Button type="info" @click="Handledisable">
          停用
        </Button>
      </Col>
    </Row>
    <div>
      <div style="marginBottom:10px;">
        <Checkbox-group
          v-model="tableColumnsChecked"
          @on-change="changeTableColumns"
        >
          <Checkbox label="OnlineStatu">在线状态</Checkbox>
          <Checkbox label="Region">所在地区</Checkbox>
          <Checkbox label="LineType">线路类型</Checkbox>
          <Checkbox label="IP">IP地址</Checkbox>
          <Checkbox label="lastHeartbeat">最后心跳时间</Checkbox>
          <Checkbox label="status">是否启用</Checkbox>
          <Checkbox label="Operator">操作人</Checkbox>
        </Checkbox-group>
      </div>
      <Table
        :columns="columns"
        :data="data"
        border
        @on-selection-change="ChangeSelection"
      ></Table>
    </div>
  </div>
</template>

<script>
import {
  getDoSeedServer,
  getLineType,
  enableDoSeedServer,
  disenableDoSeedServer
} from "@/api/server.js";
export default {
  name: "SeedServerListIndex",
  data() {
    return {
      model1: "",
      tableColumnsChecked: ["selection", "OnlineStatu", "Region", "LineType"],
      columns: [],
      data: [],
      offset: 0,
      limit: 10,
      order: "",
      id: 0,
      ip: "",
      LineType: [],
      selectedItems: []
    };
  },
  methods: {
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    getTableColumns() {
      const ColumnList = {
        selection: {
          type: "selection",
          width: 60,
          align: "center"
        },
        OnlineStatu: {
          title: "在线状态",
          key: "is_online",
          width: 130
        },
        Region: {
          title: "所在地区",
          key: "area_name"
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
        lastHeartbeat: {
          title: "最后心跳时间",
          key: "last_heart_time",
          width: 130,
          sortable: true
        },
        status: {
          title: "是否启用",
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
    async HandleGetData(offset, limit, order, id, ip) {
      try {
        let resp = await getDoSeedServer(offset, limit, order, id, ip);
        this.data = resp.data.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async HandleGetLineType() {
      let resp = await getLineType();
      this.LineType = resp.data;
      this.LineType.push({
        id: 0,
        name: "所有类型"
      });
    },
    HandleLineTypeId(id) {
      this.id = id === 0 ? "" : id;
      this.HandleGetData(this.offset, this.limit, this.order, this.id, this.ip);
    },
    async HandleStart() {
      if (this.selectedItems.length > 0) {
        let str = [];
        this.selectedItems.forEach(item => {
          str.push(item.ip);
        });
        try {
          await enableDoSeedServer({
            ips: str.join(",")
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$Message.info("请选择一项");
      }
    },
    async Handledisable() {
      if (this.selectedItems.length > 0) {
        let str = [];
        this.selectedItems.forEach(item => {
          str.push(item.ip);
        });
        try {
          await disenableDoSeedServer({
            ips: str.join(",")
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.$Message.info("请选择一项");
      }
    }
  },
  mounted() {
    this.changeTableColumns();
    this.HandleGetData(this.offset, this.limit, this.order, this.id, this.ip);
    this.HandleGetLineType();
  }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
.search_bar {
  display: flex;
}
</style>
