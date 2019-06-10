<template>
    <b-card title="CPU Usage">
        <b-card-text class="cpu-usage-percent" v-if="percentage" style="font-size: 1.25em">
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
            percentage: Number,
            graphData: Array
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
                                data: Helper.transformToChartJSData(this.graphData),
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