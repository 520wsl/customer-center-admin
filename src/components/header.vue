<template>
  <div class="title">
    <mt-header fixed title="" :style="background?'background:'+background:'background:#fff;color:#000;'">
      <div slot="left">
        <slot name="headleft">
          <span v-if="isBack" style="font-size:0.34rem;">{{title}}</span>
          <a v-else @click="routerBack()" href="javascript:void(0);" class="left">
            <mt-button icon="back"></mt-button>
            <span style="font-size:0.34rem;">&nbsp;{{title}}</span>
          </a>
        </slot>
      </div>
      <div slot="right">
        <slot name="headright" class="right">
          <img v-if="background" src="../assets/header_white_logo.png" class="img">
          <img v-else src="../assets/header_black_logo.png" class="img">
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
  height: 0.75rem;
}

.title .mint-header {
  height: 0.88rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.right {
  display: flex;
  align-items: flex-end;
}
.img {
  height: 0.4rem;
}
.left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>

<style>
.title .mint-header .mint-header-title {
  font-size: 0.35rem;
}

.title .mintui {
  font-size: 0.35rem;
}
</style>

