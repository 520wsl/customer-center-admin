<template>
    <div>
        <Card class="md-card">
            <div class="search-con search-con-top flex">
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.evaluateType" @on-change='evaluateTypeChange' palceholder="评价维度">
                        <Option v-for="(item,index) in evaluateTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                    <Input class="search-input" v-model="params.value" :disabled="evaluateNameBool" placeholder="请输入搜索关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.customerInfo" palceholder="工单编号">
                        <Option v-for="(item,index) in workorderTypeList" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                    <Input class="search-input" v-model="params.inputIdentifier" placeholder="请输入搜索关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" v-model="params.workType" palceholder="工单类型">
                        <Option :value="-1">工单类型</Option>
                        <Option v-for="(item,index) in searchWorkSheetType" :key='index' :value="item.key">{{item.value}}</Option>
                    </Select>
                </div>
                <div class="search-input-item">
                    <span>评价时间：</span>
                    <div class="search-input-item">
                        <DatePicker class="search-input" v-model="params.timeMin" format="yyyy-MM-dd" type="date"></DatePicker>
                        <DatePicker class="search-input" v-model="params.timeMax" format="yyyy-MM-dd" type="date"></DatePicker>
                    </div>
                </div>
                <div class="search-input-item">
                    <span>责任人：</span>
                    <Department class="search-input-item" :loading-user="true" width="200" :get-user-info="getUserInfo" v-model="params.customerIdList"></Department>
                </div>
                <div class="search-btn flex-right">
                    <Button @click="getList" type="primary">搜索</Button>
                </div>
            </div>
        </Card>
        <Card class="md-card">
            <Table :columns="columns" :data="list" border class="table"></Table>
        </Card>
        <Card class="md-card">
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
        </Card>
    </div>
