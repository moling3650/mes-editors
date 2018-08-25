<template>
  <div class="ExInputNumber">
    <el-input-number :value="value" v-bind="$attrs" :controls="false" v-on="listers"/>
    <span>{{unit}}</span>
  </div>
</template>

<script>
export default {
  name: 'ExInputNumber',
  props: {
    value: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      default: ''
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
