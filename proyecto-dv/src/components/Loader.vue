<script>
const sizes = ['small', 'normal'];

export default {
    name: 'Loader',
    props: {
        size: {
            type: String,
            default: 'normal',
            validator: (value) => {
                return sizes.includes(value);
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
                'loader': this.size === 'normal' || !sizes.includes(this.size),
            }
        }
    }
}
</script>

<template>
    <div :class="loaderClass">
        <div class="sr-only">Cargando...</div>
    </div>
</template>