
import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue'
import PostPage from "@/pages/PostPage";
import About from '@/pages/About.vue'
import PostDetailView from '@/pages/PostDetailView.vue'
import UserPage from "@/pages/UserPage";


const routes = [
    { path: '/', name: 'main', component: Main },
    { path: '/posts', name: 'posts', component: PostPage },
    { path: '/about', name: 'about', component: About },
    { path: '/posts/:id', name: 'postView', component: PostDetailView },
    { path: '/users', name: 'users', component: UserPage },

]
// const router = createRouter(
//     {
//     routes,
//     history,
// })
const old_router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default old_router
// export default function (history) {
//     return createRouter({
//         routes,
//         history,
//     })
// }