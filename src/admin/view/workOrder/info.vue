<template>
    <div>
        <Card class="md-card" v-if="isShowStatus">
            <Steps :current="current">
                <Step
                    v-for="(item,index) in status.list"
                    :key="index"
                    :title="item.title"
                    :content="item.component"
                ></Step>
            </Steps>
        </Card>
        <Card class="md-card">
            <div slot="title">当前工单状态：{{getWorkSheetTypeValue(showWorkSheetType)}}</div>
            <div slot="extra">
                <div v-if="isHaveUserId">
                    <a
                        v-if="current == 0 && isExectorId"
                        @click="setWorkSheetProcessing(2)"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-hammer"></Icon>工单受理
                    </a>
                    <a
                        v-if="current == 1 && isExectorId"
                        @click="assignPersonnel"
                        href="javascript:;"
                        class="md-card-btn-info"
                    >
                        <Icon type="md-create"></Icon>指派
                    </a>
                    <a
                        v-if="current == 1 && isExectorId"
                        @click="setWorkSheetProcessing(3)"
                        href="javascript:;"
                        class="md-card-btn-success"
                    >
                        <Icon type="md-checkmark"></Icon>设为完结
                    </a>
                </div>
            </div>
            <div class="btn-group">
                <ButtonGroup>
                    <Button @click="toPage('service')" type="info" :ghost="isBase">服务信息</Button>
                    <Button @click="toPage('base')" type="info" :ghost="!isBase">基本信息</Button>
                </ButtonGroup>
            </div>
        </Card>
        <router-view></router-view>
        <Modal v-model="modal.bool" footer-hide title="工单指派" mask-closable>
            <Card class="md-card">
                <!-- <RadioGroup v-model="modal.index">
                    <table class="tab">
                        <tbody>
                            <tr v-for="(item,index) in modal.personList" :key="index">
                                <td class="title2">
                                    <Radio :value="item.staffSixiId" :label="index"></Radio>
                                </td>
                                <td>{{item.staffTag+' : '}}</td>
                                <td>{{item.staffName+"("+item.department+")"}}</td>
                            </tr>
                        </tbody>
                    </table>
                </RadioGroup> -->
                <RadioGroup v-model="modal.type" vertical>
                    <Radio label="1">关联客服：</Radio>
                    <Select v-model="modal.relateService" style="width:200px">
                        <Option v-for='(item,index) in modal.personList' :value="item.staffSixiId" :key="index">{{staffTagIdList[item.staffTagId]}}：{{item.staffName+"("+item.department+")"}}</Option>
                    </Select>
                    <Radio label="2">上级领导：</Radio>
                    {{modal.superiorLeader.userName}}
                    <Radio label="3">其他员工：</Radio>
                    <Department :loading-user="true" width="200" :get-user-info="getUserInfo"  v-model="modal.customerIdList"></Department>
                </RadioGroup>
                <!-- 本期不做 -->
                <div v-if="false">
                    <h3>客服记录</h3>
                    <Input type="textarea">
                    <span></span>
                    </Input>
                </div>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="subAssign">提交</Button>
                    <Button class="btn" type="default" @click="modal.bool = false">取消</Button>
                </div>
            </Card>
        </Modal>
    </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { getArrValue } from "@/libs/tools";
