<template>
    <div class="row m-3">
        <b-card class="col m-3" title="CPU Usage">
            <b-card-text class="cpu-usage-percent" v-if="percentage" style="font-size: 1.25em">{{percent}}</b-card-text>
        </b-card>
    </div>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    export default {
        name: "CpuUsage",
        components: {
            BCard, BCardText
        },
        props: {
            percentage: Number
        },
        computed: {
            percent: {
                get() {
                    return Number(this.percentage).toFixed(2) + " %";
                }
            }
        }
    }
</script>

<style scoped>

</style>