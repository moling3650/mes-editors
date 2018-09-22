<template>
  <div class="ExSelectButtonGroup">
    <div class="select-wrap">
      <ex-select :options="options" v-model="key" clearable @change="handleChange"/>
    </div>
    <el-button-group class="button-group">
      <el-button @click="addItem" type="primary" icon="el-icon-plus"></el-button>
      <el-button :disabled="disabled" @click="editItem" icon="el-icon-edit" type="primary"></el-button>
      <el-button :disabled="disabled" @click="deleteItem" icon="el-icon-delete" type="primary"></el-button>
    </el-button-group>
  </div>
</template>

<script>
import apis from '@/apis'
import getForm from '@/form'

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
    },
    disabled () {
      return !this.key
    },
    currentItem () {
      if (!this.key) {
        return null
      }
      return this.items.find(item => item[this.value] === this.key)
    }
  },
  methods: {
    handleChange (key) {
      this.$emit('change', this.currentItem)
    },

    addItem () {
      getForm[this.model](null, 'add').then(form => {
        this.$showForm(form).$on('submit', (formData, close) => {
          apis[`add${this.model}`](formData).then(newItem => {
            this.items.push(newItem)
            this.key = newItem[this.value]
            this.$message.success('添加成功!')
            this.$emit('change', newItem)
            close()
          })
        })
      })
    },

    editItem () {
      getForm[this.model](this.currentItem, 'edit').then(form => {
        this.$showForm(form).$on('submit', (formData, close) => {
          apis[`update${this.model}`](formData).then(newItem => {
            const index = this.items.findIndex(item => item[this.value] === newItem[this.value])
            if (~index) {
              this.items.splice(index, 1, newItem)
              this.$message.success('修改成功!')
              this.$emit('change', newItem)
              close()
            }
          })
        })
      })
    },

    deleteItem () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis[`delete${this.model}`](this.currentItem).then(_ => {
          const index = this.items.findIndex(item => item[this.value] === this.currentItem[this.value])
          if (~index) {
            this.items.splice(index, 1)
            this.key = ''
            this.$emit('change', {})
            this.$message.success('删除成功!')
          }
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  },
  mounted () {
    if (apis[`fetch${this.model}s`]) {
      apis[`fetch${this.model}s`]().then(data => {
        this.items = data
      })
    } else if (apis[`fetch${this.model}List`]) {
      apis[`fetch${this.model}List`]().then(data => {
        this.items = data
      })
    }
  }
}
</script>

<style scoped>
.ExSelectButtonGroup {
  position: relative;
}
.select-wrap {
  margin-right: 178px;
}
.button-group {
  position: absolute;
  top: 0;
  right: 0;
  width: 168px;
}
</style>
