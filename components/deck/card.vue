<template>
    <div class="card"
         @mouseenter="mouseEnter"
         @mouseleave="mouseLeave">
        <div class="card-outer">
            <div class="card-inner">
                <img :src="card.image" 
                     alt="">
            </div>
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
                        anime: 'Default',
                        attack: 0,
                        defence: 0,
                        hp: 0,
                        id: 0,
                        image: '/assets/images/frame.png',
                        initiative: 0,
                        name: 'Default'
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
    .card {
        position: relative;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;
        width: 290px;
        height: 420px;
        cursor: pointer;
        box-shadow: rgba(#000, .333) 3px 4px 11px 3px;

        &:not(:last-child) {
            margin-right: 30px;
            margin-bottom: 30px;
        }

        &:hover {
            .card-inner:before {
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
            width: 225px;
            height: 350px;
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
                //user-select: none;
                //pointer-events: none;
            }
        }
    }
</style>
