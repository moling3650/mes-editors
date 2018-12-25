<template>
  <div id="DataTranslationEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="24">
        <el-card class="box-card" :body-style="  { padding: '10px' }">
          <div slot="header" class="clearfix">
            <span class="card-header--text">转译字典管理</span>
          </div>
          <ExTable :model="dataTranslations"></ExTable>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import dataTranslations from '@/models/System/DataTranslations'

export default {
  name: 'DataTranslationEditor',
  data () {
    return {
      dataTranslations: dataTranslations
    }
  }
}
</script>

<style scoped>
#DataTranslationEditor {
  margin: 5px;
}
</style>
