import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

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
    user: {
      id: 'GDTSD233',
      registeredNotes: ['2', '2', '3']
    }
  },
  mutations: {
    createNote (state, payload) {
      state.loadedNotes.push(payload)
    }
  },
  actions: {
    createNote ({ commit }, payload) {
      const note = {
        title: payload.title,
        body: payload.body,
        imageUrl: payload.imageUrl,
        reminderDate: payload.reminderDate
      }
      commit('createNote', note)
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
    }
  }
})
