<template>
    <div class="page deck">
        <MyCards :my-cards="getState.playerCards" />
    </div>
</template>

<script>
    import MyCards from '~/components/deck/my-cards';
    import {mapGetters} from 'vuex';

    export default {
        name: 'Deck',
        components: {
            MyCards
        },
        computed: {
            ...mapGetters('cards', ['getState']),
        },
    };
</script>

<style lang="scss">
    .deck {
        display: flex;
        flex-direction: column;
        min-height: 100%;
        width: 100%;
        background: url('assets/images/bg_1.jpg') repeat top center;
    }
</style>
