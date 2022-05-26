<template>
<div>
<h1>Страница с постами</h1>

<my-input
v-model="searchQuery"
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

<!--<my-select-->
<!--v-model="selectedSort"-->
<!--:options="sortOptions"-->
<!--/>-->


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
<!--<div @click="loadMorePosts" class="observer"></div>-->
<!-- <div class="page__wrapper">
    <div 
    v-for="pageNumber in totalPages" 
    :key="pageNumber"
    class="page"
    :class="{
        'current-page': page === pageNumber
    }"
    @click="changePage(pageNumber)"

    >
        {{pageNumber}}
    </div>
</div> -->
</div>
</template>

<script>
import PostForm from '@/components/PostForm';
import PostList from '@/components/PostList';
import axios from 'axios';


export default {
    name: 'posts',
    components: {
    PostList,
    PostForm,
},
    data() {
        return {
            posts: [],
            students: [],
            posts_old: [
                {id: 1, title: 'Javascript', body: 'JavaScript универсальный язык программирования'},
                {id: 2, title: 'Python', body: 'Python язык программирования для серверной логики'},
                {id: 3, title: 'Vue', body: 'Vue.js фреймворк на основе Javascript'},
                {id: 4, title: 'Vue 4', body: 'Vue.js 4 фреймворк на основе Javascript 4'},
            ],
            show: false,
            inPostsLoading: false,
            selectedSort: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                {value: 'title', name: 'По заголовку'},
                {value: 'body', name: 'По описанию'},
            ],
            searchQuery: '',

        }
    },
    methods: {
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
        // changePage(pageNumber){
        //     this.page = pageNumber;
        // },
        async fetchPosts() {
            this.inPostsLoading = true;
            try {
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                // console.log(response)
                this.posts = response.data
            } catch (e) {
                alert('Error: ' + e)
            } finally {
               this.inPostsLoading = false;
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1;
                const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
                    params: {
                        _page: this.page,
                        _limit: this.limit
                    }
                });
                // this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
                // console.log(response)
                this.posts = [...this.posts, ...response.data]
            } catch (e) {
                alert('Error: ' + e)
            } finally {
            }
        },
        async fetchApi() {
            this.inPostsLoading = true;
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/')
                console.log(response)
                this.students = response.data
            } catch (e) {
                alert('Error: ' + e)
            } finally {
               this.inPostsLoading = false;
            }
        },
    },
    mounted() {
        this.fetchPosts();
        // console.log(this.$refs.observer);
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0
        //     }
        // const callback = (entries, observer) => {
        //     if(entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts();
        //     }
        // };
        // const observer = new IntersectionObserver(callback, options);
        // observer.observe(this.$refs.observer);
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
            })
        },
        sortAndSearchedPosts() {
            return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
        }
    },
    watch: {
        // page() {
        //    this.fetchPosts() 
        // },

        // selectedSort(newValue){
        //     this.posts.sort((post1, post2) => {
        //         return post1[newValue]?.localeCompare(post2[newValue])
        //     })
        // }
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