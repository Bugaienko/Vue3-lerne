import axios from "axios";

export const postModule = {
	state: () => ({
		posts: [],
		students: [],
		inPostsLoading: false,
		selectedSort: '',
		searchQuery: '',
		page: 1,
		limit: 10,
		totalPages: 0,
		sortOptions: [
			{value: 'title', name: 'По заголовку'},
			{value: 'body', name: 'По описанию'},
		],

	}),
	getters: {
		sortedPosts(state) {
			return [...state.posts].sort((post1, post2) => {
				return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
			})
		},
		sortAndSearchedPosts(state, getters) {
			return getters.sortedPosts.filter(post => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
		}
	},
	mutations: {
		setPosts(state, posts) {
			state.posts = posts;
		},
		setLoading(state, bool) {
			state.inPostsLoading = bool
		},
		setPage(state, page) {
			state.page = page;
		},
		setStudents(state, students) {
			state.students = students
		},
		setLimit(state, limit) {
			state.limit = limit;
		},
		setSelectedSort(state, selectedSort) {
			state.selectedSort = selectedSort;
		},
		setSearchQuery(state, searchQuery) {
			state.searchQuery = searchQuery;
		},
		setTotalPages(state, totalPages) {
			state.totalPages = totalPages;
		},

	},
	actions: {
		async fetchPosts({state, commit}) {

			try {
				commit('setLoading', true); // this.inPostsLoading = true;
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				});
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				console.log(response.data)
				commit('setPosts', response.data)
				console.log("posts- " +state.posts)
			} catch (e) {
				console.log('Error: ' + e)
			} finally {
				commit('setLoading', false);
			}
		},
		async loadMorePosts({state, commit}) {
			try {
				commit('setPage', state.page + 1)
				const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
					params: {
						_page: state.page,
						_limit: state.limit
					}
				});
				commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.limit))
				// console.log(response)
				commit('setPosts', [...state.posts, ...response.data])
				console.log("posts- " +state.posts)
				// this.posts = [...this.posts, ...response.data]
			} catch (e) {
				console.log('Error: ' + e)
			} finally {
			}
		},
		async fetchApi({state, commit}) {
			commit('setLoading', true);
			// this.inPostsLoading = true;
			try {
				const response = await axios.get('http://127.0.0.1:8000/api/')
				console.log(response.data)
				commit('setStudents', response.data)
			} catch (e) {
				alert('Error: ' + e)
			} finally {
				commit('setLoading', false);
			}
		},
	},
	namespaced: true

}