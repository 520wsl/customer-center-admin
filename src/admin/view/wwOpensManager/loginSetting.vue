<template>
  <div>
    <div class="header">
      <Card class="md-card">
        <p slot="title">登录设置</p>
        <div class="search-con search-con-top">
          <div class="search-item">
            <Select v-model="params.select" class="search-col">
              <Option v-for="item in keyWordTypeData" :key="`search-col-${item.key}`" :value="item.key">{{ item.value }}</Option>
            </Select>
            <Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
            <span></span>
            </Input>
          </div>
          <div class="search-item">
            状态：
            <Select v-model="params.select" class="search-col">
              <Option v-for="item in statusList" :key="`search-col-${item.key}`" :value="item.key">{{ item.value }}</Option>
            </Select>
          </div>
          <div class="search-item">
            旺旺登录人：
            <Department class="search-col" :loading-user="true" width="200" :get-user-info="getUserInfo" v-model="params.customerIdList"></Department>
          </div>
          <div class="search-btn flex-right">
            <Button @click="getList" type="primary">搜索</Button>
          </div>
        </div>
      </Card>

      <Card class="md-card">
        <p style="margin: 0 10px 10px">
          选中客户：
          <Button @click="changeStatusData()" type="primary" style="margin-right:10px">批量设置状态</Button>
          <Button @click="Empty" type="primary" style="margin-right:10px">批量清空旺旺登录人</Button>
          <Button @click="addLoginer()" type="primary">批量添加旺旺登录人</Button>
        </p>
        <Table :columns="columns" :data="list" border class="table" @on-selection-change="changeCheckList"></Table>
      </Card>
      <Card class="md-card">
        <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
      </Card>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div style="text-align:center">
        <el-radio v-model="loginStatus" label="1" border>可以登录</el-radio>
        <el-radio v-model="loginStatus" label="2" border>禁止登录</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeStatusData({companyList:checkList ,status:loginStatus})">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="showModal">
      <batchSetupModal :showModal="showModal" :peopleList="peopleList" :companyList="companyList" @closeModal="closeModal"></batchSetupModal>
    </div>
  </div>
</template>
<script>
import Department from "_c/public/department";
import Page from "_c/admin/page";
import "./loginSetting.less";
import batchSetupModal from "_c/admin/batch-setup-modal";
import { getLoginSettingDate, empty, changeStatus, setLOginer } from "@/api/admin/wwOpensManager/loginSetting";
export default {
  components: { Page, Department, batchSetupModal },
  data () {
    return {
      dialogVisible: false,
      loginStatus: '1',
      sixiId: this.$store.state.user.userInfo.sixiId,
      showModal: false,
      peopleList: [],
      companyList: [],
      params: {
        type: '1',
        status: -1,
        keyword: '',
        staffSixiId: [],
        pageNum: 1,
        pageSize: 10,
        count: 0,
      },
      keyWordTypeData: [
        {
          key: '1',
          value: "公司名称"
        },
        {
          key: '2',
          value: "阿里账号"
        }
      ],
      statusList: [
        {
          key: -1,
          value: "全部"
        },
        {
          key: 1,
          value: "可以登录"
        },
        {
          key: 2,
          value: "禁止登陆"
        }
      ],
      checked: true,
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '公司名称',
          key: 'companyName',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('p', params.row.companyName),
              h('p', params.row.companyUrl)
            ])
          }
        },
        {
          title: '阿里账号',
          key: 'aliAccount',
          align: 'center',
        },
        {
          title: '旺旺登录人',
          key: 'staffVoList',
          align: 'center',
          render: (h, params) => {
            let str = ''
            params.row.staffVoList.map((i) => {
              str += i.staffName + '(' + i.departmentName + ')，'
            })
            str = str.slice(0, str.length - 1)
            return h('div', str)
          }
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let str = this.getResult(this.statusList, params.row.status, 'key', 'value')
            return h('div', [
              h('span', str + ' '),
              h(
                "i-switch",
                {
                  props: {
                    value: params.row.status == 1 ? true : false
                  },
                  on: {
                    // 1启用，2停用
                    "on-change": type => {
                      let status = type ? 1 : 2;
                      let data = { status, companyList: params.row.companySixiId }
                      this.changeStatusData(data)
                    }
                  }
                },
              )
            ])
          }
        },
        {
          title: '操作',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                size: 'small',
                type: 'primary',
              },
              on: {
                click: () => {
                  let data = {
                    companyList: [params.row.companySixiId],
                    peopleList: params.row.staffVoList,
                  }
                  this.addLoginer(data)
                }
              }
            }, '设置旺旺登录人')
          }
        },
      ],
      checkList: [],
      list: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.checkList = [];
      let params = this.deepClone(this.params);
      params.staffSixiId = params.staffSixiId[params.staffSixiId.length - 1] || ''
      getLoginSettingDate(params).then(res => {
        if (res.status != 200) {
          return this.$Notice.error({ title: res.msg });
        }
        this.params.count = res.data.total || 0;
        this.list = res.data.list || [];
      });
    },
    pageCurrentChange (pageNum) {
      this.params.pageNum = pageNum;
      this.getList();
    },
    pageSizeChange (pageSize) {
      this.params.pageSize = pageSize;
      this.params.pageNum = 1;
      this.getList();
    },
    getUserInfo (data) {
      console.log(data)
    },
    /**批量设置状态 */
    changeStatusData (data) {
      if (!data && this.checkList.length == 0) {
        return this.$Notice.error({ title: "请选择公司！" });
      } else {
        this.dialogVisible = true;
        changeStatus({ ...data }).then(res => {
          if (res.status == 200) {
            this.dialogVisible = false
            this.$message({ type: 'success', message: '设置状态成功' });
            this.getList();
          }
          return this.$Notice.error({ title: res.msg });
        });
      }
    },
    //清空
    Empty () {
      if (this.checkList.length == 0) {
        return this.$Notice.error({ title: "请选择公司！" });
      }
      this.$confirm('是否确认要清空旺旺登录人？', '清空旺旺登录人', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        empty({ companyList: this.checkList }).then(res => {
          if (res.status != 200) {
            return this.$Notice.error({ title: res.msg });
          }
          this.$message({ type: 'success', message: '清空成功' });
          this.getList()
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    /**添加登录人 */
    addLoginer (data) {
      if (!data && this.checkList.length == 0) {
        return this.$Notice.error({ title: "请选择公司！" });
      }
      if (data) {
        this.peopleList = data.peopleList || [];
        this.companyList = data.companyList || [];
        this.showModal = true;
      } else {
        this.peopleList = [];
        this.companyList = this.checkList || [];
        this.showModal = true;
      }
    },
    closeModal (data) {
      this.showModal = data.modal;
      this.getList()
    },
    changeCheckList (data) {
      let arr = []
      data.map((i) => {
        arr.push(i.companySixiId)
      })
      this.checkList = arr
    },
    getResult (arr = [], id = '', find = 'id', result = 'value') {
      let value = '';
      if (id === undefined || id === null || !find || !result) { return '' }
      arr.map(function (e) { if (e[find] === id) { value = e[result] } });
      return value;
    },
    deepClone (source) {
      const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
      for (let keys in source) { // 遍历目标
        if (source.hasOwnProperty(keys)) {
          if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
            targetObj[keys] = source[keys].constructor === Array ? [] : {};
            targetObj[keys] = this.deepClone(source[keys]);
          } else { // 如果不是，就直接赋值
            targetObj[keys] = source[keys];
          }
        }
      }
      return targetObj;
    }
  }
}
</script>
