<template>
    <b-card title="Heap Usage (bytes)">
        <b-card-text class="memory-usage" v-if="heapInUse !== undefined && heapSys !== undefined"
                     style="font-size: 1.25em">
            {{heapInUse}}/{{heapSys}}
        </b-card-text>
        <generic-graph v-if="graphData" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from "bootstrap-vue";
    import Helper from "../js/Helper";
    import GenericGraph from "./GenericGraph";

    export default {
        name: "MemoryUsage",
        components: {
            GenericGraph,
            BCard, BCardText
        },
        props: {
            graphData: Array
        },
        computed: {
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                label: "Heap Used",
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()),
                                        y: v.getMemoryStats().getHeapInUse()
                                    };
                                }),
                                pointRadius: 0
                            },
                            {
                                label: "Heap Size",
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()),
                                        y: v.getMemoryStats().getHeapSys()
                                    };
                                }),
                                pointRadius: 0
                            }
                        ]
                    };
                }
            },
            heapInUse: {
                get() {
                    return Helper.mapLast(this.graphData, (last) => last.getMemoryStats().getHeapInUse());
                }
            },
            heapSys: {
                get() {
                    return Helper.mapLast(this.graphData, (last) => last.getMemoryStats().getHeapSys());
                }
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            type: "logarithmic",
                            scaleLabel: {
                                labelString: "Bytes"
                            }
                        }]
                    },
                    legend: {
                        display: true
                    }
                }
            };
        }
    };
</script>
