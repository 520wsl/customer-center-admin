<template>
  <div>
    <sixiheader title="返回" class="top"></sixiheader>
    <h3 class="m-title">附件预览</h3>
    <div class="file">
      <img src="" alt="图片404">
      <img src="" alt="图片404">
      <img src="" alt="图片404">
      <img src="" alt="图片404">
      <img src="" alt="图片404">
    </div>
  </div>
</template>

<script>
import sixiheader from "@/components/app/header.vue";
export default {
  components: { sixiheader },
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.m-title {
  font-size: 36px;
  padding: 8px 0;
  margin: 10px 0;
  background: #fff;
  text-align: center;
  color: #6e7790;
}
.file {
  display: flex;
  flex-direction: column;
  font-size: 30px;
  img {
    width: 100%;
    height: 500px; /* 需要注释掉 */
    height: 500px; /* 需要注释掉 */
    border: 1px solid #ccc; /* 需要注释掉 */
    box-sizing: border-box; /* 需要注释掉 */
  }
}
</style>
