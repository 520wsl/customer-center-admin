<template>
  <div id="app" class="main">
    <headerBar :title="title" :isBack='isBack'></headerBar>
    <router-view></router-view>
  </div>
</template>

<script>
import headerBar from "@/components/app/header.vue";
export default {
  name: "app",
  data() {
    return {
      title: "",
      isBack: true
    };
  },
  components: { headerBar },
  methods: {
    setTitle(title = "四喜服务", isBack = true) {
      this.title = title;
      this.isBack = isBack;
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
