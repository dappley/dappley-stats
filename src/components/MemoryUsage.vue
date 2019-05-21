<template>
    <div class="row m-3">
        <b-card class="col m-3" title="Memory Usage">
            <b-card-text class="memory-usage-percent">{{usedPercent}}</b-card-text>
        </b-card>
    </div>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    export default {
        name: "MemoryUsage",
        components: {
            BCard, BCardText
        },
        props: {
            stats: {
                // # of bytes
                total: Number,
                available: Number,
                used: Number,
                free: Number,
                usedPercent: Number
            }
        },
        computed: {
            usedPercent: {
                get() {
                    if (this.stats && this.stats.usedPercent)
                        return Number(this.stats.usedPercent).toFixed(2) + " %";
                    else
                        return "";
                }
            }
        }
    }
</script>

<style scoped>

</style>