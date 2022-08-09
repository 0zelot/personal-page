<template>
    <main>
        <Header :settings="obj" />

            <div class="container text-center">

                <span class="regular">Are you still here?</span>
                <div class="row text-center">
                    <div class="col-lg-8 col-md-12">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare massa eget egestas purus viverra accumsan in nisl. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Est lorem ipsum dolor sit amet consectetur. Elit scelerisque mauris pellentesque pulvinar pellentesque. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Penatibus et magnis dis parturient montes nascetur ridiculus mus mauris. Augue eget arcu dictum varius duis at. Lorem ipsum dolor sit amet. Vitae tortor condimentum lacinia quis vel eros donec ac. Nibh ipsum consequat nisl vel pretium. Varius vel pharetra vel turpis nunc. Quam elementum pulvinar etiam non quam lacus. Dignissim enim sit amet venenatis urna. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam eget. Dignissim suspendisse in est ante in nibh mauris cursus mattis. Suspendisse interdum consectetur libero id. Euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis. Lectus proin nibh nisl condimentum id venenatis a condimentum.
                    </div>
                    <div class="col-lg-4 col-md-12">
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ornare massa eget egestas purus viverra accumsan in nisl. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Odio ut sem nulla pharetra diam sit amet nisl suscipit. Est lorem ipsum dolor sit amet consectetur. Elit scelerisque mauris pellentesque pulvinar pellentesque. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum.
                    </div>
                </div>

                <Quotes :quotes="obj.quotes" />

            </div>

        <Footer />
    </main>
</template>

<script setup>
    const config = useRuntimeConfig();
    const {data: settings} = await useFetch("/config.json", {baseURL: config.env.api});
    const obj = JSON.parse(settings.value);
</script>