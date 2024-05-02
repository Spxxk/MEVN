<template>
    <div class="home">
        <LeaguesList />
        <button v-if="this.$store.state.user.isLoggedIn" @click="goToCreateLeague" class="button is-primary">Create League</button>
    </div>
</template>

<script>
// @ is an alias to /src
import LeaguesList from '@/components/LeagueList.vue';

export default {
    name: 'HomeView',
    components: {
        LeaguesList
    },
    methods: {
        goToCreateLeague() {
            // Updated programmatic navigation to the correct Create League page
            this.$router.push('/create_league');
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