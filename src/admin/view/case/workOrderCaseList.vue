<template>
    <div>
        <Card class="md-card">
            <Table border :columns="columns1" :loading="loading" :data="list"></Table>
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
    import {
        getWorkOrderCaseListData,
        delWorkOrderCaseListData
    } from "@/api/admin/case/case";
    import {mapState, mapActions} from "vuex";
    import {formatTime} from "@/libs/util/time";
    import Page from "_c/admin/page";

    export default {
        components: {
            Page
        },
        mounted() {
            this.getWorkOrderCaseList();
        },
        methods: {
            isDirector() {
                return this.$store.state.user.userInfo.isDirector || false
            },
            delWorkOrderCase(id) {
                console.log("delWorkOrderCase", id);
                this.delWorkOrderCaseList(id);
            },
            // 查询数据 分页页码重置
            sleectTemplateList(pageNum) {
                this.params.pageNum = pageNum;
                this.getWorkOrderCaseList();
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
            // 获取列表数据
            getWorkOrderCaseList() {
                getWorkOrderCaseListData({...this.params}).then(res => {
                    this.list = res.data.list || [];
                    this.params.count = res.data.count || 0;
                }).catch(error => {
                    console.error("getWorkOrderCaseList", error);
                    this.$Modal.error({
                        title: "工单案例库",
                        content: error.msg
                    });
                    return;
                });


            },
            async delWorkOrderCaseList(caseLibraryId) {
                delWorkOrderCaseListData({caseLibraryId}).then(res => {
                    this.$Modal.success({
                        title: "删除工单案例库",
                        content: "删除成功"
                    });
                }).catch(error => {
                    this.$Modal.error({
                        title: "删除工单案例库",
                        content: error.msg
                    });
                });

            }
        },
        data() {
            return {
                columns1: [
                    {
                        title: "案例名称",
                        key: "name",
                        render: (h, params) => {
                            let btnGroup = [];

                            btnGroup.push(
                                h(
                                    "a",
                                    {
                                        style: {
                                            color: "#2d8cf0",
                                            display: "block",
                                            margin: "5px"
                                        },
                                        on: {
                                            click: () => {
                                                let name = "case-workOrderCaseInfo";
                                                if (this.$route.name == "wx-case-workOrderCaseList") {
                                                    name = "wx-case-workOrderCaseInfo"
                                                }
                                                this.$router.push({
                                                    name,
                                                    query: {
                                                        id: params.row.id,
                                                        name: params.row.name
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    params.row.name
                                )
                            );

                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: "工单数量",
                        key: "workOrderNum",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "分享次数",
                        key: "shareNum",
                        width: 120,
                        align: "center"
                    },
                    {
                        title: "上次修改时间",
                        align: "center",
                        render: (h, params) => {
                            let btnGroup = [];

                            btnGroup.push(
                                h(
                                    "span",
                                    {},
                                    formatTime(
                                        params.row.updateAt,
                                        "YYYY-MM-DD HH:mm:ss"
                                    )
                                )
                            );
                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: "创建人",
                        key: "userName",
                        width: 200,
                        align: "center",
                        render: (h, params) => {
                            let btnGroup = [];

                            btnGroup.push(
                                h(
                                    "span",
                                    {},
                                    params.row.userName +
                                    " ( " +
                                    params.row.departmentName +
                                    " ) "
                                )
                            );

                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: "操作",
                        key: "num",
                        render: (h, params) => {
                            let btnGroup = [];

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
                                                let name = "case-workOrderCaseInfo";
                                                if (this.$route.name == "wx-case-workOrderCaseList") {
                                                    name = "wx-case-workOrderCaseInfo"
                                                }
                                                this.$router.push({
                                                    name,
                                                    query: {
                                                        id: params.row.id,
                                                        name: params.row.name
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "查看案例"
                                )
                            );
                            if (this.isDirector()) {


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
                                                    this.delWorkOrderCase(
                                                        params.row.id
                                                    );
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
                list: [],
                loading: false,
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    count: 0
                }
            };
        }
    };
</script>
