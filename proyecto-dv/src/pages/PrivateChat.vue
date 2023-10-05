<script>
import BaseButton from '../components/BaseButton.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import Loader from '../components/Loader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'PrivateChat',
    components: { Loader, BaseTextarea, BaseButton },
    data() {
        return {
            userLoading: true,
            user: {
                id: null,
                email: null,
            },
        };
    },
    async mounted() {
        this.userLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoading = false;
    },
}
</script>

<template>
    <Loader     v-if="userLoading" />
    <template   v-else>
        <h1 class="mb-4 font-bold text-3xl">Conversación con {{ user.email }}</h1>

        <h2 class="sr-only">Mensajes</h2>
        <div class="min-h-[400px] p-4 border border-gray-300 rounded mb-4">
            <!-- TODO -->
        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form 
            class="flex gap-2"
            action=""
            @submit.prevent="() => {}"
        >
            <label for="message" class="sr-only">Mensaje</label>
            <BaseTextarea
                id="message"
                class="w-11/12"
            />
            <BaseButton class="w-1/12">Enviar</BaseButton>
        </form>
    </template>
</template>