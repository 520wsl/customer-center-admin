<template>
  <div class="evaluation-body">
    <div v-for="(item,index) in list" :key="index" class="evaluation-item">
      <div>{{item.title}}:</div>
      <starList :maxNum='item.maxNum' :chooseNum='item.chooseNum' :index='index' @sentChoose='sentChoose'></starList>
    </div>
  </div>
</template>
<script>
import starList from "./starList";
export default {
  props: ["list"],
  data() {
    return {};
  },
  components: { starList },
  methods: {
    sentChoose(obj) {
      this.list[obj.index].chooseNum = obj.num;
    }
  }
};
</script>
<style scoped>
.evaluation-body {
  padding: 40px 30px 0;
  background: #fff;
}
.evaluation-item {
  display: flex;
  font-size: 28px;
  color: #353a42;
  align-items: flex-end;
  justify-content: space-between;
}
</style>
