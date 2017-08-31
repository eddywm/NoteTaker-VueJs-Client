<template>
  <v-container>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router  to="/notes" class="info">Explore Notes</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router  to="/note/new" class="info">Create New Note</v-btn>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          v-if="loading">

        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout class="mb-2" v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer">
          <v-carousel-item v-for="note in notes " :src="note.imageUrl" :key="note.id"
                           @click="onLoadNote(note.id)">
            <div class="note-title">
              {{ note.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mb-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join the NoteTakers community !</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  export default {
    computed: {
      notes () {
        return this.$store.getters.loadedNotes
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    created () {
    // fetch the data when the view is created
      this.$store.dispatch('loadNotes')
    },
    methods: {
      onLoadNote: function (id) {
        this.$router.push('/notes/' + id)
      }
    }
  }
</script>

<style scoped="">
.note-title {
  position: absolute;
  bottom: 50px;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 2em;
  padding: 15px;
  font-weight: bold;
}
</style>
