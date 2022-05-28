<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex flex-col items-center space-y-2">
      <span>Not urls found</span>
      <ModalCreateUrl v-slot="{ open }">
        <button
          @click="open"
          class="trans-all bottom-4 left-4 flex cursor-pointer items-center space-x-2 rounded-lg border p-2 shadow-lg hover:bg-gray-200 hover:text-orange-400"
        >
          <Icon name="plus" class="h-4 w-4" />
          <span>Add new url</span>
        </button>
      </ModalCreateUrl>
    </div>
  </div>
</template>

<script setup>
import ModalCreateUrl from "@/modules/main/sidebar-menu/ModalCreateUrl.vue";
import Icon from "@/components/icon/Icon.vue";
</script>
