<template>
  <div id="Production">
    <Gantt v-if="loaded" :tasks="tasks"/>
  </div>
</template>

<script>
import Gantt from '@/components/ExGantt/ExGantt'
import Api from '@/utils/Api'

export default {
  name: 'Production',
  components: {
    Gantt
  },
  data () {
    return {
      loaded: false,
      tasks: {
        data: [],
        links: []
      }
    }
  },
  methods: {
    toTask (item) {
      return {
        id: item.id,
        text: item.dispatchingNo,
        station: item.stationCode,
        start_date: new Date(item.plannedStartTime),
        end_date: new Date(item.plannedCpltTime),
        qty: item.qty,
        cpltQty: item.cpltQty,
        progress: item.cpltQty / item.qty,
        progressText: `${parseInt(item.cpltQty / item.qty * 100)}%`,
        parent: -1
      }
    },
    fetchTasks () {
      return Api.get('WorkDispatchings')
    }
  },
  created () {
    this.fetchTasks().then(data => {
      const tasks = data.map(item => this.toTask(item))
      this.tasks.links = tasks.map((task, index) => {
        return {
          id: index,
          source: -1,
          target: task.id,
          type: '1'
        }
      })
      const totalQty = data.map(item => item.qty).reduce((t, i) => t + i, 0)
      const totalCpltQty = data.map(item => item.cpltQty).reduce((t, i) => t + i, 0)
      const startDate = Math.min(...data.map(item => +new Date(item.plannedStartTime)))
      const endDate = Math.max(...data.map(item => +new Date(item.plannedCpltTime)))
      tasks.unshift({
        id: -1,
        text: data[0].orderNo,
        station: '',
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        qty: totalQty,
        cpltQty: totalCpltQty,
        progress: totalCpltQty / totalQty,
        progressText: `${parseInt(totalCpltQty / totalQty * 100)}%`,
        open: true
      })
      this.tasks.data = tasks

      this.loaded = true
    })
    setInterval(() => {
      this.fetchTasks().then(data => {
        this.tasks.data = this.tasks.data.map(item => {
          const task = data.find(t => t.id === item.id)
          if (task) {
            item.cpltQty = task.cpltQty
            item.progress = item.cpltQty / item.qty
            item.progressText = `${parseInt(item.cpltQty / item.qty * 100)}%`
          }
          return item
        })
        const tasks = this.tasks.data.slice(1)
        const totalCpltQty = tasks.map(item => item.cpltQty).reduce((t, i) => t + i, 0)
        this.tasks.data[0].cpltQty = totalCpltQty
        this.tasks.data[0].progress = totalCpltQty / this.tasks.data[0].qty
        this.tasks.data[0].progressText = `${parseInt(totalCpltQty / this.tasks.data[0].qty * 100)}%`
      })
    }, 3000)
  }
}
</script>

<style scoped>
#Production {
  height: 100%;
}
</style>
