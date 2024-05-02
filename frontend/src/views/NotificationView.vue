<template>
    <div class="section is-flex is-justify-content-center">
        <h1 class="title">Notification</h1>
    </div>
    <div class="create-event card" style="margin-bottom: 40px">
        <header class="card-header has-background-danger">
            <strong style="padding: 10px; color: black">Event Details:</strong>
        </header>
        <header class="card-header has-background-danger">
        <h3 style="padding: 10px; color: black"> game: {{ eventData.res['game'] }}</h3>
        </header>
        <header class="card-header has-background-danger">
        <h3 style="padding: 10px; color: black"> league: {{ eventData.res['league'] }}</h3>
        </header>
        <header class="card-header has-background-danger">
        <h3 style="padding: 10px; color: black"> team1: {{ eventData.res['team1'] }}</h3>
        </header>
        <header class="card-header has-background-danger">
        <h3 style="padding: 10px; color: black"> team2: {{ eventData.res['team2'] }}</h3>
        </header>
        <form @submit.prevent="submitForm">
            <div style="padding-top: 10px">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="eventData.email" required>
            </div>
            <div>
                <label for="date">Date</label>
                <input type="datetime-local" id="date" v-model="eventData.date" required>
            </div>
            <button type="submit" class="button is-primary">Notify Me!</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
// import Datetime from 'datetime-js';
const API_URL = 'http://localhost:3000';

export default {
    name: 'NotificationView',
    data() {
        return {
            eventData: {
                email: '',
                date: '',
                res: ''
            },
        };
    },
    async mounted() {
        try {
            const response = await axios.get(`${API_URL}/event/${this.$route.params.game}/`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("response:", response);
            this.eventData.res = response.data[0];
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    },
    methods: {
        async submitForm() {
            try {
                // create email
                console.log(this.eventData.email);

                console.log(new Date(this.eventData.date).getTime() - Date.now());
                console.log("event date " + this.eventData.date)

                console.log("hi!");
                setTimeout(async () => {
                    axios.defaults.withCredentials = true;
                    await axios.post(`${API_URL}/notify`, this.eventData, {
                        headers: {
                            "Access-Control-Allow-Origin": "*",
                        }
                    });
                }, new Date(this.eventData.date).getTime() - Date.now());
                
                alert("Email scheduled!");
                this.$router.push('/');
            } catch (error) {
                // error
            }
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