<template>
  <div id="NGCodeEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-menu background-color="darkcyan" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item v-for="item in ProductTypeList" @click="handleTypeChange(item)" :key="item.typeCode" :index="item.typeName">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.typeName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="18">
        <ExTable :model="ngCode" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import ngCode from '@/models/Quality/NGCodes'

export default {
  name: 'NGCodeEditor',
  data () {
    return {
      ProductTypeList: [],
      defaultForm: {},
      ngCode: ngCode
    }
  },
  computed: {
  },
  methods: {
    handleTypeChange (data) {
      this.defaultForm.productType = data.typeCode
      this.$refs.table.search({ productType: data.typeCode })
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
#NGCodeEditor {
  margin: 5px;
}
</style>
