export const tableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 220,
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
    column: [
        {
            label: '注册时间',
            prop: 'userRegtime'
        },
        {
            label: '用户名',
            prop: 'realName',
            search: true
        },
        {
            label: '手机号',
            prop: 'userMobile',
            search: true
        },
        {
            label: '姓名',
            prop: 'nickName',
            search: true
        },
        // {
        //     label: '性别',
        //     prop: 'sex',
        //     search: true,
        //     type: 'radio',
        //     dicData: [
        //         {
        //             label: '男',
        //             value: 'M'
        //         },
        //         {
        //             label: '女',
        //             value: 'F'
        //         }
        //     ]
        // },
        {
            label: '身份证',
            prop: 'userMail'
        },
        {
            label: '是否有意向',
            prop: 'yy',
            type: 'radio',
            dicData: [
                {
                    label: '是',
                    value: 1
                },
                {
                    label: '否',
                    value: 0
                },
                {
                    label: '否',
                    value: 'null'
                }
            ]
        },
        {
            label: '是否已购',
            prop: 'status',
            type: 'radio',
            dicData: [
                {
                    label: '是',
                    value: 1
                },
                {
                    label: '否',
                    value: 0
                },
                {
                    label: '否',
                    value: null
                }
            ]
        }
    ]
}

export const plannertableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 200,
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
    column: [
        {
            label: '用户名',
            prop: 'realName',
            search: true
        },
        {
            label: '手机号',
            prop: 'userMobile',
            search: true
        },
        {
            label: '姓名',
            prop: 'nickName',
            search: true
        },
        {
            label: '加入时间',
            prop: 'userRegtime'
        },
        {
            label: '理财师客户明细',
            prop: 'userRegtime1'
        },
        {
            label: '产品明细',
            prop: 'detail'
        }
    ]
}

export const plannerProdOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    // menuWidth: 350,
    menu: false,
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
    column: [
        {
            label: '产品名称',
            prop: 'name'
        },
        {
            label: '状态',
            prop: 'state',
            labelWidth: '80',
            dicData: [
                {
                    label: '存续中',
                    value: 0
                },
                {
                    label: '已完成',
                    value: 1
                }
            ]
        },
        {
            label: '客户名',
            prop: 'nickName'
        },
        {
            label: '身份证',
            prop: 'userMail'
        },
        {
            label: '手机号',
            prop: 'userMobile'
        },
        {
            label: '持有金额',
            prop: 'amount'
        },
        {
            label: '成立时间',
            prop: 'otime'
        },
        {
            label: '到期时间',
            prop: 'dtime'
        }
    ]
}
export const plannerCustomOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    header: false,
    // menuWidth: 350,
    menu: false,
    align: 'center',
    refreshBtn: false,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    props: {
        label: 'label',
        value: 'value'
    },
    column: [
        {
            label: '客户名',
            prop: 'nickName'
        },
        {
            label: '身份证',
            prop: 'userMail',
            labelWidth: '80'
        },
        {
            label: '手机号',
            prop: 'userMobile'
        },
        {
            label: '持有产品数量',
            prop: 'amount'
        },
        {
            label: '持有金额',
            prop: 'amount'
        }
    ]
}
export const buytableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 350,
    align: 'center',
    refreshBtn: false,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    menu: false,
    props: {
        label: 'label',
        value: 'value'
    },
    column: [
        {
            label: '用户名',
            prop: 'realName',
            search: true
        },
        {
            label: '手机号',
            prop: 'userMobile',
            search: true
        },
        {
            label: '姓名',
            prop: 'nickName',
            search: true
        },
        // {
        // 	label: "性别",
        // 	prop: "sex",
        // },
        {
            label: '身份证',
            prop: 'userMail'
        },
        {
            label: '购买产品详情',
            prop: 'detail'
        }
    ]
}

export const userbuytableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 200,
    align: 'center',
    refreshBtn: false,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    props: {
        label: 'label',
        value: 'value'
    },
    column: [
        {
            label: '产品名称',
            prop: 'name',
            search: true
        },
        {
            label: '状态',
            prop: 'state',
            search: true,
            type: 'select',
            dicData: [
                {
                    label: '存续中',
                    value: 0
                },
                {
                    label: '已完成',
                    value: 1
                }
            ]
        },
        {
            label: '业绩比较基准',
            prop: 'brief'
        },
        {
            label: '成立时间',
            prop: 'otime'
        },
        {
            label: '计息时间',
            prop: 'periods'
        },
        {
            label: '计息天数',
            prop: 'days'
        },
        {
            label: '到期时间',
            prop: 'dtime'
        },
        {
            label: '总认购金额',
            prop: 'zmount'
        },
        {
            label: '回款计划',
            prop: 'bplan'
        },
        {
            label: '期数',
            prop: 'scount'
        },
        {
            label: '认购用户',
            prop: 'ucount'
        }
    ]
}

export const userbuyBtableOption = {
    searchMenuSpan: 6,
    columnBtn: false,
    border: true,
    // selection: true,
    index: false,
    indexLabel: '序号',
    stripe: true,
    menuAlign: 'center',
    menuWidth: 200,
    align: 'center',
    refreshBtn: false,
    searchSize: 'mini',
    addBtn: false,
    editBtn: false,
    delBtn: false,
    viewBtn: false,
    props: {
        label: 'label',
        value: 'value'
    },
    column: [
        {
            label: '产品名称',
            prop: 'name',
            search: true
        },
        {
            label: '状态',
            prop: 'status',
            search: true,
            type: 'select',
            dicData: [
                {
                    label: '存续中',
                    value: 0
                },
                {
                    label: '已完成',
                    value: 1
                }
            ]
        },
        {
            label: 'IRR',
            prop: 'irr'
        },
        {
            label: '成立时间',
            prop: 'updatedAt'
        },
        {
            label: '缴费模式',
            prop: 'paymentMode',
            type:'select',
            dicData:[]
        },
        {
            label: '总认购金额',
            prop: 'totalAmount'
        },
        {
            label: '期数',
            prop: 'totalPhases'
        },
        {
            label: '认购用户',
            prop: 'ucount'
        }
    ]
}
