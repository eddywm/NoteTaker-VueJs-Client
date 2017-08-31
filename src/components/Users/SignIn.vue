<template>
  <v-container class="custom-text">
    <v-layout row v-if="error" v-for="(e, index) in error" :key="index">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="e"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <form @submit.prevent="onSignIn">
          <v-card-title class="grey lighten-1">
              <div>
                <h5 class="mb-0  note-title">LOGIN</h5>
              </div>

          </v-card-title>
          <v-card-text>
            <v-container>


                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail Address"
                      type="email"
                      v-model="email"
                      required>

                    </v-text-field>
                  </v-flex>
                </v-layout>

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      type="password"
                      v-model="password"
                      required>

                    </v-text-field>
                  </v-flex>
                </v-layout>


            </v-container>
          </v-card-text>

          <v-card-title class="blue lighten-1">

                       <v-btn
                       type="submit"
                       style="font-size:20px; font-weight: bold"
                       class="red white--text"
                       :disabled="loading"
                       :loading="loading">
                            Sign In
                            <span slot="loader" class="custom-loader">
                              <v-icon light>cached</v-icon>
                            </span>
                        </v-btn>

          </v-card-title>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },

    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },

    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },

    methods: {
      onSignIn: function () {
        this.$store.dispatch('signInUser', {
          email: this.email,
          password: this.password
        })
      },
      onDismissed: function () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>

<style scoped>
  .custom-text {
    font-family: "Helvetica Neue", Raleway, Roboto, sans-serif;
    font-weight: bold;
    font-size: 18px;
  }
</style>
