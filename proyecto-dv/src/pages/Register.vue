<script>
import BaseButton from '../components/BaseButton.vue';
import BaseLabel from '../components/BaseLabel.vue';

export default {
    name: 'Register',
    components: { BaseButton, BaseLabel }
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Crear Cuenta en DV Chat</h1>

    <form action="#">
        <div class="mb-3">
            <BaseLabel for="email">Email</BaseLabel>
            <input
                class="w-full px-1.5 py-1 border border-gray-400 rounded"
                type="email" 
                id="email"
            >
        </div>
        <div class="mb-3">
            <BaseLabel for="password">Contraseña</BaseLabel>
            <input
                class="w-full px-1.5 py-1 border border-gray-400 rounded"
                type="password" 
                id="password"
            >
        </div>
        <BaseButton>Crear Cuenta</BaseButton>
        <!-- <button 
            class="w-full p-1.5 rounded bg-blue-700 text-white"
            type="submit"
        >Crear Cuenta</button> -->
    </form>
</template>