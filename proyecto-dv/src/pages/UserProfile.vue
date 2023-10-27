<!-- <script>
import Loader from '../components/Loader.vue';
import { getUserProfileById } from '../services/user';

export default {
    name: 'UserProfile',
    components: { Loader },
    data() {
        return {
            userLoading: true,
            user: {
                id: null,
                email: null,
            }
        };
    },
    async mounted() {
        this.userLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.userLoading = false;
    },
}
</script> -->
<script setup>
import { onMounted, ref } from 'vue';
import Loader from '../components/Loader.vue';
import { getUserProfileById } from '../services/user';
import { useRoute } from 'vue-router';

const route = useRoute();

const userLoading = ref(true);
const user = ref({
    id: null,
    email: null,
});

onMounted(async () => {
    userLoading.value = true;
    user.value = await getUserProfileById(route.params.id);
    userLoading.value = false;
});
</script>

<template>
    <Loader     v-if="userLoading" />
    <template   v-else>
        <h1 class="mb-4 font-bold text-3xl">Perfil de {{ user.email }}</h1>

        <hr class="mb-4" />

        <h2 class="mb-2 text-xl">Conversación privada</h2>

        <router-link 
            :to="`/usuario/${user.id}/chat`"
            class="text-blue-600 underline"
        >Iniciar una conversación privada con {{ user.email }}</router-link>
    </template>
</template>