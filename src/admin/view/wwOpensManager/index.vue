<template>
  <div>
    <div class="header">
      <span class="ww">旺旺多开管理端</span>
      <!-- v-if="item.key != 1&&sixiId != '1010115268518365'" -->
      <RadioGroup v-model="content.type" @on-change="pageInit" type="button" size="large">
        <!-- eslint-disable-next-line -->
        <Radio v-for="item in typeList" :key="item.key" :label=item.key>{{item.value}}</Radio>
      </RadioGroup>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "./index.less";
export default {
  data () {
    return {
      sixiId: this.$store.state.user.userInfo.sixiId,
      content: {
        type: '0'
      },
      typeList: [
        { key: '0', value: '登录列表' },
        { key: '1', value: '登录设置' }
      ]
    }
  },
  watch: {
    '$route.name' (val, old) {
      console.log('watch', this.$route.name, this.content.type)
      if (val == 'login-list') {
        this.content.type = '0'
      } else if (val == 'login-setting') {
        this.content.type = '1'
      }
    }
  },
  mounted () {
    this.pageInit(this.content.type)
  },
  methods: {
    pageInit (type) {
      console.log('pageInit', this.$route.name, this.content.type)
      if (type == '0') {
        this.$router.push({ name: 'login-list' })
      } else if (type == '1') {
        this.$router.push({ name: 'login-setting' })
      }
    }
  }
}
</script>

