<template>
    <b-card class="transaction-pool" title="Transaction Pool Size">
        <b-card-text style="font-size: 1.5em;">{{size}}</b-card-text>
        <generic-graph v-if="data" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
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
            data: Array
        },
        computed: {
            chartData: {
                get() {
                    return {
                        datasets: [
                            {
                                data: this.transformStats(),
                                pointRadius: 0
                            }
                        ]
                    }
                }
            }
        },
        methods: {
            transformStats() {
                return this.data.map(stat => {
                    return {x: Helper.unixTimestampToDate(stat["timestamp"]), y: stat["value"]}
                });
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                labelString: 'Size'
                            }
                        }],
                        xAxes: [{
                            scaleLabel: {
                                labelString: 'Local Time'
                            }
                        }]
                    },
                    legend: {
                        display: false
                    }
                }
            }
        }
    }
</script>
