<template>
  <div id="Process">
    <el-tabs type="border-card" v-model="activeName">
      <el-tab-pane label="物料管理" name="MaterialDetail">
        <MaterialDetail/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MaterialDetail from '@/pages/MaterialDetailEditor'

export default {
  name: 'Material',
  components: {
    MaterialDetail
  },
  data () {
    return {
      activeName: 'MaterialDetail'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
