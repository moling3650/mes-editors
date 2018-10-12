<template>
  <el-card :style="{ height: (/(%|px)$/i.test(height)) ? height : `${height}px` }">
    <div slot="header" class="clearfix">
      <span class="card-header--text">{{title}}</span>
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
      title: '未知',
      formItems: []
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
