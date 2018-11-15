<template>
  <div id="Editors">
    <el-container>
      <el-aside width="200px" style="margin-top: 35px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true" :unique-opened="true">
          <el-menu-item index="/editors/report">
            <i class="el-icon-setting"></i>
            <span slot="title">报表模块</span>
          </el-menu-item>
          <el-submenu index="machine">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设备</span>
            </template>
            <el-menu-item index="/editors/machine">设备管理</el-menu-item>
            <el-menu-item index="/editors/control_point">设备管控点</el-menu-item>
            <el-menu-item index="/editors/repair_tool">设备维修</el-menu-item>
            <el-menu-item index="/editors/drive">驱动管理</el-menu-item>
            <el-menu-item index="/editors/processFlow">工艺步骤管理</el-menu-item>
          </el-submenu>
          <el-submenu index="workTool">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>工装</span>
            </template>
            <el-menu-item index="/editors/workTool">工装管理</el-menu-item>
            <el-menu-item index="/editors/mould">模具管理</el-menu-item>
          </el-submenu>
          <el-submenu index="material">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>物料</span>
            </template>
            <el-menu-item index="/editors/bom">物料清单</el-menu-item>
            <el-menu-item index="/editors/formula">物料配方</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Editors',
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
