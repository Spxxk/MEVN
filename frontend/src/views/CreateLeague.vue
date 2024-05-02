<template>
    <div class="section is-flex is-justify-content-center">
        <h1 class="title">Create New League</h1>
    </div>
    <div class="create-league card" style="margin-bottom: 40px">
        <form @submit.prevent="submitForm">
            <header class="card-header has-background-danger">
                <strong style="padding: 10px; color: black">Create</strong>
            </header>
            <div>
                <label for="name" style="padding-top: 10px">Name</label>
                <input type="text" id="name" v-model="leagueData.name" required>
            </div>
            <div>
                <label for="session">Session</label>
                <input type="text" id="session" v-model="leagueData.session" required>
            </div>
            <div>
                <label for="sport">Sport</label>
                <input type="text" id="sport" v-model="leagueData.sport" required>
            </div>
            <div>
                <label for="division">Division</label>
                <input type="text" id="division" v-model="leagueData.division" required>
            </div>
            <div>
                <label for="details">Details</label>
                <textarea id="details" v-model="leagueData.details"></textarea>
            </div>
            <div>
                <label for="age">Age</label>
                <input type="number" id="age" v-model.number="leagueData.age" required>
            </div>
            <div>
                <label for="teams">Teams</label>
                <input type="text" id="teams" v-model="leagueData.teams" required>
            </div>
            <button type="submit" class="button is-primary">Create League</button>
        </form>
    </div>
</template>

<script>
import axios, { HttpStatusCode } from 'axios';

const API_URL = 'http://localhost:3000';

export default {
    name: 'CreateLeague',
    data() {
        return {
            leagueData: {
                name: '',
                session: '',
                sport: '',
                division: '',
                details: '',
                age: '',
                teams: [],
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                console.log(this.leagueData);
                axios.defaults.withCredentials = true;
                const response = await axios.post(`${API_URL}/league/`, this.leagueData);
                console.log(response);
                this.$router.push('/league');
                if (response.status === HttpStatusCode.Ok && response.data === 'Welcome User to the dashboard!') {
                    alert('Not signed in!');
                } else {
                    alert('Event created successfully!');
                }
            } catch (error) {
                console.error('There was an error creating the league:', error);
                alert('Failed to create league.');
            }
        },
    },
};
</script>

<style scoped>
.create-league {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.create-league h2 {
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
