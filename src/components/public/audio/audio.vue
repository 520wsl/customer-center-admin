<template>
	<Modal class="audio-model" v-model="visible" :width="width+'px'" footer-hide @on-cancel="cancel">
		<audio :width="width" controls id="sixiaudio" :src="src+'?'+Math.random()"/>
	</Modal>
</template>
<script>
import audiojs from "audio.js";

export default {
	props: {
		value: {
			type: Boolean,
			default: false
		},
		width: {
			type: Number,
			default: 300
		},
		endPlay: {
			type: Function,
			default: () => {
				return {};
			}
		},
		src: {
			type: String,
			default: null
		},
	},
	data() {
		return {
			visible: this.value,
			options: {}
		};
	},
	mounted() {
		this.$nextTick(function() {
			this.loadaudio();
		});
	},
	methods: {
		cancel() {
			this.visible = false;
			this.$emit("input", this.visible);
		},
		loadaudio() {
			var player = new audiojs(sixiaudio);
			console.log(player);
			player.load(()=>{
				// player.play()
				console.log('加载完成')
			})
		}
	},
	watch: {
		value(val) {
			this.visible = val;
		}
	}
};
</script>
<style scoped>
#sixiaudio{
	display: inline-block;
}
</style>

<style>
.audio-model .ivu-modal-body {
	padding: 0px;
}
.audio-model .ivu-modal-header {
	display: none;
}
.audio-model .ivu-modal-header-inner {
	font-size: 20px;
}
.audio-model .ivu-modal-content{
	background: transparent;
	box-shadow:none;
}
.audio-model .ivu-modal-close{
	display: none;
}
</style>
