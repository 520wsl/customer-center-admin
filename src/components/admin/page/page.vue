<template>
  <div class="pages">
    <div class="block clearfloat">
      <div class="toPage">到第
        <el-input v-model="input" size="mini" style="width:46px;"></el-input>页
        <div class="comfire">
          <el-button class="btnComfire" size="mini" @click="pageCurrentNumChange">确定</el-button>
        </div>
      </div>
      <Page
        show-sizer
        class="erp-page"
        @on-change="pageCurrentChange"
        @on-page-size-change="pageSizeChange"
        :current="realPageNum"
        :total="requiredPageCount"
        :page-size="requiredPageSize"
        show-total
      ></Page>
    </div>
  </div>
</template>
<script>
export default {
	// count 总页数 pageNum 当前页码 每页条数 pageSize
	props: {
		count: {
			type: [Number, String],
			default: 0
		},
		pageSize: {
			type: [Number, String],
			default: 15
		},
		pageNum: {
			type: [Number, String],
			default: 1
		}
	},
	data() {
		return {
			input: 1,
			realPageNum: this.pageNum
		};
	},
	// 验证传入数据
	computed: {
		requiredPageSize: function() {
			return Number(this.pageSize);
		},
		requiredPageCount: function() {
			return Number(this.count);
		},
		requiredPageNum: function() {
			// 如果传入的当前页数大于总页数/每页条数时,当前页数设置为1
			return Number(this.count) / Number(this.pageSize) < this.pageNum
				? 1
				: Number(this.pageNum);
		}
	},
	methods: {
		// 页面条数改变时回调
		pageSizeChange(val) {
			this.$emit("pageSizeChange", val);
		},
		// 点击确定后回调
		pageCurrentNumChange() {
			var value = 1;
			var maxnum = Math.ceil(this.count / this.pageSize);
			var minnum = 1;
			if (this.input === "" || this.input == null) {
				this.input = 1;
			}
			if (!isNaN(this.input)) {
				value = Math.floor(this.input);
				if (value > maxnum) {
					value = maxnum;
					this.input = value;
				} else if (value < minnum) {
					value = minnum;
					this.input = value;
				} else {
					this.input = value;
				}
			} else {
				this.input = 1;
			}
			console.log(this.input);
			// let value = Number(this.input);
			this.realPageNum = value;
			this.$emit("pageCurrentChange", value);
		},
		// 当前页数改变时回调
		pageCurrentChange(val) {
			this.input = val;
			this.$emit("pageCurrentChange", val);
		}
	},
	watch: {
		pageSize(val) {
			this.input = this.pageNum;
		},
		pageNum(val) {
			this.input = this.pageNum;
			this.realPageNum = this.pageNum;
		}
	}
};
</script>
<style>
.pages {
	margin: 15px 0;
	overflow: hidden;
	font-size: 14px;
	color: #666666;
}

.block {
	min-width: 400px;
	float: right;
}
.pagination {
	display: inline-block;
}
.text {
	display: inline-block;
	line-height: 28px;
}

.red {
	color: red;
}

.toPage {
	float: right;
	height: 32px;
	line-height: 32px;
	margin-left: 5px;
}

.comfire {
	display: inline-block;
	line-height: 28px;
	margin: 0 16px;
	text-align: center;
}

.comfire .btnComfire {
	background: #f7faff;
}
.erp-page {
	float: right;
}
.erp-page .ivu-page-item-jump-next,
.erp-page .ivu-page-item-jump-prev,
.erp-page .ivu-page-next,
.erp-page .ivu-page-prev {
	min-width: 28px;
	height: 28px;
	line-height: 22px;
	list-style: none;
	background-color: #f4f4f5;
}
.erp-page .ivu-page-item {
	min-width: 28px;
	height: 28px;
	line-height: 28px;
	background-color: #f4f4f5;
}
.erp-page .ivu-page-item-active {
	/* background-color: #409eff; */
}
</style>
