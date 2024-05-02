<template>
    <div class="home">
        <div class="section">
            <h1 class="title">Leagues Details</h1>
        </div>
        <div v-if="league" class="league-details card">
            <header class="card-header has-background-danger" style="padding: 10px">
                <strong style="color: black" class="value">{{ league.name }}</strong>
            </header>
            <div class="detail is-flex-direction-column">
                <strong>Session   </strong>
                <span>{{ league.session }}</span>
            </div>
            <div class="detail is-flex-direction-column">
                <strong>Sport   </strong>
                <span>{{ league.sport }}</span>
            </div>
            <div class="detail is-flex-direction-column">
                <strong>Division    </strong>
                <span>{{ league.division }}</span>
            </div>
            <div class="detail is-flex-direction-column">
                <strong>Details   </strong>
                <span>{{ league.details }}</span>
            </div>
            <div class="detail is-flex-direction-column">
                <strong>Age    </strong>
                <span>{{ league.age }}</span>
            </div>
            <div class="detail is-flex-direction-column">
                <strong>Teams   </strong>
                <span>{{ league.teams.join(', ') }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://localhost:3000';

export default {
    name: 'EventDetailView',
    data() {
        return { league: null }
    },
    async mounted() {
        try {
            const response = await axios.get(`${API_URL}/league/${this.$route.params.league}/`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("response:", response.data[0]);
            this.league = response.data[0];
        } catch (error) {
            console.error('Error fetching games:', error);
        }
    },
}
</script>

<style>
.home {
    text-align: center;
}

.league-details {
    margin: 20px auto;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 40%;
    background-color: #f9f9f9;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.detail {
    margin-bottom: 8px;
}

.detail strong {
    font-weight: bold;
    color: #333;
}

.detail span {
    color: #666;
}

h1 {
    margin-bottom: 20px;
    color: #333;
    font-size: 24px;
}
</style>
