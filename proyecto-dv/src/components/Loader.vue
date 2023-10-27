<!-- <script>
import { BUTTON_SIZES } from './../constants/constants';

export default {
    name: 'Loader',
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (value) => {
                return BUTTON_SIZES.includes(value);
            }
        },
    },
    computed: {
        loaderClass() {
            // switch(this.size) {
            //     case 'small':
            //         return 'loader-mini';

            //         // case 'normal':
                        
            //     default:
            //         return 'loader';
            //         // throw new Error('El size debe ser uno de los siguientes valores: small, normal');
            // }

            return {
                'loader-mini': this.size === 'small',
                'loader': this.size === 'normal' || !BUTTON_SIZES.includes(this.size),
            }
        }
    }
}
</script> -->
<script setup>
import { computed } from 'vue';
import { BUTTON_SIZES, BUTTON_SIZE_NORMAL, BUTTON_SIZE_SMALL } from './../constants/constants';

// Acá sí capturamos el retorno de la función defineProps, para poder usar las propiedades en el script.
const props = defineProps({
    size: {
        type: String,
        default: BUTTON_SIZE_NORMAL,
        validator: value => BUTTON_SIZES.includes(value),
    }
});

const loaderClass = computed(() => {
    return {
        'loader-mini': props.size === BUTTON_SIZE_SMALL,
        'loader': props.size === BUTTON_SIZE_NORMAL || !BUTTON_SIZES.includes(props.size),
    }
});
</script>  

<template>
    <div :class="loaderClass">
        <div class="sr-only">Cargando...</div>
    </div>
</template>