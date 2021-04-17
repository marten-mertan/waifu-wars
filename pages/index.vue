<template>
    <div :class="$style.home"
         class="page">
        <Canvas />
    </div>
</template>

<script>
    import Canvas from '../components/canvas';

    export default {
        name: 'HomePage',
        components: {
            Canvas
        },
    };
</script>

<style lang="scss" module>
    .home {
        display: flex;
        flex-direction: column;
        margin: auto;
    }
</style>
