<template>
    <div class="call" @click="callPhone()">
        <slot></slot>
    </div>
</template>
<script>
/**
 * 拨打电话
 * 传入需要拨打电话即可
 */
import { callPhoneAction } from "@/api/admin/callPhone/callPhone";
export default {
	// phone 要拨打的电话号码
	props: ["phone"],
	data() {
		return {};
	},
	methods: {
		async callPhone() {
			// 拨打确认
			this.$Modal.confirm({
				title: "拨号",
				content: "<p>" + "即将拨打客户电话号码，请确认" + "</p>",
				onOk: () => {
					let params = {
						phone: this.phone
					};
					callPhoneAction({ ...params });
				},
				onCancel: () => {}
			});
		}
	}
};
</script>
<style lang="less" scoped>
.call {
	display: inline-block;
}
</style>

