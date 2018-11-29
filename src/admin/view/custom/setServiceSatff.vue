<template>
    <div>
        <Modal v-model="setStaffModal" :loading="loading" :mask-closable="false" title="所属设置" @on-ok="edit()">
            <Card class="md-card">
                <table class="tab">
                    <tr>
                        <td class="title">新开业务员：</td>
                        <td>
                            <department class="search-input" width="200" :get-user-info="getUserInfo" :loading-user="true" v-model="setServiceStaff.xinkai"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">续开业务员：</td>
                        <td>
                            <department class="search-input" width="200" :get-user-info="getUserInfo" :loading-user="true" v-model="setServiceStaff.xukai"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">运营人员：</td>
                        <td>
                            <department class="search-input" width="200" :get-user-info="getUserInfo" :loading-user="true" v-model="setServiceStaff.yunying"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">美工：</td>
                        <td>
                            <department class="search-input" width="200" :get-user-info="getUserInfo" :loading-user="true" v-model="setServiceStaff.meigong"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">旺旺客服：</td>
                        <td>
                            <department class="search-input" width="200" :get-user-info="getUserInfo" :loading-user="true" v-model="setServiceStaff.wangwang"></department>
                        </td>
                    </tr>
                </table>
            </Card>
        </Modal>
    </div>
</template>
<script>
import department from "_c/public/department";
export default {
	/**
	 * @param {value} 双向绑定组件开关
	 * @param {data} 默认显示的数据，非必须
	 * @param {ids} 修改的数据id
	 */
	props: ["value", "data", "ids"],
	components: { department },
	created() {
		if (this.data) {
			// 设置默认值
			// 运营人员标签id(0:未知;1:新开;2:续开;3:运营;4:美工;5:旺旺客服;)
			let type = this.data.staffTagId;
			let arr = ["", "xinkai", "xukai", "yunying", "meigong", "wangwang"];
			this.setServiceStaff[arr[type]] = [];
		}
	},
	data() {
		return {
			loading: true,
			// 设置业务员
			setServiceStaff: {
				xinkai: [],
				xukai: [],
				meigong: [],
				wangwang: [],
				yunying: []
			}
		};
	},
	computed: {
		// 双向绑定
		setStaffModal: {
			get: function() {
				return this.value;
			},
			set: function(val) {
				this.$emit("input", val);
			}
		}
	},
	methods: {
		getUserInfo(data) {
			console.log(data);
		},
		edit() {
			this.loading = false;
			this.modal = false;
		}
	}
};
</script>
