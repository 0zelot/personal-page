<template>
    <main>
            <Title>Hello page - {{config.env.title}}</Title>
            <Link rel="canonical" :href="`https://${config.env.domain}`" />

            <Header :settings="obj" />

            <div class="container">

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

                <Articles v-if="obj.blog && obj.blog.length > 0" :articles="obj.blog" />

            </div>

        <Footer />
    </main>
</template>

<script setup>
const config = useRuntimeConfig();
let {data: settings} = await useAsyncData("settings", () => $fetch(`${config.env.api}/config.json`));
let obj = (typeof(settings.value) == "object") ? settings.value : JSON.parse(settings.value);
if(!obj && config.env.backup_config) obj = JSON.parse((await (await fetch(`https://api.allorigins.win/get?url=${config.env.backup_config}`)).json()).contents);
</script>