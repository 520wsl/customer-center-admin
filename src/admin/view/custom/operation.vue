<template>
    <div>
        <!-- <Poptip confirm placement="bottom-end" title="解绑不可撤销，请谨慎操作！是否确认解绑？" @on-ok="cancelBind()">
      <Button type="primary" size="small" class="mar-l" ghost>解绑</Button>
    </Poptip> -->
        <Button type="primary" size="small" class="mar-l" v-if="isXuKai" @click="modal = true" ghost>编辑联系人</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isXuKai && row.customerSixiId" @click="delContacts()" ghost>解绑微信</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isShow" @click="getMobilePhone()" ghost>采集电话</Button>
        <Button type="primary" size="small" class="mar-l" v-if="isShow" @click="getAccountPassword()" ghost>采集账号密码</Button>
        <Button type="primary" size="small" class="mar-l" v-if="row.customerSixiId" @click="sendCase" ghost>发送案例</Button>
        <!-- <Button type="primary" size="small" class="mar-l" @click="getStartWorkorder()" ghost>发起工单</Button> -->
        <!-- <Button type="primary" size="small" class="mar-l" v-if="!row.wechatNickname" @click="bindAccount()" ghost>绑定微信</Button> -->
        <Modal v-model="modal" @on-ok="edit()" :loading="loading" :mask-closable="false" title="编辑">
            <Card class="md-card">
                <table class="tab">
                    <tbody>
                        <tr>
                            <td class="title">微信昵称:</td>
                            <td>
                                <img v-if="row.wechatAvatar" :src="row.wechatAvatar" class="acatar" alt="404">&emsp;{{row.wechatNickname}}
                            </td>
                        </tr>
                        <tr>
                            <td class="title">绑定时间:</td>
                            <td>{{ getTime(row.bindTime)}}</td>
                        </tr>
                        <tr>
                            <td class="title">称呼:</td>
                            <td>
                                <Input class="wid" v-model="callName"><span></span></Input>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">性别:</td>
                            <td>

                                <RadioGroup v-model="sex">
                                    <Radio :label="1">{{getSexValue(1)}}</Radio>
                                    <Radio :label="2">{{getSexValue(2)}}</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">角色:</td>
                            <td>
                                <Select class="wid" v-model="role">
                                    <Option :value="1">老板</Option>
                                    <Option :value="2">老板娘</Option>
                                    <Option :value="3">经理</Option>
                                    <Option :value="4">业务员</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">手机号:</td>
                            <td>
                                <Input class="wid" v-model="phoneNumber"><span></span></Input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Modal>
        <Modal v-model="caseModal.bool" :mask-closable="false" title="发送案例" footer-hide width="700" @on-cancel="caseModalRest">
            <Card class="md-card" v-if="caseModal.step == 1">
                <RadioGroup v-model="caseModal.chooseCase" @on-change="change" style="width:100%;">
                    <Table :columns="caseModal.caseColumns" :data="caseModal.caseData"></Table>
                </RadioGroup>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="nextStep">下一步</Button>
                </div>
            </Card>
            <Card class="md-card" v-if="caseModal.step == 2">
                <div class="casebase-info">
                    <div class="casebase-item">
                        <span>案例名称：<span style="font-weight:normal;">{{caseModal.caseitem.name||''}}</span></span>
                    </div>
                    <div class="casebase-item">
                        <span>设置有效期：</span>
                        <InputNumber :min="0" :step="1" :precision="0" v-model="caseModal.hour"></InputNumber>小时
                        <InputNumber :max="59" :min="0" :step="1" :precision="0" v-model="caseModal.minute"></InputNumber>分钟
                    </div>
                    <div class="casebase-tip">
                        有效期过后链接便会失效，如需要可以重新发送案例
                    </div>
                </div>
                <div class="modal-btn">
                    <Button class="btn" type="primary" @click="sureSentCase">确认</Button>
                    <Button class="btn" type="default" @click="caseModal.step = 1">返回</Button>
                </div>
            </Card>
        </Modal>
    </div>
