import { createApp } from 'vue'
import {router} from "./view-router.js";

import App from '../App.vue'
import Room from "./components/Room.vue";
import CreateRoom from "./components/CreateRoom.vue";
import NameForm from "./components/NameForm.vue";
import CardsDeck from "./components/CardsDeck.vue";
import PokerTable from "./components/PokerTable.vue";
import Home from "./components/Home.vue";

const app = createApp(App);
app.use(router);
app.component('room-item', Room)
app.component('create-room-item', CreateRoom)
app.component('name-form-item', NameForm)
app.component('cards-deck-item', CardsDeck)
app.component('poker-table-item', PokerTable)
app.component('home-item', Home)
app.mount('#app');
