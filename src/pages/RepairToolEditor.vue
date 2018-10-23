<template>
  <div id="RepairToolEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-input  v-model="ip" :disabled="true" />
      </el-col>
      <el-col :span="6">
        <el-cascader :options="stationOptions" v-model="processStation" placeholder="请选择工序" @change="handleKindChange"/>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="repairLogin">登录维修</el-button>
      </el-col>
    </el-row>
    <el-row>
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
      processStation: []
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
        .then(form => this.$showForm(form).$on('submit', (user, close) => {
          apis.validateUserLogin(user.user_code, user.user_pwd).then(valid => {
            if (valid) {
              this.$message.success('登录成功')
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
      apis.fetchStationOptionsByIp(ip).then(options => {
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
