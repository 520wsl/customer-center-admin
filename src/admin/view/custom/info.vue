<template>
    <div>
        <Card class="md-card">
            <p slot="title">客户详情</p>
            <table class="tab">
                <tbody>
                    <tr>
                        <td class="title">公司名称：</td>
                        <td>{{info.name}}</td>
                        <td class="title">主营行业：</td>
                        <td>
                            <!-- 目前industry数组为空 -->
                            <div v-for="(item,index) in info.industry" :key="index">{{item}}</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">账号：</td>
                        <td>{{info.account}}</td>
                        <td rowspan="3" class="title">所属：</td>
                        <td rowspan="3">
                            <div
                                v-for="(item,index) in info.staffVos"
                                :key="index"
                                style="margin-bottom:10px"
                            >
                                {{staffTagIdList[item.staffTagId]}}： {{item.staffName}} ({{item.department}})
                                <!--注释批量设置人员-->
                                <!-- <Button v-if="info.staffVos.length == index+1" type="primary" size="small" @click="setStaff(index,item)" style="float:right">设置</Button> -->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="title">地区：</td>
                        <td>{{info.provinceName+" "+info.cityName}}</td>
                    </tr>
                    <tr>
                        <td class="title">店铺网址：</td>
                        <td>
                            <a :href="info.url" :title="info.name" target="_blank">{{info.url}}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- <div class="btn-group">
                <Button type="primary" class="md-card-btn-bind" @click="bindAccount()">绑定账号</Button>
            </div>-->
            <Tabs type="card" class="tabTable" v-model="bindOrderOrBillList">
                <TabPane label="已绑定账号" name="bindOrder">
                    <Button type="primary" style="margin:10px 0 30px;" v-if="isXuKai" @click="addContacts.bool = true;">新增联系人</Button>
                    <Table :columns="columns" :data="wechatBindVos" border></Table>
                </TabPane>
                <TabPane label="工单列表" name="billList">
                    <div class="search-con search-con-top">
                        <Input
                            v-model="billSerrchData.text"
                            class="search-col"
                            style="width:300px;display:inline-table"
                        >
                            <Select
                                v-model="billSerrchData.searchTextType"
                                slot="prepend"
                                style="width:130px"
                            >
                                <Option value="identifier">工单编号</Option>
                                <!--后端说无法实现，暂时注释,后端加字段后将该value该为后端文档上的字段即可-->
                                <!-- <Option value="2">客户手机号码</Option> -->
                            </Select>
                        </Input>
                        <Select v-model="billSerrchData.workType" class="search-col" slot="prepend">
                            <Option :value="-1">工单类型</Option>
                            <Option
                                v-for="(item,index) in searchWorkSheetType"
                                :key="index"
                                :value="item.key"
                            >{{item.value}}</Option>
                        </Select>
                        <Select
                            v-model="billSerrchData.handleType"
                            class="search-col"
                            slot="prepend"
                        >
                            <Option :value="-1">工单状态</Option>
                            <Option
                                v-for="(item,index) in searchStatusList"
                                :key="index"
                                :value="item.key"
                            >{{item.value}}</Option>
                        </Select>
                        <div class="prependTime">
                            <Select class="prepend" v-model="billSerrchData.timeType">
                                <Option :value="0">工单创建时间</Option>
                                <Option :value="1">工单结束时间</Option>
                            </Select>
                            <DatePicker
                                v-model="billSerrchData.startTime"
                                type="date"
                                class="search-col ivu-date-border"
                            ></DatePicker>
                            <DatePicker
                                v-model="billSerrchData.endTime"
                                type="date"
                                class="search-col"
                            ></DatePicker>
                        </div>
                        <div class="search-btn flex-right">
                            <Button @click="search()" type="primary">搜索</Button>
                        </div>
                    </div>
                    <Table
                        :columns="billColumns"
                        :data="workOrderList"
                        border
                        style="margin-left:1px"
                    ></Table>
                    <page
                        :pageNum="billSerrchData.pageNum"
                        :pageSize="billSerrchData.pageSize"
                        :count="billSerrchData.count"
                        @pageCurrentChange="pageCurrentChange"
                        @pageSizeChange="pageSizeChange"
                        style="margin-top:10px"
                    ></page>
                </TabPane>
            </Tabs>
        </Card>
        <!--注释批量设置人员-->
        <!-- <setServiceSatff v-model="setStaffModal" :data="setServiceStaffData" :ids="[this.params.sixiId]"></setServiceSatff> -->
        <Modal
            v-model="bindModal"
            title="绑定微信账号"
            :footer-hide="true"
            width="400px;"
            @on-cancel="getInfo"
        >
            <Card>
                <p>请客户用微信扫该二维码绑定，二维码有效期2分钟</p>
                <div class="qr-code">
                    <img v-if="qrData.codeUrl" :src="qrData.codeUrl" alt="微信二维码" title="微信二维码">
                    <p v-else>二维码</p>
                </div>
                <div class="qr-code-btn">
                    <Button @click="getQrcode">
                        <Icon type="md-sync"/>刷新二维码
                    </Button>
                </div>
            </Card>
        </Modal>
        <Modal v-model="addContacts.bool" @on-ok="addContactsNumber()" :loading="addContacts.loading" :mask-closable="false" title="新增">
            <Card class="md-card">
                <table class="tab">
                    <tbody>
                        <tr>
                            <td class="title">称呼:</td>
                            <td>
                                <Input class="wid" v-model="addContacts.callName"><span></span></Input>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">性别:</td>
                            <td>
                                <RadioGroup v-model="addContacts.sex">
                                    <Radio :label="1">{{getSexValue(1)}}</Radio>
                                    <Radio :label="2">{{getSexValue(2)}}</Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">角色:</td>
                            <td>
                                <Select class="wid" v-model="addContacts.role">
                                    <Option :value="1">老板</Option>
                                    <Option :value="2">老板娘</Option>
                                    <Option :value="3">经理</Option>
                                    <Option :value="4">业务员</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr>
                            <td class="title">手机号:</td>
                            <td>
                                <Input class="wid" v-model="addContacts.mobile" maxlength="11"><span></span></Input>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </Modal>
    </div>
