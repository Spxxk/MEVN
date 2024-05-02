<template>
  <div class="home">
    <GamesList />
    <button v-if="this.$store.state.user.isLoggedIn" @click="goToCreateEvent" class="button is-primary">Create Event</button>
  </div>
</template>

<script>
// @ is an alias to /src
import GamesList from '@/components/GamesList.vue';

export default {
  name: 'HomeView',
  components: {
    GamesList
  },
  methods: {
    goToCreateEvent() {
      // Updated programmatic navigation to the correct Create Event page
      this.$router.push('/create_event');
    },
  },
}
</script>

<style scoped>
button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>