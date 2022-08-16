<template>
    <main class="mt-5">

        <Title>Blog - {{config.env.title}}</Title>
        <Link rel="canonical" :href="`https://${config.env.domain}/blog/`" />

        <div class="container my-5 article-content">

            <h1 class="text-center my-5">Tutorials, insights and some other stuff</h1>

            <a href="/feed" target="_blank"><i class="fa-solid fa-rss float-end fs-5"></i></a>

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

            <Articles v-if="obj.blog && obj.blog.length > 0" :articles="obj.blog" />

        </div>

        <Footer />
    </main>
</template>

<script setup>
import moment from "moment";

const config = useRuntimeConfig();

let {data: settings} = await useAsyncData("settings", () => $fetch(`${config.env.api}/config.json`));
let obj = (typeof(settings.value) == "object") ? settings.value : JSON.parse(settings.value);
if(!obj && config.env.backup_config) obj = JSON.parse((await (await fetch(`https://api.allorigins.win/get?url=${config.env.backup_config}`)).json()).contents);
</script>