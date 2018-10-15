<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
      <span class="fl-r" v-show="model">
        <el-button type="text" size="mini" icon="el-icon-edit" @click="editItem">编辑</el-button>
        <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteItem">删除</el-button>
      </span>
    </div>
    <ul>
      <li v-for="(value, key) in item" :key="key">
        <span class="label">{{formItems[key] || key}}: </span>
        <span class="value">{{value}}</span>
      </li>
    </ul>
  </el-card>

</template>

<script>
import apis from '@/apis'
import forms from '@/form'

export default {
  name: 'ExItemCard',
  props: {
    model: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    },
    height: {
      type: String,
      default: '100%'
    }
  },
  data () {
    return {
      title: '请先选择',
      formItems: {}
    }
  },
  watch: {
    model (value) {
      if (!value) {
        return
      }
      forms[value](null, 'add', []).then(form => {
        this.title = form.title.replace(/(新建|表单)/g, '')
        this.formItems = {}
        form.formItems.map(item => {
          this.formItems[item.value] = item.label
        })
      })
    }
  },
  methods: {
    editItem () {
      forms[this.model](this.item, 'edit', [])
        .then(form => this.$showForm(form).$on('submit', (formData, close) => {
          apis[`update${this.model}`](formData).then(newItem => {
            this.$emit('updated', newItem)
            this.$message.success('修改成功')
            close()
          })
        }))
    },

    deleteItem () {
      this.$confirm(`此操作将永久删除该${this.title}, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        apis[`delete${this.model}`](this.item).then(_ => {
          this.title = '请先选择'
          this.$emit('deleted')
          this.$message.success('删除成功!')
        })
      }).catch(_ => {
        this.$message.info('已取消删除')
      })
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
li {
  line-height: 30px;
}
.label, .value {
  display: inline-block;
}
.label {
  width: 120px;
  text-align: right;
  font-weight: bold;
}
.value {
  margin-left: 20px;
}
</style>
