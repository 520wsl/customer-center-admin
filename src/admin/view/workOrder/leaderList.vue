<template>
    <div>
        <Card class="md-card">
            <p slot="title">工单后台</p>
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
                        >{{item.value}}</Option>
                    </Select>
                    <Select class="search-col" placeholder="工单状态" v-model="params.handleType">
                        <Option :value="-1">工单状态</Option>
                        <!-- <Option v-for="(item,index) in statusList" :key="index" :value="item.key">{{item.value}}</Option> -->
                        <Option
                            v-for="(item,index) in searchStatusList"
                            :key="index"
                            :value="item.key"
                        >{{item.value}}</Option>
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
                    <span class="search-input-item-lable">持续时间：</span>
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
                    <span class="search-input-item-lable">响应时间：</span>
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
                <!-- <div class="search-input-item">
                    <span>用户手机号码：</span>
                    <Input class="search-input" v-model="params.telephone" placeholder="请输入手机号">
                    <span></span>
                    </Input>
                </div>-->
                <div class="search-input-item">
                    <span class="search-input-item-lable">切换部门：</span>
                    <Cascader class="search-input-item" filterable change-on-select v-model="params.customerIdList" :data="departmentList" @on-change="changeDepartment"></Cascader>
                    <!-- <Department
                        class="search-input"
                        width="200"
                        :get-user-info="getUserInfo"
                        :loading-user="true"
                        v-model="params.customerIdList"
                    ></Department> -->
                </div>
                <!-- <div class="search-input-item">
                    <Checkbox v-model="params.isRead">新消息</Checkbox>
                    <Checkbox v-model="params.execute">执行者</Checkbox>
                    <Checkbox v-model="params.partake">我参与的</Checkbox>
                </div> -->
                <div class="search-btn flex-right">
                    <Button @click="search" type="primary" :disabled="isLead == 0">搜索</Button>
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
import { mapState, mapActions } from "vuex";
import { formatInitTime, startTime, endTime } from "@/libs/util/time";
import Page from "_c/admin/page";
// import Department from "_c/public/department";
import { getLeaderList, getLeaderDepartment, getLeaderDepartmentList } from "@/api/admin/workSheet/workSheet";
import { saveWorkOrder } from "@/api/admin/workSheet/workOrder";
import utils from "@/libs/util/public";
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
                    return item.key !== 1;
                });
            },
            workSheetType: state => state.workSheet.workSheetType,
            statusList: state => state.workSheet.workSheetHandleType,
            isLead: state => state.user.userInfo.isLead || 0
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
                // {
                //     title: "用户手机",
                //     align: "center",
                //     key: "cellphone"
                // },
                {
                    title: "客户昵称",
                    align: "center",
                    key: "wechatNickname"
                },
                {
                    title: "创建时间",
                    align: "center",
                    width: 130,
                    sortable: "custom",
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
                    sortable: "custom",
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
                    sortable: "custom",
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
                    title: "状态",
                    align: "center",
                    render: (h, params) => {
                        const statusList = this.statusList.filter(item => {
                            return item.key == params.row.type;
                        });
                        if (statusList.length > 0) {
                            // if (params.row.type == 1) {
                            //     return h(
                            //         "span",
                            //         { style: { color: "red" } },
                            //         statusList[0]["value"]
                            //     );
                            // }
                            return h("span", statusList[0]["value"]);
                        } else {
                            return h("span", "");
                        }
                    }
                },
                {
                    title: "新消息",
                    align: "center",
                    render: (h, params) => {
                        if (!params.row.isRead) {
                            return h("span", "有");
                        } else {
                            return h("span", "无");
                        }
                    }
                },
                {
                    title: "责任人",
                    align: "center",
                    render: (h, params) => {
                        const user = params.row.userVo || {};
                        const name = user.userName || "";
                        const departmentName = user.departmentName
                            ? "(" + user.departmentName + ")"
                            : "";
                        return h("span", name + departmentName);
                    }
                },
                {
                    title: "操作",
                    align: "center",
                    render: (h, params) => {
                        let btnGroup = [];
                        let query = params.row;
                        // if (
                        //     (query.type == 3 && query.isSend) ||
                        //     (query.type == 4 && query.isSend)
                        // ) {
                        //     btnGroup.push(
                        //         h(
                        //             "a",
                        //             {
                        //                 style: {
                        //                     color: "#2d8cf0",
                        //                     display: "block",
                        //                     margin: "5px"
                        //                 },
                        //                 on: {
                        //                     click: () => {
                        //                         this.isSaveWorkOrderAction = true;
                        //                         this.saveWorkOrderActionData = {
                        //                             workOrderType:
                        //                                 query.workType,
                        //                             context: "客服发起...",
                        //                             mobile: query.mobile,
                        //                             companySixiId:
                        //                                 query.companyId,
                        //                             companyName:
                        //                                 query.companyName,
                        //                             customerSixiId:
                        //                                 query.sixiId,
                        //                             wechatNickname:
                        //                                 query.wechatNickname,
                        //                             sponsorType: 1
                        //                         };
                        //                     }
                        //                 }
                        //             },
                        //             "发起工单"
                        //         )
                        //     );
                        // }
                        
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
                                            let name = "workOrder-info-service";
                                            if (
                                                this.$route.name ==
                                                "wx-workOrder-leaderList"
                                            ) {
                                                name =
                                                    "wx-workOrder-info-service";
                                            }
                                            this.$router.push({
                                                name,
                                                query: {
                                                    workSheetId: params.row.id,
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
            let res = await saveWorkOrder({ ...this.saveWorkOrderActionData });
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
            if(selectedData.length > 0){
                let obj = selectedData[selectedData.length-1];
                if(obj.type == "user"){
                    this.params.customerId = value[value.length-1] || "";
                    this.params.departmentId = "";
                } else if(obj.type == "department"){
                    this.params.departmentId = value[value.length-1] || "";
                    this.params.customerId = "";
                }
            } else {
                this.params.departmentId = "";
                this.params.customerId = "";
            }
        },
        getDepartmentList() {
            getLeaderDepartment().then( res =>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "部门数据",
                        content: res.msg
                    });
                    return;
                }
                let pid = res.data && res.data[0] && res.data[0].departmentId || "";
                getLeaderDepartmentList({ pid }).then( res =>{
                    if(res.status != 200){
                        this.$Modal.error({
                            title: "部门列表数据",
                            content: res.msg
                        });
                        return;
                    }
                    this.departmentList = res.data || [];
                })
            }).catch( res =>{
                // if(res.status != 200){
                //     this.$Modal.error({
                //         title: "部门数据",
                //         content: res.msg
                //     });
                //     return;
                // }
            })
        },
        async getList() {
            const data = {
                ...this.params,
                startTime: this.params.startTime
                    ? startTime(this.params.startTime, "x")
                    : "",
                endTime: this.params.endTime
                    ? endTime(this.params.endTime, "x")
                    : "",
                // isRead: this.params.isRead ? 0 : -1,
                // execute: this.params.execute ? 1 : -1,
                // partake: this.params.partake ? 1 : null,
                // customerId:
                //     this.params.customerIdList.length > 0
                //         ? this.params.customerIdList[
                //               this.params.customerIdList.length - 1
                //           ]
                //         : ""
            };
            let res = await getLeaderList(data);
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
        // if (this.$route.query.sixiId) {
        //     this.params.sixiId = this.$route.query.sixiId;
        // } else {
        //     this.getSixiId();
        //     this.params.sixiId = this.$store.state.user.sixiId;
        // }
        if(this.isLead == 0){
            this.$Modal.error({
                title: "部门工单列表",
                content: "您暂无权限"
            });
            return ;
        }
        this.getDepartmentList();
        this.getList();
    }
};
</script>
