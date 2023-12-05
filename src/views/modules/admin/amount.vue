<template>
	<div style="width:300px">
        <el-form label-width="80px">

            <el-form-item label="累计交易"><el-input></el-input></el-form-item>
		<el-form-item label="累计客户"><el-input></el-input></el-form-item>
    
  <el-form-item>
    <el-button type="primary" @click="onSubmit">保存</el-button>
  </el-form-item>
        </el-form>
	</div>
</template>

<script>
export default {
  data () {
    return {
      info: {}
    }
  }
}
</script>
