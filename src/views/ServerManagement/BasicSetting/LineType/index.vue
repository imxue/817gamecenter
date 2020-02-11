<template>
  <div>
    <Row>
      <Col span="2">
        <router-link to="/ServerManagement/LineType/add">
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
        :loading="loading"
        :columns="columns"
        :data="data"
        border
        @on-selection-change="ChangeSelection"
      ></Table>
    </div>
  </div>
</template>

<script>
import { getLineType } from "@/api/server";
export default {
  name: "LineTypeIndex",
  data() {
    return {
      loading: true,
      selectedItems: [], // 选择的项
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "ISP名称",
          key: "name"
        },
        {
          title: "是否启用",
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
          title: "最后操作时间",
          key: "update_time"
        }
      ],
      data: []
    };
  },
  async created() {
    try {
      let resp = await getLineType();
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
          path: "/ServerManagement/LineType/edit",
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
