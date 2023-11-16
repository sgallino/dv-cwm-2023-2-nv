<script setup>
import ProfileImage from './ProfileImage.vue';

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
            <ProfileImage :src="user.photoURL" />
            <!-- <Image
                class="max-w-full"
                :src="user.photoURL"
                alt=""
                :default="noImage"
            /> -->
            <!-- <img 
                v-if="user.photoURL != null"
                class="max-w-full"
                alt=""
                :src="user.photoURL" 
            >
            <img 
                v-else
                class="max-w-full"
                :src="noImage"
                alt="No tiene imagen de perfil"
            > -->
            <!-- <img 
                v-else
                class="max-w-full"
                src="/no-image.jpg"
                alt="No tiene imagen de perfil"
            > -->
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