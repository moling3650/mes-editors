<template>
  <div id="MaterialDetailEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="5">
        <el-menu background-color="darkcyan" text-color="#fff" active-text-color="#ffd04b">
          <el-menu-item v-for="item in MaterialTypeList" @click="typeId = item.typeId" :key="item.typeId" :index="item.typeName">
            <i class="el-icon-arrow-right"></i>
            <span slot="title">{{ item.typeName }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="19">
        <MaterialDetailCard :typeId="typeId"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MaterialDetailCard from '@/components/Cards/MaterialDetailCard'
import Api from '@/utils/Api'
export default {
  name: 'MaterialDetailEditor',
  components: {
    MaterialDetailCard
  },
  data () {
    return {
      MaterialTypeList: [],
      typeId: 0
    }
  },
  computed: {
  },
  methods: {
    handleProcessFlowChange (data) {
      this.typeId = data.typeId
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
</style>
