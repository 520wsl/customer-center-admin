<template>
    <div>
        <Row class="expand-row">
            <Col span="6">
            <span class="expand-key">主题: </span>
            <span class="expand-value">{{ row.title }}</span>
            </Col>
            <Col span="4">
            <span class="expand-key">类型: </span>
            <span class="expand-value">{{ getWorkSheetTypeValue(row.workType) }}</span>
            </Col>
            <Col span="6">
            <span><img class="expand-img" :src="$CDN('/icon_order.png')"></span>
            <span class="expand-key">留言: </span>
            <span class="expand-value">{{ row.remark }}</span>
            </Col>

            <Col span="3">
            <span v-if="!row.isRead"><img class="expand-img" :src="$CDN('/icon_meg.png')"></span>
            <span class="expand-value">{{getWorkSheetHandleTypeValue(row.type)  }}</span>
            </Col>
            <Col span="5" v-if="row.evaluateInfoVo">
            <span v-for="(item,index) in row.evaluateInfoVo.evaluateContent" :key="'item_'+index"
                  class="expand-value"><span v-if="item.type =='text'"
                                             class="md-card-btn-warning">{{ item.value }}</span><span
                    v-if="item.type =='radio' || item.type =='check'"><span
                    v-for="e in item.value" :key="e" class="md-card-btn-warning">{{e}}</span></span></span>
            </Col>
        </Row>
    </div>
</template>

<script>
    import {getArrValue} from "@/libs/tools";
    import {mapState, mapMutations, mapActions} from "vuex";

    export default {
        name: "",
        props: {
            row: Object
        },
        methods: {
            getWorkSheetTypeValue(key) {
                return getArrValue(this.$store.state.workSheet.workSheetType, key);
            },
            getWorkSheetHandleTypeValue(key) {
                return getArrValue(
                    this.$store.state.workSheet.workSheetHandleType,
                    key
                );
            },
        }
    }
</script>

<style scoped>
    .expand-img {
        width: 12px;
        margin-right: 5px;
    }

    .md-card-btn-warning {
        padding: 1px;
        margin: 2px;
    }
</style>