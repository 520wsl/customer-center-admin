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
            <a href="#" slot="extra" class="md-card-btn-info" @click.prevent="addDimension">
                <Icon type="md-add"></Icon>添加维度
            </a>
            <Table :columns="dimensionColumns" :data="dimensionContent"></Table>
        </Card>
    </div>
</template>
<script>
import {
	setTemplateStatusType,
	getTemplateInfoData
} from "@/api/admin/evaluate/template";
import "./index.less";
export default {
	data() {
		return {
			addModelStatu: false,
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
					align: "evaluateName",
					key: "id"
				},
				{
					title: "类型",
					align: "evaluateType",
					key: "id"
				},
				{
					title: "满分",
					align: "maxNum",
					key: "templateTitle"
				},
				{
					title: "是否允许0.5分",
					align: "center",
					key: "isHalf"
				},
				{
					title: "是否必填",
					align: "isRequired",
					key: "templateTitle"
				},
				{
					title: "操作",
					key: "handle",
					render: (h, params) => {
						let btnGroup = [];
						let id = params.row.id;
						let status = params.row.status == 1 ? false : true;
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
											// this.$router.push({
											// 	name: "evaluate-info",
											// 	query: { id }
											// });
										}
									}
								},
								"编辑"
							)
						);
						if (!status) {
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
												// this.delTemplate({
												// 	id
												// });
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
						}
						return h("div", btnGroup);
					}
				}
			],
			dimensionContent: []
		};
	},
	methods: {
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
			this.dimensionContent = res.data.content || [];
		},
		addDimension() {
			this.addModelStatu = true;
		}
	},
	created() {
		this.getTemplateInfo();
	},
	mounted() {}
};
</script>
