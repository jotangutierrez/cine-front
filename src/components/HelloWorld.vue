<template>
  <div class="lg:flex flex min-h-screen">
    <nav class="bg-blue-500 w-1/5 min-h-screen text-white fixed pl-0 md:pl-12">
      <h1 class="mt-8 px-4  md:text-4xl text-2xl text-center md:text-left tracking-wide">
        <span class="font-semibold font-montserrat italic">Place</span><span class="font-thin font-fontawesome italic">It</span>
      </h1>
      <ul class="mt-10">
        <li v-bind:class="{ 'bg-blue-400': peliculas }" class="text-center md:text-left mt-3 py-6 hover:bg-blue-300 rounded-none md:rounded-l-full rounded-r-none md:pl-6"
            @click="peliculas = true"><i class="fas fa-film px-4"></i>Películas
        </li>
        <li v-bind:class="{ 'bg-blue-400': !peliculas }" class="text-center md:text-left mt-3 py-6 hover:bg-blue-300 rounded-none md:rounded-l-full rounded-r-none md:pl-6" @click="peliculas = false"><i class="far fa-calendar px-4"></i>Reservas
        </li>
      </ul>
    </nav>
    <div class="w-1/5 min-h-screen text-white pl-0 md:pl-12"></div>
    <div class="absolute top-0 right-0 px-2">
      <flash-message class="z-40 ml-4 my-2 h-32"></flash-message>
    </div>
    <div class="flex-1 p-20 text-black min-h-screen h-full">
      <div v-if="peliculas">
        <div class="flex">
          <h1 class="font-montserrat text-4xl">Peliculas</h1>
          <div class="text-right w-full clearfix">
            <t-button variant="primary" @click="launchModal(searchDate)" class="modal-open enviar float-right md:w-1/4 rounded-full">Añadir película</t-button>
          </div>
        </div>
        <div class="flex py-10">
          <span class="w-1/6 font-montserrat">Selecione una fecha</span>
          <datetime-picker v-bind:searchDate="searchDate" @updated="refreshList" class="w-1/8"></datetime-picker>
        </div>
        <div class="flex flex-wrap -ml-8">
          <div class="w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pl-10 py-4 mt-2" v-bind:key="film.id" v-for="film in films">
            <film-card v-bind:film="film" v-bind:searchDate="searchDate.toISOString().slice(0,10)"></film-card>
          </div>
        </div>
      </div>
      <div v-if="!peliculas">
        <div class="flex">
          <h1 class="font-montserrat text-4xl">Peliculas</h1>
        </div>
        <div class="flex py-10">
          <span class="w-1/6 font-montserrat">Selecione una fecha</span>
          <datetime-picker v-bind:dateRange="reservationDate" @updated="refreshReservation" class="rounded w-1/8 h-full"></datetime-picker>
        </div>
        <div>
          <t-table
                  :headers="[{value: 'film_name', text: 'Pelicula'}, {value: 'name', text: 'Nombre reservante'},
                              {value: 'email', text: 'Correo electrónico'}, {value: 'document_number', text: 'Cédula'},
                              {value: 'phone', text: 'Celular'}]"
                   :data="reservations"
                   :thead-class="{
                              thead: '',
                              tr: 'border-blue-700',
                              th: 'font-montserrat p-2 text-sm text-center',
                            }">
            <template v-slot:column="props">
              <td :class="[props.tdClass, 'text-sm text-center font-thin']"><strong>{{ props.text }}</strong></td>
            </template>
          </t-table>
        </div>
      </div>
    </div>
    <film-modal @updated="refreshList"></film-modal>
    <reservation-modal @updated="refreshList"></reservation-modal>
  </div>
</template>

<script>
import filmCard from './film_card.vue'
import reservationModal from './custom_modal'
import filmModal from './custom_film'
import datetimePicker from './datetime_picker'

export default {
  name: 'HelloWorld',
  data () {
    return {
      films: [],
      reservations: [],
      peliculas: true,
      searchDate: new Date(),
      reservationDate: [Date(), Date()],
      errors: {}
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

  methods: {
    refreshList (date) {
      console.log('Refrescar')
      if (date != null) {
        this.searchDate = date
      } else {
        date = this.searchDate
      }
      this.$http.get('/films', {
        params: {
          start_date: date
        }
      }).then((response) => {
        this.films = response.data
      })
    },

    refreshReservation (dateRange) {
      if (dateRange != null) {
        this.$http.get('/reservations', {
          params: {
            start_date: dateRange[0].toISOString().slice(0, 10),
            end_date: dateRange[1].toISOString().slice(0, 10)
          }
        }).then((response) => {
          this.reservations = response.data
        })
      }
    },

    launchModal () {
      this.$modal.show('custom-film')
    }
  },

  components: {reservationModal, filmCard, datetimePicker, filmModal}
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
