<template>
  <div>
    <Table :columns="columns" :data="data" border></Table>
  </div>
</template>

<script>
export default {
  name: "ServerDetails",
  data() {
    return {
      columns: [
        {
          key: "type",
          title: this.$t("Type"),
          minWidth: 100
        },
        {
          key: "ip",
          title: "IP",
          minWidth: 140
        },
        {
          key: "group_name",
          title: this.$t("Group"),
          minWidth: 100
        },
        {
          key: "state",
          title: this.$t("Status"),
          minWidth: 90
        },
        {
          key: "up",
          title:
            this.$t("Upstream") +
            this.$t("Utiliz") +
            "/" +
            this.$t("Current") +
            "/" +
            this.$t("Max"),
          minWidth: 220
        },
        {
          key: "down",
          title:
            this.$t("Downstream") +
            this.$t("Utiliz") +
            "/" +
            this.$t("Current") +
            "/" +
            this.$t("Max"),
          minWidth: 250
        },
        {
          key: "conn",
          title:
            this.$t("Link") +
            this.$t("Utiliz") +
            "/" +
            this.$t("Current") +
            "/" +
            this.$t("Max"),
          minWidth: 260
        },

        {
          key: "version",
          title: this.$t("Program") + this.$t("Version"),
          minWidth: 150
        },
        {
          key: "type",
          minWidth: 180,
          title: this.$t("Last") + this.$t("Heartbeat") + this.$t("Time")
        }
      ],
      data: [],
      ServerType: {
        0: "BTServer",
        1: "Tracker",
        2: this.$t("Cluster") + this.$t("Server"),
        3: "FTP" + this.$t("Server")
      }
    };
  },
  created() {
    this.$route.query.data.forEach(element => {
      this.format(element);
    });
    this.data = this.$route.query.data;
  },
  methods: {
    format(obj) {
      obj.type = this.ServerType[this.$route.query.type];
      obj.up = `${obj.up_load_ratio} /
        ${obj.cur_up_load} /
        ${obj.max_up_load}`;
      obj.conn = `${obj.conn_ratio.toFixed(0)} /
        ${obj.cur_conn.toFixed(0)} /
        ${obj.max_conn}`;
      obj.down = `${obj.down_load_ratio.toFixed(0)} /
        ${obj.cur_down_load.toFixed(0)} /
        ${obj.max_down_load}`;
    }
  }
};
</script>
