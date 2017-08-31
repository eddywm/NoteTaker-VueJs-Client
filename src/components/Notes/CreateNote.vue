<template>
  <v-container class="container-custom">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Note</h4>
      </v-flex>
    </v-layout>

    <v-layout row v-if="error" v-for="(e, index) in error" :key="index">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="e"></app-alert>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateNote">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
              name="title"
              label="Title"
              id="title"
              v-model="title"
              required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="body"
                label="Body"
                id="body"
                multiLine
                rows="4"
                v-model="body"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised @click="onPickFile">Upload Image</v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                id="imageUpload"
                @change="onFilePicked">
            </v-flex>
          </v-layout>

           <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" alt="" height="150">
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h6>Select The Reminder Date & Time</h6>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time" format="24hr"></v-time-picker>
            </v-flex>
          </v-layout>



          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn type="submit" class="info" :disabled="invalidForm">
                Save Note
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        body: '',
        imageUrl: '',
        date: new Date(),
        time: new Date(),
        image: null
      }
    },

    computed: {
      invalidForm: function () {
        return (this.title === '' || this.body === '' || this.imageUrl === '')
      },

      submittableDateTime: function () {
        const date = new Date(this.date)

        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      onCreateNote () {
        if (this.invalidForm) {
          return
        }
        if (!this.image) {
          return
        }
        let formData = new FormData()
        formData.append('title', this.title)
        formData.append('body', this.body)
        formData.append('imageUrl', this.image)
        formData.append('reminderDate', this.submittableDateTime)
        this.$store.dispatch('createNote', formData)
        this.$router.push('/notes')
      },

      onDismissed: function () {
        this.$store.dispatch('clearError')
      },

      onPickFile () {
        this.$refs.fileInput.click()
      },

      onFilePicked (event) {
        const files = event.target.files
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    },

    watch: {
      error (value) {
        if (value.length === 0) {
          console.log('Error Value', value)
          this.$router.push('/notes')
        }
      }
    }
  }
</script>

<style scoped>
 .container-custom{
   /*font-family: Roboto, sans-serif;*/
 }
</style>
