<template>
    <div>
        <div class="section">
            <h1 class="title">Leagues List</h1>
        </div>
        <div class="card" style="margin: 20px; margin-top: 0px">
            <table class="table">
                <thead>
                    <tr>
                        <th class="has-background-danger">League</th>
                        <th class="has-background-danger">Session</th>
                        <th class="has-background-danger">Sport</th>
                        <th class="has-background-danger">Division</th>
                        <th class="has-background-danger">Age</th>
                        <th class="has-background-danger" v-if="this.$store.state.user.isLoggedIn"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(league, index) in leagues" :key="index">
                        <td><a :href="'/league_detail/' + league.name">{{ league.name }}</a></td>
                        <td>{{ league.session }}</td>
                        <td>{{ league.sport }}</td>
                        <td>{{ league.division }}</td>
                        <td>{{ league.age }}</td>
                        <td v-if="this.$store.state.user.isLoggedIn"><button @click="deleteLeague(league.name)" class="button is-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://localhost:3000';

export default {
    name: 'LeaguesList',
    data() {
        return {
            leagues: []
        };
    },
    async created() {
        try {
            const response = await axios.get(`${API_URL}/league/all/`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log(response.data);
            this.leagues = response.data;
        } catch (error) {
            console.error('Error fetching leagues:', error);
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toDateString();
        },
        async deleteLeague(league) {
            console.log(league);
            let urll = `${API_URL}/league/${league}/`;
            console.log(urll);
            try {
                const response = await axios.delete(urll);
                console.log(response);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
            location.reload();
        }
    }
};
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

a {
  color: #0000ee;
  cursor: pointer;
}
</style>