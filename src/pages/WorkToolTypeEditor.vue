<template>
  <div id="WorkToolTypeEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <ExSelectButtonGroup model="WorkToolType" value="type_id" label="type_name" @change="handleWorkToolTypeChange"/>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <WorkToolKindCard :typeId="typeId" @change="handleWorkToolKindChange"></WorkToolKindCard>
      </el-col>

      <el-col :span="16">
        <WorkToolPropertyCard :kindId="kindId"></WorkToolPropertyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import WorkToolKindCard from '@/components/Cards/WorkToolKindCard'
import WorkToolPropertyCard from '@/components/Cards/WorkToolPropertyCard'

export default {
  name: 'WorkToolTypeEditor',
  components: {
    WorkToolKindCard,
    WorkToolPropertyCard
  },
  data () {
    return {
      typeId: '',
      kindId: '',
      workToolProperty: {}
    }
  },
  methods: {
    handleWorkToolTypeChange (workToolType) {
      this.typeId = workToolType.type_id
      this.kindId = ''
    },

    handleWorkToolKindChange (workToolKind) {
      this.kindId = workToolKind.kind_id
    }
  }
}
</script>
