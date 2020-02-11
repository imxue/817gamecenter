<template>
    <div>
        <router-link to="/ServerManagement/BTClient/setRunConfig">
            <Button type="info" style="marginBottom:10px;">设置运行配置</Button>
        </router-link>
        <Table :columns="columns" :data="data" border></Table>
    </div>
</template>
<script>
import { getbtClientConfig } from "@/api/server";
export default {
    name:"BTClientSet",
    data() {
        return {
          columns:[
              {
                  title: '下载游戏列表时间间隔',
                  key: 'download_game_list_interval'
              },
              {
                  title: '上报运行状态时间间隔',
                  key: 'upload_state_time_interval'
              },
              {
                  title: '同步运行配置状态时间间隔',
                  key: 'sync_config_time_interval'
              },
              {
                  title: '允许匿名登录',
                  key: 'allow_anoymous_login'
              },
              {
                  title: '操作人',
                  key: 'user_id'
              },
              {
                  title: '最后操作时间',
                  key: 'update_time'
              }
          ],
          data:[]
        }
    },
    created() {
this.HandleGetData()
    },
    methods:{
        async HandleGetData() {
            try {
               let resp =  await getbtClientConfig()
               this.data = resp.data.data
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>