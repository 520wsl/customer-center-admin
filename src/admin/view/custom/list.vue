<template>
    <div>
        <Card class="md-card">
            <p slot="title">客户列表</p>
            <div class="search-con search-con-top">
                <Select v-model="params.select" class="search-col">
                    <Option v-for="item in keyWordTypeData" :key="`search-col-${item.key}`" :value="item.key">{{
                        item.value }}
                    </Option>
                </Select>
                <Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
                <span></span>
                </Input>
                <div class="search-item">
                    <span>客户类型：</span>
                    <Select v-model="params.companyType" class="search-col">
                        <Option v-for="item in companyTypeList" :key="`search-col-${item.key}`" :value="item.key">{{
                            item.value }}
                        </Option>
                    </Select>
                </div>
                <div class="search-item">
                    <span>联系人：</span>
                    <Select v-model="params.binding" class="search-col">
                        <Option v-for="item in contactsList" :key="`search-col-${item.key}`" :value="item.key">{{
                            item.value }}
                        </Option>
                    </Select>
                </div>
                <div class="search-item">
                    <span>服务人员：</span>
                    <Department class="search-col" :loading-user="true" width="200"
                                v-model="params.customerIdList"></Department>
                </div>
                <div class="search-item">
                    <span>二维码：</span>
                    <Select v-model="params.sendCode" class="search-col">
                        <Option v-for="item in QRcodeList" :key="`search-col-${item.key}`" :value="item.key">{{
                            item.value }}
                        </Option>
                    </Select>
                </div>
                <Button @click="getlist" class="search-btn" type="primary">
                    <Icon type="search"/>&nbsp;&nbsp;搜索
                </Button>
            </div>
            <div>
                <Table :loading="loading" :columns="columns" :data="customList"
                       @on-selection-change="getids($event)"></Table>
                <!--注释批量设置人员-->
                <!-- <Button type="primary" @click="setStaffModal = true" style="margin-top:20px;">批量设置所属</Button> -->
            </div>
        </Card>
        <Card class="md-card">
            <!--注释批量设置人员-->
            <!-- <setServiceSatff v-model="setStaffModal" :ids="ids"></setServiceSatff> -->
            <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count"
                  @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
        </Card>
    </div>
</template>

