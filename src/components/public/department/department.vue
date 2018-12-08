<template>
  <Cascader :style="{width:width+'px'}" :data="departmentData" filterable v-model="visible"></Cascader>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { getUserData, getDepartmentData, getUserDepartmentData } from "@/api/admin/department/department";
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
  },
  data() {
    return {
      visible: this.value,
      departmentData: []
    }
  },
  mounted() {
    this.getDepartmentData()
  },
  methods: {
    async getDepartmentData() {
      if (!this.loadingUser) {
        if (sessionStorage.departmentData) {
          this.departmentData = JSON.parse(sessionStorage.departmentData);
        } else {
          const list = await getDepartmentData() || [];
          sessionStorage.departmentData = JSON.stringify(list)
          this.departmentData = JSON.parse(sessionStorage.departmentData);
        }
      } else {
        if (sessionStorage.userDepartmentData) {
          this.departmentData = JSON.parse(sessionStorage.userDepartmentData);
        } else {
          const list = await getUserDepartmentData() || [];
          sessionStorage.userDepartmentData = JSON.stringify(list)
          this.departmentData = JSON.parse(sessionStorage.userDepartmentData);
        }
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
      this.$emit('input', val);
    },
  }
}
</script>
