<template>
  <div>
    <Card class="md-card">
      <p slot="title">客户列表</p>
      <div class="search-con search-con-top">
        <Select v-model="params.select" class="search-col">
          <Option v-for="item in keyWordTypeData" :key="`search-col-${item.key}`" :value="item.key">{{ item.title }}</Option>
        </Select>
        <Input v-model="params.keyword" placeholder="输入关键字搜索" class="search-input">
        <span></span>
        </Input>
        <Button @click="getlist" class="search-btn" type="primary">
          <Icon type="search" />&nbsp;&nbsp;搜索
        </Button>
      </div>
      <div>
        <Table :loading="loading" :columns="columns" :data="customList"></Table>
      </div>
    </Card>
    <Card class="md-card">
      <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
    </Card>
  </div>
</template>

<script>
import Page from "_c/admin/page";
import { getCompanyList } from "@/api/admin/custom/data";
import "./index.less";
export default {
  data() {
    return {
      loading: false,
      params: {
        pageNum: 1,
        pageSize: 10,
        select: 1,
        keyword: "",
        count: 0
      },
      keyWordTypeData: [
        {
          key: 1,
          title: "客户名称"
        },
        {
          key: 2,
          title: "店铺账号"
        },
        {
          key: 3,
          title: "手机号"
        }
      ],
      columns: [
        {
          title: "客户名称",
          keyWord: true,
          align: "center",
          key: "name",
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: { style: "color:#72ACE3;cursor:pointer;" },
                on: {
                  click: () => {
                    this.$router.push({
                      name: "custom-info",
                      query: {
                        sixiId: params.row.sixiId,
                        userName: params.row.name
                      }
                    });
                  }
                }
              },
              params.row.name
            );
          }
        },
        {
          title: "店铺网址",
          keyWord: true,
          align: "center",
          key: "url",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  src: params.row.url,
                  target: "_blank",
                  style: "color:#72ACE3",
                  title: params.row.name
                }
              },
              params.row.url
            );
          }
        },
        {
          title: "店铺账号",
          keyWord: true,
          align: "center",
          key: "account"
        },
        {
          title: "微信昵称",
          keyWord: true,
          align: "center",
          key: "wechatNickName"
        },
        {
          title: "手机号",
          keyWord: true,
          align: "center",
          key: "mobile"
        }
      ],
      customList: []
    };
  },
  components: { Page },
  created() {
    this.getlist();
  },
  methods: {
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
      if (this.params.select == 1) {
        params.companyName = this.params.keyword;
      } else if (this.params.select == 2) {
        params.account = this.params.keyword;
      } else if (this.params.select == 3) {
        params.mobile = this.params.keyword;
      }
      getCompanyList(params).then(res => {
        if (res.status != 200) {
          return this.$Notice.error({ title: res.msg });
        }
        this.params.count = res.data.count || 0;
        this.customList = res.data.list || [];
      });
    }
  }
};
</script>
