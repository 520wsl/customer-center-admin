<template>
  <div>
    <div class="header">
      <!-- <span class="ww">旺旺多开管理端</span> -->
      <!-- v-if="item.key != 1&&(sixiId != '1010115268518365' || sixiId != '1010118657191180')" -->
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
  mounted () {
    let val = this.$route.name
    if (val == 'wwOpensManager-login-list' || val == 'wx-wwOpensManager-login-list') {
      this.content.type = '0'
    } else if (val == 'wwOpensManager-login-setting' || val == 'wx-wwOpensManager-login-setting') {
      this.content.type = '1'
    }
  },
  methods: {
    pageInit (type) {
      if (type == '0') {
        if (this.$route.name == "wwOpensManager-login-setting") {
          this.$router.push({ name: 'wwOpensManager-login-list' })
        } else {
          let routeData = this.$router.resolve({ name: 'wx-wwOpensManager-login-list' });
          window.open(routeData.href, '_blank');
        }
        this.content.type = '0'
      } else if (type == '1') {
        if (this.$route.name == "wwOpensManager-login-list") {
          this.$router.push({ name: 'wwOpensManager-login-setting' })
        } else {
          let routeData = this.$router.resolve({ name: 'wx-wwOpensManager-login-setting' });
          window.open(routeData.href, '_blank');
        }
        this.content.type = '1'
      }
    }
  }
}
</script>

