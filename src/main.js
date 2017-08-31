import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import AlertComponent from './components/shared/Alert.vue'

Vue.use(Vuetify)
Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertComponent)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.dispatch('loadNotes')
    let now = Math.floor((new Date()).getTime() / 1000)
    if (now < localStorage.getItem('auth-token-exp')) {
      let user = {
        id: localStorage.getItem('auth-user-id')
      }
      this.$store.dispatch('autoSignIn', user)
    } else {
      this.$router.push('/sign-in')
    }
  }

})
