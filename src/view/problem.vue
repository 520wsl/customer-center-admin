<template>
  <div class="bg">
    <mt-header class="header">
      <router-link to="/home" slot="left" tag="mt-button">&lt;&ensp;返回</router-link>
      <router-link to="/user" tag="mt-button" icon="user" slot="right">分享</router-link>
    </mt-header>

    <mt-navbar v-model="navBar" class="navBar">
      <mt-tab-item id="1">问题分类一</mt-tab-item>
      <mt-tab-item id="2">问题分类二</mt-tab-item>
      <mt-tab-item id="3">问题分类三</mt-tab-item>
      <mt-tab-item id="4">问题分类四</mt-tab-item>
      <mt-tab-item id="5">问题分类五</mt-tab-item>
    </mt-navbar>

    <!-- <ul class="list">
      <li>
        <span>如何报名参加阿里活动</span>
        <span>&gt;</span>
      </li>
    </ul> -->
  </div>
</template>

<script>
// import { Header } from "mint-ui";
export default {
  data() {
    return {
      navBar: "1"
    };
  }
};
</script>

<style scoped>
.bg {
  background: #f4f4f4;
  padding-bottom: 90px;
}
.header {
  height: 90px;
  line-height: 90px;
  font-size: 34px;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 10px;
  /* background: #fff;
  color: #444444; */
}
.navBar {
  height: 70px;
  font-size: 24px;
  color: #6e7790;
  /* color: #697eff !important; */
}
.list {
  width: 750px;
  border: 1px solid #ccc;
  /* box-sizing: border-box; */
  transition: border 2s;
}
</style>

