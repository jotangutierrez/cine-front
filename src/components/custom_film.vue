<template>
  <div>
    <modal name="hello-world" height="auto" :scrollable="true" @before-open="beforeOpen">
      <div class="p-5 h-full">
        <h1 class="pb-6 px-4 font-montserrat text-3xl">Reservar</h1>
        <form class=" md:flex md:flex-wrap md:justify-between" action="/v1/reservations" method="post"
              @submit.prevent="onsubmit">
          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="name">Título</label>
            <t-input v-model="film.name" name="name"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Sinopsis</label>
            <t-input v-model="film.document_number" name="document_number"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Póster</label>
            <t-input v-model="film.phone" name="document_number"></t-input>
          </div>

          <div class="mb-4 px-4 md:w-1/2">
            <label class="block font-montserrat text-gray-700 text-sm font-bold mb-2" for="username">Fechas</label>
            <t-input v-model="film.email" name="document_number"></t-input>
          </div>

          <div class="flex flex-col px-4 py-4 text-center w-full">
            <div class="pl-8">
              <t-button variant="primary" @click="onSubmit()" class="enviar float-right md:w-1/2 rounded-full">Reservar Ahora</t-button>
            </div>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
import TButton from 'vue-tailwind/src/elements/TButton'

export default {
  name: 'custom-modal',
  components: {TButton},
  props: ['filmId', 'reservationDate'],
  data () {
    return {
      film: {
        document_number: '',
        email: '',
        name: '',
        phone: '',
        film_id: this.filmId,
        reservation_date: this.reservationDate
      }
    }
  },

  methods: {
    onSubmit () {
      this.$http.post('reservations', {reservation: this.film})
        .then((response) => {
          this.flash(`La reserva se realizó exitosamente`, 'success', {
            timeout: 5000
          })
          this.$emit('updated', this.film.reservation_date)
        })
        .catch((error) => {
          Object.keys(error.response.data).forEach((index, value) => {
            this.flash(`Error: ${error.response.data[index]}`, 'error', {
              timeout: 5000
            })
          })
        })
        .finally(() => {
          this.$modal.hide('hello-world')
        })
    },
    beforeOpen (event) {
      this.film.film_id = event.params.filmId
      this.film.reservation_date = event.params.reservationDate
    }
  }
}

</script>

<style scoped>

</style>
