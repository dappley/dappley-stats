<template>
    <b-card class="transaction-pool" title="Pending Transactions">
        <b-card-text v-if="size !== undefined" style="font-size: 1.5em;">{{size}}</b-card-text>
        <generic-graph v-if="graphData" :chart-data="chartData" :custom-options="customOptions"></generic-graph>
    </b-card>
</template>

<script>
    import {BCard, BCardText} from "bootstrap-vue";
    import Helper from "../js/Helper";
    import GenericGraph from "./GenericGraph";

    export default {
        name: "TransactionPool",
        components: {
            GenericGraph,
            "b-card": BCard,
            "b-card-text": BCardText
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
                                data: this.graphData.map((v) => {
                                    return {
                                        x: Helper.unixTimestampToDate(v.getTimestamp()), y: v.getTransactionPoolSize()
                                    };
                                }),
                                pointRadius: 0
                            }
                        ]
                    };
                }
            },
            size: {
                get() {
                    return Helper.mapLast(this.graphData, (last) => last.getTransactionPoolSize());
                }
            }
        },
        data() {
            return {
                customOptions: {
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                labelString: "Number of Transactions"
                            },
                            ticks: {
                                callback: (v) => {return v % 1 === 0 ? v : undefined}
                            }
                        }]
                    }
                }
            };
        }
    };
</script>
