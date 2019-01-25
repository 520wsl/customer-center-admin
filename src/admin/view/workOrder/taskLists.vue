<template>
    <div>
        <Card class="md-card">
            <div class="search-con flex">
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
                    <Select class="search-col" placeholder="工单状态" v-model="params.handleType">
                        <Option :value="-1">工单状态</Option>
                        <!-- <Option v-for="(item,index) in statusList" :key="index" :value="item.key">{{item.value}}</Option> -->
                        <Option
                                v-for="(item,index) in searchStatusList"
                                :key="index"
                                :value="item.key"
                        >{{item.value}}
                        </Option>
                    </Select>
                </div>
                <div class="search-input-item">
                    <span class="search-input-item-lable">请求时间：</span>
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
                    <span class="search-input-item-lable">受理人：</span>
                    <Cascader class="search-input-item" filterable v-model="params.customerIdList"
                              :data="departmentList" @on-change="changeDepartment"></Cascader>
                </div>
                <div class="search-btn flex-right">
                    <Button @click="search" type="primary">搜索</Button>
                </div>
            </div>
        </Card>
        <Card class="md-card">
            <Table :data="workOrderList" @on-sort-change="sortChange" :columns="columns" border></Table>
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
        <Modal
                v-model="isSaveWorkOrderAction"
                width="400px;"
                class="again-evaluate"
                title="发起工单"
                :mask-closable="false"
                @on-ok="saveWorkOrderAction"
        >
            <span class="text">确定是否发起工单？</span>
        </Modal>
    </div>
</template>

