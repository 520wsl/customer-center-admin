<template>
    <div>
        <myaudio :src="audioModelPath" v-model="isShowAudioModel"></myaudio>

        <myvideo :videoParams="videoParams" v-model="isShowVideoModel"></myvideo>

        <template v-for="item in data">

            <div :key="'message_'+item.id">

                <Card v-if="item.eventType !== 5" class="md-card message">
                    <div class="flex message-bottom">
                        <div class="flex-left">
                            <span>{{getMessageTitle(item.sign,item.userVo)}}</span>
                        </div>
                        <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                    </div>
                    <!-- 普通消息 -->
                    <div class="message-counter" v-if="item.record">
                        <span
                                v-if="item.eventType != 0 && item.type != 8"
                        >【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span>
                        <span v-if="item.type == 8">【 语音备注 】</span>
                        <span v-html="item.record"></span>
                    </div>
                    <div
                            class="message-counter"
                            v-if="item.eventType == 1 && item.remark"
                    >【 备注 】 {{item.remark}}
                    </div>
                    <!-- 链接 -->
                    <div class="message-counter" v-if="item.type == 6">
                        【
                        <a
                                stylet="color:#2db7f5;"
                                target="_blank"
                                :href="item.enclosure"
                        >链接：{{item.enclosure}}</a>】
                    </div>

                    <div class="flex message-bottom">
                        <div class="flex-left flex message-group">
                            <!-- 图片 -->
                            <template v-if="item.type == 2">
                                <div class="flex-left item img pic" v-for="(item2,index2) in item.enclosureList" :key="'picture'+index2">
                                    <!-- <a class="link" target="_blank" :href="$FILE(item.enclosure)"> -->
                                    <a
                                            class="link"
                                            @click="setShowImgModalData($FILE(item2))"
                                            href="javascript:;"
                                    >
                                        <img :src="$FILE(item2)">
                                    </a>
                                </div>
                            </template>
                            <!-- 音乐 -->
                            <template v-if="item.type == 3">
                                <div class="flex-left item img pic">
                                    <a
                                            class="link"
                                            @click="setAudioModelPath($FILE(item.enclosure))"
                                            href="javascript:;"
                                    >
                                        <img :src="$CDN('/default_audio.png')">
                                    </a>
                                </div>
                            </template>
                            <!-- 视频 -->
                            <template v-if="item.type == 5">
                                <div class="flex-left item img pic">
                                    <a
                                            class="link"
                                            @click="setVideoModelPath($FILE(item.enclosure))"
                                            href="javascript:;"
                                    >
                                        <img :src="$CDN('/default_video.png')">
                                    </a>
                                </div>
                            </template>
                            <!-- 语音 -->
                            <template v-if="item.type == 8">
                                <div class="flex-left item img pic">
                                    <a
                                            class="link"
                                            @click="setAudioModelPath($FILE(item.enclosure))"
                                            href="javascript:;"
                                    >
                                        <img :src="$CDN('/default_audio.png')">
                                    </a>
                                </div>
                            </template>
                        </div>
                        <div v-if="item.eventType == 1 || item.type == 2" class="flex-right btn-group move-down">
                            <Button
                                    v-if="item.enclosure && item.type == 2"
                                    @click="downloadFiles(item)"
                                    type="primary"
                                    class="btn"
                                    icon="ios-cloud-download"
                                    ghost
                            >下载附件
                            </Button>
                            <Button
                                    v-if="item.eventType == 1 "
                                    @click="downloadRedio(item)"
                                    type="primary"
                                    class="btn"
                                    icon="ios-cloud-download"
                                    ghost
                            >播放录音
                            </Button>
                            <Button
                                    v-if="item.eventType == 1 && isExectorId"
                                    @click="editRemarkModal(item)"
                                    type="warning"
                                    class="btn"
                                    icon="ios-brush"
                                    ghost
                            >编辑摘要
                            </Button>
                        </div>
                    </div>
                </Card>

                <!-- 工单动态 -->
                <Card v-if="item.eventType === 5" :key="'message_'+item.id" class="md-card message">

                    <!--创建工单-->
                    <template v-if="item.dynamicType === 1">

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>{{getMessageTitle(item.sign,item.executorInfo)}}</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <p><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</P>
                            <P>工单类型：{{getWorkSheetTypeValue(item.workType)}}</P>
                            <P v-if="item.executorInfo">
                                执行人：{{item.executorInfo.userName}}
                                <span
                                        v-if="item.executorInfo.departmentName"
                                >（{{item.executorInfo.departmentName}}）</span>
                            </P>
                        </div>

                    </template>

                    <!--工单移交申请-->
                    <template v-else-if="item.dynamicType === 3">

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>{{getMessageTitle(item.sign,item.executorInfo)}}</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <p><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</p>
                            <P v-if="item.transferredUser">
                                被移交人：{{item.transferredUser && item.transferredUser.userName
                                ?item.transferredUser.userName : ''}}
                                <span
                                        v-if="item.transferredUser && item.transferredUser.departmentName"
                                >（{{item.transferredUser.departmentName}}）</span>
                            </P>
                            <P v-if="item.remark">备注：{{item.remark}}</P>
                        </div>

                    </template>

                    <!--拒绝工单移交申请-->
                    <template v-else-if="item.dynamicType === 5">

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>{{getMessageTitle(item.sign,item.executorInfo)}}</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <p><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</p>
                            <P v-if="item.transferredUser">
                                移交人：{{item.transferredUser.userName}}
                                <span
                                        v-if="item.transferredUser.departmentName"
                                >（{{item.transferredUser.departmentName}}）</span>
                            </P>
                            <P v-if="item.remark">拒绝原因：{{item.remark}}</P>
                        </div>
                    </template>

                    <!--工单评价-->
                    <template v-else-if="item.dynamicType === 7">

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>客户 ：</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <P><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</P>
                        </div>

                    </template>

                    <!--接受工单移交申请-->
                    <template v-else-if="item.dynamicType === 4">

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>{{getMessageTitle(item.sign,item.transferredUser)}}</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <P><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</P>
                        </div>

                    </template>

                    <!--工单受理、撤回工单移交申请、工单完结、工单评价、客户留言-->
                    <template v-else>

                        <div class="flex message-bottom">
                            <div class="flex-left">
                                <span>{{getMessageTitle(item.sign,item.executorInfo)}}</span>
                            </div>
                            <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                        </div>

                        <div class="message-counter">
                            <P><span>【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span> {{item.record}}</P>
                        </div>

                    </template>
                </Card>
            </div>
        </template>

        <Modal
                v-model="isShowRemarkModal"
                width="900"
                :closable="false"
                :mask-closable="false"
                title="通话摘要："
        >
            <Card class="md-card">
                <div>
                    <textarea v-model="remarkParams.remark" id="remarkModal" cols="115" rows="10"></textarea>
                </div>
            </Card>
            <div slot="footer">
                <Button type="primary" @click="updateItemTalkNews">提交</Button>
            </div>
        </Modal>

        <Modal footer-hide v-model="isShowImgModal" width="600">
            <card class="md-card pic">
                <img :src="imgPath">
            </card>
        </Modal>
    </div>
