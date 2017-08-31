<template>
  <v-container>
    <v-layout row wrap v-for="note in notes" :key="note.id" class="mb-2">
      <v-flex xs12 sm10 offset-sm1>
          <v-card class="indigo lighten-3">
            <v-container fluid>
              <v-layout row>
                  <v-flex xs5 sm4 md3>
                    <v-card-media :src="note.imageUrl" height="150px">
                    <!-- <img :src="note.imageUrl"> -->
                    </v-card-media>
                  </v-flex>

                  <v-flex xs7 sm8 md9>
                    <v-card-title primary-title>
                      <div>
                        <h5 class="mb-0  white--text note-title">{{ note.title }}</h5>
                       <!--  {{ note.imageUrl }} -->

                        <div class="note-title">{{ note.reminderDate | date }}</div>
                        <!-- <div class="note-title">{{ note.reminderDate }}</div> -->
                      </div>

                    </v-card-title>



                    <v-card-actions>

                      <div>
                        <v-btn :to="'/notes/'+ note.id" class="note-title">
                          <v-icon left>arrow_forward</v-icon>
                          View Note
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-flex>

              </v-layout>
            </v-container>
          </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      notes: function () {
        return this.$store.getters.loadedNotes
      }
    },
    mounted () {
    // fetch the data when the view is created and the data is
      this.$store.dispatch('loadNotes')
    }
  }
</script>

<style scoped="">
  .note-title {
    font-family: Raleway, Roboto, sans-serif;
    font-weight: bold;
  }
</style>
