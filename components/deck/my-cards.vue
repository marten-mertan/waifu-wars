<template>
    <div class="cards">
        <div class="cards-inner">
            <Card v-for="card in myCards"
                  :key="card.id"
                  :card="card" 
            />
        </div>
    </div>
</template>

<script>
    import Card from '~/components/deck/card';

    export default {
        name: 'MyCards',
        components: {
            Card
        },
        props: {
            myCards: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
      
        methods: {

        },
    };
</script>

<style lang='scss'>
    .cards {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;

        &-inner {
            display: flex;
            justify-content: center;
            padding: 30px;
            width: 100%;
        }
    }
</style>
