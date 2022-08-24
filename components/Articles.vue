<template>
    <section class="mt-5">

        <h2 class="regular m-2">Maybe want to read something? - check out my <a href="/blog">blog</a>!</h2>

        <div class="row">

            <div v-for="(item, i) of sortedArticles" :key="i" class="col-sm-12 col-md-6 col-lg-4 m-2 d-block mx-auto mb-3 mt-3">
                <div class="text-center article-item rounded">
                    <NuxtLink :to="item._path">
                        <img :src="item.image" class="card-img-top article-image p-2" :alt="item.title" :title="item.title">
                    </NuxtLink>
                    <div class="card-body m-2">
                        <div class="article-tags">
                            <span v-for="(tag, j) of item.tags" :key="j" class="badge bg-custom float-start">{{tag}}</span>
                            <span class="float-end">{{moment.unix(item.created, "YYYYMMDD").fromNow()}}</span>
                        </div>
                        <br />
                        <h3 class="card-title h4"><NuxtLink :to="item._path">{{item.title}}</NuxtLink></h3>
                        <p class="card-text mx-1 my-0 article-desc">{{item.description}}</p>
                    </div>
                </div>
            </div>
        
        </div>

    </section>
</template>

<script>
import moment from "moment"

export default {
    props: ["articles"],
    data() {
        return {
            sortedArticles: [],
            moment
        }
    },
    created() {
        this.sortedArticles = this?.$props.articles.sort((a, b) => b.created - a.created)
    }
}
</script>