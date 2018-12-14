<template>
  <el-card class="h300">
    <div slot="header" class="clearfix">
      <span class="card-header--text">绑定设备</span>
    </div>
    <dl v-show="machineDetail.stationCode">
      <dt><span class="title">设备图片：<img src="static/img/img01.jpg" width="150px" height="150px"></span></dt>
      <dd><span class="detailFont">{{machineDetail.img}}</span></dd>
      <dt><span class="title">设备编号：</span></dt>
      <dd><span class="detailFont">{{machineDetail.machineCode}}</span></dd>
      <dt><span class="title">设备名称：</span></dt>
      <dd><span class="detailFont">{{machineDetail.machineName}}</span></dd>
      <dt><span class="title">供应商：</span></dt>
      <dd><span class="detailFont">{{machineDetail.manufacturer}}</span></dd>
      <dt><span class="title">模具型号：</span></dt>
      <dd><span class="detailFont">{{machineDetail.modelCode}}</span></dd>
    </dl>
    <div>
      <el-button v-show="machineBindShow" icon="el-icon-plus" @click="addMachineBind" class="fl-r p3-0" type="primary">绑定设备</el-button>
      <el-button v-show="!machineBindShow" icon="el-icon-plus" @click="removeMachineBind" class="fl-r p3-0" type="primary">解除绑定</el-button>
    </div>
    <el-dialog title="工位设备绑定" :visible.sync="machineBindForm">
      <el-cascader :options="cascaderOptions" placeholder="请选择设备类型" filterable width="200px" @change="handleMachineChange"/>
      <el-table :data="machineList" stripe highlight-current-row class="w100p" @row-click="checkMachine" style="margin-top: 10px;">
        <el-table-column prop="machineCode"  label="设备编号" width="150"></el-table-column>
        <el-table-column prop="machineName" label="设备名称" width="200"></el-table-column>
        <el-table-column prop="state" label="状态" :formatter="toState"></el-table-column>
        <el-table-column prop="useState"  label="是否审核" :formatter="toUseState"></el-table-column>
        <el-table-column prop="manufacturer" label="生产商"></el-table-column>
        <el-table-column prop="description" label="备注信息"></el-table-column>
      </el-table>
      <div class="btnDiv">
        <el-button type="info">取消</el-button>
        <el-button type="success" @click="btnBind">提交绑定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
export default {
  name: 'StationMachineBindCard',
  props: {
    stationCode: {
      type: String,
      default () {
        return {}
      }
    }
  },
  computed: {
    machineBindShow () {
      return !this.machineDetail.machineCode
    }
  },
  data () {
    return {
      machineBindForm: false,
      cascaderOptions: [],
      modelCode: '',
      machineList: [],
      selectRow: {},
      machineDetail: {}
    }
  },

  watch: {
    stationCode: {
      handler (value, oldValue) {
        this.machineDetail = []
        if (value) {
          Api.get(`Machines`, { stationCode: this.stationCode }).then(data => {
            this.machineDetail = data[0] || {}
          })
        }
      },
      immediate: true
    }
  },

  methods: {

    toUseState (row, column, cellValue, index) {
      return ['未审核', '已审核'][cellValue] || '未知'
    },

    toState (row, column, cellValue, index) {
      return ['待机', '运行', '故障', '维护'][cellValue] || '未知'
    },

    handleMachineChange (machine) {
      this.modelCode = machine[2]
      Api.get('Machines', { modelCode: this.modelCode }).then(data => {
        this.machineList = data
      })
    },

    addMachineBind () {
      this.machineBindForm = true
    },

    removeMachineBind () {
      this.$confirm('此操作将永久解除该工位绑定设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        const machine = Object.assign({}, this.machineDetail, {stationCode: null})
        Api.put(`Machines/${machine.id}`, machine).then(_ => {
          this.machineDetail = machine
          this.$message.success('解绑成功')
        })
      }).catch(_ => {
        this.$message.info('已取消解绑')
      })
    },

    checkMachine (row) {
      this.selectRow = row
    },

    btnBind () {
      const machine = Object.assign({}, this.selectRow, {stationCode: this.stationCode})

      Api.put(`Machines/${machine.id}`, machine).then(_ => {
        this.machineDetail = machine
        this.$message.success('绑定成功')
        this.machineBindForm = false
      })
    }
  },

  created () {
    Api.get('MachineModels/CascaderOptions').then(options => {
      this.cascaderOptions = options
    })
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
  min-height: 18px;
}
dt {
  font-weight: normal;
}
dd {
  margin-left: 80px;
  margin-top: -24px;
}
dt {
  line-height: 2;
}
.title {
  font-weight: bold;
}
.detailFont {
  font-family: PingFang SC;
  font-weight: unset;
  color: cadetblue;
}
.machineDialog {
  height: 700px;
}
.btnDiv {
  margin-top: 10px;
}
</style>
