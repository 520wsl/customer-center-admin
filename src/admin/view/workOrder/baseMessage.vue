<template>
    <div>
        <Card class="md-card">
            <div slot="title">工单信息</div>
            <tables @eventCallback="eventCallback" :data="workOrderInfo"></tables>
        </Card>
        <Card class="md-card">
            <div slot="title">客户信息</div>
            <tables :data="cunstomInfo"></tables>
        </Card>
        <Card class="md-card" v-if="evaluateList.length != 0 && isExectorId()">
            <div slot="title" class="flex">客户评价
                <Button type="primary" class="flex-right" @click="clickAgianEvaluate">重新评价</Button>
            </div>
            <Card v-for="(item,index) in evaluateList" :key="'evaluate_'+index">
                <div slot="title">评价时间：{{formatTimeAction(item.createAt)}}</div>
                <evaluate-item :evaluateList="item.evaluateContent"></evaluate-item>
            </Card>
        </Card>
        <Modal
                v-model="modal"
                width="400px;"
                class="again-evaluate"
                title="重新评价"
                :mask-closable="false"
                @on-ok="sureEvaluate"
        >
            <span class="text">确定是否追加评价？</span>
        </Modal>
        <Modal v-model="isShowEditWorkOrderTitle" @on-ok="editWorkOrderTitleAction" title="工单标题">
            <Card class="md-card">
                <Input type="text" v-model="info.title">
                <span></span>
                </Input>
            </Card>
        </Modal>
    </div>
</template>

