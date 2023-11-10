import { onMounted, ref } from "vue";
import { getUserProfileById } from "../services/user";

export function useUserProfile(id) {
    const userLoading = ref(true);
    const user = ref({
        id: null,
        email: null,
        displayName: null,
        career: null,
        photoURL: null,
    });

    onMounted(async () => {
        userLoading.value = true;
        user.value = await getUserProfileById(id);
        userLoading.value = false;
    });

    return {
        user,
        userLoading,
    }
}