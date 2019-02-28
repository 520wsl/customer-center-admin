<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
            <span class="expand-key">主题: </span>
            <span class="expand-value">{{ row.title }}</span>
            </Col>
            <Col span="6">
            <span class="expand-key">类型: </span>
            <span class="expand-value">{{ getWorkSheetTypeValue(row.workType) }}</span>
            </Col>


            <Col span="4">
            <span v-if="row.type == 4"><img class="expand-img" :src="$CDN('/icon_sucess_min.png')"></span>
            <span v-else><img class="expand-img" :src="$CDN('/icon_warning_min.png')"></span>
            <span class="expand-value">{{getWorkSheetHandleTypeValue(row.type)  }}</span>
            </Col>
            <Col span="6" v-if="row.evaluateInfoVo">
            <span v-for="(item,index) in row.evaluateInfoVo.evaluateContent" :key="'item_'+index"
                  class="expand-value"><span v-if="item.type =='text' && item.value"
                                             class="md-card-btn-default">{{ item.value }}</span><span
                    v-if="item.type =='radio' || item.type =='check'"><span
                    v-for="e in item.value" :key="e" class="md-card-btn-default" v-if="e">{{e}}</span></span></span>
            </Col>
            <Col v-if="!row.isRead" span="2">
            <span><img class="expand-img" :src="$CDN('/icon_meg.png')"></span>
            <span class="expand-value">新消息</span>
            </Col>
            <!--<Col span="6">-->
            <!--<span><img class="expand-img" :src="$CDN('/icon_order.png')"></span>-->
            <!--<span class="expand-key">留言: </span>-->
            <!--<span class="expand-value">{{ row.remark }}</span>-->
            <!--</Col>-->
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
    .expand-row {
        min-height: 40px;
    }

    .expand-img {
        width: 12px;
        margin-right: 5px;
    }

    .md-card-btn-default {
        padding: 2px 5px;
        margin: 2px;
        border-color: #E4E4E4;
        color: #666;
        border-radius: 0px;
    }
</style>