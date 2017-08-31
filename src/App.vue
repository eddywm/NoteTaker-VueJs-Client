<template>
  <v-app >
    <v-navigation-drawer temporary v-model="sideNav">
        <v-list >
          <v-list-tile
             v-for="item in menuItems"
             :key="item.title"
             :to="item.link">
            <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile v-if="userIsAuthenticated" @click="onLogOut">
            <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>LOG OUT</v-list-tile-content>
          </v-list-tile>

        </v-list>
    </v-navigation-drawer>
     <v-toolbar class="indigo lighten-2 tool-bar" dark>
       <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up" dark></v-toolbar-side-icon>
       <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">NoteTaker</router-link>
       </v-toolbar-title>
       <v-spacer></v-spacer>
       <v-toolbar-items class="hidden-xs-only">
         <v-btn flat
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
               >
           <v-icon left >{{ item.icon }}</v-icon>
           {{ item.title }}
         </v-btn>
         <v-btn flat v-if="userIsAuthenticated" @click="onLogOut">
           <v-icon left >exit_to_app</v-icon>
           LOG OUT
         </v-btn>
       </v-toolbar-items>
     </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data: function () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'lock', title: 'Sign In', link: '/sign-in'},
          {icon: 'supervisor_account', title: 'Sign Up', link: '/sign-up'}

        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'event_note', title: 'Notes', link: '/notes'},
            {icon: 'note_add', title: 'New Note', link: '/note/new'},
            {icon: 'account_circle', title: 'Profile', link: '/profile'}
          ]
        }

        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogOut () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
  .toolbar {
    height: 60 px;
    padding-bottom : 5px;
    font-size : 18px;
  }
</style>
