<template>
    <div id="app" class="main">
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapActions} from "vuex";
    import Watermark from '@/assets/js/watermark'

    export default {
        name: "app",
        methods: {
            _isMobile() {
                let flag = navigator.userAgent.match(
                    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
                );
                return flag;
            }
        },
        mounted() {
            // if (this._isMobile()) {
            //     alert("手机端");
            // } else {
            //     alert("pc端");
            // }
            Watermark.set("杭州四喜")
        }
    };
</script>

<style>
    #app {
        height: 100%;
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
