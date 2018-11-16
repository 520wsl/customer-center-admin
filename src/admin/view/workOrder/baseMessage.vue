<template>
  <div>
    <Card class="md-card">
      <div slot="title">工单信息</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">客户信息</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">关联业务</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">客服记录</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">客户评价</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
  </div>
</template>

<script>
import tables from "_c/admin/md-tables";
export default {
	components: {
		tables
	},
	data() {
		return {
			workOrderInfo: [
				[
					{
						title: "工单编号：",
						value:
							"TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001TBDYY201806231001"
					},
					{
						title: "工单类型：",
						value: "TBDYY201806231001"
					},
					{
						title: "工单标题：",
						value: "TBDYY201806231001"
					}
				],
				[
					{
						title: "工单创建时间：",
						value: "TBDYY201806231001"
					},
					{
						title: "工单响应时间：",
						value: "TBDYY201806231001"
					},
					{
						title: "工单持续时间：",
						value: "TBDYY201806231001"
					}
				],
				[
					{
						title: "执行人：",
						value: "TBDYY201806231001"
					},
					{
						title: "参与者：",
						value: "TBDYY201806231001"
					},
					{
						title: "负责人：",
						value: "TBDYY201806231001"
					}
				]
			]
		};
	}
};
</script>
