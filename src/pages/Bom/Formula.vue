<template>
  <div id="Formula">

    <!-- BOM -->
    <el-row :gutter="10" class="row">
      <!-- Formula -->
      <el-col :span="8">
        <FormulaCard :bomCode="bomCode" @change="handleFormulaChange"></FormulaCard>
      </el-col>
      <!-- FormulaDetail -->
      <el-col :span="16">
        <!-- <FormulaDetailCard :formulaCode="formulaCode"></FormulaDetailCard> -->
        <ExTable :model="formulaSteps" :immediate="false" ref="fs"></ExTable>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import FormulaCard from '@/components/Cards/FormulaCard'
// import FormulaDetailCard from '@/components/Cards/FormulaDetailCard'
import formulaSteps from '@/models/System/FormulaSteps'

export default {
  name: 'Formula',
  components: {
    FormulaCard
    // FormulaDetailCard
  },
  props: {
    bomCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formulaCode: '',
      formulaSteps: formulaSteps
    }
  },
  watch: {
    bomCode (value) {
      this.formulaCode = ''
      this.$refs.fs.clear()
    }
  },
  methods: {
    handleFormulaChange ({ formulaCode }) {
      this.formulaCode = formulaCode
      this.$refs.fs.search({ formulaCode })
    }
  }
}
</script>

<style scoped>
</style>
