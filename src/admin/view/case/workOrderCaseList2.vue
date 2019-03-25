<template>
    <div>
        <Card class="md-card">
            <div class="flex">
                <div class="flex-right">
                    <Button @click="checkView" type="warning" ghost>切换视图</Button>
                </div>
            </div>
        </Card>
        <Card class="md-card">
            <div class="search-con flex">
                <div class="search-input-item">
                    <span class="search-input-item-lable">案例库：</span>
                    <Input class="search-input" v-model="params.cName" placeholder="请输入搜索案例库关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <span class="search-input-item-lable">客户名称：</span>
                    <Input
                            class="search-input"
                            v-model="params.companyName"
                            placeholder="请输入搜索客户名称"
                    >
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <span class="search-input-item-lable">工单编号：</span>
                    <Input class="search-input" v-model="params.identifier" placeholder="请输入搜索关键词">
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" placeholder="工单类型" v-model="params.workType">
                        <Option :value="-1">工单类型</Option>
                        <!-- <Option v-for="(item,index) in workSheetType" :key="index" :value="item.key">{{item.value}}</Option> -->
                        <Option
                                v-for="(item,index) in searchWorkSheetType"
                                :key="index"
                                :value="item.key"
                        >{{item.value}}
                        </Option>
                    </Select>
                </div>
                <div class="search-input-item">
                    <Select class="search-col" style="width:120px;" v-model="params.timeType">
                        <Option :value="0">创建时间</Option>
                        <Option :value="1">结束时间</Option>
                    </Select>
                    <div class="search-input-item">
                        <DatePicker
                                class="search-input"
                                v-model="params.startTime"
                                format="yyyy-MM-dd"
                                type="date"
                        ></DatePicker>
                        <DatePicker
                                class="search-input"
                                v-model="params.endTime"
                                format="yyyy-MM-dd"
                                type="date"
                        ></DatePicker>
                    </div>
                </div>
                <div class="search-input-item">
                    <span class="search-input-item-lable">持续时间(h):</span>
                    <Input
                            @keypress.native="utils.inLimit.int"
                            @keyup.native="utils.inLimit.int"
                            v-model="params.durationHour"
                            class="search-input"
                            :maxlength="6"
                            placeholder="请输入搜索持续时间"
                    >
                    <span></span>
                    </Input>
                </div>
                <div class="search-input-item">
                    <span class="search-input-item-lable">响应时间(h):</span>
                    <Input
                            @keypress.native="utils.inLimit.int"
                            @keyup.native="utils.inLimit.int"
                            class="search-input"
                            v-model="params.responseHour"
                            :maxlength="6"
                            placeholder="请输入搜索响应时间"
                    >
                    <span></span>
                    </Input>
                </div>
                <div class="search-btn flex-right">
                    <Button @click="search" type="primary">搜索</Button>
                </div>
            </div>
        </Card>
        <Card class="md-card">
            <Table :data="workOrderList" :columns="columns" border></Table>
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
    import Vue from "vue";

    Vue.prototype.utils = utils;
    import {mapState, mapActions} from "vuex";
    import {formatInitTime, startTime, endTime} from "@/libs/util/time";
    import Page from "_c/admin/page";
    import {getWorkOrderCaseListData2} from "@/api/admin/case/case";
    import utils from "@/libs/util/public";
    import "./index.less";
    import {trim} from "@/libs/tools";

    export default {
        components: {
            Page
            // Department
        },
        computed: {
            ...mapState({
                searchWorkSheetType: state => {
                    return [...state.workSheet.workSheetType].filter(item => {
                        return item.key !== 0;
                    });
                },
                searchStatusList: state => {
                    return [...state.workSheet.workSheetHandleType].filter(item => {
                        return item.key !== 1;
                    });
                },
                workSheetType: state => state.workSheet.workSheetType,
                statusList: state => state.workSheet.workSheetHandleType
            })
        },
        data() {
            return {
                params: {
                    // 客户名称
                    companyName: "",
                    // 工单编号
                    identifier: "",
                    // 案例库名称
                    cName: '',
                    // 工单类型
                    workType: -1,
                    // 工单状态
                    handleType: -1,
                    // 工单开始时间
                    startTime: "",
                    // 工单结束时间
                    endTime: "",
                    // 工单时间类型
                    timeType: 0,
                    // 持续时间
                    durationHour: "",
                    // 响应时间
                    responseHour: "",
                    // 分页参数
                    pageNum: 1,
                    pageSize: 10,
                    count: 0,
                    customerId: "",
                    customerIdList: []
                },
                workOrderList: [],
                columns: [
                    {title: "工单编号", align: "center", key: "identifier"},
                    {
                        title: "客户名称",
                        keyWord: true,
                        align: "center",
                        key: "companyName",
                        render: (h, params) => {
                            let customerName = "";
                            if (params.row.companyName) {
                                customerName = params.row.companyName.slice(0, 2) + "***" + params.row.companyName.slice(5);
                            }
                            let lastIndex = customerName.lastIndexOf('（');
                            if(lastIndex != -1){
                                customerName = customerName.slice(0,lastIndex);
                            }
                            return h("span", {}, customerName);
                        }
                    },
                    {
                        title: "案例库",
                        align: "center",
                        key: "cName"
                    },
                    {
                        title: "创建时间",
                        align: "center",
                        width: 130,
                        key: "startTime",
                        render: (h, params) => {
                            const format = "YYYY-MM-DD HH:mm:ss";
                            const ele = params.row.startTime
                                ? formatInitTime(params.row.startTime, format)
                                : "";
                            return h("span", ele);
                        }
                    },
                    {
                        title: "结束时间",
                        align: "center",
                        width: 130,
                        key: "finishTime",
                        render: (h, params) => {
                            const format = "YYYY-MM-DD HH:mm:ss";
                            const ele = params.row.finishTime
                                ? formatInitTime(params.row.finishTime, format)
                                : "";
                            return h("span", ele);
                        }
                    },
                    {
                        title: "持续时间",
                        align: "center",
                        width: 130,
                        key: "durationStr",
                        render: (h, params) => {
                            return h("span", params.row.durationStr);
                        }
                    },
                    {
                        title: "响应时间",
                        align: "center",
                        render: (h, params) => {
                            return h("span", params.row.responseStr);
                        }
                    },
                    {
                        title: "执行人",
                        align: "center",
                        render: (h, params) => {
                            const user = params.row.userVo || {};
                            const name = user.extattr || user.userName || "";
                            const departmentName = user.departmentName
                                ? "(" + user.departmentName + ")"
                                : "";
                            return h("span", name + departmentName);
                        }
                    },
                    {
                        title: "评价",
                        render: (h, params) => {
                            let btnGroup = [];
                            let evaluateContent = params.row.evaluateContent || []

                            let tag = []

                            for (let i = 0, len = evaluateContent.length; i < len; i++) {
                                if (evaluateContent[i]['type'] === 'number') {
                                    continue
                                }
                                if (evaluateContent[i]['type'] === 'radio' || evaluateContent[i]['type'] === 'checkbox') {
                                    for (let j = 0, len2 = evaluateContent[i]['value'].length; j < len2; j++) {
                                        tag.push(evaluateContent[i]['value'][j])
                                    }
                                    continue
                                }
                                if (evaluateContent[i]['value'].length > 0) {
                                    tag.push(evaluateContent[i]['value'])
                                }
                            }
                            for (let k = 0, len3 = tag.length; k < len3; k++) {
                                btnGroup.push(
                                    h(
                                        "Button",
                                        {
                                            props: {
                                                type: "warning",
                                                size: "small",
                                                ghost: true
                                            },
                                            style: {
                                                margin: "2px"
                                            }
                                        },
                                        tag[k]
                                    )
                                );
                            }

                            return h("div", btnGroup);
                        }
                    }
                ]
            };
        },
        methods: {
            // 查询数据 分页页码重置
            sleectTemplateList(pageNum) {
                this.params.pageNum = pageNum;
                this.getList();
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
            search() {
                this.params.pageNum = 1;
                this.getList();
            },
            getList() {
                this.params.companyName = trim(this.params.companyName);
                const data = {
                    ...this.params,
                    startTime: this.params.startTime
                        ? startTime(this.params.startTime, "x")
                        : "",
                    endTime: this.params.endTime
                        ? endTime(this.params.endTime, "x")
                        : "",
                    isRead: this.params.isRead ? 0 : -1,
                    execute: this.params.execute ? 1 : -1,
                    partake: this.params.partake ? 1 : null,
                    customerId:
                        this.params.customerIdList.length > 0
                            ? this.params.customerIdList[
                            this.params.customerIdList.length - 1
                                ]
                            : ""
                };
                getWorkOrderCaseListData2(data).then(res => {
                    this.workOrderList = res.data.list || [];
                    this.params.pageNum = res.data.num || 1;
                    this.params.pageSize = res.data.size || 10;
                    this.params.count = res.data.count || 0;
                }).catch(error => {
                    this.$Modal.error({
                        title: "案例库",
                        content: error.msg
                    });
                })
            },
            checkView() {
                let name = "case-workOrderCaseList";
                if (this.$route.name === "wx-case-workOrderCaseList2") {
                    name = "wx-case-workOrderCaseList"
                }
                this.$router.push({
                    name: name
                })
            }
        },
        created() {
        },
        mounted() {
            this.getList();
        }
    };
</script>
