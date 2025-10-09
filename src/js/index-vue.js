import { createApp } from 'vue'
import {router} from "./view-router.js";

import App from '../App.vue'
import Room from "./components/Room.vue";

const app = createApp(App);
app.use(router);
app.component('room-item', Room)
app.mount('#app');
