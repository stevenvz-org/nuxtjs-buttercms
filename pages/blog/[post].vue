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
import {inject} from 'vue'

const heading = inject('heading')
const headerText = inject('headerText')

const route = useRoute()
const {$butterCMS} = useNuxtApp()
const {data} = await useAsyncData('article', async () => {
  const slug = route.params.post;
  const response = await $butterCMS.post.retrieve(slug);
  const article = response.data.data;
  heading.value = article.title
  headerText.value = article.title
  return { article }
})
</script>

<style scoped>

</style>