<!-- <script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat.js";
import { dateToString } from '../helpers/date.js';
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import Loader from "../components/Loader.vue";
import { subscribeToAuth } from "../services/auth";

export default {
    name: "Chat",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            messagesLoading: true,
            messages: [],
            newMessageSaving: false,
            newMessage: {
                message: '',
            },
            user: {
                id: null,
                email: null,
            },
            unsubscribeChat: () => {},
            unsubscribeAuth: () => {},
        };
    },
    methods: {
        sendMessage() {
            if(this.newMessageSaving) return;

            this.newMessageSaving = true;
            chatSaveMessage({
                userId: this.user.id,
                user: this.user.email,
                message: this.newMessage.message,
                // ...this.newMessage // Podríamos haberlo escrito así, también.
            })
                .then(() => {
                    this.newMessage.message = '';
                    this.newMessageSaving = false;
                });
        },

        formatDate(date) {
            return dateToString(date);
        }
    },
    mounted() {
        this.messagesLoading = true;
        this.unsubscribeChat = chatSubscribeToMessages(messages => {
            this.messages = messages;
            this.messagesLoading = false;
        });
        this.unsubscribeAuth = subscribeToAuth(newUser => this.user = {...newUser});
    },
    unmounted() {
        this.unsubscribeChat();
        this.unsubscribeAuth();
    }
};
</script> -->
<script setup>
import { chatSubscribeToMessages, chatSaveMessage } from "../services/chat.js";
import { dateToString } from '../helpers/date.js';
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import Loader from "../components/Loader.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useAuth } from './../composition/useAuth';

const { user } = useAuth();
const { messages, messagesLoading } = useChatMessages();
const { newMessage, newMessageSaving, sendMessage } = useChatForm(user);

function useChatMessages() {
    const messages = ref([]);
    const messagesLoading = ref(true);

    let unsubscribeChat;

    onMounted(() => {
        messagesLoading.value = true;
        unsubscribeChat = chatSubscribeToMessages(newMessages => {
            messages.value = newMessages;
            messagesLoading.value = false;
        });
    });
    onUnmounted(() => unsubscribeChat());

    return {
        messages,
        messagesLoading,
    }
}

function useChatForm(user) {
    const newMessage = ref({
        message: '',
    });
    const newMessageSaving = ref(false);

    async function sendMessage() {
        if(newMessageSaving.value) return;

        newMessageSaving.value = true;
        await chatSaveMessage({
            userId: user.value.id,
            user: user.value.email,
            message: newMessage.value.message,
            // ...newMessage.value // Podríamos haberlo escrito así, también.
        });
        newMessage.value.message = '';
        newMessageSaving.value = false;
    }

    return {
        newMessage,
        newMessageSaving,
        sendMessage,
    }
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Intro a Firestore</h1>

    <p class="mb-3">Leyendo los mensajes del chat, ahora en tiempo real</p>

    <div class="flex justify-between gap-4">
        <div>
            <template v-if="!messagesLoading">
                <div 
                    v-for="message in messages"
                    :key="message.id"
                    class="mb-2"
                >
                    <div>
                        <b>Usuario:</b> 
                        <router-link 
                            :to="`/usuario/${message.userId}`" 
                            class="ml-1 text-blue-600 underline"
                        >
                            {{ message.user }}
                        </router-link>
                    </div>
                    <div><b>Mensaje:</b> {{ message.message }}</div>
                    <div class="text-right">{{ dateToString(message.created_at) || 'Enviando...' }}</div>
                </div>
            </template>
            <template v-else>
                <Loader />
            </template>
        </div>

        <form
            action="#"
            @submit.prevent="sendMessage"
        >
            <div class="mb-3">
                <div class="font-bold">Usuario</div>
                <div>{{ user.email }}</div>
            </div>
            <div class="mb-3">
                <BaseLabel for="message">Mensaje</BaseLabel>
                <BaseTextarea
                    id="message"
                    v-model="newMessage.message"
                ></BaseTextarea>
            </div>
            <BaseButton
                :loading="newMessageSaving"
            />
            <!-- <button 
                class="w-full p-1.5 rounded bg-blue-700 text-white"
                type="submit"
            >Enviar</button> -->
        </form>
    </div>
</template>
