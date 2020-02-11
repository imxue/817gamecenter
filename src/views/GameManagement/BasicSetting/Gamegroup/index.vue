<template>
    <div>
        <Row :gutter="16" style="marginBottom:10px;">
            <Col span="2">
            <Button type="info">添加</Button>
            </Col>
            <Col span="2">
            <Button type="info">编辑</Button>
            </Col>
        </Row>
         <Table :columns="columns" :data="data" border></Table>
    </div>
</template>
<script>
export default {
    name:"index",
    data() {
        return {
            columns:[
                {
                    key:"name",
                    title:'游戏公司名称'
                },
                  {
                    key:"name",
                    title:'备注'
                },
                 {
                    key:"name",
                    title:'是否启用'
                },
                        {
                    key:"name",
                    title:'操作人'
                },
                  {
                    key:"name",
                    title:'最后操作时间'
                }
            ],
            data:[]
        }
    }
}
</script>