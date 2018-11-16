<template>
    <div>
        <Card class="md-card" v-if="isShowStatus">
            <Steps :current="1" status="error">
                <Step
                    v-for="(item,index) in status.list"
                    :key="index"
                    :title="item.title"
                    :content="item.component"
                ></Step>
            </Steps>
        </Card>
        <Card class="md-card">
            <div slot="title">当前工单状态： 处理中</div>
            <div slot="extra">
                <div>
                    <a href="#" class="md-card-btn-warning">
                        <Icon type="md-hammer"></Icon>工单确认
                    </a>
                    <a href="#" class="md-card-btn-info">
                        <Icon type="md-create"></Icon>指派
                    </a>
                    <a href="#" class="md-card-btn-success">
                        <Icon type="md-checkmark"></Icon>设为完结
                    </a>
                </div>
            </div>
            <div class="btn-group">
                <ButtonGroup>
                    <Button type="info" ghost>基本信息</Button>
                    <Button type="info">服务信息</Button>
                </ButtonGroup>
            </div>
        </Card>

            <router-view></router-view>
    </div>
</template>

<script>
import "./index.less";
export default {
	computed: {
		isShowStatus() {
			return this.status.list.length > 0;
		}
	},
	data() {
		return {
			status: {
				list: [
					{
						title: "待处理",
						component: ""
					},
					{
						title: "处理中",
						component: ""
					},
					{
						title: "已完结",
						component: ""
					},
					{
						title: "已评价",
						component: ""
					}
				]
			}
		};
	}
};
</script>
