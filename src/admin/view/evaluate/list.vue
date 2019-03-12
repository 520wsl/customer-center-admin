<template>
    <div>
        <Card class="md-card" >
            <div v-if="isBigLeader" class="search-con search-con-top">
                <Select v-model="params.select" class="search-col">
                    <Option
                            v-for="item in keyWordTypeData"
                            :key="`search-col-${item.key}`"
                            :value="item.key"
                    >{{ item.title }}
                    </Option>
                </Select>
                <Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
                <span></span>
                </Input>
                <Button @click="sleectTemplateList(1)" class="search-btn" type="primary">
                    <Icon type="search"/>&nbsp;&nbsp;搜索
                </Button>
                <Button @click="addTemplate" class="search-btn" type="success">
                    <Icon type="search"/>&nbsp;&nbsp;添加模板
                </Button>
            </div>
            <div>
                <Table border="" :loading="loading" :columns="columns" :data="templateList"></Table>
            </div>
        </Card>
        <Card class="md-card">
            <page
                    :pageNum="params.pageNum"
                    :pageSize="params.pageSize"
                    :count="params.count"
                    @pageCurrentChange="pageCurrentChange"
                    @pageSizeChange="pageSizeChange"
            ></page>
        </Card>
    </div>
</template>

<script>
    import Page from "_c/admin/page";
    import {
        getTemplateListData,
        setTemplateStatusType,
        delTemplateData
    } from "@/api/admin/evaluate/template";
    import {mapState, mapActions} from "vuex";
    import "./index.less";
    import {trim} from "@/libs/tools";

    export default {
        components: {
            Page
        },
        created() {

        },
        mounted() {
           this.isBigLeader =this.isBigLeaderAction()
            if(!this.isBigLeader){
                  this.$Modal.error({
                    title: "评价模板",
                    content: "您暂无权限"
                });
                return
            }
            this.sleectTemplateList();
        },
        computed: {
            getColumns() {
                let arr = [];
                this.columns.forEach(element => {
                    if (element.keyWord) {
                        arr.push(element);
                    }
                });
                return arr;
            }
        },
        data() {
            return {
                isBigLeader:false,
                loading: false,
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    select: 1,
                    keyword: "",
                    count: 0
                },
                keyWordTypeData: [
                    {
                        key: 1,
                        title: "模板标题"
                    },
                    {
                        key: 2,
                        title: "模板ID"
                    }
                ],
                columns: [
                    {
                        title: "模板标题",
                        keyWord: true,
                        align: "center",
                        key: "templateTitle"
                    },
                    {title: "模板ID", key: "id", align: "center"},
                    {
                        title: "状态",
                        keyWord: true,
                        key: "status",
                        align: "center",
                        render: (h, params) => {
                            let btnGroup = [];
                            let id = params.row.id;
                            let status = params.row.status == 1 ? false : true;
                            btnGroup.push(
                                h(
                                    "i-switch",
                                    {
                                        props: {
                                            size: "large",
                                            value: params.row.status == 1 ? false : true
                                        },
                                        on: {
                                            // 0启用，1停用
                                            "on-change": status => {
                                                this.setTemplateStatus({id: params.row.id});
                                            }
                                        }
                                    },
                                    [
                                        h("span", {slot: "open"}, "启用"),
                                        h("span", {slot: "close"}, "停用")
                                    ]
                                )
                            );
                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: "操作",
                        key: "handle",
                        render: (h, params) => {
                            let btnGroup = [];
                            let id = params.row.id;
                            let status = params.row.status == 1 ? false : true;
                            btnGroup.push(
                                h(
                                    "Button",
                                    {
                                        props: {
                                            type: "primary",
                                            size: "small",
                                            ghost: true
                                        },
                                        style: {
                                            margin: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                this.$router.push({
                                                    name: "evaluate-info",
                                                    query: {id: params.row.id}
                                                });
                                            }
                                        }
                                    },
                                    "编辑"
                                )
                            );
                            if (!status) {
                                btnGroup.push(
                                    h(
                                        "Poptip",
                                        {
                                            props: {
                                                confirm: true,
                                                title: "你确定要删除吗?"
                                            },

                                            on: {
                                                "on-ok": () => {
                                                    this.delTemplate({
                                                        id: params.row.id
                                                    });
                                                }
                                            }
                                        },
                                        [
                                            h(
                                                "Button",
                                                {
                                                    props: {
                                                        type: "error",
                                                        size: "small",
                                                        ghost: true
                                                    },
                                                    style: {
                                                        margin: "5px"
                                                    }
                                                },
                                                "删除"
                                            )
                                        ]
                                    )
                                );
                            }
                            return h("div", btnGroup);
                        }
                    }
                ],
                templateList: []
            };
        },
        methods: {
            isBigLeaderAction() {
                return this.$store.state.user.userInfo.isBigLeader || false
            },
            addTemplate() {
                this.$router.push({
                    name: "evaluate-info",
                    query: {id: -1}
                });
            },
            async getTemplateList() {
                this.loading = true;
                this.params.keyword = trim(this.params.keyword);
                let res = await getTemplateListData({...this.params});
                console.log("getTemplateList", res);
                this.loading = false;
                if (res.status !== 200) {
                    console.error("getTemplateList", res.msg);

                    this.$Modal.error({
                        title: "评价列表查询",
                        content: res.msg
                    });
                    return;
                }

                this.params.count = res.data.count || 0;
                this.templateList = res.data.list;
            },
            // 查询数据 分页页码重置
            sleectTemplateList(pageNum) {
                this.params.pageNum = pageNum;
                this.getTemplateList();
            },
            // 设置分页页码
            pageCurrentChange(pageNum) {
                this.sleectTemplateList(pageNum);
            },
            // 设置分页大小
            pageSizeChange(pageSize) {
                this.params.pageSize = pageSize;
                this.sleectTemplateList(1);
            },
            // 设置模板状态
            async setTemplateStatus(id) {
                let res = await setTemplateStatusType(id);
                console.log("setTemplateStatus", res);
                if (res.status !== 200) {
                    console.error("setTemplateStatus", res.msg);
                    this.$Modal.error({
                        title: "设置模板状态",
                        content: res.msg
                    });
                    return;
                }

                this.$Modal.success({
                    title: "设置模板状态",
                    content: res.msg
                });
                this.getTemplateList();
            },
            async delTemplate(id) {
                let res = await delTemplateData(id);
                console.log("delTemplate", res);
                if (res.status !== 200) {
                    console.error("delTemplate", res.msg);
                    this.$Modal.error({
                        title: "删除模板状态",
                        content: res.msg
                    });
                    return;
                }

                this.$Modal.success({
                    title: "删除模板状态",
                    content: res.msg
                });

                this.getTemplateList();
            }
        }
    };
</script>

<style>
</style>
