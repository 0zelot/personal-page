<template>
    <div id="carouselQuotes" class="carousel mt-3 carousel-fade" data-bs-ride="carousel" data-bs-interval="8000">
        <div v-for="(item, i) of quotes" :key="i" v-bind:class="i ? null : 'active'" class="carousel-item">
            <div class="carousel-caption">
                <blockquote class="blockquote border-0 p-0">
                    <p class="font-italic lead"> <i class="fa fa-quote-left mr-3 text-colored"></i> {{item.quote}}</p>
                    <footer class="blockquote-footer">{{item.author}}</footer>
                </blockquote>
            </div>
        </div>
        <div class="carousel-indicators">
            <button v-for="(item, i) of quotes" :key="i" type="button" data-bs-target="#carouselQuotes" :data-bs-slide-to="i" v-bind:class="i ? null : 'active'" :aria-current="i ? true : false"></button>
        </div>
    </div>
</template>

<script>
export default {
    props: ["quotes"],
    mounted() {
        new bootstrap.Carousel(document.querySelector("#carouselQuotes"));
    }
}
</script>