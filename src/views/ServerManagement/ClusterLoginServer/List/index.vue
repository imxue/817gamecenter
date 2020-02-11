<template>
  <div>
    <Row :gutter="16">
      <Col span="5">
        <Select v-model="model1">
          <Option
            v-for="item in cityList"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</Option
          >
        </Select>
      </Col>
      <Col span="6">
        <Input search enter-button="Search" placeholder="Enter something..." />
      </Col>
    </Row>
    <Row style="margin:10px 0;">
      <Col span="2">
        <router-link to="/ServerManagement/ClusterLoginServer/add">
          <Button type="info">添加</Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandleEdit">编辑</Button>
      </Col>
    </Row>

    <Table
      :columns="columns"
      :data="data"
      border
      @on-selection-change="ChangeSelection"
    ></Table>
  </div>
</template>
<script>
import { getClusterLginServer } from "@/api/server";
export default {
  name: "TrackerIndex",
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "在线状态",
          key: "is_online"
        },
        {
          title: "服务器类型 ",
          key: "type"
        },
        {
          title: "IP",
          key: "server_ip"
        },
        {
          title: "端口",
          key: "port"
        },
        {
          title: "线路类型",
          key: "line_type"
        },
        {
          title: "程序版本",
          key: "version"
        },
        {
          title: "是否启用",
          key: "status"
        },
        {
          title: "最后心跳时间",
          key: "last_heart_time"
        },
        {
          title: "操作人",
          key: "name"
        },
        {
          title: "操作人",
          key: "operator"
        },
        {
          title: "最后操作时间",
          key: "update_time"
        }
      ],
      data: [],
      offset: 0,
      limit: 10,
      selectedItems: []
    };
  },
  created() {
    this.HandleGetData(this.offset, this.limit);
  },
  methods: {
    async HandleGetData(offset, limit, order, id, ip) {
      try {
        let resp = await getClusterLginServer(offset, limit, order, id, ip);
        this.data = resp.data.data.data;
        console.log(this.data);
      } catch (error) {
        console.log(error);
      }
    },
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/ClusterLoginServer/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    }
  }
};
</script>
