<template>
  <div id="RepairToolEditor">
    <el-form :inline="true">
      <el-row :gutter="0" class="row">
        <el-col :span="6">
          <el-form-item label="IP:">
            <el-input  v-model="ip" :disabled="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工序/工位:">
            <el-cascader :options="stationOptions" v-model="processStation" placeholder="请选择工序工位" @change="handleKindChange"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="员工号:">
            <el-input  v-model="userCode" :disabled="true" v-show="registerRepair" style="width: 100px;" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="repairLogin" :disabled="!processStation.length">登录维修</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-row v-show="registerRepair">
      <el-tabs type="card">
        <el-tab-pane label="登记管理" name="first">
          <RegisterCard :fromProcess="processStation[0] || ''"></RegisterCard>
        </el-tab-pane>
        <el-tab-pane label="维修管理" name="second">
          <RepairCard></RepairCard>
        </el-tab-pane>
      </el-tabs>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import Api from '@/utils/Api'
import getRepairLoginForm from '@/form/repair/repairLogin'
import RegisterCard from '@/components/Cards/repair/RegisterCard'
import RepairCard from '@/components/Cards/repair/RepairCard'

export default {
  name: 'RepairToolEditor',
  components: {
    RegisterCard,
    RepairCard
  },
  data () {
    return {
      ip: '',
      stationOptions: [],
      processStation: [],
      registerRepair: false,
      userCode: ''
    }
  },
  methods: {

    handleKindChange ([typeId, kindId]) {
      this.id = kindId
      this.modelCode = ''
      this.machineCode = ''
    },

    handleIPChange (ip) {
      console.log(ip)
    },

    repairLogin () {
      getRepairLoginForm()
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.get('Employees/Authorization', formData).then(valid => {
            if (valid) {
              this.$message.success('登录成功')
              this.registerRepair = true
              this.userCode = formData.empCode
              close()
            } else {
              this.$message.error('登录失败')
            }
          })
        }))
    }
  },

  mounted () {
    apis.fetchIP().then(ip => {
      this.ip = ip
      Api.get('StationLists/CascaderOptions', { ip }).then(options => {
        this.stationOptions = options
      })
    })
  }
}
</script>

<style scoped>
#RepairToolEditor {
  margin: 5px;
}
</style>
