<template>
    <main>
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

            </div>

        <Footer />
    </main>
</template>

<script setup>
    const config = useRuntimeConfig();
    let {data: settings} = await useFetch("/config.json", {baseURL: config.env.api});
    let obj = (typeof(settings.value) == "object") ? settings.value : JSON.parse(settings.value);
</script>