<template>
    <b-card class="transaction-pool" title="Transaction Pool Size">
        <b-card-text style="font-size: 1.5em;">{{size}}</b-card-text>
        <generic-graph v-if="graphData" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from 'bootstrap-vue/es/components'
    import Helper from '../js/Helper'
    import GenericGraph from "./GenericGraph";

    export default {
        name: "TransactionPool",
        components: {
            GenericGraph,
            'b-card': BCard,
            'b-card-text': BCardText
        },
        props: {
            size: Number,
            graphData: Array
        },
        computed: {
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                data: Helper.transformToChartJSData(this.graphData),
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
                            scaleLabel: {
                                labelString: 'Number of Transactions'
                            }
                        }]
                    }
                }
            }
        }
    }
</script>
