<template>
  <el-card class="h600 ova">
    <div slot="header" class="clearfix">
      <span class="card-header">{{ formulaCode ? `配方(${formulaCode})的明细` : '请先选择配方' }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addFormulaDetail">添加配方项</el-button>
    </div>
    <el-table :data="formulaDetailList" stripe size="mini" header-cell-class-name="thcell" class="w100p">
      <el-table-column prop="formula_item" label="配方项"/>
      <el-table-column prop="material_code" label="物料"/>
      <el-table-column prop="feed_idx" label="加料顺序"/>
      <el-table-column prop="feed_qty" label="加料数量"/>
      <el-table-column fixed="right" label="操作" width="84" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editFormulaDetail(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteFormulaDetail(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getFormulaDetailForm from '@/form/formulaDetail'

export default {
  name: 'FormulaDetailCard',
  props: {
    formulaCode: {
      type: String,
      required: true
    },
    bomMaterials: {
      type: Array,
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
      formulaDetailList: []
    }
  },
  watch: {
    formulaCode (value, oldValue) {
      this.formulaDetailList = []
      if (value) {
        this.getFormulaDetailList(value)
      }
    }
  },
  methods: {
    getFormulaDetailList (formulaCode) {
      apis.fetchDetailListByFormula({ formula_code: formulaCode }).then(data => {
        this.formulaDetailList = data
      })
    },

    addFormulaDetail () {
      getFormulaDetailForm({formula_code: this.formulaCode}, 'add', this.bomMaterials)
        .then(form => this.$showForm(form).$on('submit', (formulaDetail, close) => {
          formulaDetail.create_date = new Date()
          apis.addFormulaDetail(formulaDetail).then(formulaDetail => {
            this.formulaDetailList.push(formulaDetail)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },

    editFormulaDetail (formulaDetail) {
      getFormulaDetailForm(formulaDetail, 'edit', this.bomMaterials)
        .then(form => this.$showForm(form).$on('submit', (formulaDetail, close) => {
          apis.updateFormulaDetail(formulaDetail).then(formulaDetail => {
            const index = this.formulaDetailList.findIndex(f => f.ID === formulaDetail.ID)
            ~index && this.formulaDetailList.splice(index, 1, formulaDetail)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },

    deleteFormulaDetail (formulaDetail) {
      this.$confirm('此操作将永久删除该配方明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => apis.deleteFormulaDetail(formulaDetail))
        .then(_ => {
          const index = this.formulaDetailList.findIndex(f => f.ID === formulaDetail.ID)
          ~index && this.formulaDetailList.splice(index, 1)
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
