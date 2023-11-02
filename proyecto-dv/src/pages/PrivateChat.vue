<!-- <script>
import BaseButton from '../components/BaseButton.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import Loader from '../components/Loader.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { getUserProfileById } from '../services/user';
import { subscribeToAuth } from '../services/auth';
import { dateToString } from '../helpers/date';

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
            authUser: {
                id: null,
                email: null,
            },
            unsubscribeAuth: () => {},
            newMessage: {
                message: '',
            },
            messagesLoading: true,
            messages: [],
            unsubscribeMessages: () => {},
        };
    },
    methods: {
        handleSendMessage() {
            sendPrivateChatMessage({
                senderId: this.authUser.id,
                receiverId: this.user.id,
                message: this.newMessage.message,
            });
            this.newMessage.message = '';
        },

        formatDate(date) {
            return dateToString(date);
        }
    },
    async mounted() {
        this.userLoading = true;
        this.user = await getUserProfileById(this.$route.params.id);
        this.unsubscribeAuth = subscribeToAuth(newUser => this.authUser = newUser);
        this.userLoading = false;

        this.messagesLoading = true;
        this.unsubscribeMessages = await subscribeToPrivateChat(
            {
                senderId: this.authUser.id, 
                receiverId: this.user.id,
            }, 
            (newMessages) => this.messages = newMessages
        );
        this.messagesLoading = false;
    },
    unmounted() {
        this.unsubscribeAuth();
        this.unsubscribeMessages();
    }
}
</script> -->
<script setup>
import BaseButton from '../components/BaseButton.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import Loader from '../components/Loader.vue';
import { sendPrivateChatMessage, subscribeToPrivateChat } from '../services/private-chat';
import { dateToString } from '../helpers/date';
import { useAuth } from '../composition/useAuth';
import { useUserProfile } from '../composition/useUserProfile';
import { onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const { user: authUser } = useAuth();
const { user, userLoading } = useUserProfile(route.params.id);
const { newMessage, messages, messagesLoading, handleSendMessage } = usePrivateChat(authUser, user);

function usePrivateChat(senderUser, receiverUser) {
    const newMessage = ref({
        message: '',
    });
    const messagesLoading = ref(true);
    const messages = ref([]);
    let unsubscribeMessages = () => {};

    async function handleSendMessage() {
        sendPrivateChatMessage({
            senderId: senderUser.value.id,
            receiverId: receiverUser.value.id,
            message: newMessage.value.message,
        });
        newMessage.value.message = '';
    }

    // Para poder suscribirnos a los mensajes, necesitamos tener los dos usuarios que participan.
    // Uno (el autenticado) ya lo tenemos instantaneamente.
    // El otro puede tener un delay en llegar.
    // Por lo tanto, vamos a setear un watcher que observer el valor de ese usuario, y espere a que tenga
    // cargado su id. Una vez ocurrido eso, ahí seteamos la suscripción a los mensajes.
    watch(receiverUser, async newReceiverUser => {
        if(newReceiverUser.id !== null) {
            unsubscribeMessages = await subscribeToPrivateChat(
                {
                    senderId: senderUser.value.id,
                    receiverId: newReceiverUser.id,
                },
                newMessages => messages.value = newMessages
            );
            messagesLoading.value = false;
        }
    });

    onUnmounted(() => unsubscribeMessages());

    return {
        newMessage,
        messages,
        messagesLoading,
        handleSendMessage,
    }
}
</script>

<template>
    <Loader     v-if="userLoading" />
    <template   v-else>
        <h1 class="mb-4 font-bold text-3xl">Conversación con {{ user.email }}</h1>

        <h2 class="sr-only">Mensajes</h2>
        <div class="flex flex-col items-start min-h-[400px] p-4 border border-gray-300 rounded mb-4">
            <Loader     v-if="messagesLoading" />
            <template   v-else>
                <div 
                    v-for="message in messages"
                    class="max-w-[70%] p-2 rounded mb-2"
                    :class="{
                        'bg-gray-100': message.senderId !== authUser.id,
                        'bg-green-200': message.senderId === authUser.id,
                        'self-end': message.senderId === authUser.id,
                    }"
                    :key="message.id"
                >
                    <div>{{ message.message }}</div>
                    <div class="text-right">{{ dateToString(message.created_at) || 'Enviando...' }}</div>
                </div>
            </template>
        </div>

        <h2 class="sr-only">Enviar mensajes</h2>
        <form 
            class="flex gap-2"
            action="#"
            @submit.prevent="handleSendMessage"
        >
            <label for="message" class="sr-only">Mensaje</label>
            <BaseTextarea
                id="message"
                class="w-11/12"
                v-model="newMessage.message"
            />
            <BaseButton class="w-1/12">Enviar</BaseButton>
        </form>
    </template>
</template>