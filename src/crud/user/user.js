export const tableOption = {
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
            prop: 'nickName',
            search: true
        },
        {
            label: '手机号',
            prop: 'nickName',
            search: true
        },
        {
            label: '姓名',
            prop: 'nickName',
            search: true
        },
        {
            label: '性别',
            prop: 'nickName',
            search: true
        },
        {
            label: '身份证',
            prop: 'nickName'
        },
        {
            label: '是否有意向',
            prop: 'yixiang',
            type:'radio',
            dicData:[
                {
                    label:'是',
                    value:1
                },
                {
                    label:'否',
                    value:0
                }
            ]
        }, 
        {
            label: '是否已购',
            prop: 'yixiang'
        }
    ]
}

// export const buytableOption = {
//     searchMenuSpan: 6,
//     columnBtn: false,
//     border: true,
//     // selection: true,
//     index: false,
//     indexLabel: '序号',
//     stripe: true,
//     menuAlign: 'center',
//     menuWidth: 350,
//     align: 'center',
//     refreshBtn: true,
//     searchSize: 'mini',
//     addBtn: false,
//     editBtn: false,
//     delBtn: false,
//     viewBtn: false,
//     props: {
//         label: 'label',
//         value: 'value'
//     },
//     column: [
//         {
//             label: '用户名',
//             prop: 'nickName',
//             search: true
//         },
//         {
//             label: '手机号',
//             prop: 'nickName',
//             search: true
//         },
//         {
//             label: '姓名',
//             prop: 'nickName',
//             search: true
//         },
//         {
//             label: '性别',
//             prop: 'nickName'
//         },
//         {
//             label: '身份证',
//             prop: 'nickName'
//         },
//         {
//             label: '购买产品详情',
//             prop: 'detail'
//         }
//     ]
// }
