<template>
  <div class="relative" @mouseover="show=true" @mouseleave="show=false">
    <div class="relative pb-2x">
<!--      <img class="w-full h-full absolute inset-x object-cover rounded-lg"-->
<!--           src="https://upload.wikimedia.org/wikipedia/en/1/12/Catching-Fire_poster.jpg" alt="">-->
      <img class="w-full h-full absolute inset-x object-cover rounded-lg"
           :src="film.cover_url" alt="">
    </div>
    <transition enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster">
      <div class="flex justify-center absolute bottom-0 mb-6 inset-x-0" v-show="show">
        <button class="modal-open px-3 py-2 bg-blue-500 rounded-full" @click="launchModal(film, searchDate)">{{buttonMessage()}}</button>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'film-card',
  props: ['film', 'searchDate'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      film_data: this.film,
      show: false
    }
  },
  methods: {
    available (filmData) {
      return filmData.available_seats > 0
    },

    buttonMessage () {
      if (this.available(this.film)) {
        return 'Reservar'
      } else {
        return 'Agotado'
      }
    },

    launchModal (filmData, searchDate) {
      if (this.available(filmData)) {
        this.$modal.show('hello-world', { filmId: filmData.id, reservationDate: searchDate })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
