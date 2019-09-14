<template>
  <div>
    <modal name="custom-film" height="auto" :scrollable="true">
      <div class="p-5 h-full">
        <h1 class="pb-6 px-4 font-montserrat text-3xl">Nueva película</h1>
        <form class=" md:flex md:flex-wrap md:justify-between" action="/v1/reservations" method="post"
              @submit.prevent="onsubmit">


          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="name">Título</label>
            <t-input v-model="film.name" name="name"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Sinopsis</label>
            <t-input v-model="film.description" name="description"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Póster</label>
            <t-input v-model="film.cover_url" name="cover_url"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Fechas</label>
<!--            <date-picker class="no-rounded" v-model="time1"></date-picker>-->
            <datetime-picker class="soft-rounded w-1/8 h-full" date-range="true" @updated="splitDate"></datetime-picker>
<!--            <t-input v-model="film.dates" name="dates"></t-input>-->
          </div>

          <div class="flex flex-col px-4 py-4 text-center w-full">
            <div class="pl-8">
              <t-button variant="primary" @click="onSubmit()" class="enviar float-right md:w-1/2 rounded-full">Crear</t-button>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import TButton from 'vue-tailwind/src/elements/TButton'
import datetimePicker from './datetime_picker'

export default {
  name: 'custom-film',
  components: {TButton, datetimePicker},
  props: [],
  data () {
    return {
      film: {
        name: '',
        description: '',
        cover_url: '',
        start_date: '',
        end_date: '',
        dates: '',
        errors: []
      }
    }
  },

  methods: {
    onSubmit () {
      this.$http.post('films', {film: this.film})
        .then((response) => {
          this.flash(`La pelicula se creó exitosamente`, 'success', {
            timeout: 5000
          })
          this.$emit('updated')
        })
        .catch((error) => {
          Object.keys(error.response.data).forEach((index, value) => {
            this.flash(`Error: (${index}) ${error.response.data[index]}`, 'error', {
              timeout: 5000
            })
          })
        })
        .finally(() => {
          this.$modal.hide('custom-film')
        })
    },

    splitDate (date) {
      this.film.start_date = date[0]
      this.film.end_date = date[1]
    }
  }
}

</script>

<style scoped>
  input{
    height: 35px;
  }
</style>
