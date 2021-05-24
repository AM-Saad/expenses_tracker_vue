export default [
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "@/views/Cards.vue"),
        name: 'cards',
        path: '/cards',
        meta: {
            requiredAuth: true
        },

    },
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "@/views/Card.vue"),
        name: 'card',
        path: '/card/:id',
        meta: {
            requiredAuth: true
        },

    },
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "@/components/card/CreateNew.vue"),
        name: 'newcard',
        path: '/cards/new',
        meta: {
            requiredAuth: true
        },

    },

]
