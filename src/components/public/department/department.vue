<template>
    <Cascader :style="{width:width+'px'}" :data="departmentData" :load-data="loadingUser?loadData:null" v-model="visible"></Cascader>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getUserData } from "@/api/admin/department/department";
export default {
    props: {
        value: {
            type: Array,
            default: () => {
                return []
            }
        },
        loadingUser: {
            type: Boolean,
            default: false
        },
        width: {
            type: [Number, String],
            default: 200
        },
        getUserInfo: {
            type: Function,
            default: () => {
                return {}
            }
        }
    },
    computed: {
        ...mapState({
            departmentData: state => {
                return state.department.departmentData || []
            }
        })
    },
    data() {
        return {
            visible: this.value
        }
    },
    methods: {
        async loadData(item, callback) {
            let userInfo = JSON.parse(JSON.stringify(await this.getUserList(item.value))) || [];
            item.children = userInfo;
            item.loading = false;
            callback();
            this.getUserInfo(userInfo);
        },
        async getUserList(departmentId) {
            let res = await getUserData({ departmentId });
            if (res.status == 200) {
                return [...res.data].map(item => {
                    return {
                        label: item.userName,
                        value: item.sixiId
                    }
                })
            }
        }
    },
    watch: {
        value: {
            deep: true,
            handler(val) {
                this.visible = val;
            }
        },
        visible(val) {
            console.log(val)
            this.$emit('input', val);
        },
    }
}
</script>
