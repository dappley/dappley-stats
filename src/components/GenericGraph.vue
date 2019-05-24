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
                    responsive: true,
                    maintainAspectRatio: false,
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
                    },
                    pan: {
                        enabled: true
                    },
                    zoom: {
                        enabled: true
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