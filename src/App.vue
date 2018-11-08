<template>
  <div id="app" class="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
	name: "app",
	components: {}
};
</script>

<style>
body,
ul,
p,
a,
div,
img {
	margin: 0;
	padding: 0;
}

li {
	list-style: none;
}

a {
	text-decoration: none;
	color: #5a5a5a;
	cursor: pointer;
}

.main {
	margin: auto;
	width: 750px;
}

.box {
	display: flex;
}

.clearfix:after {
	content: ".";
	display: block;
	height: 0;
	clear: both;
	visibility: hidden;
}

.clearfix {
	*zoom: 1;
}

/*居中*/

.item-center {
	justify-content: center;
}

/*两端对齐*/

.space-between {
	justify-content: space-between;
}

/*每个元素两侧的间隔相等。*/

.space-around {
	justify-content: space-around;
}

/*垂直居中*/

.vertical-center {
	align-items: center;
}

/*自动换行*/

.wrap {
	flex-wrap: wrap;
}

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
