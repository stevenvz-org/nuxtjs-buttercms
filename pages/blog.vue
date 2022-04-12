<template>
  <div v-show="!loading">
    <blog-header :heading="heading" :links="headerLinks" :text="headerText" />
    <blog-content-container>
      <NuxtPage :params="route.params"/>
    </blog-content-container>
    <seo
      :title="`Sample Blog - ${seoTitle}`"
      :description="`Sample blog powered by ButterCMS, showing ${seoTitle}`"
    />
  </div>
</template>

<script setup>
import { basicBlogLinks } from "@/utils";
import { useApiError, useBlogPosts } from "@/utils/hooks";
import { useRoute } from "vue-router";
import BlogHeader from "@/components/BlogSections/BlogHeader.vue";
import { ref, watch } from "vue";
import { getBlogCategory, getBlogTag } from "@/utils/service";
import Seo from "@/components/Seo.vue";
import BlogContentContainer from "../components/BlogSections/BlogContentContainer";

const { setError } = useApiError();
const route = useRoute();
const headerText = ref("");
const heading = ref("");
const headerLinks = ref([]);
const seoTitle = ref("");

useMeta({
  title: seoTitle.value
})

const loadData = () => {
  headerLinks.value = basicBlogLinks;
  if ("category" in route.params) {
    const slug = route.params.category;
    heading.value = "Blog Posts by Category";
    seoTitle.value = "category: " + slug;
    getBlogCategory(slug)
      .then((category) => {
        headerText.value = "Category: " + category.name;
      })
      .catch((e) => setError(e));
  } else if ("tag" in route.params) {
    const slug = route.params.tag;
    heading.value = "Blog Posts by Tag";
    getBlogTag(slug)
      .then((tag) => (headerText.value = "Tag: " + tag.name))
      .catch((e) => setError(e));
    seoTitle.value = "tag: " + slug;
  } else if ("q" in route.query) {
    heading.value = "Search Results";
    headerText.value = "Search: " + route.query["q"];
    seoTitle.value = `search results for ${filter.value}`;
  } else {
    headerText.value = heading.value = "All blog posts";
    headerLinks.value = [basicBlogLinks[0]];
    seoTitle.value = `All Posts`;
  }
};
try {
  loadData();
} catch (e) {
  setError(e);
}
watch(route, loadData)
</script>
