<template>
  <section class="flex h-full w-full divide-x-2" v-if="!loading">
    <Sidebar
      :urls="urls"
      :loading="loading"
      class="w-1/3 min-w-[15rem] divide-y"
    />
    <div class="w-2/3">
      <router-view v-slot="{ Component }">
        <transition
          enter-from-class="opacity-0"
          enter-active-class="transition-all ease-in-out duration-500"
          enter-to-class="opacity-100"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="transition-all ease-in-out duration-500 "
          mode="out-in"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </section>
  <section class="flex h-full items-center justify-center" v-else>
    <span>Loading...</span>
  </section>
</template>
<script setup>
import Sidebar from "./modules/main/sidebar-menu/Sidebar.vue";
import { useQuery } from "@vue/apollo-composable";
import { CONTEXT_URL } from "./api/context-url";
import { computed } from "vue";

const { result, loading } = useQuery(CONTEXT_URL);
const urls = computed(() => result.value?.urls ?? []);
</script>