</template>
<script>
    import {mapMutations, mapState, mapActions} from "vuex";
    import {updateItemTalkNewsData} from "@/api/admin/workSheet/talkNews";
    import {
        getCallInfo
    } from "@/api/admin/workSheet/workOrder";
    import {ShowRecordPlay} from "@/api/admin/callPhone/callPhone"
    import {formatTime} from "@/libs/util/time";
    import {getArrValue} from "@/libs/tools";
    import myaudio from "_c/public/audio";
    import myvideo from "_c/public/video";
    export default {
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            handleType: {
                type: Number,
                default() {
                    return 0;
                }
            }
        },
        components: {
            myaudio,
            myvideo
        },
        computed: {
            isExectorId() {
                let executorId =
                    this.$store.state.workSheet.workSheetBaseInfo.executorId ==
                    this.sixiId;
                let ishandleType = this.handleType == 3 || this.handleType == 4;
                return executorId && !ishandleType;
            }
        },
        methods: {
            ...mapActions(["getSixiId"]),
            setShowImgModalData(path) {
                this.isShowImgModal = true;
                this.imgPath = path;
            },
            // 更新对话记录
            async updateItemTalkNews() {
                let params = {...this.remarkParams};
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
                this.$emit("updateItemTalkNews");
            },
            editRemarkModal(item) {
                console.log(item);
                this.isShowRemarkModal = true;
                this.remarkParams.record = item.record;
                this.remarkParams.workSheetId = item.workSheetId;
                this.remarkParams.identifier = item.identifier;
                this.remarkParams.remark = item.remark;
                this.remarkParams.id = item.id;
            },
            getMessageTitle(type, userVo) {
                return type == 1 ? userVo.userName + "(" + userVo.departmentName + ") ：" : "客户 ：";
            },
            formatTimeData(time) {
                return formatTime(time, "YYYY-MM-DD HH:mm:ss");
            },
            getWorkSheetEventTypeValue(key) {
                return getArrValue(
                    this.$store.state.workSheet.workSheetEventType,
                    key
                );
            },
            setAudioModelPath(path) {
                this.isShowAudioModel = true;
                this.audioModelPath = path;
            },
            downloadFiles(obj) {
                console.log(obj.enclosureList)
                for(let i = 0;i<obj.enclosureList.length;i++){
                    this.sleep(500);
                    this.download(this.$FILE(obj.enclosureList[i]),obj.id)
                }
                // obj.enclosureList.forEach((item,index )=>{
                //     console.log(index)
                //     this.sleep(500);
                //     this.download(this.$FILE(item),obj.id)
                // })
                // this.download("http://wechat-base-images.oss-cn-hangzhou.aliyuncs.com/wechat/0d76807c-8de4-4a23-a06e-6e6a45b76b2b",1111)
            },
            download(src,id) {
                console.log(123,id)
                // let $a = document.createElement('a');
                // $a.setAttribute("href", src);
                // $a.setAttribute("download", id + ".jpg");
            
                // let evObj = document.createEvent('MouseEvents');
                // evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
                // $a.dispatchEvent(evObj);
                var a = document.createElement('a');
                a.download = id+".jpg";
                a.href=src;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                // console.log(123)
                // var div = document.createElement("div");
                // div.html = "123"
                // div.setAttribute("onclick","download("+src+","+id+".jpg,image/jpg)");
                // div.click();
                // var x=new XMLHttpRequest();
                // x.open( "GET", src , true);
                // x.responseType="blob";
                // x.onload= function(e){download(e.target.response, id+".png", "image/png");};
                // x.send();
                // document.body.removeChild(div);
            },
            sleep(d) {
                for(var t = Date.now();Date.now() - t <= d;);
            },
            // 播放录音
            downloadRedio(item) {
                if (item.eventType !== 1) {
                    return
                }
                getCallInfo({
                    talkNewsId: item.id
                }).then(res => {
                    console.log(res)
                    if (res.data.recordUrl.length <= 0) {
                        this.$Modal.error({
                            title: "播放录音",
                            content: '录音播放失败，请稍后再试！'
                        });
                        return
                    }
                    let ownerAcc = res.data.ownerAcc
                    let code = res.data.code
                    let calledNum = res.data.calledNum
                    let recordUrl = res.data.recordUrl
                    let timeLength = res.data.timeLength
                    let isPading = true;

                    setTimeout(() => {
                        if (isPading) {
                            this.$Modal.error({
                                title: "播放录音异常：",
                                content:
                                    "播放录音：<br>1、请检查呼叫软件是否打开正常! <br> 2、请检查设备是否安装正常！<br>"
                            });
                        }
                    }, 2000);
                    ShowRecordPlay({
                        account: ownerAcc,
                        code: code,
                        phone: calledNum,
                        url: recordUrl,
                        dur: timeLength
                    }).then(res2 => {
                        let {data} = res2;
                        console.log(data)
                        isPading = false;
                    })

                }).catch(err => {
                    this.$Modal.error({
                        title: "播放录音",
                        content: '录音播放失败'
                    });
                });
            },
            setVideoModelPath(path) {
                console.log("video", path);
                this.isShowVideoModel = true;
                this.videoParams.src = path;
            },
            getWorkSheetTypeValue(key) {
                return getArrValue(this.$store.state.workSheet.workSheetType, key);
            }
        },
        data() {
            return {
                sixiId: "",
                imgPath: "",
                isShowImgModal: false,
                isShowRemarkModal: false,
                isShowAudioModel: false,
                audioModelPath: "",
                isShowVideoModel: false,
                videoParams: {
                    src: "",
                    type: "video/mp4"
                },
                remarkParams: {
                    talkTime: "",
                    creationTime: "",
                    id: 0,
                    workOrderId: 0,
                    identifier: "",
                    record: "",
                    remark: ""
                }
            };
        },
        mounted() {
            this.getSixiId();
            this.sixiId = this.$store.state.user.sixiId;
        }
    };
</script>
