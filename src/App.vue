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

        </v-list>
    </v-navigation-drawer>
     <v-toolbar class="indigo lighten-2" dark>
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
        sideNav: false,
        menuItems: [
          {icon: 'event_note', title: 'Notes', link: '/notes'},
          {icon: 'lock', title: 'Sign In', link: '/sign-in'},
          {icon: 'supervisor_account', title: 'Sign Up', link: '/sign-up'},
          {icon: 'note_add', title: 'New Note', link: '/note/new'},
          {icon: 'account_circle', title: 'Eddy WM', link: '/profile'}
        ]
      }
    }
  }
</script>
<style lang="stylus">
  @import './stylus/main'
  body {
    font-family: "Lato";
  }
  /*@import './assets/font-awesome/css/font-awesome.min.css'*/
</style>
