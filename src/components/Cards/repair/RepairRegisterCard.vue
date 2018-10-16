<template>
  <div>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="批次">
          <el-input placeholder="批次编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="工单">
          <el-input placeholder="工单编号"></el-input>
        </el-form-item>
        <el-form-item label="不良工序">
          <el-select placeholder="不良工序">
            <el-option label="正极涂布单面" value="danmian"></el-option>
            <el-option label="正极涂布双面" value="shuangmian"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品类型">
          <el-input placeholder="产品类型" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input placeholder="工单数量" size="medium" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="次数">
          <el-input placeholder="已维修次数" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="现象代码">
          <el-input placeholder="现象代码"></el-input>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
