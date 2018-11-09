<template>
  <div>
    <sixiheader title="常见问题"></sixiheader>
    <div class="navBar">
      <div v-for="el in navBarList" :key="el.id" :class="activeBar === el.id?'is-selected':''" @click="getNavBarActive(el.id)">{{el.name}}
        <i></i>
      </div>
    </div>

    <ul class="list">
      <li>
        <span class="s-title">如何报名参加阿里活动?</span>
        <span class="right">&gt;</span>
      </li>
      <li>
        <span class="s-title">如何报名参加阿里活动?</span>
        <span class="right">&gt;</span>
      </li>
      <li>
        <span class="s-title">如何报名参加阿里活动?</span>
        <span class="right">&gt;</span>
      </li>
    </ul>
  </div>
</template>

<script>
import sixiheader from "@/components/header.vue";
export default {
  components: { sixiheader },
  data() {
    return {
      navBar: "1",
      activeBar: 1,
      navBarList: [
        {
          id: 1,
          name: "你好"
        },
        {
          id: 2,
          name: "分类1"
        },
        {
          id: 3,
          name: "分类1"
        },
        {
          id: 4,
          name: "分类1"
        },
        {
          id: 5,
          name: "分类1"
        },
        {
          id: 6,
          name: "分类1"
        }
      ]
    };
  },
  methods: {
    getNavBarActive(id) {
      this.activeBar = id;
    }
  }
};
</script>

<style scoped>
.navBar {
  height: 70px;
  line-height: 70px;
  font-size: 24px;
  color: #6e7790;
  margin-top: 10px;
  padding-left: 30px;
  background: #fff;
  text-align: center;
  overflow-y: hidden;
  white-space: nowrap; /* 不换行 */
  overflow-x: scroll;
}
.navBar div {
  min-width: 120px;
  margin-right: 33px;
  display: inline-block;
}
.is-selected {
  color: #697eff;
  position: relative;
}
.is-selected i {
  position: absolute;
  bottom: 0;
  left: 60px;
  margin-left: -24px;
  height: 3px;
  width: 48px;
  border-bottom: 3px solid #697eff;
  border-radius: 3px;
}
.list {
  margin-top: 10px;
  width: 750px;
  color: #6e7790;
  transition: border 2s;
}

.list li {
  display: flex;
  padding: 0 60px 0 46px;
  margin-bottom: 2px;
  background: #fff;
  font-size: 26px;
  height: 100px;
  line-height: 100px;
}
.list li:before {
  content: "";
  position: relative;
  top: 50%;
  left: -20px;
  margin-top: -6px;
  border-radius: 50%;
  background: #697eff;
  height: 12px;
  width: 12px;
}
.s-title {
  flex: 1;
}
</style>

