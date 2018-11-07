<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">BOM清单： {{ bomCode }}</span>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addBomDetail">添加BOM明细</el-button>
    </div>
    <v-tree class="tree" ref='tree' :data='bomDetails' :tpl="tpl" @node-check='handleNodeClick' @async-load-nodes='loadNodes'/>
<!--     <el-tree :data="bomDetailList" :props="props" :expand-on-click-node="false"
      node-key="id" :load="loadNode" lazy @node-click="handleNodeClick">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span :style="{color: data.mat_type ? 'green' : '#0263a5'}">{{ node.label }}</span>
        <span>
          <el-button class="edit" type="text" icon="el-icon-edit" @click.stop="() => editBomDetail(node, data)">编辑</el-button>
          <el-button class="delete" type="text" icon="el-icon-delete" @click.stop="() => deleteBomDetail(node, data)">删除</el-button>
        </span>
      </span>
    </el-tree> -->
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import toMap from '@/utils/toMap'
// import getForm from '@/form/bomDetail'

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
    }
  },
  computed: {
    disabled () {
      return !this.bomCode
    }
  },
  data () {
    return {
      bomDetails: [],
      names: []
    }
  },
  watch: {
    bomCode (value, oldValue) {
      this.bomDetails = []
      if (value) {
        this.getBomDetails(value)
      }
    }
  },

  methods: {
    getBomDetails (bomCode) {
      Api.get('BomDetails', { bomCode }).then(data => {
        this.bomDetails = data.map(item => {
          return {
            id: item.bomDetailId,
            title: this.names[item.matType] && this.names[item.matType][item.matCode],
            async: !item.matType,
            data: item
          }
        })
      })
    },

    addBomDetail (row) {
    //   this.$confirm('选择物料类型', '提示', {
    //     confirmButtonText: '半成品',
    //     cancelButtonText: '物料',
    //     distinguishCancelAndClose: true,
    //     type: 'warning'
    //   }).then(_ => 0)
    //     .catch(action => action === 'cancel' ? 1 : Promise.reject(new Error('cancel')))
    //     .then(matType => {
    //       const optionsApi = matType ? 'fetchMaterialOptions' : 'fetchProductOptions'
    //       return apis[optionsApi]().then(options => getBomDetailForm({ bom_code: this.bomCode, mat_type: matType }, 'add', options))
    //     })
    //     .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
    //       bomDetail.wastage = bomDetail.wastage / 100
    //       apis.addBomDetail(bomDetail).then(detail => {
    //         detail.wastage = detail.wastage * 100
    //         this.bomDetailList.push(detail)
    //         this.$message.success('添加成功!')
    //         close()
    //       })
    //     }).$on('update:mat_code', (matCode, item, formItems) => {
    //       const material = item.options.find(o => o.value === matCode)
    //       const unit = material.unit
    //       formItems[3].unit = unit
    //       formItems[4].unit = unit
    //     }))
    },

    // editBomDetail (node, bomDetail) {
    //   const optionsApi = bomDetail.mat_type ? 'fetchMaterialOptions' : 'fetchProductOptions'
    //   apis[optionsApi]()
    //     .then(options => getBomDetailForm(bomDetail, 'add', options))
    //     .then(form => this.$showForm(form).$on('submit', (bomDetail, close) => {
    //       bomDetail.wastage = bomDetail.wastage / 100
    //       apis.updateBomDetail(bomDetail).then(bomDetail => {
    //         const children = node.parent.childNodes
    //         const index = children.findIndex(c => c.data.bom_detail_id === bomDetail.bom_detail_id)
    //         if (~index) {
    //           bomDetail.wastage = bomDetail.wastage * 100
    //           this.$set(children[index], 'data', bomDetail)
    //           this.$emit('update:bomDetail', bomDetail)
    //           this.$message.success('编辑成功!')
    //         } else {
    //           this.$message.danger('编辑失败!')
    //         }
    //         close()
    //       })
    //     }))
    // },

    // deleteBomDetail (node, data) {
    //   this.$confirm('此操作将永久删除该BOM明细, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(_ => {
    //     apis.deleteBomDetail(data).then(_ => {
    //       const children = node.parent.childNodes
    //       const index = children.findIndex(c => c.data.bom_detail_id === data.bom_detail_id)
    //       ~index && children.splice(index, 1)
    //       this.$emit('update:bomDetail', {})
    //       this.$message.success('删除成功!')
    //     })
    //   }).catch(_ => {
    //     this.$message.info('已取消删除')
    //   })
    // },

    // loadNode (node, resolve) {
    //   if (!node.data.mat_code || !this.version) {
    //     return resolve([])
    //   }
    //   apis.fetchSubBom(node.data.mat_code, this.version).then(data => {
    //     data.map(item => {
    //       item.wastage = item.wastage * 100
    //       return item
    //     })
    //     return resolve(data)
    //   })
    // },
    loadNodes (node) {
      const {checked = false} = node
      this.$set(node, 'loading', true)
      Api.get('BomDetails', {
        productCode: node.data.matCode,
        version: this.version
      }).then(data => {
        const children = data.map(item => {
          return {
            id: item.bomDetailId,
            title: this.names[item.matType] && this.names[item.matType][item.matCode],
            async: !item.matType,
            data: item
          }
        })
        this.$refs.tree.addNodes(node, children)
        this.$set(node, 'loading', false)
        if (checked) {
          this.$refs.tree.childCheckedHandle(node, checked)
        }
      })
    },

    handleNodeClick (node) {
      this.$emit('change', node)
    },

    tpl (...args) {
      let {0: node, 2: parent, 3: index} = args
      let titleClass = node.selected ? 'node-title node-selected' : 'node-title'
      titleClass += node.searched ? ' node-searched' : ''
      return <span>
        <span class={titleClass} domPropsInnerHTML={node.title} onClick={() => {
          this.$refs.tree.nodeSelected(node)
        }}></span>
        <el-button type="text" icon="el-icon-edit" onClick={() => this.editNode(node)}/>
        <el-button type="text" icon="el-icon-delete" onClick={() => this.$refs.tree.deleteNode(node, parent, index)}/>
      </span>
    }
  },

  mounted () {
    Api.get('Products').then(products => {
      this.names[0] = toMap(products, 'productCode', 'productName')
    })
    Api.get('Materials').then(materials => {
      this.names[1] = toMap(materials, 'matCode', 'matName')
    })
  }
}
</script>

<style scoped>
.tree {
  padding: 0;
}
</style>
