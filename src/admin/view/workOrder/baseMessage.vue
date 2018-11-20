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
    <Card v-if="talkNewsList.length" class="md-card">
      <div slot="title">客服记录</div>
      <message-list :data="talkNewsList"></message-list>
    </Card>
    <Card class="md-card" v-if="evaluateList.length != 0">
      <div slot="title">客户评价</div>
      <div class="flex">
        <div class="flex-left" style="width:49%">
          <table class="tab">
            <tbody>
              <!-- <tr>
                <td class="title col-large">服务态度：</td>
                <td>
                  <Rate allow-half/>
                </td>
              </tr>-->
              <tr v-for="(item,index) in evaluateList" :key="index">
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
              <template v-for="(item,index) in evaluateList">
                <!-- 单选双选 -->
                <tr
                  :key="index+item.type"
                  v-if="(item.type == 'checkbox' || item.type == 'radio')  && item.otherAttribute.showType == 'tag'"
                >
                  <td class="title left-align">{{item.evaluateName}}</td>
                </tr>
                <tr
                  :key="index"
                  v-if="(item.type == 'checkbox' || item.type == 'radio')  && item.otherAttribute.showType == 'tag'"
                >
                  <td>
                    <Tag
                      type="border"
                      color="primary"
                      v-for="(item2,index2) in item.tagList"
                      :key="index2+item2"
                    >{{item2}}</Tag>
                  </td>
                </tr>
                <!-- 文本域 -->
                <tr
                  :key="index"
                  v-if="item.type == 'text'  && item.otherAttribute.showType == 'textarea'"
                >
                  <Input v-model="item.value" readonly :rows="4" style="widtg:100%">
                    <!-- <tr>
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
                    </tr>-->
                  </Input>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import tables from "_c/admin/md-tables";
import { mapState, mapMutations } from "vuex";
import { getArrValue } from "@/libs/tools";
import { getWorkSheetInfoData } from "@/api/admin/workSheet/workSheet";
import { getEvaluateInfo } from "@/api/admin/evaluate/dimension";
import messageList from "_c/admin/message-list";
import { formatTime } from "@/libs/util/time";
export default {
  components: {
    messageList,
    tables
  },
  computed: {},
  methods: {
    ...mapMutations(["setWorkSheetBaseInfo"]),
    getWorkSheetTypeValue(key) {
      return getArrValue(this.$store.state.workSheet.workSheetType, key);
    },
    async getWorkSheetInfo() {
      let res = await getWorkSheetInfoData({
        workSheetId: this.workSheetId
      });
      if (res.status !== 200) {
        this.$Modal.error({
          title: "工单详情",
          content: res.msg
        });
        return;
      }
      this.setWorkSheetBaseInfo(res.data);
      this.info = res.data;
      this.assembleMessage();
      this.getEvaluateInfo();
    },
    assembleMessage() {
      this.setWorkOrderInfo();
      this.setCunstomInfo();
      this.setWorkOrderPersonnel();
    },
    // 设置 工单信息
    setWorkOrderInfo() {
      let joinStr = "";
      this.info.userVos.forEach(item => {
        if (item) {
          joinStr += item.userName + "(" + item.departmentName + ")，";
        }
      });
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
            value: formatTime(this.info.createAt, "YYYY-MM-DD HH:mm:ss")
          },
          {
            title: "工单响应时间(小时)：",
            value: this.info.responseTime
          },
          {
            title: "工单持续时间：",
            value: this.info.durationTime ? this.info.durationTime + "h" : ""
          }
        ],
        [
          {
            title: "执行人：",
            value:
              (this.info.executorUser && this.info.executorUser.userName) || ""
          },
          {
            title: "参与者：",
            value: joinStr
          },
          {
            title: "负责人：",
            value:
              (this.info.leadingUser && this.info.leadingUser.userName) || ""
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
            value: this.info.workerOrderDetailVo
              ? this.info.workerOrderDetailVo.customerVo.mobile
              : ""
          }
        ]
      ];

      if (this.info.workerOrderDetailVo.wechatVo) {
        cunstomInfo[0].push({
          title: "用户openID：",
          value: this.info.workerOrderDetailVo
            ? this.info.workerOrderDetailVo.wechatVo.openId
            : ""
        });
        cunstomInfo[0].push({
          title: "微信昵称：",
          value: this.info.workerOrderDetailVo
            ? this.info.workerOrderDetailVo.wechatVo.wechatNickname
            : ""
        });
      } else {
        cunstomInfo[0].push({
          title: "用户openID：",
          value: ""
        });
        cunstomInfo[0].push({
          title: "微信昵称：",
          value: ""
        });
      }

      let companyVoList = this.info.workerOrderDetailVo
        ? this.info.workerOrderDetailVo.companyVos
        : [];

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
      let workOrderPersonnel = [];
      let arr = this.info.workerOrderDetailVo
        ? this.info.workerOrderDetailVo.staffVos
        : [];
      arr.forEach(item => {
        workOrderPersonnel.push([
          {
            title: item.staffTag,
            value: item.staffName + "(" + item.department + ")"
          }
        ]);
      });
      // let workOrderPersonnel = [
      //   [
      //     {
      //       title: "原属业务员：",
      //       value: "暂时没有"
      //     }
      //   ],
      //   [
      //     {
      //       title: "运营主管：",
      //       value: "暂时没有"
      //     }
      //   ],
      //   [
      //     {
      //       title: "阿里客服：",
      //       value: "暂时没有"
      //     }
      //   ],
      //   [
      //     {
      //       title: "旺旺客服：",
      //       value: "暂时没有"
      //     }
      //   ],
      //   [
      //     {
      //       title: "美工：",
      //       value: "暂时没有"
      //     }
      //   ]
      // ];

        this.workOrderPersonnel = workOrderPersonnel;
    },
    // 获取评价详情
    getEvaluateInfo() {
      getEvaluateInfo(this.info.id, "").then(res => {
        if (res.status != 200) {
          return;
        }
        console.log(res);
        let evaluateList = res.data[0] ? res.data[0].evaluateContent : [];
        evaluateList.forEach(item => {
          if (
            item.type == "number" &&
            item.otherAttribute.showType == "score"
          ) {
            item.otherAttribute.maxNum = parseFloat(item.otherAttribute.maxNum);
          }
        });
        this.evaluateList = evaluateList;
      });
    }
  },
  data() {
		return {
			workOrderPersonnel: [],
			cunstomInfo: [],
			workOrderInfo: [],
			talkNewsList: [],
			evaluateList: [],
			workSheetId: 0,
			info: {
				cellphone: "",
				companyVoList: [],
				confirmTime: "",
				createAt: "",
				departmentId: null,
				departmentName: "",
				evaluateTime: null,
				executorId: 0,
				executorName: "",
				finishTime: null,
				handleType: 0,
				id: 0,
				identifier: "", //工单编号
				leadingName: "",
				leadingOfficial: 0,
				participator: "",
				responseTime: "",
				title: "",
				userId: "",
				workType: 0
			}
		};
	},
	created() {
			this.workSheetId = this.$route.query.workSheetId;
	},
	mounted() {
		this.getWorkSheetInfo();
	}
};
</script>