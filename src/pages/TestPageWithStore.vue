<template>
  <div>
        <h1>Страница с постами</h1>

    <my-input
        :model-value="searchQuery"
        @update:model-value="setSearchQuery"
        placeholder="Поиск в заголовке...."
    />

    <div class="app_btns">
      <my-button
          @click="fetchApi"
      >
        Получить студентов
      </my-button>

      <my-button
          @click="showDialog"
      >
        Создать пост
      </my-button>


      <my-select
          :model-value="selectedSort"
          @update:model-value="setSelectedSort"
          :options="sortOptions"
      >
      </my-select>

    </div>

    <my-dialog
        v-model:show="show"
    >
      <post-form
          @create="createPost"
      />
    </my-dialog>

    <post-list
        :posts="sortAndSearchedPosts"
        @remove="removePost"
        v-if="!inPostsLoading"
    />
    <div v-else>
      Идет загрузка постов...
    </div>
    <div v-intersection="loadMorePosts" @click="loadMorePosts" class="observer"></div>

  </div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import MySelect from "@/components/UI/MySelect";
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';



export default {
  name: 'test-store',
  components: {
    MySelect,
    PostList,
    PostForm,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),
    ...mapActions({
      fetchPosts: 'post/fetchPosts',
      loadMorePosts: 'post/loadMorePosts',
      fetchApi: "post/fetchApi",
    }),

    createPost (post){
      this.posts.push(post);
      this.show = false;
    },
    removePost (post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.show = true
    },

  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.post.posts,
      students: state => state.post.students,
      inPostsLoading: state => state.post.inPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,

    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortAndSearchedPosts: "post/sortAndSearchedPosts",
    }),
  },
  watch: {

  },
}

</script>

<style>

.app_btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;

}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  margin-right: 2px;
}
.current-page {
  border: 2px solid teal;
}
.observer {
  height: 38px;
  background: green;
}

</style>