</template>
<script>
import "./index.less";
import {
    getCustomerInfoData,
    setWechatUntied,
    updateBindInfo
} from "@/api/admin/custom/custom";
import {
    workSheet,
    getWorkcustomerListData
} from "@/api/admin/workSheet/workSheet";
import Page from "_c/admin/page";
import { getQRCodeUrl } from "@/api/admin/wechatProxy/qrCode";
import { hidePhone } from "@/libs/util/index";
import { mapState, mapActions } from "vuex";
import { formatInitTime, startTime, endTime } from "@/libs/util/time";
import callPhone from "_c/public/callPhone";
import operation from "./operation";
// <!--注释批量设置人员-->
// import setServiceSatff from "./setServiceSatff";
// import { getValueOfObj } from "@/libs/util/index";
import { getSexValue } from "@/libs/util";
export default {
    //<!--注释批量设置人员-->
    // components: { operation, Page, callPhone, setServiceSatff }, //eslint-disable-line
    components: { operation, Page, callPhone }, //eslint-disable-line
    data() {
        return {
            bindOrderOrBillList: "bindOrder", // "billList", //
            bindModal: false,
            addContacts:{
                loading: true,
                bool: false,
                callName: "",
                sex: 0,
                role: 1,
                mobile: ""
            },
            //<!--注释批量设置人员-->
            setStaffModal: false,
            // 员工信息

            //<!--注释批量设置人员-->
            // setServiceStaffData: {},
            columns: [
                {
                    title: "称呼",
                    key: "callName"
                },
                {
                    title: "角色",
                    //0:未知;1:老板;2:老板娘;3:经理;4:业务员;
                    key: "role",
                    render: (h, params) => {
                        return h("span", this.roleList[params.row.role]);
                    }
                },
                {
                    title: "微信昵称",
                    key: "wechatNickname",
                    render: (h, params) => {
                        if (params.row.wechatNickname) {
                            return h(
                                "div",
                                {
                                    style: {
                                        display: "flex",
                                        "align-items": "center"
                                    }
                                },
                                [
                                    h("img", {
                                        domProps: {
                                            src:
                                                params.row.wechatAvatar ||
                                                this.$store.user.state
                                                    .avatorImgPath,
                                            title: ""
                                        },
                                        style: {
                                            width: "40px"
                                        }
                                    }),
                                    h(
                                        "span",
                                        {
                                            style: {
                                                "margin-left": "20px"
                                            }
                                        },
                                        params.row.wechatNickname
                                    )
                                ]
                            );
                        }else{
                            return h('div',{
                                attrs:{
                                    style: "color:#2d8cf0;cursor:pointer;"
                                },
                                on:{
                                    click:()=>{
                                        this.bindAccount(params.row);
                                    }
                                }
                            },"绑定微信")
                        }
                    }
                },
                {
                    title: "手机号",
                    key: "角色",
                    render: (h, params) => {
                        if(!params.row.mobile) return;
                        return h("div", [
                            h("span", hidePhone(params.row.mobile)),
                            h(
                                callPhone,
                                {
                                    style: {
                                        "margin-left": "20px",
                                        color: "#2d8cf0",
                                        cursor: "pointer"
                                    },
                                    props: {
                                        phone: params.row.mobile
                                    }
                                },
                                "呼叫"
                            )
                        ]);
                    }
                },
                {
                    title: "操作",
                    render: (h, params) => {
                        let bool = params.row.wechatNickname !== null && params.row.wechatNickname !== undefined && params.row.wechatNickname !== '';
                        console.log(this.info.wechatBindVos);
                        return h(operation, {
                            props: {
                                row: params.row,
                                companySixiId: this.params.sixiId,
                                isXuKai: this.isXuKai,
                                isShow: bool
                            },
                            on: {
                                callFun: () => {
                                    this.getInfo();
                                }
                                // bindAccount: data => {
                                //     console.log("customerSixiId", data);
                                //     this.bindAccount(data.customerSixiId);
                                // }
                            }
                        });                       
                    }
                }
            ],
            // 已绑定账号列表
            wechatBindVos: [],
            billSerrchData: {
                searchTextType: "identifier", // 工单编号 or 客户手机号码
                text: "", // 关键词
                handleType: -1, // 工单类型
                workType: -1, // 工单状态
                timeType: 0, // 工单创建时间 or 结束时间
                startTime: "", // 工单开始时间
                endTime: "", // 工单结束时间,
                // 分页参数
                pageNum: 1,
                pageSize: 10,
                count: 0
            },
            // 工单列表
            billColumns: [
                {
                    title: "工单编号",
                    align: "center",
                    key: "identifier"
                },
                {
                    title: "类型",
                    align: "center",
                    render: (h, params) => {
                        const typelist = this.workSheetType.filter(item => {
                            return item.key == params.row.workType;
                        });
                        if (typelist.length > 0) {
                            return h("span", typelist[0]["value"]);
                        } else {
                            return h("span", "");
                        }
                    }
                },
                // {
                //     title: "用户手机号码",
                //     key: "角色",
                //     align: "center",
                //     render: (h, params) => {
                //         return h("span", hidePhone("12345674567"));
                //     }
                // },
                {
                    title: "微信昵称",
                    align: "center",
                    key: "wechatNickname"
                },
                {
                    title: "创建时间",
                    key: "startTime",
                    align: "center",
                    render: (h, params) => {
                        const format = "YYYY-MM-DD HH:mm:ss";
                        const ele = params.row.startTime
                            ? formatInitTime(params.row.startTime, format)
                            : "";
                        return h("span", ele);
                    }
                },
                {
                    title: "结束时间",
                    key: "finishTime",
                    align: "center",
                    render: (h, params) => {
                        const format = "YYYY-MM-DD HH:mm:ss";
                        const ele = params.row.finishTime
                            ? formatInitTime(params.row.finishTime, format)
                            : "";
                        return h("span", ele);
                    }
                },
                {
                    title: "持续时间",
                    align: "center",
                    key: "durationStr"
                    // render: (h, params) => {
                    //     return h(
                    //         "span",
                    //         !params.row.hourSum
                    //             ? 0 + "h"
                    //             : params.row.hourSum + "h"
                    //     );
                    // }
                },
                {
                    title: "响应时间",
                    align: "center",
                    key: "responseStr"
                    // render: (h, params) => {
                    //     return h(
                    //         "span",
                    //         !params.row.responseTime
                    //             ? 0 + "h"
                    //             : params.row.responseTime + "h"
                    //     );
                    // }
                },
                {
                    title: "状态",
                    align: "center",
                    render: (h, params) => {
                        const statusList = this.statusList.filter(item => {
                            return item.key == params.row.type;
                        });
                        if (statusList.length > 0) {
                            if (params.row.type == 1) {
                                return h(
                                    "span",
                                    { style: { color: "red" } },
                                    statusList[0]["value"]
                                );
                            }
                            return h("span", statusList[0]["value"]);
                        } else {
                            return h("span", "");
                        }
                    }
                },
                {
                    title: "新消息",
                    render: (h, params) => {
                        if (!params.row.isRead) {
                            return h("span", "有");
                        } else {
                            return h("span", "无");
                        }
                    }
                },
                {
                    title: "责任人",
                    align: "center",
                    render: (h, params) => {
                        const user = params.row.userVo || {};
                        const name = user.userName || "";
                        const departmentName = user.departmentName
                            ? "(" + user.departmentName + ")"
                            : "";
                        return h("span", name + departmentName);
                    }
                },
                {
                    title: "操作",
                    align: "center",
                    render: (h, params) => {
                        return h(
                            "span",
                            {
                                style: {
                                    color: "#2d8cf0",
                                    cursor: "pointer"
                                },
                                on: {
                                    click: () => {
                                        let name = "workOrder-info-base";
                                        if(this.$route.name == "wx-custom-info"){
                                            name = "wx-workOrder-info-base"
                                        }
                                        this.$router.push({    
                                            name,
                                            query: {
                                                workSheetId: params.row.id,
                                                identifier:
                                                    params.row.identifier
                                            }
                                        });
                                    }
                                }
                            },
                            "查看工单"
                        );
                    }
                }
            ],
            customList: [],
            workOrderList: [],
            info: {
                name: "",
                account: "",
                industry: "",
                provinceName: "",
                cityName: "",
                url: ""
            },
            params: {
                sixiId: "",
                type: "BINDING_PHONE"
            },
            qrData: {}
        };
    },
    computed: {
        ...mapState({
            searchWorkSheetType: state => {
                return [...state.workSheet.workSheetType].filter(item => {
                    return item.key !== 0;
                });
            },
            searchStatusList: state => {
                return [...state.workSheet.workSheetHandleType].filter(item => {
                    return item.key !== 1;
                });
            },
            workSheetType: state => state.workSheet.workSheetType,
            statusList: state => state.workSheet.workSheetHandleType,
            roleList: state => state.custom.roleList,
            staffTagIdObj: state => state.custom.staffTagIdObj,
            staffTagIdList: state => state.custom.staffTagIdList,
            operator: state => state.user.userInfo.sixiId
        }),
        // 判断当前登录的人员是否为续开人员
        isXuKai:function() {
            // let arr = ["16", "36", "71", "121", "151", "158", "172", "173", "175"];
            // let departmentId = this.$store.state.user.userInfo.department || "";
            let arr = this.info && this.info.staffVos || [];
            let staffSixiId = this.$store.state.user.sixiId || '';
            let bool = false;
            arr.forEach(item=>{
                if(item.staffSixiId == staffSixiId && item.staffTagId == 2){
                    bool = true;
                }
            })
            return bool;
        }
    },
    methods: {
        getSexValue(type) {
            return getSexValue(type);
        },
        // 新增联系人
        addContactsNumber() {
            if(this.addContacts.callName == ""){
                this.$Modal.error({
                    title: "提示",
                    content: "称呼不可为空！"
                });
                this.addContacts.loading = false;
                return;
            }
            if (!(/^\d{11}$/.test(this.addContacts.mobile))) {
                this.$Modal.error({
                    title: "提示",
                    content: '请输入11位手机号'
                });
                this.addContacts.loading = false;
                return;
            }
            let param = {
                sex: this.addContacts.sex,
                mobile: this.addContacts.mobile,
                role: this.addContacts.role,
                id: null,
                companySixiId: this.$route.query.sixiId,
                deletedAt: "",
                callName: this.addContacts.callName,
                operator: this.operator,
                customerSixiId: ""
            }
            updateBindInfo(param).then(
                res => {
                    if (res.status !== 200) {
                        this.$Modal.error({
                            title: "提示",
                            content: res.msg
                        });
                        return;
                    }
                    this.addContacts.loading = false;
                    this.addContacts.bool = false;
                    this.getInfo();
                },
                error => {
                    this.addContacts.loading = false;
                    this.addContacts.bool = false;
                }
            );
        },
        // 绑定微信
        bindAccount(row) {
            this.bindModal = true;
            this.getQrcode(row);
        },
        getQrcode(row) {
            console.log("row", row)
            getQRCodeUrl({
                regId: row.id,
                type: "BINDING_PHONE"
            }).then(res => {
                if (res.status != 200) {
                    return this.$Message.error({
                        content: "二维码获取失败，请稍后再试！"
                    });
                }
                this.qrData = res.data;
                this.getInfo();
            });
        },
        getInfo() {
            getCustomerInfoData(this.params).then(res => {
                if (res.status != 200) {
                    return this.$Notice.error({ title: res.msg });
                }
                let obj = {
                    wechatNickName: res.data.wechatNickName,
                    mobile: res.data.mobile
                };
                if (res.data.wechatNickName == "" && res.data.openId == "") {
                    this.customList = [];
                } else {
                    this.customList = [obj];
                }
                this.info = res.data;
                this.info.provinceName = res.data.provinceName || "";
                this.info.cityName = res.data.cityName || "";
                // 已绑定信息
                this.wechatBindVos = res.data.wechatBindVos;
                // this.wechatBindVos = [
                // 	{
                // 		mobile: "15557151779",
                // 		callName: "王先生",
                // 		customerSixiId: "1182862037307360255",
                // 		role: 1,
                // 		sex: 0,
                // 		wechatAvatar: "wechatAvatar",
                // 		wechatNickname: "wechatNickName"
                // 	}
                // ];
            });
        },
        unBind() {
            // console.log(this.info.openId);
            setWechatUntied({ openId: this.info.openId }).then(res => {
                if (res.status != 200) {
                    return this.$Message.error({
                        content: res.msg
                    });
                }
                this.getInfo();
            });
        },
        search() {
            this.billSerrchData.pageNum = 1;
            this.getList();
        },
        // 查询数据 分页页码重置
        sleectTemplateList(pageNum) {
            this.billSerrchData.pageNum = pageNum;
            this.getList();
        },
        // 设置分页页码
        pageCurrentChange(pageNum) {
            this.sleectTemplateList(pageNum);
        },
        // 设置分页大小
        pageSizeChange(pageSize) {
            this.billSerrchData.pageSize = pageSize;
            this.sleectTemplateList(1);
        },
        async getList() {
            // let data = {};
            let data = {
                ...this.billSerrchData,
                startTime: this.billSerrchData.startTime
                    ? startTime(this.billSerrchData.startTime, "x")
                    : "",
                endTime: this.billSerrchData.endTime
                    ? endTime(this.billSerrchData.endTime, "x")
                    : ""
            };
            data[data.searchTextType] = data.text;
            data.companyId = this.params.sixiId;
            // 需要处理该对象，时间类型，时间，搜索的文本类型
            console.log(data);
            let res = await getWorkcustomerListData(data);
            if (res.status !== 200) {
                this.$Modal.error({
                    title: "工单列表",
                    content: res.msg
                });
            }
            this.workOrderList = res.data.list || [];
            this.billSerrchData.pageNum = res.data.num || 1;
            this.billSerrchData.pageSize = res.data.size || 10;
            this.billSerrchData.count = res.data.count || 0;
        }
        //<!--注释批量设置人员-->
        // setStaff(index, item) {
        // 	this.setStaffModal = true;
        // 	this.setServiceStaffData = item;
        // 	console.log(index, item);
        // 	// 在这里设置默认的员工信息
        // }
    },
    created() {
        if (this.$route.query.sixiId) {
            this.params.sixiId = this.$route.query.sixiId;
            this.getInfo();
        }
        // 获取数据
        this.getList();
    }
};
</script>
