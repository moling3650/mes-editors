<template>
  <div id="DriveEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <DriveTypeTreeCard @change="handleDriveTypeChange"/>
      </el-col>

      <el-col :span="18">
        <ExTable :model="drive" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import DriveTypeTreeCard from '@/components/Cards/DriveTypeTreeCard'
import drive from '@/models/System/Drives'
export default {
  name: 'DriveEditor',
  components: {
    DriveTypeTreeCard
  },
  data () {
    return {
      typeId: 0,
      defaultForm: {},
      drive: drive
    }
  },
  computed: {
  },
  methods: {
    handleDriveTypeChange (data) {
      this.defaultForm.typeId = data.typeId
      this.$refs.table.search({ typeId: data.typeId })
    }
  }
}
</script>

<style scoped>
#DriveEditor {
  margin: 5px;
}
</style>
