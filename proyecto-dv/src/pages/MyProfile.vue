<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { useAuth } from '../composition/useAuth';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { editProfile } from '../services/auth';

const { user } = useAuth();
const {
    editData,
    editing,
    editingLoading,
    handleEditShow,
    handleEditCancel,
    handleEditForm,
} = useProfileEdit(user);

const {
    editingAvatar,
    editingAvatarLoading,
    avatarData,
    handleAvatarFormCancel,
    handleAvatarFormShow,
    handleAvatarFormSubmit,
} = useAvatarEdit();

function useProfileEdit(user) {
    const editing = ref(false);
    const editingLoading = ref(false);
    const editData = ref({
        displayName: '',
        career: '',
    });

    const handleEditShow = () => {
        editData.value.displayName = user.value.displayName;
        editData.value.career = user.value.career;
        editing.value = true;
    }

    const handleEditCancel = () => editing.value = false;

    const handleEditForm = async () => {
        try {
            editingLoading.value = true;
            await editProfile({
                displayName: editData.value.displayName,
                career: editData.value.career,
            });
        } catch (error) {
            // TODO: Notificación de error.
        }
        editingLoading.value = false;
    }

    return {
        editData,
        editing,
        editingLoading,
        handleEditShow,
        handleEditCancel,
        handleEditForm,
    }
}

function useAvatarEdit() {
    const editingAvatar = ref(false);
    const editingAvatarLoading = ref(false);
    const avatarData = ref({
        file: null,
        preview: null,
    });

    const handleAvatarFormShow = () => editingAvatar.value = true;

    const handleAvatarFormCancel = () => editingAvatar.value = false;

    const handleAvatarFormSubmit = async () => {

    }

    return {
        editingAvatar,
        editingAvatarLoading,
        avatarData,
        handleAvatarFormCancel,
        handleAvatarFormShow,
        handleAvatarFormSubmit,
    }
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Mi Perfil</h1>

    <template v-if="!editing && !editingAvatar">
        <dl class="mb-4">
            <dt class="mb-1 font-bold">Email</dt>
            <dd class="mb-2">{{ user.email }}</dd>
            <dt class="mb-1 font-bold">Nombre de Usuario</dt>
            <dd class="mb-2">{{ user.displayName || 'No especificado' }}</dd>
            <dt class="mb-1 font-bold">Carrera</dt>
            <dd class="mb-2">{{ user.career || 'No especificada' }}</dd>
        </dl>
        
        <hr class="mb-4">

        <BaseButton
            class="mb-2"
            @click="handleEditShow"
        >Editar mi Datos</BaseButton>
        <BaseButton
            @click="handleAvatarFormShow"
        >Editar mi Imagen de Perfil</BaseButton>
    </template>
    <template v-else-if="editing">
        <form 
            action="#"
            method="post"
            @submit.prevent="handleEditForm"
        >
            <div class="mb-2">
                <BaseLabel for="displayName">Nombre de Usuario</BaseLabel>
                <BaseInput
                    id="displayName"
                    :disabled="editingLoading"
                    v-model="editData.displayName"
                />
            </div>
            <div class="mb-2">
                <BaseLabel for="career">Carrera</BaseLabel>
                <BaseInput
                    id="career"
                    :disabled="editingLoading"
                    v-model="editData.career"
                />
            </div>

            <BaseButton
                class="mb-4"
                :loading="editingLoading"
            >Actualizar mis Datos</BaseButton>
        </form>

        <hr class="mb-4">

        <BaseButton
            @click="handleEditCancel"
        >Cancelar</BaseButton>
    </template>
    <template v-else>
        <form 
            action="#"
            method="post"
            @submit.prevent="handleAvatarFormSubmit"
        >
            <div class="mb-2">
                <BaseLabel for="newAvatar">Imagen de Perfil</BaseLabel>
                <!-- TODO: Completar el upload de la imagen con su previsualización :D -->
                <BaseInput 
                    type="file"
                    id="newAvatar"
                    :disabled="editingAvatarLoading"
                />
            </div>

            <BaseButton
                class="mb-4"
                :loading="editingAvatarLoading"
            >Actualizar mi Imagen de Perfil</BaseButton>

            <hr class="mb-4">

            <BaseButton
                @click="handleAvatarFormCancel"
            >Cancelar</BaseButton>
        </form>
    </template>
</template>