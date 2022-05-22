<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog
            :open="isOpen"
            class="fixed inset-0 overflow-y-auto"
            as="div"
            @close="setIsOpen(false)"
        >
            <div
                class="flex min-h-screen min-w-[15rem] items-start justify-center"
            >
                <ModalTransitionOverlay class="default-overlay">
                    <DialogOverlay class="h-full w-full" />
                </ModalTransitionOverlay>

                <ModalTransitionBody
                    class="z-10 mt-60 rounded-xl shadow-lg"
                    :class="contentClass"
                >
                    <slot />
                </ModalTransitionBody>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script>
import { ref, watchEffect } from 'vue';
import {
    TransitionRoot,
    Dialog,
    DialogOverlay,
    TransitionChild,
} from '@headlessui/vue';
import ModalTransitionOverlay from './components/ModalTransitionOverlay.vue';
import ModalTransitionBody from './components/ModalTransitionBody.vue';

export default {
    components: {
        ModalTransitionBody,
        ModalTransitionOverlay,
        TransitionChild,
        TransitionRoot,
        Dialog,
        DialogOverlay,
    },
    props: {
        isOpen: {
            type: Boolean,
            default: false,
        },
        contentClass: {
            type: String,
            default: 'min-w-[45rem]',
        },
        closeClickOutside: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['update:isOpen'],
    setup(props, { emit }) {
        const isOpen = ref(false);

        function setIsOpen(value) {
            if (!props.closeClickOutside) {
                return;
            }
            isOpen.value = value;
            emit('update:isOpen', isOpen.value);
        }

        watchEffect(() => {
            isOpen.value = props.isOpen;
        });

        return {
            setIsOpen,
            isOpen,
        };
    },
};
</script>
