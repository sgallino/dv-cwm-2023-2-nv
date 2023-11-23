<!-- <script>
import Chat from './pages/Chat.vue';
import { subscribeToAuth, logout } from './services/auth.js';

export default {
    name: "App",
    components: { Chat },
    data() {
        return {
            user: {
                id: null,
                email: null,
            }
        }
    },
    methods: {
        handleLogout() {
            logout();
            this.$router.push('/iniciar-sesion');
        }
    },
    mounted() {
        subscribeToAuth(user => {
            this.user = {...user};
        });
    },
};
</script> -->
<script setup>
import { provide, readonly, ref } from 'vue';
import { useRouter } from 'vue-router';
import { logout } from './services/auth.js';
import { useAuth } from './composition/useAuth';
import { notificationSymbol } from './symbols/symbols';

const notification = ref({
    message: null,
    type: 'success',
});

function setNotification(data) {
    notification.value = data;
}

// Definimos el contenido que queremos proveer a cualquiera de los descendientes de este componente.
provide(notificationSymbol, {
    notification: readonly(notification),
    setNotification,
    setSuccessMessage: message => setNotification({message, type: 'success'}),
    setErrorMessage: message => setNotification({message, type: 'error'}),
});

const { handleLogout } = useLogout();
const { user } = useAuth();

function useLogout() {
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/iniciar-sesion');
    }

    return {
        handleLogout,
    }
}
</script>

<template>
    <header class="flex gap-8 items-center p-4 bg-slate-100">
        <div>
            <p class="text-2xl">DV Chat</p>
        </div>
        <nav>
            <ul class="flex gap-4">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/quienes-somos">Quiénes Somos</router-link>
                </li>
                
                <template v-if="user.id === null">
                    <li>
                        <router-link to="/registro">Registro</router-link>
                    </li>
                    <li>
                        <router-link to="/iniciar-sesion">Iniciar Sesión</router-link>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <router-link to="/blog">Blog</router-link>
                    </li>
                    <li>
                        <router-link to="/chat">Chat</router-link>
                    </li>
                    <li>
                        <router-link to="/perfil">Mi Perfil</router-link>
                    </li>
                    <li>
                        <form 
                            action="#"
                            @submit.prevent="handleLogout"
                        >
                            <button type="submit"><b>{{ user.email }}</b> (Cerrar Sesión)</button>
                        </form>
                    </li>
                </template>
            </ul>
        </nav>
    </header>

    <!--
    Acá va a venir el renderizado de las rutas cuando agreguemos Vue Router.
    Mientras tanto, vamos a renderizar la "vista" del Chat.
    -->
    <div class="container h-full m-auto p-4">
        <div
            v-if="notification.message != null"
            class="p-4 border rounded mb-4"
            :class="{
                'border-green-700': notification.type == 'success',
                'text-green-700': notification.type == 'success',
                'bg-green-100': notification.type == 'success',
                'border-red-700': notification.type == 'error',
                'text-red-700': notification.type == 'error',
                'bg-red-100': notification.type == 'error',
            }"
        >
            {{ notification.message }}
        </div>
        
        <router-view></router-view>
    </div>

    <footer class="flex justify-center items-center h-[100px] bg-slate-800 text-white">
        <p>Da Vinci &copy; 2023</p>
    </footer>
</template>

