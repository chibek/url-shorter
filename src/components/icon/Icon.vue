<template>
    <component :is="currentIcon" :class="iconClass" />
</template>
<script>
import { computed, defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
    props: {
        name: {
            type: String,
            required: true,
        },
        current: {
            type: String,
            validator: (value) =>
                ['stroke', 'fill', 'stroke-fill', 'none'].includes(value),
            default: 'fill',
        },
    },
    setup(props) {
        const currentIcon = computed(() => {
            try {
                return defineAsyncComponent(() =>
                    import(`../../assets/icons/${props.name}.svg?component`),
                );
            } catch (e) {
                console.log('Not icon found');
            }
        });
        const iconClass = computed(() => {
            if (props.current === 'stroke-fill')
                return 'stroke-current fill-current';
            if (props.current === 'fill') return 'stroke-current';
            if (props.current === 'stroke') return 'fill-current';
            return '';
        });

        return {
            currentIcon,
            iconClass,
        };
    },
});
</script>
