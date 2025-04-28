
import Vue from 'vue'
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
    // props: {
    //     label: 'label',
    //     value: 'value'
    // },
    column: [
        {
            label: 'id',
            prop: 'id',
            hide: true,
            search: true
        },
        {
            label: '生成时间',
            prop: 'createTime'
        },
        {
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
                },
                {
                    label: '在售',
                    value: 2
                },
                {
                    label: '售罄',
                    value: 3
                }
            ]
        },
        {
            label: '产品名字',
            prop: 'name',
            search: true
        },
        {
            label: '类型',
            prop: 'categoryId',
            dicData: [],
            props: {
                label: 'categoryName',
                value: 'categoryId'
            },
            type: 'select'
        },
        {
            label: '期限',
            prop: 'investLimitId',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '业绩比较基准',
            prop: 'brief'
        },
        {
            label: '投资门槛',
            prop: 'pmStand',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '付息方式',
            prop: 'inrestMethodId',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '投资领域',
            prop: 'prodEffId',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '防控级别',
            prop: 'lev'
        },
        {
            label: '是否推荐',
            prop: 'recommed'
        },
        {
            label: '其他详情',
            prop: 'other'
        }
    ]
}

export const bTableOption = {
    searchMenuSpan: 4,
    searchSpan: 4,
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
    // props: {
    //     label: 'label',
    //     value: 'value'
    // },
    column: [
        {
            label: 'id',
            prop: 'id',
            hide: true,
            search: true
        },
        {
            label: '生成时间',
            prop: 'createTime'
        },
        {
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
                },
                {
                    label: '在售',
                    value: 2
                },
                {
                    label: '售罄',
                    value: 3
                }
            ]
        },
        {
            label: '产品名字',
            prop: 'name',
            search: true
        },
        {
            label: '类型',
            prop: 'categoryId',
            dicData: [],
            props: {
                label: 'categoryName',
                value: 'categoryId'
            },
            type: 'select'
        },
        {
            label: '缴费模式',
            prop: 'investLimitId',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: 'IRR',
            prop: 'brief'
        },
        {
            label: '类型',
            prop: 'type',
            type: 'select',
            dicData: [[
                {
                    label: '储蓄型',
                    value: '1'
                },
                {
                    label: '重疾型',
                    value: '2'
                }
            ]],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '投资门槛',
            prop: 'pmStand',
            type: 'select',
            dicData: [],
            props: {
                label: 'name',
                value: 'id'
            }
        },
        {
            label: '是否推荐',
            prop: 'recommed',
            type: 'select',
            dicData: [{
                label: '是',
                value: 1
            }, {
                label: '否',
                value: 0
            }],
            search: true
        }
    ]
}
