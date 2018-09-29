<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">模具属性明细</span>
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
          <el-button icon="el-icon-plus" class="fl-r p3-0" @click="addOrEdit(p)">编辑属性</el-button>
        </dd>
      </template>
    </dl>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMouldPropertyDetailForm from '@/form/mouldPropertyDetail'
export default {
  name: 'MouldPropertyDetailCard',
  props: {
    mouldCode: {
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
    mouldCode (value) {
      this.propertyList = []
      if (value) {
        apis.fetchPropertyListByMouldCode(value).then(data => {
          this.propertyList = data
        })
      }
    }
  },

  methods: {

    addOrEdit (pptDetail) {
      let type = 'add'
      if (pptDetail.ppt_type && pptDetail.ppt_condition) {
        type = 'edit'
      }
      if (!pptDetail.ppt_type && pptDetail.ppt_val) {
        type = 'edit'
      }
      if (type === 'add') {
        this.addMouldPropertyDetail(pptDetail)
      } else {
        this.editMouldPropertyDetail(pptDetail)
      }
    },

    addMouldPropertyDetail (propertyDetail) {
      getMouldPropertyDetailForm(propertyDetail, 'add')
        .then(form => this.$showForm(form).$on('submit', (propertyDetail, close) => {
          apis.addMouldPropertyDetail(propertyDetail).then(propertyDetail => {
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
        }).$on('update:ppt_condition', (pptCondition, item, formItems) => {
          formItems[3].disabled = pptCondition === 'between'
          formItems[4].disabled = pptCondition !== 'between'
          formItems[5].disabled = pptCondition !== 'between'
        }))
    },

    editMouldPropertyDetail (propertyDetail) {
      console.log(propertyDetail)
      getMouldPropertyDetailForm(propertyDetail, 'edit')
        .then(form => this.$showForm(form).$on('submit', (propertyDetail, close) => {
          apis.updateMouldPropertyDetail(propertyDetail).then(propertyDetail => {
            const index = this.propertyList.findIndex(p => p.ppt_id === propertyDetail.ppt_id)
            if (~index) {
              this.$set(this.propertyList[index], 'ppt_condition', propertyDetail.ppt_condition)
              this.$set(this.propertyList[index], 'ppt_val', propertyDetail.ppt_val)
              this.$set(this.propertyList[index], 'ppt_max', propertyDetail.ppt_max)
              this.$set(this.propertyList[index], 'ppt_min', propertyDetail.ppt_min)
            }

            // ~index && this.propertyList.splice(index, 1, propertyDetail)
            this.$emit('change', propertyDetail)
            this.$message.success('修改成功')
            close()
          })
        }).$on('update:ppt_condition', (pptCondition, item, formItems) => {
          formItems[3].disabled = pptCondition === 'between'
          formItems[4].disabled = pptCondition !== 'between'
          formItems[5].disabled = pptCondition !== 'between'
        }))
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
}
dd {
  position: relative;
  margin-left: 65px;
  border-bottom: 1px solid #000;
  top: -24px;
/*  margin-top: -25px;*/
}
dt {
  line-height: 2;
}
</style>