import {
    getWorkSheetInfoData,
    setWorkSheetProcessingState,
    assignWorksheet
} from "@/api/admin/workSheet/workSheet";
import { getstaffListData } from "@/api/admin/custom/custom";
import { getSuperiorLeader } from "@/api/admin/department/department";
import { formatTime } from "@/libs/util/time";
import "./index.less";
import Department from "_c/public/department";
export default {
    components:{
        Department
    },
    computed: {
        isShowStatus() {
            return this.status.list.length > 0;
        },
        isBase() {
            let name = this.$route.name;
            let res = true;
            switch (name) {
                case "workOrder-info-base":
                case "wx-workOrder-info-base":
                    res = true;
                    break;
                case "workOrder-info-service":
                case "wx-workOrder-info-service":
                    res = false;
                    break;
            }
            return res;
        },
        showWorkSheetType() {
            return this.$store.state.workSheet && this.$store.state.workSheet.workSheetBaseInfo && this.$store.state.workSheet.workSheetBaseInfo.handleType;
        },
        isExectorId() {
            let executorId = this.$store.state.workSheet.workSheetBaseInfo
                .executorId;
            return executorId == this.sixiId;
        },
        isHaveUserId() {
            if (this.info && this.info.userId) {
                return true;
            }
            return false;
        },
        ...mapState({
			staffTagIdList: state => state.custom.staffTagIdList
		}),
    },
    methods: {
        ...mapMutations(["setWorkSheetBaseInfo"]),
        ...mapActions(["getSixiId"]),     
        getUserInfo(data) {
            console.log(data)
        },    
        assignPersonnel() {
            this.modal.bool = true;
            this.getPersonalList();
            this.getLeaderData();
        },
        async getLeaderData() {
            let department = this.info.executorUser && this.info.executorUser.department || "";
            let res = await getSuperiorLeader({ department });
            console.log(res)
            this.modal.superiorLeader = res.data || { sixiId: "", userName: ""}
        },
        subAssign() {
            let executorSixiId = "";
            if(this.modal.type == '1'){
                executorSixiId = this.modal.relateService
            } else if(this.modal.type == '2'){
                executorSixiId = this.modal.superiorLeader.sixiId
            } else if(this.modal.type == '3'){
                let arr = this.modal.customerIdList
                executorSixiId = arr[arr.length-1]
            } else {
                this.$Modal.error({
                    title: "人员指派",
                    content: "请选择指派人员类型"
                });
                return;
            }
            let params = {
                workSheetId: this.info.id,
                executorSixiId
            };
            assignWorksheet(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "人员指派",
                        content: res.msg
                    });
                    return;
                }
                this.modal.bool = false;
                this.getWorkSheetInfo();
            });
        },
        isError(handleType) {
            return handleType == 1 ? "error" : "";
        },
        getWorkSheetTypeValue(key) {
            return getArrValue(
                this.$store.state.workSheet.workSheetHandleType,
                key
            );
        },
        toPage(path) {
            console.log(this.$route);
            let route = this.$route;
            let workSheetId = route.query.workSheetId;
            this.$router.push({
                path: path,
                query: {
                    workSheetId
                }
            });
        },
        async setWorkSheetProcessing(handleType) {
            let params = {
                workSheetId: this.info.id,
                handleType
            };
            let message = "修改成功";
            switch (handleType) {
                case 2:
                    message = "工单确认成功";
                    break;
                case 3:
                    message = "工单已完结";
                    break;
            }
            let res = await setWorkSheetProcessingState({ ...params });
            if (res.status !== 200) {
                this.$Modal.error({
                    title: "工单状态修改",
                    content: res.msg
                });
                return;
            }
            this.$Modal.success({
                title: "工单状态修改",
                content: message
            });
            this.getWorkSheetInfo();
        },
        async getWorkSheetInfo() {
            let res = await getWorkSheetInfoData({
                workSheetId: this.workSheetId
            });
            if (res.status !== 200) {
                console.error("getWorkSheetInfo", res.msg);
                this.$Modal.error({
                    title: "工单详情",
                    content: res.msg
                });
                return;
            }
            this.info = res.data;
            this.stepsType(res.data);
            this.setWorkSheetBaseInfo(res.data);
        },
        async getPersonalList() {
            let customerSixiId = this.info.userId || '';
            let res = await getstaffListData({ customerSixiId });
            console.log(res);
            if (res.status != 200) {
                this.$Modal.error({
                    title: "指派人员列表",
                    content: res.msg
                });
                return;
            }
            this.modal.personList = res.data || [];
        },
        stepsType(data) {
            // let handleType = this.$store.state.workSheet.workSheetBaseInfo
            // 	.handleType;

            let type = 0;
            switch (data.handleType) {
                case 0:
                    type = 0;
                    break;
                case 1:
                    type = 0;
                    break;
                case 2:
                    type = 1;
                    break;
                case 3:
                    type = 2;
                    break;
                case 4:
                    type = 3;
                    break;
            }
            this.current = type;
            this.status.list = [
                {
                    title: "待处理",
                    component: formatTime(data.createAt, "YYYY-MM-DD HH:mm:ss")
                },
                {
                    title: "处理中",
                    component: formatTime(
                        data.confirmTime,
                        "YYYY-MM-DD HH:mm:ss"
                    )
                },
                {
                    title: "已完结",
                    component: formatTime(
                        data.finishTime,
                        "YYYY-MM-DD HH:mm:ss"
                    )
                },
                {
                    title: "已评价",
                    component: formatTime(
                        data.evaluateTime,
                        "YYYY-MM-DD HH:mm:ss"
                    )
                }
            ];
        }
    },
    data() {
        return {
            current: 0,
            info: {},
            workSheetId: 0,
            sixiId: "",
            status: {
                list: []
            },
            modal: {
                bool: false,
                personList: [],
                index: "",
                type: "1",
                relateService: '',
                customerIdList: [],
                superiorLeader:{}
            }
        };
    },
    created() {
        this.workSheetId = this.$route.query.workSheetId;
    },
    mounted() {
        this.getWorkSheetInfo();
        this.getSixiId();
        this.sixiId = this.$store.state.user.sixiId;
    }
};
</script>
