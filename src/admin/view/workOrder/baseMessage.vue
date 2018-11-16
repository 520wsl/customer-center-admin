<template>
  <div>
    <Card class="md-card">
      <div slot="title">工单信息</div>
      <tables :data="workOrderInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">客户信息</div>
      <tables :data="cunstomInfo"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">关联业务员</div>
      <tables :data="workOrderPersonnel"></tables>
    </Card>
    <Card class="md-card">
      <div slot="title">客服记录</div>
      <Card class="md-card message">
        <div class="flex message-bottom">
          <div class="flex-left">
            <span>客户：</span>
          </div>
          <div class="flex-right">2018-01-02 13:20</div>
        </div>
        <div
          class="message-counter"
        >客户要求美工的图做的再精细一点再精细一点再精细一点，但实际上我们的图已经做的很靖西很精细了，所以我反馈给客户说我们会努力的把图做的更精细一点</div>
        <div class="flex message-bottom">
          <div class="flex-left flex message-group">
            <div class="flex-left img">
              <img
                src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u101.png"
                alt=""
              >
            </div>
            <div class="flex-left img">
              <img
                src="https://axhub.im/pro/c5ced834fc13a32b/images/%E5%B7%A5%E5%8D%95%E8%AF%A6%E6%83%85/u102.png"
                alt=""
              >
            </div>
          </div>
          <div class="flex-right btn-group move-down">
            <Button type="primary" class="btn" icon="ios-cloud-download" ghost>下载附件</Button>
            <Button type="warning" class="btn" icon="ios-brush" ghost>编辑摘要</Button>
          </div>
        </div>
      </Card>
    </Card>
    <Card class="md-card">
      <div slot="title">客户评价</div>
      <div class="flex">
        <div class="flex-left" style="width:49%">
          <table class="tab">
            <tbody>
              <tr>
                <td class="title col-large">服务态度：</td>
                <td>
                  <Rate allow-half/>
                </td>
              </tr>
              <tr>
                <td class="title col-large">店铺设计满意度：</td>
                <td>
                  <Rate allow-half/>
                </td>
              </tr>
              <tr>
                <td class="title col-large">响应时间：</td>
                <td>
                  <Rate allow-half/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex-right" style="width:49%">
          <table class="tab">
            <tbody>
              <tr>
                <td class="title left-align">其他反馈：</td>
              </tr>
              <tr>
                <td>
                  <Tag type="border" color="primary">标签一</Tag>
                  <Tag type="border" color="primary">标签一</Tag>
                  <Tag type="border" color="primary">标签一</Tag>
                  <Tag type="border" color="primary">标签一</Tag>
                  <Tag type="border" color="primary">标签一</Tag>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import tables from "_c/admin/md-tables";
import { mapState } from "vuex";
import { getArrValue } from "@/libs/tools";
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
export default {
	components: {
		tables
	},
	computed: {},
	methods: {
		getWorkSheetTypeValue(key) {
			return getArrValue(this.$store.state.workSheet.workSheetType, key);
		},
		async getWorkSheetInfo() {
			let res = await getWorkSheetInfoData({ workSheetId: 8 });
			console.log("getWorkSheetInfo", res);
			if (res.status !== 200) {
				console.error("getWorkSheetInfo", res.msg);
				this.$Modal.error({
					title: "工单详情",
					content: res.msg
				});
				return;
			}

			this.info = res.data;

			this.assembleMessage();
		},
		assembleMessage() {
			this.setWorkOrderInfo();
			this.setCunstomInfo();
			this.setWorkOrderPersonnel();
		},
		// 设置 工单信息
		setWorkOrderInfo() {
			let workOrderInfo = [
				[
					{
						title: "工单编号：",
						value: this.info.identifier
					},
					{
						title: "工单类型：",
						value: this.getWorkSheetTypeValue(this.info.workType)
					},
					{
						title: "工单标题：",
						value: this.info.title
					}
				],
				[
					{
						title: "工单创建时间：",
						value: this.info.createAt
					},
					{
						title: "工单响应时间(小时)：",
						value: this.info.responseTime
					},
					{
						title: "工单持续时间：",
						value: "暂时没有"
					}
				],
				[
					{
						title: "执行人：",
						value: this.info.executorName
					},
					{
						title: "参与者：",
						value: "暂时没有"
					},
					{
						title: "负责人：",
						value: "暂时没有"
					}
				]
			];

			this.workOrderInfo = workOrderInfo;
		},
		// 设置 客户信息
		setCunstomInfo() {
			let cunstomInfo = [
				[
					{
						title: "用户手机号码：",
						value: this.info.cellphone
					},
					{
						title: "用户openID：",
						value: "暂时没有"
					},
					{
						title: "微信昵称：",
						value: "暂时没有"
					}
				]
			];

			let companyVoList = this.info.companyVoList || [];

			if (!companyVoList.length) {
				this.cunstomInfo = cunstomInfo;
				return;
			}

			companyVoList.map(function(item) {
				cunstomInfo.push([
					{
						title: "公司名称：",
						value: item.name
					},
					{
						title: "网址：",
						value: item.url
					},
					{
						title: "合作业务：",
						value: "暂时没有"
					}
				]);
			});

			this.cunstomInfo = cunstomInfo;
		},
		// 设置 关联业务员信息
		setWorkOrderPersonnel() {
			let workOrderPersonnel = [
				[
					{
						title: "原属业务员：",
						value: "暂时没有"
					}
				],
				[
					{
						title: "运营主管：",
						value: "暂时没有"
					}
				],
				[
					{
						title: "阿里客服：",
						value: "暂时没有"
					}
				],
				[
					{
						title: "旺旺客服：",
						value: "暂时没有"
					}
				],
				[
					{
						title: "美工：",
						value: "暂时没有"
					}
				]
			];

			this.workOrderPersonnel = workOrderPersonnel;
		}
	},
	data() {
		return {
			workOrderPersonnel: [],
			cunstomInfo: [],
			workOrderInfo: [],
			info: {
				cellphone: "",
				companyVoList: [],
				confirmTime: 1542271547000,
				createAt: 1542250110000,
				departmentId: null,
				departmentName: "",
				evaluateTime: null,
				executorId: 10,
				executorName: "",
				finishTime: null,
				handleType: 2,
				id: 8,
				identifier: "sixiId1182464550969017343", //工单编号
				leadingName: "",
				leadingOfficial: 1,
				participator: "1,10",
				responseTime: 6.0,
				title: "微信昵称的工单",
				userId: "sixiid",
				workType: 2
			}
		};
	},
	created() {},
	mounted() {
		this.getWorkSheetInfo();
	}
};
</script>
