<template>
  <div id="Formula">

    <!-- BOM -->
    <el-row :gutter="10" class="row">
      <!-- Formula -->
      <el-col :span="10">
        <FormulaCard :bomCode="bomCode" @change="handleFormulaChange"></FormulaCard>
      </el-col>
      <!-- FormulaDetail -->
      <el-col :span="14">
        <FormulaDetailCard :formulaCode="formulaCode"></FormulaDetailCard>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import FormulaCard from '@/components/Cards/FormulaCard'
import FormulaDetailCard from '@/components/Cards/FormulaDetailCard'

export default {
  name: 'Formula',
  components: {
    FormulaCard,
    FormulaDetailCard
  },
  props: {
    bomCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      formulaCode: ''
    }
  },
  watch: {
    bomCode (value) {
      this.formulaCode = ''
    }
  },
  methods: {
    handleFormulaChange (formula) {
      this.formulaCode = formula.formulaCode
    }
  }
}
</script>

<style scoped>
</style>
