<template>
    <div class="row m-3">
        <b-card class="col m-3" title="Heap Usage (bytes)">
            <b-card-text class="memory-usage" v-if="stats" style="font-size: 1.25em">{{stats.HeapInuse}}/{{stats.HeapSys}}</b-card-text>
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
                HeapSys: Number,
                HeapInuse: Number
            }
        }
    }
</script>

<style scoped>

</style>