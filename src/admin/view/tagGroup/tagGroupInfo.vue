<template>
    <div class="tag-group">
        <Card class="md-card">
            <p slot="title">标签组详情</p>
            <div class="search-con flex">
                <div class="search-input-item flex-left" style="padding-top:10px;">
                    <span class="search-input-item-lable" style="width:auto;">标签组：</span>
                    <span style="display: inline-block;margin-right:10px;">{{$route.query.tabGroupName?$route.query.tabGroupName:""}}</span>
                </div>
                <div class="search-input-item flex-left">
                    <span class="search-input-item-lable">标签名：</span>
                    <Input class="search-input" v-model="params.tabName" placeholder="请输入标签名名称">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item flex-left">
                    <span class="search-input-item-lable">启用状态：</span>
                    <Select class="search-col" v-model="params.isForbidden">
                        <Option v-for="(item,index) in isForbiddenList" :key="index" :value="item.key">{{item.value}}
                        </Option>
                    </Select>
                </div>
                <div class="flex-right">
                    <Button type="primary" ghost @click="getList">搜索</Button>
                </div>
            </div>
            <div class="flex">
                <Button type="warning" @click="clickAddTab" ghost>添加标签</Button>
            </div>
        </Card>
        <Card class="md-card">
            <Table :data="list" :loading="loading" :columns="columns" border></Table>
        </Card>
        <Card class="md-card">
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
        </Card>
        <Modal v-model="isSaveWorkOrderAction" :mask-closable="false" title="编辑" :loading="editParams.loading" @on-ok="addTab()">
            <Card class="md-card">
                <div class="search-con flex">
                    <div class="search-input-item flex-left">
                        <span class="search-input-item-lable">标签名：</span>
                        <Input class="search-input" v-model="editParams.tabName" style="width:300px;" :maxlength="8" placeholder="请输入标签名称">
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
import { getTabList, changeTabStatus, addTab, updateTab } from "@/api/admin/tabGroup/tab";
import { formatTime } from "@/libs/util/time";
import Page from "_c/admin/page";
import {trim} from "@/libs/tools";
export default {
    data() {
        return {
            isSaveWorkOrderAction: false,
            editParams: {
                loading: true,
                tabName: '',
                remark: '',
                type: 'add'
            },
            params: {
                tabName: '',
                pageNum: 1,
                pageSize: 10,
                count: 0,
                tabGroupId: '',
                orderBy: 1,
                isForbidden: -1
            },
            isForbiddenList: [
                {
                    key: -1,
                    value: "全部"
                },
                {
                    key: 0,
                    value: "启用"
                },
                {
                    key: 1,
                    value: "禁用"
                }
            ],
            list: [],
            loading: false,
            columns: [
                {
                    title: 'ID',
                    width: 80,
                    align: "center",
                    key: "id"
                },
                {
                    title: '标签名',
                    align: "center",
                    key: "tabName"
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
                    title: '启用状态',
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "i-switch",
                            {
                                props: {
                                    size: "large",
                                    value: params.row.isForbidden == 1 ? false : true
                                },
                                on: {
                                    // 0启用，1停用
                                    "on-change": status => {
                                        this.changeTabStatus(params.row, status);
                                    }
                                }
                            },
                            [
                                h("span", { slot: "open" }, "启用"),
                                h("span", { slot: "close" }, "停用")
                            ]
                        )
                    }
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
        // 点击添加标签
        clickAddTab() {
            this.isSaveWorkOrderAction = true;
            this.editParams = {
                tabName: '',
                remark: '',
                type: 'add'
            }
        },
        addTab() {
            this.editParams.tabName = trim(this.editParams.tabName);
            if (this.editParams.tabName == "") {
                this.editParams.loading = false;
                return this.$Modal.warning({ title: "添加标签", content: "标签名称不可为空或空格！" });
            }
            // 新增标签组
            if (this.editParams.type == "add") {
                let params = {
                    tabGroupId: this.params.tabGroupId || '',
                    ...this.editParams
                }
                addTab(params).then(res => {
                    this.isSaveWorkOrderAction = false;
                    if (res.status != 200) {
                        this.$Modal.error({
                            title: "新增标签",
                            content: res.msg
                        });
                    }
                    this.getList();
                }).catch(error => {
                    this.isSaveWorkOrderAction = false;
                    this.$Modal.error({
                        title: "新增标签",
                        content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                    });
                });
            } else if (this.editParams.type == "edit") {
                console.log(this.editParams)
                let params = {
                    ...this.editParams
                }
                updateTab(params).then(res => {
                    this.isSaveWorkOrderAction = false;
                    if (res.status != 200) {
                        this.$Modal.error({
                            title: "编辑标签",
                            content: res.msg
                        });
                    }
                    this.getList();
                }).catch(error => {
                    this.isSaveWorkOrderAction = false;
                    this.$Modal.error({
                        title: "编辑标签",
                        content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                    });
                });
            }
        },
        // 切换标签的启用状态
        changeTabStatus(row, status) {
            this.loading = true;
            let params = {
                id: row.id,
                isForbidden: status
            }
            changeTabStatus(params).then(res => {
                this.loading = false;
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "标签启用警用",
                        content: res.msg
                    });
                }
                this.getList();
            }).catch(error => {
                this.loading = false;
                this.$Modal.error({
                    title: "标签启用警用",
                    content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                });
            });
        },
        // 获取标签列表
        getList() {
            this.params.tabName = trim(this.params.tabName);
            this.loading = true;
            getTabList(this.params).then(res => {
                this.loading = false;
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "标签组详情列表",
                        content: res.msg
                    });
                }
                this.list = res.data.list || [];
                this.params.count = res.data.count || 0;
            }).catch(error => {
                this.loading = false;
                this.$Modal.error({
                    title: "标签组详情列表",
                    content: error.response && error.response.data && error.response.data.msg || error.msg || ''
                });
            });
        }
    },
    mounted() {
        this.params.tabGroupId = this.$route.query.tabGroupId || '';
        this.getList();
    }
}
</script>
<style lang="less" scoped>
</style>
