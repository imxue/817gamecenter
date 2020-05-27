<template>
  <div style="width:850px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="130" label-colon>
      <Row>
        <Col span="12">
          <FormItem prop="name" :label="this.$t('Name')">
            <Input type="text" v-model="form.name" />
          </FormItem>
          <FormItem prop="name" :label="this.$t('Game') + this.$t('Type')">
            <Select v-model="form.type_id">
              <template v-for="item in GameType">
                <Option
                  :key="item.id"
                  :value="item.id"
                  v-if="item.enable === 1"
                  >{{ item.name }}</Option
                >
              </template>
            </Select>
          </FormItem>
          <FormItem
            prop="display_name"
            :label="this.$t('Display') + this.$t('Name')"
          >
            <Input type="text" v-model.trim="form.display_name" />
          </FormItem>
          <FormItem
            prop="is_menu_display"
            :label="this.$t('Menu') + this.$t('Display')"
          >
            <Select v-model.number="form.is_menu_display">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            prop="is_console_display"
            :label="this.$t('Console') + this.$t('Display')"
          >
            <Select v-model.trim="form.is_console_display">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            prop="run_exe"
            :label="this.$t('Runing') + this.$t('Program')"
          >
            <Input type="text" v-model="form.run_exe" />
          </FormItem>
          <FormItem
            prop="run_parameter"
            :label="this.$t('Runing') + this.$t('Params')"
          >
            <Input type="text" v-model.number="form.run_parameter" />
          </FormItem>
          <FormItem prop="introduce" label="服务器分组">
            <CheckboxGroup v-model="btserverValue">
              <template v-for="item in btserverList">
                <Checkbox
                  :key="item.id"
                  :label="item.id"
                  :disabled="item.enable === 0"
                  >{{ item.name }}</Checkbox
                >
              </template>
            </CheckboxGroup>
          </FormItem>
        </Col>
        <Col span="12">
          <FormItem
            prop="company_id"
            :label="this.$t('Company') + this.$t('Name')"
          >
            <Select v-model="form.company_id">
              <Option
                v-for="item in GameCompany"
                :key="item.id"
                :value="item.id"
                >{{ item.name }}</Option
              >
            </Select>
          </FormItem>
          <FormItem
            prop="website"
            :label="this.$t('Company') + this.$t('Website')"
          >
            <Input type="text" v-model="form.website" />
          </FormItem>
          <FormItem
            prop="search_name"
            :label="this.$t('Search') + this.$t('Name')"
          >
            <Input type="text" v-model="form.search_name" />
          </FormItem>
          <FormItem
            prop="save_path"
            :label="this.$t('Archive') + this.$t('Path')"
          >
            <Input type="text" v-model="form.save_path" />
          </FormItem>
          <FormItem prop="size" :label="this.$t('Size')">
            <Input type="text" v-model.number="form.size">
              <Select v-model="unit" slot="append" style="min-width:60px;">
                <Option value="KB">KB</Option>
                <Option value="MB">MB</Option>
                <Option value="GB">GB</Option>
                <Option value="TB">TB</Option>
              </Select>
            </Input>
          </FormItem>
          <FormItem prop="popularity" :label="this.$t('Fever')">
            <Input type="text" v-model.number="form.popularity" />
          </FormItem>
          <FormItem prop="enable" :label="this.$t('Status')">
            <Select v-model.number="form.enable">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem prop="introduce" :label="this.$t('Introduce')">
            <Input type="textarea" v-model="form.introduce" />
          </FormItem>
        </Col>
      </Row>
      <FormItem>
        <Button
          type="primary"
          @click="handleSubmit('form')"
          :disabled="loading"
          style="marginRight:10px;"
          >{{ $t("Save") }}</Button
        >

        <Button type="primary" @click="handleGoBack()" :disabled="loading">{{
          $t("Back")
        }}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import {
  addGame,
  getAllGameTypeenabled,
  getAllGameCompanyenabled,
  allocateGame,
  verifyGameNameUnique,
  verifyGameDisplalyUnique
} from "@/api/server";
import { getAllBtServerGroupenabled } from "@/api/server.js";
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    const validateGameName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyGameNameUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("TGnax")));
        }
      }
    };
    const validateGameDisplayName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          await verifyGameDisplalyUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("TGnax")));
        }
      }
    };
    return {
      loading: false,
      btserverValue: [],
      btserverList: [],
      unit: "MB",
      count: "",
      form: {
        type_id: "",
        name: "",
        is_console_display: 1,
        is_menu_display: 1,
        display_name: "",
        run_exe: "",
        run_parameter: "",
        introduce: "",
        company_id: "",
        website: "",
        search_name: "",
        save_path: "",
        size: "",
        popularity: 0,
        enable: 1
      },
      GameType: [],
      GameCompany: [],
      rule: {
        name: [
          {
            required: true,
            validator: validateGameName,
            trigger: "blur"
          }
        ],
        display_name: [
          {
            required: true,
            validator: validateGameDisplayName,
            trigger: "blur"
          }
        ],
        company_id: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("fne")
          }
        ],
        run_exe: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.count = this.$route.query.count;
    this.HandleGeTGameType();
    this.HandleGetGameCompany();
    this.fetchBTServerGroup();
  },
  computed: {
    ...mapState({
      GameName: state => state.GameName,
      DisplayName: state => state.DisplayName
    })
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // try {
          this.loading = true;
          this.form.size = this.form.size ? this.form.size : 0;
          this.form.popularity = this.form.popularity
            ? this.form.popularity
            : 0;
          let unit = {
            KB: 1,
            MB: 1024 * 1,
            GB: 1024 ** 2,
            TB: 1024 ** 3
          };
          let size = this.form.size * unit[this.unit];
          let data = JSON.parse(JSON.stringify(this.form));
          data.size = size;
          addGame(data)
            .then(
              resp => {
                if (this.btserverValue.length !== 0) {
                  allocateGame({
                    gameid: resp.data.data.id,
                    groupids: this.btserverValue.join(",")
                  })
                    .then(
                      () => {
                        this.$router.push({
                          path: `/GameManagement/GameList`
                          // query: { lastrPage: this.count }
                        });
                      },
                      () => {
                        this.$Message.error(
                          this.$t("Distribute") + this.$t("Failed")
                        );
                      }
                    )
                    .finally(() => {
                      this.$router.push({
                        path: `/GameManagement/GameList`
                        // query: { lastrPage: this.count }
                      });
                    });
                } else {
                  this.$Message.success(this.$t("Add") + this.$t("Success"));
                  this.$router.push({
                    path: `/GameManagement/GameList`
                    // query: { lastrPage: this.count }
                  });
                }
              },
              () => {
                this.$Message.error(this.$t("Add") + this.$t("Failed"));
              }
            )
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    async HandleGeTGameType() {
      try {
        let resp = await getAllGameTypeenabled();
        this.GameType = resp.data.data;
        // this.form.type_id = this.GameType[0].id;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Type") + this.$t("Failed")
        );
      }
    },
    async HandleGetGameCompany() {
      try {
        let resp = await getAllGameCompanyenabled();
        this.GameCompany = resp.data.data;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") +
            this.$t("Game") +
            this.$t("Company") +
            this.$t("Failed")
        );
      }
    },
    handleGoBack() {
      this.$router.go(-1);
    },
    async fetchBTServerGroup() {
      try {
        let resp = await getAllBtServerGroupenabled();
        this.btserverList = resp.data.data;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("BtServerGroup") + this.$t("Failed")
        );
      }
    }
  }
};
</script>
