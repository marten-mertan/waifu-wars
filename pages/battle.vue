<template>
    <div class="page battle">
        <div class="battle-enemy">
            <Card v-for="card in getState.battle.enemyTeam"
                  :key="card.id"
                  :class="card.statuses"
                  :card="card"
                  @click.native="playerMove(card)"
            />
        </div>
        <div class="battle-player">
            <Card v-for="card in getState.battle.playerTeam"
                  :key="card.id"
                  :class="card.statuses"
                  :card="card" 
            />
        </div>
    </div>
</template>

<script>
    import Card from '~/components/game/card';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'BattlePage',
        components: {
            Card
        },
        computed: {
            ...mapGetters('cards', ['getState']),
        },
        mounted() {
            setTimeout(() => {
                this.fetchBattleEnemyTeam(5);
                if (this.getState?.playerTeam?.length) {
                    this.setBattlePlayerTeam(this.getState.playerTeam);
                } else {
                    console.error('ERROR: playerTeamLength == 0');
                }
                setTimeout(() => {
                    this.setMoveOrder([this.getState.battle.playerTeam, this.getState.battle.enemyTeam]);
                }, 1000);
                setTimeout(() => {
                    this.battle();
                }, 1000);
            }, 1000);
        },
        methods: {
            ...mapActions('cards', ['fetchBattleEnemyTeam', 'setBattlePlayerTeam', 'setBattleStatus', 'setMoveOrder', 'setCurrentMove', 'setPlayerHp', 'setEnemyHp', 'addPlayerStatus', 'addEnemyStatus']),
            battle() {
                if (this.getState.battle.moveOrder[this.getState.battle.currentMove % this.getState.battle.moveOrder.length].teamId >= 200) {
                    this.setBattleStatus('enemyMove');
                } else {
                    this.setBattleStatus('playerMove');
                }
                const currentCard = this.getState.battle.moveOrder[this.getState.battle.currentMove % this.getState.battle.moveOrder.length];
                console.log('Статус: ' + this.getState.battle.status);
                console.log('Текущий ход: ' + currentCard.name);
                if (this.getState.battle.status === 'enemyMove') {
                    if (currentCard.statuses.indexOf('dead') !== -1) {
                        console.log(currentCard.name + ' стонет от боли');
                    } else {
                        this.setBattleStatus('enemyMove');
                        const playerCard = this.getState.battle.playerTeam[Math.floor(Math.random()*this.getState.battle.playerTeam.length)];
                        console.log(currentCard.name + ' атакует ' + playerCard.name);
                        const newPlayerHp = playerCard.currentHp - currentCard.currentAttack;
                        this.setPlayerHp([playerCard, newPlayerHp]);
                        if (playerCard.currentHp <= 0) {
                            console.log(playerCard.name + ' падает без сознания!');
                            this.addPlayerStatus([playerCard, 'dead']);
                        }
                    }
                    this.setCurrentMove(this.getState.battle.currentMove+1);
                    this.battle();
                } else if (this.getState.battle.status === 'playerMove') {
                    if (currentCard.statuses.indexOf('dead') !== -1) {
                        console.log(currentCard.name + ' стонет от боли');
                        this.setCurrentMove(this.getState.battle.currentMove+1);
                        this.battle();
                    }
                }
            },
            playerMove(enemyCard) {
                if (this.getState.battle.moveOrder[this.getState.battle.currentMove % this.getState.battle.moveOrder.length].teamId >= 200) {
                    this.setBattleStatus('enemyMove');
                } else {
                    this.setBattleStatus('playerMove');
                }
                const currentCard = this.getState.battle.moveOrder[this.getState.battle.currentMove % this.getState.battle.moveOrder.length];
                if (this.getState.battle.status === 'playerMove') {
                    if (enemyCard.statuses.indexOf('dead') !== -1) {
                        console.log(enemyCard.name + ' уже повержен. Незачем его добивать.');
                    } else {
                        console.log(currentCard.name + ' атакует ' + enemyCard.name);
                        const newEnemyHp = enemyCard.currentHp - currentCard.currentAttack;
                        this.setEnemyHp([enemyCard, newEnemyHp]);
                        if (enemyCard.currentHp <= 0) {
                            console.log(enemyCard.name + ' падает без сознания!');
                            this.addEnemyStatus([enemyCard, 'dead']);
                        }
                        this.setCurrentMove(this.getState.battle.currentMove+1);
                        this.battle();
                    }
                }
            }
        },
    };
</script>

<style lang="scss">
    .battle {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        min-height: 100%;
        width: 100%;
        background: url('assets/images/bg_1.jpg') repeat top center;

        &-enemy {
            display: flex;
            justify-content: center;
        }

        &-player {
            display: flex;
            justify-content: center;
        }
    }
</style>
