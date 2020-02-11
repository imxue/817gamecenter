<template>
<div class="xx">
    <div>
        <h3>BtServer</h3>
        <Table :columns="columns" :data="data" border></Table>
    </div>
        <div>
        <h3>Tracker</h3>
        <Table :columns="columns" :data="data" border></Table>
    </div>
        <div>
        <h3>集群服务器</h3>
        <Table :columns="columns" :data="data" border></Table>
    </div>
    <div>
        <h3>FTP服务器</h3>
        <Table :columns="columns" :data="data" border></Table>
    </div>
</div>
</template>
<script>
export default {
    name:"ServerState",
    data() {
        return {
            columns:[
                {
                    key:"name",
                    title:'上行带宽负载'
                },
                {
                    key:"name",
                    title:'下行带宽负载'
                },
                {
                    key:"name",
                    title:'连接数负载'
                },
                 {
                    key:"name",
                    title:'全部服务器数'
                },
                 {
                    key:"name",
                    title:'离线服务器数'
                },
                 {
                    key:"name",
                    title:'中负载服务器数'
                },
                 {
                    key:"name",
                    title:'低负载服务器数'
                }
            ],
            data:[]
        }
    }
}
</script>