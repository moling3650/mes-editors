<template>
  <el-card class="h600 ova">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{ formulaCode ? `配方(${formulaCode})的明细` : '请先选择配方' }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormulaDetail">添加配方项</el-button>
    </div>
    <el-table :data="formulaDetails" stripe size="mini" header-cell-class-name="thcell" class="w100p">
      <el-table-column prop="formulaItem" label="配方项"/>
      <el-table-column prop="materialCode" label="物料"/>
      <el-table-column prop="feedIdx" label="加料顺序"/>
      <el-table-column prop="feedQty" label="加料数量"/>
      <el-table-column fixed="right" label="操作" width="84" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editFormulaDetail(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteFormulaDetail(scope)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'
import getFormulaDetailForm from '@/form/formulaDetail'

export default {
  name: 'FormulaDetailCard',
  props: {
    formulaCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.formulaCode
    }
  },
  data () {
    return {
      formulaDetails: [],
      materialOpts: []
    }
  },
  watch: {
    formulaCode: {
      handler (value, oldValue) {
        this.formulaDetails = []
        this.materialOpts = []
        if (value) {
          this.getFormulaDetails(value)
          Api.get('Materials/Options', { formulaCode: value }).then(data => {
            this.materialOpts = toOptions(data, 'code', 'name')
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    getFormulaDetails (formulaCode) {
      Api.get('FormulaDetails', { formulaCode }).then(data => {
        this.formulaDetails = data
      })
    },

    addFormulaDetail () {
      getFormulaDetailForm({formulaCode: this.formulaCode}, 'add', this.materialOpts)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.createDate = new Date()
          Api.post('FormulaDetails', formData).then(formulaDetail => {
            this.formulaDetails.push(formulaDetail)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },

    editFormulaDetail (scope) {
      getFormulaDetailForm(scope.row, 'edit', this.materialOpts)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`FormulaDetails/${scope.row.id}`, formData).then(_ => {
            this.formulaDetails.splice(this.$index, 1, formData)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },

    deleteFormulaDetail (scope) {
      this.$confirm('此操作将永久删除该配方明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => Api.delete(`FormulaDetails/${scope.row.id}`))
        .then(_ => {
          this.formulaDetails.splice(this.$index, 1)
          this.$message.success('删除成功!')
        })
        .catch(_ => {
          this.$message.info('已取消删除')
        })
    }
  }
}
</script>

<style scoped>
</style>
