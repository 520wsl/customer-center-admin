<template>
	<div>
		<Card>
			<div v-if="searchable && searchPlace === 'top'" class="search-con search-con-top">
				<Select v-model="searchKey" class="search-col">
					<block v-for="item in columns" :key="`search-col-${item.key}`">
						<Option :value="item.key" v-if="item.key !== 'handle'">{{ item.title }}</Option>
					</block>
				</Select>
				<i-input
					@on-change="handleClear"
					clearable
					placeholder="输入关键字搜索"
					class="search-input"
					v-model="searchValue"
				>
					<Button @click="handleSearch" class="search-btn" type="primary">
						<Icon type="search"/>&nbsp;&nbsp;搜索
					</Button>
				</i-input>
			</div>
		</Card>
	</div>
</template>

<script>
export default {};
</script>

<style>
</style>
