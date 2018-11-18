<template>
	<div>
		<Card class="md-card">
			<div slot="title">消息记录</div>
			<div class="btn-group flex">
				<div class="flex-left">
					<Button @click="confirm(1)" class="btn" icon="ios-call" type="success" ghost>拨号</Button>
					<Button @click="confirm(2)" class="btn" icon="md-settings" type="info" ghost>电话号码采集</Button>
					<Button @click="confirm(3)" class="btn" icon="md-settings" type="info" ghost>账号密码采集</Button>
				</div>
				<div class="flex-right">
					<Button @click="sleectTalkNewsList(1)" class="btn" icon="md-refresh" type="warning" ghost>刷新</Button>
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
				<div>通话开始时间：{{remarkParams.creationTime}}</div>
				<div>通话持续时间： {{remarkParams.talkTime}}</div>
				<div>通话摘要：</div>
				<div>
					<textarea v-model="remarkParams.remark" id="remarkModal" cols="115" rows="10"></textarea>
				</div>
			</Card>
			<div slot="footer">
				<Button type="primary" @click="updateItemTalkNews">提交</Button>
			</div>
		</Modal>
		<Card class="md-card message">
			<Form>
				<FormItem label="">
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
				<div class="flex-right move-down">
					<span
						v-if="getTalkNewsCountdownTimeFormat"
						style="margin-right:30px;"
					>倒计时: {{getTalkNewsCountdownTimeFormat}} 失效</span>
					<Button @click="setWorkOrderCustomerServiceStaffReply" class="btn" type="success" ghost>回复</Button>
				</div>
			</div>
		</Card>
		<message-list :data="talkNewsList"></message-list>
		<Card class="md-card">
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
import { mapState, mapMutations } from "vuex";
import { formatTime } from "@/libs/util/time";
import { getRelativeTime, getDateDiff } from "@/libs/tools";
import messageList from "_c/admin/message-list";
import Page from "_c/admin/page";
export default {
	components: {
		messageList,
		Page
	},
	computed: {
		getTalkNewsCountdownTimeFormat() {
			return getRelativeTime(formatTime(this.countDownTime, "x"));
		}
	},
	methods: {
		...mapMutations(["setWorkSheetBaseInfo"]),
		getTalkTime() {
			this.remarkParams.talkTime = getDateDiff(
				this.remarkParams.creationTime,
				formatTime(new Date(), "YYYY-MM-DD hh:mm:ss"),
				"month"
			);
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
			this.getTalkNewsList();
		},
		// 更新对话记录
		async updateItemTalkNews() {
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
			this.remarkParams.id = id;
			this.remarkParams.creationTime = formatTime(
				new Date(),
				"YYYY-MM-DD hh:mm:ss"
			);
		},
		formatTimeData(time) {
			return formatTime(time, "YYYY-MM-DD hh:mm:ss");
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

			this.getTalkNewsCountdownTime();
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
			let cellphone = this.info.cellphone;
			if (eventType == 1 && !cellphone) {
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
				this.callPhone(cellphone, res.data.id);
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
			setTimeout(() => {
				this.getTalkTime();
			}, 1000);
			let title = "";
			let message = "";
			switch (eventType) {
				case 1:
					title = "拨号";
					message = "即将拨打客户电话号码，请确认";
					break;
				case 2:
					title = "电话号码采集";
					message = "即将发送客户采集电话号码通知，请确认";
					break;
				case 3:
					title = "账号密码采集";
					message = "即将发送客户采集账号密码通知，请确认";
					break;
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
			isShowRemarkModal: false,
			countDownTime: "",
			remarkParams: {
				talkTime: "",
				creationTime: "",
				id: 1,
				workOrderId: 1,
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
				workSheetId: 8,
				pageNum: 1,
				pageSize: 10,
				count: 0
			},
			talkNewsList: [],
			info: {}
		};
	},
	mounted() {
		this.getWorkSheetInfo();
		this.getTalkNewsList();
	}
};
</script>
