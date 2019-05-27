<template>
    <b-card title="Heap Usage (bytes)">
        <b-card-text class="memory-usage" v-if="stats" style="font-size: 1.25em">
            {{stats.HeapInuse}}/{{stats.HeapSys}}
        </b-card-text>
        <generic-graph v-if="graphData" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    import Helper from "../js/Helper"
    import GenericGraph from "./GenericGraph";

    export default {
        name: "MemoryUsage",
        components: {
            GenericGraph,
            BCard, BCardText
        },
        props: {
            stats: {
                HeapSys: Number,
                HeapInuse: Number
            },
            graphData: Array
        },
        computed: {
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                label: "Heap Used",
                                data: Helper.transformToChartJSData(this.graphData, ["timestamp"], ["value", "heapInUse"]),
                                pointRadius: 0
                            },
                            {
                                label: "Heap Size",
                                data: Helper.transformToChartJSData(this.graphData, ["timestamp"], ["value", "heapSys"]),
                                pointRadius: 0
                            }
                        ]
                    }
                }
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            type: 'logarithmic',
                            scaleLabel: {
                                labelString: 'Bytes'
                            }
                        }]
                    },
                    legend: {
                        display: true
                    }
                }
            }
        }
    }
</script>