<template>
    <div id="carouselQuoteCaptions" class="carousel mt-3" data-bs-ride="carousel" data-bs-interval="300000">
        <div v-for="(item, i) of randomized" :key="i" v-bind:class="i ? null : 'active'" class="carousel-item">
            <div class="carousel-caption">
                <blockquote class="blockquote border-0 p-0">
                    <p class="font-italic lead"> <i class="fa fa-quote-left mr-3 text-colored"></i> {{item.quote}}</p>
                    <footer class="blockquote-footer">{{item.author}}</footer>
                </blockquote>
            </div>
        </div>
        <div class="carousel-indicators">
            <button v-for="(item, i) of randomized" :key="i" type="button" data-bs-target="#carouselQuoteCaptions" :data-bs-slide-to="i" v-bind:class="i ? null : 'active'" :aria-current="i ? true : false"></button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["quotes"],
    data() {
        return {
            randomized: this.quotes.sort(() => Math.random() - 0.5)
        }
    }
}
</script>