<template>
  <blog-posts-list :blog-posts="data.posts" />
</template>

<script setup>
import {butterCMS} from "../../plugins/ButterCMS";
import BlogPostsList from "../../components/BlogSections/BlogPostsList";

const route = useRoute()
useMeta({
  title: `search results for ${String(route.query["q"])}`
})

const {data} = await useAsyncData('search', async () => {
  const filter = String(route.query["q"])
  const response = await butterCMS.post.search(filter)
  return {
    posts: response.data.data
  }
})
</script>

<style scoped>

</style>