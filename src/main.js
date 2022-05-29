import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client/core";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import App from "./App.vue";
import "./assets/css/main.css";
import "./assets/css/utils.css";
import { dayMonthBeauty, longDateBeauty } from "./utils/dates";
import { createRouter } from "./router";

const router = createRouter();

//Http connection to the API
const httpLink = createHttpLink({
  uri: "http://localhost:3004/graphql",
});
const wsLink = new WebSocketLink({
  uri: `ws://localhost:3004/graphql`,
  options: {
    reconnect: true,
  },
});
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

//Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
const apolloClient = new ApolloClient({
  link: link,
  cache,
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
});
app.use(router);
app.config.globalProperties.$filters = {
  dayMonthBeauty,
  longDateBeauty,
};

app.mount("#app");
