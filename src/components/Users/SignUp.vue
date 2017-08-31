<template>
  <v-container class="custom-text">
    <v-layout row v-if="error" v-for="(e, index) in error" :key="index">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="e"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row >
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="name"
                      label="Names"
                      type="text"
                      v-model="name"
                      required>

                    </v-text-field>
                  </v-flex>
                </v-layout>

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

                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      v-model="confirmPassword"
                      :rules="[comparePasswords]"
                      >

                    </v-text-field>
                  </v-flex>
                </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit" class="info" :disabled="loading" :loading="loading">
                    Sign Up
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                  </v-btn>
                </v-flex>
              </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    computed: {
      comparePasswords: function () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : true
      },
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
      onSignUp: function () {
        this.$store.dispatch('signUpUser', {
          name: this.name,
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
    /*font-family: Helvetica, Rambla, Raleway, Roboto, sans-serif;*/
    /*font-weight: bold;*/
    font-size: 16px;
  }
</style>
