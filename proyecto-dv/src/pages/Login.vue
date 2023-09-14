<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { login } from '../services/auth.js';

export default {
    name: 'Login',
    components: { BaseButton, BaseLabel, BaseInput },
    emits: ['login'],
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
                    this.$emit('login', {...user});
                })
                .finally(() => {
                    this.loginLoading = false;
                });
        }
    }
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
                type="email" 
                id="email"
                v-model="form.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                v-model="form.password"
            />
        </div>
        <BaseButton>Ingresar</BaseButton>
        <!-- <button
            class="w-full p-1.5 rounded bg-blue-700 text-white"
            type="submit"
        >Ingresar</button> -->
    </form>
</template>