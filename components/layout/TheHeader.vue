<template>
    <header class="header">
        <div class="header-wrap container">
            <div class="header__title">
                Waifu Wars
            </div>
            <Menu />
        </div>
    </header>
</template>

<script>
    import Menu from '~/components/menu';
    
    export default {
        name: 'TheHeader',
        components: {
            Menu
        },
    };
</script>

<style lang="scss">
    .header {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 15;
        width: 100%;
        background: #1e1e1e;

        &-wrap {
            display: flex;
            align-items: center;
            justify-content: center;
            height: $header-h;
        }

        &__title {
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 1px;
            padding: 20px;
            color: white;
        }
    }
</style>
