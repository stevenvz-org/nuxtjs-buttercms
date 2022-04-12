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
import { ref, watch, provide } from "vue";
import { getBlogCategory, getBlogTag } from "@/utils/service";
import Seo from "@/components/Seo.vue";
import BlogContentContainer from "../components/BlogSections/BlogContentContainer";

const { setError } = useApiError();
const route = useRoute();
const headerText = ref("");
const heading = ref("");
const headerLinks = ref([]);
const seoTitle = ref("");

provide('heading', heading)
provide('headerText', headerText)
provide('headerLinks', headerLinks)
provide('seoTitle', seoTitle)

const loadData = () => {
  headerLinks.value = basicBlogLinks;
  if(Object.keys(route.params).length === 0){
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
