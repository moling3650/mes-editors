<template>
  <div id="MachineModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader :options="products" placeholder="请选择产品" filterable @change="handleProductChange" class="w100p"/>
      </el-col>
    </el-row>

  </div>
</template>
