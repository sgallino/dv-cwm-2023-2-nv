// Vamos a definir los detalles de nuestro Router de Vue.
import Home from './../pages/Home.vue';
import About from './../pages/About.vue';
import Blog from './../pages/Blog.vue';
import BlogPublish from './../pages/BlogPublish.vue';
import Chat from './../pages/Chat.vue';
import Register from './../pages/Register.vue';
import Login from './../pages/Login.vue';
import MyProfile from './../pages/MyProfile.vue';
import UserProfile from './../pages/UserProfile.vue';
import PrivateChat from './../pages/PrivateChat.vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { subscribeToAuth } from '../services/auth';

// Primero definimos la lista de rutas.
const routes = [
    { path: '/',                    component: Home },
    { path: '/quienes-somos',       component: About },
    { path: '/registro',            component: Register },
    { path: '/iniciar-sesion',      component: Login },
    { path: '/blog',                component: Blog,            meta: { requiresAuth: true }, },
    { path: '/blog/publicar',       component: BlogPublish,     meta: { requiresAuth: true }, },
    { path: '/chat',                component: Chat,            meta: { requiresAuth: true }, },
    { path: '/perfil',              component: MyProfile,       meta: { requiresAuth: true }, },
    { path: '/usuario/:id',         component: UserProfile,     meta: { requiresAuth: true }, },
    { path: '/usuario/:id/chat',    component: PrivateChat,     meta: { requiresAuth: true }, },
];

// Creamos el router, pasándole las rutas y el administrador de historia de navegación.
const router = createRouter({
    routes,
    history: createWebHashHistory(),
});

let user = {
    id: null,
    email: null,
}

subscribeToAuth(newUser => user = newUser);

// Agregamos la protección a las rutas.
router.beforeEach((to, from) => {
    if(user.id === null && to.meta.requiresAuth) {
        return '/iniciar-sesion';
        // return {
        //     path: '/iniciar-sesion',
        // }
    }
});

export default router;