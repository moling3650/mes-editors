<template>
  <div class="ExSelectButtonGroup">
    <div class="select-wrap">
      <ex-select :options="options" :value="key" clearable @change="handleChange"/>
    </div>
  </div>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'ExSelectButtonGroup',
  props: {
    model: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      required: true
    },
    label: {
      type: String,
      default () {
        return this.value.toString()
      }
    },
    getForm: {
      type: Function,
      required: false
    }
  },
  data () {
    return {
      key: '',
      items: []
    }
  },
  computed: {
    options () {
      return this.items.map(item => {
        return {
          value: item[this.value],
          label: item[this.label]
        }
      })
    }
  },
  methods: {
    handleChange (key) {
      console.log(key)
    }
  },
  mounted () {
    if (apis[`fetch${this.model}s`]) {
      apis[`fetch${this.model}s`]().then(data => {
        this.items = data
      })
    }
  }
}
</script>

<style scoped>
</style>