<script>
    import Page from "_c/admin/page";
    import {getCustomerListDate} from "@/api/admin/custom/custom";
    import {mapState, mapActions} from "vuex";
    import {trim} from "@/libs/tools"
    // 注释批量设置人员
    // import setServiceSatff from "./setServiceSatff";
    import Department from "_c/public/department";
    import "./index.less";

    export default {
        data() {
            return {
                loading: false,
                // 批量设置开关
                setStaffModal: false,
                // 批量设置的开关
                ids: "",
                params: {
                    pageNum: 1,
                    pageSize: 10,
                    select: 1,
                    keyword: "",
                    count: 0,
                    binding: 0,
                    sendCode: -1,
                    companyType: -1,
                    customerId:'',
                    customerIdList: []
                },
                contactsList: [
                    {
                        key: -1,
                        value: "全部"
                    },
                    {
                        key: 0,
                        value: "未绑定"
                    },
                    {
                        key: 1,
                        value: "已绑定"
                    },
                ],
                QRcodeList: [
                    {
                        key: -1,
                        value: "全部"
                    },
                    {
                        key: 1,
                        value: "已发"
                    },
                    {
                        key: 0,
                        value: "未发"
                    },
                ],
                companyTypeList: [
                    {
                        key: -1,
                        value: "全部"
                    },
                    {
                        key: 1,
                        value: "在服"
                    },
                    {
                        key: 2,
                        value: "意向"
                    },
                    {
                        key: 3,
                        value: "停服"
                    },
                ],
                keyWordTypeData: [
                    {
                        key: 1,
                        value: "客户名称"
                    },
                    {
                        key: 2,
                        value: "店铺账号"
                    },
                    {
                        key: 3,
                        value: "手机号"
                    }
                ],
                columns: [
                    // {
                    //     type: "selection"
                    // },
                    {
                        title: "客户名称",
                        keyWord: true,
                        align: "center",
                        key: "name",
                        render: (h, params) => {
                            let customerName = "";
                            if (params.row.name) {
                                customerName = params.row.name.slice(0, 2) + "***" + params.row.name.slice(5);
                            }
                            return h(
                                "span",
                                {
                                    attrs: {
                                        style: "color:#72ACE3;cursor:pointer;"
                                    },
                                    on: {
                                        click: () => {
                                            let name = "custom-info";
                                            if (this.$route.name == "wx-custom-list") {
                                                name = "wx-custom-info"
                                            }
                                            this.$router.push({
                                                name,
                                                query: {
                                                    sixiId: params.row.sixiId,
                                                    userName: params.row.name
                                                }
                                            });
                                        }
                                    }
                                },
                                customerName
                            );
                        }
                    },
                    {
                        title: "店铺网址",
                        keyWord: true,
                        align: "center",
                        key: "url",
                        render: (h, params) => {
                            let url = params.row.url || "";
                            // 当url为空
                            if (url == "") {
                                return h("span", {}, "");
                            }
                            if (url.indexOf("http") == -1 && url != "") {
                                url = "http://" + url;
                            }
                            let firstIndex = url.indexOf("://") + 3;
                            let lastPointIndex = url.lastIndexOf(".") == -1 ? url.length : url.lastIndexOf(".");
                            let lastIndex = lastPointIndex;
                            if (url.lastIndexOf(".1688") != -1) {
                                lastIndex = url.lastIndexOf(".1688");
                            } else {
                                lastIndex = url.lastIndexOf(".com") == -1 ? lastPointIndex : url.lastIndexOf(".com");
                            }
                            let showUrl = url.slice(0, firstIndex) + "******" + url.slice(lastIndex)
                            return h(
                                "a",
                                {
                                    attrs: {
                                        href: url,
                                        target: "_blank",
                                        style: "color:#72ACE3",
                                        title: params.row.name
                                    }
                                },
                                showUrl
                            );
                        }
                    },
                    {
                        title: "店铺账号",
                        keyWord: true,
                        align: "center",
                        key: "account",
                        render: (h, params) => {
                            let account = ""
                            if (params.row.account) {
                                account = "****" + params.row.account.slice(4);
                            }
                            return h("div", {}, account);
                        }
                    },
                    {
                        title: "客户类型",
                        keyWord: true,
                        align: "center",
                        key: "companyType",
                        render: (h, params) => {
                            let companyType = params.row.companyType || "";
                            let sendCodeStatus = "";
                            this.companyTypeList.forEach(item => {
                                if (item.key == companyType) {
                                    sendCodeStatus = item.value;
                                }
                            })
                            return h("span", {}, sendCodeStatus);
                        }
                    },
                    {
                        title: "已绑联系人数",
                        keyWord: true,
                        align: "center",
                        key: "bindingNum",
                        render: (h, params) => {
                            return h("span", {attrs: {class: params.row.className}}, params.row.bindingNum);
                        }
                    },
                    {
                        title: "二维码",
                        keyWord: true,
                        align: "center",
                        key: "sendCode",
                        render: (h, params) => {
                            let sendCode = params.row.sendCode || "";
                            let sendCodeStatus = "";
                            this.QRcodeList.forEach(item => {
                                if (item.key == sendCode) {
                                    sendCodeStatus = item.value;
                                }
                            })
                            return h("span", {}, sendCodeStatus);
                        }
                    },
                    {
                        title: "服务人员",
                        keyWord: true,
                        align: "left",
                        width:180,
                        render: (h, params) => {
                            let btnGroup = []
                            for (let i = 0, hei = params.row.list.length; i < hei; i++) {
                                btnGroup.push(
                                    h(
                                        "div",
                                        {
                                            style: {
                                                margin: "5px"
                                            }
                                        },
                                        params.row.list[i]['staffName']+"("+params.row.list[i]['department']+")"
                                    )
                                );
                            }
                            return h("div", btnGroup);
                        }
                    },
                    {
                        title: "联系人微信",
                        keyWord: true,
                        align: "center",
                        key: "wechatNickNames",
                        render: (h, params) => {
                            let arr = params.row.wechatNickNames || [];
                            let nameArr = [];
                            if (arr.length > 2) {
                                nameArr = [
                                    h("div", {}, arr[0]),
                                    h("div", {}, arr[1]),
                                    h("div", {}, '...')
                                ];
                            } else if (arr.length == 0) {
                                nameArr = [h("div", {}, '/')];
                            } else {
                                arr.forEach(item => {
                                    nameArr.push(h("div", {}, item));
                                })
                            }
                            return h("div", {}, nameArr);
                        }
                    }
                ],
                customList: []
            };
        },
        // 注释批量设置人员
        // components: { Page, setServiceSatff },
        components: {Page, Department},
        computed: {
            ...mapState({
                operator: state => state.user.userInfo.sixiId
            })
        },
        mounted() {
            this.getlist();
        },
        methods: {
            getids(el) {
                this.ids = el.map(el2 => el2.id);
            },
            pageCurrentChange(num) {
                this.params.pageNum = num;
                this.getlist();
            },
            pageSizeChange(num) {
                this.params.pageSize = num;
                this.params.pageNum = 1;
                this.getlist();
            },
            getlist() {
                let params = {};
                params.pageSize = this.params.pageSize;
                params.pageNum = this.params.pageNum;
                params.mobile = "";
                params.account = "";
                params.companyName = "";
                // 目前先设置为当前登录人的四喜Id
                params.operator = this.$store.state.user.userInfo.sixiId || "";
                params.binding = this.params.binding;
                params.sendCode = this.params.sendCode;
                params.companyType = this.params.companyType;
                if (this.params.customerIdList.length > 0) {
                    params.customerId = this.params.customerIdList[this.params.customerIdList.length - 1]
                }
                this.params.keyword = trim(this.params.keyword);
                if (this.params.select == 1) {
                    params.companyName = this.params.keyword;
                } else if (this.params.select == 2) {
                    params.account = this.params.keyword;
                } else if (this.params.select == 3) {
                    params.mobile = this.params.keyword;
                }
                getCustomerListDate(params).then(res => {
                    if (res.status != 200) {
                        return this.$Notice.error({title: res.msg});
                    }
                    this.params.count = res.data.count || 0;
                    let list = res.data.list || [];
                    list.forEach(item => {
                        if ((item.bindingNum && item.bindingNum == 0) || !item.bindingNum) {
                            item.bindingNum = 0;
                            item.className = "red";
                        } else {
                            item.className = "";
                        }
                    })
                    this.customList = list;
                });
            }
        }
    };
</script>
