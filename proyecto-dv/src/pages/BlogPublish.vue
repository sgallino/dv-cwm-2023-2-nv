<script setup>
import { ref } from 'vue';
import { createBlogPost } from '../services/blog-posts';
import BaseLabel from '../components/BaseLabel.vue';
import BaseInput from '../components/BaseInput.vue';
import BaseTextarea from '../components/BaseTextarea.vue';
import BaseButton from '../components/BaseButton.vue';

const { savingPost, postData, handleSubmit } = useBlogPostPublish();

function useBlogPostPublish() {
    const savingPost = ref(false);
    const postData = ref({
        title: '',
        body: '',
    });

    async function handleSubmit() {
        savingPost.value = true;

        try {
            await createBlogPost({
                ...postData.value
            });
        } catch (error) {
            // TODO :)
            console.error(error);
        }

        savingPost.value = false;
    }

    return {
        savingPost,
        postData,
        handleSubmit,
    }
}
</script>

<template>
    <h1 class="bold text-3xl mb-4">Publicar un nuevo artículo en el blog</h1>

    <form 
        action="#"
        method="post"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-2">
            <BaseLabel for="title">Título</BaseLabel>
            <BaseInput
                id="title"
                :disabled="savingPost"
                v-model="postData.title"
            />
        </div>
        <div class="mb-2">
            <BaseLabel for="body">Cuerpo</BaseLabel>
            <BaseTextarea
                id="body"
                :disabled="savingPost"
                v-model="postData.body"
            />
        </div>
        <BaseButton :loading="savingPost">Publicar</BaseButton>
    </form>
</template>