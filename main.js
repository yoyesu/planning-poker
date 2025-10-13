import { createApp } from 'vue'
import {router} from "./src/js/view-router.js";

import App from './src/components/App.vue'
import Room from "./src/components/Room.vue";
import CreateRoom from "./src/components/CreateRoom.vue";
import CardsDeck from "./src/components/CardsDeck.vue";
import PokerTable from "./src/components/PokerTable.vue";
import Home from "./src/components/Home.vue";
import Nav from "./src/components/Nav.vue";

const app = createApp(App);
app.use(router);
app.component('room-item', Room)
app.component('create-room-item', CreateRoom)
app.component('cards-deck-item', CardsDeck)
app.component('poker-table-item', PokerTable)
app.component('home-item', Home)
app.component('nav-item', Nav)
app.mount('#app');
