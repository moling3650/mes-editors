<template>
  <el-card class="h600 ova">
    <div slot="header" class="card-header clearfix">
      <span class="card-header">BOM清单： {{ bomCode }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBomDetail">添加BOM明细</el-button>
    </div>
    <el-tree :data="bomDetailList" :props="props" :expand-on-click-node="false"
      node-key="id" :load="loadNode" lazy @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :style="{color: data.mat_type ? 'green' : 'blue'}">{{ node.label }}</span>
        <span>
          <el-button class="edit" type="text" icon="el-icon-edit" @click.stop="() => editBomDetail(node, data)">编辑</el-button>
          <el-button class="delete" type="text" icon="el-icon-delete" @click.stop="() => deleteBomDetail(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getBomDetailForm from '@/form/bomDetail'

export default {
  name: 'BomDetailTreeCard',
  props: {
    bomCode: {
      type: String,
      required: true
    },
    version: {
      type: String,
      required: true
    },
    bomDetail: {
      type: Object,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.bomCode
    }
  },
  data () {
    return {
      bomDetailList: [],
      props: {
        label: 'mat_name',
        isLeaf (data, node) {
          return data.mat_type === 1
        }
      }
    }
  },
  watch: {
    bomCode (value, oldValue) {
      this.bomDetailList = []
      if (value) {
        this.getBomDetailList(value)
      }
    }
  },

  methods: {
    getBomDetailList (bomCode) {
      apis.fetchBomDetailListByBom({ bom_code: bomCode }).then(data => {
        data.map(item => {
          item.wastage = item.wastage * 100
          return item
        })
        this.bomDetailList = data
      })
    },

    addBomDetail (row) {
      this.$confirm('选择物料类型', '提示', {
        confirmButtonText: '半成品',
        cancelButtonText: '物料',
        distinguishCancelAndClose: true,
        type: 'warning'
      }).then(_ => 0)
        .catch(action => action === 'cancel' ? 1 : Promise.reject(new Error('cancel')))
        .then(matType => {
          const optionsApi = matType ? 'fetchMaterialOptions' : 'fetchProductOptions'
          return apis[optionsApi]().then(options => getBomDetailForm({ bom_code: this.bomCode, mat_type: matType }, 'add', options))
        })
        .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
          bomDetail.wastage = bomDetail.wastage / 100
          apis.addBomDetail(bomDetail).then(detail => {
            detail.wastage = detail.wastage * 100
            this.bomDetailList.push(detail)
            this.$message.success('添加成功!')
            close()
          })
        }).$on('update:mat_code', (matCode, item, formItems) => {
          const material = item.options.find(o => o.value === matCode)
          const unit = material.unit
          formItems[3].unit = unit
          formItems[4].unit = unit
        }))
    },

    editBomDetail (node, bomDetail) {
      const optionsApi = bomDetail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
      apis[optionsApi]()
        .then(options => getBomDetailForm(bomDetail, 'add', options))
        .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
          bomDetail.wastage = bomDetail.wastage / 100
          apis.updateBomDetail(bomDetail).then(bomDetail => {
            const children = node.parent.childNodes
            const index = children.findIndex(c => c.data.bom_detail_id === bomDetail.bom_detail_id)
            if (~index) {
              bomDetail.wastage = bomDetail.wastage * 100
              this.$set(children[index], 'data', bomDetail)
              this.$emit('update:bomDetail', bomDetail)
              this.$message.success('编辑成功!')
            } else {
              this.$message.danger('编辑失败!')
            }
            close()
          })
        }))
    },

    deleteBomDetail (node, data) {
      this.$confirm('此操作将永久删除该BOM明细, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis.deleteBomDetail(data).then(_ => {
          const children = node.parent.childNodes
          const index = children.findIndex(c => c.data.bom_detail_id === data.bom_detail_id)
          ~index && children.splice(index, 1)
          this.$emit('update:bomDetail', {})
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleNodeClick (node) {
      this.$emit('update:bomDetail', node)
    },

    loadNode (node, resolve) {
      if (!node.data.mat_code || !this.version) {
        return resolve([])
      }
      apis.fetchSubBom(node.data.mat_code, this.version).then(data => {
        data.map(item => {
          item.wastage = item.wastage * 100
          return item
        })
        return resolve(data)
      })
    }
  }
}
</script>

<style scoped>
</style>
