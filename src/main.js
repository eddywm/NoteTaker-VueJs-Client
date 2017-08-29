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
  }

})
