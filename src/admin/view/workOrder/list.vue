<template>
  <div>
    <Card class="md-card">
      <p slot="title">工单后台</p>
      <Row>
        <Col span="6">
        <div class="search-item">
          <span>工单编号：</span>
          <Input class="input" placeholder="请输入搜索关键词"></Input>
        </div>
        </Col>
        <Col span="6">
        <Select class="select-item" placeholder='工单类型' v-model="params.type">
          <Option v-for="(item,index) in typeList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
        <Select class="select-item" placeholder='工单状态' v-model="params.status">
          <Option v-for="(item,index) in statusList" :key="index" :value="item.id">{{item.name}}</Option>
        </Select>
        </Col>
        <Col span="12">
        <span style="padding-left:10px;">工单创建时间：</span>
        <DatePicker class="date-item" v-model="params.startTime" format='yyyy-MM-dd' type="date"></DatePicker>
        <DatePicker class="date-item" v-model="params.endTime" format='yyyy-MM-dd' type="date"></DatePicker>
        </Col>
      </Row>
      <Row style="margin-top:10px;">
        <Col span="6">
        <div class="search-item">
          <span>用户手机号码：</span>
          <Input class="input" placeholder="请输入搜索关键词"></Input>
        </div>
        </Col>
        <Col span="10">
        <div class="radio-item">
          <Radio v-model="params.isNew">新消息</Radio>
          <Radio v-model="params.isMe">我执行的</Radio>
        </div>
        </Col>
        <Col span="8" class="search-btn">
        <Button type="primary">搜索</Button>
        </Col>
      </Row>
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
