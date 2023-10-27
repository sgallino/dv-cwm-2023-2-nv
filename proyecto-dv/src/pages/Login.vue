<!-- <script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';

export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput },
    // emits: ['login'],
    data() {
        return {
            loginLoading: false,
            form: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        doLogin() {
            this.loginLoading = true;

            login({
                // email: this.form.email,
                // password: this.form.password,
                ...this.form,
            })
                .then(user => {
                    // console.log('[Login.vue] User: ', user)
                    // this.$emit('login', {...user});
                    this.$router.push('/chat');
                })
                .finally(() => {
                    this.loginLoading = false;
                });
        }
    }
}
</script> -->
<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

// Obtenemos el objeto de router, con la función de composición useRouter de vue Router.
const router = useRouter();

// Definimos los datos del state del componente. Para definir una "referencia reactiva" o "variable
// reactiva" usamos la función de Vue ref().
const loginLoading = ref(false);
const form = ref({
    email: '',
    password: '',
});

const doLogin = async () => {
    try {
        // Noten que para acceder a los valores de cada referencia reactiva en el <script> tenemos que usar
        // .value
        loginLoading.value = true;
        await login({
            ...form.value,
        });
        
        router.push('/chat');
    } catch (error) {
        // TODO: Manejar el mensaje de error :)
    }
    loginLoading.value = false;
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Ingresar a mi Cuenta</h1>

    <form 
        action="#"
        @submit.prevent="doLogin"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                :disabled="loginLoading"
                type="email" 
                id="email"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                :disabled="loginLoading"
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton :loading="loginLoading">Ingresar</BaseButton>
        <!-- <button
            class="w-full p-1.5 rounded bg-blue-700 text-white"
            type="submit"
        >Ingresar</button> -->
    </form>
</template>