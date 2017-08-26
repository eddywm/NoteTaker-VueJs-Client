<template>
  <v-container class="container-custom">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="primary--text">Create a new Note</h4>
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
              <v-text-field
                name="imageUrl"
                label="Upload Image"
                id="imageUrl"
                v-model="imageUrl"
                required>
              </v-text-field>
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
              <img :src="imageUrl" alt="" height="150">
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
        time: new Date()
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
      }
    },
    methods: {
      onCreateNote () {
        if (this.invalidForm) {
          return
        }
        const noteData = {
          title: this.title,
          body: this.body,
          imageUrl: this.imageUrl,
          reminderDate: this.submittableDateTime
        }
        this.$store.dispatch('createNote', noteData)
        this.$router.push('/notes')
      }
    }
  }
</script>

<style scoped>
 .container-custom{
   font-family: Roboto, sans-serif;
 }
</style>
