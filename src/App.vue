<template>
    <div>
        <div v-if="stats">
            <div class="row m-3">
                <b-card class="col m-3" title="Last Response Time">
                    <b-card-text>{{stats['lastResponseTimestamp']}}</b-card-text>
                </b-card>
            </div>
            <div class="row m-3">
                <transaction-pool class="col m-3"
                                  :size="stats['dap.txPool.currSize']"
                                  :graph-data="stats['stats']['metrics']['dapp.txpool.size']['stats']">
                </transaction-pool>
                <memory-usage class="col m-3"
                              :stats="stats['memstats']"
                              :graph-data="stats['stats']['metrics']['dapp.memstats']['stats']">
                </memory-usage>
                <cpu-usage class="col m-3"
                           :percentage="stats['dapp.cpu.percent']"
                           :graph-data="stats['stats']['metrics']['dapp.cpu.percent']['stats']">
                </cpu-usage>
                <fork-info class="col m-3" :graph-data="stats['stats']['metrics']['dapp.fork.info']['stats']">
                </fork-info>
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
    import axios from 'axios';
    import config from '../config.json';
    import CpuUsage from "./components/CpuUsage";
    import MemoryUsage from "./components/MemoryUsage";
    import Peers from "./components/Peers";
    import ForkInfo from "./components/ForkInfo";

    export default {
        name: "App",
        components: {
            ForkInfo,
            Peers,
            MemoryUsage,
            CpuUsage,
            TransactionPool
        },
        data() {
            return {stats: null}
        },
        methods: {
            fetchData() {
                axios.get(`http://${config.host}:${config.port}/debug/metrics`)
                    .then(stats => {
                        this.stats = stats.data;
                        this.stats['lastResponseTimestamp'] = new Date()
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.log(err);
                    })
            }
        },
        created() {
            this.fetchData();
            setInterval(() => {
                this.fetchData();
            }, config.pollingInterval);
        }
    }
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