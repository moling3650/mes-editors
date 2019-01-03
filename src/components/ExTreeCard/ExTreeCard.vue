<template>
  <el-card :style="{ height }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
      <el-button type="text" size="mini" icon="el-icon-plus" @click="append($refs.tree.root)">
        {{ toAppendText(0) }}
      </el-button>
    </div>
    <div class="tree-wrap" :style="{ height: `${parseInt(height) - 40}px`, overflowY: 'auto' }">
      <el-tree :data="treeData" :props="props" :load="loadNode" :expand-on-click-node="false" lazy ref="tree" highlight-current @node-click="handleNodeClick">
        <span class="tree-node" slot-scope="{ node, data }">
          <i :class="['fa', ['', 'fa-folder-o', 'fa-folder-o', 'fa-folder-o', 'fa-file-text-o'][node.level]]"></i>
          <!-- <font-awesome-icon :icon="['', 'folder', 'star', 'tag', 'chevron-right'][node.level]"/> -->
          <span :class="{ leaf: node.level === 4 }">{{ node.label }}</span>
          <span v-if="node.level < 4">
            <el-button type="text" size="mini" icon="el-icon-plus" @click="() => append(node)">
              {{ toAppendText(node.level) }}
            </el-button>
          </span>
        </span>
      </el-tree>

      <el-dialog title="新增设备" :visible.sync="addMachineForm">
        <el-form :model="formData" :rules="rules" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="设备编号" prop="machineCode">
                <el-input v-model="formData.machineCode" placeholder="请输入设备编号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备名称" prop="machineName">
                <el-input v-model="formData.machineName" placeholder="请输入设备名称"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="设备简称" prop="simpleName">
                <el-input v-model="formData.simpleName" placeholder="请输入设备简称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="设备状态" prop="state">
                <ex-select :options="stateOptions" v-model="formData.state" placeholder="请选择设备状态"></ex-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="设备生产商" prop="manufacturer">
                <el-input v-model="formData.manufacturer" placeholder="请输入设备生产商"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审核状态" prop="useState">
                <ex-select :options="useStateOptions" v-model="formData.useState" placeholder="请选择审核状态"></ex-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="到货日期" prop="arrivaldate">
                <el-date-picker v-model="formData.arrivaldate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="预计保养日期" prop="expectNexttime">
                <el-date-picker v-model="formData.expectNexttime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="使用车间" prop="wsCode">
                <ex-select :options="wsCodeOptions" v-model="formData.wsCode" placeholder="请选择车间"></ex-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="使用部门" prop="userdepartment">
                <ex-select :options="departmentOptions" v-model="formData.userdepartment" placeholder="请选择部门"></ex-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="备注说明" prop="description">
                <el-input v-model="formData.description" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="设备图片">
                <el-upload
                  class="upload-demo"
                  action="../static/img/"
                  list-type="picture">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <span class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</span>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      <div class="btnDiv">
        <el-button type="info">重置</el-button>
        <el-button type="success" @click="btnAdd">提交</el-button>
      </div>
      </el-dialog>
    </div>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import forms from '@/form'
