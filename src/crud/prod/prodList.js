export const tableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    selection: false,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 350,
    align: 'center',
    refreshBtn: true,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    props: {
        label: 'label',
        value: 'value'
    },
    column: [{
        label: 'id',
        prop: 'id',
        hide:true,
        search: true,
    }, {
        label: '生成时间',
        prop: 'createTime',
    }, {
        width: 150,
        label: '状态',
        prop: 'status',
        search: true,
        slot: true,
        type: 'select',
        dicData: [
            {
                label: '预售',
                value: 1
            }, {
                label: '在售',
                value: 2
            }, {
                label: '停售',
                value: 3
            }, {
                label: '完结',
                value: 4
            }
        ]
    }, {
        label: '产品名字',
        prop: 'name',
        search: true
    }, {
        label: '类型',
        prop: 'categoryId'
    }, {
        label: '期限',
        prop: 'investLimitId'
    }, {
        label: '业绩比较基准',
        prop: 'brief'
    }, {
        label: '投资门槛',
        prop: 'pmStand'
    }, {
        label: '付息方式',
        prop: 'inrestMethodId'
    }, {
        label: '投资领域',
        prop: 'prodEffId'
    }, {
        label: '防控级别',
        prop: 'lev'
    }, {
        label: '是否推荐',
        prop: 'recommed',
        search: true,
    }, {
        label: '其他详情',
        prop: 'other'
    }]
}
