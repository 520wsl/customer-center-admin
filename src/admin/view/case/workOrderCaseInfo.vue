<template>
    <div>
        <Card class="md-card">
            <div class="flex">
                <div class="flex-left">
                    <h3>案例名称：{{name}}</h3>
                </div>
                <div v-if="isDirector()" class="flex-right">
                    <Button @click="isShowEditWorkOrderInfoName = true" type="success" ghost>修改</Button>
                </div>
            </div>
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
        <Modal v-model="isShowEditWorkOrderInfoName" title="修改案例名称">
            <Card class="md-card">
                <p>
                    <Input v-model="name">
                    <span></span>
                    </Input>
                </p>
            </Card>
            <div slot="footer">
                <Button @click="isShowEditWorkOrderInfoName = false" style="margin-left: 8px">取消</Button>
                <Button @click="editWorkOrderCaseInfoNameAction" type="primary">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Vue from "vue";

    Vue.prototype.utils = utils;
    import {mapState, mapActions} from "vuex";
    import {formatInitTime, startTime, endTime} from "@/libs/util/time";
    import Page from "_c/admin/page";
    import {
        getWorkOrderCaseInfoData,
        delWorkOrderCaseInfoData,
        editWorkOrderCaseInfoName
    } from "@/api/admin/case/case";
    import utils from "@/libs/util/public";
    import "./index.less";

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
                isShowEditWorkOrderInfoName: false,
                videoModel: true,
                name: "",
                params: {
                    // 案例库ID
                    caseLibraryId: "",
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
                    // 分页参数
                    pageNum: 1,
                    pageSize: 10,
                    count: 0,
                    customerId: "",
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
                    {
                        title: "微信昵称",
                        align: "center",
                        key: "wechatNickname"
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
                        title: "操作",
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
                                                let name = "workOrder-info-service";
                                                if (
                                                    this.$route.name ==
                                                    "wx-case-workOrderCaseInfo"
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
                ]
            };
        },
        methods: {
            isDirector() {
                return this.$store.state.user.userInfo.isDirector || false
            },
            ...mapActions(["getSixiId"]),
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
                getWorkOrderCaseInfoData(data).then(res => {
                    this.workOrderList = res.data.list || [];
                    this.params.pageNum = res.data.num || 1;
                    this.params.pageSize = res.data.size || 10;
                    this.params.count = res.data.count || 0;
                }).catch(error => {
                    this.$Modal.error({
                        title: "工单列表",
                        content: error.msg
                    });
                })
            },
            delWorkOrderCase(workSheetId) {
                delWorkOrderCaseInfoData({workSheetId}).then(res => {
                    this.$Modal.success({
                        title: "删除案例工单",
                        content: "删除成功"
                    });
                }).catch(error => {
                    this.$Modal.error({
                        title: "删除案例工单",
                        content: error.msg
                    });
                });

            },
            editWorkOrderCaseInfoNameAction() {
                if(this.name.length <= 0 || this.name.length >40){
                     this.$Modal.success({
                        title: "修改案例名称",
                        content: "案例名称请控制在1-40个字符内"
                    });
                     return ;
                }

                editWorkOrderCaseInfoName({
                    caseLibraryId: this.params.caseLibraryId,
                    name: this.name
                }).then(res => {
                    this.isShowEditWorkOrderInfoName = false;
                    this.$Modal.success({
                        title: "修改案例名称",
                        content: "修改成功"
                    });
                }).catch(error => {
                    this.$Modal.error({
                        title: "修改案例名称",
                        content: error.msg
                    });
                });

            }
        },
        created() {
            console.log(this.$route);
            this.name = this.$route.query.name || "";
            this.params.caseLibraryId = this.$route.query.id || "";
        },
        mounted() {
            this.getList();
        }
    };
</script>
