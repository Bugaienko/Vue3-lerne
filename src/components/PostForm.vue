<template>
 <h4>Создание поста</h4>
 
        <form @submit.prevent>
            <my-input 
            v-focus
            v-model="post.title"
            class="input" 
            type="text" 
            placeholder="Название: " 
            />
            <my-input 
            v-model="post.body"
            class="input" 
            type="text" 
            placeholder="Описание: " 
            />
            <my-button 
            style="align-self: center; margin-top: 15px;"
            @click="createPost" 
            >
            Создать
            </my-button>
        </form>
</template>

<script>

export default {
    data() {
        return {
            post: {
                title: "",
                body: ""
            }
        };
    },
    methods: {
        // emits: ['create', ],
        createPost() {
            this.post.id = Date.now();
            this.$emit("create", this.post);
            this.post = {
                title: "",
                body: ""
            };
        }
    },
  name: 'posts',
    
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
}
</style>