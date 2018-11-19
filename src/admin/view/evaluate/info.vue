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
			<Card class="md-card">
				<div class="btn-broup">
					<Button class="btn" @click="clostPage" style="margin-right: 80px">返回</Button>
					<Button class="btn" @click="addItemTemplate" ghost type="primary">保存</Button>
				</div>
			</Card>
		</Card>
		<Modal
			:loading="modalLoding"
			:closable="false"
			:mask-closable="false"
			v-model="addModelStatu"
			title="编辑评价维度"
		>
			<Card>
				<Form :model="itemDimension" ref="itemDimension" :rules="ruleInline" :label-width="120">
					<FormItem label="维度名称 ：" prop="evaluateName">
						<Input v-model="itemDimension.evaluateName" placeholder="请填写">
							<span></span>
						</Input>
					</FormItem>
					<FormItem label="类型 ：" prop="type">
						<Select v-model="itemDimension.type" placeholder="请选择" @on-change="selectOnChange">
							<Option
								v-for="item in dimensionListData"
								:key="item.id"
								:value="item.type"
							>{{item.evaluateType}}</Option>
						</Select>
					</FormItem>
					<FormItem v-if="itemDimension.type =='number'" label="满分数 ：" prop="maxNum">
						<InputNumber
							placeholder="请填写"
							:max="100"
							:min="1"
							:step="10"
							:precision="0"
							v-model="itemDimension.maxNum"
						>
							<span></span>
						</InputNumber>
					</FormItem>
					<FormItem v-if="itemDimension.type =='number'" label="是否允许0.5分 ：" prop="isHalf">
						<RadioGroup v-model="itemDimension.isHalf">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem
						v-if="itemDimension.type =='redio' || itemDimension.type =='checkbox'"
						label="是否必选 ： "
						prop="isRequired"
					>
						<RadioGroup v-model="itemDimension.isRequired">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem v-if="itemDimension.type =='text'" label="是否必填 ： " prop="isRequired">
						<RadioGroup v-model="itemDimension.isRequired">
							<Radio label="1">是</Radio>
							<Radio label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem v-if="itemDimension.type =='checkbox'" label="多选选项 ：" prop="value">
						<Input v-model="itemDimension.value" placeholder="请填写">
							<span></span>
						</Input>
						<span class="red">每个选项用 | 号隔开，如：非常专业|非常细心</span>
					</FormItem>
					<FormItem v-if="itemDimension.type =='redio'" label="单选选项 ：" prop="value">
						<Input v-model="itemDimension.value" placeholder="请填写">
							<span></span>
						</Input>
						<span class="red">每个选项用 | 号隔开，如：非常专业|非常细心</span>
					</FormItem>
					<FormItem v-if="itemDimension.type =='text'" label="文本长度 ：" prop="maxNum">
						<InputNumber
							placeholder="请填写"
							:max="500"
							:min="1"
							:step="10"
							:precision="0"
							v-model="itemDimension.maxNum"
						></InputNumber>
						<span>个字</span>
					</FormItem>
				</Form>
			</Card>
			<div slot="footer">
				<Button @click="addDimensionCancel" style="margin-left: 8px">取消</Button>
				<Button @click="addDimensionOk" type="primary">保存</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import {
	setTemplateStatusType,
	getTemplateInfoData,
	addItemTemplateData
} from "@/api/admin/evaluate/template";
import beforeClose from "@/admin/router/before-close";
import { mapState, mapActions, mapMutations } from "vuex";
import { getNextRoute } from "@/libs/util";

