<template>
  <div id="MenuEditor">

    <el-row :gutter="20" class="row">
      <el-col :span="12">
        <MenuTreeCard/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import MenuTreeCard from '@/components/Cards/MenuTreeCard'

export default {
  name: 'MenuEditor',
  components: {
    MenuTreeCard
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped>
#MenuEditor {
  margin: 5px;
}
</style>
