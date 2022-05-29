<template>
  <slot :open="open"></slot>
  <Modal
    v-model:isOpen="isOpen"
    content-class="max-w-[30rem] bg-white py-3 px-5 w-full"
    :closeClickOutside="false"
  >
    <DialogTitle class="mb-7 mt-5 text-center text-xl font-bold">
      Update Link
    </DialogTitle>
    <DialogDescription class="flex flex-col space-y-6">
      <div class="relative h-16">
        <input
          id="name"
          type="text"
          class="peer"
          placeholder="Name url"
          v-model="name"
        />
        <label for="name" class="float-label">Name url</label>
        <span
          class="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500"
          >{{ nameError }}</span
        >
      </div>
      <div class="relative h-16">
        <input
          id="long-url"
          type="text"
          class="peer"
          placeholder="Long url"
          v-model="longUrl"
        />
        <label for="long-url" class="float-label">Long url</label>
        <span
          class="mt-1 ml-1 flex items-center text-xs font-medium tracking-wide text-red-500"
          >{{ longUrlError }}</span
        >
      </div>
    </DialogDescription>

    <div class="mt-5 flex items-center justify-end space-x-4">
      <button
        class="btn-third rounded-full px-4 py-1 hover:text-white"
        @click="create"
      >
        submit
      </button>
      <button class="trans-xs text-gray-400 hover:text-red-300" @click="close">
        close
      </button>
    </div>
  </Modal>
</template>

<script setup>
import Modal from "@/components/modal/Modal.vue";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { DialogDescription, DialogTitle } from "@headlessui/vue";
import { isRequired } from "@/utils/validatorRules";
import { CONTEXT_URL, CONTEXT_URL_UPDATE } from "@/api/context-url";
import { useMutation } from "@vue/apollo-composable";

const open = () => {
	resetForm({
		values: {
			name: props.url.name,
			longUrl: props.url.longUrl,
		},
	});
  isOpen.value = true;
};
const close = () => {
  isOpen.value = false;
};
const isOpen = ref(false);
const simpleSchema = {
  name(value) {
    return isRequired(value);
  },
  longUrl(value) {
    return isRequired(value);
  },
};
const { handleSubmit, resetForm } = useForm({
  validationSchema: simpleSchema,
});
const props = defineProps(["url"]);
const { value: name, errorMessage: nameError } = useField("name");
const { value: longUrl, errorMessage: longUrlError } = useField("longUrl");
name.value = props.url.name;
longUrl.value = props.url.longUrl;
const { mutate: updateLink, onDone } = useMutation(CONTEXT_URL_UPDATE, {
  refetchQueries: [CONTEXT_URL],
});

const create = handleSubmit((values) => {
  updateLink({
    input: {
      id: props.url.id,
      ...values,
    },
  });
});

onDone(() => {
  isOpen.value = false;
});
</script>
