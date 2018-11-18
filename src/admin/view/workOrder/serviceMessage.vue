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
					<Button class="btn" icon="md-refresh" type="warning" ghost>刷新</Button>
				</div>
			</div>
		</Card>
		<Card class="md-card message">
			<Form>
				<FormItem label="">
					<Input
						v-model="replyMessage"
						type="textarea"
						:autosize="{minRows: 5,maxRows: 30}"
						placeholder="请填写回复信息。。。"
					>
						<span></span>
					</Input>
				</FormItem>
			</Form>
			<div class="btn-group flex message-bottom">
				<div class="flex-left flex">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-left btn" style="padding-top:6px;">
						<Upload multiple action="//jsonplaceholder.typicode.com/posts/">
							<Button class="btn" type="primary" ghost icon="ios-cloud-upload">上传附件</Button>
						</Upload>
					</div>
				</div>
				<div class="flex-right move-down">
					<span style="margin-right:30px;">倒计时: 16点47分</span>
					<Button class="btn" type="success" ghost>回复</Button>
				</div>
			</div>
		</Card>
		<template v-for="(item,index) in talkNewsList">
			<Card :key="'message_'+index" class="md-card message">
				<div class="flex message-bottom">
					<div class="flex-left">
						<span>{{getMessageTitle(item.sign,item.userVo)}}</span>
					</div>
					<div class="flex-right">{{item.createAt}}</div>
				</div>
				<div class="message-counter">{{item.record}}</div>
				<div class="flex message-bottom">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-right btn-group move-down">
						<Button type="primary" class="btn" icon="ios-cloud-download" ghost>下载附件</Button>
						<Button type="warning" class="btn" icon="ios-brush" ghost>编辑摘要</Button>
					</div>
				</div>
			</Card>
		</template>
		<!-- <Card class="md-card message">
			<Card class="md-card">
				<div class="flex message-top">
					<div class="flex-left">
						<span>项婷（新少林）：</span>
					</div>
					<div class="flex-right">2018-01-02 13:20</div>
				</div>
				<div
					class="message-counter"
				>客户要求美工的图做的再精细一点再精细一点再精细一点，但实际上我们的图已经做的很靖西很精细了，所以我反馈给客户说我们会努力的把图做的更精细一点</div>
				<div class="flex message-bottom">
					<div class="flex-left flex message-group">
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
								alt=""
							>
						</div>
						<div class="flex-left img">
							<img
								src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
								alt=""
							>
						</div>
					</div>
					<div class="flex-right btn-group move-down">
						<Button type="primary" class="btn" icon="ios-cloud-download" ghost>下载附件</Button>
					</div>
				</div>
		</Card>-->
	</div>
</template>

<script>
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
import {
	addItemTalkNewsData,
	getTalkNewsListData
} from "@/api/admin/workSheet/talkNews";
import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
import { mapState, mapMutations } from "vuex";
import { formatTime } from "@/libs/util/time";

export default {
	methods: {
		...mapMutations(["setWorkSheetBaseInfo"]),
		getMessageTitle(type,userVo) {
			return type == 1 ?userVo.userName +"("+userVo.departmentName+") ：" : "客户 ：" ;
		},
		async getTalkNewsList() {
			let params = { ...params };
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
				userSixiId: this.info.executorId,
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
				this.$Modal.error({
					title: title,
					content: res.msg
				});
				return;
			}
			this.$Modal.success({
				title: title,
				content: res.msg
			});

			if (eventType == 1) {
				this.callPhone(cellphone, res.data.id);
			}
		},
		confirm(eventType) {
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
			console.log("拨号：", res);
			if (res.status !== 200) {
				this.$Modal.error({
					title: "拨号",
					content: res.msg
				});
				return;
			}
			this.$Modal.success({
				title: "拨号",
				content: res.msg
			});
		}
	},
	data() {
		return {
			params: {
				workSheetId: 1,
				pageNum: 1,
				pageSize: 10,
				count: 0
			},
			talkNewsList: [],
			info: {},
			replyMessage: "22"
		};
	},
	mounted() {
		this.getWorkSheetInfo();
		// this.getTalkNewsList();

		this.talkNewsList = [{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"aaaa","userName":"asfdsa ","department":"","userId":""},"sign":1},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":4,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":0,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":1,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":1,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":3,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":3,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":0,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":1,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":4,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":1,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":4,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":0,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":0,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":1,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":3,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":0,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":1,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":2,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":1,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":0,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":1,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":1,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":1,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":0,"userSixiId":"11","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":0,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":5,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":""},{"createAt":1542283789000,"customerName":"","enclosure":"wechat/GDBsjTunG_ZXFXBATGLe6pZA8vMaSaAVJqUeKmjwQZz3Ocx8ZWhIrN5OCmJZ2ChZ","eventType":0,"id":40,"isRead":1,"record":"王前程","recorderId":null,"remark":"","status":null,"type":2,"userSixiId":"1","workSheetId":8,"userVo":{"departmentName":"","userName":"","department":"","userId":""},"sign":0}]
	}
};
</script>
