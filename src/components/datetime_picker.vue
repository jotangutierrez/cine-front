<template>
  <div>
    <date-picker class="rounded" v-model="time1" :lang="lang" ></date-picker>
  </div>
</template>

<script>
export default {
  name: 'datetime-picker',
  props: ['searchDate'],
  data () {
    return {
      time1: this.searchDate,
      lang: {
        days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        pickers: ['proximos 7 days', 'proximos 30 days', 'anteriores 7 days', 'anteriores 30 days'],
        placeholder: {
          date: 'Selecciona una fecha',
          dateRange: 'Select Date Range'
        }
      },
      // custom range shortcuts
      shortcuts: [
        {
          text: 'Hoy',
          onClick: () => {
            this.time3 = [ new Date(), new Date() ]
          }
        }
      ],
      timePickerOptions: {
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }
    }
  },
  watch: {
    time1: function (newdata) {
      this.$emit('updated', this.time1)
    }
  }
}
</script>

<style lang="css">

  .mx-input{
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 50px !important;
  }
</style>
