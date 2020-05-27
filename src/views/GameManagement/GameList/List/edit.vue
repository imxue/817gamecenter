<template>
  <div style="width:700px;">
    <Form ref="form" :model="form" :rules="rule" :label-width="130">
      <Row>
        <Col span="12">
          <FormItem prop="name" :label="this.$t('Name')">
            <Input type="text" v-model.trim="form.name" />
          </FormItem>
          <FormItem prop="name" :label="this.$t('Game') + this.$t('Type')">
            <Select v-model="form.type_id">
              <Option
                v-for="item in GameType"
                :key="item.id"
                :value="item.id"
                >{{ item.name }}</Option
              >
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
            <Select v-model="form.is_menu_display">
              <Option :value="1">{{ $t("Enable") }}</Option>
              <Option :value="0">{{ $t("Disabled") }}</Option>
            </Select>
          </FormItem>
          <FormItem
            prop="is_console_display"
            :label="this.$t('Console') + this.$t('Display')"
          >
            <Select v-model="form.is_console_display">
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
            <Input type="text" v-model="form.run_parameter" />
          </FormItem>
          <FormItem prop="introduce" :label="this.$t('Introduce')">
            <Input type="textarea" v-model="form.introduce" />
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
            <Input
              type="text"
              v-model.number="fromatsize"
              @on-change="HandleSetSize"
            >
              <Select v-model="unit" slot="append" style="min-width:70px;">
                <!-- <Option value="Bytes">Bytes</Option> -->
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
  editGame,
  getAllGameTypeenabled,
  getAllGameCompanyenabled,
  verifyGameDisplalyUnique,
  verifyGameNameUnique
} from "@/api/server";
import { mapState } from "vuex";
import { kbtosize } from "@/utils/index";
export default {
  name: "",
  data() {
    const validateGameName = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("fne")));
      } else {
        try {
          if (this.OldName === value) {
            callback();
          }
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
          if (this.OldDisplayName === value) {
            callback();
          }
          await verifyGameDisplalyUnique(value);
          callback();
        } catch (error) {
          callback(new Error(this.$t("TGnax")));
        }
      }
    };
    return {
      loading: false,
      OldName: "",
      unit: "KB",
      fromatsize: 0,
      page: "",
      index: "",
      form: {
        id: "",
        type_id: "",
        name: "",
        is_console_display: 1,
        is_menu_display: "",
        display_name: "",
        run_exe: "",
        run_parameter: "",
        introduce: "",
        company_id: "",
        website: "",
        search_name: "",
        save_path: "",
        size: "",
        popularity: "",
        enable: ""
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
        description: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ],
        status: [
          {
            required: true,
            message: this.$t("fne"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      GameName: state => state.GameName
    })
  },
  created() {
    this.page = this.$route.query.page;
    this.index = this.$route.query.index;
    for (let item in this.form) {
      this.form[item] = this.$route.query[0][item];
    }
    if (!isNaN(this.form.size)) {
      let size = kbtosize(this.form.size);
      if (size !== 0) {
        let array = size.split(" ");
        this.fromatsize = array[0];
        this.unit = array[1];
      } else {
        this.form.fromatsize = 0;
      }
    }

    this.OldName = this.form.name;
    this.OldDisplayName = this.form.display_name;
    this.HandleGeTGameType();
    this.HandleGetGameCompany();
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            let data = JSON.parse(JSON.stringify(this.form));
            await editGame(data);
            this.$Message.success(this.$t("Edit") + this.$t("Success"));
            this.handleGoBack();
          } catch (error) {
            this.$Message.error(error);
          } finally {
            this.loading = false;
          }
        }
      });
    },
    async HandleGeTGameType() {
      try {
        let resp = await getAllGameTypeenabled();
        this.GameType = resp.data.data;
      } catch (error) {
        this.$Message.error(
          this.$t("Get") + this.$t("Game") + this.$t("Type") + this.$t("Failed")
        );
      }
    },
    HandleSetSize(event) {
      let unit = {
        KB: 1,
        MB: 1024 * 1,
        GB: 1024 ** 2,
        TB: 1024 ** 3
      };
      let size = event.data * unit[this.unit];
      this.form.size = size;
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
      this.$router.push({
        path: `/GameManagement/GameList`
        // query: { offset: this.page, index: this.index }
      });
      // this.$router.go(-1);
    }
  }
};
</script>
