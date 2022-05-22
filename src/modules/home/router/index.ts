import Layout from '@/components/layout/Layout.vue'
import LayoutSecond from '@/components/layout/LayoutSecond.vue'
import { RouteConfig } from 'vue-router'
import App from "@/App.vue";

const homeRouters: RouteConfig[] = [
    {
        path: '/trang-chu',
        component: () => import('../view/Home.vue'),
        name: 'Home'
        // children: [
        //     {
        //         path: '/',
        //         components: {
        //             default: LayoutSecond
        //         },
        //         children: [
        //             {
        //                 path: '/',
        //                 name: 'Home',
        //                 component: () => import('../view/Home.vue')
        //             },
        //         ]
        //     },
        //     {
        //         path: '*',
        //         redirect: '/'
        //     }
        // ]


    }
]

export default homeRouters
