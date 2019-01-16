<template>
    <Modal v-model="modal" :footer-hide="true" :mask-closable="false" width="900" @on-cancel="cancel" :title="isAdd?'批量添加旺旺登录人':'设置旺旺登录人'">
        <Card class="md-card">
            <div class="search">
                <span class="search-item">名称：</span>
                <Input class="search-item" style="width:200px;margin-right:20px;" v-model="params.name"></Input>
                <Button class="search-item" type="primary" @click="search">搜索</Button>
            </div>
            <div class="search">
                <Button v-if="isAdd" type="primary" style="margin-right:10px;" @click="checkSelect">查看选中</Button>
                <Button v-else type="primary" style="margin-right:10px;" @click="checkSelect">查看已设置</Button>
                <Button type="primary" style="margin-right:10px;" @click="checkAll">查看全部</Button>
            </div>
            <Table :loading="loading" :columns="columns" :data="list" @on-select="select" @on-select-cancel="selectCancel" @on-select-all="selectAll" @on-select-all-cancel="selectAllCancel"></Table>
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
            <!-- <div style="text-align:right;">
                <Button type="primary" style="margin-right:10px;" @click="addPerson">确认</Button>
                <Button type="default" style="margin-right:10px;" @click="cancel">取消</Button>
            </div> -->
        </Card>
    </Modal>
