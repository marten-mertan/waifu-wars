<template>
    <div class="game-card"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave">
        <div class="game-card-outer">
            <div class="game-card-inner">
                <img :src="card.image" 
                     alt="">
            </div>
        </div>
        <div class="game-card-hp">
            {{ card.currentHp }}
        </div>
        <div class="game-card-atk">
            {{ card.currentAttack }}
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        components: {
          
        },
        props: {
            card: {
                type: Object,
                default() {
                    return {
                        id: 0,
                        teamId: 0,
                        name: 'Default',
                        anime: 'Default',
                        image: '/assets/images/frame.png',
                        attack: 0,
                        currentAttack: 0,
                        defence: 0,
                        currentDefence: 0,
                        hp: 0,
                        currentHp: 0,
                        initiative: 0,
                        currentInitiative: 0,
                        statuses: []
                    };
                }
            }
        },
      
        methods: {
            ...mapActions('cards', ['setHint']),
            mouseEnter: function() {
                const hintHead = this.card.name;
                const hintBody = `<p>${this.card.anime}</p><p>hp: ${this.card.hp}</p><p>attack: ${this.card.attack}</p>`;
                this.setHint([hintHead, hintBody]);
            },
            mouseLeave: function() {
                this.setHint(['', '']);
            }

        },
    };
</script>

<style lang='scss'>
    .game-card {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;
        width: 145px;
        height: 210px;
        cursor: pointer;
        box-shadow: rgba(#000, .333) 3px 4px 11px 3px;

        &:not(:last-child) {
            margin-right: 30px;
            margin-bottom: 30px;
        }

        &:hover {
            .game-card-inner:before {
                transition: top .5s ease-in-out;
                top: -100%;
            }
        }

        &-outer {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: url('assets/images/frame.png') no-repeat 50% 50%;
            background-size: contain;
            width: 100%;
            height: 100%;
        }

        &-inner {
            position: relative;
            display: flex;
            width: 113px;
            height: 176px;
            overflow: hidden;

            &:before {
                position: absolute;
                display: block;
                content: '';
                top: 100%;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('assets/images/reflection_1.png');
                background-size: auto 100%;
                background-repeat: no-repeat;
                z-index: 10;
            }

            img {
                user-select: none;
                pointer-events: none;
            }
        }

        &-hp {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: -10px;
            right: -10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #50c878;
            color: white;
        }

        &-atk {
            position: absolute;
            display: flex;
            justify-content: center;
            align-items: center;
            bottom: -10px;
            left: -10px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #d21f3c;
            color: white;
        }

        &.dead {
            opacity: .2;
            transition: opacity .2s ease-in-out;
        }
    }
</style>
