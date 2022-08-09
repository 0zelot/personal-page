<template>
    <header>
        
        <div class="center">

            <span class="regular">Hello stranger, i'm</span>
            <h1 class="title" v-html="header"></h1>
        
            <div class="icons socials row text-center mt-4">
                <div v-for="(item, i) of settings.socials" :key="i" class="col">
                    <a :href="item.url" target="_blank">
                        <i :style="`color:${item.color}`" :class="item.icon"></i>
                    </a>
                </div>
            </div>

            <div class="icons favourite row text-center mt-4">
                <h2 class="m-3 regular">What do I use</h2>
                <div v-for="(item, i) of settings.favourites" :key="i" class="col">
                    <i :class="`${item} colored`"></i>
                </div>
            </div>

        </div>

    </header>
</template>

<script>
export default {
    props: ["settings"],
    data() {
        return {
            header: this.$config.env.header.replaceAll(/["']/g, "")
        }
    }
}
</script>
