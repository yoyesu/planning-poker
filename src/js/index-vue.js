import { createApp } from 'vue'
import {router} from "./view-router.js";

import App from '../App.vue'
import Room from "./components/Room.vue";
import CreateRoom from "./components/CreateRoom.vue";
import NameForm from "./components/NameForm.vue";

const app = createApp(App);
app.use(router);
app.component('room-item', Room)
app.component('create-room-item', CreateRoom)
app.component('name-form-item', NameForm)
app.mount('#app');
