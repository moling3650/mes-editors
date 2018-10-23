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
      <el-card style=" width: 700px; float: left;">
        <div slot="header" class="clearfix">
        <span class="card-header--text">维修登记列表</span>
        </div>
        <el-table :data="repairDataList" stripe header-cell-class-name="thcell" size="mini" class="w100p" highlight-current-row>
          <el-table-column prop="ng_code" label="现象代码"/>
          <el-table-column prop="ng_name" label="现象描述"/>
          <el-table-column prop="type_name" label="类型名称"/>
        </el-table>
    </el-row>
  </div>
</template>

<script>
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
      apis.fetchDataBySFC(sfc).then(data => {
        if (!data.length) {
          return
        }
      })
    }
  },

  mounted () {
  }
}
</script>
