<template>
    <div class="mod-prod-info">
        <el-form :model="dataForm" ref="dataForm" label-width="100px">
            <!-- <el-form-item label="产品图片">
        <mul-pic-upload v-model="dataForm.imgs" />
      </el-form-item> -->
            <el-row>
                <el-row>
                <el-col :span="8">
                    <el-form-item label="产品名称" prop="name" :rules="[
                        { required: true, message: '产品名称不能为空',
                            trigger: 'blur', },
                        {
                            pattern: /\s\S+|S+\s|\S/,
                            message: '请输入正确的产品名称',
                            trigger: 'blur',
                        },
                    ]">
                        <el-col :span="20">
                            <el-input v-model="dataForm.name" placeholder="产品名称" maxlength="50"></el-input>
                        </el-col> </el-form-item></el-col>
                <el-col :span="15">
                    <el-form-item label="状态">
                        <el-radio-group v-model="dataForm.status">
                            <el-radio :label="1">预售</el-radio>
                            <el-radio :label="2">在售</el-radio>
                            <el-radio :label="3">停售</el-radio>
                            <el-radio :label="4">完结</el-radio>
                        </el-radio-group>
                    </el-form-item></el-col></el-row>
                <el-col :span="8">
                    <el-form-item label="产品分类" :rules="[{ required: true, message: '请选择产品分类' }]" prop="categoryId">
                        <el-col :span="24">
                            <el-cascader expand-trigger="hover" :options="category.list" :props="category.props"
                                v-model="category.selected" change-on-select @change="handleCategoryChange">
                            </el-cascader>
                        </el-col> </el-form-item></el-col>
                <el-col :span="8">
                    <el-form-item label="期限" prop="investLimitId">
                        <el-col :span="20">
                            <el-input v-model="dataForm.investLimitId" placeholder="期限" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item>
                        </el-col>
                <el-col :span="8"> 
                    <el-form-item label="业绩比较基准" prop="brief">
                        <el-col :span="20">
                            <el-input v-model="dataForm.brief" placeholder="业绩比较基准" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item></el-col>
                <el-col :span="8">
                    <el-form-item label="投资门槛" prop="pmStand">
                        <el-col :span="20">
                            <el-input v-model="dataForm.pmStand" placeholder="投资门槛" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item> </el-col>
                <el-col :span="8">
                    <el-form-item label="付息方式" prop="inrestMethodId">
                        <el-col :span="20">
                            <el-input v-model="dataForm.inrestMethodId" placeholder="付息方式" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item>  </el-col>
                <el-col :span="8">
                    <el-form-item label="投资领域" prop="prodEffId">
                        <el-col :span="20">
                            <el-input v-model="dataForm.prodEffId" placeholder="投资领域" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item> </el-col>
                <el-col :span="8">
                    <el-form-item label="防控级别" prop="lev">
                        <el-col :span="20">
                            <el-input v-model="dataForm.lev" placeholder="防控级别" maxlength="50"></el-input>
                        </el-col> 
                        </el-form-item>  </el-col>
                <el-col :span="8"> </el-col>
                <el-col :span="16">
                    <el-form-item label="是否推荐">
                        <el-radio-group v-model="dataForm.recommed">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">

                    <el-form-item label="发行机构" prop="organid">
           
                    <el-select v-model="dataForm.organid" multiple style="width: 250px" placeholder="请选择">
                        <el-option v-for="item in this.tags" :key="item.id" :label="item.title" :value="item.id">
                        </el-option>
                    </el-select>

            </el-form-item>
                </el-col>


                <el-col :span="8">
            <el-form-item label="收益类型" prop="investId">
                <el-col :span="20">
                    <el-input v-model="dataForm.investId" placeholder="收益类型" maxlength="50"></el-input></el-col>
                        </el-form-item>  </el-col>

 <el-col :span="8">
            <el-form-item label="规模" prop="totalStocks">
               
                    
                <el-col :span="20"><el-input v-model="dataForm.totalStocks" placeholder="规模" maxlength="50"></el-input></el-col>
                
            </el-form-item></el-col>

 <el-col :span="8">
            <el-form-item label="所在地区" prop="area">
               
                <el-col :span="20"> <el-input v-model="dataForm.area" placeholder="所在地区" maxlength="50"></el-input>
                </el-col>
            </el-form-item></el-col>
 <el-col :span="8">
            <el-form-item label="大小额配比" prop="investRatio">
                <el-col :span="20">
                    <el-input v-model="dataForm.investRatio" placeholder="大小额配比" maxlength="50"></el-input>
                </el-col>
            </el-form-item></el-col>
                </el-row>



            <el-form-item label="产品详情" prop="content">
                    <el-input show-word-limit :rows="4" type="textarea" v-model="dataForm.content" placeholder="产品详情" maxlength="500"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { treeDataTranslate, idList } from '@/utils'
