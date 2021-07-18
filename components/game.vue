<template>
    <div ref="game"
         class="game">
        <MyCards :my-cards="playerCards" />
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {sha256} from 'js-sha256';
    import MyCards from '../components/my-cards';

    export default {
        components: {
            MyCards
        },
        data() {
            return {
                fetchedCards: [],
                playerCards: [],
                playerTeam: []
            };
        },

        computed: {
            ...mapGetters('cards', ['getCards']),
        },

        mounted() {
            this.fetchCards(5);
        },
      
        methods: {
            ...mapActions('cards', ['fetchCard']),
            async fetchCards(n) {
                for (let i=0; i<n; i++) {
                    const response = await fetch(`https://api.jikan.moe/v3/character/${i+497}`);
                    const data = await response.json();
                    this.fetchedCards.push(data);
                    this.fromFetchedCardsToPlayerCards(data);
                }
            },
            fromFetchedCardsToPlayerCards(data) {
                const code = sha256.array(data.mal_id.toString());
                const item = {
                    id: data.mal_id,
                    name: data.name,
                    image: data.image_url,
                    anime: data.animeography[0]?.name || 'unknown',
                    hp: code[0],
                    attack: code[1],
                    defence: code[2],
                    initiative: code[3]
                };
                this.playerCards.push(item);
            },
            async fetchCardFromID(id) {
                const response = await fetch(`https://api.jikan.moe/v3/character/${id}`);
                const data = await response.json();
                this.fetchedCards.push(data);
            },
        },
    };
</script>

<style lang='scss'>
    .game {
        width: 100%;
        height: 100%;
        background: url('assets/images/bg_1.jpg') repeat top center;
    }
</style>
