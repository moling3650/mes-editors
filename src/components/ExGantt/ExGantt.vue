<template>
  <div id="Gantt" ref="gantt"></div>
</template>

<script>
import 'dhtmlx-gantt'
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_broadway.css'

const gantt = window.gantt
gantt.locale = {
  date: {
    month_full: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    month_short: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    day_full: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    day_short: ['日', '一', '二', '三', '四', '五', '六']
  },
  labels: {
    dhx_cal_today_button: '今天',
    day_tab: '日',
    week_tab: '周',
    month_tab: '月',
    new_event: '新建日程',
    icon_save: '保存',
    icon_cancel: '关闭',
    icon_details: '详细',
    icon_edit: '编辑',
    icon_delete: '删除',
    confirm_closing: '请确认是否撤销修改!',
    confirm_deleting: '是否删除日程?',
    section_description: '描述',
    section_time: '开始时间',
    section_type: '类型',
    /* grid columns */
    column_text: '任务名',
    column_start_date: '开始时间',
    column_duration: '持续时间',
    column_add: '',
    /* link confirmation */
    link: '关联',
    confirm_link_deleting: '将被删除',
    link_start: ' (开始)',
    link_end: ' (结束)',
    type_task: '任务',
    type_project: '项目',
    type_milestone: '里程碑',
    minutes: '分钟',
    hours: '小时',
    days: '天',
    weeks: '周',
    months: '月',
    years: '年'
  }
}
function monthScaleTemplate (date) {
  const dateToStr = gantt.date.date_to_str('%y年 %M')
  return dateToStr(date)
}

gantt.config.subscales = [
  {unit: 'month', step: 1, template: monthScaleTemplate}
]
gantt.config.date_scale = '%d'
gantt.config.min_column_width = 20
gantt.config.drag_links = false
gantt.config.duration_unit = 'day'
gantt.config.scale_unit = 'day'
gantt.config.show_chart = true
gantt.config.show_progress = true
gantt.config.drag_mode = { ignore: 'ignore' }
gantt.config.columns = [
  { name: 'text', label: '派工单', width: '*', tree: true },
  { name: 'start_date', label: '开始日期', width: 100, align: 'center' },
  { name: 'station', label: '工位', width: 100, align: 'center' },
  { name: 'progressText', label: '进度', width: 40, align: 'center' }
  // { name: 'duration', label: '持续时间', align: 'center' },
  // { name: 'end_date', label: '结束日期', width: 100, align: 'center' }
  // { name: 'add', label: '', width: 44 }
]
gantt.templates.task_text = (start, end, task) => `${task.text}(${task.cpltQty} / ${task.qty})`
gantt.config.lightbox.sections = [
  {name: 'description', height: 38, map_to: 'text', type: 'textarea', focus: true},
  {name: 'time', type: 'duration', map_to: 'auto', time_format: ['%Y', '%m', '%d', '%H:%i']}
]
gantt.templates.task_class = (st, end, item) => item.$level === 0 ? 'gantt_project' : ''
// gantt.config.work_time = true
// gantt.setWorkTime({hours: [0, 4, 5, 12, 12, 16, 17, 24]})
// gantt.setWorkTime({date: new Date(2018, 10, 8), hours: []})
// gantt.templates.task_cell_class = function (task, date) {
//   if (!gantt.isWorkTime(date, 'hour')) {
//     return 'week_end'
//   }
//   return ''
// }

export default {
  name: 'ExGantt',
  props: {
    tasks: {
      type: Object,
      default () {
        return {
          data: []
        }
      }
    }
  },
  watch: {
    'tasks.data' (data) {
      this.$nextTick(_ => {
        data.map(task => {
          gantt.updateTask(task.id)
        })
      })
    }
  },
  methods: {
    $_initGanttEvents () {
      if (gantt.$_eventsInitialized) {
        return
      }
      gantt.attachEvent('onTaskSelected', (id) => {
        let task = gantt.getTask(id)
        this.$emit('task-selected', task)
      })
      gantt.attachEvent('onAfterTaskAdd', (id, task) => {
        this.$emit('task-updated', id, 'inserted', task)
        task.progress = task.progress || 0
        if (gantt.getSelectedId() === id) {
          this.$emit('task-selected', task)
        }
      })
      gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
        this.$emit('task-updated', id, 'updated', task)
      })
      gantt.attachEvent('onAfterTaskDelete', (id) => {
        this.$emit('task-updated', id, 'deleted')
        if (!gantt.getSelectedId()) {
          this.$emit('task-selected', null)
        }
      })
      gantt.attachEvent('onAfterLinkAdd', (id, link) => {
        this.$emit('link-updated', id, 'inserted', link)
      })
      gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
        this.$emit('link-updated', id, 'updated', link)
      })
      gantt.attachEvent('onAfterLinkDelete', (id, link) => {
        this.$emit('link-updated', id, 'deleted')
      })
      gantt.attachEvent('onLightboxSave', (id, task, isNew) => {
        return true
      })
      gantt.$_eventsInitialized = true
    }
  },
  mounted () {
    this.$_initGanttEvents()
    gantt.init(this.$refs.gantt)
    gantt.parse(this.tasks)
  }
}
</script>

<style scoped>
#Gantt {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
