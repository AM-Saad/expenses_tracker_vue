export default [
    {
        component: () =>
            import(/* webpackChunkName: "expenses" */ "@/views/Expenses.vue"),
        name: 'expenses',
        path: '/expenses/',
        meta: {
            requiredAuth: true,
            index: 1,

        },
        children: [


        ]
    },
    {
        name: 'newexpenses',
        path: '/newexpenses',
        component: () =>
            import(/* webpackChunkName: "newitem" */ "@/components/expenses/createItemComponents/CreateNew.vue"),
        meta: {
            requiredAuth: true,
            index: 1,

        },
    },
    {
        name: 'newtype',
        path: '/newtype',
        component: () =>
            import(/* webpackChunkName: "newtype" */ "@/components/expenses/settings/Types/CreateType.vue"),
        meta: {
            requiredAuth: true
        },
    },
    {
        name: 'item',
        path: '/item/:id',
        component: () =>
            import(/* webpackChunkName: "items" */ "@/components/expenses/SingleItemComponent.vue"),
        children: [
            {
                name: 'invoice',
                path: 'invoice',
                component: () =>
                    import(/* webpackChunkName: "Invoice" */ "@/components/expenses/Invoice.vue"),
                meta: {
                    requiredAuth: true
                },
            },

        ],
        meta: {
            requiredAuth: true
        },
    },
]
