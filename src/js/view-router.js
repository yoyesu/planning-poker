import Room from "../components/Room.vue";
import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../components/Home.vue";
import CreateRoom from "../components/CreateRoom.vue";
import AddName from "../components/AddName.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/room/:roomId', component: Room },
    { path: '/create-room', component: CreateRoom },
    { path: '/your-name', component: AddName}
];

export const router = createRouter({
    history: createWebHashHistory('/planning-poker/'),
    routes,
});