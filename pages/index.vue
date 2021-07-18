<template>
    <div :class="$style.home"
         class="page">
        <Game />
    </div>
</template>

<script>
    import Game from '../components/game';

    export default {
        name: 'HomePage',
        components: {
            Game
        },
    };
</script>

<style lang="scss" module>
    .home {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
    }
</style>
