<template>
  <el-card class="h250">
    <div slot="header" class="card-header clearfix">
      <span class="card-header">替代料</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addSubstitute">添加替代料</el-button>
    </div>
    <el-table :data="substitutes" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="Substitute_mat_code" label="替代料编号"/>
      <el-table-column prop="Substitute_mat_name" label="替代料名称"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editSubstitute(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteSubstitute(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getSubstituteForm from '@/form/substitute'

export default {
  name: 'SubstituteCard',
  props: {
    bomDetail: {
      type: Object,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.bomDetail.enable_Substitute
    }
  },
  data () {
    return {
      substitutes: []
    }
  },
  watch: {
    'bomDetail.mat_code' (value, oldValue) {
      this.substitutes = []
      if (this.bomDetail.enable_Substitute) {
        this.fetchSubstitutes()
      }
    }
  },
  methods: {
    // 操作替代料
    fetchSubstitutes () {
      apis.fetchSubstituteMaterial(this.bomDetail.bom_code, this.bomDetail.mat_code).then(data => {
        this.substitutes = data
      })
    },

    addSubstitute () {
      const formData = {
        bom_code: this.bomDetail.bom_code,
        mat_code: this.bomDetail.mat_code
      }
      const optionsApi = this.bomDetail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getSubstituteForm(formData, 'add', options))
        .then(form => this.$showForm(form).$on('submit', (substitute, close) => {
          apis.addSubstitute(substitute).then(substitute => {
            this.substitutes.push(substitute)
            this.$message.success('添加成功!')
            close()
          })
        }))
    },

    editSubstitute (row) {
      const optionsApi = this.bomDetail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getSubstituteForm(row, 'edit', options))
        .then(form => this.$showForm(form).$on('submit', (substitute, close) => {
          apis.updateSubstitute(substitute).then(substitute => {
            const index = this.substitutes.findIndex(s => s.id === substitute.id)
            ~index && this.substitutes.splice(index, 1, substitute)
            this.$message.success('修改成功!')
            close()
          })
        }))
    },

    deleteSubstitute (substitute) {
      this.$confirm('此操作将永久删除该替代料, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteSubstitute(substitute).then(_ => {
          const index = this.substitutes.findIndex(s => s.id === substitute.id)
          ~index && this.substitutes.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>
</style>
