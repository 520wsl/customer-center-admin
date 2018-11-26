<template>
    <Modal class="video-model" v-model="visible" width="800px" footer-hide @on-cancel="cancel">
        <video-player v-if="value" class="video-player-box vjs-big-play-centered" ref="videoPlayer" :options="playerOptions" :playsinline="true" customEventName="customstatechangedeventname" @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)" @waiting="onPlayerWaiting($event)" @playing="onPlayerPlaying($event)" @loadeddata="onPlayerLoadeddata($event)" @timeupdate="onPlayerTimeupdate($event)" @canplay="onPlayerCanplay($event)" @canplaythrough="onPlayerCanplaythrough($event)" @statechanged="playerStateChanged($event)" @ready="playerReadied"></video-player>
    </Modal>
</template>
<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";

export default {
    components: {
        videoPlayer
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        width: {
            type: Number,
            default: 800
        },
        videoParams: {
            type: Object,
            default: () => {
                return {};
            }
        },
        endPlay: {
            type: Function,
            default: () => {
                return {};
            }
        }
    },
    data() {
        return {
            visible: this.value,
            playerOptions: {
                // videojs options
                muted: false,
                aspectRatio: '16:9',
                fluid: true,
                playbackRates: [0.7, 1.0, 1.5, 2.0],
                language: "zh-CN",
                languages: {
                    "zh-CN": {
                        Play: "播放",
                        Replay: "重播",
                        Pause: "暂停",
                        Mute: "静音",
                        Unmute: "取消静音",
                        Fullscreen: "全屏",
                        "Non-Fullscreen": "取消全屏",
                        "Current Time": "当前时间",
                        Duration: "持续时间",
                        "Remaining Time": "剩余时间",
                        "Playback Rate": "加速"
                    }
                },
                sources: []
            }
        };
    },
    mounted() {
        // console.log(this.value);
        // this.setVideo(this.videoParams.src, this.videoParams.type);
    },
    computed: {
        player() {
            return this.$refs.videoPlayer.player;
        }
    },
    created() { },
    methods: {
        setVideo(src = '', type = "video/mp4") {
            this.playerOptions.sources = [
                {
                    src,
                    type
                }
            ];
        },
        cancel() {
            this.visible = false;
            this.$refs.videoPlayer.player.pause()
            this.$emit("input", this.visible);
        },
        // listen event
        onPlayerPlay(player) {
            console.log("player play!", player);
        },
        onPlayerPause(player) {
            console.log("player pause!", player);
        },
        // ...player event

        // or listen state event
        playerStateChanged(playerCurrentState) {
            console.log("player current update state", playerCurrentState);
        },

        // player is ready
        playerReadied(player) {
            console.log("the player is readied", player);
            // you can use it to do something...
            // player.[methods]
        },
        onPlayerPlaying(player) {
            console.log('onPlayerPlaying')
        },
        onPlayerTimeupdate(player) {
            console.log('onPlayerTimeupdate')
        },
        onPlayerCanplay(player) {
            console.log('onPlayerCanplay')
        },
        onPlayerLoadeddata(player) {
            console.log('onPlayerLoadeddata')
        },
        onPlayerCanplaythrough(player) {
            console.log("player pause!", player);
        },
        onPlayerEnded() { },
        onPlayerWaiting() { }
    },
    watch: {
        value: {
            deep: true,
            handler(val) {
                this.visible = val;
            }
        },
        videoParams: {
            deep: true,
            handler(val) {
                this.setVideo(val.src, val.type);
            }
        }
    }
};
</script>
<style>
.video-model .ivu-modal-body {
  padding: 0px;
}
.video-model .ivu-modal-header {
  display: none;
}
.video-model .ivu-modal-header-inner {
  font-size: 20px;
}
/* .video-model .ivu-modal-content{
    background: #000;
} */
</style>