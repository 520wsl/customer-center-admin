<template>
    <div>
        <!-- <Poptip confirm placement="bottom-end" title="解绑不可撤销，请谨慎操作！是否确认解绑？" @on-ok="cancelBind()">
            <Button type="primary" size="small" class="mar-l" ghost>解绑</Button>
        </Poptip>-->
        <!-- <Button type="primary" size="small" class="mar-l" @click="modal = true" ghost>编辑</Button> -->
        <Button type="primary" size="small" class="mar-l" @click="getMobilePhone()" ghost>采集电话</Button>
        <Button type="primary" size="small" class="mar-l" @click="getAccountPassword()" ghost>采集账号密码</Button>
        <Button type="primary" size="small" class="mar-l" @click="bindAccount()" ghost>绑定微信</Button>
        <!-- <Modal v-model="modal" @on-ok="edit()" :loading="loading" :mask-closable="false" title="编辑">
            <Card class="md-card">
                <table class="tab">
                    <tbody>
                        <tr>
                            <td class="title">微信昵称:</td>
                            <td>
                                <img :src="row.wechatAvatar" class="acatar" alt="404">&emsp;{{row.wechatNickname}}
                            </td>
                        </tr>
                        <tr>
                            <td class="title">绑定时间:</td>
                            <td>{{ getTime(row.bindTime)}}</td>
                        </tr>
                        <tr>
                            <td class="title">称呼:</td>
                            <td>
                                <Input class="wid" v-model="callName"></Input>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">性别:</td>
                            <td>
                                <RadioGroup v-model="sex">
                                    <Radio :label="0">先生</Radio>
                                    <Radio :label="1">女士</Radio>
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
                                <Input class="wid" v-model="phoneNumber" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Modal>-->
    </div>
</template>
<script>
import { setWechatUntied, updateBindInfo } from "@/api/admin/custom/custom";
// import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
import { addItemTalkNewsData } from "@/api/admin/workSheet/talkNews";

import { formatTime } from "@/libs/util/time";
import "./index.less";
export default {
    props: ["row", "companySixiId"],
    data() {
        return {
            modal: false,
            loading: true,
            sex: 0,
            // 客户角色: 0:未知;1:老板;2:老板娘;3:经理;4:业务员;
            role: 1,
            phoneNumber: "",
            callName: ""
        };
    },
    created() {
        // 赋值
        this.sex = this.row.sex;
        this.role = this.row.role;
        this.phoneNumber = this.row.mobile;
        this.callName = this.row.callName;
    },
    methods: {
        cancelBind() {
            // 当前暂无openid
            let companySixiId = this.companySixiId;
            let customerSixiId = this.row.customerSixiId;
            setWechatUntied({ companySixiId, customerSixiId }).then(res => {
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
        edit() {
            let sex, sixiId, callName, mobile, role;
            let params = {
                sex: this.sex,
                sixiId: this.row.customerSixiId,
                callName: this.callName,
                mobile: this.phoneNumber,
                role: this.role
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
        // 采集手机
        getMobilePhone() {
            this.$Modal.confirm({
                title: "电话号码采集",
                content:
                    "<p>" + "即将发送客户采集电话号码通知，请确认" + "</p>",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 2,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.row.sixiId
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
                onCancel: () => {}
            });
        },
        // 采集账号密码
        getAccountPassword() {
            this.$Modal.confirm({
                title: "账号密码采集",
                content: "<p>" + "即将发送客户采集账号密码通知，请确认",
                onOk: () => {
                    addItemTalkNewsData({
                        eventType: 3,
                        userSixiId: this.row.customerSixiId,
                        companySixiId: this.row.sixiId
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
                onCancel: () => {}
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
</style>

