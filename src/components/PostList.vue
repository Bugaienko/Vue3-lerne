<template>
<div v-show="posts.length > 0">
    <h3>Список постов</h3>
    
    <transition-group name="post-list">
    <PostItem
    v-for="post in posts"
    :post="post"
    :key="post.id"
    @remove="$emit('remove', post)"
    />
    </transition-group>
    
</div>
<h2 v-show="posts.length == 0" style="color: grey;">Публикации не найдены</h2>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
    // emits: ['remove', ],
    props: {
        posts: {
            type: Array,
            required: true
        }
    },
    components: { PostItem },
}
</script>

<style scoped>

.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active, .post-list-leave-active {
  transition: all 0.5s;
}
.post-list-enter, .post-list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateX(130px);
}
.post-list-move {
  transition: transform 0.8s ease-in-out;
}
</style>