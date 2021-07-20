<template>
    <div>
        <TheHeader />
        <Menu />

        <main :class="$style.main">
            <nuxt />
        </main>

        <Hint />
        <TheFooter />
    </div>
</template>

<script>
    import TheHeader from '~/components/layout/TheHeader';
    import TheFooter from '~/components/layout/TheFooter';
    import Hint from '~/components/hint';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        components: {
            TheHeader,
            TheFooter,
            Hint
        },
        data() {
            return {
            };
        },
        computed: {
            ...mapGetters('cards', ['getState']),
        },

        mounted() {
            this.fetchCards(5);
        },

        methods: {
            ...mapActions('cards', ['fetchCards']),
            async fetchCardFromID(id) {
                const response = await fetch(`https://api.jikan.moe/v3/character/${id}`);
                const data = await response.json();
                this.fetchedCards.push(data);
            }
        },
    };
</script>

<style lang="scss" module>
    .main {
        height: calc(100vh - #{$footer-h});
        display: flex;
        flex-direction: column;
        justify-content: stretch;
        background: #1e1e1e;
    }
</style>
