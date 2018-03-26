<template lang="pug">
nav.navbar.navbar-expand-md.navbar-dark.fixed-top.bg-dark
  .container
    a.navbar-brand(href='/itemsync') ItemSync
    button.navbar-toggler(type='button', data-toggle='collapse', data-target='#navbarDefault', aria-controls='navbarDefault', aria-expanded='false', aria-label='Toggle navigation')
      span.navbar-toggler-icon
    #navbarDefault.collapse.navbar-collapse
      ul.navbar-nav.mr-auto
        li.nav-item(v-bind:class='{active: active_index === 0}')
          a.nav-link(href='/itemsync') Home
        li.nav-item(v-bind:class='{active: active_index === 1}')
          a.nav-link(href='/itemsync/public') Public channels
        li.nav-item(v-bind:class='{active: active_index === 2}')
          a.nav-link(href='/itemsync/private', v-bind:class='{disabled: !user}') Accessible channels
        li.nav-item(v-bind:class='{active: active_index === 3}')
          a.nav-link(href='/itemsync/create') Create channel
        li.dropdown(v-if='user')
          img.dropdown-toggle.nav-link(:src='user && user.photoURL', width='40', height='40', class='rounded-circle d-inline-block align-top' data-toggle='dropdown', aria-expanded='false', href='#') 
          .dropdown-menu(role='menu')
            a.dropdown-item {{ user.displayName }}
            a.dropdown-item {{ user.uid }}
            a.dropdown-item(role='presentation', v-on:click='onLogout') logout
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
  
@Component({
    props: {
        active_index: Number,
        user: Object
    }
})
export default class AddItemComponent extends Vue {
    private logout() {
        this.$emit('logout-event');
    }

    onLogout() {
        console.log('logout button')
        this.logout();
    }
}
</script>