<template>
    <div>
        <myaudio :src="audioModelPath" v-model="isShowAudioModel"></myaudio>
        <myvideo :videoParams="videoParams" v-model="isShowVideoModel"></myvideo>
        <template v-for="item in data">
            <Card :key="'message_'+item.id" class="md-card message">
                <div class="flex message-bottom">
                    <div class="flex-left">
                        <span>{{getMessageTitle(item.sign,item.userVo)}}</span>
                    </div>
                    <div class="flex-right">{{formatTimeData(item.createAt)}}</div>
                </div>
                <!-- 普通消息 -->
                <div class="message-counter" v-if="item.record">
                    <span
                        v-if="item.eventType != 0"
                    >【 {{getWorkSheetEventTypeValue(item.eventType)}} 】</span>
                    {{item.record}}
                </div>
                <div
                    class="message-counter"
                    v-if="item.eventType == 1 && item.remark"
                >【 备注 】  {{item.remark}} </div>
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
                            <div class="flex-left item img pic">
                                <!-- <a class="link" target="_blank" :href="$FILE(item.enclosure)"> -->
                                <a
                                    class="link"
                                    @click="setShowImgModalData($FILE(item.enclosure))"
                                    href="javascript:;"
                                >
                                    <img :src="$FILE(item.enclosure)">
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
                    <div class="flex-right btn-group move-down">
                        <Button
                            style="display:none;"
                            v-if="item.enclosure"
                            @click="downloadFiles(item)"
                            type="primary"
                            class="btn"
                            icon="ios-cloud-download"
                            ghost
                        >下载附件</Button>
                        <Button
                            v-if="item.eventType == 1 && isExectorId"
                            @click="editRemarkModal(item)"
                            type="warning"
                            class="btn"
                            icon="ios-brush"
                            ghost
                        >编辑摘要</Button>
                    </div>
                </div>
            </Card>
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
import { mapMutations, mapState, mapActions } from "vuex";
import { updateItemTalkNewsData } from "@/api/admin/workSheet/talkNews";
import { formatTime } from "@/libs/util/time";
import { getArrValue } from "@/libs/tools";
import myaudio from "_c/public/audio";
import myvideo from "_c/public/video";
export default {
	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	components: {
		myaudio,
		myvideo
	},
	computed: {
		isExectorId() {
			let executorId = this.$store.state.workSheet.workSheetBaseInfo
				.executorId;
			return executorId == this.sixiId;
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
			let params = { ...this.remarkParams };
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
			return type == 1
				? userVo.userName + "(" + userVo.departmentName + ") ："
				: "客户 ：";
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
		downloadFiles(item) {
			window.open(this.$FILE(item.path));
		},
		setVideoModelPath(path) {
			console.log("video", path);
			this.isShowVideoModel = true;
			this.videoParams.src = path;
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
