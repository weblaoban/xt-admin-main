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
			prop: "recTime",
			type: "datetime",
			searchRange: true,
			search: true,
			disabledDate(time) {
				return time.getTime() < Date.now();
			},
			valueFormat: "yyyy-MM-dd HH:mm:ss",
		},
		{
			label: "姓名",
			prop: "name",
		},
		{
			label: "手机号",
			prop: "tel",
			search: true,
		},
		{
			label: "咨询内容",
			prop: "content",
			search: true,
		},
		{
			label: "状态",
			prop: "replySts",
			search: true,
			slot: true,
			type: "select",
			dicData: [
				{
					label: "未回复",
					value: 1,
				},
				{
					label: "已回复",
					value: 0,
				},
			],
		},
	],
};
