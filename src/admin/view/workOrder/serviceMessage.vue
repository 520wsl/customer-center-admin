<template>
    <div>
        <Card class="md-card">
            <div slot="title">消息记录</div>
            <div class="btn-group flex">
                <div v-if="isHaveUserId && isExectorId" class="flex-left">
                    <Button
                            v-if="workOrderPhoneList && workOrderPhoneList.mobile"
                            @click="callPhoneModal()"
                            class="btn"
                            icon="ios-call"
                            type="success"
                            ghost
                    >拨号
                    </Button>
                    <Button
                            v-if="TalkNewsCountdownTimeFormat"
                            @click="confirm(2)"
                            class="btn"
                            icon="md-settings"
                            type="info"
                            ghost
                    >工单联系电话采集
                    </Button>
                    <Button
                            v-if="TalkNewsCountdownTimeFormat"
                            @click="confirm(3)"
                            class="btn"
                            icon="md-settings"
                            type="info"
                            ghost
                    >账号密码采集
                    </Button>
                </div>
                <div class="flex-right">
                    <Button
                            @click="restartPage()"
                            class="btn"
                            icon="md-refresh"
                            type="warning"
                            ghost
                    >刷新
                    </Button>
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
                            :disabled="TalkNewsCountdownTimeFormat.length <= 0"
                            v-model="replyParams.content"
                            type="textarea"
                            :autosize="{minRows: 5,maxRows: 30}"
                            :placeholder="replyMsg"
                            @on-enter="setWorkOrderCustomerServiceStaffReply()"
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
                            @click="setWorkOrderCustomerServiceStaffReply()"
                            class="btn"
                            type="success"
                            ghost
                    >回复
                    </Button>
                </div>
            </div>
        </Card>
        <message-list
                v-if="talkNewsList.length"
                :data="talkNewsList"
                :handleType="info.handleType"
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
        <Modal v-model="isShowCallPhoneModal" width="300" title="拨号">
            <Card class="md-card">
                <p>即将拨打客户电话号码，请确认</p>
                <RadioGroup v-model="remarkParams.mobile" vertical>
                    <Radio :label="workOrderPhoneList.mobile">
                        <Icon type="social-apple"></Icon>
                        <span>{{getEncryptionPhone(workOrderPhoneList.mobile)}}</span>
                        <span>(工单联系号码)</span>
                    </Radio>
                    <Radio
                            v-if="workOrderPhoneList.phone && workOrderPhoneList.mobile !== workOrderPhoneList.phone"
                            :label="workOrderPhoneList.phone"
                    >
                        <Icon type="social-android"></Icon>
                        <span>{{getEncryptionPhone(workOrderPhoneList.phone)}}</span>
                        <span>(客户预留号码)</span>
                    </Radio>
                </RadioGroup>
            </Card>
            <div slot="footer">
                <Button type="primary" @click="addItemTalkNews(1, '拨号')">确认</Button>
                <Button @click="closeCallPhoneModal">返回</Button>
            </div>
        </Modal>

        <Modal v-model="isShowCollectModal" width="600" :title="collect.title">
            <Card class="md-card">
                <h3>问候语：</h3>
                <textarea style="width:100%;" v-model="collect.content" rows="5"></textarea>
                <!-- <p v-html="collect.pagePath"></p> -->
                <p>{{collect.message}}</p>
            </Card>
            <div slot="footer">
                <Button type="primary" @click="setReplyParamsContent">确认</Button>
                <Button @click="closeCallPhoneModal">返回</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {getWorkSheetInfoData} from "@/api/admin/workSheet/workSheet";
    import {
        setWorkOrderCustomerServiceStaffReplyData,
        getWorkOrderPhoneListData
    } from "@/api/admin/workSheet/workOrder";
    import {
        addItemTalkNewsData,
        getTalkNewsListData,
        getTalkNewsCountdownTimeData,
        updateItemTalkNewsData
    } from "@/api/admin/workSheet/talkNews";
    import {callPhoneAction, AccountStatus} from "@/api/admin/callPhone/callPhone";
    import {mapState, mapMutations, mapActions} from "vuex";
    import {formatTime, formatAddTime} from "@/libs/util/time";
    import {
        getRelativeTime,
        getDateDiff,
        getIntervalTime,
        getEncryptionPhone,
        createToWeChatPagePage
    } from "@/libs/tools";
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
                let executorId = this.$store.state.workSheet.workSheetBaseInfo.executorId === this.sixiId;
                let ishandleType = this.info.handleType === 3 || this.info.handleType === 4;
                return executorId && !ishandleType;
            }
        },
        methods: {
            ...mapMutations(["setWorkSheetBaseInfo"]),
            ...mapActions(["getSixiId"]),
            getEncryptionPhone(phone) {
                return getEncryptionPhone(phone);
            },
            callPhoneModal() {
                this.getWorkSheetInfo();
                this.remarkParams.mobile = this.workOrderPhoneList.mobile;
                this.isShowCallPhoneModal = true;
            },
            closeCallPhoneModal() {
                this.remarkParams.mobile = "";
                this.isShowCallPhoneModal = false;
            },
            async getWorkOrderPhoneList(workSheetId, companySixiId) {
                console.log(workSheetId, companySixiId);
                let res = await getWorkOrderPhoneListData({
                    workSheetId,
                    companySixiId
                });
                if (res.status !== 200) {
                    this.$Modal.error({
                        title: "获取手机号列表",
                        content: res.msg
                    });
                    return;
                }
                this.workOrderPhoneList = res.data;
            },
            getTalkNewsCountdownTimeFormat() {
                this.getTalkNewsCountdownTimeStr();
                // 防止影响  性能，  偷偷注释掉  不要告诉产品
                // setInterval(() => {
                //     this.getTalkNewsCountdownTimeStr();
                // }, 120000);
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
                this.replyMsg = "请填写回复信息。。。";
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
            restartPage() {
                location.reload();
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
            async setWorkOrderCustomerServiceStaffReply(msg) {
                let params = {...this.replyParams};
                params.customerSixiId = this.info.userId;
                params.workSheetId = this.params.workSheetId;
                params.content = msg || params.content;
                if (!params.content) {
                    this.$Modal.error({
                        title: "客服回复",
                        content: "请填写回复信息。。。"
                    });
                    return;
                }
                if (params.content.length > 800) {
                    this.$Modal.error({
                        title: "客服回复",
                        content: "回复信息过长，不能超过800个字符"
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

                // this.$Modal.success({
                //     title: "客服回复",
                //     content: "回复成功"
                // });
                this.replyParams.content = "";
                this.remarkParams.customerSixiId = "";
                this.getTalkNewsList();
            },
            // 更新对话记录
            async updateItemTalkNews() {
                clearInterval(this.setIntervalFunction);
                let params = {...this.remarkParams};
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
                let params = {...this.params};
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
                this.getWorkOrderPhoneList(res.data.id, res.data.companyId);
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
                let mobile = this.remarkParams.mobile || "";
                if (eventType == 1 && !mobile) {
                    setTimeout(() => {
                        this.$Modal.error({
                            title: title,
                            content: "请设置客户手机号"
                        });
                    }, 1000);
                    return;
                }
                let res = await addItemTalkNewsData({...params});
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
                    this.isShowCallPhoneModal = false;
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
                let url = "";
                let title = "";
                let message = "";
                let content = "";
                let pagePath = "";
                let wechatNickname =
                    (this.info.customerDetailVo &&
                        this.info.customerDetailVo.callName) ||
                    (this.info.customerDetailVo &&
                        this.info.customerDetailVo.wechatNickname) ||
                    "";
                switch (eventType) {
                    case 1:
                        title = "拨号";
                        message = "即将拨打客户电话号码，请确认";
                        return;
                    case 2:
                        title = "工单联系电话采集";
                        url = createToWeChatPagePage(
                            "pageName=billGetPhone&workSheetId=" +
                            this.params.workSheetId
                        );
                        content = "请修改工单联系电话！";
                        message = "即向客户发送电话号码采集通知，请确认";
                        pagePath =
                            "\n\n点击<a target='_blank' href='" +
                            url +
                            "'>点击修改>></a> \n\n原联系电话：" +
                            this.getEncryptionPhone(this.workOrderPhoneList.mobile);
                        this.isShowCollectModal = true;
                        this.collect.title = title;
                        this.collect.message = message;
                        this.collect.content = content;
                        this.collect.pagePath = pagePath;
                        break;
                    case 3:
                        title = "账号密码采集";
                        url = createToWeChatPagePage(
                            "pageName=passwordStore&companySixiId=" +
                            this.info.companyId +
                            "&workSheetId=" +
                            this.params.workSheetId
                        );
                        content =
                            "【 " +
                            wechatNickname +
                            " 】您好，为了更好的为您提供服务请提交，您店铺的账号密码；\n注意：请不要将账号密码直接回复在聊天窗口";
                        message = "即将发送客户采集账号密码通知，请确认";
                        pagePath =
                            "\n\n点击<a target='_blank' href='" +
                            url +
                            "'>提交阿里店铺账号密码>></a>";
                        this.isShowCollectModal = true;
                        this.collect.title = title;
                        this.collect.message = message;
                        this.collect.content = content;
                        this.collect.pagePath = pagePath;
                        break;
                }
            },
            setReplyParamsContent() {
                let content = this.collect.content || "";
                let pagePath = this.collect.pagePath || "";
                let msg = content + pagePath;

                this.isShowCollectModal = false;
                this.collect.title = "";
                this.collect.message = "";
                this.collect.content = "";
                this.collect.pagePath = "";
                this.setWorkOrderCustomerServiceStaffReply(msg);
            },
            async callPhone(phone, recordId) {
                let params = {
                    phone,
                    recordId
                };
                let isShow = true;
                let isPading = true;
                setTimeout(() => {
                    if (isShow) {
                        this.$Modal.error({
                            title: "环境检测：",
                            content:
                                "拨号软件：<br>1、请检查呼叫软件是否打开正常! <br> 2、请检查设备是否安装正常！<br>3、隐私设置有误，请联系管理员！"
                        });
                    }
                }, 2000);

                try {

                    let resual = await AccountStatus();
                    console.log('环境检测', resual)
                    if (resual.status === 1) {
                        let status = resual.Info.status.split('|')
                        if (status[4] !== "1") {
                            return;
                        }
                        isShow = false;

                        setTimeout(() => {
                            if (isPading) {
                                this.$Modal.error({
                                    title: "拨号异常：",
                                    content:
                                        "拨号软件：<br>1、请检查呼叫软件是否打开正常! <br> 2、请检查设备是否安装正常！<br>"
                                });
                            }
                        }, 2000);

                        let res = await callPhoneAction({...params});
                        console.log("拨号：", res);
                        if (res.status === 1) {
                            this.editRemarkModal(recordId);
                            isPading = false;
                        }
                    }
                } catch (error) {
                    this.$Modal.error({
                        title: "拨号异常：",
                        content:
                            "1、请检查呼叫软件是否打开正常! <br> 2、请检查设备是否安装正常！"
                    });
                    isPading = false;
                }
            }
        },
        data() {
            return {
                replyMsg: "客户未主动发起对话之前无法进行回复哦!",
                workOrderPhoneList: {
                    mobile: "",
                    phone: ""
                },
                collect: {
                    title: "",
                    message: "",
                    content: "",
                    pagePath: ""
                },
                sixiId: "",
                isShowCollectModal: false,
                setIntervalFunction: "",
                isShowRemarkModal: false,
                isShowCallPhoneModal: false,
                TalkNewsCountdownTimeFormat: "",
                countDownTime: "",
                talkTime: "",
                creationTime: "",
                remarkParams: {
                    mobile: "",
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
            this.sixiId = this.$store.state.user.userInfo.sixiId;
            this.sixiId = this.$store.state.user.sixiId;
        }
    };
</script>