</template>
<script>
import Page from "_c/admin/page";
import { hidePhone } from "@/libs/util/index";
import { addAliStaff, delAliStaff, getSelectedAliStaffList } from "@/api/admin/wwOpensManager/setPerson";
import { getAliStaffList } from "@/api/admin/wwOpensManager/searchPerson"
export default {
    props: {
        peopleList: {
            type: Array,
            default: () => {
                return []
            }
        },
        showModal: {
            type: Boolean,
            default: () => {
                return false
            }
        },
        companyList: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            modal: this.showModal,
            loading: false,
            params: {
                pageNum: 1,
                pageSize: 10,
                count: 0,
                name: ''
            },
            type: '',
            selection: [],
            oldSelection: [],
            list: [],
            columns: [
                {
                    type: 'selection',
                    width: 50,
                    align: 'center'
                },
                {
                    key: 'staffName',
                    title: "名称",
                    align: 'center'
                },
                {
                    key: 'mobile',
                    title: "手机号",
                    align: 'center',
                    render: (h, params) => {
                        return h("span", {}, hidePhone(params.row.mobile))
                    }
                },
                {
                    key: 'department',
                    title: "部门",
                    align: 'center'
                }
            ]
        }
    },
    computed: {
        isAdd: function () {
            let bool = false;
            if (this.peopleList.length == 0) {
                bool = true
            }
            return bool;
        }
    },
    components: {
        Page
    },
    mounted() {
        this.type = "";
        this.getList();
    },
    watch: {
        "modal": (newVal, oldVal) => {
            console.log(newVal, oldVal)
            if (newVal) {
                this.modal = newVal;
                this.type = "";
                this.getList();
            }
        }
    },
    methods: {
        addPerson() {
            if (this.selection.length == 0) {
                return this.$Notice.warning({ title: "请选择人员！" });
            }
            this.loading = true;
            let params = {
                companyList: this.companyList,
                peopleList: this.selection
            }
            // 批量添加
            addAliStaff(params).then(res => {
                this.loading = false;
                if (res.status != 200) {
                    return this.$Notice.error({ title: res.msg });
                }
                this.$Notice.success({ title: res.msg });
                this.selection = [];
            }).catch(error => {
                this.loading = false;
                this.$Notice.error({ title: error.message });
            })
        },
        delPerson() {
            if (this.selection.length == 0) {
                return this.$Notice.warning({ title: "请选择人员！" });
            }
            this.loading = true;
            let params = {
                companyList: this.companyList,
                peopleList: this.selection
            }
            // 批量删除
            delAliStaff(params).then(res => {
                this.loading = false;
                if (res.status != 200) {
                    return this.$Notice.error({ title: res.msg });
                }
                this.$Notice.success({ title: res.msg });
                this.selection = [];
            }).catch(error => {
                this.loading = false;
                this.$Notice.error({ title: error.message });
            })
        },
        emitClose() {
            this.$emit("closeModal", { modal: false })
        },
        // 取消关闭弹窗
        cancel() {
            this.emitClose();
            this.modal = false;
        },
        // 查看选中/查看已设置
        checkSelect() {
            // if (this.type == "checkOld") {
            //     let arr =[];
            //     arr.concat()
            //     return;
            // }
            // this.loading = true;
            // this.params.pageNum = 1;
            // this.type = "checkOld"
            // this.params.count = this.selection.length;
            // this.selection.forEach(item => {
            //     item._checked = true;
            // });
            // this.oldSelection = JSON.parse(JSON.stringify(this.selection));
            // this.list = this.getShowList(1, this.params.pageSize, this.selection);
            // this.loading = false;
            this.params.pageNum = 1;
            this.params.name = "";
            this.type = "checkSelect";
            this.getSelectList();
        },
        // 查看已经添加设置
        getSelectList() {
            this.loading = true;
            let params = {
                isPage: true,
                companyList: this.companyList,
                ...this.params
            }
            getSelectedAliStaffList(params).then(res => {
                this.loading = false;
                if (res.status != 200) {
                    return this.$Notice.error({ title: res.msg });
                }
                let list = res.data.list || [];
                list.forEach(item => {
                    item._checked = true;
                })
                this.list = list;
                this.params.count = res.data.total || 0;
            }).catch(error => {
                this.loading = false;
                this.$Notice.error({ title: error.message });
            })
        },
        // getShowList(pageNum, pageSize, list) {
        //     let arr = [];
        //     for (let i = 0; i < pageSize; i++) {
        //         if (list[i + (pageNum - 1) * pageSize]) {
        //             arr.push(list[i + (pageNum - 1) * pageSize]);
        //         }
        //     }
        //     return arr;
        // },
        // 查看全部
        checkAll() {
            this.type = "";
            this.params.pageNum = 1;
            this.params.name = "";
            this.getList();
        },
        // 设置分页页码
        pageCurrentChange(pageNum) {
            this.params.pageNum = pageNum;
            if (this.type == "checkSelect") {
                this.getSelectList();
                return;
            }
            this.getList();
        },
        // 设置分页大小
        pageSizeChange(pageSize) {
            this.params.pageNum = 1;
            this.params.pageSize = pageSize;
            if (this.type == "checkSelect") {
                this.getSelectList();
                return;
            }
            this.getList();
        },
        // 搜索
        search() {
            console.log(this.type)
            this.params.pageNum = 1;
            if (this.type == "checkSelect") {
                this.getSelectList();
                return;
            }
            this.getList();
        },
        // 获取列表
        getList() {
            this.loading = true;
            let param = {
                companyList: this.companyList,
                isPage: false
            }
            getSelectedAliStaffList(param).then(result => {
                if (result.status != 200) {
                    return this.$Notice.error({ title: result.msg });
                }
                let selectedList = result.data.list || [];

                let params = {
                    ...this.params
                }
                console.log(12)
                getAliStaffList(params).then(res => {
                    this.loading = false;
                    if (res.status != 200) {
                        return this.$Notice.error({ title: res.msg });
                    }
                    let list = res.data.list || [];
                    // 将已经选中的数据回填
                    list.forEach(item1 => {
                        selectedList.forEach(item2 => {
                            if (item1.staffSixiId == item2.staffSixiId) {
                                item1._checked = true;
                            }
                        })
                    })

                    this.list = list;
                    this.params.count = res.data.count || 0;
                }).catch(error => {
                    this.loading = false;
                    this.$Notice.error({ title: error.message });
                })

            }).catch(error => {
                this.loading = false;
                this.$Notice.error({ title: error.message });
            })
        },
        select(selection, row) {
            this.selection = [row];
            this.addPerson();
        },
        selectCancel(selection, row) {
            this.selection = [row];
            this.delPerson();
        },
        selectAll(selection) {
            this.selection = JSON.parse(JSON.stringify(selection));
            this.addPerson();
        },
        selectAllCancel(selection) {
            this.selection = JSON.parse(JSON.stringify(this.list));
            this.delPerson();
        },
    }
}
</script>
<style scoped>
.search {
  margin: 20px 0;
}
.search .search-item {
  display: inline-block;
}
</style>
