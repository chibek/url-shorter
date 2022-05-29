<template>
  <div class="relative max-h-full overflow-y-auto">
    <nav
      class="sticky top-0 flex justify-between whitespace-nowrap bg-gray-200 p-3 font-bold"
    >
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
    <ModalCreateUrl v-slot="{ open }">
      <div class="sticky bottom-0 bg-white p-4">
        <button
          @click="open"
          class="trans-all left-4 flex cursor-pointer items-center space-x-2 rounded-lg border p-2 shadow-lg hover:bg-gray-200 hover:text-orange-400"
        >
          <Icon name="plus" class="h-4 w-4" />
          <span>Add new url</span>
        </button>
      </div>
    </ModalCreateUrl>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import SidebarItem from "./SidebarItem.vue";
import ModalCreateUrl from "./ModalCreateUrl.vue";
import Icon from "../../../components/icon/Icon.vue";

const props = defineProps(["urls", "loading"]);
const router = useRouter();
const activeUrlId = ref(null);

onMounted(() => {
  if (!props.urls.length) {
    router.push({ name: "emptypage" });
    return;
  }
  setActiveUrl(props.urls[0]);
});

const setActiveUrl = (url) => {
  activeUrlId.value = url.id;
  router.push({ name: "link", params: { url: url.shortUrl, id: url.id } });
};
</script>
