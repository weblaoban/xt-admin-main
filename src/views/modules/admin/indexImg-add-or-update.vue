<template>
	<div class="mod-index-img">
		<el-dialog
			title="编辑"
			:close-on-click-modal="false"
			:visible.sync="visible"
		>
			<el-form
				:model="dataForm"
				ref="dataForm"
				:rules="dataRule"
				label-position="top"
				label-width="100px"
			>
				<el-form-item label="1.上传图片" prop="imgUrl">
					<pic-upload v-model="dataForm.imgUrl"></pic-upload>
				</el-form-item>
				<el-form-item
					label="顺序"
					prop="seq"
					:rules="[
						{
							required: false,
							pattern: /\s\S+|S+\s|\S/,
							message: '请输入正确的顺序',
							trigger: 'blur',
						},
					]"
				>
					<el-input v-model="dataForm.seq"></el-input>
				</el-form-item>
				<!-- <el-form-item label="状态"
                      prop="status">
          <el-radio-group v-model="dataForm.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item> -->
				<el-form-item label="2.图片链接">
					<el-radio-group v-model="dataForm.type" @change="deleteRelation">
						<el-radio :label="-1">不跳转链接</el-radio>
						<el-radio :label="0">跳转</el-radio>
					</el-radio-group>
				</el-form-item>

				<div v-if="dataForm.type == 0">
					<el-form-item label="" prop="link">
						<el-input
							v-model="dataForm.link"
							placeholder=" 复制链接到对话框中"
						></el-input>
					</el-form-item>
				</div>
				<el-form-item>
					<el-button type="primary" @click="dataFormSubmit()">确定</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
		<!-- 商品选择弹窗-->
		<prods-select
			v-if="prodsSelectVisible"
			ref="prodsSelect"
			:isSingle="true"
			@refreshSelectProds="selectCouponProds"
		></prods-select>
	</div>
</template>

<script>
import PicUpload from "@/components/pic-upload";
import ProdsSelect from "@/components/prods-select";
import { Debounce } from "@/utils/debounce";
export default {
	data() {
		return {
			dataForm: {
				status: 1,
				des: "",
				imgUrl: "",
				seq: 0,
				imgId: 0,
				type: -1,
				relation: null,
				link: "",
			},
			dataRule: {
				imgUrl: [
					{ required: true, message: "轮播图片不能为空", trigger: "blur" },
				],
				link: [
					{ required: true, message: "跳转链接不能为空", trigger: "blur" },
				],
			},
			// 关联数据
			card: {
				id: 0,
				pic: "",
				name: "",
				realData: {
					prod: [],
					shop: [],
					activity: [],
				},
			},
			page: {
				total: 0, // 总页数
				currentPage: 1, // 当前页数
				pageSize: 10, // 每页显示多少条
			},
			prodsSelectVisible: false,
			visible: false,
		};
	},
	components: {
		PicUpload,
		ProdsSelect,
	},
	methods: {
		// 获取分类数据
		init(id) {
			this.visible = true;
			this.dataForm.imgId = id || 0;
			if (this.dataForm.imgId) {
				// 获取产品数据
				this.$http({
					url: this.$http.adornUrl(
						`/admin/content/info/${this.dataForm.imgId}`
					),
					method: "get",
					params: this.$http.adornParams(),
				}).then(({ data }) => {
					this.dataForm = data;
					if (data.link) {
						this.dataForm.type = 0;
					} else {
						this.dataForm.type = -1;
					}
				});
			} else {
				this.$nextTick(() => {
					this.$refs["dataForm"].resetFields();
					this.dataForm.imgUrl = "";
				});
			}
		},
		// 表单提交
		dataFormSubmit: Debounce(function () {
			this.$refs["dataForm"].validate((valid) => {
				if (!valid) {
					return;
				}
				let param = this.dataForm;
				this.$http({
					url: this.$http.adornUrl(`/admin/content`),
					method: param.id ? "put" : "post",
					data: this.$http.adornData(param),
				}).then(({ data }) => {
					this.$message({
						message: "操作成功",
						type: "success",
						duration: 1500,
						onClose: () => {
							this.visible = false;
							this.$emit("refreshDataList", this.page);
						},
					});
				});
			});
		}),
		// 删除关联数据
		deleteRelation(value) {
			this.dataForm.type = value;
		},
	},
};
</script>
<style lang="scss">
//card样式
.card-prod-bottom {
	position: relative;
	text-align: left;
	.card-prod-name {
		margin: auto;
		padding: 0 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 118px;
		display: inline-block;
	}
	.card-prod-name-button {
		position: absolute;
		top: 24px;
		right: 10px;
	}
}
</style>
