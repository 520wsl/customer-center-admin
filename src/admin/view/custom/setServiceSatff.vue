<template>
    <div>
        <Modal v-model="setStaffModal" :loading="loading" :mask-closable="false" title="所属设置" @on-ok="edit()">
            <Card class="md-card">
                <table class="tab">
                    <tr>
                        <td class="title">新开业务员：</td>
                        <td>
                            <department class="search-input" width="200" :loading-user="true" v-model="setServiceStaff.xinkai"></department>
                            {{setServiceStaff.xinkai}}
                        </td>
                    </tr>
                    <tr>
                        <td class="title">续开业务员：</td>
                        <td>
                            <department class="search-input" width="200" :loading-user="true" v-model="setServiceStaff.xukai"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">运营人员：</td>
                        <td>
                            <department class="search-input" width="200" :loading-user="true" v-model="setServiceStaff.yunying"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">美工：</td>
                        <td>
                            <department class="search-input" width="200" :loading-user="true" v-model="setServiceStaff.meigong"></department>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">旺旺客服：</td>
                        <td>
                            <department class="search-input" width="200" :loading-user="true" v-model="setServiceStaff.wangwang"></department>
                        </td>
                    </tr>
                </table>
            </Card>
        </Modal>
    </div>
</template>
<script>
// 该该功能与画冰对接，现该功能前端已注释
import department from "_c/public/department";
import { setcompanystaff } from "@/api/admin/custom/custom";
import { getValueOfObj } from "@/libs/util/index";
import { mapState } from "vuex";
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
		},
		...mapState({
			staffTagIdObj: state => state.custom.staffTagIdObj,
			staffTagIdList: state => state.custom.staffTagIdList
		})
	},

	methods: {
		edit() {
			// 没有可以设置的id则不执行下方代码
			if (this.ids.length <= 0) return;
			// 实际需要设置的值
			let staffList = [];
			// 考虑到历史数据与现在组件回填的格式不匹配（仅对已设置的进行操作）
			for (let i in this.setServiceStaff) {
				// 获取当前项（级联）选中的值（Array）长度
				let arrLen = this.setServiceStaff[i].length;
				let staffSixiId = this.setServiceStaff[i][arrLen - 1]; // 级联选中的人员id
				let departmentId = this.setServiceStaff[i][arrLen - 2]; // 级联选中的最底层的部门id
				let departmentAll = this.setServiceStaff[i]; // 级联选中的的值
				let staffTagId = getValueOfObj({
					arr: this.staffTagIdObj,
					content: i,
					key: "alias",
					value: "key"
				}); // 返回对应的类型
				// 判断条件为空数组时不处理
				this.setServiceStaff[i] &&
					this.setServiceStaff[i].length > 0 &&
					staffList.push({
						staffSixiId: staffSixiId,
						// staffName: "", // 该字段暂时无法获取（员工名称）
						// staffAlias: "", // 传空
						staffTagId: staffTagId,
						departmentId: departmentId, // 最底层的部门
						departmentAll: departmentAll // 级联选中的的值
					});
			}
			// 按照接口组合数据
			let staffSetListFormList = this.ids.map(el => {
				return {
					companySixiId: el,
					staffList
				};
			});
			let data = { staffSetListFormList };
			setcompanystaff(data);
			this.loading = false;
			this.modal = false;
		}
	}
};
</script>
