<template>
    <main>

        <Title>Hello page - {{config.env.title}}</Title>
        <Link rel="canonical" :href="`https://${config.env.domain}`" />

        <Header :settings="obj" />

        <div class="container mb-3">

            <h2 class="regular m-2">Are you still here?</h2>
            <div class="row">
                <div class="col-lg-8 col-md-12">
                    <Repositories :url="obj.github.repos_url" />
                </div>
                <div class="col-lg-4 col-md-12">
                    <Status v-if="obj.discord" :discord="obj.discord" :favicon="config.env.favicon" />
                </div>
            </div>
            <hr>

            <Quotes v-if="obj.quotes && obj.quotes.length > 0" :quotes="obj.quotes" />

            <Articles v-if="posts && posts.length > 0" :articles="posts" />

        </div>

        <Footer />

    </main>
</template>

<script setup>
const obj = await import("~/content/config.json");

const config = useRuntimeConfig();

const {data} = await useAsyncData(() => queryContent().where({visibility: 1}).find());

const posts = data.value;
</script>