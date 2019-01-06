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
                        v-if="isDirector && info && info.handleType == 4"
                        @click="joinCasebase"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-hammer"></Icon>加入案例库
                    </a>
                    <a
                        v-if="current == 0 && (isExectorId || isLeader) && info.handleType != 5"
                        @click="setWorkSheetProcessing(2)"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-hammer"></Icon>工单受理
                    </a>
                    <a
                        v-if="info && info.handleType == 5 && (transferInfo && transferInfo.coverTransferSixiId == sixiId)"
                        @click="transfer"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-hammer"></Icon>移交确认
                    </a>
                    <a
                        v-if="info && info.handleType == 5 && (transferInfo && transferInfo.transferSixiId == sixiId)"
                        @click="checkTransfer"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-hammer"></Icon>查看移交
                    </a>
                    <a
                        v-if="info && (info.handleType == 0 || info.handleType == 1 || info.handleType == 2) && (isExectorId || isLeader)"
                        @click="assignPersonnel"
                        href="javascript:;"
                        class="md-card-btn-warning"
                    >
                        <Icon type="md-create"></Icon>移交
                    </a>
                    <a
                        v-if="current == 1 && isExectorId && info.handleType != 5"
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
        <Modal v-model="caseParams.bool" footer-hide title="加入案例库" width="700" :mask-closable="false">
            <Card class="md-card">
                <Button type="primary" @click="addCase.bool = true">新创建案例</Button>
                <div class="casebase-list">
                    <Table :columns="caseParams.columns" :show-header="false" :data="caseParams.list" @on-selection-change="tableSelect"></Table>
                </div>
                <div class="casebase-list">
                    <Page :pageNum="caseParams.pageNum" :pageSize="caseParams.pageSize" :count="caseParams.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></Page>
                </div>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="submitCase">提交</Button>
                    <Button class="btn" type="default" @click="caseParams.bool = false">取消</Button>
                </div>
            </Card>
        </Modal>
        <Modal v-model="addCase.bool" footer-hide title="案例名称" :mask-closable="false">
            <Card class="md-card">
                <div>
                    <Input v-model="addCase.caseName" :maxlength="40" placeholder="请输入案例名称"></Input>
                </div>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="createCase">提交</Button>
                    <Button class="btn" type="default" @click="addCase.bool = false">取消</Button>
                </div>
            </Card>
        </Modal>
        <router-view></router-view>
        <Modal v-model="modal.bool" footer-hide title="工单移交" :mask-closable="false">
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
                    <Select v-model="modal.superiorLeaderSixiId">
                        <Option v-for='(item,index) in modal.superiorLeaderList' :value="item.sixiId" :key="index">{{item.userName+"("+item.departmentName+")"}}</Option>
                    </Select>
                    <Radio label="3">其他员工：</Radio>
                    <Department :loading-user="true" width="200" :get-user-info="getUserInfo"  v-model="modal.customerIdList"></Department>
                </RadioGroup>
                <!-- 本期不做 -->
                <div style="margin-top:20px;">
                    <div>备注</div>
                    <Input type="textarea" v-model="modal.remark" :maxlength="400">
                    <span></span>
                    </Input>
                </div>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="subAssign">提交</Button>
                    <Button class="btn" type="default" @click="modal.bool = false">取消</Button>
                </div>
            </Card>
        </Modal>
        <Modal v-model="transferModal.bool" footer-hide title="移交确认" :mask-closable="false">
            <Card class="md-card">
                <div class="info">
                    <div class="info-item">
                        <b>移交人：</b>
                        <span>{{transferInfo.transferUserName+"("+transferInfo.transferUserDepartmentName+")"}}</span>
                    </div>
                    <div class="info-item">
                        <b>被移交人：</b>
                        <span>{{transferInfo.coverTransferUserName+"("+transferInfo.coverTransferDepartmentName+")"}}</span>
                    </div>
                    <div class="info-item">
                        <b>备注：</b>
                        <span>{{transferInfo.remark}}</span>
                    </div>
                </div>
                <div class="transfer-btn">
                    <RadioGroup class="radio" v-model="transferModal.state">
                        <Radio :label="1">接受</Radio>
                        <Radio :label="2">拒绝</Radio>
                    </RadioGroup>
                    <Button class="btn" type="primary" @click="sureTransfer">确认</Button>
                </div>
                <div v-if="transferModal.state == 2" class="info">
                    <div class="info-item">
                        <b>拒绝原因：</b>
                        <Input type="textarea" v-model="transferModal.refuseReason" :maxlength="400"></Input>
                    </div>
                </div>
            </Card>
        </Modal>
        <Modal v-model="checkTransferModal" footer-hide title="工单移交" :mask-closable="false">
            <Card class="md-card">
                <div class="info">
                    <div class="info-item">
                        <b>移交人：</b>
                        <span>{{transferInfo.transferUserName+"("+transferInfo.transferUserDepartmentName+")"}}</span>
                    </div>
                    <div class="info-item">
                        <b>被移交人：</b>
                        <span>{{transferInfo.coverTransferUserName+"("+transferInfo.coverTransferDepartmentName+")"}}</span>
                    </div>
                    <div class="info-item">
                        <b>备注：</b>
                        <span>{{transferInfo.remark}}</span>
                    </div>
                </div>
                <div class="btn-group" style="text-align:right;">
                    <Button class="btn" type="primary" @click="retract">撤回</Button>
                    <Button class="btn" @click="checkTransferModal = false">返回</Button>
                </div>
            </Card>
        </Modal>
    </div>
