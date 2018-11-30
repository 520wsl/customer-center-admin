export default {
    state: {
        //0:未知;1:老板;2:老板娘;3:经理;4:业务员;
        roleList: ['', '老板', '老板娘', '经理', '业务员'],
        // staffTagIdList staffTagIdObj 这两个是需要同步更改的
        // 0:未知;1:新开;2:续开;3:运营;4:美工;5:旺旺客服;
        staffTagIdList: ['', '新开', '续开', '运营', '美工', '旺旺客服'],
        staffTagIdObj: [
            //
            {
                key: 1,
                value: '新开',
                alias: 'xinkai'
            }, {
                key: 2,
                value: '续开',
                alias: 'xukai'
            }, {
                key: 3,
                value: '运营',
                alias: 'yunying'
            }, {
                key: 4,
                value: '美工',
                alias: 'meigong'
            }, {
                key: 5,
                value: '旺旺客服',
                alias: 'wangwang'
            }
        ]
    },
    mutations: {},
    actions: {}
};