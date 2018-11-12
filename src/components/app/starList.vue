<template>
  <div class="star-list">
    <div v-for="(item,index1) in list" :key="index1" class="star-item" @click="changeChoose(index1)">
      <!-- 整星情况 -->
      <img v-if="item<chooseNum && isHalf ==1" :src="$CDN('/star_choose.png')">
      <img v-if="item>=chooseNum && isHalf ==1" :src="$CDN('/star_default.png')">
      <!-- 半星情况 -->
      <img v-if="item<chooseNum && item!=chooseNum-0.5 && isHalf ==0" :src="$CDN('/star_choose.png')">
      <img v-if="item==chooseNum-0.5 && isHalf ==0" :src="$CDN('/star_choose.png')" class="clip-left">
      <img v-if="item==chooseNum-0.5 && isHalf ==0" :src="$CDN('/star_default.png')" class="clip-right">
      <img v-if="item>=chooseNum && item!=chooseNum-0.5 && isHalf ==0" :src="$CDN('/star_default.png')">
    </div>
  </div>
</template>
<script>
export default {
  props: ["maxNum", "chooseNum", "index", "isEdit", "isHalf"],
  data() {
    return {};
  },
  components: {},
  computed: {
    list: function() {
      let arr = [];
      for (let i = 0; i < this.maxNum; i++) {
        arr.push(i);
      }
      return arr;
    }
  },
  methods: {
    changeChoose(index) {
      //当为不可编辑则调出函数，页面为只显示状态
      if (!this.isEdit) {
        return;
      }
      if (this.isHalf == 1) {
        let num = index + 1;
        this.$emit("sentChoose", { num, index: this.index });
      } else {
        let num = 0;
        if (index + 0.5 == this.chooseNum) {
          num = this.chooseNum + 0.5;
        } else {
          num = index + 0.5;
        }
        this.$emit("sentChoose", { num, index: this.index });
      }
    }
  }
};
</script>
<style scoped>
.star-list {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 400px;
}
/* .star-list .star-item {
  margin-right: 60px;
}
.star-list .star-item:last-child {
  margin-right: 0;
} */
.star-item {
  position: relative;
  width: 40px;
  height: 40px;
}
.star-item img {
  width: 40px;
  position: absolute;
  /* clip: rect(0px 40px 40px 20px); */
}
.clip-left {
  clip: rect(0px 20px 40px 0px);
}
.clip-right {
  clip: rect(0px 40px 40px 20px);
}
</style>
