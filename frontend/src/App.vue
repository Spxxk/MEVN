<template>
  <nav class="navbar" role="navigation" aria-label="main navigation" style="background-color: #e32636">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/" style="color: black">Home</router-link>
      <router-link class="navbar-item" to="/league" style="color: black">League</router-link>
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link v-if="!isLoggedIn" class="navbar-item" to="/login" style="color: black">Login</router-link>
        <a v-if="isLoggedIn" class="navbar-item" @click="logout" style="color: black">Log Out</a>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    isLoggedIn() {
      return this.$store.state.user.isLoggedIn;
    },
    username() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    async logout() {
      try {
        await this.$store.dispatch('logoutUser');
        this.$router.push({ name: 'home' });
        location.reload();
      } catch (ex) {
        console.error('Error with logging out: ' + ex);
      }
    }
  }
};
</script>
