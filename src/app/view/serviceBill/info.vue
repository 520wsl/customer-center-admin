<template>
  <div>
    <!-- <sixiheader title="服务工单" class="top"></sixiheader> -->
    <p class="BillId">工单编号：
      <b>TBDYY201806231001</b>
    </p>
    <div class="s-title">
      <span>工单信息</span>
    </div>
    <div class="servicebill">
      <ul class="item">
        <li>工单状态：已完结</li>
        <li>工单类型：店铺美化类型</li>
        <li>工单创建时间：2018-08-09</li>
        <li>客服人员：李某某</li>
      </ul>
      <div class="status">
        <h3>服务记录</h3>

        <div class="remark">
          <div class="left">
            <span class="date radius">2018.01.01</span>
            <b class="time">11:50</b>
          </div>
          <div class="right">
            <span class="waiter">向婷</span>
            <span class="serviceItemName">工单记录</span>
            <p class="content">
              客户要求美工的图做的再精细一点再精细一 点再精细一点，但实际上我们的图已经做的 很靖西很精细了但客户说的总是对的，所以 我反馈给客户说我们会努力的把图做的更精 细一
            </p>
          </div>
        </div>
        <div class="remark">
          <div class="left">
            <span class="date radius">2018.01.01</span>
            <b class="time">11:50</b>
          </div>
          <div class="right">
            <span class="waiter">向婷</span>
            <span class="serviceItemName">工单记录</span>
            <p class="content">
              客户要求美工的图做的再精细一点再精细一 点再精细一点，但实际上我们的图已经做的 很靖西很精细了但客户说的总是对的，所以 我反馈给客户说我们会努力的把图做的更精 细一
            </p>
          </div>
        </div>

        <div class="more remark">
          <div class="left">
            <span class="radius">过往</span>
          </div>
          <div class="right">
            <b>查看往期记录</b>
          </div>
        </div>

        <h4>工单附件</h4>
        <div class="file">
          <img src="" alt="附件">
          <img src="" alt="附件">
          <img src="" alt="附件">
          <img src="" alt="附件">
          <img src="" alt="附件">
          <img src="" alt="附件">
          <img src="" alt="附件">
        </div>
      </div>
    </div>
    <div class="assess">
      <img :src="$CDN('/work_list_logo.png')" alt="">
      <span class="assessTime">
        <strong>工作评价</strong>（2018-10-10 10:23)
      </span>
      <span class="waitAssess">待评价&emsp;</span>&gt;
    </div>
  </div>
</template>
<script>
// import sixiheader from "@/components/app/header.vue";
export default {
  components: {},
  created() {
    this.$parent.$parent.setTitle("服务工单");
  },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.BillId {
  color: #6e7790;
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
  padding-left: 28px;
  background: #fff;
  height: 110px;
  font-size: 28px;
  b {
    color: #444444;
  }
}
.s-title {
  padding: 40px 0 30px 0;
  background: #fff;
  font-size: 28px;
  color: #444444;
  span {
    margin-left: 28px;
    padding-left: 16px;
    font-weight: bold;
    border-left: 6px solid #697eff;
  }
}
.servicebill {
  padding-left: 28px;
  background: #fff;
  color: #6e7790;
  padding-bottom: 20px;
  .item {
    font-size: 28px;
    margin-bottom: 20px;
    overflow: hidden;
    li {
      padding-bottom: 20px;
    }
  }
  .status {
    font-size: 26px;
    h3 {
      display: flex;
      align-items: center;
      border-top: 1px solid #f4f4f4;
      height: 100px;
      font-size: 30px;
      color: #444444;
    }
    .remark {
      display: flex;
      .left {
        width: 155px;
        position: relative;
        .date {
          font-size: 20px;
          display: block;
        }
        .time {
          padding: 10px 0 0 10px;
          font-size: 32px;
        }
        .radius::after {
          content: "";
          display: inline-block;
          position: absolute;
          top: 2px;
          left: 146px;
          height: 20px;
          width: 20px;
          box-sizing: border-box;
          border-radius: 40px;
          background: #fff;
          border: 3px solid #697eff;
        }
      }
      .right {
        flex: 1;
        width: 480px;
        padding: 0 52px 54px 46px;
        border-left: 1px solid #e0e0e0;
        .waiter {
          color: #6e7790;
        }
        .serviceItemName {
          padding-left: 46px;
          color: #bcbcbc;
        }
        .content {
          margin-top: 28px;
        }
      }
    }
    .more {
      & > .left {
        color: #929eaa;
        text-align: center;
      }
      & > .right {
        color: #6a9ce4;
        padding-bottom: 20px;
      }
    }
    h4 {
      height: 30px;
      font-size: 30px;
      color: #444444;
    }
    .file {
      display: flex;
      flex-wrap: wrap;
      img {
        margin: 0 0 22px 22px;
        width: 100px;
        height: 100px;
        // border: 1px solid #bcbcbc;
      }
    }
  }
}
.assess {
  display: flex;
  font-size: 28px;
  align-items: center;
  margin: 20px 0 20px 0;
  height: 100px;
  padding: 0 38px 0 38px;
  background: #fff;
  color: #6e7790;
  img {
    height: 40px;
    width: 40px;
    margin-right: 26px;
  }
  .assessTime {
    flex: 1;
  }
  .waitAssess {
    color: #697eff;
    font-size: 24px;
    width: 120px;
  }
}
</style>

