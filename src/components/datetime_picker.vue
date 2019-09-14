<template>
  <div>
    <date-picker class="" v-if="searchDate" v-model="time1" :lang="lang" v-bind:clearable="false"></date-picker>
    <date-picker class="" v-if="dateRange" v-model="time1" range shortcuts="shortcuts" v-bind:clearable="false" v-bind:confirm="true" :lang="lang" width="auto"></date-picker>
  </div>
</template>

<script>
export default {
  name: 'datetime-picker',
  props: ['searchDate', 'dateRange'],
  data () {
    return {
      time1: this.searchDate || this.dateRange,
      lang: {
        days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        months: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        pickers: ['proximos 7 days', 'proximos 30 days', 'anteriores 7 days', 'anteriores 30 days'],
        placeholder: {
          date: 'Selecciona una fecha',
          dateRange: 'Selecciona un rango'
        }
      },
      // custom range shortcuts
      shortcuts: [
        {
          text: 'Hoy'
        }
      ],
      timePickerOptions: {
        start: '00:00',
        step: '00:30',
        end: '23:30'
      }
    }
  },

  created () {
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
    border-radius: 50px ;
  }

  input.mx-input{
    text-align: center;
  }

  .soft-rounded .mx-input{
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;

  }
</style>
