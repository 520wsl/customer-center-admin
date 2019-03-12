/*
 * @Author: Mad Dragon 395548460@qq.com
 * @Date: 2018-11-16 18:48:22
 * @Last Modified by: Mad Dragon
 * @Last Modified time: 2019-01-05 13:49:42
 * @explanatory:  工单模块
 */
import {getWorkSheetInfoData} from "@/api/admin/workSheet/workSheet";

export default {
    state: {
        workSheetBaseInfo: {},
        workSheetType: [
            {
                key: 0,
                value: "未知资源类型"
            },
            {
                key: 2,
                value: "续开工单"
            },
            {
                key: 3,
                value: "美工工单"
            },
            // {
            // 	key: 4,
            // 	value: "深度运营"
            // },
            {
                key: 5,
                value: "运营"
            },
            // {
            // 	key: 6,
            // 	value: "新开工单"
            // },
            {
                key: 9,
                value: "建议"
            },
            {
                key: 10,
                value: "投诉"
            }
        ],
        workSheetHandleType: [
            {
                key: 0,
                value: "待受理"
            },
            {
                key: 1,
                value: "待受理"
            },
            {
                key: 2,
                value: "受理中"
            },
            {
                key: 3,
                value: "待评价"
            },
            {
                key: 4,
                value: "已评价"
            },
            {
                key: 5,
                value: "移交中"
            },
            {
                key: 6,
                value: "已撤销"
            }
        ],
        workSheetEventType: [
            {
                key: 0,
                value: "普通消息"
            },
            {
                key: 1,
                value: "电话沟通"
            },
            {
                key: 2,
                value: "电话号码采集"
            },
            {
                key: 3,
                value: "账号密码采集"
            },
            {
                key: 4,
                value: "其他类型"
            },
            {
                key: 5,
                value: "工单动态"
            }
        ],
        // 客户角色
        customeIdentity: [
            {
                key: 0,
                value: "未知"
            },
            {
                key: 1,
                value: "老板"
            },
            {
                key: 2,
                value: "老板娘"
            },
            {
                key: 3,
                value: "经理"
            },
            {
                key: 4,
                value: "业务员"
            }
        ]
    },
    mutations: {
        setWorkSheetBaseInfo(state, workSheetBaseInfo) {
            state.workSheetBaseInfo = workSheetBaseInfo;
        }
    },
    actions: {}
};
