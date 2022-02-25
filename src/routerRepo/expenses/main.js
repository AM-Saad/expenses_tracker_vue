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
        path: '/new-expenses',
        component: () =>
            import(/* webpackChunkName: "newitem" */ "@/views/CreateNewExpenses.vue"),
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
            import(/* webpackChunkName: "items" */ "@/views/SingleItem.vue"),
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
