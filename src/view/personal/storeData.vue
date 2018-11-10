<template>
  <div>
    <sixiheader title="店铺运营数据"></sixiheader>
    <div class="b-title">
      <span>苏州市嘉华聚氨酯制品有限公司</span>
      <mt-button class="btn" @click="openPicker">
        {{month}}
      </mt-button>
    </div>
    <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="handleConfirm" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" class="style "></mt-datetime-picker>
    <div class="data">
      <h3 class="s-title">月销量</h3>
      <div class="monthData">
        <div>
          <div class="onlineAndoffline">线上</div>
          <div class="money">￥66.11
            <span>万元</span>
            <img src="@/assets/image/decline.png" alt="">
          </div>
          <div class="num">206笔</div>
        </div>
        <div>
          <div class="onlineAndoffline">线下</div>
          <div class="money">￥66.11
            <span>万元</span>
            <img src="@/assets/image/rise.png" alt="">
          </div>
          <div class="num">206笔</div>
        </div>
      </div>
    </div>
    <div class="data">
      <h3 class="s-title">询盘</h3>
      <div class="info">
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11
            <img src="@/assets/image/decline.png" alt="">
          </li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11
            <img src="@/assets/image/rise.png" alt="">
          </li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
      </div>
      <h3 class="s-title">流量</h3>
      <div class="info">
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
      </div>
      <h3 class="s-title">客户</h3>
      <div class="info">
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
        <ul>
          <li class="item1">询盘总量</li>
          <li class="item2">￥690.11</li>
          <li class="item2">56笔</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { formatTime } from "@/libs/util/time";
import sixiheader from "@/components/header.vue";

export default {
  components: { sixiheader },
  data() {
    return {
      pickerValue: null,
      month: "2018年1月"
    };
  },
  mounted() {
    this.month = formatTime(new Date(), "YYYY年MM月");
  },
  methods: {
    handleConfirm() {
      this.month = formatTime(this.pickerValue, "YYYY年MM月");
    },
    openPicker() {
      this.$refs.picker.open();
    }
  }
};
</script>
<style lang="less" scoped>
@titleColor: #697eff;
@dataColor: #fc7946;
@sTitleColor: #353a42;
@labelColor: #929eaa;

@risePng: "./../../assets/image/rise.png";
@declinePng: "./../../assets/image/declin.png";

@sTitleFontSize: 28px;

.b-title {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 0 30px;
  height: 100px;
  color: @titleColor;
  font-size: 28px;
  background: #fff url("./../../assets/image/moda_bottom_line.png") repeat-x
    bottom;
  background-size: 100% 4px;
  span {
    flex: 1;
  }
  .btn {
    width: 150px;
    height: 40px;
    color: @titleColor;
    border: 2px solid @titleColor;
    border-radius: 4px;
    position: relative;
  }
}
.style {
  /deep/ .picker-toolbar {
    height: 60px;
  }

  /deep/ .mint-datetime-action {
    line-height: 60px;
    font-size: 30px;
  }
  /deep/ .picker-slot {
    font-size: 30px;
  }
}
.data {
  background: #fff;
  padding: 20px;
  .s-title {
    padding: 20px 40px;
    color: @sTitleColor;
    font-size: @sTitleFontSize;
  }
  .monthData {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    & > div {
      width: 320px;
      box-shadow: 2px 10px 15px 5px #f3f3f3;
      text-align: center;
      .onlineAndoffline {
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background: #697eff;
        color: #fff;
      }
      .money {
        margin-top: 20px;
        height: 100px;
        // display: flex;
        // justify-content: center;
        // align-items: center;
        color: #fc7946;
        font-size: 36px;
        span {
          font-size: 26px;
        }
        img {
          position: relative;
          top: 20px;
          width: 50px;
        }
      }
      .num {
        height: 50px;
        line-height: 40px;
        color: @labelColor;
        font-size: 24px;
      }
    }
  }
  .info {
    display: flex;
    border-top: 2px solid #f0f0f0;
    border-bottom: 2px solid #f0f0f0;
    border-right: 2px solid #f0f0f0;
    ul {
      flex: 1;
      border-bottom: 4px solid#697eff;
      border-left: 2px solid #f0f0f0;
      padding: 20px 0;
      font-size: 26px;
      text-align: center;
      li {
        padding: 20px 0;
      }
      .item1 {
        color: @sTitleColor;
        font-weight: bold;
      }
      .item2 {
        color: @dataColor;
        img {
          width: 26px;
          height: 26px;
        }
      }
    }
  }
}
</style>

