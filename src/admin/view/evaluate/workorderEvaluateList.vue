<template>
    <div>
        <Card class="md-card">
            <div class="search-con search-con-top">
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.evaluateType" palceholder="评价维度">
                        <Option v-for="(item,index) in evaluateTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                    <Input class="search-input" v-model="params.identifier" placeholder="请输入搜索关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.evaluateType" palceholder="工单编号">
                        <Option v-for="(item,index) in evaluateTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                    <Input class="search-input" v-model="params.identifier" placeholder="请输入搜索关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.workorderType" palceholder="工单类型">
                        <Option v-for="(item,index) in workorderTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                </div>
                <div class="search-input-item">
                    <span>评价时间：</span>
                    <div class="search-input-item">
                        <DatePicker class="search-input" v-model="params.startTime" format="yyyy-MM-dd" type="date"></DatePicker>
                        <DatePicker class="search-input" v-model="params.endTime" format="yyyy-MM-dd" type="date"></DatePicker>
                    </div>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.incumbencyType" palceholder="在职状态">
                        <Option v-for="(item,index) in incumbencyTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                </div>
                <div class="search-btn flex-right">
                    <Button @click="search" type="primary">搜索</Button>
                </div>
            </div>
        </Card>
        <Card class="md-card">
            <Table :columns="columns" :data="list"></Table>
        </Card>
        <Card class="md-card">
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
        </Card>
    </div>
</template>
<script>
import Page from "_c/admin/page";
import "./index.less";
export default {
    data() {
        return {
            params: {
                pageNum: 1,
                pageSize: 10,
                count: 0,
                evaluateType: -1,
                workorderType: -1,
                startTime: "",
                endTime: "",
                incumbencyType: -1
            },
            evaluateTypeList: [
                {
                    key: -1,
                    value: "评价维度"
                },
                {
                    key: 1,
                    value: "服务态度星级"
                },
                {
                    key: 2,
                    value: "响应时间星级"
                }
            ],
            workorderTypeList: [
                {
                    key: -1,
                    value: "工单类型"
                },
                {
                    key: 1,
                    value: "运营"
                },
                {
                    key: 2,
                    value: "美工"
                },
                {
                    key: 3,
                    value: "代运营"
                },
                {
                    key: 4,
                    value: "续费"
                },
                {
                    key: 5,
                    value: "业务合作"
                }
            ],
            incumbencyTypeList: [
                {
                    key: -1,
                    value: "在职状态"
                },
                {
                    key: 1,
                    value: "在职"
                },
                {
                    key: 0,
                    value: "离职"
                }

            ],
            columns: [
                {
                    type: "expand",
                    width: 50
                },
                {
                    title: "客户名称",
                    key: "comsterName",
                    align: "center",
                    render: (h, params) => {
                        return h("span", {
                            attrs: {
                                style: "color:#72ACE3;cursor:pointer;"
                            },
                            on: {
                                click: () => {
                                    console.log(1111)
                                }
                            }
                        }, params.row.comsterName)
                    }
                },
                {
                    title: "工单编号",
                    key: "workorderNumber",
                    align: "center",
                    render: (h, params) => {
                        return h("span", {
                            attrs: {
                                style: "color:#72ACE3;cursor:pointer;"
                            },
                            on: {
                                click: () => {
                                    console.log(2222)
                                }
                            }
                        }, params.row.workorderNumber)
                    }
                },
                {
                    title: "类型",
                    key: "",
                    align: "center"
                },
                {
                    title: "责任人",
                    key: "",
                    align: "center"
                },
                {
                    title: "用户手机号码",
                    key: "",
                    align: "center"
                },
                {
                    title: "微信昵称",
                    key: "",
                    align: "center"
                },
                {
                    title: "评价时间",
                    key: "",
                    align: "center"
                },
                {
                    title: "服务态度星级",
                    key: "",
                    align: "center"
                },
                {
                    title: "响应时间星级",
                    key: "",
                    align: "center"
                }
            ],
            list: []
        }
    },
    components: { Page },
    methods: {
        pageCurrentChange(pageNum) {
            this.params.pageNum = pageNum;
        },
        pageSizeChange(pageSize) {
            this.params.pageSize = pageSize;
            this.params.pageNum = 1;
        },
        search() {

        }
    }
}
</script>
<style scoped>
</style>
