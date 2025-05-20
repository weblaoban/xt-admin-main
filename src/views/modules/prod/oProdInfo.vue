<template>
  <div class="mod-prod-info">
    <el-button type="text" class="el-icon-back" @click="back">返回</el-button>
    <el-form :model="dataForm" ref="dataForm" label-width="100px">
      <!-- <el-form-item label="产品图片">
        <mul-pic-upload v-model="dataForm.imgs" />
      </el-form-item> -->
      <el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="产品名称"
              prop="name"
              :rules="[
                {
                  required: true,
                  message: '产品名称不能为空',
                  trigger: 'blur',
                },
                {
                  pattern: /\s\S+|S+\s|\S/,
                  message: '请输入正确的产品名称',
                  trigger: 'blur',
                },
              ]"
            >
              <el-col :span="20">
                <el-input
                  v-model="dataForm.name"
                  placeholder="产品名称"
                  maxlength="50"
                ></el-input>
              </el-col> </el-form-item
          ></el-col>
          <el-col :span="15">
            <el-form-item label="状态">
              <el-radio-group v-model="dataForm.status">
                <el-radio :label="1">预售</el-radio>
                <el-radio :label="2">在售</el-radio>
                <el-radio :label="3">售罄</el-radio>
              </el-radio-group>
            </el-form-item></el-col
          ></el-row
        >
        <el-col :span="8">
          <el-form-item
            label="产品分类"
            :rules="[
              { required: true, message: '请选择产品分类', trigger: 'change' },
            ]"
            prop="categoryId"
          >
            <el-col :span="24">
              <el-select
                v-model="dataForm.categoryId"
                style="width: 250px"
                placeholder="请选择产品分类"
              >
                <el-option
                  v-for="item in category.list"
                  :key="item.label"
                  :label="item.categoryName"
                  :value="item.categoryId"
                >
                </el-option>
              </el-select>
              <!--              <el-cascader-->
              <!--                expand-trigger="hover"-->
              <!--                :options="category.list"-->
              <!--                :props="category.props"-->
              <!--                v-model="category.selected"-->
              <!--                change-on-select-->
              <!--                @change="handleCategoryChange"-->
              <!--              >-->
              <!--              </el-cascader>-->
            </el-col>
          </el-form-item></el-col
        >
        <el-col :span="8">
          <el-form-item
            label="期限"
            prop="investLimitId"
            :rules="[
              { required: true, message: '请选择期限', trigger: 'change' },
            ]"
          >
            <el-col :span="20">
              <el-select
                v-model="dataForm.investLimitId"
                style="width: 250px"
                placeholder="请选择期限"
              >
                <el-option
                  v-for="item in searchs.investLimitId"
                  :key="item.label"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="业绩比较基准"
            label-width="120px"
            prop="brief"
            :rules="[
              {
                required: true,
                message: '业绩比较基准不能为空',
                trigger: 'blur',
              },
            ]"
          >
            <el-col :span="20">
              <el-input
                v-model="dataForm.brief"
                placeholder="业绩比较基准"
                maxlength="50"
              ></el-input>
            </el-col> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item
            label="投资门槛"
            prop="pmStand"
            :rules="[
              { required: true, message: '请选择投资门槛', trigger: 'change' },
            ]"
          >
            <el-col :span="20">
              <el-select
                v-model="dataForm.pmStand"
                style="width: 250px"
                placeholder="请选择投资门槛"
              >
                <el-option
                  v-for="item in searchs.pmStand"
                  :key="item.label"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="付息方式" prop="inrestMethodId">
            <el-col :span="20">
              <el-select
                v-model="dataForm.inrestMethodId"
                style="width: 250px"
                placeholder="付息方式"
              >
                <el-option
                  v-for="item in searchs.inrestMethodId"
                  :key="item.label"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="投资领域" prop="prodEffId">
            <el-col :span="20">
              <el-select
                v-model="dataForm.prodEffId"
                style="width: 250px"
                placeholder="请选择投资领域"
              >
                <el-option
                  v-for="item in searchs.prodEffid"
                  :key="item.label"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="防控级别" prop="lev">
            <el-col :span="20">
              <el-input
                v-model="dataForm.lev"
                placeholder="防控级别"
                maxlength="50"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="8"> </el-col>
        <!-- <el-col :span="16">
					<el-form-item label="是否推荐">
						<el-radio-group v-model="dataForm.recommed">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="0">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col> -->
      </el-row>

      <el-row>
        <el-col :span="8">
          <el-form-item label="发行机构" prop="organId">
            <el-select
              v-model="dataForm.organId"
              style="width: 250px"
              placeholder="请选择"
            >
              <el-option
                v-for="item in this.organList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="收益类型" prop="investId">
            <el-col :span="20">
              <el-input
                v-model="dataForm.investId"
                placeholder="收益类型"
                maxlength="50"
              ></el-input
            ></el-col>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="规模" prop="totalStocks">
            <el-col :span="20"
              ><el-input
                v-model="dataForm.totalStocks"
                placeholder="规模"
                maxlength="50"
              ></el-input
            ></el-col> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="所在地区" prop="area">
            <el-col :span="20">
              <el-input
                v-model="dataForm.area"
                placeholder="所在地区"
                maxlength="50"
              ></el-input>
            </el-col> </el-form-item
        ></el-col>
        <el-col :span="8">
          <el-form-item label="大小额配比" prop="investRatio">
            <el-col :span="20">
              <el-input
                v-model="dataForm.investRatio"
                placeholder="大小额配比"
                maxlength="50"
              ></el-input>
            </el-col> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item label="计息天数" prop="days">
            <el-col :span="20">
              <el-input-number
                v-model="dataForm.days"
                placeholder="计息天数"
                :min="1"
              ></el-input-number>
            </el-col> </el-form-item
        ></el-col>

        <el-col :span="12">
          <el-form-item label="期数" prop="periods">
            <el-select
              @change="initContent"
              v-model="dataForm.periods"
              placeholder="请选择"
            >
              <el-option
                v-for="item in 30"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option> </el-select></el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="" prop="porder">
        <div class="sold_list">
          <div class="soldItem soldhead">
            <div>序号</div>
            <div class="soldDetail">进度详情</div>
            <div style="width: 200px">计息天数</div>
            <!-- <div>操作</div> -->
          </div>
          <div
            class="soldItem"
            v-for="(item, index) in dataForm.porder"
            :key="index"
          >
            <div>{{ index + 1 }}</div>
            <div class="soldDetail">
              <el-input
                v-model="dataForm.porder[index].detail"
                placeholder="进度详情"
                maxlength="500"
                show-word-limit
                type="textarea"
              ></el-input>
            </div>
            <div style="width: 200px">
              <el-input-number
                v-model="dataForm.porder[index].day"
                placeholder="计息天数"
                :min="0"
              ></el-input-number>
            </div>
            <!-- <div @click="delSold(index)" style="color: red; cursor: pointer">
              删除
            </div> -->
          </div>
        </div>
        <!-- <el-button @click="addSold" type="text">新增进度</el-button> -->
      </el-form-item>

      <el-form-item label="产品详情" prop="content">
        <tiny-mce
          v-model="dataForm.content"
          ref="content"
          style="width: 100%"
        ></tiny-mce>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { treeDataTranslate, idList } from "@/utils";
  import MulPicUpload from "@/components/mul-pic-upload";
  import ProdTransport from "./prod-transport";
  import SkuTag from "./sku-tag";
  import SkuTable from "./sku-table";
  import TinyMce from "@/components/tiny-mce";
  import { Debounce } from "@/utils/debounce";

  export default {
    data() {
      return {
        // 分类树展示与回显
        category: {
          list: [],
          selected: [],
          props: {
            value: "categoryId",
            label: "categoryName",
          },
        },
        // 规格列表
        dataForm: {
          name: "",
          brief: "",
          categoryId: "",
          id: 0,
          investLimitId: "",
          content: "",
          status: 1,
          recommed: 1,
          pmStand: "",
          inrestMethodId: "",
          prodEffId: "",
          lev: "",
          organId: "",
          investId: "",
          totalStocks: "",
          area: "",
          investRatio: "",
          contentItem: "",
          porder: [],
        },
        searchs: {
          prodEffid: [
            {
              label: "工商企业类",
              value: "工商企业类",
            },
            {
              label: "金融市场类",
              value: "金融市场类",
            },
            {
              label: "基础设施类",
              value: "基础设施类",
            },
            {
              label: "房地产类",
              value: "房地产类",
            },
            {
              label: "资金池类",
              value: "4",
            },
            {
              label: "其他",
              value: "5",
            },
          ],
          investLimitId: [
            {
              label: "一年内（含）",
              value: "1",
            },
            {
              label: "一年至两年（含）",
              value: "2",
            },
            {
              label: "两年以上",
              value: "3",
            },
          ],
          pmStand: [
            {
              label: "50万以内（含）",
              value: "1",
            },
            {
              label: "50万至100万（含）",
              value: "2",
            },
            {
              label: "100万至300万（含）",
              value: "3",
            },
            {
              label: "300万以上",
              value: "4",
            },
          ],
          inrestMethodId: [
            {
              label: "按月付息",
              value: "1",
            },
            {
              label: "按季付息",
              value: "2",
            },
            {
              label: "半年付息",
              value: "3",
            },
            {
              label: "按年付息",
              value: "4",
            },
            {
              label: "到期付息",
              value: "5",
            },
          ],
        },
        tags: [],
        resourcesUrl: process.env.VUE_APP_RESOURCES_URL,
        organList: [],
      };
    },
    components: {
      MulPicUpload,
      ProdTransport,
      TinyMce,
      SkuTag,
      SkuTable,
    },
    computed: {
      defalutSku() {
        return this.$store.state.prod.defalutSku;
      },
    },
    activated() {
      this.dataForm.id = this.$route.query.prodId;
      console.log(this.$route.query.prodId);
      this.getDataList();
      this.getBaseInfo();
    },
    methods: {
      // 获取分类数据
      getDataList() {
        this.getOrganList();
        this.getCategoryList().then(() => {
          if (this.dataForm.id) {
            // 获取产品数据
            this.$http({
              url: this.$http.adornUrl(`/admin/prod/info/${this.dataForm.id}`),
              method: "get",
              params: this.$http.adornParams(),
            }).then(({ data }) => {
              this.dataForm = data;

              this.dataForm.porder = JSON.parse(this.dataForm.porder);
              // this.$refs.skuTag.init(data.skuList)
              // this.$refs.skuTable.init()
              this.category.selected = idList(
                this.category.list,
                this.dataForm.categoryId,
                "categoryId",
                "children"
              ).reverse();
              this.dataForm.tagList = data.tagList;
            });
          } else {
            this.$nextTick(() => {
              this.$refs["dataForm"].resetFields();
              // this.$refs.skuTag.init()
              this.dataForm.pic = "";
              this.dataForm.imgs = "";
            });
          }
        });
      },

      // 获取枚举信息
      getBaseInfo() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/admin/categoryContent/table"),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          // 期限
          this.searchs.investLimitId = this.getDataByParent(12, data);
          // 付息方式
          this.searchs.inrestMethodId = this.getDataByParent(13, data);
          // 投资门槛
          this.searchs.pmStand = this.getDataByParent(14, data);
          // 投资领域
          this.searchs.prodEffid = this.getDataByParent(15, data);
        });
      },
      getDataByParent(parentId, origin) {
        const data = [...origin];
        const result = data.filter((item) => item.parentId === parentId);
        return result.map((item) => {
          item.id = item.id + "";
          return item;
        });
      },
      // 机构信息
      getOrganList() {
        return this.$http({
          url: this.$http.adornUrl("/admin/organDetail/page?size=100"),
          method: "get",
        }).then(({ data }) => {
          this.organList = data.records;
        });
      },
      // 获取分类信息
      getCategoryList() {
        return this.$http({
          url: this.$http.adornUrl("/admin/category/listCategory"),
          method: "get",
          params: this.$http.adornParams(),
        }).then(({ data }) => {
          data = data.filter((item) => item.parentId ===2);
          this.category.list = treeDataTranslate(data, "categoryId", "parentId");
        });
      },
      // 选择分类改变事件
      handleCategoryChange(val) {
        this.dataForm.categoryId = val[val.length - 1];
      },
      addSold() {
        this.dataForm.porder.push({ detail: "" });
      },
      delSold(index) {
        const sold = [...this.dataForm.porder];
        sold.splice(index, 1);
        this.dataForm.porder = sold;
      },
      // 表单提交
      dataFormSubmit: Debounce(function () {
        this.$refs["dataForm"].validate((valid) => {
          if (!valid) {
            return;
          }
          let param = Object.assign({}, this.dataForm);
          param.porder = JSON.stringify(param.porder);
          this.$http({
            url: this.$http.adornUrl(`/admin/prod`),
            method: param.id ? "put" : "post",
            data: this.$http.adornData(param),
          }).then(({ data }) => {
            this.$message({
              message: "操作成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$store.commit("common/removeMainActiveTab");
                this.$router.push({ name: "prod-prodList" });
                this.$emit("refreshDataList");
              },
            });
          });
        });
      }),
      back() {
        this.$router.push({ name: "prod-prodList" });
      },
      paramSetPriceAndStocks(param) {
        // 获取规格属性信息
        // param.skuList = this.$refs.prodSpec.getTableSpecData()
        // 商品库存
        param.totalStocks = 0;
        // 商品价格
        param.price = 0;
        // 商品原价
        param.oriPrice = 0;
        // 商品实际库存
        for (let i = 0; i < param.skuList.length; i++) {
          const element = param.skuList[i];
          if (element.status !== 1) {
            continue;
          }
          if (param.price === 0) {
            param.price = element.price ? Number.parseFloat(element.price) : 0;
          }
          // 商品价格为最低价的那件商品的价格
          param.price = Math.min(param.price, element.price);
          if (param.price === element.price) {
            param.oriPrice = element.oriPrice
              ? Number.parseFloat(element.oriPrice)
              : 0;
          }
          param.totalStocks += element.stocks
            ? Number.parseInt(element.stocks)
            : 0;
        }
        // 如果sku没有商品名称，则使用商品的商品名称
        if (param.skuList.length === 1) {
          param.skuList[0].prodName = this.dataForm.prodName;
        }
      },
      skuTagChangeSkuHandler(skuList) {
        const prodName = this.dataForm.prodName;
        skuList.forEach((sku) => {
          if (sku.properties) {
            sku.skuName = "";
            let properties = sku.properties.split(";");
            for (const propertiesKey in properties) {
              sku.skuName += properties[propertiesKey].split(":")[1] + " ";
            }
            sku.prodName = prodName + " " + sku.skuName;
          }
        });
        this.dataForm.skuList = skuList;
      },
      errorMsg(message) {
        this.$message({
          message: message,
          type: "error",
          duration: 1500,
        });
      },

      initContent(value) {
        const content = [];
        for (let i = 0; i < value; i++) {
          content.push({
            finish: false,
            detail: "",
            day: "",
          });
        }
        this.dataForm.porder = content;
      },
    },
  };
</script>

<style lang="scss">
  .sold_list {
    width: 600px;
    margin-bottom: 10px;
    .empty {
      text-align: center;
      padding: 20px;
    }
    .soldItem {
      display: flex;
      & > div {
        width: 100px;
        flex-shrink: 0;
        padding: 10px 0;
        border: 1px solid #eee;
        text-align: center;
        &.soldDetail {
          flex: 1;
          text-align: center;
          padding: 10px 20px;
        }
      }
    }
  }
</style>
