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
              <div v-for="(item,index) in info.staffVos" :key="index">{{item.staffTag+"："+item.staffName+"("+item.department+")"}}</div>
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
      <div class="btn-group">
        <Button type="primary" class="md-card-btn-bind" @click="bindAccount">绑定账号</Button>
      </div>
      <Table :columns="columns" :data="customList" border="" style="width:500px;"></Table>
    </Card>
    <Modal v-model="bindModal" title="绑定微信账号" :footer-hide="true" width="400px;">
      <Card>
        <p>请客户用微信扫该二维码绑定，二维码有效期2分钟</p>
        <div class="qr-code">
          <img v-if="qrData.codeUrl" :src="qrData.codeUrl" alt="微信二维码" title="微信二维码">
          <p v-else>二维码</p>
        </div>
        <div class="qr-code-btn">
          <Button>
            <Icon type="md-sync" />刷新二维码
          </Button>
        </div>
      </Card>
    </Modal>
  </div>
</template>
<script>
import "./index.less";
import {
  getCustomerInfoData,
  setWechatUntied
} from "@/api/admin/custom/custom";
import { getQRCodeUrl } from "@/api/admin/qrCode/qrCode";
export default {
  data() {
    return {
      bindModal: false,
      columns: [
        {
          title: "微信号",
          keyWord: true,
          key: "wechatNickName"
        },
        {
          title: "手机号",
          keyWord: true,
          key: "mobile"
        },
        {
          title: "操作",
          keyWord: true,
          render: (h, params) => {
            return h(
              "Poptip",
              {
                attrs: {
                  confirm: true,
                  title: `解绑不可撤销，请谨慎操作！是否确认解绑？`
                },
                on: {
                  "on-ok": () => {
                    this.unBind();
                  },
                  "on-cancel": () => {}
                }
              },
              [
                h(
                  "Button",
                  {
                    attrs: {
                      type: "primary"
                    }
                  },
                  "解绑"
                )
              ]
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
        sixiId: "",
        type: "BINDING_PHONE"
      },
      qrData: {}
    };
  },
  methods: {
    bindAccount() {
      if (this.customList.length != 0) {
        return this.$Message.warning({
          content: "已有绑定的，需要解绑才能重新绑定!"
        });
      }
      this.bindModal = true;
      this.getQrcode();
    },
    getQrcode() {
      getQRCodeUrl(this.params).then(res => {
        if (res.status != 200) {
          return this.$Message.error({
            content: "二维码获取失败，请稍后再试！"
          });
        }
        this.qrData = res.data;
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
      });
    },
    unBind() {
      setWechatUntied(this.info.openId).then(res => {
        if (res.status != 200) {
          return this.$Message.error({
            content: res.msg
          });
        }
        this.getInfo();
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