</template>
<script>
import Page from "_c/admin/page";
import "./index.less";
import { trim } from "@/libs/tools";
import Department from "_c/public/department";
import { mapState, mapActions } from "vuex";
import { getWorkEvaluateListData } from "@/api/admin/evaluate/dimension";
import evaluateItem from "_c/admin/evaluate-item";
import { startTime, endTime, formatTime } from "@/libs/util/time";
export default {
    data() {
        return {
            evaluateNameBool: true,
            params: {
                pageNum: 1,
                pageSize: 10,
                count: 0,
                customerInfo: 0,
                evaluateType: -1,
                workType: -1,
                timeMin: "",
                timeMax: "",
                customerIdList: [],
                inputIdentifier: "",
                identifier: "",
                evaluateName: "",
                companyName: "",
                value: "",
                executorId: ""
            },
            evaluateTypeList: [
                {
                    key: -1,
                    value: "评价维度"
                },
                {
                    key: 1,
                    value: "服务态度"
                },
                {
                    key: 2,
                    value: "响应时间"
                }
            ],
            workorderTypeList: [
                {
                    key: 0,
                    value: "工单编号"
                },
                {
                    key: 1,
                    value: "客户名称"
                }
            ],
            columns: [
                {
                    type: "expand",
                    width: 50,
                    render: (h, params) => {
                        let arr = params.row.evaluateContent || [];
                        // 将最大值转化为数字类型的字符串
                        arr.forEach(item => {
                            if (item.otherAttribute.maxNum) {
                                item.otherAttribute.maxNum = parseFloat(item.otherAttribute.maxNum);
                            }
                            if (item.type == 'number' && item.otherAttribute.showType == 'score') {
                                item.value = parseFloat(item.value);
                            }
                        })
                        return h(evaluateItem, {
                            props: {
                                evaluateList: arr
                            }
                        })
                    }
                },
                {
                    title: "客户名称",
                    key: "companyName",
                    align: "center",
                    render: (h, params) => {
                        return h("span", {
                            attrs: {
                                style: "color:#72ACE3;cursor:pointer;"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({
                                        name: "custom-info",
                                        query: {
                                            sixiId: params.row.companyId
                                        }
                                    })
                                }
                            }
                        }, params.row.companyName)
                    }
                },
                {
                    title: "工单编号",
                    key: "identifier",
                    align: "center",
                    render: (h, params) => {
                        return h("span", {
                            attrs: {
                                style: "color:#72ACE3;cursor:pointer;"
                            },
                            on: {
                                click: () => {
                                    this.$router.push({
                                        name: "workOrder-info-service",
                                        query: {
                                            workSheetId: params.row.workSheetId,
                                            companyName: params.row.companyName
                                        }
                                    })
                                }
                            }
                        }, params.row.identifier)
                    }
                },
                {
                    title: "类型",
                    align: "center",
                    render: (h, params) => {
                        const typelist = this.workSheetType.filter(item => {
                            return item.key == params.row.workType;
                        });
                        if (typelist.length > 0) {
                            return h("span", typelist[0]["value"]);
                        } else {
                            return h("span", "");
                        }
                    }
                },
                {
                    title: "责任人",
                    align: "center",
                    render: (h, params) => {
                        let str = "";
                        if (params.row.executorInfo && params.row.executorInfo.userName && params.row.executorInfo.departmentName) {
                            str = params.row.executorInfo.userName + "(" + params.row.executorInfo.departmentName + ")";
                        }
                        return h("span", {}, str);
                    }
                },
                {
                    title: "客户昵称",
                    key: "wechatNickname",
                    align: "center"
                },
                {
                    title: "评价时间",
                    key: "evaluateTime",
                    align: "center"
                },
                {
                    title: "服务态度",
                    align: "center",
                    render: (h, params) => {
                        let str = "";
                        let arr = params.row.evaluateContent || [];
                        if (arr.length != 0) {
                            arr.forEach(item => {
                                if (item.evaluateName == "服务态度") {
                                    str = item.value + "星";
                                }
                            });
                        }
                        return h("span", {}, str)
                    }
                },
                {
                    title: "响应时间",
                    align: "center",
                    render: (h, params) => {
                        let str = "";
                        let arr = params.row.evaluateContent || [];
                        if (arr.length != 0) {
                            arr.forEach(item => {
                                if (item.evaluateName == "响应时间") {
                                    str = item.value + "星";
                                }
                            });
                        }
                        return h("span", {}, str)
                    }
                },
                {
                    title: '操作',
                    align: "center",
                    render: (h, params) => {
                        return h("span", {
                            attrs: {
                                style: "cursor:pointer;color:#72ACE3;"
                            },
                            on: {
                                click: () => {
                                    console.log(params)
                                    this.list[params.index]._expanded = !params.row._expanded
                                }
                            }
                        }, '查看评价详情')
                    }
                }
            ],
            list: []
        }
    },
    computed: {
        ...mapState({
            searchWorkSheetType: state => {
                return [...state.workSheet.workSheetType].filter(item => {
                    return item.key !== 0;
                });
            },
            workSheetType: state => state.workSheet.workSheetType
        })
    },
    // eslint-disable-next-line 
    components: { Page, Department, evaluateItem },
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
        // 评价维度选项切换
        evaluateTypeChange(type) {
            if (type == -1) {
                this.evaluateNameBool = true;
                this.params.evaluateName = "";
                this.params.value = "";
            } else if (type == 1) {
                this.evaluateNameBool = false;
                this.params.evaluateName = "服务态度";
            } else if (type == 2) {
                this.evaluateNameBool = false;
                this.params.evaluateName = "响应时间";
            }
        },
        // 工单编号，手机号，客户姓名切换
        customerInfoChange(type) {
            this.params.identifier = "";
            this.params.companyName = '';
            if (type == 0) {
                this.params.identifier = this.params.inputIdentifier;
            } else if (type == 1) {
                this.params.companyName = this.params.inputIdentifier;
            }
        },
        async getList() {
            this.customerInfoChange(this.params.customerInfo)
            this.evaluateTypeChange(this.params.evaluateType)
            if (this.params.customerIdList.length > 0) {
                this.params.executorId = this.params.customerIdList[this.params.customerIdList.length - 1];
            } else {
                this.params.executorId = "";
            }
            this.params.inputIdentifier = trim(this.params.inputIdentifier);
            this.params.identifier = trim(this.params.identifier);
            this.params.companyName = trim(this.params.companyName);
            let params = JSON.parse(JSON.stringify(this.params))
            params.timeMin = params.timeMin ? startTime(params.timeMin, "x") : "";
            params.timeMax = params.timeMax ? endTime(params.timeMax, "x") : "";
            params.timeMin = formatTime(parseInt(params.timeMin))
            params.timeMax = formatTime(parseInt(params.timeMax))
            let res = await getWorkEvaluateListData(params)

            let list = res.data.content || []
            list.forEach(item => {
                item._expanded = false;
            })
            this.list = list;
            this.params.count = res.data.totalElements || 0;
        },
        getUserInfo(data) {
            console.log(data)
        },
    },
    mounted() {
        this.getList();
    }
}
</script>
<style scoped>
.table /deep/ td.ivu-table-expanded-cell {
  background: #fff;
}
</style>
