<template>
    <div class="flex">
        <div class="flex-left" style="width:49%">
            <table class="tab">
                <tbody>
                    <tr v-for="item in evaluateList" :key="item.evaluateName">
                        <!-- 星级评价 -->
                        <td
                            class="title col-large"
                            v-if="item.type == 'number' && item.otherAttribute.showType == 'score'"
                        >{{item.evaluateName}}</td>
                        <td v-if="item.type == 'number' && item.otherAttribute.showType == 'score'">
                            <Rate
                                v-model="item.value"
                                :allow-half="item.otherAttribute.isHalf == 1"
                                disabled
                                :count="item.otherAttribute.maxNum"
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="flex-right" style="width:49%">
            <table class="tab">
                <tbody>
                    <template v-for="item in evaluateList">
                        <!-- 标题 -->
                        <tr
                            :key="item.evaluateName+'_th'"
                            v-if="item.type == 'checkbox' || item.type == 'radio' || item.type == 'text' || (item.type == 'number' && item.otherAttribute.showType != 'score')"
                        >
                            <td class="title left-align">{{item.evaluateName}}</td>
                        </tr>
                        <!-- 单选双选 -->
                        <tr
                            :key="item.evaluateName+'_td'"
                            v-if="item.type == 'checkbox' || item.type == 'radio'"
                        >
                            <td class="left-align">
                                <Tag
                                    type="border"
                                    color="primary"
                                    v-for="(item2,index2) in item.value"
                                    :key="index2+item2"
                                >{{item2}}</Tag>
                            </td>
                        </tr>
                        <!-- 文本域 -->
                        <tr
                            :key="item.evaluateName+'_td'"
                            v-if="item.type == 'text' || (item.type == 'number' && item.otherAttribute.showType != 'score')"
                        >
                            <td class="left-align">{{item.value}}</td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
	props: {
		evaluateList: {
			type: Array,
			default() {
				return [];
			}
		}
	}
};
</script>