<template>
  <div>
    <sixiheader title="常见问题"></sixiheader>
    <div class="s-title">
      <span>如何报名参加阿里的活动？</span>
    </div>
    <div class="article">
      <p>SV优惠券配置功能与2018年9月10日开启（客户领取于 2018年9月12日生效），ISV可根据自己的运营节奏配置 优惠券供商家领取使用。</p>
      <p>优惠券创建入口：服务商后台-营销管理-创建活动： https://mfuwu.1688.com/provider/applyindex.htm</p>
      <p>特别说明：</p>
      <div class="item">
        <h3>一. 时间设置</h3>
        <p>1. 活动时间：在这段时间内，用户可领取优惠券；</p>
        <p>2. 有效时间：① 生效时间如果是“领取后立即使用”则过 期时间只能选“领取后N天”；②生效时间如果是 “指定特 定时间”则过期时间只能选“指定特定时间”。使用有效期 必须在活动时间内。</p>
      </div>
      <div class="item">
        <h3>二. 展现方式</h3>
        <p>1. 详情展示：根据ISV设置的优惠券领取人群情况，会决 定优惠券是否出现在商品详情页被指定人群可见；</p>
        <p>2. 定向展示：设置优惠券后有专属链接，可定向发给用 券人群。</p>
      </div>

      <div class="item">
        <h3>二. 展现方式</h3>
        <p>1. 详情展示：根据ISV设置的优惠券领取人群情况，会决 定优惠券是否出现在商品详情页被指定人群可见；</p>
        <p>2. 定向展示：设置优惠券后有专属链接，可定向发给用 券人群。</p>
      </div>
      <div class="item">
        <h3>三. 客户定义</h3>
        <p>新客 、老客名单是不断更新的，但并非实时，是以用户 领券前一天的数据为准。所以领用人群后有提示文案： 新客 、老客数据，均为延迟一天的数据，即 ：用户当天 购买了商品，当天依旧是该商品新客，次日才是该商品老 客。</p>
      </div>
      <div class="item">
        <h3>四. 优惠折扣</h3>
        <p>为保证ISV不用优惠券功能打低价战，会限制优惠折扣力 度，折后金额不得低于市场价的8折。</p>
      </div>
      <div class="item">
        <h3>五. ISV单个活动下最多创建10个面值，同时最多允许创</h3>
      </div>
      <div class="item">
        <h3>六. 技术咨询请添加1688 ISV技术交流群</h3>
      </div>
      <div class="item">
        <h3>七. 装修市场ISV暂不支持优惠券创建功能（敬请期待）。</h3>
      </div>
      <div class="item">
        <h3>八. 优惠券活动创建成功后，活动APP在活动期间均不支 持修改价格。</h3>
      </div>
    </div>
    <div class="footer">
      <span>是否对你有帮助？：</span>
      <div class="btnGroup">
        <mt-button class="btn">
          <span>没用&ensp;</span>
          <img src="@/assets/image/crying.png">
        </mt-button>
        <mt-button class="btn">
          有用&ensp;
          <img src="@/assets/image/smlie.png">
        </mt-button>
      </div>
    </div>

    <!-- <div class="footer">
      <span>是否对你有帮助？：</span>
      <span>
        <mt-button class="btn">
          <span>没用&emsp;
            <img src="@/assets/image/crying.png">
          </span>
        </mt-button>
        <mt-button class="btn">
          <span>有用&emsp;
            <img src="@/assets/image/smlie.png">
          </span>
        </mt-button>
      </span>
    </div> -->
  </div>
</template>
<script>
import sixiheader from "@/components/header.vue";
export default {
  components: { sixiheader },
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.s-title {
  padding: 40px 0 30px 0;
  margin: 10px 0;
  background: #fff;
  font-size: 28px;
  color: #444444;
}
.s-title > span {
  margin-left: 34px;
  padding-left: 32px;
  border-left: 6px solid #697eff;
}
.article {
  margin: 10px 0;
  background: #fff;
  padding: 30px;
  p {
    padding-bottom: 40px;
    color: #6e7790;
    font-size: 28px;
  }
  .item {
    margin-bottom: 40px;
    h3 {
      font-size: 28px;
      color: #444444;
      margin-bottom: 20px;
    }
    p {
      padding-bottom: 10px;
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  height: 64px;
  font-size: 30px;
  color: #444444;
  padding: 40px 30px 30px 30px;
  .btnGroup {
    .btn {
      width: 140px;
      height: 64px;
      font-size: 28px;
      margin-right: 60px;
      color: #bbbbbb;
      img {
        // float: left;
        // display: inline-table;
        // line-height: 64px;
        // display: flex;
        // align-self: center;
        // margin-top: -2px;
        vertical-align: middle;
        width: 30px;
        height: 30px;
      }
    }
  }
  & > span:nth-child(1) {
    flex: 1;
  }
  & > span:nth-child(2) {
    width: 400px;
  }
}
</style>
