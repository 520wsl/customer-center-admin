<template>
  <div>
    <Card class="md-card">
      <p slot="title">工单后台</p>
      <div class="search-con" style="overflow:hidden;">
        <div class="search-input-item">
          <span>工单编号：</span>
          <Input class="search-input" placeholder="请输入搜索关键词"></Input>
        </div>
        <div class="search-input-item">
          <Select class="search-col" placeholder='工单类型' v-model="params.type">
            <Option v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
          <Select class="search-col" placeholder='工单状态' v-model="params.status">
            <Option v-for="(item,index) in statusList" :key="index" :value="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <div class="search-input-item">
          <span>工单创建时间：</span>
          <div class="search-input-item">
            <DatePicker class="search-input" v-model="params.startTime" format='yyyy-MM-dd' type="date"></DatePicker>
            <DatePicker class="search-input" v-model="params.endTime" format='yyyy-MM-dd' type="date"></DatePicker>
          </div>
        </div>
        <div class="search-input-item">
          <span>用户手机号码：</span>
          <Input class="search-input" placeholder="请输入搜索关键词"></Input>
        </div>
        <div class="search-input-item">
          <Checkbox v-model="params.isNew">新消息</Checkbox>
          <Checkbox v-model="params.isMe">我执行的</Checkbox>
        </div>
        <div class="search-btn search-btn-item">
          <Button type="primary">搜索</Button>
        </div>
      </div>
    </Card>
    <Card class="md-card">
      <Table :data='workOrderList' :columns='columns' border></Table>
    </Card>
    <Card class="md-card">
      <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
    </Card>
  </div>
</template>

<script>
import Page from "_c/admin/page";
import "./index.less";
export default {
  data() {
    return {
      params: {
        type: "",
        status: "",
        startTime: "",
        endTime: "",
        isNew: false,
        isMe: false,
        pageNum: 1,
        pageSize: 10,
        count: 0
      },
      typeList: [
        {
          id: "1",
          name: "店铺美化"
        },
        {
          id: "2",
          name: "运营效果"
        },
        {
          id: "3",
          name: "续费问题"
        },
        {
          id: "4",
          name: "小程序问题"
        },
        {
          id: "5",
          name: "产品问题"
        },
        {
          id: "6",
          name: "其他"
        }
      ],
      statusList: [
        {
          id: "1",
          name: "待处理"
        },
        {
          id: "2",
          name: "已超时"
        },
        {
          id: "3",
          name: "处理中"
        },
        {
          id: "4",
          name: "已完结"
        },
        {
          id: "5",
          name: "已评价"
        }
      ],
      workOrderList: [],
      columns: [
        {
          title: "工单编号",
          align: "center",
          key: ""
        },
        {
          title: "类型",
          align: "center",
          key: ""
        },
        {
          title: "用户手机",
          align: "center",
          key: ""
        },
        {
          title: "客户昵称",
          align: "center",
          key: ""
        },
        {
          title: "创建时间",
          align: "center",
          key: ""
        },
        {
          title: "持续时间",
          align: "center",
          key: ""
        },
        {
          title: "响应时间",
          align: "center",
          key: ""
        },
        {
          title: "状态",
          align: "center",
          key: ""
        },
        {
          title: "新消息",
          align: "center",
          key: ""
        },
        {
          title: "责任人",
          align: "center",
          key: ""
        },
        {
          title: "操作",
          align: "center",
          key: ""
        }
      ]
    };
  },
  components: { Page },
  methods: {
    pageCurrentChange() {},
    pageSizeChange() {}
  }
};
</script>
