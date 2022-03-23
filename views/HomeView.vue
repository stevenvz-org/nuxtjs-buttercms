<script setup>
import { onMounted, ref } from "vue";
import HeroSection from "@/components/HomepageSections/HeroSection.vue";
import TwoColumnWithImageSection from "@/components/HomepageSections/TwoColumnWithImageSection.vue";
import FeaturesSection from "@/components/HomepageSections/FeaturesSection.vue";
import BlogSection from "@/components/HomepageSections/BlogSection.vue";
import { useApiError } from "@/utils/hooks";
import {useNuxtApp} from "nuxt3/app";
import TestimonialsSection from "../components/HomepageSections/TestimonialsSection";

const { $butterCMS } = useNuxtApp()
const { setError } = useApiError();

const {data} = await useAsyncData('home-data', async () => {
  const page = await $butterCMS?.page.retrieve(
    "landing-page",
    "landing-page-with-components"
  );
  const pageData = page?.data.data;
  const posts = await $butterCMS?.post.list({ page: 1, page_size: 2 });
  const blogPosts = posts?.data.data;
  return {
    pageData,
    blogPosts
  }
}, {lazy: false})

</script>

<template>
  <div v-if="data.pageData">
    <template v-for="(item, index) in data.pageData.fields.body">
      <hero-section
        v-if="item.type === 'hero'"
        :key="index"
        :fields="item.fields"
      />
      <two-column-with-image-section
        v-if="item.type === 'two_column_with_image'"
        :key="index"
        :fields="item.fields"
      />
      <features-section
        v-if="item.type === 'features'"
        :key="index"
        :fields="item.fields"
      />
      <client-only>
        <testimonials-section
          v-if="item.type === 'testimonials'"
          :key="index"
          :fields="item.fields"
        />
      </client-only>
    </template>
    <blog-section :blog-posts="data.blogPosts" />
  </div>
</template>