</template>

<script>
import Page from "_c/admin/page";
import { mapMutations, mapState, mapActions } from "vuex";
import { getArrValue } from "@/libs/tools";
import {
    getWorkSheetInfoData,
    setWorkSheetProcessingState,
    assignWorksheet,
    transferWorksheetInfo,
    sureTransferWorksheet,
    retractTransferWorksheet
    
} from "@/api/admin/workSheet/workSheet";
import {
    createWorkOrderCase,
    joinWorkOrderCase,
    getWorkOrderCaseListData,
    getIsDirector
} from "@/api/admin/case/case";
import { getstaffListData } from "@/api/admin/custom/custom";
import { getSuperiorLeader, getIsLeader } from "@/api/admin/department/department";
import { formatTime } from "@/libs/util/time";
import "./index.less";
import Department from "_c/public/department";
export default {
    components:{
        Department,
        Page
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
            staffTagIdList: state => state.custom.staffTagIdList,
            isDirector: state => state.user.userInfo.isDirector || false
		}),
    },
    methods: {
        ...mapMutations(["setWorkSheetBaseInfo"]),
        ...mapActions(["getSixiId"]),     
        getUserInfo(data) {
            console.log(data)
        },
        // 撤回移交
        retract() {
            this.$Modal.confirm({
                title: '工单移交',
                content: '请确认是否撤回该工单？',
                loading: true,
                onOk: () => {
                    // setTimeout(() => {
                    //     this.$Modal.remove();
                    //     this.$Message.info('Asynchronously close the dialog box');
                    // }, 2000);
                    let workSheetId = this.info.id || "";
                    retractTransferWorksheet({workSheetId}).then(res=>{
                        if(res.status!==200){
                            this.$Modal.error({
                                title: "工单移交撤回",
                                content: res.msg
                            });
                            return;
                        }
                        this.checkTransferModal = false;
                        this.$Modal.remove();
                        this.getWorkSheetInfo();
                    }).catch(res=>{
                        this.$Modal.error({
                            title: "工单移交撤回",
                            content: res.msg
                        });  
                        this.$Modal.remove();
                        this.checkTransferModal = false;
                    })
                }
            });
        },
        // 点击查看移交
        checkTransfer() {
            this.checkTransferModal = true;
            // this.getTransferWorksheetInfo();
        },
        // 是否领导
        getIsLeader() { 
            let params = {
                sixiId: this.$store.state.user.userInfo.sixiId || "",
                departmentId: this.info.executorUser.department || ""
            }
            getIsLeader(params).then(res=>{
                if(res.status == 200){
                    this.isLeader = res.data;
                }
            })
        },
        // 点击移交确认
        transfer() {
            this.transferModal.bool = true;
            // this.getTransferWorksheetInfo();
        },
        sureTransfer() {
            let params = {
                workSheetId: this.info.id || "",
                state: this.transferModal.state || 1,
                refuseReason: this.transferModal.state == 2 ? this.transferModal.refuseReason : ""
            }
            sureTransferWorksheet(params).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "工单移交确认",
                        content: res.msg
                    });
                    return;
                }
                this.getWorkSheetInfo();              
                this.transferModal.bool = false;
            })
            
        },
        // 获取移交信息
        getTransferWorksheetInfo(){
            let workSheetId = this.info.id || "";
            transferWorksheetInfo({workSheetId}).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "工单移交",
                        content: res.msg
                    });
                    return;  
                }
                this.transferInfo = res.data || {};
            })
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
            this.modal.superiorLeaderList = res.data || [];
        },
        subAssign() {
            let sixiId = "";
            if(this.modal.type == '1'){
                sixiId = this.modal.relateService
            } else if(this.modal.type == '2'){
                sixiId = this.modal.superiorLeaderSixiId
            } else if(this.modal.type == '3'){
                let arr = this.modal.customerIdList
                sixiId = arr[arr.length-1]
            } else {
                this.$Modal.error({
                    title: "人员移交",
                    content: "请选择指派人员类型"
                });
                return;
            }
            let params = {
                workSheetId: this.info.id,
                sixiId,
                remark: this.modal.remark
            };
            assignWorksheet(params).then(res => {
                console.log(res);
                if (res.status != 200) {
                    this.$Modal.error({
                        title: "人员移交",
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
            let companyName = route.query.companyName;
            this.$router.push({
                path: path,
                query: {
                    workSheetId,
                    companyName
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
                    message = "工单待评价";
                    break;
            }
            // 工单设为完结 页面刷新
            if (handleType == 3) {
                this.$Modal.confirm({
                    title: "工单完结",
                    content: "<p>" + "完结之后不可恢复，请谨慎操作" + "</p>",
                    onOk: () => {
                        setWorkSheetProcessingState({ ...params }).then(res=>{
                            if (res.status !== 200) {
                                this.$Modal.error({
                                    title: "工单状态修改",
                                    content: res.msg
                                });
                                return;
                            }
                            this.getWorkSheetInfo();
                            // 页面刷新
                            setTimeout(()=>{
                                history.go(0);
                            },2000)
                        })
                    },
                    onCancel: () => { }
                });
            // 其他情况页面不刷新
            } else {
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
            }
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
            this.getIsLeader()
            this.getTransferWorksheetInfo();
            if (res.data.handleType == 5) {
                this.stepsType(res.data, res.data.oldHandleType || 0);
            } else {
                this.stepsType(res.data, res.data.handleType);  
            }
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
        stepsType(data, handleType) {
            // let handleType = this.$store.state.workSheet.workSheetBaseInfo
            // 	.handleType;

            let type = 0;
            switch (handleType) {
                case 0:
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
                    title: "待受理",
                    component: formatTime(data.createAt, "YYYY-MM-DD HH:mm:ss")
                },
                {
                    title: "受理中",
                    component: formatTime(
                        data.confirmTime,
                        "YYYY-MM-DD HH:mm:ss"
                    )
                },
                {
                    title: "待评价",
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
        },
        // 提交加入案例库
        submitCase() {
            if(this.caseParams.selection.length == 0){
                this.$Modal.error({
                    title: "加入案例库",
                    content: "请选择需要加入的案例库"
                });
                return;
            }
            let caseLibraryList = [];
            this.caseParams.selection.forEach(item=>{
                caseLibraryList.push(item.id)
            })
            let params={
                workOrderId: this.info.id || "",
                caseLibraryList
            }
            joinWorkOrderCase(params).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "加入案例库",
                        content: res.msg
                    });
                    return;  
                }
                this.$Message.success(res.msg);
                this.caseParams.bool = false;
                this.caseParams.selection = [];
            }).catch(error => {
                this.$Modal.error({
                    title: "加入案例库",
                    content: error.msg
                });
            })
        },
        // 创建案例库
        createCase() {
            let caseName = this.addCase.caseName || "";
            if(!caseName){
                this.$Modal.error({
                    title: "创建案例库",
                    content: "请输入案例名称"
                });
                return;
            }
            createWorkOrderCase({caseName}).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "创建案例库",
                        content: res.msg
                    });
                    return;
                }
                this.addCase.bool = false;
                this.addCase.caseName = "";
                this.caseParams.pageNum = 1;
                this.getCaseList();
            }).catch(error => {
                this.$Modal.error({
                    title: "新增案例库",
                    content: error.msg
                });
            })
        },
        tableSelect(selection) {
            this.caseParams.selection = selection;
        },
        getCaseList() {
            let params = this.caseParams || { pageSize: 10, pageNum: 1 };
            getWorkOrderCaseListData(params).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "案例库列表",
                        content: res.msg
                    });
                    return;
                }
                this.caseParams.list = res.data.list || [];
                this.caseParams.count = res.data.count || 0;
            }).catch(error => {
                this.$Modal.error({
                    title: "案例库列表",
                    content: error.msg
                });
            })
        },
        joinCasebase() {
            this.caseParams.bool = true;
            this.getCaseList();
        },
        pageCurrentChange(pageNum) {
            this.caseParams.pageNum = pageNum;
            this.getCaseList();
        },
        pageSizeChange(pageSize) {
            this.caseParams.pageSize = pageSize;
            this.caseParams.pageNum = 1;
            this.getCaseList();
        }
    },
    data() {
        return {
            // 是否领导
            isLeader: false,
            checkTransferModal: false,
            //移交详情
            transferInfo: {},
            // 移交弹窗
            transferModal:{
                bool: false,
                state: 1,
                refuseReason: ""
            },
            current: 0,
            info: {},
            workSheetId: 0,
            sixiId: "",
            status: {
                list: []
            },
            addCase: {
                bool: false,
                caseName: ''
            },
            caseParams: {
                bool: false,
                selection: [],
                // list: [{id:1,name:"1"},{id:2,name:"2"},{id:3,name:"3"},{id:4,name:"4"}],
                list: [],
                columns: [
                    {
                       type: "selection",
                       width: 50
                    },
                    {
                        key: "name",
                        title: "案例名称"
                    }
                ],
                pageSize: 10,
                pageNum: 1,
                count: 0
            },
            // 移交弹窗信息
            modal: {
                bool: false,
                personList: [],
                index: "",
                type: "1",
                relateService: '',
                customerIdList: [],
                superiorLeaderSixiId: "",
                superiorLeaderList: [],
                remark: ""
            }
        };
    },
    created() {
        this.workSheetId = this.$route.query.workSheetId;
    },
    mounted() {
        this.getWorkSheetInfo();
        this.getSixiId();
        this.sixiId = this.$store.state.user.userInfo.sixiId;
    }
};
</script>
