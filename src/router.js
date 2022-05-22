import {
  createMemoryHistory,
  createRouter as _createRouter,
  createWebHistory,
} from "vue-router";

// Auto generates routes from vue files under ./pages
// https://vitejs.dev/guide/features.html#glob-import
const pages = import.meta.glob("./pages/*.vue");

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  if (["link"].includes(name)) {
    return;
  }
  return {
    path: name === "/home" ? "/" : name,
    name: name,
    component: pages[path], // () => import('./pages/*.vue')
  };
});

routes.push({
  path: "/:catchall(.*)*",
  component: () => import("./pages/Page404.vue"),
});
routes.push({
  path: "/link/:url",
  name: "link",
  props:(route) => ({
    ...route.params
  }),
  component: () => import("./pages/Link.vue"),
});

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}
