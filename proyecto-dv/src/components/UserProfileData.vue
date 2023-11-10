<script setup>
defineProps({
    user: {
        type: Object,
        required: true,
    }
});
</script>

<template>
    <div class="flex gap-4">
        <div class="w-2/12">
            <img 
                v-if="user.photoURL != null"
                class="max-w-full"
                alt=""
                :src="user.photoURL" 
            >
            <p v-else>Acá iría una imagen de "no hay imagen".</p>
        </div>
        <dl class="w-10/12 mb-4">
            <dt class="mb-1 font-bold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
            <dt class="mb-1 font-bold">Nombre de Usuario</dt>
            <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
            <dt class="mb-1 font-bold">Carrera</dt>
            <dd class="mb-2">{{ user.career || 'No especificada' }}</dd>
        </dl>
    </div>
</template>