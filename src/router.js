import Vue from 'vue';
import Router from "vue-router";
import { createRouterLayout } from "vue-router-layout";

Vue.use(Router);

const RouterLayout = createRouterLayout(layout => {
	return import("@/components/layout/" + layout + ".vue");
  //this is wrong, need to create actual layouts, using components from this folder
});

const router = new Router({
	routes: [
    {
      path: '/',

      // Pass <RouterLayout> as the route component
      component: RouterLayout,

      // All child components will be applied with corresponding layout component
      children: [
        {
          path: '/config/rooms',
          name: 'room-config',
          component: () => import('@/pages/config/rooms.vue')
        },
        {
          path: '/config/tasks',
          name: 'task-config',
          component: () => import('@/pages/config/tasks.vue')
        },
        {
          path: '/config/scheduleBuilder',
          name: 'schedule-config',
          component: () => import('@/pages/config/scheduleBuilder.vue')
        },
        {
          path: '/',
          name: 'home',
          component: () => import('@/pages/index.vue') //@/pages/index.vue
        }
      ]
    }
  ]
});

export default router;