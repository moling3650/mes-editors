<template>
  <div id="ProductGradeEditor">
    <el-tabs type="border-card">
      <el-tab-pane label="成品等级管理">
        <el-row :gutter="20" class="row">
          <el-col :span="5" class="col">
            <el-menu background-color="#ffffff" text-color="black" active-text-color="#015ea2" class="elmenu">
              <el-menu-item v-for="item in ProductTypeList" @click="handleTypeChange(item)" :key="item.typeCode" :index="item.typeName">
                <i class="el-icon-arrow-right"></i>
                <span slot="title">{{ item.typeName }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>

          <el-col :span="18">
            <ExTable :model="productGrades" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Api from '@/utils/Api'
import productGrades from '@/models/Quality/ProductGrades'

export default {
  name: 'ProductGradeEditor',
  data () {
    return {
      ProductTypeList: [],
      defaultForm: {},
      productGrades: productGrades
    }
  },
  computed: {
  },
  methods: {
    handleTypeChange (data) {
      this.defaultForm.typeCode = data.typeCode
      this.$refs.table.search({ typeCode: data.typeCode })
    }
  },
  created () {
    Api.get(`ProductTypes`).then(data => {
      this.ProductTypeList = data
    })
  }
}
</script>

<style scoped>
#ProductGradeEditor {
  margin-top: 15px;
  margin-left: 5px;
}

.col {
  height: 500px;
  overflow-y: auto;
}

.elmenu {
  height: 500px;
}
</style>
