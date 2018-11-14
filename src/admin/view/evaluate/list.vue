<template>
	<div>
		<Card>
			<div class="search-con search-con-top">
				<Select v-model="params.select" class="search-col">
					<Option
						v-for="item in getColumns"
						:key="`search-col-${item.key}`"
						:value="item.key"
					>{{ item.title }}</Option>
				</Select>
				<Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
					<span></span>
				</Input>
				<Button class="search-btn" type="primary">
					<Icon type="search"/>&nbsp;&nbsp;搜索
				</Button>
				<Button class="search-btn" type="success">
					<Icon type="search"/>&nbsp;&nbsp;添加模板
				</Button>
			</div>
			<div>
				<Table :columns="columns" :data="templateList"></Table>
			</div>
			<Page :total="params.count"></Page>
		</Card>
	</div>
</template>

<script>
import { getTemplateListData } from "@/api/admin/evaluate/template";
import "./list.less";
export default {
	mounted() {
		this.getTemplateList();
	},
	computed: {
		getColumns() {
			let arr = [];
			this.columns.forEach(element => {
				if (element.keyWord) {
					arr.push(element);
				}
			});
			return arr;
		}
	},
	data() {
		return {
			params: {
				pageNum: 1,
				pageSize: 2,
				select: 1,
				keyword: "",
				count: 0
			},
			columns: [
				{
					title: "模板标题",
					keyWord: true,
					key: "templateTitle"
				},
				{ title: "模板ID", key: "id" },
				{ title: "状态", keyWord: true, key: "status" },
				{
					title: "操作",
					key: "handle",
					options: ["delete"],
					button: [
						(h, params, vm) => {
							return h(
								"Poptip",
								{
									props: {
										confirm: true,
										title: "你确定要删除吗?"
									},
									on: {
										"on-ok": () => {
											vm.$emit("on-delete", params);
											vm.$emit(
												"input",
												params.tableData.filter(
													(item, index) =>
														index !==
														params.row.initRowIndex
												)
											);
										}
									}
								},
								[h("Button", "自定义删除")]
							);
						}
					]
				}
			],
			templateList: []
		};
	},
	methods: {
		async getTemplateList() {
			let res = await getTemplateListData({ ...this.params });
			console.log("getTemplateList", res);
			if (res.status !== 200) {
				console.error("getTemplateList", res.msg);
				return;
			}

			this.params.count = res.data.count || 0;
			this.templateList = res.data.list;
		}
	}
};
</script>

<style>
</style>
