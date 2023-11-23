<script setup>
import { onMounted, ref } from 'vue';
import { getBlogPosts } from '../services/blog-posts';
import LoadingContext from '../components/LoadingContext.vue';

const { posts, loading } = useBlogPosts();

function useBlogPosts() {
    const loading = ref(true);
    const posts = ref([]);

    onMounted(async () => {
        loading.value = true;

        try {
            posts.value = await getBlogPosts();
        } catch (error) {
            console.error(error);
        }

        loading.value = false;
    });

    return {
        loading,
        posts,
    }
}
</script>

<template>
    <h1 class="bold text-3xl mb-4">Blog de Da Vinci</h1>

    <div class="mb-4">
        <router-link to="/blog/publicar" class="text-blue-700 underline">Publicar un nuevo artículo</router-link> 
    </div>

    <LoadingContext :loading="loading">
        <article
            v-for="post in posts"
            class="p-4 border border-gray-700 rounded mb-4 shadow shadow-gray-600"
        >
            <h2 class="mb-2 text-2xl">{{ post.title }}</h2>
            <p class="mb-2 italic">{{ post.created_at }}</p>
            <p>{{ post.body }}</p>
        </article>
    </LoadingContext>
</template>