<template>
  <div>
    <h2>Blog Posts</h2>
    <button @click="$router.push('/add')">Add Post</button>
    
    <ul v-if="posts.length > 0">
      <li v-for="post in posts" :key="post.id">
        <router-link :to="'/edit/' + post.id">{{ post.title }}</router-link>
        <button @click="deletePost(post.id)">Delete</button>
      </li>
    </ul>
    
    <p v-else>No blog posts found.</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { getPosts, deletePost } from "../api";

export default {
  setup() {
    const posts = ref([]);

    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        posts.value = response.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const removePost = async (id) => {
      try {
        await deletePost(id);
        fetchPosts(); 
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    onMounted(fetchPosts);

    return { posts, deletePost: removePost };
  },
};
</script>
