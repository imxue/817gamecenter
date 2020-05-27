<template>
  <div>
    <Row :gutter="16" style="marginBottom:10px;">
      <Col span="2">
        <router-link to="/GameManagement/Gamegroup/add">
          <Button type="info">添加</Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info">编辑</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data" border :loading="loading"></Table>
  </div>
</template>
<script>
import { getGameblacklist } from "@/api/server";
export default {
  name: "index",
  data() {
    return {
      loading: true,
      columns: [
        {
          key: "name",
          title: "分组名称"
        },
        {
          key: "name",
          title: "分组显示名称",
          width: "140"
        },
        {
          key: "name",
          title: "子类型"
        },
        {
          key: "name",
          title: "默认下载路径",
          width: "140"
        },
        {
          key: "name",
          title: "是否控制台显示",
          width: "140"
        },
        {
          key: "name",
          title: "状态"
        },
        {
          key: "name",
          title: "操作人 "
        },
        {
          key: "name",
          title: "操作"
        }
      ],
      data: []
    };
  },
  created() {
    this.HandleGetData();
  },
  methods: {
    async HandleGetData() {
      this.loading = true;
      try {
        let resp = await getGameblacklist();
        this.data = resp.data.data.data;
      } catch (error) {
        this.$Message.error(error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
