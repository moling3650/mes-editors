<template>
  <div id="RepairToolEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="6">
        <el-input  v-model="ip" :disabled="true" />
      </el-col>
      <el-col :span="6">
        <el-cascader :options="stationOptions" placeholder="请选择工序" @change="handleKindChange"/>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="repairLogin">登录维修</el-button>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'
import getRepairLoginForm from '@/form/repair/repairLogin'

export default {
  name: 'RepairToolEditor',
  components: {

  },
  data () {
    return {
      ip: '',
      stationOptions: []
    }
  },
  computed: {

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
      console.log(1)
      getRepairLoginForm()
        .then(form => this.$showForm(form).$on('submit', (user, close) => {
          apis.validateUserLogin(user.user_code, user.user_pwd).then(valid => {
            console.log(valid)
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
