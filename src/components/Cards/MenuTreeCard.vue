<template>
  <el-card class="h600">
    <div slot="header" class="clearfix">
      <span class="card-header--text">菜单维护</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMenu">添加父级节点</el-button>
      <el-button :disabled="disabled" icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addSonMenu">添加子级节点</el-button>
    </div>
    <el-tree :data="menus" :props="props" :expand-on-click-node="false" @node-click="handleNodeClick">
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
import getMenuGroupForm from '@/form/MenuGroup'
import getMenSonGroupForm from '@/form/MenuSonGroup'
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'

export default {
  name: 'MenuTreeCard',
  computed: {
    disabled () {
      return !this.menuCode
    }
  },
  data () {
    return {
      formatterMap: {},
      menus: [],
      menuCode: '',
      checkedNode: null,
      mouduleOptions: [],
      props: {
        label (data) {
          return data.data.menuName
        }
      }
    }
  },
  watch: {
  },

  methods: {
    addMenu () {
      getMenuGroupForm(null, 'add')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.parentId = 0
          formData.isRoot = 1
          Api.post('MenuDetails', formData).then(menuDetails => {
            this.$nextTick(_ => {
              this.menus.push({
                value: menuDetails.id,
                label: menuDetails.menuName,
                data: menuDetails
              })
            })
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    addSonMenu () {
      getMenSonGroupForm(null, 'add', this.mouduleOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          console.log(formData.moduleCode)
          formData.parentId = this.menuCode
          formData.isRoot = null
          // 0：分组  1：子项
          if (formData.menuSonType === 1) {
            Api.post('MenuDetails', formData).then(menuDetails => {
              this.$nextTick(_ => {
                this.checkedNode.data.children.push({
                  value: menuDetails.id,
                  label: menuDetails.menuName,
                  data: menuDetails
                })
              })
              this.$message.success('添加成功')
              close()
            })
          } else if (formData.menuSonType === 0) {
            formData.moduleCode = 1
            Api.post('MenuDetails', formData).then(menuDetails => {
              this.$nextTick(_ => {
                this.checkedNode.data.children.push({
                  value: menuDetails.id,
                  label: menuDetails.menuName
                })
              })
              this.$message.success('添加成功')
              close()
            })
          }
        }))
    },

    editPedigree (node, nodeData) {
      const getForm = node.level === 1 ? getMenuGroupForm : getMenSonGroupForm
      getForm(nodeData.data, 'edit', this.mouduleOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`MenuDetails/${nodeData.value}`, formData).then(_ => {
            const children = node.parent.data.children
            const index = children.indexOf(nodeData)
            this.$set(children[index], 'data', formData)
            this.$message.success('编辑成功!')
            close()
          })
        }))
    },

    deletePedigree (node, nodeData) {
      console.log(node)
      this.$confirm(`此操作将永久删除该节点, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        if (node.isLeaf) {
          Api.delete(`MenuDetails/${nodeData.value}`).then(_ => {
            const children = node.parent.childNodes
            const index = children.indexOf(node)
            console.log(index)
            if (~index) {
              children.splice(index, 1)
              this.$emit('change', {})
              this.$message.success('删除成功!')
            }
          })
        } else {
          this.$confirm(`删除失败，该节点下面还有子节点`, '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        }
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    },

    handleNodeClick (data, node) {
      if (node.level === 2) {
        this.menuCode = node.parent.data.value
      } else {
        this.checkedNode = node
        this.menuCode = data.value
      }
    }
  },

  created () {
    Api.get('MenuDetails/TreeData').then(data => {
      this.menus = data
    })
    Api.get('Modules').then(data => {
      this.mouduleOptions = toOptions(data, 'moduleCode', 'moduleName')
    })
  }
}
</script>

<style scoped>
</style>
