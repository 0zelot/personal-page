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

        <Link rel="canonical" :href="`https://${config.env.domain}/blog/${route.params.slug}`" />

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

            <article v-html="converter.makeHtml(article)" class="mt-2" id="article"></article>

        </div>

        <Footer />
    </main>
</template>

<script setup>
import showdown from "showdown";
import moment from "moment";

const converter = new showdown.Converter();

const config = useRuntimeConfig();
const router = useRouter();
const route = useRoute();

let {data: settings} = await useAsyncData("settings", () => $fetch(`${config.env.api}/config.json`));
let obj = (typeof(settings.value) == "object") ? settings.value : JSON.parse(settings.value);
if(!obj && config.env.backup_config) obj = JSON.parse((await (await fetch(`https://api.allorigins.win/get?url=${config.env.backup_config}`)).json()).contents);

const selected = obj.blog.find(post => post.slug == route.params.slug);
if(!selected) router.push({path: "/blog"});

const {data: article} = await useAsyncData("article", () => $fetch(`${config.env.api}/${selected.content}`));

</script>