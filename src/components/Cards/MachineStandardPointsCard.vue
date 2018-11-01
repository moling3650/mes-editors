<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">设备标准数据点维护</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addStandardPoint">添加数据点</el-button>
    </div>
    <el-table :data="PointList" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="machineCode" label="设备编号"/>
      <el-table-column prop="businessCode" label="业务编号"/>
      <el-table-column prop="businessName" label="业务名称"/>
      <el-table-column prop="pointId" label="数据点"/>
      <el-table-column prop="driveCode" label="驱动"/>
      <el-table-column prop="runAt" label="运行在"/>
      <el-table-column prop="triggerType" label="触发类型"/>
      <el-table-column prop="triggerCondition" label="触发条件"/>
      <el-table-column prop="parameter" label="属性"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editStandardPoint(scope.row)" type="primary" icon="el-icon-edit" circle size="mini"></el-button>
            <el-button @click.stop="deleteStandardPoint(scope.row)" type="danger" icon="el-icon-delete" circle size="mini"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import toOptions from '@/utils/toOptions'
import request from '@/utils/request'
import getMachineStandardPointForm from '@/form/MachineStandardPoint'
const business = ['完成数', '不良数', '状态', '状态代码']
export default {
  name: 'MachineStandardPointsCard',
  props: {
    machineCode: {
      type: String,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.machineCode
    }
  },
  data () {
    return {
      PointList: [],
      dataPointOptions: [],
      driveOptions: [],
      machineOptions: '',
      businessOptions: business.map((label, index) => ({value: `0${index + 1}`, label}))
    }
  },
  watch: {
    'machineCode' (value, oldValue) {
      this.PointList = []
      if (value) {
        this.fetchPoints(value)
      }
    }
  },
  methods: {
    // 数据点列表
    fetchPoints (machineCode) {
      request({
        method: 'get',
        url: `MachineStandardPoints`,
        params: {
          machineCode
        }
      }).then(data => {
        this.PointList = data
      })

      request({
        method: 'get',
        url: `Drives`,
        params: {
          typeId: 3
        }
      }).then(data => {
        this.driveOptions = toOptions(data, 'driveCode', 'driveName')
      })

      request({
        method: 'get',
        url: `MachineDataPoints`,
        params: {
          machineCode
        }
      }).then(data => {
        this.dataPointOptions = toOptions(data, 'pointId', 'dataPointName')
      })
    },

    addStandardPoint () {
      getMachineStandardPointForm({machineCode: this.machineCode}, 'add', this.businessOptions, this.dataPointOptions, this.driveOptions)
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.businessName = business[parseInt(formData.businessCode) - 1]
          formData.machineCode = this.machineCode
          console.log(formData)
          request({
            method: 'post',
            url: 'MachineStandardPoints',
            data: formData
          }).then(standardPoint => {
            this.PointList.push(standardPoint)
            this.$emit('change', standardPoint)
            this.$message.success('添加成功')
            close()
          })
        }).$on('update:triggerType', (value, item, formItems) => {
          formItems[6].unit = ['秒', '次'][value]
        }))
    },

    editStandardPoint (drive) {
      // getDriveForm(drive, 'edit')
      //   .then(form => this.$showForm(form).$on('submit', (drive, close) => {
      //     request({
      //       method: 'put',
      //       url: `Drives/${drive.driveId}`,
      //       data: drive
      //     }).then(_ => {
      //       const index = this.drivesList.findIndex(b => b.driveId === drive.driveId)
      //       ~index && this.drivesList.splice(index, 1, drive)
      //       this.$emit('change', drive)
      //       this.$message.success('修改成功')
      //       close()
      //     })
      //   }))
    },

    deleteStandardPoint (drive) {
      // this.$confirm('此操作将永久删除该驱动, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(_ => {
      //   request({
      //     method: 'delete',
      //     url: `Drives/${drive.driveId}`
      //   }).then(_ => {
      //     const index = this.drivesList.findIndex(s => s.driveId === drive.driveId)
      //     ~index && this.drivesList.splice(index, 1)
      //     this.$message.success('删除成功!')
      //   })
      // }).catch(_ => {
      //   this.$message.info('已取消删除')
      // })
    }
  }
}
</script>

<style scoped>
</style>
