<template>
  <div>
    <Card class="md-card">
      <p slot="title">客户详情</p>
      <table class="custom-info">
        <tr>
          <td width='200' class="title">公司名称：</td>
          <td>{{info.name}}</td>
          <td width='200' class="title">账号：</td>
          <td> {{info.account}}</td>
        </tr>
        <tr>
          <td width='200' class="title">地区：</td>
          <td> {{info.provinceName+" "+info.cityName}}</td>
          <td width='200' class="title">店铺网址：</td>
          <td>
            <a :href="info.url" :title="info.name" target="_blank">{{info.url}}</a>
          </td>
        </tr>
        <tr>
          <td width='200' class="title">所属：</td>
          <td>
            <div v-for="(item,index) in info.staffVos" :key="index">{{item.staffTag+"："+item.staffName+"("+item.department+")"}}</div>
          </td>
          <td width='200' class="title">主营行业：</td>
          <td>
            <!-- 目前industry数组为空 -->
            <div v-for="(item,index) in info.industry" :key="index">{{item}}</div>
          </td>
        </tr>
      </table>
      <Button type="primary" class="md-card-btn-bind" @click="bindAccount">绑定账号</Button>
      <Table :columns="columns" :data="customList" border></Table>
    </Card>
  </div>
</template>
<script>
import "./index.less";
import { getCompanyInfo } from "@/api/admin/custom/data";
export default {
  data() {
    return {
      columns: [
        {
          title: "微信号",
          keyWord: true,
          align: "center",
          key: "wechatNickName"
        },
        {
          title: "手机号",
          keyWord: true,
          align: "center",
          key: "mobile"
        },
        {
          title: "操作",
          keyWord: true,
          align: "center",
          render: (h, params) => {
            return h(
              "Button",
              {
                attrs: {
                  type: "primary"
                }
              },
              "解绑"
            );
          }
        }
      ],
      customList: [],
      info: {
        name: "",
        account: "",
        industry: "",
        provinceName: "",
        cityName: "",
        url: ""
      },
      params: {
        sixiId: ""
      }
    };
  },
  methods: {
    bindAccount() {
      if (this.customList.length != 0) {
        return this.$Message.warning({
          content: "已有绑定的，需要解绑才能重新绑定!"
        });
      }
    },
    getInfo() {
      getCompanyInfo(this.params).then(res => {
        if (res.status != 200) {
          return this.$Notice.error({ title: res.msg });
        }
        let obj = {
          wechatNickName: res.data.wechatNickName,
          mobile: res.data.mobile
        };
        if (obj.wechatNickName == "" && obj.mobile == "") {
          this.customList = [];
        } else {
          this.customList = [obj];
        }
        this.info = res.data;
      });
    }
  },
  created() {
    if (this.$route.query.sixiId) {
      this.params.sixiId = this.$route.query.sixiId;
      this.getInfo();
    }
  }
};
</script>