<script>
    import tables from "_c/admin/md-tables";
    import {mapState, mapMutations, mapActions} from "vuex";
    import {getArrValue} from "@/libs/tools";
    import {
        getWorkSheetInfoData,
        againEvaluate
    } from "@/api/admin/workSheet/workSheet";
    import {editWorkOrderTitle} from "@/api/admin/workSheet/workOrder";
    import {getEvaluateInfo} from "@/api/admin/evaluate/dimension";
    import evaluateItem from "_c/admin/evaluate-item";
    import {formatTime} from "@/libs/util/time";
    import {getSexValue} from "@/libs/util";

    export default {
        components: {
            evaluateItem,
            tables
        },
        methods: {
            ...mapActions(["getSixiId"]),
            ...mapMutations(["setWorkSheetBaseInfo"]),
            isExectorId() {
                let executorId =
                    this.$store.state.workSheet.workSheetBaseInfo.executorId ==
                    this.sixiId;
                return executorId
            },
            eventCallback(type) {
                if (type == 1) {
                    this.isShowEditWorkOrderTitle = true;
                }
            },
            async editWorkOrderTitleAction() {
                if (this.info.title.length <= 3) {
                    this.$Modal.error({
                        title: "修改工单标题",
                        content: "工单标题不能少于四个字符"
                    });
                    return;
                }
                let res = await editWorkOrderTitle({
                    id: this.info.id,
                    title: this.info.title
                });

                if (res.status !== 200) {
                    this.$Modal.error({
                        title: "修改工单标题",
                        content: res.msg
                    });
                    return;
                }
                this.getWorkSheetInfo();
                this.$Modal.success({
                    title: "修改工单标题",
                    content: "修改成功"
                });
            },
            formatTimeAction(time) {
                return formatTime(time, 'YYYY-MM-DD HH:mm:ss');
            },
            getWorkSheetTypeValue(key) {
                return getArrValue(this.$store.state.workSheet.workSheetType, key);
            },
            getCustomeIdentityValue() {
                return getArrValue(
                    this.$store.state.workSheet.customeIdentity,
                    this.info.customerDetailVo && this.info.customerDetailVo.role
                );
            },
            async getWorkSheetInfo() {
                let res = await getWorkSheetInfoData({
                    workSheetId: this.workSheetId
                });
                if (res.status !== 200) {
                    this.$Modal.error({
                        title: "工单详情",
                        content: res.msg
                    });
                    return;
                }
                this.setWorkSheetBaseInfo(res.data);
                this.info = res.data;
                this.assembleMessage();
                this.getEvaluateInfo();
            },
            assembleMessage() {
                this.setWorkOrderInfo();
                this.setCunstomInfo();
            },
            // 设置 工单信息
            setWorkOrderInfo() {
                let joinStr = "";
                this.info.userVos &&
                this.info.userVos.forEach(item => {
                    if (item) {
                        joinStr +=
                            item.userName + "(" + item.departmentName + ")，";
                    }
                });
                if (joinStr != "") {
                    joinStr = joinStr.slice(0, -1);
                }
                let executorUser = "";
                if (this.info.executorUser && this.info.executorUser.userName) {
                    executorUser = this.info.executorUser.userName;
                    if (this.info.executorUser.departmentName) {
                        executorUser +=
                            "(" + this.info.executorUser.departmentName + ")";
                    }
                }

                let leadingUser = "";
                if (this.info.leadingUser && this.info.leadingUser.userName) {
                    leadingUser = this.info.leadingUser.userName;

                    if (this.info.leadingUser.departmentName) {
                        leadingUser +=
                            "(" + this.info.leadingUser.departmentName + ")";
                    }
                }
                let workOrderInfo = [
                    [
                        {
                            title: "工单编号：",
                            value: this.info.identifier
                        },
                        {
                            title: "工单类型：",
                            value: this.getWorkSheetTypeValue(this.info.workType)
                        },
                        {
                            title: "发起人：",
                            value: this.info.sponsorName
                        }
                    ],
                    [
                        {
                            title: "工单创建时间：",
                            value: formatTime(
                                this.info.createAt,
                                "YYYY-MM-DD HH:mm:ss"
                            )
                        },
                        {
                            title: "工单响应时间：",
                            value: this.info.responseStr
                        },
                        {
                            title: "工单持续时间：",
                            value: this.info.durationStr
                        }
                    ],
                    [
                        {
                            title: "执行人：",
                            value: executorUser
                        },
                        {
                            title: "参与者：",
                            value: joinStr
                        },
                        {
                            title: "负责人：",
                            value: leadingUser
                        }
                    ],
                ];
                if (this.isExectorId()) {
                    workOrderInfo.push(
                        [
                            {
                                title: "工单标题：",
                                value: this.info.title,
                                eventType: 1
                            },
                            {
                                title: "",
                                value: ""
                            },
                            {
                                title: "",
                                value: ""
                            }
                        ]
                    )
                } else {
                    workOrderInfo.push(
                        [
                            {
                                title: "工单标题：",
                                value: this.info.title
                            },
                            {
                                title: "",
                                value: ""
                            },
                            {
                                title: "",
                                value: ""
                            }
                        ]
                    )
                }
                this.workOrderInfo = workOrderInfo;
            }
            ,
            // 设置 客户信息
            setCunstomInfo() {
                let phone =
                    (this.info.customerDetailVo &&
                        this.info.customerDetailVo.mobile) ||
                    "";
                let cunstomInfo = [
                    [
                        {
                            title: "用户手机号码：",
                            value: phone
                                ? phone.slice(0, 3) + "****" + phone.slice(-4)
                                : ""
                        }
                    ]
                ];

                if (this.info.customerDetailVo) {
                    cunstomInfo[0].push({
                        title: "用户openID：",
                        value:
                            (this.info.customerDetailVo &&
                                this.info.customerDetailVo.openId) ||
                            ""
                    });
                    cunstomInfo[0].push({
                        title: "微信昵称：",
                        value: this.info.wechatNickname || ""
                    });
                } else {
                    cunstomInfo[0].push({
                        title: "用户openID：",
                        value: ""
                    });
                    cunstomInfo[0].push({
                        title: "微信昵称：",
                        value: ""
                    });
                }
                cunstomInfo.push([
                    {
                        title: "称呼：",
                        value:
                            this.info.customerDetailVo &&
                            this.info.customerDetailVo.callName
                    },
                    {
                        title: "性别：",
                        value: getSexValue(
                            this.info.customerDetailVo &&
                            this.info.customerDetailVo.role
                        )
                    },
                    {
                        title: "客户角色：",
                        value: this.getCustomeIdentityValue()
                    }
                ]);
                cunstomInfo.push([
                    {
                        title: "公司名称：",
                        value:
                            this.info.customerDetailVo &&
                            this.info.customerDetailVo.companyName
                    },
                    {
                        title: "网址：",
                        value:
                            this.info.customerDetailVo &&
                            this.info.customerDetailVo.url
                    },
                    {
                        title: "合作业务：",
                        value: "暂无"
                    }
                ]);

                this.cunstomInfo = cunstomInfo;
            }
            ,
            // 获取评价详情
            getEvaluateInfo() {
                getEvaluateInfo(this.info.id, "").then(res => {
                    if (res.status != 200) {
                        return;
                    }
                    console.log(res);
                    let evaluateList = res.data || [];
                    evaluateList.map(item => {
                        item.evaluateContent.map(e => {
                            e.otherAttribute.maxNum = parseFloat(
                                e.otherAttribute.maxNum
                            );
                            return e;
                        });
                        return item;
                    });
                    this.evaluateList = evaluateList;
                });
            }
            ,
            async sureEvaluate() {
                let param = {
                    workSheetId: this.workSheetId
                };
                let res = await againEvaluate(param);
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "重新评价",
                        content: res.msg
                    });
                    return;
                }
            }
            ,
            clickAgianEvaluate() {
                this.modal = true;
            }
        },
        data() {
            return {
                sixiId: "",
                isShowEditWorkOrderTitle: false,
                cunstomInfo: [],
                workOrderInfo: [],
                evaluateList: [],
                workSheetId: 0,
                info: {
                    cellphone: "",
                    companyVoList: [],
                    confirmTime: "",
                    createAt: "",
                    departmentId: null,
                    departmentName: "",
                    evaluateTime: null,
                    executorId: 0,
                    executorName: "",
                    finishTime: null,
                    handleType: 0,
                    id: 0,
                    identifier: "", //工单编号
                    leadingName: "",
                    leadingOfficial: 0,
                    participator: "",
                    responseTime: "",
                    title: "",
                    userId: "",
                    workType: 0
                },
                modal: false
            };
        },
        created() {
            this.workSheetId = this.$route.query.workSheetId;
        },
        mounted() {
            this.getSixiId();
            this.sixiId = this.$store.state.user.sixiId;
            this.getWorkSheetInfo();
        }
    };
</script>