<template>
  <div id="ProcessControlItemSkipEditor">
    <ExTable :model="processControlItem" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>

  </div>
</template>

<script>
import processControlItem from '@/models/Process/ProcessControlItems'

export default {
  name: 'ProcessControlItemSkipEditor',
  props: {
    processCode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ProductTypeList: [],
      defaultForm: {},
      processControlItem: processControlItem
    }
  },
  watch: {
    processCode: {
      handler (value, oldValue) {
        this.defaultForm.processCode = value
        this.$refs.table.search({ processCode: value })
      }
    }
  },
  mounted () {
    this.defaultForm.processCode = this.processCode
    this.$refs.table.search({ processCode: this.processCode })
  }
}
</script>

<style scoped>
#ProcessControlItemSkipEditor {
  margin-top: 15px;
}

.col {
  height: 500px;
  overflow-y: auto;
}
</style>
