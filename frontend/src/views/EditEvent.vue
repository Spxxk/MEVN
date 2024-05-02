<template>
    <div class="section is-flex is-justify-content-center">
        <h1 class="title">Edit Event</h1>
    </div>
    <div class="create-event card" style="padding-bottom: 40px">
        <form @submit.prevent="submitForm">
            <header class="card-header has-background-danger">
                <strong style="padding: 10px; color: black">Edit</strong>
            </header>
            <div>
                <label for="game">Event name</label>
                <input type="text" id="game" v-model="eventData.game" :placeholder="eventData.game" readonly>
            </div>
            <div>
                <label for="type">Event Type</label>
                <div class="control">
                    <div class="select is-fullwidth">
                        <select id="type" v-model="eventData.type" required>
                            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <label for="location" style="padding-top: 10px">Location</label>
                <input type="text" id="location" v-model="eventData.location" :placeholder="eventData.location"
                    required>
            </div>
            <div>
                <label for="latitude">Latitude</label>
                <input type="number" id="latitude" step="0.0001" v-model.number="eventData.latitude"
                    :placeholder="eventData.latitude" required>
            </div>
            <div>
                <label for="longitude">Longitude</label>
                <input type="number" id="longitude" step="0.0001" v-model.number="eventData.longitude"
                    :placeholder="eventData.longitude" required>
            </div>
            <div>
                <label for="date">Date</label>
                <input type="datetime-local" id="date" v-model="eventData.date" :placeholder="formattedDate">
            </div>
            <div>
                <label for="description">Description</label>
                <textarea id="description" v-model="eventData.description"
                    :placeholder="eventData.description"></textarea>
            </div>
            <div>
                <label for="team1">Team 1</label>
                <input type="text" id="team1" v-model="eventData.team1" :placeholder="eventData.team1" required>
            </div>
            <div>
                <label for="team2">Team 2</label>
                <input type="text" id="team2" v-model="eventData.team2" :placeholder="eventData.team2" required>
            </div>
            <div>
                <label for="league" class="label">League</label>
                <div class="control">
                    <div class="select is-fullwidth">
                        <select id="league" v-model="eventData.league" required>
                            <option v-for="league in leagues" :key="league.name" :value="league.name">{{ league.name }}</option>
                        </select>
                    </div>
                </div>  
            </div>
            <button type="submit" class="button is-primary">Edit Event</button>
        </form>
    </div>
</template>

<script>
import axios, { HttpStatusCode } from 'axios';

const API_URL = 'http://localhost:3000';

export default {
    name: 'EditEvent',
    data() {
        return {
            eventData: {
                type: '',
                location: '',
                longitude: null,
                latitude: null,
                date: '',
                description: '',
                game: '',
                team1: '',
                team2: '',
                league: '',
            },
            options: ['Game', 'Practice'],
        };
    },
    async mounted() {
        this.fetchLeagues();
        try {
            const response = await axios.get(`${API_URL}/event/${this.$route.params.game}/`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("response:", response);
            this.eventData = response.data[0]; // Assign response data directly to eventData

        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    },
    computed: {
        formattedDate() {
            return this.eventData.date ? new Date(this.eventData.date).toISOString().split('T')[0] : '';
        }
    },
    methods: {
        async fetchLeagues() {
            try {
                const response = await axios.get(`${API_URL}/league/all`);
                this.leagues = response.data; // Assuming response.data is an array of league objects
            } catch (error) {
                console.error('Error fetching leagues:', error);
            }
        },
        async submitForm() {
            try {
                axios.defaults.withCredentials = true;
                console.log(this.eventData);
                const response = await axios.put(`${API_URL}/event/${this.eventData.game}`, this.eventData);
                console.log(response);
                this.$router.push('/');
                if (response.status === HttpStatusCode.Ok && response.data === 'Welcome User to the dashboard!') {
                    alert('Not signed in!');
                } else {
                    alert('Event edit successfully!');
                }
            } catch (error) {
                console.error('There was an error creating the event:', error);
                alert('Failed to create event.');
            }
        },
        isLoggedIn() {

            // Access the isLoggedIn state from Vuex store or local component state
            return this.$store.state.user.isLoggedIn; // Example for Vuex
        },
        username() {
            // Optionally, you can display the username if available
            return this.$store.state.user.username; // Example for Vuex
        }
    },
};
</script>

<style scoped>
.create-event {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create-event h2 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

form>div {
    margin-bottom: 15px;
}

label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
}

input[type="text"],
input[type="number"],
input[type="date"],
textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

textarea {
    resize: vertical;
    height: 100px;
}
</style>
