<template>
  <div class="login">
    <Card dis-hover>
      <div class="title">
        <span>{{ $t("GameCenter") }}</span>
        <Dropdown @on-click="HandleChange">
          <a href="javascript:void(0)">
            {{ $t("language") }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list">
            <DropdownItem
              v-for="item in langName"
              :name="item.value"
              :key="item.value"
              :selected="item.value === selectedLang"
              >{{ item.name }}</DropdownItem
            >
          </DropdownMenu>
        </Dropdown>
      </div>
      <router-view />
    </Card>
  </div>
</template>
<script>
export default {
  name: "User",
  data() {
    return {
      langName: [],
      selectedLang: ""
    };
  },
  mounted() {
    this.selectedLang = localStorage.getItem("GameLang");
    for (const key in this.$i18n.messages) {
      if (this.$i18n.messages.hasOwnProperty(key)) {
        this.langName.push({
          value: key,
          name: this.$i18n.messages[key].lang
        });
      }
    }
  },
  methods: {
    HandleChange(value) {
      this.selectedLang = value;
      this.$i18n.locale = value;
      localStorage.setItem("GameLang", value);
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  margin: 0px auto;
  padding: 0 16px;
  background-color: #f8f8f9;
  padding-top: 10%;
}
.title {
  display: flex;
  justify-content: space-between;
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e8eaec;
}
</style>
