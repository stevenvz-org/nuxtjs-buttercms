<template>
  <blog-posts-list :blog-posts="data.posts" />
</template>

<script setup>

import BlogPostsList from "../../../components/BlogSections/BlogPostsList";

const {$butterCMS} = useNuxtApp()
const route = useRoute()

const {data} = await useAsyncData('tag', async () => {
  const filter = { tag_slug: route.params.tag }
  const response = await $butterCMS?.post.list(filter)
  return {
    posts: response.data.data
  }
})

</script>

<style scoped>

</style>