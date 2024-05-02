<template>
    <div class="home">
        <div class="section">
            <h1 class="title">Location</h1>
        </div>
        <div id="map" style="height: 500px; width: 90%; margin: 5%"></div>
    </div>
</template>

<script>
import axios from 'axios';
const API_URL = 'http://localhost:3000';


export default {
    name: 'EventDetailView',
    data() {
        return { lat: 43.6532, lng: -79.3832 }
    },
    async mounted() {
        try {
            const response = await axios.get(`${API_URL}/event/${this.$route.params.game}/`, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            console.log("response:", response);
            this.lat = response.data[0]["latitude"];
            this.lng = response.data[0]["longitude"];
            if (!window.google) {
                console.log("loding map");
                this.loadMap();
            } else {
                // console.log("jh test: ", response.data[0], lat);
                console.log("init maps");
                this.initMap();
            }
            

        } catch (error) {
            console.error('Error fetching games:', error);
        }
    },
    methods: {
        loadMap() {
            window.initMap = this.initMap.bind(this);
            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyC1J8rbjY3B-Y-dzoWU7jl6hAW4jAh-yRk&callback=initMap`;
            script.async = true;
            script.defer = true; // Add defer attribute for better script loading
            document.head.appendChild(script);
        },
        initMap() {
            let lati = this.lat;
            let lngi = this.lng;
            if (window.google) {
                console.log("lati: ", lati);
                console.log("lngi: ", lngi);
                this.map = new window.google.maps.Map(document.getElementById('map'), {
                    center: { lat: lati, lng: lngi }, // Toronto coordinates
                    zoom: 14,
                });

                // Create a marker and set its position
                this.marker = new window.google.maps.Marker({
                    position: { lat: lati, lng: lngi }, // Toronto coordinates
                    map: this.map,
                    title: 'Toronto', // Optional title for the marker
                });
            } else {
                console.error('Google Maps API failed to load.');
            }
        },
    },
}
</script>

<style></style>
