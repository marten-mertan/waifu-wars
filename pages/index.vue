<template>
    <div class="page home">
        <NuxtLink to="/battle"
                  class="home-btn">
            Start battle
        </NuxtLink>
        <NuxtLink to="/summon"
                  class="home-btn">
            Summon
        </NuxtLink>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        components: {
        },
    };
</script>

<style lang="scss">
    .home {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: url('assets/images/bg_1.jpg') repeat top center;
    }
</style>
