export const tableOption = {
	menu: false,
	searchMenuSpan: 6,
	columnBtn: false,
	border: true,
	index: true,
	indexLabel: "序号",
	// selection: true,
	stripe: true,
	menuAlign: "center",
	menuWidth: 350,
	align: "center",
	refreshBtn: true,
	searchSize: "mini",
	addBtn: false,
	editBtn: false,
	delBtn: false,
	viewBtn: false,
	props: {
		label: "label",
		value: "value",
	},
	column: [
		{
			label: "时间",
			prop: "createTime",
			type: "datetime",
			searchRange: true,
			search: true,
		},
		{
			label: "姓名",
			prop: "userName",
			search: true,
		},
		{
			label: "手机号",
			prop: "contact",
		},
		{
			label: "咨询内容",
			prop: "contact",
			search: true,
		},
		{
			label: "状态",
			prop: "status",
			search: true,
			slot: true,
			type: "select",
			dicData: [
				{
					label: "未回复",
					value: 0,
				},
				{
					label: "已回复",
					value: 1,
				},
			],
		},
	],
};
