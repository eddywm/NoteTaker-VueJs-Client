<template>
  <v-container class="custom-text">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                    name="email"
                    label="E-mail Address"
                    password="password"
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
                  <v-btn type="submit" class="info">Sign Up</v-btn>
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
    mounted () {

    },

    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },

    computed: {
      comparePasswords: function () {
        return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
      }
    },

    methods: {
      onSignUp: function () {
        console.log({
          email: this.email,
          password: this.email,
          confirmPassword: this.confirmPassword
        })
      }
    }
  }
</script>

<style scoped>
  .custom-text {
    font-family: Raleway, Roboto, sans-serif;
    font-weight: bold;
  }
</style>
