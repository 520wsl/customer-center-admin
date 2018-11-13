<template>
  <div class="title">
    <mt-header fixed title="" :style="background?'background:'+background:'background:#fff;'" class="header">
      <div slot="left">
        <slot name="headleft">
          <div v-if="!isBack">
            <span :class="background?'white':'black'">{{title}}</span>
          </div>
          <a v-else @click="routerBack()" href="javascript:void(0);" :class="background?'white left':'black left'">
            <mt-button icon="back"></mt-button>
            <span :class="background?'white':'black'">&nbsp;{{title}}</span>
          </a>
        </slot>
      </div>
      <div slot="right">
        <slot name="headright" class="right">
          <img v-if="background" :src="$CDN('/header_white_logo.png')" class="img">
          <img v-else :src="$CDN('/header_black_logo.png')" class="img">
        </slot>
      </div>
    </mt-header>
  </div>
</template>

<script>
export default {
  props: ["title", "background", "isBack"],
  data() {
    return {};
  },
  methods: {
    routerBack() {
      history.back();
    }
  }
};
</script>

<style scoped>
.title {
  height: 88px;
}
.white {
  color: white;
  font-size: 34px;
}
.black {
  color: black;
  font-size: 34px;
}
.title .header {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.right {
  display: flex;
  align-items: flex-end;
}
.img {
  height: 40px;
}
.left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 34px;
  line-height: 34px;
  height: 34px;
}
</style>

<style>
.title .mint-header .mint-header-title {
  font-size: 35px;
}

.title .mintui {
  font-size: 35px;
}
</style>

