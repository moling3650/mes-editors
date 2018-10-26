<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }" :body-style="{ padding: '10px' }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">属性明细</span>
    </div>

    <div class="common-parameter">
      <h3>普通参数</h3>
      <ul>
        <li v-for="p in commonPropList" :key="p.pptId" class="prop-item" :class="{ disable: !p.enable }">
          <span class="label">{{p.pptName}}： </span>
          <span class="value">{{p.pptVal}}</span>
          <el-button class="fl-r edit-btn" type="text" @click="addOrEdit(p)">编辑</el-button>
        </li>
      </ul>
    </div>

    <div class="matching-parameter">
      <h3>匹配参数</h3>
      <ul>
        <li v-for="p in matchPropList" :key="p.pptId" class="prop-item" :class="{ disable: !p.enable }">
          <span class="label">{{p.pptName}}： </span>
          <span class="value" v-if="p.pptCondition === 'between'">{{ `${p.pptMin} ~ ${p.pptMax}` }}</span>
          <span class="value" v-else>{{ `${p.pptCondition || ''} ${p.pptVal || ''}` }}</span>
          <el-button class="fl-r edit-btn" type="text" @click="addOrEdit(p)">编辑</el-button>
        </li>
      </ul>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios'
import request from '@/utils/request'
import getForm from '@/form'

export default {
  name: 'ExPropsCard',
  props: {
    height: {
      type: String,
      default: '100%'
    },
    model: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      propertyList: []
    }
  },
  computed: {
    commonPropList () {
      return this.propertyList.filter(p => p.pptType === 0)
    },
    matchPropList () {
      return this.propertyList.filter(p => p.pptType === 1)
    },
    modelCode () {
      return `${this.type[0].toLowerCase()}${this.type.substr(1)}Code`
    }
  },
  watch: {
    item (obj) {
      if (!/^(Mould|WorkTool|Machine)s$/i.test(this.model)) {
        this.propertyList = []
        return
      }
      axios.all([this._fetchKindProps(obj.modelCode), this._fetchPropDetails(obj[this.modelCode])])
        .then(([kindProps, propDetails]) => {
          this.propertyList = kindProps.map(item => {
            const props = {
              pptId: item.pptId,
              pptName: item.pptName,
              pptType: item.pptType,
              pptCondition: '',
              pptVal: '',
              pptMin: 0,
              pptMax: 0,
              enable: 1
            }
            const propDetail = propDetails.find(item => item.pptId === props.pptId)
            if (propDetail) {
              props.id = propDetail.id
              props.pptType = propDetail.pptType
              props.pptCondition = propDetail.pptCondition
              props.pptVal = propDetail.pptVal
              props.pptMin = propDetail.pptMin
              props.pptMax = propDetail.pptMax
              props.enable = propDetail.enable
            }
            props[this.modelCode] = this.item[this.modelCode]
            return props
          })
        })
    }
  },
  methods: {
    addOrEdit (prop) {
      if (prop.id) {
        this._editProperty(prop)
      } else {
        this._addProperty(prop)
      }
    },

    _fetchKindProps (modelCode) {
      return request({
        url: `${this.type}KindProperties`,
        params: {
          modelCode
        }
      })
    },

    _fetchPropDetails (code) {
      const params = {}
      params[this.modelCode] = code
      return request({
        url: `${this.type}PropertyDetails`,
        params
      })
    },

    _addProperty (prop) {
      const { pptName, ...ppt } = prop
      getForm[`${this.type}PropertyDetail`](ppt, 'add')
        .then(form => this.$showForm(form).$on('submit', (data, close) => {
          request({
            method: 'post',
            url: `${this.type}PropertyDetails`,
            data
          }).then(newProp => {
            this._updateProperty(Object.assign(newProp, { pptName }))
            this.$emit('change', newProp)
            this.$message.success('添加成功!')
            close()
          })
        }).$on('update:pptCondition', this._handleConditionChange))
    },

    _editProperty (prop) {
      const { pptName, ...ppt } = prop
      getForm[`${this.type}PropertyDetail`](ppt, 'edit')
        .then(form => this.$showForm(form).$on('submit', (data, close) => {
          request({
            method: 'put',
            url: `${this.type}PropertyDetails/${data.id}`,
            data
          }).then(_ => {
            this._updateProperty(Object.assign(data, { pptName }))
            this.$emit('change', data)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:pptCondition', this._handleConditionChange))
    },

    _updateProperty (prop) {
      const index = this.propertyList.findIndex(p => p.pptId === prop.pptId)
      if (~index) {
        this.$set(this.propertyList[index], 'id', prop.id)
        this.$set(this.propertyList[index], 'pptCondition', prop.pptCondition)
        this.$set(this.propertyList[index], 'pptVal', prop.pptVal)
        this.$set(this.propertyList[index], 'pptMax', prop.pptMax)
        this.$set(this.propertyList[index], 'pptMin', prop.pptMin)
        this.$set(this.propertyList[index], 'enable', prop.enable)
      }
    },

    _handleConditionChange (pptCondition, item, formItems, rules) {
      formItems[3].disabled = pptCondition === 'between'
      formItems[4].disabled = pptCondition !== 'between'
      formItems[5].disabled = pptCondition !== 'between'
      if (pptCondition === 'between') {
        this.$set(rules, 'pptVal', [{ required: false }])
        this.$set(rules, 'pptMin', [{ required: true, trigger: 'blur' }])
        this.$set(rules, 'pptMax', [{ required: true, trigger: 'blur' }])
      } else {
        this.$set(rules, 'pptVal', [{ required: true, pattern: /^\d+(\.\d+)?$/, transform: value => value && value.trim(), message: '请输入数字', trigger: 'blur' }])
        this.$set(rules, 'pptMin', [{ required: false }])
        this.$set(rules, 'pptMax', [{ required: false }])
      }
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 20px;
}
.common-parameter,
.matching-parameter {
  position: relative;
  min-height: 50px;
  border: 1px solid;
}

.common-parameter > h3,
.matching-parameter > h3 {
  position: absolute;
  top: -10px;
  right: 10px;
  margin: 0;
  padding: 0 5px;
  font-size: 14px;
  background-color: #fff;
}

.common-parameter {
  margin-top: 10px;
  color: #67c23a;
}

.matching-parameter {
  margin-top: 20px;
  color: #f56c6c;
}

.prop-item {
  position: relative;
  margin: 5px 0;
  color: #409eff;
}
.prop-item > .edit-btn {
  position: absolute;
  right: 10px;
  line-height: 21px;
}
.prop-item > .edit-btn:hover {
  color: #f56c6c;
}

.disable {
  color: #606266;
}
.prop-item > .label,
.prop-item > .value {
  display: inline-block;
}

.prop-item > .label {
  min-width: 60px;
  text-align: right;
}

.prop-item > .value {
  min-width: 50px;
  padding-left: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #333;
}
</style>
