<template>
  <div id="MouldTypeEditor">
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <ExSelectButtonGroup model="MouldType" value="type_id" label="type_name" @change="handleMouldTypeChange"/>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <MouldKindCard :typeId="typeId" @change="handleMouldKindChange"></MouldKindCard>
      </el-col>

      <el-col :span="16">
        <MouldPropertyCard :kindId="kindId"></MouldPropertyCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MouldKindCard from '@/components/Cards/MouldKindCard'
import MouldPropertyCard from '@/components/Cards/MouldPropertyCard'

export default {
  name: 'MouldTypeEditor',
  components: {
    MouldKindCard,
    MouldPropertyCard
  },
  data () {
    return {
      typeId: '',
      kindId: '',
      mouldProperty: {}
    }
  },
  methods: {
    handleMouldTypeChange (mouldType) {
      this.typeId = mouldType.type_id
      this.kindId = ''
    },

    handleMouldKindChange (mouldKind) {
      this.kindId = mouldKind.kind_id
    }
  }
}
</script>
