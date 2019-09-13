<template>
  <div>
    <!--Modal-->
    <div class="modal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
      <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">

        <div
          class="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg class="fill-current text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
               viewBox="0 0 18 18">
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
          </svg>
          <span class="text-sm">(Esc)</span>
        </div>

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="modal-content py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-3">
            <p class="text-2xl font-bold">Reservar</p>
            <div class="modal-close cursor-pointer z-50">
              <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                   viewBox="0 0 18 18">
                <path
                  d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
              </svg>
            </div>
          </div>
          <form action="/v1/reservations" method="post" @submit.prevent="onsubmit">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
            Nombre completo
          </label>
          <t-input v-model="name" name="name"></t-input>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Cédula
          </label>
          <t-input v-model="document_number" name="my-input"></t-input>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Celular
          </label>
          <t-input v-model="phone" name="my-input"></t-input>
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Email
          </label>
          <t-input v-model="email" name="my-input"></t-input>
          </form>

          <!--Footer-->
          <div class="flex justify-end pt-2">
            <button class="cancelar modal-close px-4 bg-transparent p-3 rounded-lg text-blue-500 hover:bg-gray-100 hover:text-blue-400 mr-2">Cancelar</button>
            <button
              class="reservar  px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400" @click="">
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'reservation-modal',
  props: ['filmId'],
  data () {
    return {
      film: {
        document_number: '',
        email: '',
        name: '',
        phone: '',
        film_id: this.filmId
      }
    }
  },

  mounted () {
    var openmodal = document.querySelectorAll('.modal-open')
    for (let i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function (event) {
        event.preventDefault()
        toggleModal()
      })
    }

    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)

    var closemodal = document.querySelectorAll('.modal-close')
    for (let i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }

    document.onkeydown = function (evt) {
      evt = evt || window.event
      var isEscape = false
      if ('key' in evt) {
        isEscape = (evt.key === 'Escape' || evt.key === 'Esc')
      } else {
        isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
        toggleModal()
      }
    }

    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
  },

  methods () {
    return {
      onSubmit () {
        this.$http.post('reservations', {
          name: this.name,
          document_number: this.name,
          email: this.email,
          phone: this.phone,
        }).then((response) => {
          this.reservations = response.data
        })
      },
    }
  }
}

</script>

<style scoped>

</style>
