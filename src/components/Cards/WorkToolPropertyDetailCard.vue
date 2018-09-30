<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">工装属性明细</span>
    </div>
    <dl>
      <template v-for="p in propertyList">
        <dt :key="p.ppt_id">{{p.ppt_name}}: </dt>
        <dd :key="p.ppt_name">
          <span v-if="p.ppt_type && p.ppt_condition === 'between'">
            {{ `${p.ppt_min} &lt;= ${p.ppt_name} &lt;= ${p.ppt_max}` }}
          </span>
          <span v-else-if="p.ppt_type">
            {{p.ppt_condition}} {{p.ppt_val}}
          </span>
          <span v-else>
            {{p.ppt_val}}
          </span>
          <el-button icon="el-icon-plus" class="btn fl-r p3-0" @click="addOrEdit(p)">编辑属性</el-button>
        </dd>
      </template>
    </dl>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getWorkToolPropertyDetailForm from '@/form/workToolPropertyDetail'
export default {
  name: 'WorkToolPropertyDetailCard',
  props: {
    workToolCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      propertyList: []
    }
  },
  watch: {
    workToolCode (value) {
      this.propertyList = []
      if (value) {
        apis.fetchPropertyListByWorkToolCode(value).then(data => {
          this.propertyList = data
        })
      }
    }
  },

  methods: {
    _handleConditionChange (pptCondition, item, formItems, rules) {
      formItems[3].disabled = pptCondition === 'between'
      formItems[4].disabled = pptCondition !== 'between'
      formItems[5].disabled = pptCondition !== 'between'
      if (pptCondition === 'between') {
        this.$set(rules, 'ppt_val', [{ required: false }])
        this.$set(rules, 'ppt_min', [{ required: true, trigger: 'blur' }])
        this.$set(rules, 'ppt_max', [{ required: true, trigger: 'blur' }])
      } else {
        this.$set(rules, 'ppt_val', [{ required: true, pattern: /^\d+(\.\d+)?$/, transform: value => value && value.trim(), message: '请输入数字', trigger: 'blur' }])
        this.$set(rules, 'ppt_min', [{ required: false }])
        this.$set(rules, 'ppt_max', [{ required: false }])
      }
    },

    addOrEdit (pptDetail) {
      let type = 'add'
      if (pptDetail.ppt_type && pptDetail.ppt_condition) {
        type = 'edit'
      }
      if (!pptDetail.ppt_type && pptDetail.ppt_val) {
        type = 'edit'
      }
      if (type === 'add') {
        this.addWorkToolPropertyDetail(pptDetail)
      } else {
        this.editWorkToolPropertyDetail(pptDetail)
      }
    },

    addWorkToolPropertyDetail (propertyDetail) {
      getWorkToolPropertyDetailForm(propertyDetail, 'add')
        .then(form => this.$showForm(form).$on('submit', (propertyDetail, close) => {
          apis.addWorkToolPropertyDetail(propertyDetail).then(propertyDetail => {
            const index = this.propertyList.findIndex(p => p.ppt_id === propertyDetail.ppt_id)
            if (~index) {
              this.$set(this.propertyList[index], 'ppt_condition', propertyDetail.ppt_condition)
              this.$set(this.propertyList[index], 'ppt_val', propertyDetail.ppt_val)
              this.$set(this.propertyList[index], 'ppt_max', propertyDetail.ppt_max)
              this.$set(this.propertyList[index], 'ppt_min', propertyDetail.ppt_min)
              this.$set(this.propertyList[index], 'id', propertyDetail.id)
            }
            this.$emit('change', propertyDetail)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:ppt_condition', this._handleConditionChange))
    },

    editWorkToolPropertyDetail (propertyDetail) {
      console.log(propertyDetail)
      getWorkToolPropertyDetailForm(propertyDetail, 'edit')
        .then(form => this.$showForm(form).$on('submit', (propertyDetail, close) => {
          apis.updateWorkToolPropertyDetail(propertyDetail).then(propertyDetail => {
            const index = this.propertyList.findIndex(p => p.ppt_id === propertyDetail.ppt_id)
            if (~index) {
              this.$set(this.propertyList[index], 'ppt_condition', propertyDetail.ppt_condition)
              this.$set(this.propertyList[index], 'ppt_val', propertyDetail.ppt_val)
              this.$set(this.propertyList[index], 'ppt_max', propertyDetail.ppt_max)
              this.$set(this.propertyList[index], 'ppt_min', propertyDetail.ppt_min)
            }

            this.$emit('change', propertyDetail)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:ppt_condition', this._handleConditionChange))
    }
  }
}
</script>

<style scoped>
dl {
  margin-top: 0;
  padding: 9px 15px;
}
dt, dd {
  color: #000;
  font-size: 14px;
}
dt {
  font-weight: bold;
  line-height: 2;
}
dd {
  position: relative;
  height: 100%;
  margin-left: 70px;
  margin-right: 100px;
  border-bottom: 1px solid #000;
  top: -25px;
}
dd > span {
  display: inline-block;
  height: 100%;
}
dd .btn {
  position: absolute;
  top: 0;
  right: -90px;
}
</style>
