<template>
    <b-card v-if="graphData" title="Fork Statistics">
        <b-card-text v-if="currentLongestFork !== undefined" class="fork-info" style="font-size: 1.25em">
            Current Longest Fork: {{currentLongestFork}}
        </b-card-text>
        <generic-graph :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import GenericGraph from "./GenericGraph";
    import Helper from "../js/Helper";
    import {BCard, BCardText} from "bootstrap-vue/es/components";

    export default {
        name: "ForkInfo",
        components: {
            GenericGraph, BCard, BCardText
        },
        props: {
            graphData: Array
        },
        computed: {
            currentLongestFork: {
                get() {
                    return Helper.mapLast(this.graphData, (last) => last.getForkStats().getLongestFork());
                }
            },
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                label: "Fork Count",
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()),
                                        y: v.getForkStats().getNumForks()
                                    };
                                }),
                                pointRadius: 0
                            },
                            {
                                label: "Longest Fork",
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()),
                                        y: v.getForkStats().getLongestFork()
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
                    legend: {
                        display: true
                    }
                }
            };
        }
    };
</script>
