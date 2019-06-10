<template>
    <b-card v-if="chartData" title="Transactions Per Block">
        <bar-chart :chart-data="chartData" :options="options"></bar-chart>
    </b-card>
</template>

<script>
    import BarChart from "./BarChart";

    export default {
        name: "BlockStats",
        components: {BarChart},
        props: {
            graphData: {
                NumTxPerBlock: Array,
                BlockHeights: Array
            }
        },
        computed: {
            chartData: {
                get() {
                    return {
                        labels: this.graphData.BlockHeights,
                        datasets: [
                            {
                                data: this.graphData.NumTxPerBlock
                            }
                        ]
                    };
                }
            }
        },
        data() {
            return {
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Number of Transactions"
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }
                        ],
                        xAxes: [
                            {
                                scaleLabel: {
                                    display: true,
                                    labelString: "Block Height"
                                },
                                categoryPercentage: 1.0
                            }
                        ]
                    },
                    legend: {
                        display: false
                    }
                }
            };
        }
    };
</script>