import MulPicUpload from '@/components/mul-pic-upload'
import ProdTransport from './prod-transport'
import SkuTag from './sku-tag'
import SkuTable from './sku-table'
import TinyMce from '@/components/tiny-mce'
import { Debounce } from '@/utils/debounce'

export default {
  data () {
    return {
            // 分类树展示与回显
      category: {
        list: [],
        selected: [],
        props: {
          value: 'categoryId',
          label: 'categoryName'
        }
      },
            // 规格列表
      dataForm: {
        name: '',
        brief: '',
        categoryId: 0,
        id: 0,
        investLimitId: '',
        content: '',
        status: 1,
        recommed: 1,
        pmStand: '',
        inrestMethodId: '',
        prodEffId: '',
        lev: '',
        organid: '',
        investId: '',
        totalStocks: '',
        area: '',
        investRatio: '',
        contentItem: ''
      },
      tags: [],
      resourcesUrl: process.env.VUE_APP_RESOURCES_URL
    }
  },
  components: {
    MulPicUpload,
    ProdTransport,
    TinyMce,
    SkuTag,
    SkuTable
  },
  computed: {
    defalutSku () {
      return this.$store.state.prod.defalutSku
    }
  },
  activated () {
    this.dataForm.prodId = this.$route.query.prodId
    this.getDataList()
  },
  methods: {
        // 获取分类数据
    getDataList () {
    //   this.getTagList()
      this.getCategoryList().then(() => {
        if (this.dataForm.prodId) {
                    // 获取产品数据
          this.$http({
            url: this.$http.adornUrl(`/prod/prod/info/${this.dataForm.prodId}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({ data }) => {
            this.dataForm = data
            // this.$refs.skuTag.init(data.skuList)
            // this.$refs.skuTable.init()
            this.category.selected = idList(
                            this.category.list,
                            this.dataForm.categoryId,
                            'categoryId',
                            'children'
                        ).reverse()
            this.dataForm.tagList = data.tagList
          })
        } else {
          this.$nextTick(() => {
            this.$refs['dataForm'].resetFields()
            // this.$refs.skuTag.init()
            this.dataForm.pic = ''
            this.dataForm.imgs = ''
          })
        }
      })
    },
        // 获取分类信息
    getCategoryList () {
      return this.$http({
        url: this.$http.adornUrl('/prod/category/listCategory'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.category.list = treeDataTranslate(data, 'categoryId', 'parentId')
      })
    },
        // 选择分类改变事件
    handleCategoryChange (val) {
      this.dataForm.categoryId = val[val.length - 1]
    },
        // 表单提交
    dataFormSubmit: Debounce(function () {
      this.$refs['dataForm'].validate((valid) => {
        if (!valid) {
          return
        }
        let param = Object.assign({}, this.dataForm)
        this.$http({
          url: this.$http.adornUrl(`/admin/prod`),
          method: param.id ? 'put' : 'post',
          data: this.$http.adornData(param)
        }).then(({ data }) => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1500,
            onClose: () => {
              this.visible = false
              this.$store.commit('common/removeMainActiveTab')
              this.$router.push({ name: 'prod-prodList' })
              this.$emit('refreshDataList')
            }
          })
        })
      })
    }),
    paramSetPriceAndStocks (param) {
            // 获取规格属性信息
            // param.skuList = this.$refs.prodSpec.getTableSpecData()
            // 商品库存
      param.totalStocks = 0
            // 商品价格
      param.price = 0
            // 商品原价
      param.oriPrice = 0
            // 商品实际库存
      for (let i = 0; i < param.skuList.length; i++) {
        const element = param.skuList[i]
        if (element.status !== 1) {
          continue
        }
        if (param.price === 0) {
          param.price = element.price ? Number.parseFloat(element.price) : 0
        }
                // 商品价格为最低价的那件商品的价格
        param.price = Math.min(param.price, element.price)
        if (param.price === element.price) {
          param.oriPrice = element.oriPrice
                        ? Number.parseFloat(element.oriPrice)
                        : 0
        }
        param.totalStocks += element.stocks
                    ? Number.parseInt(element.stocks)
                    : 0
      }
            // 如果sku没有商品名称，则使用商品的商品名称
      if (param.skuList.length === 1) {
        param.skuList[0].prodName = this.dataForm.prodName
      }
    },
    skuTagChangeSkuHandler (skuList) {
      const prodName = this.dataForm.prodName
      skuList.forEach((sku) => {
        if (sku.properties) {
          sku.skuName = ''
          let properties = sku.properties.split(';')
          for (const propertiesKey in properties) {
            sku.skuName += properties[propertiesKey].split(':')[1] + ' '
          }
          sku.prodName = prodName + ' ' + sku.skuName
        }
      })
      this.dataForm.skuList = skuList
    },
    errorMsg (message) {
      this.$message({
        message: message,
        type: 'error',
        duration: 1500
      })
    },
        // 获取所有的分组信息
    getTagList () {
      this.$http({
        url: this.$http.adornUrl('/prod/prodTag/listTagList'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({ data }) => {
        this.tags = data
      })
    }
  }
}
</script>
