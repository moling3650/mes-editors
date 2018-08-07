<template>
  <div id="DialogForm">
    <el-dialog
      title="提示"
      :visible.sync="visible"
      :before-close="handleClose"
      @closed="handleClosed">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogForm',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    handleClose () {
      this.visible = false
    },
    handleClosed () {
      this.$emit('closed')
    }
  }
}
</script>

<style scoped>
</style>
