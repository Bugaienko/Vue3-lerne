import Main from "@/pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import UserPage from "@/pages/UserPage";
import About from "@/pages/About";
import PostDetailView from "@/pages/PostDetailView";
import PostPage from "@/pages/PostPage";
import TestPage from "@/pages/TestPage";
import TestPageWithStore from "@/pages/TestPageWithStore";



const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostDetailView
    },
    {
        path: '/test',
        component: TestPage
    },
    {
        path: '/store',
        component: TestPageWithStore
    },


]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;