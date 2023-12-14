<template>
	<el-dialog
		:title="!dataForm.currentId ? '新增' : '修改'"
		:close-on-click-modal="false"
		:visible.sync="visible"
	>
		<el-form
			:model="dataForm"
			:rules="dataRule"
			ref="dataForm"
			label-width="80px"
		>
			<!-- <el-form-item v-if="dataForm.type !== 2"
                    label="分类图片"
                    prop="icon">
        <pic-upload v-model="dataForm.icon"></pic-upload>
      </el-form-item> -->
			<el-form-item v-if="dataForm.type !== 2" label="分类名称" prop="name">
				<el-input
					v-model="dataForm.name"
					controls-position="right"
					:min="0"
					label="分类名称"
				></el-input>
			</el-form-item>
			<el-form-item label="上级分类">
				<el-cascader
					expand-trigger="hover"
					:options="categoryList"
					:props="categoryTreeProps"
					change-on-select
					:clearable="true"
					v-model="selectedCategory"
					@change="handleChange"
				>
				</el-cascader>
			</el-form-item>
			<el-form-item v-if="dataForm.type !== 2" label="排序号" prop="seq">
				<el-input-number
					v-model="dataForm.seq"
					controls-position="right"
					:min="0"
					label="排序号"
				></el-input-number>
			</el-form-item>
			<el-form-item label="状态" size="mini" prop="status">
				<el-radio-group v-model="dataForm.status">
					<el-radio :label="0">下线</el-radio>
					<el-radio :label="1">正常</el-radio>
				</el-radio-group>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button size="small" @click="visible = false">取消</el-button>
			<el-button size="small" type="primary" @click="dataFormSubmit()"
				>确定</el-button
			>
		</span>
	</el-dialog>
</template>
<script>
import { treeDataTranslate, idList } from "@/utils";
import PicUpload from "@/components/pic-upload";
import { Debounce } from "@/utils/debounce";
export default {
	data() {
		return {
			visible: false,
			dataForm: {
				id: 0,
				currentId: 0,
				grade: 0,
				name: "",
				seq: 1,
				status: 1,
				parentId: 0,
				icon: "",
			},
			dataRule: {
				name: [
					{ required: true, message: "分类名称不能为空", trigger: "blur" },
					{
						pattern: /\s\S+|S+\s|\S/,
						message: "请输入正确的分类名称",
						trigger: "blur",
					},
				],
				// icon: [
				//   { required: true, message: '分类图片不能为空', trigger: 'blur' }
				// ]
			},
			categoryList: [],
			selectedCategory: [],
			categoryTreeProps: {
				value: "id",
				label: "name",
			},
			isSubmit: false,
		};
	},
	components: {
		PicUpload,
	},
	methods: {
		init(id, parentId) {
			console.log(parentId);
			this.dataForm.currentId = id || 0;
			this.dataForm.id = id || 0;
			this.$http({
				url: this.$http.adornUrl("/admin/categoryContent/listCategoryContent"),
				method: "get",
				params: this.$http.adornParams(),
			})
				.then(({ data }) => {
					this.categoryList = treeDataTranslate(data, "id", "parentId");
				})
				.then(() => {
					this.visible = true;
					this.$nextTick(() => {
						this.$refs["dataForm"].resetFields();
						this.selectedCategory = [];
					});
				})
				.then(() => {
					this.dataForm.parentId = parentId || 0;
					if (this.dataForm.id) {
						// 修改
						this.$http({
							url: this.$http.adornUrl(
								`/admin/categoryContent/info/${this.dataForm.id}`
							),
							method: "get",
							params: this.$http.adornParams(),
						}).then(({ data }) => {
							this.dataForm.id = data.id;
							this.dataForm.name = data.name;
							this.dataForm.seq = data.seq;
							this.dataForm.icon = data.icon;
							this.dataForm.parentId = data.parentId;
							this.dataForm.status = data.status;
							this.selectedCategory = idList(
								this.categoryList,
								data.parentId,
								"id",
								"children"
							).reverse();
						});
					}
				});
		},
		handleChange(val) {
			this.dataForm.parentId = val[val.length - 1];
		},
		// 表单提交
		dataFormSubmit: Debounce(function () {
			if (this.selectedCategory.length === 1) {
				this.dataForm.grade = 0;
			}
			if (this.selectedCategory.length === 2) {
				this.dataForm.grade = 1;
			}
			if (this.selectedCategory.length === 3) {
				this.dataForm.grade = 2;
			}
			this.$refs["dataForm"].validate((valid) => {
				if (valid) {
					if (this.isSubmit) {
						return;
					}
					this.isSubmit = true;
					this.$http({
						url: this.$http.adornUrl(`/admin/categoryContent`),
						method: this.dataForm.id ? "put" : "post",
						data: this.$http.adornData({
							id: this.dataForm.id || "",
							name: this.dataForm.name,
							status: this.dataForm.status,
							seq: this.dataForm.seq,
							grade: this.dataForm.grade,
							parentId: this.dataForm.parentId,
						}),
					}).then(({ data }) => {
						this.$message({
							message: "操作成功",
							type: "success",
							duration: 1000,
							onClose: () => {
								this.isSubmit = false;
								this.visible = false;
								this.dataForm.parentId = 0;
								this.$emit("refreshDataList");
								this.$refs["dataForm"].resetFields();
							},
						});
					});
				}
			});
		}),
	},
};
</script>