import axios from 'axios'
import toOptions from '@/utils/toOptions'
const useState = ['未审核', '已审核']
const machineState = ['待机', '运行', '故障', '维护']
export default {
  name: 'ExTreeCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    model: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: '500px'
    },
    optionMap: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    const checkMachineCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('设备编号不能为空'))
      }
      if (rule.type === 'edit') {
        return callback()
      }
      Api.get('Machines/Validate', { machineCode: value }).then(valid => {
        if (valid) {
          callback()
        } else {
          callback(new Error('设备编号已存在'))
        }
      })
    }
    return {
      currentNode: null,
      treeData: [],
      props: {
        isLeaf (data, node) {
          return node.level > 3
        }
      },
      addMachineForm: false,
      formData: {
        machineCode: '',
        machineName: '',
        state: 0,
        useState: '',
        simpleName: '',
        manufacturer: '',
        arrivaldate: new Date(),
        expectNexttime: new Date(),
        userdepartment: '',
        wsCode: '',
        description: ''
      },
      stateOptions: machineState.map((label, index) => ({value: index, label})),
      useStateOptions: useState.map((label, index) => ({value: index, label})),
      departmentOptions: [],
      wsCodeOptions: [],
      rules: {
        machineCode: [{ required: true, validator: checkMachineCode, trigger: 'blur' }],
        machineName: [{ required: true, message: '请输入设备名称', trigger: 'blur' }]
      }
    }
  },
  computed: {
    modelKey () {
      return this.model[0].toLowerCase() + this.model.substr(1)
    },
    modelName () {
      const nameMap = {
        Machine: '设备',
        WorkTool: '工装',
        Mould: '模具'
      }
      return nameMap[this.model] || '未知'
    }
  },
  methods: {
    _getModel (level) {
      const modelTypes = ['Type', 'Kind', 'Model', '']
      return `${this.model}${modelTypes[level]}s`
    },

    _getKey (level) {
      return ['typeId', 'kindId', 'modelCode', `${this.modelKey}Code`][level]
    },

    _getLabelKey (level) {
      return ['typeName', 'kindName', 'modelCode', `${this.modelKey}Name`][level]
    },

    _getLabel (item, level) {
      return item[this._getLabelKey(level)]
    },

    _addLabel (item, level) {
      return Object.assign({ label: this._getLabel(item, level) }, item)
    },

    loadNode (node, resolve) {
      if (node.level > 3) {
        return resolve([])
      }
      const params = {}
      if (node.level) {
        const key = this._getKey(node.level - 1)
        params[key] = node.data[key]
      }
      Api.get(this._getModel(node.level), node.data).then(data => {
        if (node.level) {
          return resolve(data.map(item => this._addLabel(item, node.level)))
        } else {
          this.treeData.push(...data.map(item => this._addLabel(item, node.level)))
        }
      })
    },

    _updateChildNodes (node, newItem) {
      if (!node.level) {
        this.treeData.push(this._addLabel(newItem, node.level))
        return
      }
      if (!node.loaded) {
        return
      }
      const nodes = []
      if (!node.data.children) {
        this.$set(node.data, 'children', [])
      }
      if (!node.data.children.length) {
        nodes.push(...node.childNodes.map(n => this._addLabel(n.data, node.level)))
      }
      nodes.push(this._addLabel(newItem, node.level))
      node.data.children.push(...nodes)
    },

    append (node) {
      const modelType = this._getModel(node.level)
      const data = {}
      // const options = []
      const key = this._getKey(node.level - 1)
      // const labelKey = this._getLabelKey(node.level - 1)
      data[key] = node.data[key]
      // options.push({ value: node.data[key], label: node.data[labelKey] })
      const departments = this.optionMap && this.optionMap.departments
      const workShops = this.optionMap && this.optionMap.workShops
      forms[modelType](data, 'add', departments, workShops).then(form => this.$showForm(form).$on('submit', (formData, close) => {
        Api.post(modelType, formData).then(newItem => {
          this._updateChildNodes(node, newItem)
          this.$message.success('添加成功!')
          close()
        })
      }))
    },

    updateCurrentNode (data) {
      if (!this.currentNode) {
        return
      }
      const parent = this.currentNode.parent
      if (parent.level && !parent.data.children) {
        this.$set(parent.data, 'children', [])
      }
      const children = parent.level ? parent.data.children : parent.data
      if (!children.length) {
        children.push(...parent.childNodes.map(n => this._addLabel(n.data, parent.level)))
      }
      const key = this._getKey(parent.level)
      const index = children.findIndex(item => item[key] === data[key])
      children.splice(index, 1, this._addLabel(data, parent.level))
      const isLeaf = this.currentNode.isLeaf
      this.$nextTick(_ => {
        this.currentNode = parent.childNodes[index]
        this.currentNode.isLeaf = isLeaf
      })
    },

    removeCurrentNode () {
      if (!this.currentNode) {
        return
      }
      const parent = this.currentNode.parent
      const childNodes = parent.childNodes
      const nodeIndex = childNodes.findIndex(n => n.id === this.currentNode.id)
      childNodes.splice(nodeIndex, 1)
      parent.isLeaf = !childNodes.length
      const children = parent.data.children || parent.data
      if (Array.isArray(children)) {
        const key = this._getKey(parent.level)
        const index = children.findIndex(item => item[key] === this.currentNode.data[key])
        children.splice(index, 1)
      }
      this.currentNode = null
    },

    handleNodeClick (data, node) {
      if (this.currentNode && this.currentNode.id === node.id) {
        return
      }
      const model = this._getModel(node.level - 1)
      this.currentNode = node
      const {label, children, ...nodeData} = data
      this.$emit('change', model, nodeData)
    },

    toAppendText (level) {
      const types = ['类型', '类别', '型号', '']
      return `${this.modelName}${types[level]}`
    },

    btnAdd () {

    }
  },

  created () {
    axios.all([Api.get('Departments'), Api.get('WorkShops')])
      .then(([departments, workShops]) => {
        this.departmentOptions = toOptions(departments, 'departCode', 'departName')
        this.wsCodeOptions = toOptions(workShops, 'wsCode', 'wsName')
        this.addMachineForm = true
      })
  }
}
</script>

<style scoped>
.tree-node {
  font-size: 12px;
}
.leaf {
  color: blue;
  font-size: 12px;
}
.btnDiv {
  margin-top: 10px;
}
</style>
