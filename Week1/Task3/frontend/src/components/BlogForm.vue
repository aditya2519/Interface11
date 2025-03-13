<template>
  <div>
    <h2>{{ isEditing ? "Edit Post" : "Add Post" }}</h2>
    <form @submit.prevent="submitPost">
      <input v-model="post.title" placeholder="Title" required />
      <textarea v-model="post.content" placeholder="Content" required></textarea>
      <input v-model="post.author" placeholder="Author" required />
      <button type="submit">{{ isEditing ? "Update" : "Create" }}</button>
    </form>
  </div>
</template>

<script>
import { createPost, getPost, updatePost } from "../api";

export default {
  data() {
    return { post: { title: "", content: "", author: "" }, isEditing: false };
  },
  async created() {
    if (this.$route.params.id) {
      const response = await getPost(this.$route.params.id);
      this.post = response.data;
      this.isEditing = true;
    }
  },
  methods: {
    async submitPost() {
      this.isEditing ? await updatePost(this.$route.params.id, this.post) : await createPost(this.post);
      this.$router.push("/");
    },
  },
};
</script>
