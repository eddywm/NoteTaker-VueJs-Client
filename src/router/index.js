import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Notes from '@/components/Notes/Notes.vue'
import Note from '@/components/Notes/Note.vue'
import CreateNote from '@/components/Notes/CreateNote.vue'

import Profile from '@/components/Users/Profile.vue'
import SignIn from '@/components/Users/SignIn.vue'
import SignUp from '@/components/Users/SignUp.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/notes',
      name: 'Notes',
      component: Notes
    },

    {
      path: '/notes/:id',
      name: 'Note',
      props: true,
      component: Note
    },

    {
      path: '/note/new',
      name: 'CreateNote',
      component: CreateNote
    },

    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },

    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },

    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignIn
    }

  ]
})
