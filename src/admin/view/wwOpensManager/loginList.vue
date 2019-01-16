<template>
  <div>
    <div class="header">
      <Card class="md-card">
        <p slot="title">登录列表</p>
        <div class="search-con search-con-top">
          <div class="search-item">
            <Select v-model="params.type" class="search-col">
              <Option v-for="item in keyWordTypeData" :key="`search-col-${item.key}`" :value="item.key">{{ item.value }}</Option>
            </Select>
            <Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
            <span></span>
            </Input>
          </div>
          <div class="search-item">
            状态：
            <Select v-model="params.status" class="search-col">
              <Option v-for="item in statusList" :key="`search-col-${item.key}`" :value="item.key">{{ item.value }}</Option>
            </Select>
          </div>
          <div class="search-item">
            旺旺登录人：
            <Department class="search-col" :loading-user="true" width="200" :get-user-info="getUserInfo" v-model="params.staffSixiId"></Department>
          </div>
          <div class="search-btn flex-right">
            <Button @click="getList" type="primary" style="margin-right:10px">搜索</Button>
            <Button @click="openSetting">设置千牛客户端目录</Button>
          </div>
        </div>
      </Card>

      <Card class="md-card">
        <p style="margin: 0 10px 10px">
          选中客户：
          <Button @click="goLogin(checkList)" :disabled="loginDisabled" type="primary" style="margin-right:10px">批量登录旺旺</Button>
        </p>
        <Table :columns="columns" :data="list" border class="table" @on-selection-change="changeCheckList"></Table>
      </Card>
      <Card class="md-card">
        <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
      </Card>
    </div>

  </div>
</template>
<script>
import Department from "_c/public/department";
import Page from "_c/admin/page";
import "./loginList.less";
import { wwOpensManagerLoginListDate, wwOpensManagerLoginListBatchLogin } from "@/api/admin/wwOpensManager/loginList";
import { wwOpensManagerLoginListSetpath, wwOpensManagerLoginListLogin, wwOpensManagerLoginListLoginList } from "@/api/admin/wwOpensManager/qnLogin";
export default {
  components: { Page, Department },
  data () {
    return {
      sixiId: this.$store.state.user.userInfo.sixiId,
      loginDisabled: false,
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
            return h('div', str)
          }
        },
        {
          title: '操作',
          key: 'name',
          align: 'center',
          render: (h, params) => {
            let isI = this.getResult(params.row.staffVoList, this.sixiId, 'staffSixiId', 'staffName')
            console.log(params.row.status != 1, isI == '', this.LoggedList[params.row.aliAccount], params.row.status == 2 || isI == '' || this.LoggedList[params.row.aliAccount])
            let disable = (params.row.status != 1 || isI == '' || this.LoggedList[params.row.aliAccount] != undefined || this.loginDisabled)
            return h('Button', {
              props: {
                size: 'small',
                type: 'primary',
                disabled: disable
              },
              on: {
                click: () => {
                  this.goLogin([params.row.aliAccount])
                }
              }
            }, '登录旺旺')
          }
        },
      ],
      checkList: [],
      LoggedList: [],
      list: []
    }
  },
  mounted () {
    this.getLoginList()
    this.getList()
  },
  methods: {
    /**获取已登录列表 */
    getLoginList () {
      wwOpensManagerLoginListLoginList().then(res => {
        if (res.status != 200) {
          return this.$Notice.error({ title: res.msg });
        }
        this.LoggedList = res.data
      });
    },
    /**列表 */
    getList () {
      this.checkList = [];
      let params = this.deepClone(this.params);
      params.staffSixiId = params.staffSixiId[params.staffSixiId.length - 1] || ''
      wwOpensManagerLoginListDate(params).then(res => {
        if (res.status != 200) {
          return this.$Notice.error({ title: res.msg });
        }
        this.params.count = res.data.total || 0;
        this.list = res.data.list || [];
      });
    },
    /**分页 */
    pageCurrentChange (pageNum) {
      this.params.pageNum = pageNum;
      this.getList();
    },
    pageSizeChange (pageSize) {
      this.params.pageSize = pageSize;
      this.params.pageNum = 1;
      this.getList();
    },
    /**个人信息 */
    getUserInfo (data) {
      console.log(data)
    },
    /**设置千牛路径 */
    openSetting (data) {
      this.$prompt('选择安装路径', '设置千牛客户端安装目录', {
        confirmButtonText: '保存',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        wwOpensManagerLoginListSetpath({ path: value }).then(res => {
          if (res.status != 200) { return this.$Notice.error({ title: '请检查您输入的路径是否正确！' }); }
          this.$message({ type: 'success', message: '你的千牛客户端安装路径是: ' + value });
          this.SaveRoad(value)
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    /**批量登录 */
    async goLogin (data) {
      let wwOpensManagerQnRoad = JSON.parse(localStorage.getItem('wwOpensManagerQnRoad'))
      if (wwOpensManagerQnRoad && wwOpensManagerQnRoad[this.sixiId]) {
        var resData = [];
        await wwOpensManagerLoginListBatchLogin({ accountList: data }).then(res => {
          if (res.status != 200) {
            return this.$Notice.error({ title: res.msg });
          }
          resData = res.data
        });
        let value = wwOpensManagerQnRoad[this.sixiId]
        await wwOpensManagerLoginListSetpath({ path: value }).then(res => {
          if (res.status != 200) { return this.$Notice.error({ title: '请检查您输入的路径是否正确！' }); }
          this.$message({ type: 'success', message: '你的千牛客户端安装路径是: ' + value });
          this.SaveRoad(value)
        });
        await this.forLogin(resData)
      } else {
        this.$confirm('您还未设置千牛客户端的安装路径！', '提示', {
          confirmButtonText: '点击设置路径',
          cancelButtonText: '知道了',
          type: 'warning'
        }).then(() => {
          this.openSetting(data);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }

    },
    /**循环异步登录 */
    async forLogin (resData) {
      for (let i of resData) {
        this.loginDisabled = true
        this.$Notice.error({ title: '程序自动登录中，请勿操作鼠标', duration: 20 });
        let [username, password] = [i.account, i.password]
        await wwOpensManagerLoginListLogin({ username, password }).then(res => {
          this.loginDisabled = false;
          if (res.status != 200) {
            return this.$Notice.error({ title: res.msg });
          }
          this.getList()
          return this.$Notice.destroy()
        });
      }
    },

    /**保存千牛客户端目录 */
    SaveRoad (data) {
      let sixiId = this.$store.state.user.userInfo.sixiId
      if (sixiId) {
        let wwOpensManagerQnRoad = JSON.parse(localStorage.getItem('wwOpensManagerQnRoad')) || {};
        wwOpensManagerQnRoad[sixiId] = data
        localStorage.setItem('wwOpensManagerQnRoad', JSON.stringify(wwOpensManagerQnRoad))
      } else {
        this.$message({ type: 'error', message: '未登录或登录已过期，请重新登录后重试！' });
      }
    },
    /* 选中的公司id */
    changeCheckList (data) {
      let arr = []
      data.map((i) => {
        arr.push(i.aliAccount)
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
