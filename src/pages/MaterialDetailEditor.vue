<template>
  <div id="MaterialDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5" class="col">
        <el-menu background-color="#ffffff" text-color="black" active-text-color="#015ea2">
          <el-menu-item v-for="item in MaterialTypeList" @click="handleTypeChange(item)" :key="item.typeId" :index="item.typeName">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.typeName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="19">
        <ExTable :model="material" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import Api from '@/utils/Api'
import material from '@/models/System/Materials'
export default {
  name: 'MaterialDetailEditor',
  components: {
  },
  data () {
    return {
      MaterialTypeList: [],
      defaultForm: {},
      material: material
    }
  },
  computed: {
  },
  methods: {
    handleTypeChange (data) {
      this.defaultForm.typeId = data.typeId
      this.$refs.table.search({ typeId: data.typeId })
    }
  },
  created () {
    Api.get(`MaterialTypes`).then(data => {
      this.MaterialTypeList = data
    })
  }
}
</script>

<style scoped>
#ProcessDetailEditor {
  margin: 5px;
}

.col {
  height: 500px;
  overflow-y: auto;
}
</style>
