<template>
    <main class="mt-5">

        <Title>{{selected.title}} - {{config.env.title}}</Title>
        <Meta name="description" :content="selected.description" />
        <Meta name="keywords" :content="selected.keywords" />
        
        <Meta property="og:title" :content="selected.title" />
        <Meta property="og:description" :content="selected.description" />
        <Meta property="og:image" :content="selected.image" />
        <Meta property="og:image:width" content="2400" />
        <Meta property="og:image:height" content="1100" />
        <Meta property="og:type" content="article" />

        <Meta name="twitter:title" :content="selected.title" />
        <Meta name="twitter:description" :content="selected.description" />
        <Meta name="twitter:image" :content="selected.image" />
        <Meta name="twitter:card" content="summary_large_image" />

        <Link rel="canonical" :href="`https://${config.env.domain}${path}`" />

        <div class="container my-5 article-content">
            <h1 class="text-center my-5"> {{selected.title}}</h1>

            <Navbar :pages="[
                {
                    name: 'Home',
                    url: '/'
                },
                {
                    name: 'Blog',
                    url: '/blog/'
                },
                {
                    name: selected.title,
                    active: true
                }
            ]" />

            <div class="article-tags mt-2">
                <span v-for="(tag, i) of selected.tags" :key="i" class="badge bg-custom float-start">{{tag}}</span>
                <span class="float-end">{{moment.unix(selected.created).format("DD MMMM YYYY HH:mm")}}</span>
            </div>
            <br />

            <div class="row mt-2">
                <div class="col-sm-12 col-lg-9">
                    <img alt="Cover image" class="rounded w-100" :title="selected.title" :src="selected.image">
                    <ContentDoc tag="article" />
                </div>
                <Toc :links="selected.body.toc.links" class="col-sm-12 col-lg-3 d-none d-lg-inline" />
            </div>

        </div>

        <Footer />

    </main>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();
const {path} = useRoute();

const {data} = await useAsyncData(`content-${path}`, () => queryContent().where({_path: path}).findOne());

const selected = data.value;
if(!selected) useRouter().push({path: "/blog"});
</script>