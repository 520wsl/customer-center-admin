<template>
    <div>
        <table class="tab">
            <tbody>
                <tr v-for="(item,index) in data" :key="'tr-'+index">
                    <template v-for="(i,index2) in item">
                        <td class="title" :key="'td-'+index2">{{i.title}}</td>
                        <td :key="index2">
                            <span>{{i.value}}</span>
                            <span>
                                <a v-if="i.eventType == 1" @click="eventCallback(1)" href="javascript:;">修改</a>
                            </span>
                        </td>
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
    },
    methods: {
        eventCallback(type) {
            this.$emit("eventCallback", type);
        }
    }
};
</script>