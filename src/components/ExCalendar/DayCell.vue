<template>
  <div :class="['day-cell', isSelected ? 'selected': '']" @click.stop.prevent="handleDayClick()">
    <div class="day-wrapper">
      <div class="solar" :class="{'selected': isSelected, 'passive': day.isPassive}">{{day.dayMoment.date()}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayCell',
  props: {
    day: {
      type: Object
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDayClick () {
      this.$emit('dayClick', this.day)
    }
  }
}
</script>

<style scoped>
.day-cell { margin: 1px; width: 13.73%; height: 60px; display: inline-block; text-align: center; background-color: #fbfbfb; }
.day-cell.selected { background-color: #222944; color: #fff; }
.day-cell:hover { cursor: pointer; }
.day-wrapper { position: relative; width: 100%; height: 100%; }
.solar { position: absolute; bottom: 0; right: 0; text-align: right; color: #797979; padding: 10px 5px 0px 0px; font-size: 23px; font-weight: 300; }
.solar.selected { color: #ffffff; }
.solar.passive { color: #cccccc; }
.solar.passive.selected { opacity: 0.4; }
@media (max-width: 320px) {
  .day-cell { width: 13.63%; }
}
</style>
