<template>
    <b-card title="CPU Usage">
        <b-card-text class="cpu-usage-percent" v-if="percent !== undefined" style="font-size: 1.25em">
            {{percent}}
        </b-card-text>
        <generic-graph v-if="graphData" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from "bootstrap-vue/es/components";
    import Helper from "../js/Helper";
    import GenericGraph from "./GenericGraph";

    export default {
        name: "CpuUsage",
        components: {
            GenericGraph,
            BCard, BCardText
        },
        props: {
            graphData: Array
        },
        computed: {
            percent: {
                get() {
                    return Helper.mapLast(this.graphData, (last) => last.getCpuPercentage().toFixed(2) + " %");
                }
            },
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()),
                                        y: v.getCpuPercentage()
                                    };
                                }),
                                pointRadius: 0
                            }
                        ]
                    };
                }
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                labelString: "Percentage"
                            }
                        }]
                    }
                }
            };
        }
    };
</script>