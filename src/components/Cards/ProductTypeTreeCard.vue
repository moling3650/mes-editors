<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">成品类型清单</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addType">添加成品类型</el-button>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addPedigree">添加谱系</el-button>
    </div>
    <el-tree :data="productTypes" :props="props" :expand-on-click-node="false"
      node-key="id" @node-click="handleNodeClick">
      <span slot-scope="{ node, data }">
        <i :class="['fa', ['', 'fa-folder-o', 'fa-file-text-o'][node.level]]"></i>
        <span>{{ node.label }}</span>
        <el-button-group>
          <el-button type="text" icon="el-icon-edit" @click.stop="() => editPedigree(node, data)"/>
          <el-button type="text" icon="el-icon-delete" @click.stop="() => deletePedigree(node, data)"/>
        </el-button-group>
      </span>
    </el-tree>
  </el-card>
</template>

<script>
import getPedigreeForm from '@/form/pedigree'
import getProductTypeForm from '@/form/productType'
import Api from '@/utils/Api'

export default {
  name: 'ProductTypeTreeCard',
  computed: {
    disabled () {
      return !this.productTypeCode
    }
  },
  data () {
    return {
      productTypes: [],
      productTypeCode: '',
      checkedNode: null, // 已点击的节点
      props: {
        label (data, node) {
          const key = ['', 'typeName', 'pedigreeName'][node.level]
          return data.rawData[key]
        }
      }
    }
  },
  watch: {
  },

  methods: {
    ApiURL (node) {
      return ['', 'ProductTypes', 'Pedigrees'][node.level]
    },

    getKey (node) {
      return ['', 'typeId', 'id'][node.level]
    },

    addType () {
      getProductTypeForm(null, 'add')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('ProductTypes', formData).then(productTypes => {
            this.$nextTick(_ => {
              this.productTypes.push({
                value: productTypes.typeCode,
                label: productTypes.typeName,
                rawData: productTypes
              })
            })
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    addPedigree () {
      getPedigreeForm({productTypeCode: this.productTypeCode}, 'add')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.post('Pedigrees', formData).then(pedigrees => {
            this.$nextTick(_ => {
              this.checkedNode.data.children.push({
                value: pedigrees.pedigreeCode,
                label: pedigrees.pedigreeName,
                rawData: pedigrees
              })
            })
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editPedigree (node, nodeData) {
      const getForm = node.level === 1 ? getProductTypeForm : getPedigreeForm
      const key = this.getKey(node)
      getForm(nodeData.rawData, 'edit')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`${this.ApiURL(node)}/${formData[key]}`, formData).then(_ => {
            const children = node.parent.data.children
            const index = children.findIndex(d => d.rawData[key] === nodeData.rawData[key])
            this.$set(children[index], 'rawData', formData)
            this.$message.success('编辑成功!')
            close()
          })
        }))
    },

    deletePedigree (node, nodeData) {
      const key = this.getKey(node)
      this.$confirm(`此操作将永久删除该谱系, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`${this.ApiURL(node)}/${nodeData.rawData[key]}`).then(_ => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.rawData[key] === nodeData.rawData[key])
          parent.childNodes.splice(index, 1)
          children.splice(index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.productTypeCode = node.parent.data.value
        this.$emit('change', {productTypeCode: this.productTypeCode, pedigreeCode: data.value})
      } else {
        this.checkedNode = node
        this.productTypeCode = data.value
      }
    }
  },

  created () {
    Api.get('Pedigrees/CascaderOptions').then(data => {
      this.productTypes = data
    })
  }
}
</script>

<style scoped>
</style>