</template>
<script>
import { setWechatUntied, updateBindInfo } from "@/api/admin/custom/custom";
import { getWorkOrderSendCaseList, senWorkOrderdCase, sotpVisitCase } from "@/api/admin/case/case"
// import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
import { addItemTalkNewsData } from "@/api/admin/workSheet/talkNews";
import { getSexValue } from "@/libs/util";
import { formatTime } from "@/libs/util/time";
import "./index.less";
export default {
    props: ["row", "companySixiId", "isXuKai", "isShow"],
    data() {
        return {
            modal: false,
            loading: true,
            sex: 0,
            // 客户角色: 0:未知;1:老板;2:老板娘;3:经理;4:业务员;
            role: 1,
            phoneNumber: "",
            callName: "",
            caseModal: {
                bool: false,
                step: 1,
                chooseCase: '',
                item: {},
                hour: 0,
                minute: 0,
                caseColumns: [
                    {
                        title: "选择",
                        render: (h, params) => {
                            return h("Radio",
                                { props: { label: params.row.id+"" } },
                                params.row.name)
                        }
                    },
                    {
                        title: '权限操作',
                        align: "center",
                        width: 180,
                        render: (h, params) => {
                            // 有访问权限 显示按钮停止访问
                            if (params.row.accesssType) {
                                return h("span",
                                    {  
                                        attrs:{
                                            style:"color: rgb(45, 140, 240);cursor: pointer;"
                                        },
                                        on:{
                                            click:()=> {
                                                this.stopAccess(params.row.id);
                                            }
                                        }
                                    },
                                    "停止访问")
                            } else {
                                return h("span",{},"/")
                            }
                        }
                    }
                ],
                caseData: []
                }
            
        };
    },
    computed:{
        operator:function() {
            return this.$store.state.user.userInfo.sixiId;
        }
    },
    components:{ },
    created() {
        // 赋值
        this.sex = this.row.sex;
        this.role = this.row.role;
        this.phoneNumber = this.row.mobile;
        this.callName = this.row.callName;
    },
    methods: {
        // 切换发送的案例
        change(){
            this.caseModal.caseData.forEach(item=>{
                if(item.id == this.caseModal.chooseCase){
                    this.caseModal.caseitem = JSON.parse(JSON.stringify(item));
                }
            })
        },
        // 点击下一步
        nextStep() {
            if(this.caseModal.chooseCase){
                this.caseModal.step = 2;
            } else {
                this.$Modal.error({
                    title: "发送案例",
                    content: "请选择案例"
                });
            }
        },
        caseModalRest(){
            this.caseModal.bool = false;
            this.caseModal.step = 1;
            this.caseModal.chooseCase = '';
            this.caseModal.item = {};
            this.caseModal.hour = 0;
            this.caseModal.minute = 0;
        },
        // 发送案例给客户
        sureSentCase() {
            if(this.caseModal.hour == 0 && this.caseModal.minute ==0){
                this.$Modal.error({
                    title: "发送案例",
                    content: "请输入案例有效期"
                });
                return;
            }
            let params = {
                id: this.caseModal.caseitem.id,
                hour: this.caseModal.hour,
                minute: this.caseModal.minute,
                customerSixiId: this.row.customerSixiId
            }
            senWorkOrderdCase(params).then(res=>{
                if(res.status != 200){
                    this.$Modal.error({
                        title: "发送案例",
                        content: res.msg
                    });
                    return;
                }
                this.caseModalRest();
                this.$Message.success("发送成功");
            })
        },
        getSexValue(type) {
            return getSexValue(type);
        },
        // 设置用户停止访问
        stopAccess(id) {
            console.log(id)
            this.$Modal.confirm({
				title: "停止访问",
				content: "<p>" + "确认停止该用户访问该案例库？" + "</p>",
				onOk: () => {
					let params = {
                        caseLibraryId: id,
                        customerSixiId: this.row.customerSixiId
					};
					sotpVisitCase(params).then(res=>{
                        if(res.status != 200){
                            this.$Modal.error({ title: "提示", content: res.msg });
                            return;
                        }
                        this.sendCase()
                    });
				},
				onCancel: () => {}
			});
        },
        // 点击发送案例按钮 获取案例列表
        sendCase() {
            this.caseModal.bool = true;
            let customerSixiId = this.row.customerSixiId;
            getWorkOrderSendCaseList({ customerSixiId }).then( res => {
                if(res.status !==200 ){
                    this.$Modal.error({ title: "提示", content: res.msg });
                    return;
                }
                let caseLibraryVoList = res.data.caseLibraryVoList || [];
                let shareEffectiveListVoList = res.data.shareEffectiveListVoList || [];
                // 有访问权限的项含有accesssType为true
                shareEffectiveListVoList.forEach(item1=>{
                    caseLibraryVoList.forEach(item2=>{
                        if(item2.id == item1.caseLibraryId){
                            item2.accesssType = true;
                        }
                    })
                })
                this.caseModal.caseData = caseLibraryVoList || [];
            })
        },
        // 微信解绑
        cancelBind() {
            let id = this.row.id;
            setWechatUntied({ id }).then(res => {
                if (res.status !== 200) {
                    this.$Modal.error({ title: "提示", content: res.msg });
                    return;
                }
                this.$emit("callFun");
            });
        },
        bindAccount() {
            this.$emit("bindAccount", { customerSixiId: this.row.customerSixiId });
        },
        // 编辑联系人
        edit() {
            let params = {
                sex: this.sex,
                customerSixiId: this.row.customerSixiId,
                callName: this.callName,
                mobile: this.phoneNumber,
                role: this.role,
                id: this.row.id || '',
                deletedAt: "",
                operator: this.operator,
                companySixiId: this.companySixiId
            };
            updateBindInfo(params).then(
                res => {
                    if (res.status !== 200) {
                        this.$Modal.error({
                            title: "提示",
                            content: res.msg
                        });
                        return;
                    }
                    this.loading = false;
                    this.modal = false;
                    this.$emit("callFun");
                },
                error => {
                    this.loading = false;
                    this.modal = false;
                }
            );
        },
        // 删除联系人
        delContacts() {
            this.$Modal.confirm({
                title: "删除联系人",
                content: "<p>" + "删除之后不可恢复，请谨慎操作" + "</p>",
                onOk: () => {
                    // let params = {
                    //     sex: this.row.sex || "",
                    //     customerSixiId: this.row.customerSixiId || "",
                    //     callName: this.row.callName || "",
                    //     mobile: this.row.mobile || "",
                    //     role: this.row.role || "",
                    //     id: this.row.id || "",
                    //     deletedAt: (new Date()).getTime(),
                    //     operator: this.operator,
                    //     companySixiId: this.companySixiId || ""
                    // };
                    // console.log(params)
                    // updateBindInfo(params).then(res => {
                    //     if (res.status !== 200) {
                    //         this.$Modal.error({
                    //             title: "提示",
                    //             content: res.msg
                    //         });
                    //         return;
                    //     }
                    //     this.$emit("callFun");
                    // },
                    // error => { });
                    this.cancelBind();
                },
                onCancel: () => { }
            });
        },
        // 发起工单
        // getStartWorkorder() {
        //     this.$Modal.confirm({
        //         title: "发起工单",
        //         content: "<p>" + "即将发起工单通知，请确认" + "</p>",
        //         onOk: () => {
        //             console.log(123)
        //         },
        //         onCancel: () => { }
        //     });
        // },
        // 采集手机
        getMobilePhone() {
            this.$Modal.confirm({
                title: "电话号码采集",
                content: "<p>" + "即将发送客户采集电话号码通知，请确认" + "</p>",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 2,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.companySixiId
                    }).then(res => {
                        if (res.status !== 200) {
                            this.$Modal.error({
                                title: "提示",
                                content: res.msg
                            });
                            return;
                        }
                        this.$emit("callFun");
                    });
                },
                onCancel: () => { }
            });
        },
        // 采集账号密码
        getAccountPassword() {
            this.$Modal.confirm({
                title: "账号密码采集",
                content: "<p>" + "即将发送客户采集账号密码通知，请确认" + "</p>",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 3,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.companySixiId
                    }).then(res => {
                        if (res.status !== 200) {
                            this.$Modal.error({
                                title: "提示",
                                content: res.msg
                            });
                            return;
                        }
                        this.$emit("callFun");
                    });
                },
                onCancel: () => { }
            });
        },
        getTime(val) {
            return formatTime(val, "YYYY-MM-DD H:mm:ss");
        }
    }
};
</script>
<style lang="less" scoped>
.mar-l {
  margin-left: 10px !important;
  margin: 5px 0;
}
.wid {
  width: 150px;
}
.tab .title {
  width: 100px;
}

.md-card .tab td {
  border-bottom: 0;
}
.md-card .tab tr:nth-last-child(1) td {
  border-bottom: 1px solid #e8eaec;
}
.acatar {
  width: 40px;
  // 表格居中
  vertical-align: middle;
}
.casebase-info .casebase-item{
  margin: 20px 0 0;
  font-size: 16px;
  span{
    font-size: 20px;
    font-weight: bold;
  }
}
.casebase-tip{
    margin-top: 20px;
    color: #999;
}
</style>

