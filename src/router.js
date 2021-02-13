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
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/Login.vue') //@/pages/index.vue
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('@/pages/Register.vue') //@/pages/index.vue
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('@/pages/Profile.vue') //@/pages/index.vue
        }]
    }]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/profile'];
    const authRequired = !publicPages.includes(to.path);
    var loggedIn = localStorage.getItem('user');
    if(loggedIn) {
        var jwt =  parseJwt(JSON.parse(loggedIn).token);
        if (jwt.exp < Date.now()/1000) {
            localStorage.removeItem('user');
            loggedIn = null;
        }
    }
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next('/login');
    } else {
        next();
    }
});

//parses jwt token.  gets {sub: , iat: , exp, }
function parseJwt (token) {
    
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("+++++++: " + jsonPayload + " ===== " + Date.now()/1000)
    return JSON.parse(jsonPayload);
}

export default router;