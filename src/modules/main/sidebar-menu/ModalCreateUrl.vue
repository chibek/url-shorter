<template>
  <button
    @click="isOpen = true"
    class="trans-all absolute bottom-4 left-4 flex cursor-pointer space-x-2 rounded-lg border p-2 shadow-lg hover:bg-gray-200 hover:text-orange-400"
  >
    <Icon name="plus" />
    <span>Add new url</span>
  </button>
  <Modal
    v-model:isOpen="isOpen"
    content-class="max-w-[30rem] bg-white py-3 px-5 w-full"
    :closeClickOutside="false"
  >
    <DialogTitle class="mb-7 mt-5 text-center text-xl font-bold">
      Create Link
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
      <button
        class="trans-xs text-gray-400 hover:text-red-300"
        @click="isOpen = false"
      >
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
import Icon from "@/components/icon/Icon.vue";
import { CONTEXT_URL_CREATE, CONTEXT_URL } from "@/api/context-url";
import { useMutation } from "@vue/apollo-composable";

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
const { value: name, errorMessage: nameError } = useField("name");
const { value: longUrl, errorMessage: longUrlError } = useField("longUrl");

const { mutate: createLink, onDone } = useMutation(CONTEXT_URL_CREATE);

const create = handleSubmit((values) => {
  createLink(
    {
      input: {
        ...values,
      },
    },
    {
      update: (cache, { data: { create } }) => {
        let data = cache.readQuery({ query: CONTEXT_URL });
        data = {
          ...data,
          urls: [...data.urls, create],
        };
        cache.writeQuery({ query: CONTEXT_URL, data });
      },
    }
  );
});

onDone(() => {
  resetForm();
  isOpen.value = false;
});
const isOpen = ref(false);
</script>
