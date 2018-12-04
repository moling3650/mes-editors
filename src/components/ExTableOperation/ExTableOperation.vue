<template>
  <el-button-group>
    <el-button v-for="b in btns" :key="b.type" @click.stop.prevent="handleClick(b.type)" type="text" :icon="`el-icon-${b.icon}`" size="mini"/>
  </el-button-group>
</template>

<script>
export default {
  name: 'ExTableOperation',
  inject: {
    btns: {
      default: () => []
    }
  },
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
      this.$emit('on-custom-comp', {type, row: this.rowData, index: this.index})
    }
  }
}
</script>

<style scoped>
</style>
