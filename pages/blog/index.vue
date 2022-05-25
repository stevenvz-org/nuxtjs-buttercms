<template>
  <blog-posts-list :blog-posts="data.posts" />
</template>

<script setup>
import BlogPostsList from "../../components/BlogSections/BlogPostsList";

const heading = inject('heading')
const headerText = inject('headerText')
heading.value = headerText.value = "All blog posts";

const {$butterCMS} = useNuxtApp()
const {data} = await useAsyncData('tag', async () => {
  const response = await $butterCMS?.post.list({})
  return {
    posts: response.data.data
  }
})

</script>

<style scoped>

</style>