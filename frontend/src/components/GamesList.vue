<template>
  <div>
    <div class="section">
      <h1 class="title">Events List</h1>
    </div>
    <div>
      <div class="card" style="margin: 20px">
        <header class="card-header" style="background-color: #e32363;">
          <p class="card-header-title">Filter</p>
        </header>
        <div class="card-content is-flex is-justify-content-left is-flex-direction-column">
          <div class="content">
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label for="filterLeague" class="label">Filter by League</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="select is-fullwidth">
                      <select id="filterLeague" v-model="selectedLeague">
                        <option value="">All</option>
                        <option v-for="league in leagues" :key="league">{{ league }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label for="filterText" class="label">Filter by Event</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input" id="filterText" type="text" v-model="filterText" placeholder="Search...">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="margin: 20px;">
      <table class="table">
        <!-- Table headers -->
        <thead>
          <tr>
            <th class="has-background-danger">Event</th>
            <th class="has-background-danger">Type</th>
            <th class="has-background-danger">Location</th>
            <th class="has-background-danger">Date</th>
            <th class="has-background-danger">Description</th>
            <th class="has-background-danger">Team 1</th>
            <th class="has-background-danger">Team 2</th>
            <th class="has-background-danger">League</th>
            <th class="has-background-danger"></th>
            <th class="has-background-danger" v-if="this.$store.state.user.isLoggedIn"></th>
            <th class="has-background-danger" v-if="this.$store.state.user.isLoggedIn"></th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <tr v-for="(game, index) in filteredGames" :key="index">
            <td><a :href="'/event/' + game.game">{{ game.game }}</a></td>
            <td>{{ game.type }}</td>
            <td>{{ game.location }}</td>
            <td>{{ new Date(game.date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit',
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
              timeZone: 'America/New_York'
            })}}</td>
            <td>{{ game.description }}</td>
            <td>{{ game.team1 }}</td>
            <td>{{ game.team2 }}</td>
            <td>{{ game.league }}</td>
            <td>
              <a :href="'/notification/' + game.game" class="button is-danger is-small" style="text-decoration: none">Reminder</a>
            </td>
            <td v-if="this.$store.state.user.isLoggedIn">
              <a @click="editEvent(game.game)" class="button is-primary is-small" style="text-decoration: none">Edit</a>
            </td>
            <td v-if="this.$store.state.user.isLoggedIn">
              <a @click="deleteEvent(game.game)" class="button is-danger is-small" style="text-decoration: none">Delete</a>
            </td>
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
  name: 'GamesList',
  data() {
    return {
      games: [],
      filterText: '',
      selectedLeague: '',
      leagues: [] // Add a property to store the list of leagues
    };
  },
  async created() {
    try {
      const response = await axios.get(`${API_URL}/event/all/`, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      this.games = response.data;
      this.extractLeagues(); // Call method to extract leagues from games data
    } catch (error) {
      console.error('Error fetching games:', error);
    }
  },
  computed: {
    filteredGames() {
      let filtered = this.games;
      if (this.selectedLeague) {
        filtered = filtered.filter(game => game.league === this.selectedLeague);
      }
      if (this.filterText) {
        filtered = filtered.filter(game =>
          game.game.toLowerCase().includes(this.filterText.toLowerCase())
        );
      }
      return filtered;
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toDateString();
    },
    async deleteEvent(game) {
      console.log(game);
      let urll = `${API_URL}/event/${game}/`;
      console.log(urll);
      try {
        const response = await axios.delete(urll);
        console.log(response);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
      location.reload();
    },
    async editEvent(game) {
      this.$router.push(`/edit_event/${game}`);
    },
    extractLeagues() {
      // Extract unique league names from games data
      this.leagues = Array.from(new Set(this.games.map(game => game.league)));
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
