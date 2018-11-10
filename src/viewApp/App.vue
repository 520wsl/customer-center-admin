<template>
  <div id="app" class="main">
    <router-view></router-view>
		<h1>viewApp</h1>
  </div>
</template>

<script>
export default {
	name: "app",
	components: {}
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
