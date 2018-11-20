<template>
  <div class="phone">
    <img :src="$CDN('/callBackBg.png')" class="bg" alt="">
    <div class="company">
        <p v-for="(item,index) in companyList" :key="index">{{item.name}}</p>
    </div>
    
    <div class="userName">
        <h3>{{name}}</h3>
        <p>{{dhhm}}</p>
        <img :src="$CDN('/callBackNotice.png')" alt="">
    </div>
  </div>
</template>
<script>
import { getCustomerbymobileList } from "@/api/admin/custom/custom";
let Base64 = require("js-base64").Base64;
export default {
  data() {
    return {
      account: "",
      dhhm: "",
      cid: "",
      base64: "",
      stime: "",
      companyList: [],
      name: ""
    };
  },
  components: {},
  created() {
    this.base64 = this.$route.query.param1;
    if (!this.base64) {
      return;
    }
    console.log(this.base64);
    console.log(Base64.decode(this.base64));
    let param = this.getObj(Base64.decode(this.base64));
    // let param = this.base64decode(this.$route.query.param1);
    console.log(param);
    this.account = param.account || "";
    this.dhhm = param.dhhm || "";
    this.cid = param.cid || "";
    this.stime = param.stime || "";
    if (this.dhhm) {
      this.getCompanyList(this.dhhm);
    }
  },
  methods: {
    getObj(str) {
      let arr = str.split("&");
      let arr2 = [];
      arr.forEach(item => {
        arr2.push(item.split("="));
      });
      let obj = {};
      arr2.forEach(item => {
        obj[item[0]] = item[1];
      });
      return obj;
    },
    getCompanyList(mobile) {
      getCustomerbymobileList(mobile).then(res => {
        if (res.status != 200) {
          return;
        }
        if (res.data != null) {
          this.companyList = res.data.companyVos ? res.data.companyVos : [];
          this.name = res.data.name || "暂无此客户";
        } else {
          this.name = "暂无此客户";
        }
      });
    }
  }
};
</script>
<style scoped>
.phone {
  position: relative;
  width: 820px;
  top: 50%;
  margin: 0 auto;
  margin-top: -285px;
}
.bg {
  position: absolute;
  top: 0px;
  left: 0px;
}
.company {
  position: absolute;
  color: #fff;
  font-size: 14px;
  top: 129px;
  left: 46px;
  z-index: 10;
  height: 180px;
  overflow-y: auto;
}
.company > p {
  margin-bottom: 10px;
}
.userName {
  position: relative;
  color: #fff;
  position: absolute;
  top: 55px;
  z-index: 10;
  text-align: right;
  right: 156px;
}
.userName h3 {
  font-size: 30px;
}
.userName p {
  margin-top: 10px;
  font-size: 20px;
}
.userName img {
  position: absolute;
  float: left;
  top: 43px;
  left: -47px;
}
</style>
