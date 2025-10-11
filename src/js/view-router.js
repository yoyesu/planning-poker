import Room from "./components/Room.vue";
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import CreateRoom from "./components/CreateRoom.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/room/:roomId', component: Room },
    { path: '/create-room', component: CreateRoom }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});