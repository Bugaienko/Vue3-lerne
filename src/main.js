import { createApp, createSSRApp } from 'vue'
import { createWebHistory } from 'vue-router';
import App from './App'
import components from '@/components/UI';
import directives from "@/directives";
import old_router from "@/router/router";
import router from "@/router/router";
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import MyDialog from "@/components/UI/MyDialog";
import store from "@/store";

const app = createApp(App)

// console.log(components)

components.forEach(component => {
    console.log('comp ' + component.name)
    app.component(component.name, component)
});

// const router = createRouter(createWebHistory())

directives.forEach(directive => {
    console.log('dir '+directive.name)
    app.directive(directive.name, directive)
})



// app.directive('intersiction', Vintersictions)

app
   .use(router)
   .use(store)

app.mount('#app')