import "./index.less";
export default {
	name: "evaluate-info",
	computed: {
		dimensionListData() {
			return this.$store.state.dimension.dimensionListData;
		}
	},
	data() {
		return {
			modalLoding: true,
			addModelStatu: false,
			itemDimension: {
				index: -1,
				tagList: [],
				isRequired: "1",
				showType: "",
				maxNum: 10,
				isHalf: "1",
				id: 0,
				evaluateType: "评分",
				evaluateName: "",
				type: "number",
				value: ""
			},
			ruleInline: {
				maxNum: [
					{
						required: true,
						message: "请填写",
						trigger: "blur"
					}
				],
				evaluateName: [
					{
						required: true,
						message: "请填写",
						trigger: "blur"
					}
				],
				type: [
					{
						required: true,
						message: "请选择",
						trigger: "change",
						type: "string"
					}
				],
				value: [
					{
						required: true,
						message: "请填写",
						trigger: "blur"
					}
				]
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
					key: "templateTitle",
					render: (h, params) => {
						let _this = this;
						let templateTitle = params.row.templateTitle;
						let btnGroup = [];
						btnGroup.push(
							h("Input", {
								props: {
									value: templateTitle
								},
								on: {
									"on-blur": e => {
										_this.setTemplateTitleValue(
											e.target.value,
											params.index
										);
									}
								}
							})
						);
						return h("div", btnGroup);
					}
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
										"on-change": () => {
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
						let maxNum = parseFloat(
							params.row.otherAttribute.maxNum
						);
						let type = params.row.type;
						let showType = params.row.otherAttribute.showType;

						if (type == "number" && showType == "score") {
							btnGroup.push(
								h("span", {}, maxNum > 0 ? maxNum : "--")
							);
						} else {
							btnGroup.push(h("span", {}, "--"));
						}
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
						let type = params.row.type;
						let showType = params.row.otherAttribute.showType;
						if (type == "number" && showType == "score") {
							btnGroup.push(
								h("span", {}, isHalf == "0" ? "否" : "是")
							);
						} else {
							btnGroup.push(h("span", {}, "--"));
						}
						return h("div", btnGroup);
					}
				},
				{
					title: "是否必填",
					align: "center",
					key: "isRequired",
					render: (h, params) => {
						let btnGroup = [];
						let isRequired = params.row.isRequired;

						btnGroup.push(
							h("span", {}, isRequired == "0" ? "否" : "是")
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
										click: () => {
											this.editItemDimensionData(
												params.row,
												params.index
											);
										}
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
		...mapMutations(["closeTag"]),
		...mapActions(["getDimensionList"]),
		clostPage() {
			console.log("clostPage");
			this.closeTag(this.$route);
		},
		setTemplateTitleValue(templateTitle, index) {
			if (templateTitle.length < 2) {
				this.$Modal.error({
					title: "保存模板",
					content: "标题不能小于2个字符"
				});
				return;
			}
			if (templateTitle.length > 24) {
				this.$Modal.error({
					title: "保存模板",
					content: "标题不能大于24个字符"
				});
				return;
			}
			this.templateInfo[index]["templateTitle"] = templateTitle;
		},
		async addItemTemplate() {
			let templateInfo = { ...this.templateInfo[0] };
			console.log(templateInfo);
			let dimensionContent = [...this.dimensionContent];
			if(dimensionContent.length <1){
				this.$Modal.error({
					title: "保存模板",
					content: "至少需要添加一个维度"
				});
				return;
			}
			templateInfo.content = dimensionContent;
			let res = await addItemTemplateData({ ...templateInfo });
			if (res.status !== 200) {
				console.error("setTemplateStatus", res.msg);
				this.$Modal.error({
					title: "保存模板",
					content: res.msg
				});
				return;
			}

			this.$Modal.success({
				title: "保存模板",
				content: res.msg
			});
			// this.getTemplateInfo();
			this.$router.push({
				name:'evaluate-info',
				query:{
					id:res.data
				}
			})
		},
		handleSubmit(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					this.assembleData(this.itemDimension);
				}
			});
		},
		editItemDimensionData(data, index) {
			let itemDimension = {};
			let params = { ...data };
			params.isRequired = params.isRequired.toString();
			params.otherAttribute.maxNum = parseInt(
				params.otherAttribute.maxNum
			);

			if (params.otherAttribute.isHalf == null) {
				params.otherAttribute.isHalf = "0";
			} else {
				params.otherAttribute.isHalf = parseInt(
					params.otherAttribute.isHalf
				);
				params.otherAttribute.isHalf = params.otherAttribute.isHalf.toString();
			}

			if (params.type == "checkbox" || params.type == "redio") {
				params.value = params.tagList.join("|");
			}
			// console.log("params", params);
			itemDimension = {
				index: index,
				tagList: [],
				isRequired: params.isRequired,
				showType: params.otherAttribute.showType,
				maxNum: params.otherAttribute.maxNum,
				isHalf: params.otherAttribute.isHalf,
				id: params.id,
				evaluateType: params.evaluateType,
				evaluateName: params.evaluateName,
				type: params.type,
				value: params.value
			};
			this.itemDimension = { ...itemDimension };
			this.addModelStatu = true;
			this.handleReset("itemDimension");
			// console.log("params", itemDimension, index);
		},
		// 设置模板状态
		async setTemplateStatus(id) {
			let res = await setTemplateStatusType(id);
			// console.log("setTemplateStatus", res);
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

			if (res.data.length > 0) {
				this.templateInfo = res.data;
			} else {
				this.templateInfo = [
					{
						id: "",
						status: 0,
						templateTitle: "模板标题"
					}
				];
			}

			this.dimensionContent = res.data[0].content || [];
		},
		addDimensionAction() {
			this.addModelStatu = true;
			this.handleReset("itemDimension");

			// console.log(this.itemDimension);
			// this.handleReset("itemDimension");
			this.initItemDimensionData();
			this.handleReset("itemDimension");
		},
		addDimensionOk() {
			this.handleSubmit("itemDimension");
		},
		addDimensionCancel() {
			// console.log("addDimensionCancel");
			// console.error("itemDimension", this.itemDimension);
			this.addModelStatu = false;
			// this.handleReset("itemDimension");
			this.initItemDimensionData();
		},
		assembleData(data) {
			// console.log("assembleData");
			let itemDimensionData = {};
			let dimensionData = { ...data };
			let dimensionContent = [...this.dimensionContent];
			
			// console.log(dimensionContent);

			switch (dimensionData.type) {
				case "number":
					dimensionData.showType = "score";
					dimensionData.evaluateType = "评价";
					dimensionData.tagList = [];
					dimensionData.value = "";
					break;
				case "redio":
					if (typeof dimensionData.value == "string") {
						dimensionData.tagList = dimensionData.value.split("|");
					}
					dimensionData.evaluateType = "单选";
					dimensionData.value = "";
					break;
				case "checkbox":
					if (typeof dimensionData.value == "string") {
						dimensionData.tagList = dimensionData.value.split("|");
					}
					dimensionData.evaluateType = "多选";
					dimensionData.value = "";
					break;
				case "text":
					dimensionData.evaluateType = "文本";
					dimensionData.tagList = [];
					dimensionData.value = "";
					break;
			}
			dimensionData.maxNum = parseInt(dimensionData.maxNum);

			itemDimensionData = {
				tagList: dimensionData.tagList,
				evaluateType: dimensionData.evaluateType,
				isRequired: dimensionData.isRequired,
				otherAttribute: {
					showType: dimensionData.showType,
					maxNum: dimensionData.maxNum,
					isHalf: dimensionData.isHalf
				},
				id: dimensionData.id,
				evaluateName: dimensionData.evaluateName,
				type: dimensionData.type,
				value: dimensionData.value
			};
			this.addModelStatu = false;

			if (dimensionData.index >= 0) {
				dimensionContent.splice(dimensionData.index, 1, {
					...itemDimensionData
				});
			} else {
				dimensionContent.push({ ...itemDimensionData });
			}
			// console.log(dimensionContent);
			this.dimensionContent = dimensionContent;
			this.initItemDimensionData();
		},
		initItemDimensionData() {
			let itemDimension = {
				index: -1,
				tagList: [],
				isRequired: "1",
				showType: "",
				maxNum: 10,
				isHalf: "1",
				id: 0,
				evaluateType: "评分",
				evaluateName: "",
				type: "number",
				value: ""
			};
			// console.log(itemDimension)
			this.itemDimension = { ...itemDimension };
			// console.log(this.itemDimension)
			this.selectOnChange("number");
		},
		delDimension(index) {
			let dimensionContent = [...this.dimensionContent];
			dimensionContent.splice(index, 1);
			this.dimensionContent = dimensionContent;
		},
		selectOnChange(type) {
			this.setDimensionTypeStatus(type);
			this.handleReset("itemDimension");
		},
		setDimensionTypeStatus(type) {
			let itemDimension = { ...this.itemDimension };
			itemDimension.type = type;
			this.itemDimension = itemDimension;
			this.setRuleInline(type);
			console.log("setDimensionTypeStatus", this.itemDimension);
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
		setRuleInline(type) {
			switch (type) {
				case "number":
					this.ruleInline = {
						maxNum: [
							{
								required: true,
								message: "请填写",
								trigger: "blur",
								type: "number"
							}
						],
						// isHalf: [
						// 	{
						// 		required: true,
						// 		message: "请选择",
						// 		trigger: "change"
						// 	}
						// ],
						evaluateName: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							},
							{
								type: "string",
								min: 2,
								message: "维度名称不能小于2个字符"
							},
							{
								type: "string",
								max: 24,
								message: "维度名称不能大于24个字符"
							}
						],
						type: [
							{
								required: true,
								message: "请选择",
								trigger: "change",
								type: "string"
							}
						]
					};
					break;
				case "redio":
					this.ruleInline = {
						// isRequired: [
						// 	{
						// 		required: true,
						// 		message: "请选择",
						// 		trigger: "change"
						// 	}
						// ],
						evaluateName: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							},
							{
								type: "string",
								min: 2,
								message: "维度名称不能小于2个字符"
							},
							{
								type: "string",
								max: 24,
								message: "维度名称不能大于24个字符"
							}
						],
						type: [
							{
								required: true,
								message: "请选择",
								trigger: "change",
								type: "string"
							}
						],
						value: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							}
						]
					};
					break;
				case "checkbox":
					this.ruleInline = {
						// isRequired: [
						// 	{
						// 		required: true,
						// 		message: "请选择",
						// 		trigger: "change"
						// 	}
						// ],
						evaluateName: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							},
							{
								type: "string",
								min: 2,
								message: "维度名称不能小于2个字符"
							},
							{
								type: "string",
								max: 24,
								message: "维度名称不能大于24个字符"
							}
						],
						type: [
							{
								required: true,
								message: "请选择",
								trigger: "change",
								type: "string"
							}
						],
						value: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							}
						]
					};
					break;
				case "text":
					this.ruleInline = {
						maxNum: [
							{
								required: true,
								message: "请填写",
								trigger: "blur",
								type: "number"
							}
						],
						// isRequired: [
						// 	{
						// 		required: true,
						// 		message: "请选择",
						// 		trigger: "change"
						// 	}
						// ],
						evaluateName: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							},
							{
								type: "string",
								min: 2,
								message: "维度名称不能小于2个字符"
							},
							{
								type: "string",
								max: 24,
								message: "维度名称不能大于24个字符"
							}
						],
						type: [
							{
								required: true,
								message: "请选择",
								trigger: "change",
								type: "string"
							}
						],
						value: [
							{
								required: true,
								message: "请填写",
								trigger: "blur"
							}
						]
					};
					break;
			}
		}
	},
	created() {
		this.getTemplateInfo();
		this.getDimensionList();
		this.setDimensionTypeStatus("text");
	},
	mounted() {}
};
</script>
