<template>
  <div>
    <single-article :article="data.article" />
    <seo
      :title="data.article.title"
      :description="data.article.meta_description"
      :image="data.article.featured_image"
    />
  </div>
</template>

<script setup>
import SingleArticle from "../../components/BlogSections/SingleArticle";
const route = useRoute()
const {$butterCMS} = useNuxtApp()
const {data} = await useAsyncData('article', async () => {
  const slug = route.params.post;
  console.log(slug)
  const response = await $butterCMS.post.retrieve(slug);
  const article = response.data.data;
  console.log(article)
  return { article }
})
</script>

<style scoped>

</style>