<template>
  <div id="DialogForm">
    <el-dialog title="提示" :visible.sync="visible" :before-close="close" @closed="handleClosed">
      <el-form :model="form" :rules="rules" label-width="100px" ref="form">
        <el-form-item v-for="item in formItems" :key="item.value" :label="item.label" :prop="item.value">
          <component :is="item.component" v-model="form[item.value]"
            :active-value="item.activeValue"
            :inactive-value="item.inactiveValue"></component>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reset">重 置</el-button>
        <el-button type="primary" @click="submit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogForm',
  props: {
    formItems: {
      type: Array,
      required: true
    },
    formData: {
      type: Object,
      default () {
        return {}
      }
    },
    rules: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      visible: false,
      form: {}
    }
  },
  methods: {
    reset () {

    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submit', JSON.parse(JSON.stringify(this.form)), this.close)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close () {
      this.visible = false
    },
    handleClosed () {
      this.$emit('closed')
    }
  },
  mounted () {
    this.form = JSON.parse(JSON.stringify(this.formData))
  }
}
</script>

<style scoped>
</style>
