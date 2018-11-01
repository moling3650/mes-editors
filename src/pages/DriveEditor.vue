<template>
  <div id="DriveEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="10">
        <DriveTypeTreeCard @change="handleDriveTypeChange"/>
      </el-col>

      <el-col :span="14">
        <DriveDetailCard :typeId="typeId"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import DriveTypeTreeCard from '@/components/Cards/DriveTypeTreeCard'
import DriveDetailCard from '@/components/Cards/DriveDetailCard'

export default {
  name: 'DriveEditor',
  components: {
    DriveTypeTreeCard,
    DriveDetailCard
  },
  data () {
    return {
      typeId: 0
    }
  },
  computed: {
  },
  methods: {
    handleDriveTypeChange (data) {
      this.typeId = data.typeId
    }
  }
}
</script>

<style scoped>
#DriveEditor {
  margin: 5px;
}
</style>
