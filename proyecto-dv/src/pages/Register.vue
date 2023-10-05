<script>
import BaseButton from '../components/BaseButton.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseLabel from '../components/BaseLabel.vue';
import { register } from '../services/auth';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel, BaseInput },
    data() {
        return {
            registerLoading: false,
            newUser: {
                email: '',
                password: '',
            },
        }
    },
    methods: {
        async handleSubmit() {
            this.registerLoading = true;
            try {
                await register({...this.newUser});
                this.$router.push('/chat');
            } catch (error) {
                // TODO: Manejar el error.
            }
            this.registerLoading = false;
        }
    },
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Crear Cuenta en DV Chat</h1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <BaseInput
                type="email" 
                id="email"
                v-model="newUser.email"
            />
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <BaseInput
                type="password" 
                id="password"
                v-model="newUser.password"
            />
        </div>
        <BaseButton :loading="registerLoading">Crear Cuenta</BaseButton>
    </form>
</template>