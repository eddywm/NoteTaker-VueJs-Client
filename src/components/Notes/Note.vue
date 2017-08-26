<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="blue-grey darken-1">
            <h5 class="card-title white--text">{{ note.title }}</h5>
          </v-card-title>
          <v-card-media :src="note.imageUrl" height="300px">
          </v-card-media>
          <v-card-text class="grey lighten-2">
            <div class="info--text">{{ note.reminderDate | date }}</div>
            <p class="note-description">
            {{ note.description }}
            </p>
          </v-card-text>
          <v-card-actions class="grey lighten-1">
            <v-btn class="teal darken-1 white--text">
              <v-icon left dark>markunread</v-icon>
              Mark Seen
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="red white--text">
              <v-icon left dark>delete_forever</v-icon>
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      note () {
        return this.$store.getters.loadedNote(this.id)
      }
    }
  }
</script>

<style scoped>
 .card-title{
   font-family: Roboto, sans-serif;
 }
.note-description{
  font-family: Helvetica Neue, Helvetica, Arial;
  font-size: 12px;
}
</style>
