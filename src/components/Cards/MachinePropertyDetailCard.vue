<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备属性明细</span>
      <el-button icon="el-icon-plus" class="fl-r p3-0" type="text" @click="addMachinePropertyDetail">添加属性</el-button>
    </div>
    <dl>
      <template v-for="p in propertyList">
        <dt :key="p.ppt_id">{{p.ppt_name}}: </dt>
        <dd :key="p.ppt_name">{{p.ppt_val}}</dd>
      </template>
    </dl>
  </el-card>
</template>

<script>
import apis from '@/apis'
import getMachinePropertyDetailForm from '@/form/machinePropertyDetail'
export default {
  name: 'MachinePropertyDetailCard',
  props: {
    machineCode: {
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
    machineCode (value) {
      this.propertyList = []
      if (value) {
        apis.fetchPropertyListByMachineCode(value).then(data => {
          console.log(data)
          this.propertyList = data
        })
      }
    }
  },

  methods: {

    addMachinePropertyDetail () {
      getMachinePropertyDetailForm({machine_Code: this.machineCode}, 'add')
        .then(form => this.$showForm(form).$on('submit', (machinePropertyDetail, close) => {
          apis.addMachinePropertyDetail(machinePropertyDetail).then(machinePropertyDetail => {
            this.propertyList.push(machinePropertyDetail)
            this.$emit('change', machinePropertyDetail)
            this.$message.success('添加成功')
            close()
          })
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
  font-weight: normal;
}
dd {
  margin-left: 100px;
/*  margin-top: -25px;*/
}
dt {
  line-height: 2;
}
</style>
