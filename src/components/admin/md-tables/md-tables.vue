<template>
    <div>
        <table class="tab">
            <tbody>
                <tr v-for="(item,index) in data" :key="'tr-'+index">
                    <template v-for="(i,index2) in item">
                        <td class="title" :key="'td-'+index2">{{i.title}}</td>
                        <td v-if="!i.btnSty" :key="'td2-'+index2" :colspan="i.col">
                            <span>{{i.value}}</span>
                        </td>
                        <td v-if="i.btnSty == 'a'" :key="'td2-'+index2" :colspan="i.col">
                            <span>{{i.value}}</span>
                            <span >
                                <a
                                    
                                    @click="eventCallback({type:i.eventType})"
                                    href="javascript:;"
                                >修改</a>
                            </span>
                        </td>
                        <td  v-if="i.btnSty == 'radio'" :key="'td2-'+index2" :colspan="i.col">
                            <span> <RadioGroup
                                   
                                    @on-change="eventCallback({type:i.eventType,val:i.value})"
                                    v-model="i.value"
                                >
                                    <Radio
                                        v-for="(label,index3) in i.list"
                                        :key="index3"
                                        :label="label.key"
                                    >{{label.value}}</Radio>
                                </RadioGroup></span>
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
        eventCallback(event) {
            this.$emit("eventCallback", event);
        }
    }
};
</script>