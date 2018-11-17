<template>
	<Modal class="video-model" v-model="visible" :width="width+'px'" footer-hide @on-cancel="cancel">
		<div>
			<video id="sixivideo" class="video-js" :width="width">
				<source :src="videoParams.src+'?'+Math.random()" :type="videoParams.type">
			</video>
		</div>
	</Modal>
</template>
<script>
import videojs from "video.js";
import "video.js/dist/video-js.css";

export default {
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
				return {
					src: null,
					type: "video/mp4"
				};
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
			options: {
				// 自动播放
				autoplay: false,
				// 大按钮
				bigPlayButton: false,
				controls: true,
				textTrackDisplay: false,
				posterImage: true,
				errorDisplay: false,
				controlBar: true,
				/**
				 * 是否循环播放:true/false
				 * 参数类型：Boolean
				 **/
				loop: false,
				/**
				 * 设置默认播放音频：true/false
				 * 参数类型：Boolean
				 **/
				muted: false,
				/**
				 * 建议浏览器是否在加载<video>元素时开始下载视频数据。
				 * 预加载:preload
				 * 参数类型：String
				 * 参数值列表：
				 * auto:立即加载视频（如果浏览器支持它）。一些移动设备将不会预加载视频，以保护用户的带宽/数据使用率。这就是为什么这个值被称为“自动”，而不是更确凿的东西
				 * metadata:只加载视频的元数据，其中包括视频的持续时间和尺寸等信息。有时，元数据会通过下载几帧视频来加载。
				 * none:
				 */
				preload: "metadata",
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
						"Remaining Time": "剩余时间"
					}
				}
			}
		};
	},
	mounted() {
		this.$nextTick(function() {
			this.loadvideo();
		});
	},
	created() {
		// this.loadvideo();
	},
	methods: {
		cancel() {
			this.visible = false;
			this.$emit("input", this.visible);
		},
		loadvideo() {
			var player = videojs("sixivideo", this.options, () => {
				videojs.log("视频加载完成");
				player.on("ended", () => {
					videojs.log("视频播放完成啦");
					this.endPlay();
				});
			});
		}
	},
	watch: {
		value(val) {
			this.visible = val;
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
