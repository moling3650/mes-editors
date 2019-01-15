<template>
  <div id="Editors">
    <el-container>
      <el-aside width="200px" style="margin-top: 35px">
        <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true" :unique-opened="true">
          <el-submenu index="system">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/editors/depart">部门管理</el-menu-item>
            <el-menu-item index="/editors/employee">员工管理</el-menu-item>
            <el-menu-item index="/editors/module">模块管理</el-menu-item>
            <el-menu-item index="/editors/role">角色管理</el-menu-item>
            <el-menu-item index="/editors/userRole">角色分配</el-menu-item>
            <el-menu-item index="/editors/menu">菜单管理</el-menu-item>
            <el-menu-item index="/editors/rolePower">角色权限管理</el-menu-item>
          </el-submenu>
          <el-submenu index="product">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>生产管理</span>
            </template>
            <el-menu-item index="/editors/processType">工序类型管理</el-menu-item>
            <el-menu-item index="/editors/workGroup">工序组管理</el-menu-item>
            <el-menu-item index="/editors/workGroupClass">工序组班别管理</el-menu-item>
            <el-menu-item index="/editors/WorkCalendar">工作日历</el-menu-item>
            <el-menu-item index="/editors/processFlow">工艺流程管理</el-menu-item>
            <el-menu-item index="/editors/processStepDetail">工艺步骤管理</el-menu-item>
            <el-menu-item index="/editors/process">工序管理</el-menu-item>
          </el-submenu>
          <el-submenu index="workOrder">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>计划管理</span>
            </template>
            <el-menu-item index="/editors/workOrder">工单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="dataModel">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>数据建模</span>
            </template>
            <el-menu-item index="/editors/productModel">成品型号管理</el-menu-item>
            <el-menu-item index="/editors/product">成品管理</el-menu-item>
            <el-menu-item index="/editors/material">物料管理</el-menu-item>
            <el-menu-item index="/editors/materialType">物料类型管理</el-menu-item>
            <el-menu-item index="/editors/workshop">车间管理</el-menu-item>
            <el-menu-item index="/editors/line">线别管理</el-menu-item>
            <el-menu-item index="/editors/dataTranslation">转译字典管理</el-menu-item>
            <el-menu-item index="/editors/drive">驱动管理</el-menu-item>
          </el-submenu>
          <el-submenu index="machine">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>设备管理</span>
            </template>
            <el-menu-item index="/editors/machine">设备管理</el-menu-item>
            <el-menu-item index="/editors/repair_tool">设备维修</el-menu-item>
          </el-submenu>
          <el-submenu index="workTool">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>工装模具</span>
            </template>
            <el-menu-item index="/editors/workTool">工装管理</el-menu-item>
            <el-menu-item index="/editors/mould">模具管理</el-menu-item>
          </el-submenu>
          <el-submenu index="quality">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>品质管理</span>
            </template>
            <el-menu-item index="/editors/ngCode">不良现象管理</el-menu-item>
            <el-menu-item index="/editors/ngType">不良类型管理</el-menu-item>
            <el-menu-item index="/editors/ngReason">不良原因管理</el-menu-item>
            <el-menu-item index="/editors/productGrade">成品等级管理</el-menu-item>
          </el-submenu>
          <el-submenu index="material">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>物料管理</span>
            </template>
            <el-menu-item index="/editors/bom">物料清单</el-menu-item>
          </el-submenu>
          <el-submenu index="reports">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>看板</span>
            </template>
            <el-menu-item index="/reports/production">生产看板</el-menu-item>
            <el-menu-item index="/reports/machine">设备看板</el-menu-item>
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
