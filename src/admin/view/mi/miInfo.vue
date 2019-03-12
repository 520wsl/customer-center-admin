<template>
    <div>

        <Card class="md-card">
            <div slot="title">我的资料</div>
            <div slot="extra">
                <a
                        @click="synstaffinfoAction()"
                        href="javascript:;"
                        class="md-card-btn-info"
                >
                    <Icon type="ios-sync"></Icon>
                    同步信息
                </a>
            </div>
            <tables :data="miInfoData"></tables>
        </Card>
    </div>
</template>

<script>
    import tables from "_c/admin/md-tables";
    import {mapState, mapMutations, mapActions} from "vuex";
    import {synstaffinfo} from "@/api/admin/user/user"

    export default {
        name: "",
        data() {
            return {
                miInfoData: []
            }
        },
        components: {
            tables
        },
        mounted() {
            this.miInfo();
        },
        methods: {
            ...mapActions(["getUserInfo"]),
            synstaffinfoAction() {
                synstaffinfo().then(res => {
                    this.getUserInfo()
                    this.$Modal.success({
                        title: "同步信息",
                        content: "同步成功！"
                    });
                    setTimeout(() => {
                        this.miInfo()
                    }, 1000);

                }).catch(res => {
                    this.$Modal.error({
                        title: "同步信息",
                        content: res.msg
                    });
                })
            },
            miInfo() {
                let info = this.$store.state.user.userInfo
                console.log(info)
                let miInfo = [
                    [
                        {
                            title: "姓名：",
                            value: info.userName
                        },
                        {
                            title: "花名：",
                            value: info.extattr
                        }
                    ],
                    [
                        {
                            title: "所属部门：",
                            value: info.departmentName
                        },
                        {
                            title: "职务信息：",
                            value: info.position
                        }
                    ],
                    [
                        {
                            title: "手机号码：",
                            value: info.mobile
                        },
                        {
                            title: "邮箱：",
                            value: info.email
                        }
                    ]
                ];

                this.miInfoData = miInfo
            }
        }
    }
</script>

<style scoped>

</style>