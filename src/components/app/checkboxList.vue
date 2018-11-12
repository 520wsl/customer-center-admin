<template>
  <div class="checkbox-list">
    <div v-for="(item,index1) in showList" :key="index1" :class="item.isChoose?'checkbox-item checkbox-active':'checkbox-item checkbox-default'" @click="chooseItem(index1)">
      {{item.name}}
    </div>
  </div>
</template>
<script>
export default {
  props: ["isEdit", "index", "list", "value"],
  data() {
    return {};
  },
  components: {},
  computed: {
    // list: function() {
    //   let arr = [];
    //   for (let i = 0; i < this.maxNum; i++) {
    //     arr.push(i);
    //   }
    //   return arr;
    // }
    showList: function() {
      let arr = [];
      this.list.forEach(item => {
        this.value.forEach(item2 => {
          if (item.id == item2) {
            item.isChoose = true;
          }
        });
        arr.push(item);
      });
      return arr;
    }
  },
  methods: {
    chooseItem(index1) {
      // 不可编辑状态跳出
      if (!this.isEdit) {
        return;
      }
      // 已经选中的
      if (this.showList[index1].isChoose) {
        this.value.forEach((item, index) => {
          if (item == this.showList[index1].id) {
            this.value.splice(index, 1);
            this.showList[index1].isChoose = false;
          }
        });
        // 点击未选中
      } else {
        this.value.push(this.showList[index1].id);
      }
      this.$emit("getValue", { value: this.value, index: this.index });
    }
  }
};
</script>
<style scoped>
.checkbox-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.checkbox-item {
  width: 200px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 26px;
  margin-top: 30px;
}
.checkbox-active {
  background: rgba(105, 126, 255, 0.1);
  border: 1px solid #697eff;
  color: #697eff;
}
.checkbox-default {
  border: 1px solid #ddd;
  color: #999;
}
</style>
