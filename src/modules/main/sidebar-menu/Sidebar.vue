<template>
  <div>
    <nav class="flex justify-between whitespace-nowrap p-3 font-bold">
      <span>{{ urls.length }} Result</span>
      <span>Click all time</span>
    </nav>
    <SidebarItem
      @click="setActiveUrl(url)"
      v-for="url of urls"
      :key="url.id"
      :url="url"
      :active-id="activeUrlId"
    />
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";

const props = defineProps(["urls", "loading"]);
const router = useRouter();
const activeUrlId = ref(null);

onMounted(() =>{
	setActiveUrl(props.urls[0]);
});

const setActiveUrl = (url) => {
  activeUrlId.value = url.id;
  router.push({ name: "link", params: { url: url.shortUrl, id: url.id } });
};

</script>
