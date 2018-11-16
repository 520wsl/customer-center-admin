<template>
    <div>
        <table class="tab">
            <tbody>
                <tr v-for="(item,index) in data" :key="'tr-'+index">
                    <template v-for="(i,index2) in item">
                        <td class="title" :key="'td-'+index2">{{i.title}}</td>
                        <td :key="index2">{{i.value}}</td>
                    </template>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		}
	}
};
</script>