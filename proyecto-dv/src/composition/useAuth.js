import { ref, onMounted, onUnmounted } from 'vue';
import { subscribeToAuth } from './../services/auth';

export function useAuth() {
    const user = ref({
        id: null,
        email: null,
    });
    let unsubscribeAuth;

    onMounted(() => {
        unsubscribeAuth = subscribeToAuth(newUser => user.value = {...newUser})
    });

    onUnmounted(() => unsubscribeAuth());

    return {
        user,
    }
}