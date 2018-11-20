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
				<div  v-if="isHaveUserId">
					<a
						v-if="current == 0 && isExectorId"
						@click="setWorkSheetProcessing(2)"
						href="javascript:;"
						class="md-card-btn-warning"
					>
						<Icon type="md-hammer"></Icon>工单确认
					</a>
					<a
						v-if="current == 1 && isExectorId"
						@click="assignPersonnel"
						href="javascript:;"
						class="md-card-btn-info"
					>
						<Icon type="md-create"></Icon>指派
					</a>
					<a
						v-if="current == 1 && isExectorId"
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
					<Button @click="toPage('workOrder-info-base')" type="info" :ghost="isBase">基本信息</Button>
					<Button @click="toPage('workOrder-info-service')" type="info" :ghost="!isBase">服务信息</Button>
				</ButtonGroup>
			</div>
		</Card>
		<router-view></router-view>
		<Modal v-model="modal.bool" footer-hide title="工单指派" mask-closable>
			<Card class="md-card">
				<RadioGroup v-model="modal.index">
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
				</RadioGroup>
				<!-- 本期不做 -->
				<div v-if="false">
					<h3>客服记录</h3>
					<Input type="textarea">
						<span></span>
					</Input>
				</div>
				<div class="modal-btn">
					<Button class="btn" type="primary" @click="subAssign">提交</Button>
					<Button class="btn" type="default" @click="modal.bool = false">取消</Button>
				</div>
			</Card>
		</Modal>
	</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { getArrValue } from "@/libs/tools";
import {
	getWorkSheetInfoData,
	setWorkSheetProcessingState,
	assignWorksheet
} from "@/api/admin/workSheet/workSheet";
import { getstaffListData } from "@/api/admin/custom/custom";
import { formatTime } from "@/libs/util/time";
import "./index.less";
export default {
	computed: {
		isShowStatus() {
			return this.status.list.length > 0;
		},
		isBase() {
			return this.$route.name != "workOrder-info-base";
		},
		showWorkSheetType() {
			return this.$store.state.workSheet.workSheetBaseInfo.handleType;
		},
		isExectorId() {
			return this.info.executorId == this.sixiId;
		},
		isHaveUserId() {
			if (this.info.userId) {
				return true;
			}
			return false;
		}
	},
	methods: {
		...mapMutations(["setWorkSheetBaseInfo"]),
		...mapActions(["getSixiId"]),
		assignPersonnel() {
			this.modal.bool = true;
			this.getPersonalList();
		},
		subAssign() {
			let params = {
				workSheetId: this.info.id,
				executorSixiId: this.modal.personList[this.modal.index]
					.staffSixiId
			};
			console.log(params);
			assignWorksheet(params).then(res => {
				console.log(res);
				if (res.status != 200) {
					this.$Modal.error({
						title: "人员指派",
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
		toPage(name) {
			console.log(this.$route);
			let route = this.$route;
			this.$router.push({
				name: name,
				params: route.params,
				query: route.query
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
					message = "工单已完结";
					break;
			}
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
			this.stepsType(res.data);
			this.setWorkSheetBaseInfo(res.data);
		},
		async getPersonalList() {
			let customerSixiId = this.info.userId;
			if (customerSixiId) {
				this.$Modal.error({
					title: "指派人员",
					content: "该客户没有对应四喜id"
				});
				return;
			}
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
		stepsType(data) {
			// let handleType = this.$store.state.workSheet.workSheetBaseInfo
			// 	.handleType;

			let type = 0;
			switch (data.handleType) {
				case 0:
					type = 0;
					break;
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
					title: "待处理",
					component: formatTime(data.createAt, "YYYY-MM-DD HH:mm:ss")
				},
				{
					title: "处理中",
					component: formatTime(
						data.confirmTime,
						"YYYY-MM-DD HH:mm:ss"
					)
				},
				{
					title: "已完结",
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
		}
	},
	data() {
		return {
			current: 0,
			info: {},
			workSheetId: 0,
			sixiId: "",
			status: {
				list: []
			},
			modal: {
				bool: false,
				personList: [],
				index: ""
			}
		};
	},
	created() {
		this.workSheetId = this.$route.query.workSheetId;
	},
	mounted() {
		this.getWorkSheetInfo();
		this.getSixiId();
		this.sixiId = this.$store.state.user.sixiId;
	}
};
</script>
