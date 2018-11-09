<template>
  <div>
    <sixiheader :title="title"></sixiheader>
    <div class="evaluation">请你为{{severType==1?"美工":"运营"}}
      <span>{{name}}</span>，本次拟服务做个评价</div>
    <editEvaluation></editEvaluation>
  </div>
</template>
<script>
import sixiheader from "@/components/header";
import editEvaluation from "@/components/editEvaluation";
export default {
  data() {
    return {
      list: [],
      title: "美工服务评价",
      severType: 1,
      name: "张momo"
    };
  },
  components: { sixiheader, editEvaluation },
  created() {},
  methods: {}
};
</script>
<style scoped>
.evaluation {
  height: 40px;
  line-height: 40px;
  padding: 40px 30px 30px;
  margin: 10px 0 20px;
  color: #444;
  font-size: 28px;
  background: #fff;
}
.evaluation span {
  color: #697eff;
}
</style>
<style>
body,
html {
  height: 100%;
  background: #f4f4f4;
}
</style>

