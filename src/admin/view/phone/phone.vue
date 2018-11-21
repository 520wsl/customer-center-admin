<template>
    <div class="phone">
        <img :src="$CDN('/callBackBg.png')" class="bg" alt="">
        <div class="company">
            <p v-for="(item,index) in companyList" :key="index">{{item.name}}</p>
        </div>
        <div class="userName">
            <h3>{{name}}</h3>
            <p>{{showDhhm}}</p>
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
            params: {
                account: "",
                dhhm: "",
                cid: "",
                stime: ""
            },
            base64Code: "",
            companyList: [],
            name: "",
            showDhhm: ''
        };
    },
    components: {},
    created() {
        this.base64Code = this.$route.query.param1;
        if (!this.base64Code) {
            return;
        }
        console.log("base64Code:" + this.base64Code);
        console.log("base64Decode:" + Base64.decode(this.base64Code));
        let param = this.getObj(Base64.decode(this.base64Code));
        console.log(param);
        this.params = param
        let provincePhone = this.isProvince(this.params.dhhm)
        console.log(provincePhone)
        switch (provincePhone) {
            case 1:
                this.getCompanyList(this.params.dhhm);
                break
            case 2:
                this.getCompanyList(this.params.dhhm.slice(1));
                break;
            default:
                this.name = '此电话号码异常';
                break
        }
        this.showDhhm = this.params.dhhm.slice(0, this.params.dhhm.length - 8) + "****" + this.params.dhhm.slice(-4)
        // this.showDhhm = this.params.dhhm.splice(-8, -4, "****")
        // console.log(this.params.dhhm.replace(3, 7, "****"), this.params.dhhm)
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
        isProvince(phoneNum) {
            let provincePhoneReg = /^01[2-9]\d{9}$/;
            let normalPhoneReg = /^1[2-9]\d{9}$/;
            if (!phoneNum) {
                return;
            }
            if (normalPhoneReg.test(phoneNum)) {
                return 1;
            }
            if (provincePhoneReg.test(phoneNum)) {
                return 2;
            }
            return 3;
        },
        getCompanyList(mobile) {
            getCustomerbymobileList({ mobile }).then(res => {
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
  right: 147px;
}
</style>
