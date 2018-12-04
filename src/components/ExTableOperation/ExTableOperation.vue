<template>
  <el-button-group>
    <el-button @click.stop.prevent="handleClick('edit')" type="text" icon="el-icon-edit" size="mini"/>
    <el-button @click.stop.prevent="handleClick('delete')" type="text" icon="el-icon-delete" size="mini"/>
  </el-button-group>
</template>

<script>
export default {
  name: 'ExTableOperation',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  methods: {
    handleClick (type) {
      console.log(this)
      this.$emit('on-custom-comp', {type, row: this.rowData, index: this.index})
    }
  }
}
</script>

<style scoped>
</style>
