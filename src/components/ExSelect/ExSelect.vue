<template>
  <el-select class="w100p" :value="value" filterable v-bind="$attrs" v-on="listers">
    <el-option
      v-for="item in items"
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
      type: [Array, Object],
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    items () {
      if (Array.isArray(this.options)) {
        return this.options.map((opt, idx) => {
          const value = (typeof opt === 'string') ? idx : opt.value
          const label = opt.label || opt.value || opt
          return { value, label }
        })
      } else {
        return Object.entries(this.options).map(([value, label]) => ({ value, label }))
      }
    },

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
