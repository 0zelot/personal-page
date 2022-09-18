<template>
    <section>
        <span>Discord status</span>
        
        <div v-if="discord" class="mt-1">
            <div class="row text-left">
                <nuxt-img format="webp" loading="lazy" :src="$props.favicon" width="auto" height="auto" class="avatar img-circle m-2 p-1 inline-block" alt="Avatar" />
                <div class="inline-block discord-info">
                    <span class="discord-username">{{discord.user.username}}</span><span>#{{discord.user.discriminator}}</span>
                    <span v-if="fetched" class="d-block">
                        I'm currently <b class="text-success">ONLINE</b>.
                        <span v-if="fetched.game?.name" class="d-block">Playing: <b class="text-colored">{{fetched.game.name}}</b></span>
                    </span>
                    <span v-else class="d-block">I'm currently <b class="text-danger">OFFLINE</b>.</span>
                </div>
            </div>
        </div>

    </section>

</template>

<script>

export default {
    props: ["discord", "favicon"],
    data() {
        return {
            fetched: null,
        }
    },
    methods: {
        startInterval() {
            const getStatus = async () => {
                const data = await $fetch(this?.$props.discord.widget_url);
                this.fetched = data.members.find(user => user.username == this.discord.user.username);
            }
            getStatus();
            setInterval(() => getStatus(), 30000);
        }
    },
    mounted() {
        this.startInterval();
    },
}
</script>