<template>
    <div class="hint"
         :class="{ active: getHint.head && getHint.body }">
        <div class="hint-head">
            {{ getHint.head }}
        </div>
        <div class="hint-body">
            {{ getHint.body }}
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: 'Hint',
        components: {
        },
        computed: {
            ...mapGetters('cards', ['getHint'])
        },
        mounted: function() {
            window.addEventListener('mousemove', this.mouseMove, false);
        },
        methods: {
            mouseMove(e) {
                this.$el.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 2px)`;
            }
        }
    };
</script>

<style lang='scss'>
    .hint {
        position: fixed;
        bottom: 100%;
        left: 10px;
        min-width: 120px;
        min-height: 53px;
        height: auto;
        width: auto;
        padding: 12px 16px;
        background: rgba(#0f191f, .94);
        pointer-events: none;
        border-radius: 6px;
        box-shadow: rgba(#000, .44) 3px 4px 6px;
        transition: transform .3s ease-out;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;

        &.active {
            opacity: 1;
            visibility: visible;
            transition: transform .3s ease-out, opacity .3s ease-in .4s, visibility .3s ease-in .4s;
        }

        &-head {
            color: white;
            margin-bottom: 4px;
            font-size: 19px;
            font-weight: bold;
            letter-spacing: 4px;
        }

        &-body {
            color: white;
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 4px;
        }
    }
</style>
