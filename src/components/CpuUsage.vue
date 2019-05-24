<template>
    <b-card title="CPU Usage">
        <b-card-text class="cpu-usage-percent" v-if="percentage" style="font-size: 1.25em">
            {{percent}}
        </b-card-text>
        <generic-graph v-if="data" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    import Helper from "../js/Helper"
    import GenericGraph from "./GenericGraph"

    export default {
        name: "CpuUsage",
        components: {
            GenericGraph,
            BCard, BCardText
        },
        props: {
            percentage: Number,
            data: Array
        },
        computed: {
            percent: {
                get() {
                    return Number(this.percentage).toFixed(2) + " %";
                }
            },
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                data: this.transformStats(),
                                pointRadius: 0
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            transformStats() {
                return this.data.map(stat => {
                    return {x: Helper.unixTimestampToDate(stat["timestamp"]), y: stat["value"]}
                })
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                labelString: 'Percentage'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                labelString: 'Local Time'
                            }
                        }]
                    }
                }
            }
        }
    }
</script>