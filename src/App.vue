<template>
    <div>
        <b-modal centered ref="loginModal" title="Dappley Stats" ok-only ok-title="Login"
                 @ok="attemptLogin" no-close-on-backdrop no-close-on-esc hide-header-close>
            <b-form-group label="Username:">
                <b-form-input v-model="username"></b-form-input>
            </b-form-group>
            <b-form-group label="Password:">
                <b-form-input v-model="password" type="password" :state="passwordState"
                              @update="updatePasswordState"></b-form-input>
            </b-form-group>
        </b-modal>
        <div v-if="authenticated">
            <div v-if="stats">
                <div class="row m-3">
                    <b-card class="col m-3" title="Last Response Time">
                        <b-card-text>{{lastResponseTime}}</b-card-text>
                    </b-card>
                    <node-config class="m-3"></node-config>
                </div>
                <div class="row m-3">
                    <memory-usage class="col m-3"
                                  :graph-data="stats.getDataStore().getMetricsMap().get('dapp.memstats').getStatsList()">
                    </memory-usage>
                    <cpu-usage class="col m-3"
                               :graph-data="stats.getDataStore().getMetricsMap().get('dapp.cpu.percent').getStatsList()">
                    </cpu-usage>
                </div>
                <div class="row m-3">
                    <transaction-pool class="col m-3"
                                      :graph-data="stats.getDataStore().getMetricsMap().get('dapp.txpool.size').getStatsList()">
                    </transaction-pool>
                    <fork-info class="col m-3"
                               :graph-data="stats.getDataStore().getMetricsMap().get('dapp.fork.info').getStatsList()">
                    </fork-info>
                    <block-stats class="col m-3" :graph-data="stats.getBlockStatsList()">
                    </block-stats>
                </div>
                <div class="row m-3">
                    <peers class="col" :peers="stats.getPeersList()"></peers>
                </div>
            </div>
            <div v-else>
                <div class="center">
                    <b-spinner style="width: 25vmin; height: 25vmin; border-width: 2.5vmin;"></b-spinner>
                    <strong style="position: absolute; font-size: 2.5vmin;">Loading...</strong>
                </div>
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
    import {MetricsServiceClient} from "./js/MetricsServiceClient";
    import NodeConfig from "./components/NodeConfig";
    import {BCard, BCardText, BModal, BFormInput, BFormGroup, BSpinner} from "bootstrap-vue";
    import axios from "axios";

    export default {
        name: "App",
        components: {
            BlockStats,
            ForkInfo,
            Peers,
            MemoryUsage,
            CpuUsage,
            TransactionPool,
            NodeConfig,
            BCard,
            BCardText,
            BModal,
            BFormInput,
            BFormGroup,
            BSpinner
        },
        data() {
            return {
                stats: null,
                lastResponseTime: null,
                authenticated: false,
                passwordState: null,
                password: "",
                username: "",
                polling: null
            };
        },
        methods: {
            startPolling() {
                this.getStats();
                this.polling = setInterval(() => {
                    this.getStats();
                }, config.pollingInterval);
            },
            getStats() {
                MetricsServiceClient.getStats()
                    .then(res => {
                        this.stats = res.getStats();
                        this.lastResponseTime = new Date();
                    })
                    .catch(err => {
                        // eslint-disable-next-line
                        console.error(err);
                    });
            },
            attemptLogin(loginModal) {
                loginModal.preventDefault(); /* prevent closing of login modal */
                axios.post("/login", {username: this.username, password: this.password}, {
                    baseURL: `http://${config.authServerHost}:${config.authServerPort}`,
                    headers: {"Content-Type": "application/json"}
                }).then((res) => {
                    this.passwordState = this.authenticated = true;
                    sessionStorage.setItem("tkn", res.data.tkn);
                    this.$nextTick(() => {
                        this.$refs.loginModal.hide();
                        this.startPolling();
                    });
                }).catch((err) => {
                    console.error(err);
                    this.passwordState = this.authenticated = false;
                    this.password = "";
                });
            },
            updatePasswordState() {
                if (this.password.length > 0)
                    this.passwordState = null;
            }
        },
        mounted() {
            if (!sessionStorage.getItem("tkn")) {
                this.$refs.loginModal.show();
            } else {
                this.authenticated = true;
                clearInterval(this.polling);
                this.startPolling();
            }
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
