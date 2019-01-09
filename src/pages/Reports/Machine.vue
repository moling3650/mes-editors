<template>
  <div id="Machine">
    <el-row class="tool-bar" v-show="workShops.length">
      <el-col class="work-shop-name" :xs="12" :sm="16">
        <h2>{{ wsName }}</h2>
      </el-col>
      <el-col class="work-shop-seleter" :xs="12" :sm="8">
        <ExSelect v-model="wsid" :options="wsOpts" placeholder="请选择车间"/>
      </el-col>
    </el-row>

    <el-collapse v-show="filteredItems.length" v-model="activeName">
      <el-collapse-item v-for="item in filteredItems" :name="item.processCode" :key="item.processCode">
        <template slot="title">
          {{item.processName}}<i class="header-icon el-icon-info"></i>
        </template>
        <el-row :gutter="10">
          <el-col :sm="24" :md="12" :lg="8" v-for="m in item.children" :key="m.machineCode">
            <b-card class="ms-card" :header-bg-variant="m.variant" :header-text-variant="m.textColor" body-class="ms-card-body">
              <h6 slot="header" class="mb-0">{{m.machineName}}</h6>
              <img class="ms-img" :src="`/static/img/${m.img ? m.img : 'ZWT.jpg'}`">
              <ul>
                <li v-show="m.variant === 'success'">工  单： {{m.data.orderNo}}</li>
                <li v-show="m.variant === 'success'">操作人： {{m.data.empCode}}</li>
                <li v-if="m.variant === 'warning'">停机原因： {{getReason(m.data.stopReason)}}</li>
                <li v-show="m.variant === 'danger'">故障代码： {{m.data.troubleCode}}</li>
              </ul>
            </b-card>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Api from '@/utils/Api'
import toOptions from '@/utils/toOptions'
import bCard from 'bootstrap-vue/es/components/card/card'

export default {
  name: 'Machine',
  components: {
    bCard
  },
  data () {
    return {
      workShops: [],
      items: [],
      status: {},
      activeName: '',
      wsid: ''
    }
  },
  computed: {
    wsName () {
      const ws = this.workShops.find(w => w.wsid === this.wsid)
      return ws ? ws.wsName : '未选择车间'
    },

    wsOpts () {
      return toOptions(this.workShops, 'wsid', 'wsName')
    },

    filteredItems () {
      console.log('update')
      return this.items.filter(item => item.wsid === this.wsid).map(item => {
        item.children.forEach(m => {
          m.variant = this.getVariant(m)
          m.textColor = m.variant === 'default' ? 'black' : 'white'
          m.data = this.status[m.machineCode]
        })
        return item
      })
    }
  },
  methods: {
    getReason (code) {
      return ['缺料停机', '保养停机', '故障停机', '换班停机', '停产停机'][parseInt(code) - 1]
    },

    getVariant ({ machineCode }) {
      const status = this.status[machineCode]
      if (!status) return 'default'
      if (status.state === 1) return 'success'
      if (status.troubleCode) return 'danger'
      if (status.state === 0) return 'warning'
      return 'default'
    },

    fetchWorkShops () {
      Api.get('WorkShops').then(data => {
        this.workShops = data
      })
    },
    fetchMachines () {
      Api.get('Machines/WithProcess').then(data => {
        this.items = data
      })
    },
    fetchMachineStatus () {
      Api.get('Machines/WithStatus').then(data => {
        this.$nextTick(_ => {
          this.status = data
        })
      })
    }
  },
  created () {
    this.fetchWorkShops()
    this.fetchMachines()
    this.fetchMachineStatus()
    setInterval(this.fetchMachineStatus, 3000)
  }
}
</script>

<style scoped>
.tool-bar {
  margin: 10px;
}
.ms-card-body {
  height: 100px;
  padding: 5px;
}
.ms-img {
  display: inline-block;
  width: 90px;
  height: 90px;
}
.ms-card-body ul {
  display: inline-block;
  list-style: none;
}
</style>
