<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span class="card-header--text">驱动维护</span>
      <el-button :disabled="disabled" class="fl-r p3-0" icon="el-icon-plus" type="text" @click="addDrive">添加驱动</el-button>
    </div>
    <el-table :data="drives" stripe header-cell-class-name="thcell" size="mini" class="w100p">
      <el-table-column prop="driveCode" label="驱动编号"/>
      <el-table-column prop="driveName" label="驱动名称"/>
      <el-table-column prop="fileName" label="文件名称"/>
      <el-table-column prop="description" label="描述"/>
      <el-table-column prop="isPublic" label="是否公用" :formatter="toPublicType"/>
      <el-table-column prop="enable" label="状态" :formatter="toEnableType"/>
      <el-table-column prop="property" label="属性" :formatter="toPropertyType"/>
      <el-table-column fixed="right" label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button @click.stop="editDrive(scope)" type="text" icon="el-icon-edit" size="mini"/>
            <el-button @click.stop="deleteDrive(scope)" type="text" icon="el-icon-delete" size="mini"/>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import Api from '@/utils/Api'
import getDriveForm from '@/form/drive'

export default {
  name: 'DriveDetailCard',
  props: {
    typeId: {
      type: Number,
      required: true
    }
  },
  computed: {
    disabled () {
      return !this.typeId
    }
  },
  data () {
    return {
      drives: []
    }
  },
  watch: {
    'typeId' (value, oldValue) {
      this.drives = []
      if (value) {
        this.fetchDrives(value)
      }
    }
  },
  methods: {

    toPublicType (row, column, cellValue, index) {
      return ['是', '否'][cellValue] || '未知'
    },

    toEnableType (row, column, cellValue, index) {
      return ['正常', '停用'][cellValue] || '未知'
    },

    toPropertyType (row, column, cellValue, index) {
      return ['前工步', '后工步'][cellValue] || '未知'
    },

    // 驱动列表
    fetchDrives (typeId) {
      Api.get('Drives', { typeId }).then(data => {
        this.drives = data
      })
    },

    addDrive () {
      getDriveForm(null, 'add')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          formData.typeId = this.typeId
          Api.post('Drives', formData).then(drive => {
            this.drives.push(drive)
            this.$emit('change', drive)
            this.$message.success('添加成功')
            close()
          })
        }))
    },

    editDrive (scope) {
      getDriveForm(scope.row, 'edit')
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          Api.put(`Drives/${formData.driveId}`, formData).then(_ => {
            this.drives.splice(scope.$index, 1, formData)
            this.$emit('change', formData)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteDrive (scope) {
      this.$confirm('此操作将永久删除该驱动, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        Api.delete(`Drives/${scope.row.driveId}`).then(_ => {
          this.drives.splice(scope.$index, 1)
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>
</style>
