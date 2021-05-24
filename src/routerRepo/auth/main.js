export default [

    {
        path: "/auth",
        name: "auth",
        component: () =>
            import(/* webpackChunkName: "about" */ "@/views/Auth.vue"),
    },
]
