<template>
  <div class="star-list">
    <div v-for="(item,index) in list" :key="index" class="star-item" @click="changeChoose(index)">
      <img v-if="index<chooseNum" :src="$CDN('/star_choose.png')">
      <img v-else :src="$CDN('/star_default.png')">
    </div>
  </div>
</template>
<script>
export default {
  props: ["maxNum", "chooseNum", "index"],
  data() {
    return {
      // list: []
    };
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
      let num = index + 1;
      this.$emit("sentChoose", { num, index: this.index });
    }
  }
};
</script>
<style scoped>
.star-list {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
.star-list .star-item {
  margin-right: 60px;
}
.star-list .star-item:last-child {
  margin-right: 0;
}
.star-item img {
  width: 40px;
}
</style>
