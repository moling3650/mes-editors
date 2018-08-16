<template>
  <el-select class="w100p" :value="value" filterable v-bind="$attrs" v-on="listers">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'ExSelect',
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    listers () {
      return {
        ...this.$listeners,
        input: value => this.$emit('input', value)
      }
    }
  }
}
</script>

<style scoped>
</style>
