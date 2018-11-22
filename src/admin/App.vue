<template>
	<div id="app" class="main">
		<router-view></router-view>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "app"
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
