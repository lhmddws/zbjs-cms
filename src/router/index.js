import { createRouter, createWebHashHistory } from "vue-router";
import { defineAsyncComponent } from "vue";
const home = defineAsyncComponent(() => import("@/pages/home/home.vue"));
const teach = defineAsyncComponent(() => import("@/pages/cm/teach.vue"));
const match = defineAsyncComponent(() => import("@/pages/cm/match.vue"));
const Identify = defineAsyncComponent(() => import("@/pages/cm/Identify.vue"));
const InboundRecords = defineAsyncComponent(() => import("@/pages/records/InboundRecords.vue"));
const OutboundRecords = defineAsyncComponent(() => import("@/pages/records/OutboundRecords.vue"));
const usermanager = defineAsyncComponent(() => import("@/pages/user/usermanager.vue"));
const sign = defineAsyncComponent(() => import("@/pages/sign/sign.vue"));
const main = defineAsyncComponent(() => import("@/pages/main.vue"));

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: sign,
    },
    {
      path: "/sign",
      component: sign,
    },
    {
      path: "/main",
      component: main,
      children: [
        {
          path: "/home",
          component: home,
        },
        {
          path: "/match",
          component: match,
        },
        {
          path: "/teach",
          component: teach,
        },
        {
          path: "/Identify",
          component: Identify,
        },
        {
          path: "/InboundRecords",
          component: InboundRecords,
        },
        {
          path: "/OutboundRecords",
          component: OutboundRecords,
        },
      ],
    },
    {
      path: "/UserManager",
      component: usermanager,
    },
  ],
});

export default router;
