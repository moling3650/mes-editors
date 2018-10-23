<template>
  <div>
    <el-row>
      <el-form :inline="true">
        <el-form-item label="批次">
          <el-input v-model="sfc" placeholder="批次编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectSFC(sfc)">查询</el-button>
          <el-button type="primary">开始维修</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-card>
        <div slot="header" class="clearfix">
        <span class="card-header--text">维修登记列表</span>
        </div>
        <el-table :data="repairDataList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row>
          <el-table-column prop="sfc" label="批次号"/>
          <el-table-column prop="order_no" label="工单编号"/>
          <el-table-column prop="from_process" label="来源工序代码"/>
          <el-table-column prop="from_process_name" label="来源工序名称"/>
          <el-table-column prop="qty" label="数量"/>
          <el-table-column fixed="right" label="操作" width="200" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button @click.stop="doRepair(scope.row)"  type="primary" icon="el-icon-edit" circle size="mini">开始维修</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'RepairCard',
  props: {

  },

  data () {
    return {
      sfc: '0411-1VZ17D10SB-00FJJL',
      repairDataList: []
    }
  },
  watch: {
  },

  methods: {
    selectSFC (sfc) {
      apis.fetchRepairBySFC(sfc).then(data => {
        console.log(data)
        if (!data.length) {
          console.log('没有数据')
        } else {
          this.repairDataList = data
        }
      })
    },

    doRepair (row) {

    }
  },

  mounted () {
  }
}
</script>
