<template>
  <div class="evaluation-body">
    <div v-for="(item,index) in list" :key="index" class="evaluation-item">
      <div>{{item.title}}:</div>
      <starList v-if="item.type == 'star'" :maxNum='item.maxNum' :chooseNum='item.chooseNum' :index='index' @sentChoose='sentChoose' :isEdit='isEdit' :isHalf='item.isHalf'></starList>
      <checkboxList v-if="item.type == 'checkBox'" :isEdit='isEdit' :index='index' :list='item.list' :value='item.value' class="checkBox" @getValue='getValue'></checkboxList>
    </div>
  </div>
</template>
<script>
import starList from "./starList";
import checkboxList from "./checkboxList";
export default {
  props: ["list"],
  data() {
    return {
      isEdit: true
    };
  },
  components: { starList, checkboxList },
  methods: {
    sentChoose(obj) {
      this.list[obj.index].chooseNum = obj.num;
    },
    getValue(obj) {
      this.list[obj.index].value = obj.value;
    }
  }
};
</script>
<style scoped>
.evaluation-body {
  padding: 40px 30px 0;
  background: #fff;
  overflow: hidden;
}
.evaluation-item {
  display: flex;
  font-size: 28px;
  color: #353a42;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.checkBox {
  width: 100%;
  padding-top: 10px;
}
</style>
