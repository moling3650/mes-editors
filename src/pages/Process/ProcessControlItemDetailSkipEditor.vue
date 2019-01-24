<template>
  <div id="ProcessControlItemDetailSkipEditor">
    <ExTable :model="processControlItemDetail" ref="table" :immediate="false" :defaultForm="defaultForm"></ExTable>

  </div>
</template>

<script>
import processControlItemDetail from '@/models/Process/ProcessControlItemDetails'

export default {
  name: 'ProcessControlItemDetailSkipEditor',
  props: {
    pid: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      defaultForm: {},
      processControlItemDetail: processControlItemDetail
    }
  },
  watch: {
    pid: {
      handler (value, oldValue) {
        this.defaultForm.pid = value
        this.$refs.table.search({ pid: value })
      }
    }
  },
  mounted () {
    this.defaultForm.pid = this.pid
    this.$refs.table.search({ pid: this.pid })
  }
}
</script>

<style scoped>
#ProcessControlItemDetailSkipEditor {
  margin-top: 15px;
}

.col {
  height: 500px;
  overflow-y: auto;
}
</style>
