<!-- <script>
export default {
    name: 'BaseInput',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script> -->
<script setup>
// Usamos la función defineProps (no hace falta importarla) para definir las propiedades del componente.
// Solo hace falta capturar el retorno de la función si queremos usar las propiedades dentro de la etiqueta
// <script>.
// const props = defineProps(['modelValue']);
defineProps({
    modelValue: {
        type: String,
        required: true,
    }
});

// Usamos la función defineEmits (no hace falta importarla) para definir qué eventos se emiten.
defineEmits(['update:modelValue']);
</script>

<template>
    <input
        class="w-full px-1.5 py-1 border border-gray-400 rounded disabled:bg-gray-100"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    >
</template>