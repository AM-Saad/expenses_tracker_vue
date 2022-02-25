export default [

    {
        path: '/auth/:type',
        name: 'auth',
        meta: {
            sitemap: {
                slugs: [
                    {
                        type: 'login',
                        title: "login",
                        category: 'auth',
                    },
                    {
                        type: 'signup',
                        title: "signup",
                        category: 'auth',
                    }
                ]
            }
        },
        component: () => import( /* webpackChunkName: "auth" */ '@/views/Auth.vue')
    },
    { path: '/auth', redirect: '/auth/login' }

]
