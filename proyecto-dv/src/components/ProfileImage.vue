<script setup>
import Image from './Image.vue';
import noImage from '../assets/no-image.jpg';

defineProps({
    src: {
        required: true,
    },
    alt: {
        type: String,
    }
});
</script>

<template>
    <Image 
        :src="src"
        :alt="alt || ''"
        :default="noImage"
        default-alt="Sin imagen de perfil"
        class="max-w-full"
    />
</template>