import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client/core";

import App from "./App.vue";
import "./assets/css/main.css";
import {dayMonthBeauty} from "./utils/dates";

//Http connection to the API
const httpLink = createHttpLink({
  uri: "http://localhost:3004/graphql",
});
//Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});

app.config.globalProperties.$filters = {
  dayMonthBeauty,
};

app.mount("#app");
