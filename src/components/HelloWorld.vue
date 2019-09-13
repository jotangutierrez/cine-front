<template>
  <div class="lg:flex min-h-screen">
    <nav class="bg-blue-500 w-1/5 min-h-screen text-white pl-12">
      <h1 class="mt-8 px-4 text-4xl tracking-wide">
        <span class="font-semibold font-montserrat italic">Place</span><span
        class="font-thin font-fontawesome">It</span>
      </h1>
      <ul class="mt-10">
        <li class="mt-3 py-6 hover:bg-blue-400 active:bg-blue-800 rounded-full rounded-r-none pl-6" @click="peliculas = true"><i class="far fa-calendar px-4"></i>Reservas
        </li>
        <li class="mt-3 py-6 hover:bg-blue-400 active:bg-blue-800 rounded-full rounded-r-none pl-6"
            @click="peliculas = false"><i class="fas fa-film px-4"></i>Películas
        </li>
      </ul>
    </nav>
    <div class="flex-1 pt-20 pl-20 text-black min-h-screen">
      <div v-if="peliculas">
        <h1 class="font-montserrat text-3xl">Peliculas</h1>
        <div class="flex flex-wrap -ml-8">
          <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-10 py-4 mt-2" v-bind:key="film.id" v-for="film in films">
            <film-card v-bind:film="film" ></film-card>
          </div>
        </div>
      </div>

      <div v-if="!peliculas">
        <t-table :headers="['id', 'film_name', 'name', 'email', 'document_number', 'phone']"
                 :data="reservations">

        </t-table>
      </div>
    </div>
    <reservation-modal v-bind:film="1"></reservation-modal>
  </div>
</template>

<script>
import filmCard from './film_card.vue'
import reservationModal from './reservation_modal'

export default {
  name: 'HelloWorld',
  data () {
    return {
      films: [],
      reservations: [],
      peliculas: true,
      currentDate: new Date().toISOString().slice(0, 10)
    }
  },

  mounted () {
    this.$http.get('/films').then((response) => {
      this.films = response.data
    })

    this.$http.get('/reservations').then((response) => {
      this.reservations = response.data
    })
  },

  components: {reservationModal, filmCard}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  a {
    color: #42b983;
  }
</style>
