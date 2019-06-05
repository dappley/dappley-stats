<template>
    <b-card v-if="graphData" title="Fork Statistics">
        <b-card-text v-if="currentLongestFork != null" class="fork-info" style="font-size: 1.25em">
            Current Longest Fork: {{currentLongestFork}}
        </b-card-text>
        <generic-graph :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {last} from 'lodash';
    import GenericGraph from './GenericGraph'
    import Helper from '../js/Helper'
    import {BCard, BCardText} from 'bootstrap-vue/es/components'

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
                    if (this.graphData && this.graphData.length > 0)
                        return last(this.graphData)['value']['numForks'];
                    else
                        return null
                }
            },
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                label: "Fork Count",
                                data: Helper.transformToChartJSData(this.graphData, ["timestamp"], ["value", "numForks"]),
                                pointRadius: 0
                            },
                            {
                                label: "Longest Fork",
                                data: Helper.transformToChartJSData(this.graphData, ["timestamp"], ["value", "longestFork"]),
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
                    legend: {
                        display: true
                    }
                }
            }
        }
    }
</script>
