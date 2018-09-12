<template>
  <div id="MachineModelEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="8">
        <el-cascader :options="kinds" placeholder="请选择类型" class="w100p"/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import apis from '@/apis'

export default {
  name: 'MachineModelEditor',
  components: {
  },
  data () {
    return {
      kinds: []
    }
  },
  computed: {

  },
  methods: {

  },
  mounted () {
    apis.fetchMchineTypeKindOptions().then(options => {
      this.kinds = options
    })
  }
}
</script>

<style scoped>
#MachineModelEditor {
  margin: 5px;
}
</style>
