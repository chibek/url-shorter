<template>
  <section class="flex flex-col space-y-2 p-6" v-if="!loading">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-bold">{{ url.name }}</h2>
      <button class="">Edit</button>
    </div>
    <span>{{ url.created_at }}</span>
    <div class="boder-blue-200 rounded-lg border p-2">
      {{ url.shortUrl }}
    </div>
    <span class="text-sm font-bold"> Destination: </span>
    <a :href="url.longUrl">{{ url.longUrl }}</a>
  </section>
  <section class="flex h-full w-full items-center justify-center" v-else>
    Loading...
  </section>
</template>

<script setup>
import { useQuery } from "@vue/apollo-composable";
import { CONTEXT_URL_BY_ID } from "../api/context-url";
import { computed, reactive, ref, watchEffect } from "vue";

const enabled = ref(false);
const props = defineProps(["id"]);
const variables = reactive({
  id: null,
});
const { result, loading } = useQuery(CONTEXT_URL_BY_ID, variables, () => ({
  enabled: enabled.value,
}));

watchEffect(async () => {
  if (!props.id) {
    return;
  }
  variables.id = props.id;
  enabled.value = true;
});

const url = computed(() => result.value?.findOne ?? {});
</script>
