<template>
	<div>
		<Card class="md-card">
			<p slot="title">模板详细</p>
			<Table :columns="templateColumns" :data="templateInfo"></Table>
		</Card>
		<Card class="md-card">
			<p slot="title">
				<span>评价维度</span>
			</p>
			<a href="#" slot="extra" class="md-card-btn-info" @click.prevent="addDimensionAction">
				<Icon type="md-add"></Icon>添加维度
			</a>
			<Table :columns="dimensionColumns" :data="dimensionContent"></Table>
		</Card>
		<Modal
			v-model="addModelStatu"
			title="编辑评价维度"
			@on-ok="addDimensionOk"
			@on-cancel="addDimensionCancel"
		>
			<Card>
				<Form :model="itemDimension" :label-width="120">
					<FormItem label="维度名称 ：">
						<Input v-model="itemDimension.evaluateName" placeholder="请填写">
							<span></span>
						</Input>
					</FormItem>
					<FormItem label="类型 ：">
						<Select v-model="itemDimension.type" placeholder="请选择">
							<Option
								v-for="item in dimensionListData"
								:key="item.id"
								value="item.type"
							>{{item.evaluateType}}</Option>
						</Select>
					</FormItem>
					<FormItem label="满分数 ：">
						<InputNumber
							placeholder="请填写"
							:max="10"
							:min="1"
							:step="0.5"
							v-model="itemDimension.otherAttribute.maxNum"
						>
							<span></span>
						</InputNumber>
					</FormItem>
					<FormItem label="是否允许0.5分">
						<RadioGroup v-model="itemDimension.isRequired">
							<Radio label="male">Male</Radio>
							<Radio label="female">Female</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="是否必选">
						<RadioGroup v-model="itemDimension.isRequired">
							<Radio label="male">Male</Radio>
							<Radio label="female">Female</Radio>
						</RadioGroup>
					</FormItem>
				</Form>
			</Card>
		</Modal>
	</div>
</template>
<script>
import {
	setTemplateStatusType,
	getTemplateInfoData
} from "@/api/admin/evaluate/template";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("dimension");
import "./index.less";
export default {
	computed: {
		dimensionListData() {
			return this.$store.state.dimension.dimensionListData;
		}
	},
	data() {
		return {
			addModelStatu: false,
			itemDimension: {
				index: 0,
				tagList: [],
				evaluateType: "评分",
				isRequired: 1,
				otherAttribute: {
					showType: "score",
					maxNum: 5,
					isHalf: 1
				},
				id: 1,
				evaluateName: "服务态度",
				type: "number",
				value: ""
			},
			templateColumns: [
				{
					title: "模板ID",
					align: "center",
					key: "id"
				},
				{
					title: "模板标题",
					align: "center",
					key: "templateTitle"
				},
				{
					title: "状态",
					key: "status",
					align: "center",
					render: (h, params) => {
						let btnGroup = [];
						let id = params.row.id;
						let status = params.row.status == 1 ? false : true;
						btnGroup.push(
							h(
								"i-switch",
								{
									props: {
										size: "large",
										value: status
									},
									on: {
										// 0启用，1停用
										"on-change": status => {
											this.setTemplateStatus({ id });
										}
									}
								},
								[
									h("span", { slot: "open" }, "启用"),
									h("span", { slot: "close" }, "停用")
								]
							)
						);
						return h("div", btnGroup);
					}
				}
			],
			templateInfo: [],
			dimensionColumns: [
				{
					title: "维度名称",
					align: "center",
					key: "evaluateName"
				},
				{
					title: "类型",
					align: "center",
					key: "evaluateType"
				},
				{
					title: "满分",
					align: "center",
					key: "maxNum",
					render: (h, params) => {
						let btnGroup = [];
						let maxNum = params.row.otherAttribute.maxNum;

						btnGroup.push(
							h("span", {}, maxNum > 0 ? maxNum : "--")
						);
						return h("div", btnGroup);
					}
				},
				{
					title: "是否允许0.5分",
					align: "center",
					key: "isHalf",
					render: (h, params) => {
						let btnGroup = [];
						let isHalf = params.row.otherAttribute.isHalf;

						btnGroup.push(h("span", {}, isHalf == 0 ? "否" : "是"));
						return h("div", btnGroup);
					}
				},
				{
					title: "是否必填",
					align: "center",
					key: "isRequired",
					render: (h, params) => {
						let btnGroup = [];
						let isRequired = params.row.otherAttribute.isRequired;

						btnGroup.push(
							h("span", {}, isRequired == 0 ? "否" : "是")
						);
						return h("div", btnGroup);
					}
				},
				{
					title: "操作",
					key: "handle",
					render: (h, params) => {
						let btnGroup = [];
						let index = params.index;
						btnGroup.push(
							h(
								"Button",
								{
									props: {
										type: "primary",
										size: "small",
										ghost: true
									},
									style: {
										margin: "5px"
									},
									on: {
										click: () => {}
									}
								},
								"编辑"
							)
						);

						btnGroup.push(
							h(
								"Poptip",
								{
									props: {
										confirm: true,
										title: "你确定要删除吗?"
									},

									on: {
										"on-ok": () => {
											this.delDimension(index);
										}
									}
								},
								[
									h(
										"Button",
										{
											props: {
												type: "error",
												size: "small",
												ghost: true
											},
											style: {
												margin: "5px"
											}
										},
										"删除"
									)
								]
							)
						);
						return h("div", btnGroup);
					}
				}
			],
			dimensionContent: []
		};
	},
	methods: {
		...mapActions(["getDimensionList"]),
		// 设置模板状态
		async setTemplateStatus(id) {
			let res = await setTemplateStatusType(id);
			console.log("setTemplateStatus", res);
			if (res.status !== 200) {
				console.error("setTemplateStatus", res.msg);
				this.$Modal.error({
					title: "设置模板状态",
					content: res.msg
				});
				return;
			}

			this.$Modal.success({
				title: "设置模板状态",
				content: res.msg
			});
			this.getTemplateInfo();
		},
		async getTemplateInfo() {
			let res = await getTemplateInfoData({ id: this.$route.query.id });
			console.log("setTemplateStatus", res);
			if (res.status !== 200) {
				console.error("setTemplateStatus", res.msg);
				this.$Modal.error({
					title: "获取模板详情",
					content: res.msg
				});
				return;
			}

			this.templateInfo = res.data || [];
			this.dimensionContent = res.data[0].content || [];
		},
		addDimensionAction() {
			this.addModelStatu = true;
		},
		addDimensionOk() {
			console.log("addDimensionOk");
		},
		addDimensionCancel() {
			console.log("addDimensionCancel");
		},
		delDimension(index) {
			let dimensionContent = [...this.dimensionContent];
			dimensionContent.splice(index, 1);
			this.dimensionContent = dimensionContent;
		}
	},
	created() {
		this.getTemplateInfo();
		this.getDimensionList();
	},
	mounted() {}
};
</script>
