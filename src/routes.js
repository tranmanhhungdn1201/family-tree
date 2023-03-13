import { createRouter, createWebHistory } from 'vue-router'
import Home from "./components/Home.vue";
import FamilyTree from "./components/FamilyTree.vue";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
        },
        {
            path: '/family-tree',
            component: FamilyTree
        }
    ],
})
