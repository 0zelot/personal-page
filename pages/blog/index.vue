<template>
    <main class="mt-5">

        <Title>Blog - {{config.env.title}}</Title>
        <Link rel="canonical" :href="`https://${config.env.domain}/blog/`" />

        <div class="container my-5 article-content">

            <h1 class="text-center my-5">Tutorials, insights and some other stuff</h1>

            <a href="/rss.xml" target="_blank" title="RSS feed"><i class="fa-solid fa-rss float-end fs-5"></i></a>

            <Navbar :pages="[
                {
                    name: 'Home',
                    url: '/'
                },
                {
                    name: 'Blog',
                    active: true
                }
            ]" />

            <Articles v-if="posts && posts.length > 0" :articles="posts" />

        </div>

        <Footer />
    </main>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const {path} = useRoute();

const {data} = await useAsyncData(() => queryContent().where({visibility: 1}).find());

const posts = data.value;
</script>