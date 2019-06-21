<template>
    <div>
        <div v-if="stats">
            <div class="row m-3">
                <b-card class="col m-3" title="Last Response Time">
                    <b-card-text>{{stats["lastResponseTimestamp"]}}</b-card-text>
                </b-card>
            </div>
            <div class="row m-3">
                <memory-usage class="col m-3"
                              :graph-data="stats['timeSeriesData']['metrics']['dapp.memstats']['stats']">
                </memory-usage>
                <cpu-usage class="col m-3"
                           :graph-data="stats['timeSeriesData']['metrics']['dapp.cpu.percent']['stats']">
                </cpu-usage>
            </div>
            <div class="row m-3">
                <transaction-pool class="col m-3"
                                  :graph-data="stats['timeSeriesData']['metrics']['dapp.txpool.size']['stats']">
                </transaction-pool>
                <fork-info class="col m-3" :graph-data="stats['timeSeriesData']['metrics']['dapp.fork.info']['stats']">
                </fork-info>
                <block-stats class="col m-3" :graph-data="stats['blockStats']">
                </block-stats>
            </div>
            <div class="row m-3">
                <peers class="col" :peers="stats['peers']"></peers>
            </div>
        </div>
        <div v-else>
            <div class="center">
                <b-spinner style="width: 25vmin; height: 25vmin; border-width: 2.5vmin;"></b-spinner>
                <strong style="position: absolute; font-size: 2.5vmin;">Loading...</strong>
            </div>
        </div>
    </div>
</template>

<script>
    import TransactionPool from "./components/TransactionPool";
    import config from "../config.json";
    import CpuUsage from "./components/CpuUsage";
    import MemoryUsage from "./components/MemoryUsage";
    import Peers from "./components/Peers";
    import ForkInfo from "./components/ForkInfo";
    import BlockStats from "./components/BlockStats";
    import {MetricServicePromiseClient} from "./js/github.com/dappley/go-dappley/rpc/pb/rpc_grpc_web_pb";
    import {MetricsServiceRequest} from "./js/github.com/dappley/go-dappley/rpc/pb/rpc_pb";

    export default {
        name: "App",
        components: {
            BlockStats,
            ForkInfo,
            Peers,
            MemoryUsage,
            CpuUsage,
            TransactionPool
        },
        data() {
            return {
                stats: null,
                metricServiceClient: new MetricServicePromiseClient(`http://${config.host}:${config.port}`, null, null)
            };
        },
        methods: {
            getStats() {
                this.metricServiceClient.rpcGetStats(new MetricsServiceRequest(), {})
                    .then(resp => {
                        this.stats = JSON.parse(resp.getJson());
                        this.stats["lastResponseTimestamp"] = new Date();
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.error(err);
                    });
            }
        },
        created() {
            this.getStats();
            setInterval(() => {
                this.getStats();
            }, config.pollingInterval);
        }
    };
</script>

<style scoped>
    .center {
        display: flex;
        text-align: center;
        min-height: 100vh;
        align-items: center;
        justify-content: center;
    }
</style>