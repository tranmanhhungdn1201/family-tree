import { createRouter, createWebHistory } from 'vue-router'
import Home from "./components/Home.vue";
import FamilyTree from "./components/FamilyTree.vue";
import Login from "./components/Login.vue";
import History from "./components/History.vue";
import BaseService from "./service.js";

export default createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/family-tree/login',
            component: Login,
            name: 'login',
            beforeEnter: (to, from, next) =>{
                if (BaseService.checkAuth()) {
                    next({
                        name: 'home'
                    });
                }
                next();
            },
            meta: {
                hideNavbar: true,
            }
        },
        {
            path: '/family-tree',
            name: 'home',
            component: Home,
            beforeEnter: (to, from, next) =>{
                if (BaseService.checkAuth()) {
                    next();
                }
                next({
                    name: 'login'
                });
            },
            meta: {
                hideNavbar: false,
            }
        },
        {
            path: '/family-tree/history',
            name: 'history',
            component: History,
            beforeEnter: (to, from, next) =>{
                if (BaseService.checkAuth()) {
                    next();
                }
                next({
                    name: 'login'
                });
            },
            meta: {
                hideNavbar: false,
            }
        },
        {
            path: '/family-tree/family-tree',
            name: 'tree',
            component: FamilyTree,
            beforeEnter: (to, from, next) =>{
                if (BaseService.checkAuth()) {
                    next();
                }
                next({
                    name: 'login'
                });
            },
            meta: {
                hideNavbar: false,
            }
        }
    ],
})
