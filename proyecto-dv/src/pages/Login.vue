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
import LoginForm from '../components/LoginForm.vue';
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Ingresar a mi Cuenta</h1>

    <LoginForm />
</template>