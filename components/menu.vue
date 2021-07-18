<template>
    <nav class="menu">
        <ul class="menu-list">
            <li class="menu-list__item">
                <NuxtLink to="/"
                          class="menu-list__link">
                    Home page
                </NuxtLink>
            </li>
            <li class="menu-list__item">
                <NuxtLink to="/deck"
                          class="menu-list__link">
                    My cards
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'Menu',
        components: {

        },
        props: {
        },
      
        methods: {
        },
    };
</script>

<style lang='scss'>
    .menu {
        position: relative;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex: 1 1 auto;

        &-list {
            display: flex;
            justify-content: flex-end;

            &__item {
                &:not(:last-child) {
                    margin-right: 20px;
                }
            }

            &__link {
                padding: 20px 16px;
                color: white;
            }
        }
    }
</style>
