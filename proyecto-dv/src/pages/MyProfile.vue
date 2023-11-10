<script setup>
import { ref } from 'vue';
import BaseButton from '../components/BaseButton.vue';
import { useAuth } from '../composition/useAuth';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import { editProfile, editProfileAvatar } from '../services/auth';
import Loader from '../components/Loader.vue';
import UserProfileData from '../components/UserProfileData.vue';

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
    handleAvatarFileChange,
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
        editingAvatarLoading.value = true;

        try {
            await editProfileAvatar(avatarData.value.file);
        } catch (error) {
            console.error("[handleAvatarFormSubmit] Error: ", error);
            // TODO :)
        }
        editingAvatarLoading.value = false;
    }

    const handleAvatarFileChange = event => {
        /*
        Un input de tipo "file" contiene una propiedad "files" que es un FileList (un array, en esencia)
        de objetos File.
        Cada objeto File representa un archivo que haya seleccionado en el campo.
        Tiene algunas propiedades:
        - lastModified: Timestamp de la última modificación.
        - name: Nombre del archivo.
        - size: Peso en bytes.
        - type: Tipo MIME (Multipurpose Internet Mail Extension).
        */
        avatarData.value.file = event.target.files[0];

        /*
        Ahora que tenemos la imagen, nuestro objeto es mostrar una previsualización de la misma en una
        etiqueta <img>.
        Para esto, tenemos que leer el contenido del archivo, con algún formato que <img> reconozca,
        para asginárselo.
        Los archivos en JS los podemos leer usando la API FileReader.
        Esto generalmente requiere de 3 pasos:
        1. Instanciar FileReader.
        2. Configurar el evento "onload" de FileReader con lo que queremos hacer cuando se lea el archivo.
        3. Pedir a FileReader qué archivo queremos leer y con qué formato.
        */
        const reader = new FileReader();

        reader.addEventListener('load', function() {
            // Una vez que el archivo se leyó, vamos a poder obtener el resultado con la propiedad
            // result de la instancia de FileReader.
            // console.log('[handleAvatarFileChange] FileReader result: ', reader.result);
            avatarData.value.preview = reader.result;
        });

        reader.readAsDataURL(avatarData.value.file);
    }

    return {
        editingAvatar,
        editingAvatarLoading,
        avatarData,
        handleAvatarFormCancel,
        handleAvatarFormShow,
        handleAvatarFormSubmit,
        handleAvatarFileChange,
    }
}
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Mi Perfil</h1>
    
    <template v-if="user.fullProfileLoaded">
        <template v-if="!editing && !editingAvatar">
            <UserProfileData :user="user" />
            
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
                    <!-- 
                    Para los inputs de type="file" _no_ podemos usar v-model.
                    ¿Por qué no podemos usar v-model?
                    v-model hace 2 cosas:
                    - Asocia una variable del state al elemento, de manera que cuando el valor cambie,
                        se actualice el contenido del elemento.
                    - Cuando el valor del elemento cambia, se actualiza el valor de la variable.

                    En su lugar, tenemos que manejarlo como si fuera JS común: detectando los cambios
                    de los valores con onChange.
                    -->
                    <input 
                        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
                        type="file"
                        id="newAvatar"
                        :disabled="editingAvatarLoading"
                        @change="handleAvatarFileChange"
                    />
                </div>
                <div 
                    class="mb-2"
                    v-if="avatarData.preview !== null"
                >
                    <p>Previsualización de la imagen seleccionada</p>
                    <img :src="avatarData.preview" alt="">
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
    <template v-else>
        <Loader />
    </template>
</template>