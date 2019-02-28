<template>
    <div class="tag-group">
        <Card class="md-card">
            <p slot="title">标签字典</p>
            <div class="search-con flex">
                <div class="search-input-item flex-left">
                    <span class="search-input-item-lable">标签组：</span>
                    <Input class="search-input" v-model="params.tabGroupName" placeholder="请输入标签组名称">
                    <span></span>
                    </Input>
                </div>
                <div class="flex-right">
                    <Button type="primary" ghost @click="getList">搜索</Button>
                </div>
            </div>
            <div class="flex">
                <Button type="warning" @click="clickAddTabGroup" ghost>添加标签组</Button>
            </div>
        </Card>
        <Card class="md-card">
            <Table :data="list" :columns="columns" border></Table>
        </Card>
        <Card class="md-card">
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
        </Card>
        <Modal v-model="isSaveWorkOrderAction" :mask-closable="false" title="编辑" @on-ok="addTabGroup()" :loading="loading">
            <Card class="md-card">
                <div class="search-con flex">
                    <div class="search-input-item flex-left">
                        <span class="search-input-item-lable">组名称：</span>
                        <Input class="search-input" v-model="editParams.tabGroupName" style="width:300px;" :maxlength="8" placeholder="请输入标签组名称">
                        <span></span>
                        </Input>
                    </div>
                    <div class="search-input-item flex-left">
                        <!-- eslint-disable-next-line -->
                        <span class="search-input-item-lable">备　注：</span>
                        <Input class="search-input" v-model="editParams.remark" type="textarea" style="width:300px;" :maxlength="30" :rows="4" placeholder="请输入备注">
                        <span></span>
                        </Input>
                    </div>
                </div>
            </Card>
        </Modal>
    </div>
</template>
<script>
import { getTabGroupList, addTabGroup, updateTabGroup } from "@/api/admin/tabGroup/tab";
import { formatTime } from "@/libs/util/time";
import Page from "_c/admin/page";
import {trim} from "@/libs/tools";
export default {
    data() {
        return {
            loading: true,
            isSaveWorkOrderAction: false,
            editParams: {
                tabGroupName: '',
                remark: '',
                type: "add"
            },
            params: {
                tabGroupName: '',
                pageNum: 1,
                pageSize: 10,
                count: 0,
                orderBy: 1
            },
            list: [],
            columns: [
                {
                    title: 'ID',
                    width: 80,
                    align: "center",
                    key: "id"
                },
                {
                    title: '标签组',
                    align: "center",
                    key: "tabGroupName",
                    render: (h, params) => {
                        return h(
                            "span",
                            {
                                attrs: {
                                    style: "color:#72ACE3;cursor:pointer;"
                                },
                                on: {
                                    click: () => {
                                        let name = "case-tagGroupInfo";
                                        if (this.$route.name == "wx-case-tagGroupList") {
                                            name = "wx-case-tagGroupInfo"
                                        }
                                        this.$router.push({
                                            name,
                                            query: {
                                                tabGroupName: params.row.tabGroupName,
                                                tabGroupId: params.row.id
                                            }
                                        });
                                    }
                                }
                            },
                            params.row.tabGroupName
                        );
                    }
                },
                {
                    title: '创建人',
                    align: "center",
                    render: (h, params) => {
                        let userVo = params.row.userVo
                        let fullName = userVo.userName + "(" + userVo.departmentName + ")"
                        return h("span", {}, fullName)
                    }
                },
                {
                    title: '创建时间',
                    align: "center",
                    render: (h, params) => {
                        let time = params.row.createdAt || ''
                        if (time) {
                            return h("span", {}, formatTime(time, "YYYY-MM-DD H:mm:ss"))
                        } else {
                            return h("span", {}, '')
                        }
                    }
                },
                {
                    title: '备注',
                    align: "center",
                    key: "remark"
                },
                {
                    title: '操作',
                    align: "center",
                    render: (h, params) => {
                        return h(
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
                                        this.editParams = JSON.parse(JSON.stringify(params.row));
                                        this.editParams.type = "edit";
                                        this.isSaveWorkOrderAction = true;
                                    }
                                }
                            },
                            "编辑"
                        )
                    }
                }
            ]
        }
    },
    components: {
        Page
    },
    methods: {
        pageCurrentChange(pageNum) {
            this.params.pageNum = pageNum;
            this.getList();
        },
        pageSizeChange(pageSize) {
            this.params.pageSize = pageSize;
            this.params.pageNum = 1;
            this.getList();
        },
        getList() {
            this.params.tabGroupName = trim(this.params.tabGroupName);
            getTabGroupList(this.params).then(res => {
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "标签组列表",
                        content: res.msg
                    });
                }
                console.log(res.data.count)
                this.list = res.data.list || [];
                this.params.count = res.data.count || 0;
            }).catch(error => {
                this.$Modal.error({
                    title: "标签组列表",
                    content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                });
            });
        },
        // 点击添加标签组
        clickAddTabGroup() {
            this.isSaveWorkOrderAction = true;
            this.editParams = {
                tabGroupName: '',
                remark: '',
                type: "add"
            }
        },
        addTabGroup() {
            this.editParams.tabGroupName = trim(this.editParams.tabGroupName);
            if (this.editParams.tabGroupName == "") {
                this.loading = false;
                return this.$Modal.warning({ title: "添加标签组", content: "组名称不可为空或为空格！" });
            }
            // 新增标签组
            if (this.editParams.type == "add") {
                addTabGroup(this.editParams).then(res => {
                    this.loading = false;
                    if (res.status != 200) {
                        this.$Modal.error({
                            title: "添加标签组",
                            content: res.msg
                        });
                        return;
                    }
                    this.isSaveWorkOrderAction = false;
                    this.getList();
                }).catch(error => {
                    this.isSaveWorkOrderAction = false;
                    this.loading = false;
                    this.$Modal.error({
                        title: "添加标签组",
                        content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                    });
                })
                // 修改标签组
            } else if (this.editParams.type == "edit") {
                updateTabGroup(this.editParams).then(res => {
                    this.loading = false;
                    if (res.status != 200) {
                        this.$Modal.error({
                            title: "修改标签组",
                            content: res.msg
                        });
                        return;
                    }
                    this.isSaveWorkOrderAction = false;
                    this.getList();
                }).catch(error => {
                    this.isSaveWorkOrderAction = false;
                    this.loading = false;
                    this.$Modal.error({
                        title: "修改标签组",
                        content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                    });
                })
            }
        }
    },
    mounted() {
        this.getList();
    }
}
</script>
<style lang="less" scoped>
</style>
