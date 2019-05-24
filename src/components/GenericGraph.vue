<template>
    <scatter-chart v-if="chartData" :chart-data="chartData" :options="options"></scatter-chart>
</template>

<script>
    import ScatterChart from "./ScatterChart"
    import _ from "lodash"
    export default {
        name: "GenericGraph",
        components: {ScatterChart},
        props: {
            chartData: {},
            customOptions: {}
        },
        data() {
            return {
                defaultOptions: {
                    showLines: true,
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: ''
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            type: 'time',
                            scaleLabel: {
                                display: true,
                                labelString: ''
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            }
        },
        computed: {
            options: {
                get() {
                    return _.merge(this.defaultOptions, this.customOptions);
                }
            }
        }
    }
</script>