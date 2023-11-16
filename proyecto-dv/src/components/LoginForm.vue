<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import { notificationSymbol } from '../symbols/symbols';

const { setNotification } = inject(notificationSymbol);

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

        setNotification({
            message: '¡Hola de nuevo!',
            type: 'success'
        });
        
        router.push('/perfil');
    } catch (error) {
        setNotification({
            message: error,
            type: 'error'
        });
    }
    loginLoading.value = false;
}
</script>

<template>
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