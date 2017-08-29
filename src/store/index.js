import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { BASE_URL, TIME_OUT_PERIOD, TOKEN } from '../http/http-common'

Vue.use(Vuex)

let http = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT_PERIOD,
  headers: {'Authorization': 'BEARER ' + TOKEN}
})

export const store = new Vuex.Store({
  state: {
    loadedNotes: [
      { imageUrl: '/static/images/image1.jpg',
        id: '1',
        title: 'If the mobile phone user walks',
        reminderDate: new Date(),
        description: 'With the expanded API , though, the call is made to the movie, requesting expan-\n' +
        'sion for the three other items desired for the page. It’s a single call to the API instead\n' +
        'of four separate calls, and though it might still fail, one retry on one call will still result\n' +
        'in a more responsive experience for the mobile user than if all of the calls to the strict\n' +
        'REST API had succeeded.'},
      { imageUrl: '/static/images/image2.jpg',
        id: '2',
        title: 'With the expanded API ,though',
        reminderDate: new Date(),
        description: 'With the expanded API , though, the call is made to the movie, requesting expan-\n' +
        'sion for the three other items desired for the page. It’s a single call to the API instead\n' +
        'of four separate calls, and though it might still fail, one retry on one call will still result\n' +
        'in a more responsive experience for the mobile user than if all of the calls to the strict\n' +
        'REST API had succeeded.'},
      { imageUrl: '/static/images/image3.jpg',
        id: '3',
        title: 'In addition to supporting expansion',
        reminderDate: new Date(),
        description: 'With the expanded API , though, the call is made to the movie, requesting expan-\n' +
        'sion for the three other items desired for the page. It’s a single call to the API instead\n' +
        'of four separate calls, and though it might still fail, one retry on one call will still result\n' +
        'in a more responsive experience for the mobile user than if all of the calls to the strict\n' +
        'REST API had succeeded.'},
      { imageUrl: '/static/images/image4.jpg',
        id: '4',
        title: 'LinkedIn went with a slightly',
        reminderDate: new Date(),
        description: 'With the expanded API , though, the call is made to the movie, requesting expan-\n' +
        'sion for the three other items desired for the page. It’s a single call to the API instead\n' +
        'of four separate calls, and though it might still fail, one retry on one call will still result\n' +
        'in a more responsive experience for the mobile user than if all of the calls to the strict\n' +
        'REST API had succeeded.'}
    ],
    user: null,
    loading: false,
    error: []
  },
  mutations: {
    setLoadedNotes (state, payload) {
      state.loadedNotes = payload
    },
    createNote (state, payload) {
      state.loadedNotes.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error.push(payload)
    },
    clearError (state) {
      state.error = []
    }
  },
  actions: {
    loadNotes ({ commit }) {
      commit('setLoading', true)
      http.get('notes')
        .then(response => {
          let notesFromServer = response.data.notes
          commit('setLoadedNotes', notesFromServer)
          console.log(notesFromServer)
          commit('setLoading', false)
        })
        .catch(e => {
          console.log(e.response)
          commit('setLoading', false)
        })
    },
    createNote ({ commit }, payload) {
      const note = {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl,
        reminderDate: payload.reminderDate
      }
      console.log(note)
      http.post('/notes', note)
        .then(response => {
          console.log(response.data)
          commit('createNote', {
            ...note,
            id: response.data.note.slug
          })
        })
        .catch(e => {
          console.log(e.response.data)
        })
    },
    signUpUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      let userData = {
        name: payload.name,
        email: payload.email,
        password: payload.password
      }
      http.post('register', userData)
       .then(response => {
         commit('setLoading', false)
         const newUser = {
           name: response.data.user.name,
           email: response.data.user.email,
           id: response.data.user.slug,
           registeredNotes: []
         }
         commit('setUser', newUser)
         localStorage.setItem('auth-token', response.data.auth.token)
         localStorage.setItem('auth-token-exp', response.data.auth.token_exp)
         localStorage.setItem('auth-refresher-exp', response.data.auth.refresher_exp)
         localStorage.setItem('auth-user-id', response.data.user.slug)
         console.log(response.data)
       })
        .catch(e => {
          let error = e.response.data.errors
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },

    signInUser ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      let userData = {
        email: payload.email,
        password: payload.password
      }

      http.post('authenticate', userData)
        .then(response => {
          commit('setLoading', false)
          const newUser = {
            name: response.data.user.name,
            email: response.data.user.email,
            id: response.data.user.slug,
            registeredNotes: []
          }
          commit('setUser', newUser)
          localStorage.setItem('auth-token', response.data.auth.token)
          localStorage.setItem('auth-token-exp', response.data.auth.token_exp)
          localStorage.setItem('auth-refresher-exp', response.data.auth.refresher_exp)
          console.log(response.data.error)
        })
        .catch(e => {
          let error = e.response.data.error
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },

    clearError ({ commit }) {
      commit('clearError')
    }
  },

  getters: {
    loadedNotes (state) {
      return state.loadedNotes.sort((note0, note1) => {
        return note0.reminderDate > note1.reminderDate
      })
    },
    featuredNotes (state, getters) {
      return getters.loadedNotes.slice(0, 3)
    },
    loadedNote (state) {
      return (noteId) => {
        return state.loadedNotes.find((note) => {
          return note.id === noteId
        })
      }
    },
    user (state) {
      return state.user
    },

    loading (state) {
      return state.loading
    },

    error (state) {
      return state.error
    }
  }
})
