<template>
  <blog-posts-list :blog-posts="posts" />
</template>

<script setup>
const props = defineProps(['params'])
import BlogPostsList from "../../../components/BlogSections/BlogPostsList";
import {ref, watch} from "vue";
// const {data} = await useAsyncData('category', async () => {
//
// }, {lazy: false})

const route = useRoute()
const filter = ref({})
const loadData = () => {
  filter.value = { category_slug: route.params.category };
}
loadData()
watch(route, loadData);
const { posts, loading } = useBlogPosts(filter);
</script>

<style scoped>

</style>