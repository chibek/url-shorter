<template>
  <section class="flex h-full w-full divide-x-2 bg-red-200">
    <div class="w-1/3 bg-blue-200">
      <nav  class="flex flex-col" v-for="url of urls" :key="url.id">
		  <span>{{$filters.dayMonthBeauty(url.created_at)}}</span>
	  </nav>
    </div>
    <div class="w-2/3 bg-red-200"></div>
  </section>
</template>

<script setup>
import { CONTEXT_URL } from "./api/context-url";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "vue";

const { result, loading } = useQuery(CONTEXT_URL);
const urls = computed(() => result.value?.urls ?? []);
</script>
