<template>
  <div class="flex flex-col">
    <div class="flex items-end space-x-1">
      <span class="text-2xl font-bold">{{ currentClick }}</span>
      <Icon name="chart" />
    </div>
    <span class="text-sm">Total clicks</span>
  </div>
  <DoughnutChart v-if="currentClick" :chartData="chartData" />
</template>

<script setup>
import DoughnutChart from "@/components/charts/DoughnutChart";
import Icon from "@/components/icon/Icon.vue";
import { useSubscription } from "@vue/apollo-composable";
import { CONTEXT_URL_SUBSCRPTION } from "@/api/context-url";
import {  ref, watchEffect } from "vue";
import {  useRoute } from 'vue-router'

const route  = useRoute();
const props = defineProps(["clicks"]);
const currentClick = ref(props.clicks);
const { result: getClicks } = useSubscription(CONTEXT_URL_SUBSCRPTION, {
  id: route.params.id,
});

watchEffect(() => {
  if (getClicks.value?.clickUpdate.id === route.params.id) {
    currentClick.value = getClicks.value?.clickUpdate.clicks;
    return;
  }
  currentClick.value = props.clicks;
});

const chartData = {
  labels: ["Clicks"],
  datasets: [
    {
      backgroundColor: ["#9662FF"],
      data: [currentClick],
    },
  ],
};
</script>
