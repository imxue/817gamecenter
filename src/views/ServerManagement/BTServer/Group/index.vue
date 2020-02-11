<template>
  <div>
    <Row>
      <Col span="2">
        <router-link to="/ServerManagement/BtServerGroup/add">
          <Button type="success">
            添加
          </Button>
        </router-link>
      </Col>
      <Col span="2">
        <Button type="info" @click="HandleEdit">
          编辑
        </Button>
      </Col>
    </Row>
    <div style="margin-top:10px;">
      <Table
        :columns="columns"
        :data="data"
        border
        :loading="loading"
        @on-selection-change="ChangeSelection"
      ></Table>
    </div>
  </div>
</template>

<script>
import { getBTServerGroup } from "@/api/server";
export default {
  name: "GroupIndex",
  data() {
    return {
      loading: true,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "分组名称",
          key: "name"
        },
        {
          title: "状态",
          key: "enable",
          render: (h, params) => {
            let a = "";
            switch (params.row.enable) {
              case 1:
                a = h("span", "启用");
                break;
              case 0:
                a = h("span", "禁用");
                break;
              default:
                a = h("span", params.row.enable);
                break;
            }
            return a;
          }
        },
        {
          title: "操作人",
          key: "operator"
        },
        {
          title: "操作人",
          key: "update_time"
        }
      ],
      data: [],
      selectedItems: []
    };
  },
  async created() {
    try {
      let resp = await getBTServerGroup();
      this.data = resp.data;
    } catch (error) {
      console.log(error);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    ChangeSelection(item) {
      this.selectedItems = item;
    },
    HandleEdit() {
      if (this.selectedItems.length === 1) {
        this.$router.push({
          path: "/ServerManagement/BtServerGroup/edit",
          query: this.selectedItems
        });
      } else {
        this.$Message.info("请选择一项");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
a {
  color: white;
}
</style>
