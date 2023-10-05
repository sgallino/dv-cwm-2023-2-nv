<script>
import Loader from './Loader.vue';

export default {
    name: 'BaseButton',
    components: { Loader },
    props: {
        loading: {
            type: Boolean,
            default: false,
        }
    },
}
</script>

<template>
    <button 
        class="transition w-full p-1.5 rounded bg-blue-700 text-white hover:bg-blue-600 active:bg-blue-800 disabled:bg-blue-500 motion-reduce:transition-none"
        type="submit"
        :disabled="loading"
    >
        <template v-if="!loading">
            <slot>Enviar</slot>
        </template>
        <template v-else>
            <Loader size="small" />
        </template>
    </button>
</template>