<template>
  <div>
    <Card class="md-card">
      <p slot="title">工单后台</p>
      <div class="search-con flex">
        <div class="search-input-item">
          <span>工单编号：</span>
          <Input class="search-input" v-model="params.identifier" placeholder="请输入搜索关键词"></Input>
        </div>
        <div class="search-input-item">
          <Select class="search-col" clearable placeholder='工单类型' v-model="params.workType">
            <Option v-for="(item,index) in workSheetType" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
          <Select class="search-col" clearable placeholder='工单状态' v-model="params.handleType">
            <Option v-for="(item,index) in statusList" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </div>
        <div class="search-input-item">
          <span>工单创建时间：</span>
          <div class="search-input-item">
            <DatePicker class="search-input" v-model="params.startTime" format='yyyy-MM-dd' type="date"></DatePicker>
            <DatePicker class="search-input" v-model="params.endTime" format='yyyy-MM-dd' type="date"></DatePicker>
          </div>
        </div>
        <div class="search-input-item">
          <span>用户手机号码：</span>
          <Input class="search-input" v-model="params.telephone" placeholder="请输入手机号"></Input>
        </div>
        <div class="search-input-item">
          <Checkbox v-model="params.isRead">新消息</Checkbox>
          <Checkbox v-model="params.execute">我执行的</Checkbox>
        </div>
        <div class="search-btn flex-right">
          <Button @click="search" type="primary">搜索</Button>
        </div>
      </div>
    </Card>
    <Card class="md-card">
      <Table :data='workOrderList' @on-sort-change="sortChange" :columns='columns' border></Table>
    </Card>
    <Card class="md-card">
      <page :pageNum="params.pageNum" :pageSize="params.pageSize" :count="params.count" @pageCurrentChange="pageCurrentChange" @pageSizeChange="pageSizeChange"></page>
    </Card>
    <sixiaudio v-model="videoModel"></sixiaudio>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { formatInitTime,startTime,endTime } from "@/libs/util/time";
import Page from "_c/admin/page";
import sixiaudio from "_c/public/audio";
import {
	getWorkSheetListData
} from "@/api/admin/workSheet/workSheet";
import "./index.less";
export default {
  components: {
    Page,
    sixiaudio 
  },
  computed:{
    ...mapState({
      workSheetType: state => state.workSheet.workSheetType,
      statusList: state => state.workSheet.workSheetHandleType
    })
  },
  data() {
    return {
      videoModel:true,
      params: {
        // 工单编号
        identifier:'',
        // 工单类型
        workType: null,
        // 工单状态
        handleType: null,
        // 工单创建开始时间
        startTime: "",
        // 工单创建结束时间
        endTime: "",
        // 是否新消息
        isRead: false,
        // 是否是我执行
        execute: false,
        // 创建时间排序
        timeSort: -1,
        // 持续时间排序
        hourSort:-1,
        // 手机号
        telephone:'',
        // 分页参数
        pageNum: 1,
        pageSize: 10,
        count: 0
      },
      workOrderList: [],
      columns: [
        {
          title: "工单编号",
          align: "center",
          key: "identifier"
        },
        {
          title: "类型",
          align: "center",
          render: (h,params)=>{
            const typelist =this.workSheetType.filter(item=>{
              return item.key==params.row.workType
            })
            if(typelist.length>0){
              return h('span',typelist[0]['value'])
            }else{
              return h('span','')
            }
          }
        },
        {
          title: "用户手机",
          align: "center",
          key: "callPhone"
        },
        {
          title: "客户昵称",
          align: "center",
          key: "wechatNickname"
        },
        {
          title: "创建时间",
          align: "center",
          width:130,
          sortable: 'custom',
          key:'startTime',
          render:  (h, params)=> {
            return h('span',params.row.startTime?formatInitTime(params.row.startTime,'YYYY-MM-DD HH:mm:ss'):'')
          }
        },
        {
          title: "持续时间",
          align: "center",
          width:130,
          sortable: 'custom',
          key:'hourSum',
          render:  (h, params)=> {
            return h('span',!params.row.hourSum?(0+'h'):(params.row.hourSum+'h'))
          }
        },
        {
          title: "响应时间",
          align: "center",
          render:  (h, params)=> {
            return h('span',!params.row.responseTime?(0+'h'):(params.row.responseTime+'h'))
          }
        },
        {
          title: "状态",
          align: "center",
          render: (h,params)=>{
            const statusList =this.statusList.filter(item=>{
              return item.key==params.row.type
            })
            if(statusList.length>0){
              return h('span',statusList[0]['value'])
            }else{
              return h('span','')
            }
          }
        },
        {
          title: "新消息",
          align: "center",
          render:(h,params)=>{
            if(params.row.isRead){
              return h('span','有')
            }else{
              return h('span','无')
            }
          }
        },
        {
          title: "责任人",
          align: "center",
          render: (h, params) => {
            const user = params.row.userVo || {};
            return h('span',user.userName+user.departmentName)
          }
        },
        {
          title: "操作",
          align: "center",
          render:(h,params)=>{
            return h('a',{
              on:{
                click:()=>{
                  console.log(this.$route)
                  this.$router.push({
                    name:'workOrder-info',
                    query:{
                    id:params.row.id,
                    identifier:params.row.identifier
                  }})
                }
              }
            },'查看工单')
          }
        }
      ]
    };
  },
  methods: {
    sortChange(column){
      console.log(column)
      // 创建时间升序
      const key = column.key;
      const order = column.order;
      if(key==='startTime' && order==='asc'){
        this.params.hourSort=-1;
        this.params.timeSort=1
        this.getList()
      }
      // 创建时间降序序
      if(key==='startTime' && order==='desc'){
        this.params.hourSort=-1;
        this.params.timeSort=0
        this.getList()
      }
      // 持续时间升序
      if(key==='hourSum' && order==='asc'){
        this.params.timeSort=-1
        this.params.hourSort=1
        this.getList()
      }
      // 持续时间降序序
      if(key==='hourSum' && order==='desc'){
        this.params.timeSort=-1
        this.params.hourSort=0
        this.getList()
      }
    },
    // 查询数据 分页页码重置
		sleectTemplateList(pageNum) {
			this.params.pageNum = pageNum;
			this.getList();
		},
		// 设置分页页码
		pageCurrentChange(pageNum) {
			this.sleectTemplateList(pageNum);
		},
		// 设置分页大小
		pageSizeChange(pageSize) {
			this.params.pageSize = pageSize;
			this.sleectTemplateList(1);
		},
    search(){
      this.params.pageNum=1;
      this.getList();
    },
    getList() {
			const data = {
        ...this.params,
				workType: this.params.workType==(null || undefined)?-1:this.params.workType,
				handleType: this.params.handleType==(null || undefined)?-1:this.params.handleType,
				startTime: this.params.startTime?startTime(this.params.startTime,'x'):'',
				endTime: this.params.endTime?endTime(this.params.endTime,'x'):'',
				isRead: this.params.handleType?1:-1,
				execute: this.params.execute?1:-1,
				pageNum: 1,
				pageSize: 10
			};
			getWorkSheetListData(data).then(res=>{
        if(res.status==200){
          this.workOrderList=res.data.list || [];
          this.params.pageNum =res.data.num || 1;
          this.params.pageSize = res.data.size || 10;
          this.params.count = res.data.count || 0;
        }else{
          this.$Message.error(res.msg)
        }
      });
		}
  },
  created(){
    this.getList()
  }
};
</script>
