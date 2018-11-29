<template>
    <div>
        <Card class="md-card">
            <div slot="title">消息记录</div>
            <div class="btn-group flex">
                <div v-if="isHaveUserId && isExectorId" class="flex-left">
                    <Button
                        v-if="info.customerDetailVo.mobile"
                        @click="confirm(1)"
                        class="btn"
                        icon="ios-call"
                        type="success"
                        ghost
                    >拨号</Button>
                    <Button
                        v-if="TalkNewsCountdownTimeFormat"
                        @click="confirm(2)"
                        class="btn"
                        icon="md-settings"
                        type="info"
                        ghost
                    >电话号码采集</Button>
                    <Button
                        v-if="TalkNewsCountdownTimeFormat"
                        @click="confirm(3)"
                        class="btn"
                        icon="md-settings"
                        type="info"
                        ghost
                    >账号密码采集</Button>
                </div>
                <div class="flex-right">
                    <Button
                        @click="sleectTalkNewsList(1)"
                        class="btn"
                        icon="md-refresh"
                        type="warning"
                        ghost
                    >刷新</Button>
                </div>
            </div>
        </Card>
        <Modal
            v-model="isShowRemarkModal"
            width="900"
            :closable="false"
            :mask-closable="false"
            title="呼叫"
        >
            <Card class="md-card">
                <div>通话开始时间：{{creationTime}}</div>
                <div>通话持续时间： {{talkTime}}</div>
                <div>通话摘要：</div>
                <div>
                    <textarea v-model="remarkParams.remark" id="remarkModal" cols="115" rows="10"></textarea>
                </div>
            </Card>
            <div slot="footer">
                <Button type="primary" @click="updateItemTalkNews">提交</Button>
            </div>
        </Modal>
        <Card class="md-card message" v-if="isHaveUserId && isExectorId">
            <Form>
                <FormItem label>
                    <Input
                        v-model="replyParams.content"
                        type="textarea"
                        :autosize="{minRows: 5,maxRows: 30}"
                        placeholder="请填写回复信息。。。"
                    >
                        <span></span>
                    </Input>
                </FormItem>
            </Form>
            <div class="btn-group flex message-bottom">
                <div class="flex-left flex" style="display:none;">
                    <div class="flex-left flex message-group">
                        <!-- 图片 -->
                        <template>
                            <div class="flex-left item img pic">
                                <a class="link" target="_blank" href="javascript:;">
                                    <img :src="$CDN('/default_audio.png')">
                                </a>
                            </div>
                        </template>
                        <!-- 音乐 -->
                        <template>
                            <div class="flex-left item img pic">
                                <a class="link" href="javascript:;">
                                    <img :src="$CDN('/default_audio.png')">
                                </a>
                            </div>
                        </template>
                        <!-- 视频 -->
                        <template>
                            <div class="flex-left item img pic">
                                <a class="link" href="javascript:;">
                                    <img :src="$CDN('/default_video.png')">
                                </a>
                            </div>
                        </template>
                    </div>
                    <div class="flex-left btn" style="padding-top:6px;">
                        <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                            <Button class="btn" type="primary" ghost icon="ios-cloud-upload">上传附件</Button>
                        </Upload>
                    </div>
                </div>
                <div v-if="TalkNewsCountdownTimeFormat" class="flex-right move-down">
                    <span
                        v-if="TalkNewsCountdownTimeFormat"
                        style="margin-right:30px;"
                    >倒计时: {{TalkNewsCountdownTimeFormat}} 失效</span>
                    <Button
                        @click="setWorkOrderCustomerServiceStaffReply"
                        class="btn"
                        type="success"
                        ghost
                    >回复</Button>
                </div>
            </div>
        </Card>
        <message-list
            v-if="talkNewsList.length"
            :data="talkNewsList"
            @updateItemTalkNews="getTalkNewsList"
        ></message-list>
        <Card v-if="talkNewsList.length" class="md-card">
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
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
import { setWorkOrderCustomerServiceStaffReplyData } from "@/api/admin/workSheet/workOrder";
import {
    addItemTalkNewsData,
    getTalkNewsListData,
    getTalkNewsCountdownTimeData,
    updateItemTalkNewsData
} from "@/api/admin/workSheet/talkNews";
import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
import { mapState, mapMutations, mapActions } from "vuex";
import { formatTime, formatAddTime } from "@/libs/util/time";
import { getRelativeTime, getDateDiff, getIntervalTime } from "@/libs/tools";
import messageList from "_c/admin/message-list";
import Page from "_c/admin/page";
export default {
    components: {
        messageList,
        Page
    },
    computed: {
        isHaveUserId() {
            if (this.info.userId) {
                return true;
            }
            return false;
        },
        isExectorId() {
            let executorId = this.$store.state.workSheet.workSheetBaseInfo
                .executorId;
            return executorId == this.sixiId;
        }
    },
    methods: {
        ...mapMutations(["setWorkSheetBaseInfo"]),
        ...mapActions(["getSixiId"]),
        getTalkNewsCountdownTimeFormat() {
            this.getTalkNewsCountdownTimeStr();
            setInterval(() => {
                this.getTalkNewsCountdownTimeStr();
            }, 120000);
        },
        getTalkNewsCountdownTimeStr() {
            let endTime = formatAddTime(this.countDownTime, "x");
            let startTime = formatTime(new Date(), "x");
            console.log(
                "[debug]: 当前时间",
                formatTime(new Date(), "YYYY-MM-DD HH:mm:ss")
            );
            console.log(
                "[debug]: 过期时间",
                formatAddTime(this.countDownTime, "YYYY-MM-DD HH:mm:ss")
            );
            if (!this.countDownTime || endTime < startTime) {
                return "";
            }
            let res = getRelativeTime(endTime);
            this.TalkNewsCountdownTimeFormat = res;
        },
        async getTalkNewsCountdownTime() {
            let res = await getTalkNewsCountdownTimeData({
                workSheetId: this.params.workSheetId
            });
            if (res.status !== 200) {
                this.$Modal.error({
                    title: "客服回复倒计时",
                    content: res.msg
                });
                return;
            }
            this.countDownTime = res.data.countDownTime || "";
            this.getTalkNewsCountdownTimeFormat();
        },
        // 查询数据 分页页码重置
        sleectTalkNewsList(pageNum) {
            this.params.pageNum = pageNum;
            this.getTalkNewsList();
        },
        // 设置分页页码
        pageCurrentChange(pageNum) {
            this.sleectTalkNewsList(pageNum);
        },
        // 设置分页大小
        pageSizeChange(pageSize) {
            this.params.pageSize = pageSize;
            this.sleectTalkNewsList(1);
        },
        async setWorkOrderCustomerServiceStaffReply() {
            let params = { ...this.replyParams };
            params.customerSixiId = this.info.userId;
            params.workSheetId = this.params.workSheetId;

            if (!params.content) {
                this.$Modal.error({
                    title: "客服回复",
                    content: "请填写回复信息。。。"
                });
                return;
            }
            let res = await setWorkOrderCustomerServiceStaffReplyData(params);
            if (res.status !== 200) {
                this.$Modal.error({
                    title: "客服回复",
                    content: res.msg
                });
                return;
            }

            this.$Modal.success({
                title: "客服回复",
                content: "回复成功"
            });
            this.replyParams.content = "";
            this.remarkParams.customerSixiId = "";
            this.getTalkNewsList();
        },
        // 更新对话记录
        async updateItemTalkNews() {
            clearInterval(this.setIntervalFunction);
            let params = { ...this.remarkParams };
            params.workOrderId = this.params.workOrderId;
            params.identifier = this.params.identifier;
            let res = await updateItemTalkNewsData(params);
            if (res.status !== 200) {
                setTimeout(() => {
                    this.$Modal.error({
                        title: "通话摘要",
                        content: res.msg
                    });
                }, 1000);
                this.isShowRemarkModal = false;
                return;
            }
            setTimeout(() => {
                this.$Modal.success({
                    title: "通话摘要",
                    content: "添加成功"
                });
            }, 1000);
            this.isShowRemarkModal = false;
            this.sleectTalkNewsList(1);
        },
        editRemarkModal(recordId) {
            this.isShowRemarkModal = true;
            this.remarkParams.id = recordId;
            this.creationTime = formatTime(new Date(), "YYYY-MM-DD HH:mm:ss");
            this.setIntervalFunction = setInterval(() => {
                this.getTalkTime();
            }, 1000);
        },
        getTalkTime() {
            let startTime = this.creationTime;
            let endTime = formatTime(new Date(), "YYYY-MM-DD HH:mm:ss");
            console.log(
                "[debug]: 当前时间",
                formatTime(new Date(), "YYYY-MM-DD HH:mm:ss")
            );
            console.log("[debug]: 过期时间", endTime);
            this.talkTime = getIntervalTime(startTime, endTime);
        },
        async getTalkNewsList() {
            let params = { ...this.params };
            let res = await getTalkNewsListData(params);
            if (res.status !== 200) {
                this.$Modal.error({
                    title: "消息记录",
                    content: res.msg
                });
                return;
            }
            this.talkNewsList = res.data.list;
            this.params.count = res.data.count;
            console.log("this.info.userId", this.info.userId);
            if (this.info.userId) {
                this.getTalkNewsCountdownTime();
            }
        },
        async getWorkSheetInfo() {
            let res = await getWorkSheetInfoData({
                workSheetId: this.params.workSheetId
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
            console.log(this.info);
            this.getTalkNewsList();
        },
        // 创建对话记录
        // eventType 事件类型 1：电话沟通 2：发起电话采集请求 3：发起账号密码采集请求
        async addItemTalkNews(eventType, title) {
            let params = {
                workOrderStatus: this.info.handleType,
                userSixiId: this.info.userId,
                workSheetId: this.info.id,
                eventType
            };
            let mobile =
                (this.info &&
                    this.info.customerDetailVo &&
                    this.info.customerDetailVo.mobile) ||
                "";
            if (eventType == 1 && !mobile) {
                setTimeout(() => {
                    this.$Modal.error({
                        title: title,
                        content: "请设置客户手机号"
                    });
                }, 1000);
                return;
            }
            let res = await addItemTalkNewsData({ ...params });
            if (res.status !== 200) {
                setTimeout(() => {
                    this.$Modal.error({
                        title: title,
                        content: res.msg
                    });
                }, 1000);
                return;
            }
            if (eventType == 1) {
                this.callPhone(mobile, res.data.id);
            } else {
                setTimeout(() => {
                    this.$Modal.success({
                        title: title,
                        content: "发送成功"
                    });
                }, 1000);
            }
        },
        confirm(eventType) {
            let title = "";
            let message = "";
            let content = "";
            let wechatNickname =
                (this.info.customerDetailVo &&
                    this.info.customerDetailVo.wechatNickname) ||
                "";
            switch (eventType) {
                case 1:
                    title = "拨号";
                    message = "即将拨打客户电话号码，请确认";
                    break;
                case 2:
                    title = "电话号码采集";
                    message = "即将发送客户采集电话号码通知，请确认";
                    content =
                        "【 " +
                        wechatNickname +
                        " 】您好，为了更好的为您提供服务，客服人员能够与您电话沟通，请绑定您的手机号。\n\n点击<a target='_blank' href='http://workapp.sixi.com/serviceBill/getphone'>绑定手机号>></a>";
                    this.setReplyParamsContent(content);
                    return;
                case 3:
                    title = "账号密码采集";
                    message = "即将发送客户采集账号密码通知，请确认";
                    content =
                        "【 " +
                        wechatNickname +
                        " 】您好，为了更好的为您提供服务请提交，您店铺的账号密码；\n注意：请不要将账号密码直接回复在聊天窗口 \n\n点击<a target='_blank' href='http://workapp.sixi.com/serviceBill/getphone'>提交阿里店铺账号密码>></a>";
                    this.setReplyParamsContent(content);
                    return;
            }

            this.$Modal.confirm({
                title: title,
                content: "<p>" + message + "</p>",
                onOk: () => {
                    this.addItemTalkNews(eventType, title);
                },
                onCancel: () => {}
            });
        },
        setReplyParamsContent(content) {
            this.replyParams.content = content;
        },
        async callPhone(phone, recordId) {
            let params = {
                phone,
                recordId
            };
            let res = await callPhoneAction({ ...params });
            if (res.status == 1) {
                this.editRemarkModal(recordId);
            }
            console.log("拨号：", res);
        }
    },
    data() {
        return {
            sixiId: "",
            setIntervalFunction: "",
            isShowRemarkModal: false,
            TalkNewsCountdownTimeFormat: "",
            countDownTime: "",
            talkTime: "",
            creationTime: "",
            remarkParams: {
                id: 0,
                workOrderId: 0,
                identifier: "",
                record: "",
                remark: ""
            },
            replyParams: {
                content: "",
                customerSixiId: "",
                resourceType: 1
            },
            params: {
                workSheetId: 0,
                pageNum: 1,
                pageSize: 10,
                count: 0
            },
            talkNewsList: [],
            info: {}
        };
    },
    created() {
        this.params.workSheetId = this.$route.query.workSheetId;
    },
    mounted() {
        this.getWorkSheetInfo();
        this.getSixiId();
        this.sixiId = this.$store.state.user.sixiId;
    }
};
</script>