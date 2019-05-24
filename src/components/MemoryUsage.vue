<template>
    <b-card title="Heap Usage (bytes)">
        <b-card-text class="memory-usage" v-if="stats" style="font-size: 1.25em">
            {{stats.HeapInuse}}/{{stats.HeapSys}}
        </b-card-text>
        <generic-graph v-if="data" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
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
            data: Array
        },
        methods: {
            transformStats(key) {
                return this.data.map(stat => {
                    return {x: Helper.unixTimestampToDate(stat["timestamp"]), y: stat['value'][key]}
                })
            }
        },
        computed: {
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                label: "Heap Used",
                                data: this.transformStats("heapInUse"),
                                pointRadius: 0
                            },
                            {
                                label: "Heap Size",
                                data: this.transformStats("heapSys"),
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
                        }],
                        xAxes: [{
                            scaleLabel: {
                                labelString: 'Local Time'
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