<script>
    import Vue from "vue";

    Vue.prototype.utils = utils;
    import {mapState, mapActions} from "vuex";
    import {formatInitTime, startTime, endTime} from "@/libs/util/time";
    import Page from "_c/admin/page";
    // import Department from "_c/public/department";
    import {getAcceptedListData, getLeaderDepartment, getLeaderDepartmentList} from "@/api/admin/workSheet/workSheet";
    import {saveWorkOrder} from "@/api/admin/workSheet/workOrder";
    import utils from "@/libs/util/public";
    import {trim} from "@/libs/tools";
    import "./index.less";

    export default {
        components: {
            Page,
            // Departmen
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
                        return item.key == 0 || item.key == 5;
                    });
                },
                workSheetType: state => state.workSheet.workSheetType,
                statusList: state => state.workSheet.workSheetHandleType,
                // isLead: state => state.user.userInfo.isLead || 0
            })
        },
        data() {
            return {
                departmentList: [],
                isSaveWorkOrderAction: false,
                videoModel: true,
                saveWorkOrderActionData: {},
                params: {
                    // 客户名称
                    companyName: "",
                    // 工单编号
                    identifier: "",
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
                    // 是否新消息
                    // isRead: false,
                    // 是否是我执行
                    // execute: false,
                    // 是否我参与 1:我参与 默认为空
                    // partake: true,
                    // 排序规则 0:创建时间 1:结束时间 2:持续时间
                    sortType: 0,
                    // 正序倒序规则 0:倒序 1:正序
                    sort: 0,
                    // 手机号
                    telephone: "",
                    // 分页参数
                    pageNum: 1,
                    pageSize: 10,
                    count: 0,
                    customerId: "",
                    departmentId: "",
                    customerIdList: []
                },
                workOrderList: [],
                columns: [
                    {
                        title: "请求时间",
                        align: "center",
                        width: 130,
                        sortable: "custom",
                        key: "createAt",
                        render: (h, params) => {
                            const format = "YYYY-MM-DD HH:mm:ss";
                            const ele = params.row.createAt
                                ? formatInitTime(params.row.createAt, format)
                                : "";
                            return h("span", ele);
                        }
                    },
                    {
                        title: "客户名称",
                        align: "center",
                        key: "companyName"
                    },
                    {
                        title: "工单编号",
                        align: "center",
                        key: "identifier"
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
                        title: "客户昵称",
                        align: "center",
                        key: "wechatNickname"
                    },
                    {
                        title: "状态",
                        align: "center",
                        render: (h, params) => {
                            const statusList = this.statusList.filter(item => {
                                return item.key == params.row.handleType;
                            });
                            if (statusList.length > 0) {
                                return h("span", statusList[0]["value"]);
                            } else {
                                return h("span", "");
                            }
                        }
                    },
                    {
                        title: "发起方",
                        align: "center",
                        render: (h, params) => {
                            const user = params.row.sponsorInfo || {};
                            const name = user.userName || "";
                            const departmentName = user.departmentName
                                ? "(" + user.departmentName + ")"
                                : "";
                            return h("span", name + departmentName);
                        }
                    },
                    {
                        title: "第一受理人",
                        align: "center",
                        render: (h, params) => {
                            let str = ''
                            let user = params.row.firstInfo || [];
                            for (let i = 0, len = user.length; i < len; i++) {
                                console.log(user[i]['userName'])
                                let name = ''
                                let departmentName = ''
                                name = user[i]['userName'] || "";
                                departmentName = user[i]['departmentName']
                                    ? "(" + user[i].departmentName + ")"
                                    : "";
                                str += name + departmentName
                            }
                            return h("span", str);
                        }
                    },
                    {
                        title: "第二受理人",
                        align: "center",
                        render: (h, params) => {
                            let str = ''
                            let user = params.row.secondInfo || [];
                            for (let i = 0, len = user.length; i < len; i++) {
                                console.log(user[i]['userName'])
                                let name = ''
                                let departmentName = ''
                                name = user[i]['userName'] || "";
                                departmentName = user[i]['departmentName']
                                    ? "(" + user[i].departmentName + ")"
                                    : "";
                                str += name + departmentName
                            }
                            return h("span", str);
                        }
                    },
                    {
                        title: "第三受理人",
                        align: "center",
                        render: (h, params) => {
                            let str = ''
                            let user = params.row.thirdInfo || [];
                            for (let i = 0, len = user.length; i < len; i++) {
                                console.log(user[i]['userName'])
                                let name = ''
                                let departmentName = ''
                                name = user[i]['userName'] || "";
                                departmentName = user[i]['departmentName']
                                    ? "(" + user[i].departmentName + ")"
                                    : "";
                                str += name + departmentName
                            }
                            return h("span", str);
                        }
                    },
                    {
                        title: "操作",
                        align: "center",
                        render: (h, params) => {
                            let btnGroup = [];
                            let query = params.row;
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
                                                let name = "workOrder-info-service";
                                                if (
                                                    this.$route.name ==
                                                    "wx-workOrder-task-list"
                                                ) {
                                                    name =
                                                        "wx-workOrder-info-service";
                                                }
                                                this.$router.push({
                                                    name,
                                                    query: {
                                                        workSheetId: params.row.workSheetId,
                                                        companyName:
                                                        params.row.companyName
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    "查看工单"
                                )
                            );

                            return h("div", btnGroup);
                        }
                    }
                ]
            };
        },
        methods: {
            ...mapActions(["getSixiId"]),
            // getUserInfo(data) {
            //     console.log(data);
            // },
            async saveWorkOrderAction() {
                let res = await saveWorkOrder({...this.saveWorkOrderActionData});
                console.log(res);
                if (res.status !== 200) {
                    this.$Modal.error({
                        title: "发起工单",
                        content: res.msg
                    });
                    return;
                }
                this.isSaveWorkOrderAction = false;
                this.search();
                this.$Modal.success({
                    title: "发起工单",
                    content: "发起成功"
                });
            },
            sortChange(column) {
                // 创建时间升序
                const key = column.key;
                const order = column.order;
                if (key === "startTime" && order === "asc") {
                    this.params.sortType = 0;
                    this.params.sort = 1;
                    this.getList();
                }
                // 创建时间降序序
                if (key === "startTime" && order === "desc") {
                    this.params.sortType = 0;
                    this.params.sort = 0;
                    this.getList();
                }
                // 持续时间升序
                if (key === "durationStr" && order === "asc") {
                    this.params.sortType = 2;
                    this.params.sort = 1;
                    this.getList();
                }
                // 持续时间降序序
                if (key === "durationStr" && order === "desc") {
                    this.params.sortType = 2;
                    this.params.sort = 0;
                    this.getList();
                }
                // 结束时间升序
                if (key === "finishTime" && order === "asc") {
                    this.params.sortType = 1;
                    this.params.sort = 1;
                    this.getList();
                }
                // 结束时间降序序
                if (key === "finishTime" && order === "desc") {
                    this.params.sortType = 1;
                    this.params.sort = 0;
                    this.getList();
                }
            },
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
            changeDepartment(value, selectedData) {
                if (selectedData.length > 0) {
                    let obj = selectedData[selectedData.length - 1];
                    if (obj.type == "user") {
                        this.params.customerId = value[value.length - 1] || "";
                        this.params.departmentId = "";
                    } else if (obj.type == "department") {
                        this.params.departmentId = value[value.length - 1] || "";
                        this.params.customerId = "";
                    }
                } else {
                    this.params.departmentId = "";
                    this.params.customerId = "";
                }
            },
            getDepartmentList() {
                getLeaderDepartment().then(res => {
                    if (res.status != 200) {
                        this.$Modal.error({
                            title: "部门数据",
                            content: res.msg
                        });
                        return;
                    }
                    let pid = res.data && res.data[0] && res.data[0].departmentId || "";
                    getLeaderDepartmentList({pid}).then(res => {
                        if (res.status != 200) {
                            this.$Modal.error({
                                title: "部门列表数据",
                                content: res.msg
                            });
                            return;
                        }
                        this.departmentList = res.data || [];
                    })
                }).catch(res => {
                })
            },
            async getList() {
                this.params.companyName = trim(this.params.companyName);
                const data = {
                    ...this.params,
                    startTime: this.params.startTime
                        ? startTime(this.params.startTime, "x")
                        : "",
                    endTime: this.params.endTime
                        ? endTime(this.params.endTime, "x")
                        : ""
                };
                let res = await getAcceptedListData(data);
                if (res.status !== 200) {
                    this.$Modal.error({
                        title: "工单列表",
                        content: res.msg
                    });
                }

                this.workOrderList = res.data.list || [];
                this.params.pageNum = res.data.num || 1;
                this.params.pageSize = res.data.size || 10;
                this.params.count = res.data.count || 0;
            }
        },
        mounted() {
            this.getDepartmentList();
            this.getList();
        }
    };
</script>
