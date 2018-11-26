<template>
	<div>
		<Card class="md-card">
			<div slot="title">工单信息</div>
			<tables :data="workOrderInfo"></tables>
		</Card>
		<Card class="md-card">
			<div slot="title">客户信息</div>
			<tables :data="cunstomInfo"></tables>
		</Card>
		<Card class="md-card" v-if="evaluateList.length != 0">
			<div slot="title">客户评价</div>
			<Card v-for="(item,index) in evaluateList" :key="'evaluate_'+index">
				<div slot="title">评价时间：{{item.time}}</div>
				<evaluate-item :evaluateList="item.evaluateContent"></evaluate-item>
			</Card>
		</Card>
	</div>
</template>

<script>
import tables from "_c/admin/md-tables";
import { mapState, mapMutations } from "vuex";
import { getArrValue } from "@/libs/tools";
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
import { getEvaluateInfo } from "@/api/admin/evaluate/dimension";
import evaluateItem from "_c/admin/evaluate-item";
import { formatTime } from "@/libs/util/time";
export default {
	components: {
		evaluateItem,
		tables
	},
	computed: {},
	methods: {
		...mapMutations(["setWorkSheetBaseInfo"]),
		getWorkSheetTypeValue(key) {
			return getArrValue(this.$store.state.workSheet.workSheetType, key);
		},
		async getWorkSheetInfo() {
			let res = await getWorkSheetInfoData({
				workSheetId: this.workSheetId
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
			this.assembleMessage();
			this.getEvaluateInfo();
		},
		assembleMessage() {
			this.setWorkOrderInfo();
			this.setCunstomInfo();
		},
		// 设置 工单信息
		setWorkOrderInfo() {
			let joinStr = "";
			this.info.userVos.forEach(item => {
				if (item) {
					joinStr +=
						item.userName + "(" + item.departmentName + ")，";
				}
			});
			let executorUser = "";
			if (this.info.executorUser && this.info.executorUser.userName) {
				executorUser = this.info.executorUser.userName;
				if (this.info.executorUser.departmentName) {
					executorUser +=
						"(" + this.info.executorUser.departmentName + ")";
				}
			}

			let leadingUser = "";
			if (this.info.leadingUser && this.info.leadingUser.userName) {
				leadingUser = this.info.leadingUser.userName;

				if (this.info.leadingUser.departmentName) {
					leadingUser +=
						"(" + this.info.leadingUser.departmentName + ")";
				}
			}
			let workOrderInfo = [
				[
					{
						title: "工单编号：",
						value: this.info.identifier
					},
					{
						title: "工单类型：",
						value: this.getWorkSheetTypeValue(this.info.workType)
					},
					{
						title: "工单标题：",
						value: this.info.title
					}
				],
				[
					{
						title: "工单创建时间：",
						value: formatTime(
							this.info.createAt,
							"YYYY-MM-DD HH:mm:ss"
						)
					},
					{
						title: "工单响应时间：",
						value: this.info.responseStr
					},
					{
						title: "工单持续时间：",
						value: this.info.durationStr
					}
				],
				[
					{
						title: "执行人：",
						value: executorUser
					},
					{
						title: "参与者：",
						value: joinStr
					},
					{
						title: "负责人：",
						value: leadingUser
					}
				]
			];

			this.workOrderInfo = workOrderInfo;
		},
		// 设置 客户信息
		setCunstomInfo() {
			let phone =
				(this.info.customerDetailVo &&
					this.info.customerDetailVo.mobile) ||
				"";
			let cunstomInfo = [
				[
					{
						title: "用户手机号码：",
						value: phone
							? phone.slice(0, 3) + "****" + phone.slice(-4)
							: ""
					}
				]
			];

			if (this.info.customerDetailVo) {
				cunstomInfo[0].push({
					title: "用户openID：",
					value:
						(this.info.customerDetailVo &&
							this.info.customerDetailVo.openId) ||
						""
				});
				cunstomInfo[0].push({
					title: "微信昵称：",
					value:
						(this.info.customerDetailVo &&
							this.info.customerDetailVo.wechatNickname) ||
						""
				});
			} else {
				cunstomInfo[0].push({
					title: "用户openID：",
					value: ""
				});
				cunstomInfo[0].push({
					title: "微信昵称：",
					value: ""
				});
			}

			cunstomInfo.push([
				{
					title: "公司名称：",
					value:
						this.info.customerDetailVo &&
						this.info.customerDetailVo.companyName
				},
				{
					title: "网址：",
					value:
						this.info.customerDetailVo &&
						this.info.customerDetailVo.url
				},
				{
					title: "合作业务：",
					value: "暂无"
				}
			]);

			this.cunstomInfo = cunstomInfo;
		},
		// 获取评价详情
		getEvaluateInfo() {
			getEvaluateInfo(this.info.id, "").then(res => {
				if (res.status != 200) {
					return;
				}
				console.log(res);
				let evaluateList = res.data || [];
				evaluateList.map(item => {
					item.evaluateContent.map(e => {
						e.otherAttribute.maxNum = parseFloat(
							e.otherAttribute.maxNum
						);
						return e;
					});
					return item;
				});
				this.evaluateList = evaluateList;
			});
		}
	},
	data() {
		return {
			cunstomInfo: [],
			workOrderInfo: [],
			evaluateList: [],
			workSheetId: 0,
			info: {
				cellphone: "",
				companyVoList: [],
				confirmTime: "",
				createAt: "",
				departmentId: null,
				departmentName: "",
				evaluateTime: null,
				executorId: 0,
				executorName: "",
				finishTime: null,
				handleType: 0,
				id: 0,
				identifier: "", //工单编号
				leadingName: "",
				leadingOfficial: 0,
				participator: "",
				responseTime: "",
				title: "",
				userId: "",
				workType: 0
			}
		};
	},
	created() {
		this.workSheetId = this.$route.query.workSheetId;
	},
	mounted() {
		this.getWorkSheetInfo();
	}
};
</script>