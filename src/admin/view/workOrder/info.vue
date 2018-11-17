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
				<div>
					<a @click="setWorkSheetProcessing(2)" href="javascript:;" class="md-card-btn-warning">
						<Icon type="md-hammer"></Icon>工单确认
					</a>
					<a href="#" class="md-card-btn-info">
						<Icon type="md-create"></Icon>指派
					</a>
					<a @click="setWorkSheetProcessing(3)" href="javascript:;" class="md-card-btn-success">
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
	</div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import { getArrValue } from "@/libs/tools";
import {
	getWorkSheetInfoData,
	setWorkSheetProcessingState
} from "@/api/admin/workSheet/workSheet";
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
		}
	},
	methods: {
		...mapMutations(["setWorkSheetBaseInfo"]),
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
			let res = await getWorkSheetInfoData({ workSheetId: 8 });
			console.log("getWorkSheetInfo", res);
			if (res.status !== 200) {
				console.error("getWorkSheetInfo", res.msg);
				this.$Modal.error({
					title: "工单详情",
					content: res.msg
				});
				return;
			}
			this.setWorkSheetBaseInfo(res.data);
			this.info = res.data;
			this.stepsType(res.data);
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
					component: formatTime(data.createAt, "YYYY-MM-DD hh:mm:ss")
				},
				{
					title: "处理中",
					component: formatTime(
						data.confirmTime,
						"YYYY-MM-DD hh:mm:ss"
					)
				},
				{
					title: "已完结",
					component: formatTime(
						data.evaluateTime,
						"YYYY-MM-DD hh:mm:ss"
					)
				},
				{
					title: "已评价",
					component: formatTime(
						data.finishTime,
						"YYYY-MM-DD hh:mm:ss"
					)
				}
			];
		}
	},
	data() {
		return {
			current: 0,
			info: {},
			status: {
				list: []
			}
		};
	},
	mounted() {
		this.getWorkSheetInfo();
	}
};
</script>
